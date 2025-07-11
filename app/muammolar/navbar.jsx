"use client";
import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import Link from "next/link";
import IssueModal from "./modal"; // 👈 import qilamiz

export default function NavbarIssues({ activeFilter, setActiveFilter }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    "Hammasi",
    "Yotoqxona", // Yashash joyidagi muammolar
    "Kutubxona", // O‘quv resurslar va tartib bilan bog‘liq
    "Dars jarayoni", // O‘qituvchilar, darslar, baholash muammolari
    "Internet", // Wi-Fi, platforma ishlamasligi
    "Boshqaruv", // Rektorat, dekanat, ariza, hujjat muammolari
    "Oshxona", // Taom sifati, gigiyena, narx
    "Gigiyena / Tozalik", // Hojatxona, auditoriyalar tozaligi
  ];

  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-pink-600 text-3xl">🚨</span> Talabalar
                Muammolari
              </h1>
              <Link
                href="/"
                className="text-sm text-blue-600 hover:underline whitespace-nowrap"
              >
                ← Bosh sahifaga
              </Link>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Muammo qidirish..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap"
              >
                <FiPlus /> Muammo qo‘shish
              </button>
            </div>
          </div>

          {/* FILTERLAR – faqat DESKTOPda ko‘rsatiladi */}
          <div className="hidden sm:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeFilter === f
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 font-medium">
                Saralash:
              </label>
              <select className="border rounded px-2 py-1 text-sm text-gray-800">
                <option>Eng yangi</option>
                <option>Ko‘p ovoz</option>
                <option>Ko‘p izoh</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ULANADI */}
      <IssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
