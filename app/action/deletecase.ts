"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCase(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("cases").delete().eq("id", id);

    if (error) {
        console.error("Error deleting case:", error);
        throw new Error("Failed to delete case");
    }

    revalidatePath("/form/view");
}
