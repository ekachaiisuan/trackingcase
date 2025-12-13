"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type CaseData = {
    blackno: string;
    plaintiff: string;
    accused: string;
    timeat: string;
    typereq: string;
    department: string;
    remarks: string;
    namereq: string;
};

export async function insertForm(data: CaseData) {
    const supabase = await createClient();

    const { error } = await supabase.from("cases").insert({
        blackno: data.blackno,
        plaintiff: data.plaintiff,
        accused: data.accused,
        timeat: data.timeat,
        typereq: data.typereq,
        department: data.department,
        remarks: data.remarks,
        namereq: data.namereq,
    });

    if (error) {
        if (error.code === '303') {
            // 303 See Other: Ignore this error to allow redirect to proceed
            console.log("Supabase returned 303, proceeding to redirect...");
            throw new Error("Redirecting to view page");
        } else {
            console.error("Error inserting data:", error);
            throw new Error("Failed to insert data");
        }
    }
    redirect("/form/view");
}
