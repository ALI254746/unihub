"use client";

import { useEffect, useState } from "react";

export default function XizmatlarPage() {
  const [xizmatlar, setXizmatlar] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Ma'lumotlarni olish
  const fetchApprovedServices = async () => {
    try {
      const res = await fetch("/api/adminapi/serviceStudent");
      const json = await res.json();

      if (res.ok) {
        const approved = json.data.filter((x) => x.status === "approved");
        setXizmatlar(approved);
      }
    } catch (err) {
      console.error("Xizmatlarni olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedServices();
  }, []);

  // ✅ Reyting berish funksiyasi
  const handleRating = async (xizmatId, value) => {
    try {
      const res = await fetch(`/api/talabaXizmatAdd/rate/${xizmatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (res.ok) {
        const json = await res.json();

        // Frontenddagi xizmatlar ichida shu xizmatni topib yangilash
        setXizmatlar((prev) =>
          prev.map((x) =>
            x._id === xizmatId
              ? { ...x, rank: json.average, myRating: json.myRating }
              : x
          )
        );
      } else {
        alert("❌ Reytingni saqlashda xatolik");
      }
    } catch (err) {
      console.error("Bahoni berishda xatolik:", err);
    }
  };

  return (
    <div className="pt-20 sm:pt-[80px] px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          🛠 Talabalar xizmatlari
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Yuklanmoqda...</p>
        ) : xizmatlar.length === 0 ? (
          <p className="text-center text-gray-500">
            Hozircha hech qanday xizmat mavjud emas.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {xizmatlar.map((x) => (
              <div
                key={x._id}
                className="bg-white rounded-xl shadow p-5 space-y-3 relative"
              >
                <h1 className="text-lg font-semibold text-gray-900">
                  {x.user?.firstName}
                </h1>
                <h2 className="text-lg font-semibold text-gray-900">
                  {x.fan} – {x.xizmatTuri}
                </h2>
                <p className="text-sm text-gray-600">{x.kurs},</p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {x.description}
                </p>
                <p className="text-sm text-green-600">
                  Narxi: {x.narxi || "Kelishiladi"}
                </p>
                {/* Yulduzcha bosish */}
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(x._id, star)}
                      className={`text-xl ${
                        star <= Math.round(x.rank || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:scale-110 transition-transform`}
                      title={`${star} yulduz`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {/* Reyting va kommentlar */}
                <div className="flex justify-between items-center pt-2">
                  <a
                    href={`https://t.me/${x.telegramHavola}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Telegram
                  </a>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-sm text-gray-500">
                    <span title="O'rtacha reyting">⭐ {x.rank || "0.0"}</span>

                    {x.myRating && (
                      <span
                        title="Sizning bahoingiz"
                        className="text-yellow-500"
                      >
                        🟡 Sizning baho: {x.myRating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
