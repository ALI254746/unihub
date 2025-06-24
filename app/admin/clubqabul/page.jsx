"use client";
import { useState } from "react";

const sorovlar = [
  {
    _id: "s1",
    name: "Matematika Klubi",
    description: "Matematikani yaxshi ko‘radiganlar uchun",
    creatorEmail: "olimjon@mail.com",
  },
  {
    _id: "s2",
    name: "Robototexnika",
    description: "Robotlar, Arduino va texnologiya klubi",
    creatorEmail: "diyorbek@gmail.com",
  },
];

const mavjudClublar = [
  {
    _id: "c1",
    name: "Dasturchilar Klubi",
    description: "Frontend, backend, mobil dasturchilar",
    creatorEmail: "ali@gmail.com",
  },
  {
    _id: "c2",
    name: "Sportchilar",
    description: "Futbol, basketbol va yugurish jamoasi",
    creatorEmail: "bekzod@example.com",
  },
];

export default function AdminClubManagePage() {
  const [pending, setPending] = useState(sorovlar);
  const [clubs, setClubs] = useState(mavjudClublar);

  const handleApprove = (id) => {
    const club = pending.find((c) => c._id === id);
    setClubs([...clubs, club]);
    setPending(pending.filter((c) => c._id !== id));
  };

  const handleReject = (id) => {
    setPending(pending.filter((c) => c._id !== id));
  };

  const handleDelete = (id) => {
    const confirmDel = confirm("Rostdan ham o‘chirmoqchimisiz?");
    if (confirmDel) {
      setClubs(clubs.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        🛠 Club boshqaruvi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yangi so‘rovlar */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📩 Yangi club so‘rovlari
          </h2>
          {pending.length === 0 ? (
            <p className="text-gray-500">Hozircha yangi so‘rov yo‘q.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((club) => (
                <div
                  key={club._id}
                  className="border p-4 rounded-xl shadow-sm bg-gray-50"
                >
                  <h3 className="font-semibold text-blue-800">{club.name}</h3>
                  <p className="text-sm text-gray-700">{club.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    📧 {club.creatorEmail}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleApprove(club._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      ✅ Ruxsat berish
                    </button>
                    <button
                      onClick={() => handleReject(club._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      ❌ Rad etish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mavjud klublar */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🏷 Mavjud klublar
          </h2>
          {clubs.length === 0 ? (
            <p className="text-gray-500">Hech qanday klub mavjud emas.</p>
          ) : (
            <div className="space-y-4">
              {clubs.map((club) => (
                <div
                  key={club._id}
                  className="border p-4 rounded-xl shadow-sm bg-white"
                >
                  <h3 className="font-semibold text-blue-800">{club.name}</h3>
                  <p className="text-sm text-gray-700">{club.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    📧 {club.creatorEmail}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(club._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑 O‘chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
