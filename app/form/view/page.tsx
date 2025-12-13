import { Suspense } from "react";
import CaseTable from "./case-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormView() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">รายการคำขอ</h1>
                <Link href="/form/create">
                    <Button>เพิ่มคำขอ</Button>
                </Link>
            </div>
            <Suspense fallback={<div>Loading cases...</div>}>
                <CaseTable />
            </Suspense>
        </div>
    );
}
