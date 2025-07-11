"use client";

import { useEffect, useState } from "react";

export default function AdminXizmatlarPage() {
  const [xizmatlar, setXizmatlar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchXizmatlar = async () => {
      try {
        const res = await fetch("/api/adminapi/serviceStudent");
        const json = await res.json();
        if (res.ok) setXizmatlar(json.data || []);
      } catch (err) {
        console.error("Xizmatlarni olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchXizmatlar();
  }, []);

  const handleTasdiqlash = async (id) => {
    try {
      const res = await fetch(`/api/adminapi/serviceStudent/agree/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setXizmatlar((prev) =>
          prev.map((x) => (x._id === id ? { ...x, status: "approved" } : x))
        );
      }
    } catch (err) {
      console.error("Tasdiqlashda xatolik:", err);
    }
  };

  const handleOchirish = async (id) => {
    if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/adminapi/serviceStudent/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setXizmatlar((prev) => prev.filter((x) => x._id !== id));
      }
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    }
  };

  const tasdiqlanmagan = xizmatlar.filter((x) => x.status !== "approved");
  const tasdiqlangan = xizmatlar.filter((x) => x.status === "approved");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 min-h-screen">
      {/* 👈 So'rovlar */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-black">
          🕓 Kutilayotgan so‘rovlar
        </h2>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : tasdiqlanmagan.length === 0 ? (
          <p className="text-black">So‘rovlar mavjud emas</p>
        ) : (
          tasdiqlanmagan.map((x) => (
            <div
              key={x._id}
              className="bg-white border p-3 mb-3 rounded-lg shadow-sm"
            >
              <p className="font-semibold text-blue-800 text-sm">
                🧾 {x.fan} - {x.xizmatTuri}
              </p>
              <p className="text-xs">💰 {x.narxi} so'm</p>
              <p className="text-xs">🔗 {x.telegramHavola}</p>
              <p className="text-xs">📄 {x.description}</p>
              <p className="text-xs text-gray-600 mt-1">
                👤 {x.user?.firstName} {x.user?.lastName} ({x.user?.email}){" "}
                <br />
                🏫 {x.user?.faculty}, {x.user?.course}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleTasdiqlash(x._id)}
                  className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                >
                  Tasdiqlash
                </button>
                <button
                  onClick={() => handleOchirish(x._id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Ruxsat berilgan */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-black">
          ✅ Ruxsat berilgan xizmatlar
        </h2>
        {tasdiqlangan.length === 0 ? (
          <p>Hozircha ruxsat berilganlar yo‘q</p>
        ) : (
          tasdiqlangan.map((x) => (
            <div
              key={x._id}
              className="bg-white border p-3 mb-3 rounded-lg shadow-sm"
            >
              <p className="font-semibold text-green-800 text-sm">
                🧾 {x.fan} - {x.xizmatTuri}
              </p>
              <p className="text-xs text-black">💰 {x.narxi} so'm</p>
              <p className="text-xs text-black">🔗 {x.telegramHavola}</p>
              <p className="text-xs text-black">📄 {x.description}</p>
              <p className="text-xs text-black  mt-1">
                👤 {x.user?.firstName} {x.user?.lastName} ({x.user?.email}){" "}
                <br />
                🏫 {x.user?.faculty}, {x.user?.course}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleOchirish(x._id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
