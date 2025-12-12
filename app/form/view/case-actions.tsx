"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { deleteCase } from "@/app/action/deletecase";
import { toast } from "sonner";
import { useTransition } from "react";
import Link from "next/link";

export default function CaseActions({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {

        startTransition(async () => {
            try {
                await deleteCase(id);
                toast.success("Case deleted successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete case");
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Link href={`/form/edit/${id}`}>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isPending}
                className="text-destructive hover:text-destructive/90"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
