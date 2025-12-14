"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { useState } from "react";
import { insertForm } from "@/app/action/insertform";
import Link from "next/link";
import { DepartmentSelect } from "@/components/department-select";
import { useRouter } from "next/navigation";


export default function Form() {
    const router = useRouter();
    const initialFormData = {
        blackno: "",
        plaintiff: "",
        accused: "",
        timeat: "",
        typereq: "",
        department: "",
        remarks: "",
        namereq: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await insertForm(formData);
            toast.success("บันทึกข้อมูลสำเร็จ")
            setFormData(initialFormData);
            // router.push("/form/view");

        } catch (error: any) {
            if (error.code === '303' || error.message.includes("Redirecting to view page")) {
                toast.success("supabase redirect");
            } else {
                console.error(error);
                toast.error("บันทึกข้อมูลไม่สำเร็จ");
            }
        }

        // Here you would typically send the data to an API
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">สร้างข้อมูลติดตามสำนวนคดี</CardTitle>
                    <CardDescription>
                        กรุณากรอกรายละเอียดติดตามสำนวนคดี
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="blackno">หมายเลขดำ</Label>
                                <Input
                                    id="blackno"
                                    placeholder="อทดำ"
                                    value={formData.blackno}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="timeat">เวลาเริ่ม</Label>
                                <Input
                                    type="time"
                                    id="timeat"
                                    value={formData.timeat}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="plaintiff">โจทก์</Label>
                                <Input
                                    id="plaintiff"
                                    placeholder="โจทก์"
                                    value={formData.plaintiff}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="accused">จำเลย</Label>
                                <Input
                                    id="accused"
                                    placeholder="จำเลย"
                                    value={formData.accused}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="typereq">ประเภทคำขอ</Label>
                                <Input
                                    id="typereq"
                                    placeholder="ประเภทคำขอ"
                                    value={formData.typereq}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="namereq">ชื่อผู้ขอ</Label>
                                <Input
                                    id="namereq"
                                    placeholder="ชื่อผู้ขอ"
                                    value={formData.namereq}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="department">กลุ่มงาน</Label>
                                <DepartmentSelect
                                    value={formData.department}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, department: value }))
                                    }
                                />
                            </div>

                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="remarks">ขั้นตอนการดำเนินการ</Label>
                            <Input
                                id="remarks"
                                placeholder="ใส่รายละเอียดการดำเนินการ"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Link href="/form/view">
                                <Button variant="default" type="button">กลับ</Button>
                            </Link>
                            <Button type="submit">บันทึก</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}