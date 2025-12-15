import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";

export default function FormLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex w-full flex-col">
            <nav className="flex justify-between items-center p-4 border-b">
                <div className="font-bold">ระบบติดตามสำนวนคดี</div>
                <Suspense fallback={<div className="h-10 w-20 animate-pulse bg-muted rounded-md" />}>
                    <AuthButton />
                </Suspense>
            </nav>
            <div className="p-4">
                {children}
            </div>
        </section>
    );
}
