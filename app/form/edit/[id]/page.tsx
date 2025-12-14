import { getCaseById } from "@/app/action/getcase";


import EditForm from "./edit-form";

import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const caseData = await getCaseById(id);

    if (!caseData) {
        return notFound();
    }

    return (
        <EditForm initialData={caseData} id={id} />
    );
}
