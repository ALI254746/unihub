"use client";

import React from "react";
import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const usageChartOptions = {
  chart: { type: "line", height: 300 },
  title: { text: "" },
  xAxis: {
    categories: [
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Payshanba",
      "Juma",
      "Shanba",
      "Yakshanba",
    ],
  },
  yAxis: {
    title: { text: "Soatlar" },
  },
  series: [
    {
      name: "Kutubxona",
      data: [12, 14, 9, 15, 8, 6, 10],
      color: "#0ea5e9",
    },
  ],
};
const facultyData = [
  { name: "Kompyuter ilmlari", y: 30.2 },
  { name: "Iqtisodiyot", y: 18.7 },
  { name: "Filologiya", y: 15.8 },
  { name: "Tarix", y: 12.3 },
  { name: "Biologiya", y: 8.5 },
  { name: "Boshqalar", y: 14.5 },
];

export default function StatisticsTab() {
  const [usageRange, setUsageRange] = useState("Kunlik");
  const [facultyRange, setFacultyRange] = useState("Oy bo'yicha");
  const [chartOptions, setChartOptions] = useState(null);
  const facultyChartOptions = {
    chart: { type: "pie", height: window.innerWidth < 640 ? 200 : 300 }, // kichik ekranda 200px},
    title: { text: "" },
    series: [
      {
        name: "Foydalanish",
        data: facultyData.map((item) => ({
          name: `${item.name} (${item.y}%)`, // ← foizni nomga qo‘shyapmiz
          y: item.y,
        })),
      },
    ],
  };
  return (
    <div className="space-y-6 text-white ">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Bugungi foydalanuvchilar */}
        <div className="bg-white  rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bugungi foydalanuvchilar
              </p>
              <h3 className="text-2xl text-black font-bold mt-1">248</h3>
              <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                12% o‘sish
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-500 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 2. O'rtacha foydalanish */}
        <div className="bg-white  rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                O‘rtacha foydalanish
              </p>
              <h3 className="text-2xl text-black font-bold mt-1">3.2 soat</h3>
              <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                8% o‘sish
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-500 dark:text-purple-400"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Bugungi bandlar */}
        <div className="bg-white  rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bugungi bandlar
              </p>
              <h3 className="text-2xl text-black font-bold mt-1">42</h3>
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8V64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
                3% kamayish
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-amber-500 dark:text-amber-400"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 w-full h-auto">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Foydalanish statistikasi */}
          <div className="bg-white  rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">
                Foydalanish statistikasi
              </h3>
              <select
                value={usageRange}
                onChange={(e) => setUsageRange(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-none rounded-md text-gray-800 dark:text-white px-2 py-1 text-sm"
              >
                <option>Kunlik</option>
                <option>Haftalik</option>
                <option>Oylik</option>
              </select>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={usageChartOptions}
            />
          </div>

          {/* Fakultet bo'yicha */}
          <div className="bg-white  rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800  ">
                Fakultetlar bo'yicha
              </h3>
              <select
                value={facultyRange}
                onChange={(e) => setFacultyRange(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-none rounded-md text-gray-800 dark:text-white px-2 py-1 text-sm"
              >
                <option>Oy bo'yicha</option>
                <option>Yil bo'yicha</option>
              </select>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={facultyChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
