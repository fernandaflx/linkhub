
import type { ReactNode } from "react";
import { NavBar } from "@/components/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
    </>
  );
}
