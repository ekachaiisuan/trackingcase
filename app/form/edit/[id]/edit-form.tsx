"use client";

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
import { updateCase } from "@/app/action/updatecase";
import { useRouter } from "next/navigation";
import { DepartmentSelect } from "@/components/department-select";
import Link from "next/link";

export default function EditForm({ initialData, id }: { initialData: any, id: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        blackno: initialData.blackno || "",
        plaintiff: initialData.plaintiff || "",
        accused: initialData.accused || "",
        timeat: initialData.timeat || "",
        typereq: initialData.typereq || "",
        namereq: initialData.namereq || "",
        department: initialData.department || "",
        remarks: initialData.remarks || "",
    });

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
            await updateCase(id, formData);
            toast.success("แก้ไขรายการสำเร็จ");
            router.push("/form/view");
        } catch (error) {
            console.error(error);
            toast.error("แก้ไขรายการไม่สำเร็จ");
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">แก้ไขข้อมูลสำนวนติดตามคดี</CardTitle>
                    <CardDescription>
                        กรุณากรอกรายละเอียดสำนวนติดตามคดี
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="blackno">หมายเลขดำ</Label>
                                <Input
                                    id="blackno"
                                    placeholder="Enter Black No"
                                    value={formData.blackno}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="timeat">เวลาเริ่มติดตาม</Label>
                                <Input
                                    id="timeat"
                                    placeholder="Enter Time"
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
                                    placeholder="Enter Plaintiff Name"
                                    value={formData.plaintiff}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="accused">จำเลย</Label>
                                <Input
                                    id="accused"
                                    placeholder="Enter Accused Name"
                                    value={formData.accused}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="typereq">ประเภทคำร้อง</Label>
                                <Input
                                    id="typereq"
                                    placeholder="ประเภทคำร้อง"
                                    value={formData.typereq}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="namereq">ชื่อผู้ขอ</Label>
                                <Input
                                    id="namereq"
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
                            <Label htmlFor="remarks">หมายเหตุ</Label>
                            <Input
                                id="remarks"
                                placeholder="หมายเหตุ"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Link href="/form/view">
                                <Button variant="default" type="button">กลับ</Button>
                            </Link>
                            <Button type="submit">แก้ไข</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
