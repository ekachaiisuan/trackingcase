import { Suspense } from "react";
import RealtimeCases from "@/components/realtime-cases";
export default function Dashboard() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold mb-6">กระดานแสดงผลระบบติดตามสำนวนคดี</h1>
                <div className="flex gap-5">
                    <h1 className="text-yellow-500">สีเหลือง: อยู่ระหว่างตรวจสอบเอกสาร</h1>
                    <h1 className="text-orange-500">สีส้ม: กำลังดำเนินการ</h1>
                    <h1 className="text-green-500">สีเขียว: ดำเนินการเสร็จสิ้น</h1>
                </div>

            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <RealtimeCases />
            </Suspense>
        </div>
    );
}
