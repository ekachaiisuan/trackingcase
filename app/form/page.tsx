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
import { useState } from "react";
import { insertForm } from "@/app/action/insertform";

export default function Form() {
    const [formData, setFormData] = useState({
        blackno: "",
        plaintiff: "",
        accused: "",
        timeat: "",
        room: "",
        department: "",
        remarks: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        insertForm(formData);
        // Here you would typically send the data to an API
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Case Tracking Form</CardTitle>
                    <CardDescription>
                        Enter the case details below.
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
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}