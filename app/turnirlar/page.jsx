"use client";
import { useState } from "react";
import JoinForTurnir from "./joinforturnir"; // ✅ Katta harf bilan
import Image from "next/image";

const mockTournaments = [
  {
    id: "1",
    name: "Frontend Battle",
    type: "Dasturlash",
    startDate: "2025-07-10",
    description: "Next.js asosidagi loyiha musobaqasi",
    location: "Online",
    image: "https://source.unsplash.com/featured/?coding,programming",
  },
  {
    id: "2",
    name: "PUBG Mobile Championship",
    type: "E-sport",
    startDate: "2025-07-15",
    description: "PUBG’da real vaqtda jang",
    location: "Universitet majmuasi",
    image: "https://source.unsplash.com/featured/?pubg,gaming",
  },
];

export default function AllTournamentsPage() {
  const [search, setSearch] = useState("");
  const [selectedTournament, setSelectedTournament] = useState(null);

  const filtered = mockTournaments.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const getDaysLeft = (dateStr) => {
    const now = new Date();
    const start = new Date(dateStr);
    const diff = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">
        🏆 Barcha Turnirlar
      </h1>

      <input
        type="text"
        placeholder="Qidirish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded text-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((turnir) => (
          <div
            key={turnir.id}
            className="bg-white p-4 rounded-xl shadow border"
          >
            <div className="relative h-40 w-full mb-3 rounded overflow-hidden">
              <Image
                src={turnir.image}
                alt={turnir.name}
                fill
                className="object-cover text-black"
              />
            </div>
            <h2 className="text-xl font-semibold text-indigo-700">
              {turnir.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{turnir.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              🕒 {getDaysLeft(turnir.startDate)} kun qoldi
            </p>
            <p className="text-sm text-gray-600 mt-1">📍 {turnir.location}</p>
            <button
              onClick={() => setSelectedTournament(turnir.name)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Qo‘shilish
            </button>
          </div>
        ))}
      </div>

      {/* Modal chiqarish */}
      <JoinForTurnir
        isOpen={!!selectedTournament}
        tournamentName={selectedTournament}
        onClose={() => setSelectedTournament(null)}
      />
    </div>
  );
}
