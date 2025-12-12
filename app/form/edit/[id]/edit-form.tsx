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

export default function EditForm({ initialData, id }: { initialData: any, id: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        blackno: initialData.blackno || "",
        plaintiff: initialData.plaintiff || "",
        accused: initialData.accused || "",
        timeat: initialData.timeat || "",
        room: initialData.room || "",
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
            toast.success("Case updated successfully");
            router.push("/form/view");
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Case Tracking Form</CardTitle>
                    <CardDescription>
                        Edit the case details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="blackno">Black No</Label>
                                <Input
                                    id="blackno"
                                    placeholder="Enter Black No"
                                    value={formData.blackno}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="timeat">Time At</Label>
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
                                <Label htmlFor="plaintiff">Plaintiff</Label>
                                <Input
                                    id="plaintiff"
                                    placeholder="Enter Plaintiff Name"
                                    value={formData.plaintiff}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="accused">Accused</Label>
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
                                <Label htmlFor="room">Room</Label>
                                <Input
                                    id="room"
                                    placeholder="Enter Room"
                                    value={formData.room}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    placeholder="Enter Department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input
                                id="remarks"
                                placeholder="Enter Remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit">Update</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
