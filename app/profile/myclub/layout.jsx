"use client";
import CustomLink from "@/app/components/LoadingOverlay";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/profile/myclub/clubjoinrequest", label: "📩 So‘rovlar" },
  { href: "/profile/myclub/clubAzolari", label: "👥 A’zolar" },
  { href: "/profile/myclub/chat", label: "💬 Chat" },
  { href: "/profile/myclub/elon", label: "📢 E’lonlar" },
  { href: "/profile/myclub/topshiriq", label: "📝 Topshiriqlar" },
];

export default function MyClubLayout({ children }) {
  const pathname = usePathname();

  // faqat desktopda ko‘rinadi
  return (
    <div className="hidden md:block px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <CustomLink
          href="/"
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          ← Bosh sahifaga
        </CustomLink>
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <CustomLink
              key={tab.href}
              href={tab.href}
              className={`text-sm px-4 py-2 rounded-md font-medium transition ${
                pathname === tab.href
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </CustomLink>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        {children}
      </div>
    </div>
  );
}
