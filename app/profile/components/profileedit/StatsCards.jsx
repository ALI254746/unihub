import React from "react";
import {
  FaFileAlt,
  FaClock,
  FaUsers,
  FaUniversity,
  FaCalendarCheck,
  FaVideo,
} from "react-icons/fa";

import CoustomLink from "../../../components/LoadingOverlay";

const stats = [
  {
    id: 1,
    icon: <FaFileAlt className="text-[#0284C7] text-xl mb-1" />,
    value: 12,
    label: "Yuklab olingan Pdf",
    href: "/profile/videochats",
  },
  {
    id: 2,
    icon: <FaClock className="text-[#0284C7] text-xl mb-1" />,
    value: 5.2,
    label: "Soat bugun",
    href: "/profile/controlTime",
  },
  {
    id: 3,
    icon: <FaUsers className="text-[#0284C7] text-xl mb-1" />,
    value: 42,
    label: "Do'stlar",
    href: "/profile/friendList",
  },
  {
    id: 4,
    icon: <FaUniversity className="text-[#0284C7] text-xl mb-1" />,
    value: 3,
    label: "Clublarga A'zoligi",
    href: "/profile/clubmember",
  },
  {
    id: 5,
    icon: <FaCalendarCheck className="text-[#0284C7] text-xl mb-1" />,
    value: 8,
    label: "Band qiligan ",
    href: "/profile/videochats",
  },
  {
    id: 6,
    icon: <FaVideo className="text-[#0284C7] text-xl mb-1" />, // Videochat uchun mos icon
    value: 12, // Masalan: 12 kishiga video orqali qo‘ng‘iroq qilgan
    label: "Videochatlar", // Yoki "Gaplashganlar" / "Video suhbatlar"
    href: "/profile/videochats",
  },
];

export default function Status() {
  return (
    <div
      id="stats-section"
      className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 p-3"
    >
      {stats.map((item) => (
        <CoustomLink
          key={item.id}
          href={item.href || "#"}
          className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition duration-200"
        >
          {item.icon}
          <span className="text-lg text-[#0284C7] font-bold">{item.value}</span>
          <span className="text-xs text-gray-500">{item.label}</span>
        </CoustomLink>
      ))}
    </div>
  );
}
