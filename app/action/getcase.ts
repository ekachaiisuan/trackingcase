"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCaseById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("cases").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching case:", error);
        return null;
    }

    return data;
}
