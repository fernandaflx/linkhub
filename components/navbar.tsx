"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import ThemeSwitcher from "./theme-switcher";
import { useAuth } from "@/app/auth-provider";

export function NavBar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isAuthenticated = !!user;

  const publicLinks = [{ href: "/login", label: "Entrar" }];

  const appLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/projects", label: "Projetos" },
    { href: "/settings", label: "Configurações" },
  ];

  const links = isAuthenticated ? appLinks : publicLinks;

  const hideLinks = pathname === "/login" || pathname === "/signup";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 py-3">
      <div className="glass-panel flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-sm">
          {!hideLinks && (
            <>
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <button className="rounded-full bg-destructive px-4 py-1 text-xs font-medium text-destructive-foreground">
                  Sair
                </button>
              ) : (
                <Link
                  href="/signup"
                  className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground"
                >
                  Criar conta
                </Link>
              )}
            </>
          )}

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
