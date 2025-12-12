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
                        <TableHead>Black No</TableHead>
                        <TableHead>Plaintiff</TableHead>
                        <TableHead>Accused</TableHead>
                        <TableHead>Time At</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cases.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.blackno}</TableCell>
                            <TableCell>{item.plaintiff}</TableCell>
                            <TableCell>{item.accused}</TableCell>
                            <TableCell>{item.timeat}</TableCell>
                            <TableCell>{item.room}</TableCell>
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
