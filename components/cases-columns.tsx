"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CaseData } from "@/app/action/insertform"

// We define the shape of our data.
// Since we are extending CaseData with minimal fields for now as per realtime-cases.tsx logic
export type CaseRecord = CaseData & { id: number; created_at?: string }

export const columns: ColumnDef<CaseRecord>[] = [
    {
        id: "index",
        header: "ลำดับ",
        cell: ({ row }) => {
            // Since we don't have pagination yet, we can't do absolute index easily without passing page info.
            // But for a simple list, row.index + 1 works nicely.
            return <div className="text-center">{row.index + 1}</div>
        },
    },
    {
        accessorKey: "blackno",
        header: "อทดำ",
    },
    {
        accessorKey: "plaintiff",
        header: "โจทก์",
    },
    {
        accessorKey: "accused",
        header: "จำเลย",
    },
    {
        accessorKey: "timeat",
        header: "เวลาเริ่ม",
    },
    {
        accessorKey: "typereq",
        header: "ประเภทคำขอ",
    },
    {
        accessorKey: "namereq",
        header: "ผู้ขอ",
    },
    {
        accessorKey: "department",
        header: "กลุ่มงาน",
    },
    {
        accessorKey: "remarks",
        header: "หมายเหตุ",
    },
]
