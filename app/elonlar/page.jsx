"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnnouncementsPage() {
  const [elonlar, setElonlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElonlar = async () => {
      try {
        const res = await fetch("/api/adminapi/elon");
        const data = await res.json();
        if (res.ok) {
          setElonlar(data);
        } else {
          setError(data.message || "❌ E’lonlar yuklanmadi");
        }
      } catch (err) {
        setError("🔌 Serverga ulanishda xatolik");
      } finally {
        setLoading(false);
      }
    };

    fetchElonlar();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "yangilik":
        return "📰";
      case "ogohlantirish":
        return "⚠️";
      case "e'lon":
        return "📌";
      default:
        return "📄";
    }
  };

  const getTimeAgo = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) return "hozirgina";
    if (minutes < 60) return `${minutes} daqiqa oldin`;
    if (hours < 24) return `${hours} soat oldin`;
    if (days < 7) return `${days} kun oldin`;

    return date.toLocaleDateString("uz-UZ"); // Masalan: 26.06.2025
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">📢 E'lonlar</h1>
        <Link
          href="/"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Bosh sahifaga
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">⏳ Yuklanmoqda...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : elonlar.length === 0 ? (
        <p className="text-gray-500">Hozircha e’lon yo‘q.</p>
      ) : (
        <ul className="space-y-4">
          {elonlar.map((elon) => (
            <li
              key={elon._id}
              className="bg-white p-4 rounded-xl shadow hover:bg-blue-50 transition"
            >
              <div className="flex items-center gap-2 text-blue-800 font-semibold">
                <span className="text-lg">
                  {getCategoryIcon(elon.category)}
                </span>
                <h2>{elon.title}</h2>
              </div>
              <p className="text-sm text-gray-700 mt-1">{elon.description}</p>
              <div className="text-xs text-gray-500 mt-1">
                🏷 {elon.category} | 🕒 {getTimeAgo(elon.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
