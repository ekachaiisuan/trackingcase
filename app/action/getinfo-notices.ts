"use server";

import { createClient } from "@/lib/supabase/server";

export async function getInfoNotices() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("info-notice").select("*").order("id", { ascending: false });

    if (error) {
        console.error("Error fetching info notices:", error);
        return [];
    }

    return data;
}