"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const mockClubs = [
  {
    id: "1",
    name: "Dasturchilar Klubi",
    goal: "Frontend, backend va mobil dasturlashni o‘rganish va birgalikda loyihalar qilish.",
    interests: ["React", "Node.js", "Next.js", "Hackathon"],
    leader: { name: "Shahzod Mamatqulov", phone: "+998 90 123 45 67" },
    members: [
      {
        id: "m1",
        name: "Ali Karimov",
        direction: "Komp. ilmlari",
        course: "3-kurs",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "m2",
        name: "Madina Saidova",
        direction: "Dasturiy injiniring",
        course: "2-kurs",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "m3",
        name: "Dilshod Qodirov",
        direction: "Axborot xavfsizligi",
        course: "4-kurs",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
    ],
  },
];

export default function ClubDetailPage() {
  const params = useParams();
  const clubId = params?.id || "";

  const club = mockClubs.find((c) => c.id === clubId) || {
    name: "Noma'lum Klub",
    goal: "Ma'lumot topilmadi.",
    interests: [],
    leader: { name: "Noma'lum", phone: "-" },
    members: [],
  };

  const [search, setSearch] = useState("");

  const filteredMembers = club.members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6 border">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">{club.name}</h1>
          <Link
            href="/talabalarkulubi"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            ← Orqaga
          </Link>
        </div>

        {/* Maqsadi */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            🎯 Maqsadi:
          </h2>
          <p className="text-gray-700">{club.goal}</p>
        </section>

        {/* Qiziqishlar */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📌 Qiziqishlar:
          </h2>
          <div className="flex flex-wrap gap-2">
            {club.interests.length > 0 ? (
              club.interests.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-500">Qiziqishlar yo‘q</p>
            )}
          </div>
        </section>

        {/* Rahbar */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            👨‍🏫 Rahbar:
          </h2>
          <p className="text-gray-700">
            {club.leader?.name} — 📞 {club.leader?.phone}
          </p>
        </section>

        {/* Qidiruv */}
        <section>
          <input
            type="text"
            placeholder="A’zo ismi bo‘yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded text-black mb-4"
          />
        </section>

        {/* A’zolar */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            👥 A’zolar:
          </h2>
          {filteredMembers.length === 0 ? (
            <p className="text-gray-500">Hech qanday a’zo topilmadi.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex gap-4 items-center bg-gray-100 p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.course}</p>
                    <p className="text-sm text-gray-500">{member.direction}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
