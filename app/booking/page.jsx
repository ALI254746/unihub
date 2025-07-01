"use client";

import { useState } from "react";
import BookingLibrary from "./components/BookingLibrary";
import BookingSport from "./components/BookingSport";
import CoustomLink from "../components/LoadingOverlay"; // Importing custom link component
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
            <CoustomLink
              href="/"
              className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              ← Bosh sahifaga
            </CoustomLink>
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
