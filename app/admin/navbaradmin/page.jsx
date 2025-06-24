"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBullhorn,
  FaUserGraduate,
  FaUserPlus,
  FaChalkboardTeacher,
  FaHome,
  FaCog,
  FaBars,
  FaTimes,
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
  { href: "/admin/sozlamalar", label: "Sozlamalar", icon: <FaCog /> },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // mobilda toggle qilish

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      {/* Mobilda nav toggle tugmasi */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-blue-700 text-lg">UniHub Admin</div>
        <button onClick={() => setOpen(!open)} className="text-gray-600">
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar (desktop + mobil holatida ochiladi) */}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 text-blue-700 font-bold text-2xl border-b border-gray-100">
          🎓 UniHub Admin
        </div>
        <nav className="mt-4 space-y-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
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
    </>
  );
}
