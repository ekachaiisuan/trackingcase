"use server";

import { createClient } from "@/lib/supabase/server";
import { CaseData } from "./insertform";
import { revalidatePath } from "next/cache";

export async function updateCase(id: string, data: CaseData) {
    const supabase = await createClient();
    
    const { error } = await supabase.from("cases").update({
        blackno: data.blackno,
        plaintiff: data.plaintiff,
        accused: data.accused,
        timeat: data.timeat,
        room: data.room,
        department: data.department,
        remarks: data.remarks,
    }).eq("id", id);

    if (error) {
        console.error("Error updating case:", error);
        throw new Error("Failed to update case");
    }

    revalidatePath("/form/view");
    // revalidatePath(`/form/edit/${id}`);
}
