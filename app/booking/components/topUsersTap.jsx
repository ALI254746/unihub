"use client";

import React, { useState } from "react";
import { UserPlus, CheckCircle } from "lucide-react";

const users = [
  {
    name: "Ziyoda Karimova",
    faculty: "Kompyuter ilmlari",
    hours: 14.5,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    seat: "#12",
    seatUsage: 41,
  },
  {
    name: "Hojiakbar Mamanosirov",
    faculty: "Sun'iy intellekt",
    hours: 12.8,
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    seat: "#7",
    seatUsage: 35,
  },
  {
    name: "Asadbek Rahimov",
    faculty: "Iqtisodiyot",
    hours: 10.2,
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    seat: "#22",
    seatUsage: 29,
  },
  {
    name: "Malika Toshpulatova",
    faculty: "Tarix fakulteti",
    hours: 9.7,
    avatarUrl: "https://randomuser.me/api/portraits/women/47.jpg",
    seat: "#15",
    seatUsage: 34,
  },
  {
    name: "Rustam Qodirov",
    faculty: "Biologiya",
    hours: 8.5,
    avatarUrl: "https://randomuser.me/api/portraits/men/48.jpg",
    seat: "#4",
    seatUsage: 19,
  },
  {
    name: "Gulnora Aliyeva",
    faculty: "Filologiya",
    hours: 7.8,
    avatarUrl: "https://randomuser.me/api/portraits/women/49.jpg",
    seat: "#9",
    seatUsage: 15,
  },
];

const filters = ["Kun", "Hafta", "Oy"];

export default function TopUsersTab() {
  const [activeFilter, setActiveFilter] = useState("Hafta");
  const [friends, setFriends] = useState([]);

  const handleAddFriend = (name) => {
    if (!friends.includes(name)) {
      setFriends([...friends, name]);
    }
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "⭐";
  };

  return (
    <div className="w-full mx-auto px-4 space-y-10">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
          Eng ko'p <span className="block sm:inline">foydalanganlar</span>
        </h2>

        {/* Filter */}
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

      {/* User cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5 border border-gray-100 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                {/* Rank number */}
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {index + 1}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {user.name}
                  <span>{getMedal(index)}</span>
                </h3>
                <p className="text-sm text-gray-500">{user.faculty}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {user.seat} stulni{" "}
                  <span className="font-semibold">{user.seatUsage} marta</span>{" "}
                  ishlatgan
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-md font-medium text-[#0284c7]">
                ⏳ {user.hours} soat
              </p>
              <button
                onClick={() => handleAddFriend(user.name)}
                disabled={friends.includes(user.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  friends.includes(user.name)
                    ? "bg-green-100 text-green-700"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90"
                }`}
              >
                {friends.includes(user.name) ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Do‘st qo‘shildi
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" /> Do‘st
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
