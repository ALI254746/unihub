"use client";
import { useState } from "react";

const mockTalabalar = [
  {
    id: 1,
    name: "Ali Karimov",
    email: "ali@example.com",
    faculty: "Informatika",
  },
  {
    id: 2,
    name: "Nodira Qodirova",
    email: "nodira@example.com",
    faculty: "Fizika",
  },
  {
    id: 3,
    name: "Jasur Rustamov",
    email: "jasur@example.com",
    faculty: "Matematika",
  },
];

export default function AdminTalabalarPage() {
  const [talabalar, setTalabalar] = useState(mockTalabalar);
  const [search, setSearch] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("all");

  const filtered = talabalar.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchesFaculty =
      filterFaculty === "all" || t.faculty === filterFaculty;
    return matchesSearch && matchesFaculty;
  });

  const handleDelete = (id) => {
    if (confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      setTalabalar((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        👨‍🎓 Talabalar ro‘yxati
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Ism yoki email bo‘yicha qidirish"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-1/2 text-black"
        />

        <select
          value={filterFaculty}
          onChange={(e) => setFilterFaculty(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-1/3 text-black"
        >
          <option value="all">Barcha fakultetlar</option>
          <option value="Informatika">Informatika</option>
          <option value="Fizika">Fizika</option>
          <option value="Matematika">Matematika</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-600">Hech qanday talaba topilmadi.</p>
        ) : (
          filtered.map((talaba) => (
            <div
              key={talaba.id}
              className="bg-white shadow rounded-lg p-4 border flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {talaba.name}
                </h3>
                <p className="text-sm text-gray-600">{talaba.email}</p>
                <p className="text-sm text-gray-500">{talaba.faculty}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex gap-2">
                <button
                  onClick={() => handleDelete(talaba.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  🗑 O‘chirish
                </button>
                <button
                  onClick={() => alert("Tahrirlash keyin qo‘shiladi")}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                >
                  ✏️ Tahrirlash
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
