"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBook, FaUserFriends, FaUser } from "react-icons/fa";

export default function FooterNavbar() {
  const pathname = usePathname();

  const items = [
    {
      label: "Bosh sahifa",
      href: "/",
      icon: FaHome,
    },
    {
      label: "My club ",
      href: "/profile/myclub",
      icon: FaBook,
    },

    {
      label: "Profil",
      href: "/profile",
      icon: FaUser,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-30">
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-center text-center"
          >
            <Icon
              className={`w-5 h-5 ${
                isActive ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs mt-1 ${
                isActive ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
