import { Suspense } from "react";
import CaseTableWrapper from "./case-table-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormView({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">รายการคำขอ</h1>
                <div className="flex gap-2">
                    <Link href="/report">
                        <Button variant="destructive">รายงาน</Button>
                    </Link>
                    <Link href="/form/create">
                        <Button variant="default">เพิ่มคำขอ</Button>
                    </Link>
                </div>
            </div>

            <Suspense fallback={<div>Loading layout...</div>}>
                <CaseTableWrapper searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
