"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns, CaseRecord } from "@/components/cases-columns";

export default function RealtimeCases() {
    const [cases, setCases] = useState<CaseRecord[]>([]);
    const supabase = createClient();

    useEffect(() => {
        // Fetch initial data
        console.log("ENV", process.env.NEXT_PUBLIC_SUPABASE_URL); //debug code

        const fetchCases = async () => {
            const { data, error } = await supabase
                .from("cases")
                .select("*")
                .order("id", { ascending: true });

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
                { event: "*", schema: "public", table: "cases" },
                (payload) => {
                    console.log("Realtime event received:", payload);
                    setCases((prev) => {
                        if (payload.eventType === 'DELETE') {
                            // payload.old contains the ID of the deleted record
                            return prev.filter(c => c.id !== payload.old.id);
                        } else {
                            // INSERT or UPDATE
                            const newCase = payload.new as CaseRecord;
                            const filtered = prev.filter(p => p.id !== newCase.id);
                            // Add new/updated case to the top
                            return [newCase, ...filtered];


                        }
                    });
                }
            )
            .subscribe(
                (status) => {
                    console.log("Subscription status:", status); //debug code
                }
            );

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>รายงานคดีที่ติดตามแบบ Realtime</CardTitle>
                <CardTitle>จำนวนคดีที่ติดตาม: {cases.length}</CardTitle>

            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={cases} />
            </CardContent>
        </Card>
    );
}
