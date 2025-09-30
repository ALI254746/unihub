import React from "react";
import { useState } from "react";
// Dummy data
const members = [
  {
    id: 1,
    name: "Muhammad Ali",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    year: "2nd Year",
    faculty: "Faculty of Law",
    joined: "Mar 12, 2024",
    isFollowing: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    year: "3rd Year",
    faculty: "Computer Science",
    joined: "Jan 5, 2023",
    isFollowing: true,
  },
  {
    id: 3,
    name: "David Chen",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    year: "1st Year",
    faculty: "Engineering",
    joined: "Sep 20, 2023",
    isFollowing: false,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    year: "4th Year",
    faculty: "Psychology",
    joined: "Feb 17, 2022",
    isFollowing: true,
  },
  {
    id: 5,
    name: "James Wilson",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    year: "2nd Year",
    faculty: "Business Administration",
    joined: "Oct 8, 2023",
    isFollowing: false,
  },
  {
    id: 6,
    name: "Sophia Kim",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    year: "3rd Year",
    faculty: "Architecture",
    joined: "Apr 30, 2023",
    isFollowing: true,
  },
  {
    id: 7,
    name: "Michael Brown",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    year: "2nd Year",
    faculty: "Physics",
    joined: "Nov 15, 2023",
    isFollowing: false,
  },
  {
    id: 8,
    name: "Olivia Davis",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    year: "1st Year",
    faculty: "Fine Arts",
    joined: "Dec 7, 2023",
    isFollowing: true,
  },
];

export default function ClubMembers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="pt-1 pb-6 px-0 text-black">
      {/* 🔍 Search input */}
      <div className="mb-1 px-1">
        <input
          type="text"
          placeholder="A'zo qidirish..."
          className="w-full px-4 py-2 border border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-400 transition-all duration-300
    placeholder:text-blue-400 placeholder:italic placeholder:animate-pulse bg-gradient-to-r from-white via-blue-50 to-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 👥 Filtered members */}
      {filteredMembers.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          Hech qanday a'zo topilmadi.
        </p>
      ) : (
        filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-darkCard rounded-lg p-2 mb-3 flex items-center shadow-md mx-1"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
            />

            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-black">{member.name}</h3>
              <p className="text-sm text-black">
                {member.year}, {member.faculty}
              </p>
              <p className="text-xs text-black mt-1">
                Joined on: {member.joined}
              </p>
            </div>

            {member.isFollowing ? (
              <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-full">
                <svg
                  className="w-4 h-4 text-black"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
            ) : (
              <button className="px-4 py-1.5 border border-primary text-blue-500 rounded-full text-sm font-medium">
                Follow
              </button>
            )}
          </div>
        ))
      )}
    </main>
  );
}
