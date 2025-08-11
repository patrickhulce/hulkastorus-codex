"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

const navItems = [
  {href: "/app/dashboard", label: "Dashboard"},
  {href: "/app/browse", label: "File Manager"},
  {href: "/app/settings", label: "Settings"},
];

export default function AppLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-neutral-800/70">
        <div className="px-4 py-4 text-lg font-semibold tracking-tight">Hulkastorus</div>
        <nav aria-label="Primary">
          <ul className="px-2 py-2 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      "block rounded-md px-3 py-2 text-sm " +
                      (active
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-300 hover:bg-neutral-900 hover:text-white")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1 p-6">{children}</main>
        <footer className="border-t border-neutral-800/70 px-6 py-4 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Hulkastorus • Privacy • Terms
        </footer>
      </div>
    </div>
  );
}

