// components/LikeDrawer.jsx
import { Drawer } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function LikeDrawer({ open, toggleDrawer }) {
  const friends = [
    {
      name: "Dr. Anya Sharma",
      title: "Professor, Computer Science",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZkIY5MPX8jXuFyVcoJHBSVou3c_l1AVuRWm8XgZ219dfBHdo_Zqk0HAKXGrSCoxVNoh5qxlrrsDVvQmjVjiXxrai4_LX-trP2vhG8AYCyMcTlyWZt-WFXjWwlsAOus9qlbjPNfYnMd-JhCSFO4cmvF0LUHjSD1wdNLU8xroZPtCChnY8NvrYGdqXZ09QeOZxgLg5XIxmHoOKP78Uzbe2AIbUs-cY78z1Y-o94D9xnsxSFxR2twIgKlgI44mIun8IN42vXYfFEa0o",
      online: true,
    },
    // Yana qo‘shing...
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: "100%",
          height: "100%",
          "@media (min-width: 640px)": {
            width: 400,
          },
        },
      }}
    >
      <div
        className="relative flex min-h-screen flex-col bg-[#151b1e] justify-between overflow-hidden"
        style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center p-4 pb-2 justify-between bg-[#151b1e]">
          <button onClick={toggleDrawer} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h2 className="text-white text-lg font-bold leading-tight flex-1 text-center pr-12">
            Chat
          </h2>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full h-12">
            <div className="flex items-center rounded-xl h-full bg-[#2b3940]">
              <div className="text-[#9eb3bd] flex items-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search friends"
                className="form-input w-full bg-[#2b3940] text-white px-4 border-none outline-none rounded-r-xl placeholder:text-[#9eb3bd]"
              />
            </div>
          </label>
        </div>

        {/* Friend List */}
        <div className="px-4 overflow-y-auto flex-1 pb-6">
          {friends?.map((friend, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-[#202a2e] transition cursor-pointer"
            >
              <div className="relative">
                <div
                  className="h-14 w-14 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${friend.image})` }}
                ></div>
                {friend.online && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-[2px] border-[#151b1e]"></span>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-white font-medium text-base">
                  {friend.name}
                </p>
                <p className="text-[#9eb3bd] text-sm">{friend.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
