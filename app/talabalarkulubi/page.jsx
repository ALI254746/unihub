"use client";

import { useState } from "react";
import Link from "next/link";

const clubs = [
  {
    id: "dasturchilar",
    name: "Dasturchilar Klubi",
    description: "Frontend, backend va mobil dasturlashni o‘rganamiz.",
    members: 52,
    leader: "Shahzod Mamatqulov",
    interests: ["React", "Node.js", "Hackathon"],
  },
  {
    id: "robototexnika",
    name: "Robototexnika Klubi",
    description: "Arduino, IoT va avtomatlashtirish bo‘yicha ishlaymiz.",
    members: 34,
    leader: "Dilrabo Umarova",
    interests: ["Arduino", "C++", "Sensor tizimlar"],
  },
  {
    id: "suniy-intellekt",
    name: "Sun'iy Intellekt Klubi",
    description: "AI va ML sohalarida loyihalar va seminarlar o'tamiz.",
    members: 41,
    leader: "Sardor Usmonov",
    interests: ["AI", "Python", "Data Science"],
  },
];

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFormClub, setOpenFormClub] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    direction: "",
    course: "",
    phone: "",
    reason: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJoin = () => {
    console.log("Jo‘natilmoqda:", form);
    setOpenFormClub(null);
    setForm({
      firstName: "",
      lastName: "",
      direction: "",
      course: "",
      phone: "",
      reason: "",
    });
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-6 relative">
      {/* Form Modal */}
      {openFormClub && (
        <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-yellow-700">
              📝 {openFormClub.name} klubiga qo‘shilish
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ism"
                name="firstName"
                value={form.firstName}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              />
              <input
                type="text"
                placeholder="Familiya"
                name="lastName"
                value={form.lastName}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              />
              <select
                name="direction"
                value={form.direction}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              >
                <option value="">Yo‘nalish tanlang</option>
                <option>Axborot texnologiyalari</option>
                <option>Kompyuter ilmlari</option>
                <option>Sun’iy intellekt</option>
              </select>
              <select
                name="course"
                value={form.course}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              >
                <option value="">Kursni tanlang</option>
                <option>1-kurs</option>
                <option>2-kurs</option>
                <option>3-kurs</option>
                <option>4-kurs</option>
              </select>
              <input
                type="text"
                placeholder="Telefon raqami"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="p-2 border rounded text-black col-span-2"
              />
              <textarea
                placeholder="Nega bu klubga qo‘shilmoqchisiz?"
                name="reason"
                value={form.reason}
                onChange={handleFormChange}
                className="p-2 border rounded text-black col-span-2"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenFormClub(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleJoin}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
          >
            ← Bosh sahifaga
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-yellow-800">
            🏅 Talabalar Klublari
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Klub nomi yoki tavsifi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />

            <Link
              href="/clubyaratish"
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition whitespace-nowrap"
            >
              ➕ Klub ochish
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClubs.length === 0 ? (
            <p className="text-center text-yellow-900 font-semibold col-span-full">
              Qidiruv natijasi topilmadi.
            </p>
          ) : (
            filteredClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white p-6 rounded-2xl shadow border border-yellow-200 flex flex-col"
              >
                <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
                  {club.name}
                </h2>
                <p className="text-gray-700 mb-2 flex-grow">
                  {club.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  👤 Yetakchi: {club.leader}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  👥 A’zolar: {club.members} ta
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  🎯 Qiziqishlar: {club.interests.join(", ")}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setOpenFormClub(club)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                  >
                    Klubga qo‘shilish
                  </button>
                  <Link
                    href={`/clubdetail/${club.id}`}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition inline-block text-center"
                  >
                    Klubni Ko‘rish
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
