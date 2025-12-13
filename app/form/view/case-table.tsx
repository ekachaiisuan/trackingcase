import { getCases } from "@/app/action/getcases";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CaseActions from "./case-actions";

export default async function CaseTable() {
    const cases = await getCases();

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ลำดับ</TableHead>
                        <TableHead>อทดำ</TableHead>
                        <TableHead>โจทก์</TableHead>
                        <TableHead>จำเลย</TableHead>
                        <TableHead>เวลาเริ่ม</TableHead>
                        <TableHead>ประเภทคำขอ</TableHead>
                        <TableHead>ชื่อผู้ขอ</TableHead>
                        <TableHead>กลุ่มงาน</TableHead>
                        <TableHead>ขั้นตอนการดำเนินการ</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cases.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{item.blackno}</TableCell>
                            <TableCell>{item.plaintiff}</TableCell>
                            <TableCell>{item.accused}</TableCell>
                            <TableCell>{item.timeat}</TableCell>
                            <TableCell>{item.typereq}</TableCell>
                            <TableCell>{item.namereq}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>{item.remarks}</TableCell>
                            <TableCell className="text-right">
                                <CaseActions id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
