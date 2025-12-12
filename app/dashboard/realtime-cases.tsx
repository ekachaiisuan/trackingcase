"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseData } from "@/app/action/insertform";

// We need to extend CaseData to include an ID or createdAt if we want to use them as keys, 
// but Supabase returns the full record. For now let's assume the shape matches CaseData plus id.
type CaseRecord = CaseData & { id: number; created_at: string };

export default function RealtimeCases() {
    const [cases, setCases] = useState<CaseRecord[]>([]);
    const supabase = createClient();

    useEffect(() => {
        // Fetch initial data
        const fetchCases = async () => {
            const { data, error } = await supabase
                .from("cases")
                .select("*")
                .order("id", { ascending: false });

            if (error) {
                console.error("Error fetching cases:", error);
            } else {
                setCases(data || []);
            }
        };

        fetchCases();

        // Subscribe to realtime updates
        const channel = supabase
            .channel("realtime-cases")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "cases" },
                (payload) => {
                    console.log("New case received:", payload);
                    setCases((prev) => [payload.new as CaseRecord, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Realtime Case Monitor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Black No</TableHead>
                                <TableHead>Plaintiff</TableHead>
                                <TableHead>Accused</TableHead>
                                <TableHead>Time At</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cases.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center h-24 text-muted-foreground"
                                    >
                                        No cases found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                cases.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.blackno}</TableCell>
                                        <TableCell>{c.plaintiff}</TableCell>
                                        <TableCell>{c.accused}</TableCell>
                                        <TableCell>{c.timeat}</TableCell>
                                        <TableCell>{c.room}</TableCell>
                                        <TableCell>{c.department}</TableCell>
                                        <TableCell>{c.remarks}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
