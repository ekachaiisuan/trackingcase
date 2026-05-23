import { Suspense } from "react";
import CaseTable from "./case-table";
import Link from "next/link";

interface CaseTableWrapperProps {
    searchParams: Promise<{ tab?: string }>;
}

export default async function CaseTableWrapper({
    searchParams,
}: CaseTableWrapperProps) {
    const params = await searchParams;
    const currentTab = params.tab || "active";
    const showClosed = currentTab === "closed";

    const activeTabClass = "border-b-2 border-primary text-primary px-4 py-2 font-semibold text-sm";
    const inactiveTabClass = "border-b-2 border-transparent text-muted-foreground hover:text-foreground px-4 py-2 text-sm transition-colors";

    return (
        <>
            {/* Tabs */}
            <div className="flex border-b mb-6 gap-2">
                <Link 
                    href="/form/view?tab=active" 
                    className={currentTab === "active" ? activeTabClass : inactiveTabClass}
                >
                    คำขอที่ดำเนินการอยู่ (Active)
                </Link>
                <Link 
                    href="/form/view?tab=closed" 
                    className={currentTab === "closed" ? activeTabClass : inactiveTabClass}
                >
                    คำขอที่ปิดแล้ว (Closed)
                </Link>
            </div>

            <Suspense key={currentTab} fallback={<div>Loading cases...</div>}>
                <CaseTable showClosed={showClosed} />
            </Suspense>
        </>
    );
}
