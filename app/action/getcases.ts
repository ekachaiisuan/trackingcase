"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCases() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("cases").select("*").order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching cases:", error);
        return [];
    }

    return data;
}
