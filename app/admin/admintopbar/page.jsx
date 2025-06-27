"use client";

import { useState } from "react";
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import AdminNavbar from "../navbaradmin/page";

export default function AdminTopbar() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Menyu tugmasi */}
          <button
            onClick={() => setOpenDrawer(true)}
            className="text-gray-700 hover:text-blue-700 md:hidden focus:outline-none"
          >
            <FaBars size={20} />
          </button>

          {/* Logotip */}
          <div className="text-xl font-bold text-blue-700">
            🎓 UniHub Admin Panel
          </div>
        </div>

        {/* O'ng tomon */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-blue-600">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="relative text-gray-600 hover:text-blue-600">
            <FaEnvelope size={20} />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              1
            </span>
          </button>
          <div className="flex items-center gap-2 text-gray-700">
            <FaUserCircle size={24} />
            <span className="font-medium hidden sm:inline">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </header>

      {/* Drawer */}
      {openDrawer && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 "
            onClick={() => setOpenDrawer(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-64 bg-white h-full shadow-lg z-50">
            {/* Drawer yopish tugmasi */}
            <button
              onClick={() => setOpenDrawer(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <AdminNavbar />
          </div>
        </div>
      )}
    </>
  );
}
