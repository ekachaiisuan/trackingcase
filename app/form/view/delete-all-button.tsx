"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteAllCases } from "@/app/action/deletecaseall";
import { toast } from "sonner";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

export default function DeleteAllButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteAllCases();
            toast.success("ลบข้อมูลทั้งหมดเรียบร้อยแล้ว");
            setOpen(false);
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการลบข้อมูล");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                ลบทั้งหมด
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 animate-in zoom-in-95 duration-200 mx-4">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/20">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">ยืนยันการลบข้อมูลทั้งหมด</h3>
                                <p className="text-sm text-muted-foreground">
                                    คุณแน่ใจหรือไม่ที่จะลบรายการคำขอทั้งหมด?
                                    เมื่อกดลบแล้วจะไม่สามารถย้อนกลับได้
                                </p>
                            </div>
                            <div className="flex w-full gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setOpen(false)}
                                    disabled={loading}
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            กำลังลบ...
                                        </>
                                    ) : (
                                        "ยืนยันลบทั้งหมด"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
