"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteAllCases() {
    const supabase = await createClient();

    // Using a condition that catches all non-null IDs to safely "delete all" 
    // without violating potential "delete without where" safeguards if any.
    // Assuming 'id' is a primary key uuid.
    const { error } = await supabase.from("cases").delete().neq("id", 0);

    if (error) {
        console.error("Error deleting all cases:", error);
        throw new Error("Failed to delete all cases");
    }

    revalidatePath("/form/view");
}