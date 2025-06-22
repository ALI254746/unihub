"use client";

import { useState } from "react";
import Link from "next/link"; // 👈 Link import qilindi

const allStaff = [
  {
    id: 1,
    name: "Xayrulla Polvonov",
    position: "Bosh dekan",
    department: "Boshqaruv kafedrasi",
    room: "1-bino, 204-xona",
    workDays: "Dushanba - Shanba",
    hours: "09:00 - 17:00",
  },
  {
    id: 2,
    name: "Ziyoda G‘ofurova",
    position: "O‘quv ishlari bo‘yicha prorektor",
    department: "Rektorat",
    room: "1-bino, 101-xona",
    workDays: "Dushanba - Juma",
    hours: "08:30 - 16:30",
  },
  {
    id: 3,
    name: "Ulug‘bek Rahimov",
    position: "AT bo‘limi boshlig‘i",
    department: "Axborot texnologiyalari",
    room: "3-bino, 305-xona",
    workDays: "Dushanba - Juma",
    hours: "09:00 - 17:00",
  },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Barchasi");

  const departments = [
    "Barchasi",
    "Boshqaruv kafedrasi",
    "Rektorat",
    "Axborot texnologiyalari",
  ];

  const filteredStaff = allStaff.filter(
    (s) =>
      (filter === "Barchasi" || s.department === filter) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-800 mb-6">
          📋 Boshqaruv xodimlari
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Xodim nomi bo‘yicha qidiruv"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-orange-200 rounded p-2 text-black"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-orange-200 rounded p-2 text-black"
          >
            {departments.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStaff.map((person) => (
            <Link
              key={person.id}
              href={`/staffdetail`}
              className="bg-white p-6 rounded-2xl shadow border border-orange-200 block hover:bg-orange-50"
            >
              <h2 className="text-xl font-semibold text-orange-700 mb-1">
                {person.name}
              </h2>
              <p className="text-gray-600">🏢 Lavozim: {person.position}</p>
              <p className="text-gray-600">🏬 Kafedra: {person.department}</p>
              <p className="text-gray-600">📍 Xona: {person.room}</p>
              <p className="text-gray-600">
                🕘 Ish vaqti: {person.workDays}, {person.hours}
              </p>

              <span className="text-orange-600 text-sm hover:underline inline-block mt-2">
                ➕ To‘liq profilni ko‘rish
              </span>
            </Link>
          ))}

          {filteredStaff.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              Hech qanday xodim topilmadi.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
