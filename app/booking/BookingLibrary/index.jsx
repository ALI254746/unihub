"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TopUsersTab from "../components/topUsersTap";
import StatisticsTab from "../components/StatisticsTap";
import BookingTab from "../components/BookingTab";

export default function BookingLibrary() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || "booking"; // default = booking

  const handleTabClick = (tab) => {
    // sahifani yangilamay URL ni o'zgartirish
    router.push(`?page=${tab}`);
  };

  return (
    <div className="relative -top-4 space-y-2 ">
      {/* Tabs (horizontal buttons) */}
      <div className="flex  justify-center gap-20    sm:gap-4 sm:justify-center md:justify-between md:gap-5 bg-white rounded-2xl text-4xl  shadow-md pb-2">
        {[
          {
            id: "topusers",
            label: "TOP Foydalanuvchilar",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-7 md:h-7 text-blue-600 mr-2"
                fill="currentColor"
              >
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
            ),
          },
          {
            id: "statistics",
            label: "Statistikalar",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-7 md:h-7 text-blue-600 mr-2"
                fill="currentColor"
              >
                <path d="M32 32h32v448H32zm384 128h32v320h-32zm-128 96h32v224h-32zM160 320h32v128h-32z" />
              </svg>
            ),
          },
          {
            id: "booking",
            label: "band qilish",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5  sm:w-7 sm:h-7 md:w-7 md:h-7 text-blue-600 mr-2"
                fill="currentColor"
              >
                <path d="M152 64v24a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8V64h32a32 32 0 0 1 32 32v32H88V96a32 32 0 0 1 32-32h32zm0-32H120a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h208a64 64 0 0 0 64-64V96a64 64 0 0 0-64-64h-32v24a40 40 0 0 1-40 40H192a40 40 0 0 1-40-40V32z" />
              </svg>
            ),
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center px-3 py-2 sm:px-6 sm:py-4 text-sm sm:text-base font-medium border-b-2 ${
              page === tab.id
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-[#3f64af] hover:text-black"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        {page === "topusers" && <TopUsersTab />}
        {page === "statistics" && <StatisticsTab />}
        {page === "booking" && <BookingTab className="" />}
      </div>
    </div>
  );
}
