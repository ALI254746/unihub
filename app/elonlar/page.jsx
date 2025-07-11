"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function AnnouncementsPage() {
  const [elonlar, setElonlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState("barchasi");
  const [search, setSearch] = useState("");
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
  useEffect(() => {
    const fetchElonlar = async () => {
      try {
        const res = await fetch("/api/adminapi/elon");
        const data = await res.json();
        if (res.ok) setElonlar(data);
        else setError(data.message || "❌ E’lonlar yuklanmadi");
      } catch (err) {
        setError("🔌 Serverga ulanishda xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchElonlar();
  }, []);

  const filteredElonlar = elonlar.filter((item) => {
    const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = filters === "barchasi" || item.category === filters;
    return searchMatch && categoryMatch;
  });

  return (
    <>
      <Navbar
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
      <main className="min-h-screen bg-gray-50 p-6 text-black">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="text-gray-600 text-xl animate-pulse">
                ⏳ Yuklanmoqda...
              </p>
            </div>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filteredElonlar.length === 0 ? (
            <p className="text-gray-500">Hozircha e’lon yo‘q.</p>
          ) : (
            <div className="space-y-4">
              {filteredElonlar.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 text-gray-700 p-2 rounded-full text-xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-sm mt-1">
                        {item.description}
                      </p>
                      <span className="inline-block mt-2 bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {getTimeAgo(item.createdAt)}
                  </div>
                </div>
              ))}
              <div className="mt-10 flex justify-center items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      i === 1
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
