"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const departments = [
    'งานปชส',
    'การเงิน',
    'งานคดี',
    'งานห้องเก็บสำนวนคดี',
    'งานส่วนช่วยพิจารณาคดี',
    'งานเจ้าพนักงานคดี',
    'งานตำรวจศาล',
    'ส่วนช่วยอำนวยการ'
];

interface DepartmentSelectProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function DepartmentSelect({ value, onValueChange }: DepartmentSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกกลุ่มงาน" />
            </SelectTrigger>
            <SelectContent>
                {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                        {dept}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
