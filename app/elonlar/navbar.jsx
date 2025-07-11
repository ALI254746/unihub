// components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function Navbar({ filters, setFilters, search, setSearch }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-gray-300/80  backdrop-blur-md 0 border-b  shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <h1 className="text-xl font-bold text-gray-800">📢 E’lonlar</h1>
          {pathname !== "/" && (
            <Link
              href="/"
              className="text-blue-600 text-sm hover:underline whitespace-nowrap"
            >
              ← Bosh sahifaga
            </Link>
          )}
        </div>

        {/* Filterlar */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {["barchasi", "yangilik", "e'lon", "ogohlantirish"].map((item) => (
            <button
              key={item}
              onClick={() => setFilters(item)}
              className={`px-3 py-1 text-sm rounded-md border ${
                filters === item
                  ? "bg-black text-white border-gray-900"
                  : "text-gray-700 border-gray-300 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64  ">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="E’lon qidirish..."
            className="w-full text-black bg-gray-100 border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
