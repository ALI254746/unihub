"use client";
import { useState } from "react";

// Ko‘p klubli mock ma'lumot
const mockClubs = [
  {
    id: "dasturchilar",
    name: "Dasturchilar Klubi",
    description: "Frontend, backend va mobil dasturlashni o‘rganamiz.",
    interests: ["React", "Node.js", "Hackathon"],
    members: [
      { id: "1", name: "Shahzod Mamatqulov" },
      { id: "2", name: "Ali Karimov" },
    ],
    pendingRequests: [
      { id: "3", name: "Dilshod Qodirov" },
      { id: "4", name: "Madina Saidova" },
    ],
  },
  {
    id: "robototexnika",
    name: "Robototexnika Klubi",
    description: "Arduino, IoT va avtomatlashtirish bo‘yicha ishlaymiz.",
    interests: ["Arduino", "C++", "Sensor tizimlar"],
    members: [{ id: "5", name: "Lola Tursunova" }],
    pendingRequests: [],
  },
];

export default function MyClubPage() {
  const [clubs, setClubs] = useState(mockClubs);

  const acceptRequest = (clubId, userId) => {
    setClubs((prev) =>
      prev.map((club) => {
        if (club.id !== clubId) return club;

        const accepted = club.pendingRequests.find((u) => u.id === userId);
        return {
          ...club,
          pendingRequests: club.pendingRequests.filter((u) => u.id !== userId),
          members: [...club.members, accepted],
        };
      })
    );
  };

  const rejectRequest = (clubId, userId) => {
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              pendingRequests: club.pendingRequests.filter(
                (u) => u.id !== userId
              ),
            }
          : club
      )
    );
  };

  const removeMember = (clubId, userId) => {
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              members: club.members.filter((u) => u.id !== userId),
            }
          : club
      )
    );
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-yellow-700 text-center mb-6">
        🏗 Mening Klublarim
      </h1>

      {clubs.map((club) => (
        <div
          key={club.id}
          className="bg-white rounded-2xl shadow p-6 space-y-6 border border-yellow-200"
        >
          {/* Club Info */}
          <div>
            <h2 className="text-2xl font-semibold text-yellow-800">
              {club.name}
            </h2>
            <p className="text-gray-700">{club.description}</p>
            <p className="text-sm mt-1 text-gray-500">
              🎯 Qiziqishlar: {club.interests.join(", ")}
            </p>
          </div>

          {/* Pending Requests */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              ⏳ A’zolik so‘rovlari
            </h3>
            {club.pendingRequests.length === 0 ? (
              <p className="text-gray-500">So‘rovlar yo‘q.</p>
            ) : (
              <ul className="space-y-2">
                {club.pendingRequests.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center bg-yellow-100 px-4 py-2 rounded-lg text-black"
                  >
                    <span>{user.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptRequest(club.id, user.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        ✅ Qabul qilish
                      </button>
                      <button
                        onClick={() => rejectRequest(club.id, user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        ❌ Rad etish
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Members */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              👥 A’zolar
            </h3>
            {club.members.length === 0 ? (
              <p className="text-gray-500">A’zolar yo‘q.</p>
            ) : (
              <ul className="space-y-2">
                {club.members.map((member) => (
                  <li
                    key={member.id}
                    className="flex justify-between items-center bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 text-black"
                  >
                    <span>{member.name}</span>
                    <button
                      onClick={() => removeMember(club.id, member.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      🗑 Chiqarish
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
