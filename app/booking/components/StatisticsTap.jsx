"use client";

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Fakultetlar statistikasi uchun transform funksiyasi
function transformFacultyStats(rawData, range) {
  if (!rawData || rawData.length === 0) return [];

  let data = [];

  if (range === "Kunlik") data = rawData[0]?.data || rawData;
  else if (range === "Haftalik") data = rawData[rawData.length - 1]?.data || [];
  else if (range === "Oylik") data = rawData.flatMap((item) => item.data || []);

  const totalHours = data.reduce((sum, f) => sum + (f.hoursUsed || 0), 0);

  return data.map((f) => ({
    faculty: f.faculty || "Noma'lum fakultet",
    percent:
      totalHours > 0
        ? Number(((f.hoursUsed / totalHours) * 100).toFixed(1))
        : 0,
  }));
}

// StatCard component: loading, growth va onlineUsers bilan
function StatCard({ title, value, onlineUsers, growth, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {loading ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : (
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl text-black font-bold mt-1">{value}</h3>

          {onlineUsers !== undefined && (
            <p className="text-sm text-gray-400 mt-1">
              Online foydalanuvchilar:{" "}
              <span className="font-semibold">{onlineUsers}</span>
            </p>
          )}

          {growth && (
            <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              {growth}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function StatisticsTab() {
  const [usageRange, setUsageRange] = useState("Kunlik");
  const [usageChartOptions, setUsageChartOptions] = useState({});
  const [facultyRange, setFacultyRange] = useState("Kunlik");
  const [facultyData, setFacultyData] = useState([]);
  const [chartHeight, setChartHeight] = useState(300);

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Responsive chart height
  useEffect(() => {
    if (typeof window !== "undefined") {
      setChartHeight(window.innerWidth < 640 ? 200 : 300);
    }
  }, []);

  // Bugungi statistika API chaqiruvi
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/statistika/averageStats");
        if (!res.ok) throw new Error("Statistika topilmadi");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        setStats(null);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  // Foydalanish statistikasi
  useEffect(() => {
    async function fetchUsage() {
      const res = await fetch(`/api/statistika/usage?range=${usageRange}`);
      const data = await res.json();

      let categories = [];
      let hoursUsed = [];
      let users = [];

      if (usageRange === "Kunlik") {
        categories = data[0]?.data?.map((d) => d.hour) || [];
        hoursUsed = data[0]?.data?.map((d) => d.hoursUsed) || [];
        users = data[0]?.data?.map((d) => d.uniqueUsers) || [];
      } else if (usageRange === "Haftalik") {
        categories = data[0]?.data?.map((d) => d.day) || [];
        hoursUsed = data[0]?.data?.map((d) => d.hoursUsed) || [];
        users = data[0]?.data?.map((d) => d.uniqueUsers) || [];
      } else {
        categories = data.map((d) => d.month);
        hoursUsed = data.map((d) => d.hoursUsed);
        users = data.map((d) => d.uniqueUsers);
      }

      setUsageChartOptions({
        title: { text: `${usageRange} foydalanish statistikasi` },
        xAxis: { categories },
        yAxis: { title: { text: "Soatlar / Foydalanuvchilar" } },
        series: [
          { name: "Soatlar", data: hoursUsed },
          { name: "Foydalanuvchilar", data: users },
        ],
      });
    }
    fetchUsage();
  }, [usageRange]);

  // Fakultetlar statistikasi
  useEffect(() => {
    async function fetchFacultyStats() {
      const res = await fetch(`/api/statistika/faculty?range=${facultyRange}`);
      const data = await res.json();
      const transformed = transformFacultyStats(data, facultyRange);
      setFacultyData(transformed);
    }
    fetchFacultyStats();
  }, [facultyRange]);

  const facultyChartOptions = {
    chart: { type: "pie", height: chartHeight },
    title: { text: "" },
    tooltip: { pointFormat: "{series.name}: <b>{point.y}%</b>" },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y:.1f}%",
        },
      },
    },
    series: [
      {
        name: "Foydalanish foizi",
        colorByPoint: true,
        data: facultyData.map((item) => ({
          name: item.faculty,
          y: item.percent,
        })),
      },
    ],
  };

  return (
    <div className="space-y-6 text-white">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <StatCard
          title="Bugungi foydalanuvchilar"
          value={stats?.uniqueUsers || 0}
          onlineUsers={stats?.onlineUsers || 0}
          growth={stats?.uniqueUsersGrowth}
          loading={loadingStats}
        />
        <StatCard
          title="O‘rtacha foydalanish"
          value={stats ? `${stats.averageUsage} soat` : "0 soat"}
          growth={stats?.averageUsageGrowth}
          loading={loadingStats}
        />
      </div>

      {/* Grafiklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">
              Foydalanish statistikasi
            </h3>
            <select
              value={usageRange}
              onChange={(e) => setUsageRange(e.target.value)}
              className="bg-gray-100 border-none rounded-md text-gray-800 px-2 py-1 text-sm"
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

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Fakultetlar bo‘yicha
            </h3>
            <select
              value={facultyRange}
              onChange={(e) => setFacultyRange(e.target.value)}
              className="bg-gray-100 border-none rounded-md text-gray-800 px-2 py-1 text-sm"
            >
              <option value="Kunlik">Kunlik</option>
              <option value="Haftalik">Haftalik</option>
              <option value="Oylik">Oylik</option>
            </select>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={facultyChartOptions}
          />
        </div>
      </div>
    </div>
  );
}
