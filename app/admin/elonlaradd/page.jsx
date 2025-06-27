"use client";

import { useState, useEffect } from "react";
// 🕒 Vaqt formatlash funksiyasi
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec} soniya oldin`;
  if (diffMin < 60) return `${diffMin} daqiqa oldin`;
  if (diffHr < 24) return `${diffHr} soat oldin`;
  if (diffDay < 7) return `${diffDay} kun oldin`;

  return date.toLocaleDateString(); // Agar 7 kundan oshsa
}
export default function AdminElonFormPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "yangilik",
  });
  const [elonlar, setElonlar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🔄 E'lonlarni yuklab olish (sahifa yuklanganda)
  useEffect(() => {
    const fetchElonlar = async () => {
      try {
        const res = await fetch("/api/adminapi/elon");
        const data = await res.json();
        if (res.ok) {
          setElonlar(data);
        } else {
          console.error("❌ Xatolik:", data.message);
        }
      } catch (err) {
        console.error("🔌 Ulanishda xatolik:", err);
      }
    };

    fetchElonlar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/adminapi/elon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ E’lon joylandi!");
        setElonlar((prev) => [data.newElon, ...prev]);
        setForm({ title: "", description: "", category: "yangilik" });
      } else {
        setError(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("🔌 Serverga ulanishda xatolik");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Rostdan ham o‘chirmoqchimisiz?");
    if (!confirmed) return;

    const res = await fetch(`/api/adminapi/elon/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setElonlar((prev) => prev.filter((elon) => elon._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-end">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form bo‘limi */}
        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100 text-black">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            ➕ Yangi e’lon qo‘shish
          </h2>

          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="E’lon sarlavhasi"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300"
              required
            />
            <textarea
              placeholder="E’lon matni..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 h-40"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="yangilik">Yangilik</option>
              <option value="ogohlantirish">Ogohlantirish</option>
              <option value="e'lon">E'lon</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "⏳ Yuborilmoqda..." : "📤 Joylash"}
            </button>
          </form>
        </div>

        {/* Joylangan e’lonlar ro‘yxati */}
        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100 overflow-y-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            📋 Joylangan e’lonlar
          </h2>

          {elonlar.length === 0 ? (
            <p className="text-gray-500">Hozircha e’lon yo‘q.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
              {elonlar.map((elon) => (
                <div
                  key={elon._id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm bg-blue-50"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-blue-800">
                      {elon.title}
                    </h3>
                    <span className="text-sm text-gray-500 italic">
                      {formatTimeAgo(elon.createdAt)}
                    </span>
                  </div>

                  <p className="text-gray-700 mt-1 text-sm">
                    {elon.description}
                  </p>

                  <div className="text-sm text-gray-600 mt-1">
                    📌 Kategoriya:{" "}
                    <span className="font-medium">{elon.category}</span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleDelete(elon._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑 O‘chirish
                    </button>
                    <button
                      onClick={() => alert("Tahrirlash hali mavjud emas")}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️ Tahrirlash
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
