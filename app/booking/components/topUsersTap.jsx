"use client";

import React, { useState } from "react";
import { UserCircle } from "lucide-react";
const users = [
  {
    name: "Ziyoda Karimova",
    faculty: "Kompyuter ilmlari",
    hours: 14.5,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Hojiakbar Mamanosirov",
    faculty: "Sun'iy intellekt",
    hours: 12.8,
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Asadbek Rahimov",
    faculty: "Iqtisodiyot",
    hours: 10.2,
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Malika Toshpulatova",
    faculty: "Tarix fakulteti",
    hours: 9.7,
    avatarUrl: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Rustam Qodirov",
    faculty: "Biologiya",
    hours: 8.5,
    avatarUrl: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    name: "Gulnora Aliyeva",
    faculty: "Filologiya",
    hours: 7.8,
    avatarUrl: "https://randomuser.me/api/portraits/women/49.jpg",
  },
];

const filters = ["Kun", "Hafta", "Oy", "Yil"];

export default function TopUsersTab() {
  const [activeFilter, setActiveFilter] = useState("Hafta");

  return (
    <div className="w-full  mx-auto px-4 space-y-10">
      {/* Title */}
      <div className="flex items-center justify-between  gap-4">
        {/* Sarlavha */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
          Eng ko'p <span className="block sm:inline">foydalanganlar</span>
        </h2>

        {/* Filter tugmalar guruhi (bir butun blok) */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 ${
                activeFilter === filter
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* User cards (kartochka formatida) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 shadow-lg">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white  rounded-xl shadow-md p-4 flex items-center"
          >
            {/* Avatar qismi */}
            <div className="flex-shrink-0 mr-4">
              <img
                src={user.avatarUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-15 h-15 rounded-full object-cover"
              />
            </div>

            {/* Foydalanuvchi ma'lumotlari */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 ">{user.name}</h3>
              <p className="text-sm m text-gray-500 ">{user.faculty}</p>
              <p className="text-md font-medium text-[#0284c7] mt-1">
                {user.hours} soat
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
