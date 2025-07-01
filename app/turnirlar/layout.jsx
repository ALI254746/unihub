"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import CoustomLink from "../components/LoadingOverlay";

const navLinks = [
  { name: "🏆 Barcha turnirlar", href: "/turnirlar" },
  { name: "📅 Yaqin turnirlar", href: "/turnirlar/yaqin" },
  { name: "🕰 O‘tgan turnirlar", href: "/turnirlar/otgan" },
  { name: "🙋‍♂️ Men qatnashgan", href: "/turnirlar/mening" },
  { name: "🥇 Natijalar", href: "/turnirlar/natijalar" },
];

export default function TurnirlarLayout({ children }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          🎮 Turnirlar Bo‘limi
        </h1>
        <CoustomLink
          href="/"
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          ← Bosh sahifaga
        </CoustomLink>

        {/* Navigatsiya menyu */}
        <nav className="flex flex-wrap gap-3 mb-8 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-4 py-2 rounded-full text-sm transition",
                pathname === link.href
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Har bir sahifaning o‘z kontenti */}
        <section>{children}</section>
      </div>
    </main>
  );
}
