"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBullhorn,
  FaUserGraduate,
  FaUserPlus,
  FaChalkboardTeacher,
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const navLinks = [
  { href: "/admin", label: "Boshqaruv", icon: <FaHome /> },
  { href: "/admin/elonlaradd", label: "E’lonlar", icon: <FaBullhorn /> },
  { href: "/admin/talabalar", label: "Talabalar", icon: <FaUserGraduate /> },
  {
    href: "/admin/ustozlaradd",
    label: "Ustozlar",
    icon: <FaChalkboardTeacher />,
  },
  {
    href: "/admin/clubqabul",
    label: "Club Qabul",
    icon: <FaUserPlus />,
  },
  {
    href: "/admin/muammolar",
    label: "Muammolar",
    icon: <FaExclamationTriangle />,
  },
  {
    href: "/admin/bookinBoard",
    label: "Bookin Board",
    icon: <FaExclamationTriangle />,
  },
  {
    href: "/admin/TalabaResurslarMarkazi",
    label: "Talaba Dars resurslari",
    icon: <FaUserPlus />,
  },
  {
    href: "/admin/TalabaXizmatTaklifi",
    label: "Talaba xizmat taklifi",
    icon: <FaUserPlus />,
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="h-full w-64 bg-white shadow-lg">
      <div className="p-6 text-blue-700 font-bold text-2xl border-b border-gray-100">
        🎓 UniHub Admin
      </div>
      <nav className="mt-4 space-y-1 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition ${
              pathname === link.href
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-4 py-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center gap-2 justify-center"
        >
          <FaSignOutAlt />
          Chiqish
        </button>
      </div>
    </aside>
  );
}
