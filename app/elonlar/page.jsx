"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import {
  FaHome,
  FaSearch,
  FaClock,
  FaBell,
  FaCalendar,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
function MobilAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState("news");
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElonlar = async () => {
      try {
        const res = await fetch("/api/adminapi/elon");
        const data = await res.json();
        if (res.ok) setAnnouncements(data);
        else setError(data.message || "❌ E’lonlar yuklanmadi");
      } catch (err) {
        setError("🔌 Serverga ulanishda xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchElonlar();
  }, []);

  const filtered = announcements.filter((item) => {
    const bySearch = item.title.toLowerCase().includes(search.toLowerCase());
    const byTab =
      activeTab === "news"
        ? item.category === "yangilik"
        : activeTab === "announcement"
        ? item.category === "e'lon"
        : item.category === "ogohlantirish";
    return bySearch && byTab;
  });

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center text-[#0284C7] justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">E'lonlar</h1>
          <Link href="/">
            <span className="flex items-center px-3 py-1.5 text-sm rounded-full bg-blue-100 text-primary hover:bg-blue-100 cursor-pointer transition">
              <FaHome className="text-xs mr-1.5" />
              <span>Bosh sahifaga</span>
            </span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {["Yangiliklar", "E'lon", "Ogohlantirish"].map((tab, i) => {
            const tabKey = ["news", "announcement", "alert"][i];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                className={`flex-1 py-3 text-sm font-medium ${
                  isActive
                    ? "text-[#0284C7] border-b-2 border-[#0284C7]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </header>

      {/* Search */}
      <div className="p-4 sticky top-[105px] z-5 shadow-sm bg-white">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
          <input
            type="search"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm 
              bg-sky-50 placeholder-black 
              border border-sky-200 rounded-lg
              focus:outline-none focus:ring-2 
              focus:ring-sky-500 transition duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20 pt-2">
        {loading ? (
          <p className="text-gray-600 text-center py-10">⏳ Yuklanmoqda...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center">Mos e’lon topilmadi.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <span className="bg-blue-100 text-black text-xs px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <FaClock className="mr-1.5" />
                <span>{new Date(item.createdAt).toLocaleString("uz-UZ")}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      {/* <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t border-gray-100 py-2 px-4 max-w-md mx-auto">
        <button className="flex flex-col items-center p-2 text-primary">
          <FaHome className="text-lg" />
          <span className="text-xs mt-1">Bosh sahifa</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <FaBell className="text-lg" />
          <span className="text-xs mt-1">E'lonlar</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <FaCalendar className="text-lg" />
          <span className="text-xs mt-1">Jadval</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <FaUser className="text-lg" />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </nav> */}
    </div>
  );
}
function DescktopAnnouncementsPage() {
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
      <main className="min-h-screen pt-[85px] px-4 bg-gray-50 p-6 text-black">
        <div className="max-w-5xl mx-auto">
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
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default function VideoChatPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // ilk renderda tekshirish
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobilAnnouncementsPage /> : <DescktopAnnouncementsPage />;
}
