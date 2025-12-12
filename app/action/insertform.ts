"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type CaseData = {
    blackno: string;
    plaintiff: string;
    accused: string;
    timeat: string;
    room: string;
    department: string;
    remarks: string;
};

export async function insertForm(data: CaseData) {
    const supabase = await createClient();

    const { error } = await supabase.from("cases").insert({
        blackno: data.blackno,
        plaintiff: data.plaintiff,
        accused: data.accused,
        timeat: data.timeat,
        room: data.room,
        department: data.department,
        remarks: data.remarks,
    });

    if (error) {
        console.error("Error inserting data:", error);
        throw new Error("Failed to insert data");
    }

    // redirect("/");
}
