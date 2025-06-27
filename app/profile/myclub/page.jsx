"use client";
import { useEffect, useState } from "react";

export default function MyClubPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchMyClubRequests = async () => {
      try {
        const res = await fetch("/api/myclubs/requests", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setClubs(data.data); // data.data bu [klublar]
        } else {
          console.error("❌ Xatolik:", data.message);
        }
      } catch (err) {
        console.error("🔌 Tarmoq xatoligi:", err.message);
      }
    };

    fetchMyClubRequests();
  }, []);

  const acceptRequest = (clubId, requestId) => {
    // ❗ Bu yerda API chaqiruv bo'lishi kerak
    console.log("✅ Qabul qilindi", clubId, requestId);
  };

  const rejectRequest = (clubId, requestId) => {
    // ❗ Bu yerda API chaqiruv bo'lishi kerak
    console.log("❌ Rad etildi", clubId, requestId);
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-yellow-700 text-center mb-6">
        🏗 Mening Klublarim
      </h1>

      {clubs.length === 0 ? (
        <p className="text-gray-600 text-center">
          Siz yaratgan klub yoki so‘rov yo‘q.
        </p>
      ) : (
        clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-2xl shadow p-6 space-y-6 border border-yellow-200"
          >
            <div>
              <h2 className="text-2xl font-semibold text-yellow-800">
                {club.name}
              </h2>
              <p className="text-gray-700">{club.description}</p>
              <p className="text-sm mt-1 text-gray-500">
                🎯 Qiziqishlar: {club.interests || "–"}
              </p>
            </div>

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
                      key={user._id}
                      className="flex justify-between items-center bg-yellow-100 px-4 py-2 rounded-lg text-black"
                    >
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{user.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptRequest(club._id, user._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          ✅ Qabul qilish
                        </button>
                        <button
                          onClick={() => rejectRequest(club._id, user._id)}
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
          </div>
        ))
      )}
    </main>
  );
}
