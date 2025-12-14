"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateStatus(id: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("cases").update({
        statuswrk: status
    }).eq("id", id);

    if (error) {
        console.error("Error updating status:", error);
        throw new Error("Failed to update status");
    }

    revalidatePath("/form/view");
}
