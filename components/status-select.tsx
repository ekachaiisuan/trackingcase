"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateStatus } from "@/app/action/update-status";
import { toast } from "sonner";

interface StatusSelectProps {
    id: string;
    currentStatus: string;
}

export function StatusSelect({ id, currentStatus }: StatusSelectProps) {
    const handleValueChange = async (value: string) => {
        try {
            await updateStatus(id, value);
            toast.success("อัปเดตสถานะสำเร็จ");
        } catch (error) {
            console.error(error);
            toast.error("อัปเดตสถานะไม่สำเร็จ");
        }
    };

    return (
        <Select value={currentStatus} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="เลือกสถานะ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="doing">doing</SelectItem>
                <SelectItem value="fin">fin</SelectItem>
            </SelectContent>
        </Select>
    );
}
