"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TopUsersTab from "../components/topUsersTap";
import StatisticsTab from "../components/StatisticsTap";
import BookingTab from "../components/BookingTab";
import Friends from "../components/Friend";

export default function BookingLibrary() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "booking";

  const handleTabClick = (tab) => {
    router.push(`?page=${tab}`);
  };

  const tabs = [
    {
      id: "topusers",
      label: "TOP Foydalanuvchilar",
      icon: "👑",
    },
    {
      id: "Friend",
      label: "Do‘stlarni kuzatish",
      icon: "🤝",
    },
    {
      id: "statistics",
      label: "Statistikalar",
      icon: "📊",
    },
    {
      id: "booking",
      label: "Band qilish",
      icon: "🪑",
    },
  ];

  return (
    <div className="relative -top-4 space-y-4">
      {/* Tabs */}
      <div className="flex justify-center  md:justify-between gap-8 bg-white rounded-2xl shadow-md px-2 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
              page === tab.id
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        {page === "topusers" && <TopUsersTab />}
        {page === "Friend" && <Friends />}
        {page === "statistics" && <StatisticsTab />}
        {page === "booking" && <BookingTab />}
      </div>
    </div>
  );
}
