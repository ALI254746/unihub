"use client";

import { useState } from "react";

const problems = [
  {
    id: "1",
    title: "Wi-Fi ishlamayapti",
    description: "3-qavatdagi xonalarda internet yo‘q.",
    category: "Texnik muammo",
    status: "Yangi",
    submittedBy: "Ali Karimov",
    submittedAt: "2025-06-23 09:30",
  },
  {
    id: "2",
    title: "Tozalikka e’tibor past",
    description: "Yotoqxonada axlat tez-tez yig‘ilmaydi.",
    category: "Tozalik",
    status: "Jarayonda",
    submittedBy: "Dilshod Qodirov",
    submittedAt: "2025-06-22 15:10",
  },
  {
    id: "3",
    title: "O‘qituvchi darsga kechikadi",
    description: "Falonchi o‘qituvchi darsga 20 daqiqa kechikmoqda.",
    category: "Talim sifati",
    status: "Yechilgan",
    submittedBy: "Madina Saidova",
    submittedAt: "2025-06-21 12:45",
  },
];

export default function AdminProblemsPage() {
  const [filter, setFilter] = useState("");
  const filteredProblems = problems.filter(
    (p) => !filter || p.status === filter
  );

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🚨 Talabalar Muammolari
      </h1>

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-64 text-black"
        >
          <option value="">Barcha statuslar</option>
          <option value="Yangi">🆕 Yangi</option>
          <option value="Jarayonda">🔄 Jarayonda</option>
          <option value="Yechilgan">✅ Yechilgan</option>
        </select>
        <input
          type="text"
          placeholder="Qidiruv (nom, muallif)..."
          className="border p-2 rounded w-full md:w-72 text-black"
        />
      </div>

      {/* Jadval */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100  text-black">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Sarlavha</th>
              <th className="px-4 py-2">Kategoriya</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Yuboruvchi</th>
              <th className="px-4 py-2">Sana</th>
              <th className="px-4 py-2">Amal</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((p, i) => (
              <tr key={p.id} className="border-b hover:bg-yellow-50 text-black">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-semibold text-black">
                  {p.title}
                </td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      p.status === "Yangi"
                        ? "bg-red-100 text-red-600"
                        : p.status === "Jarayonda"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">{p.submittedBy}</td>
                <td className="px-4 py-2">{p.submittedAt}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    Ko‘rish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
