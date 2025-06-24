"use client";
import { FaBell, FaEnvelope, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow px-4 py-3 flex items-center justify-between">
      {/* Chap tomonda logotip yoki nom */}
      <div className="text-xl font-bold text-blue-700">
        🎓 UniHub Admin Panel
      </div>

      {/* O'ng tomon - bildirishnomalar va user */}
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
  );
}
