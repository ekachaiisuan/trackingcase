import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">


        <div className="flex-1 flex flex-col justify-center items-center gap-20 max-w-5xl p-5 w-full">
          <LoginForm />
        </div>


      </div>
    </main>
  );
}
