"use client";

import { useState } from "react";

const resources = {
  "1-kurs": [
    "Matematika asoslari (PDF)",
    "Kirish Informatika (Video)",
    "Fizika 1-laboratoriya topshiriqlari",
  ],
  "2-kurs": [
    "Ma'lumotlar tuzilmasi konspekti",
    "Web dasturlash - HTML & CSS",
    "Diskret matematika topshiriqlari",
  ],
  "3-kurs": [
    "Algoritmlar va murakkablik",
    "JavaScript asoslari",
    "Tarmoq texnologiyalari darsligi",
  ],
  "4-kurs": [
    "Bitiruv ishi uchun namuna",
    "Fullstack yo'nalishi loyihasi",
    "Malakaviy amaliyot hisobot shabloni",
  ],
};

export default function ResourcesPage() {
  const [selectedKurs, setSelectedKurs] = useState("");

  const kurslar = Object.keys(resources);

  const filteredResources = selectedKurs
    ? { [selectedKurs]: resources[selectedKurs] }
    : resources;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            📚 Dars resurslari
          </h1>
          <a
            href="/"
            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            ← Bosh sahifaga
          </a>
        </div>

        {/* Kurs bo'yicha filter */}
        <div className="mb-6">
          <label className="mr-4 font-semibold text-green-800">
            Kursni tanlang:
          </label>
          <select
            className="border border-green-400 rounded p-2 text-black"
            value={selectedKurs}
            onChange={(e) => setSelectedKurs(e.target.value)}
          >
            <option value="">Barchasi</option>
            {kurslar.map((kurs) => (
              <option key={kurs} value={kurs}>
                {kurs}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {Object.entries(filteredResources).map(([kurs, list]) => (
            <div key={kurs}>
              <h2 className="text-xl font-semibold text-green-800 mb-3">
                {kurs}
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                {list.map((res, i) => (
                  <li
                    key={i}
                    className="bg-white p-3 rounded-lg shadow hover:bg-green-50 transition text-black"
                  >
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
