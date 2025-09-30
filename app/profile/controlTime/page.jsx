"use client";
import Link from "next/link";
import React from "react";
import {
  FaArrowLeft,
  FaHouse,
  FaVideo,
  FaChartLine,
  FaUser,
} from "react-icons/fa6";

export default function Control() {
  return (
    <div className="min-h-screen bg-[#151b1e] flex flex-col justify-between font-[Lexend] text-white mb-14">
      {/* Header */}
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 pb-2 bg-[#151b1e] mt-14">
          <div className="text-white flex size-12 items-center ">
            <Link href={"/profile"}>
              <FaArrowLeft size={24} />
            </Link>
          </div>
          <h2 className="text-lg font-bold text-center flex-1 pr-12">
            Statistics
          </h2>
        </div>

        {/* Study Progress Title */}
        <h2 className="text-[22px] font-bold tracking-tight px-4 pt-5 pb-3">
          Study Progress
        </h2>

        {/* Weekly Stats */}
        <div className="flex flex-wrap gap-4 px-4 py-6">
          <div className="flex min-w-72 flex-1 flex-col gap-2">
            <p className="text-base font-medium">Weekly Study Hours</p>
            <p className="text-[32px] font-bold leading-tight truncate">
              25 hours
            </p>
            <div className="flex gap-1">
              <p className="text-[#9eb3bd] text-base">Last 4 weeks</p>
              <p className="text-[#0bda57] text-base font-medium">+10%</p>
            </div>
            <div className="flex min-h-[180px] flex-col gap-8 py-4">
              {/* Chart (Static SVG for now) */}
              <svg
                width="100%"
                height="148"
                viewBox="-3 0 478 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                  fill="url(#paint0_linear)"
                />
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#9eb3bd"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="236"
                    y1="1"
                    x2="236"
                    y2="149"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2b3940" />
                    <stop offset="1" stopColor="#2b3940" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="flex justify-around text-[#9eb3bd] text-[13px] font-bold">
                <p>Week 1</p>
                <p>Week 2</p>
                <p>Week 3</p>
                <p>Week 4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3e525b] min-w-[158px]">
            <p className="text-base font-medium">Total Hours Studied</p>
            <p className="text-2xl font-bold leading-tight">150 hours</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3e525b] min-w-[158px]">
            <p className="text-base font-medium">Average Daily Study Time</p>
            <p className="text-2xl font-bold leading-tight">3.5 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
