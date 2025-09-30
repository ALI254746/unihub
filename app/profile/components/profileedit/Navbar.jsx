"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import LikeDrawer from "./navbarLike";
import { FaHeart } from "react-icons/fa";
import ChatDrawer from "./navbarchat";
import { FaTelegramPlane } from "react-icons/fa";

function App() {
  return (
    <div>
      <FaTelegramPlane className="text-blue-500" size={32} />
    </div>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLikeOpen, setisLikeopen] = useState(false);
  const [ischat, setisChat] = useState(false);
  const notificationRef = useRef(null);
  const handleLikeToggle = () => setisLikeopen(!isLikeOpen);
  const handleChatToggle = () => setisChat(!ischat);

  // 🔐 Tashqariga bosilganda notification popoverni yopish
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-30 px-4 flex items-center justify-between">
        {/* Chap taraf */}
        <div className="flex items-center">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="mr-3 text-gray-700"
          >
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-lg font-bold text-[#0284C7]">Talaba</h1>
        </div>

        {/* O‘ng taraf */}
        <div
          className="flex items-center space-x-4 relative"
          ref={notificationRef}
        >
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative"
          >
            <FaBell className="text-xl text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* 🔔 Notification Popover */}
          {showNotification && (
            <div className="absolute top-10 right-0 w-64 bg-white border rounded-lg shadow-lg p-3 z-40">
              <h3 className="font-bold text-gray-800 mb-2">Notifications</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Siz yangi topshiriq oldingiz.</li>
                <li>📅 Bugun kutubxonada joy band qildingiz.</li>
                <li>🎓 Dars jadvali yangilandi.</li>
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4 p-2">
            {/* Telegram Button */}
            <button
              onClick={() => setisChat(true)}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
            >
              <FaTelegramPlane className="text-2xl text-blue-500" />
            </button>

            <ChatDrawer open={ischat} toggleDrawer={() => setisChat(false)} />

            {/* Like Button */}
            <button
              onClick={() => setisLikeopen(true)}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
            >
              <FaHeart className="text-2xl text-red-500" />
            </button>

            <LikeDrawer
              open={isLikeOpen}
              toggleDrawer={() => setisLikeopen(false)}
            />
          </div>
        </div>
      </div>

      {/* 📂 Drawer (Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-20 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menyu</h2>
        </div>
        <ul className="p-4 space-y-3 text-gray-700">
          <li>
            <a href="#">🏠 Bosh sahifa</a>
          </li>
          <li>
            <a href="#">📚 Kutubxona</a>
          </li>
          <li>
            <a href="#">⚽ Sport Zali</a>
          </li>
          <li>
            <a href="#">📩 Murojaat</a>
          </li>
        </ul>
      </div>

      {/* ⚫ Overlay (drawer ochilganda fon) */}
      {drawerOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-10"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </>
  );
}
