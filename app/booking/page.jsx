"use client";

import { useState } from "react";
import BookingLibrary from "./components/BookingLibrary";
import BookingSport from "./components/BookingSport";
import Link from "next/link";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("library");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <main className="min-h-screen bg-gradient-to-tr from-indigo-50 to-white px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Bosh sahifaga qaytish */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-full shadow-sm hover:bg-indigo-100 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Bosh sahifaga
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 tracking-tight">
            📆 Bron qilish tizimi
          </h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            {[
              { id: "library", label: "📚 Kutubxona" },
              { id: "sport", label: "🏋️ Sport zali" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm sm:text-base font-medium rounded-full border transition-all duration-200 shadow-sm ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-6 bg-white shadow rounded-2xl p-4 sm:p-6">
            {activeTab === "library" && <BookingLibrary />}
            {activeTab === "sport" && <BookingSport />}
          </div>
        </div>
      </main>
    </LocalizationProvider>
  );
}
