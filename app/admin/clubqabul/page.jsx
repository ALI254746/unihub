"use client";

import { useEffect, useState } from "react";

export default function AdminClubManagePage() {
  const [pending, setPending] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, clubRes] = await Promise.all([
          fetch("/api/club-request"),
          fetch("/api/clubs"),
        ]);

        if (reqRes.ok) {
          const pendingData = await reqRes.json();
          console.log("✅ club-request javobi:", pendingData);
          setPending(pendingData); // ⬅️ to'g'ridan-to'g'ri massiv
        }

        if (clubRes.ok) {
          const clubData = await clubRes.json();
          console.log("✅ clubs javobi:", clubData);
          setClubs(clubData.data); // ⬅️ to'g'ridan-to'g'ri massiv
        }
      } catch (error) {
        console.error("API dan ma'lumot olishda xatolik:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
    const club = pending.find((c) => c._id === id);
    if (!club) return;

    try {
      const res = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(club),
      });

      if (res.ok) {
        const { data: newClub } = await res.json();
        await fetch(`/api/club-request/${id}`, { method: "DELETE" });

        setClubs((prev) => [...prev, newClub]);
        setPending((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Club yaratishda xatolik:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/club-request/${id}`, {
        method: "DELETE",
      });
      setPending((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("So‘rovni rad etishda xatolik:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDel = confirm("Rostdan ham o‘chirmoqchimisiz?");
    if (!confirmDel) return;

    try {
      const res = await fetch(`/api/clubs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setClubs((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Club o‘chirishda xatolik:", err);
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
          {Array.isArray(pending) && pending.length === 0 ? (
            <p className="text-gray-500">Hozircha yangi so‘rov yo‘q.</p>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {pending.map((club) => (
                <div
                  key={club._id}
                  className="border p-4 rounded-xl shadow-sm bg-gray-50"
                >
                  <h3 className="font-semibold text-blue-800">{club.name}</h3>
                  <p className="text-sm text-gray-700">{club.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    👤 {club.fullname || "Ism yo‘q"}
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
          {Array.isArray(clubs) && clubs.length === 0 ? (
            <p className="text-gray-500">Hech qanday klub mavjud emas.</p>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {clubs.map((club) => (
                <div
                  key={club._id}
                  className="border p-4 rounded-xl shadow-sm bg-white"
                >
                  <h3 className="font-semibold text-blue-800">{club.name}</h3>
                  <p className="text-sm text-gray-700">{club.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    👤 {club.fullname || "Ism yo‘q"}
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
