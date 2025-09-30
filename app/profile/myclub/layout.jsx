"use client";
import { useState } from "react";
import {
  FaClipboardList,
  FaUsers,
  FaLightbulb,
  FaChartSimple,
} from "react-icons/fa6";
import ClubMembers from "./clubAzolari/page";
import ClubTask from "./page";
import ClubIdeas from "./ideas/page";
import ClubVote from "./votes/page";

export default function ClubAdminLayout() {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      {/* Tabs Navigation */}
      <div className="sticky bottom-0 left-0 right-0 bg-white shadow-sm border-t rounded-2xl border-gray-200 z-10">
        <div className="flex justify-around">
          <TabButton
            isActive={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
            icon={<FaClipboardList className="text-lg" />}
            label="Topshiriqlar"
          />
          <TabButton
            isActive={activeTab === "members"}
            onClick={() => setActiveTab("members")}
            icon={<FaUsers className="text-lg" />}
            label="A'zolar"
          />
          <TabButton
            isActive={activeTab === "ideas"}
            onClick={() => setActiveTab("ideas")}
            icon={<FaLightbulb className="text-lg" />}
            label="G'oyalar"
          />
          <TabButton
            isActive={activeTab === "votes"}
            onClick={() => setActiveTab("votes")}
            icon={<FaChartSimple className="text-lg" />}
            label="So'rovlar"
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow p-4">
        {activeTab === "tasks" && <ClubTask />}
        {activeTab === "members" && <ClubMembers />}
        {activeTab === "ideas" && <ClubIdeas />}
        {activeTab === "votes" && <ClubVote />}
      </main>
    </div>
  );
}

function TabButton({ isActive, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-3 px-4 w-full ${
        isActive
          ? "text-blue-600 font-medium border-t-2 border-primary-600"
          : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
