"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCases(showClosed: boolean = false) {
    const supabase = await createClient();
    
    let query = supabase.from("cases").select("*");
    
    if (showClosed) {
        query = query.eq("statuswrk", "closed");
    } else {
        query = query.or("statuswrk.neq.closed,statuswrk.is.null");
    }
    
    const { data, error } = await query.order("id", { ascending: false });

    if (error) {
        console.error("Error fetching cases:", error);
        return [];
    }

    return data;
}
