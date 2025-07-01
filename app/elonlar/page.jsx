"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import CustomLink from "../components/LoadingOverlay";
import { gsap } from "gsap";

export default function AnnouncementsPage() {
  const [elonlar, setElonlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const titleRef = useRef(null); // 🔵 Sarlavha uchun ref

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: "bounce.out",
        duration: 1.5,
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

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

    return date.toLocaleDateString("uz-UZ");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 ref={titleRef} className="text-3xl font-bold text-blue-700">
          📢 E'lonlar
        </h1>
        <CustomLink
          href="/"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Bosh sahifaga
        </CustomLink>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-gray-600 text-xl animate-pulse">
            ⏳ Yuklanmoqda...
          </p>
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : elonlar.length === 0 ? (
        <p className="text-gray-500">Hozircha e’lon yo‘q.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {elonlar.map((elon) => (
            <li
              key={elon._id}
              className="bg-white p-4 rounded-xl shadow hover:bg-blue-50 transition"
            >
              <div className="flex items-center gap-2 text-blue-800 font-semibold">
                <span className="text-lg">
                  {getCategoryIcon(elon.category)}
                </span>
                <h2 className="text-base font-semibold truncate">
                  {elon.title}
                </h2>
              </div>
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                {elon.description}
              </p>
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
