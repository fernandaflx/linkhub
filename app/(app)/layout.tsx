
import type { ReactNode } from "react";
import { NavBar } from "@/components/navbar";


export default async function AppLayout({ children }: { children: ReactNode }) {


  return (
    <>
      <NavBar />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}
