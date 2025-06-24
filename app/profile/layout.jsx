"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Heroicons yoki lucide dan foydalanish

const navItems = [
  { href: "/profile", label: "📄 Profilim" },
  { href: "/profile/myclub", label: "🏗 Mening Klubim" },
  { href: "/profile/friends", label: "🤝 Do‘stlar" },
  { href: "/profile/achievements", label: "🏆 Yutuqlar" },
  { href: "/profile/profileedit", label: "✏️ Profilni tahrirlash" },
];

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar: Desktop */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 px-6 py-8 hidden sm:block overflow-y-auto max-h-screen sticky top-0">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          👤 Profil Boshqaruvi
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg font-medium transition ${
                pathname === item.href
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar: Mobile (Drawer) */}
      <div className="sm:hidden absolute top-4 left-4 z-20">
        <button
          className="text-gray-700 bg-white border border-gray-300 rounded p-2 shadow"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div
          className="sm:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-64 bg-white h-full shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">👤 Boshqaruv</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition ${
                    pathname === item.href
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
