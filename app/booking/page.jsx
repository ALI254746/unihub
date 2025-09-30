"use client";

import { useState } from "react";
import BookingLibrary from "./BookingLibrary";
import BookingSport from "./BookingSport";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Link from "next/link";
import { Home } from "lucide-react";
import { Suspense } from "react";
export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("library");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <main className="min-h-screen bg-gradient-to-tr from-indigo-50 to-white">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
          {/* Home icon fixed top-0 left-0 right-0  bg-white/10 backdrop-blur-sm shadow-sm px-4 py-3 z-10*/}
          <Link
            href="/"
            className="flex items-center text-[#0284C7] hover:text-black"
          >
            <Home className="w-5 h-5 mr-2" />
            <span className="font-medium text-sm sm:text-base">
              Bosh sahifa
            </span>
          </Link>

          {/* Tab buttons */}
          <div className="flex gap-2 sm:gap-4 ">
            {[
              { id: "library", label: "📚 Kutubxona" },
              { id: "sport", label: "🏋️ Sport zali" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-400 text-white shadow"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
        {/* 
     

        {/* Tabs and content wrapper */}
        <div className="w-full px-4 sm:px-8 mt-6">
          {/* Tab content */}
          <div className="w-full  ">
            {activeTab === "library" && (
              <Suspense fallback={<p>Yuklanyapti...</p>}>
                <BookingLibrary />
              </Suspense>
            )}
            {activeTab === "sport" && (
              <Suspense fallback={<p>Yuklanyapti...</p>}>
                <BookingSport />
              </Suspense>
            )}
          </div>
        </div>
      </main>
    </LocalizationProvider>
  );
}
