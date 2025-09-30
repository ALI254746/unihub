"use client";
import React, { useState } from "react";
import { FaList, FaBook, FaHandshake, FaUsers } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import TasksTab from "./task";
import MembersTab from "./clubMembers";
import IdeasTab from "./IdeasTab";
import VotesTab from "./VotesTab";
const tabs = [
  {
    id: 1,
    name: "Topshiriqlar",
    icon: <FaList className="text-harvard-gray" size={20} />,
  },
  {
    id: 2,
    name: "Club A'zolari",
    icon: <FaUsers className="text-harvard-gray" size={20} />,
  },
  {
    id: 3,
    name: "ideas",
    icon: <FaLightbulb className="text-harvard-gray" size={20} />,
  },
  {
    id: 4,
    name: "ovozlar ",
    icon: <FaCommentDots className="text-harvard-gray" size={20} />,
  },
];

export default function Tab() {
  const [activeTab, setActiveTab] = useState(1);
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <TasksTab />;
      case 2:
        return <MembersTab />;
      case 3:
        return <IdeasTab />;
      case 4:
        return <VotesTab />;
      default:
        return null;
    }
  };
  return (
    <div id="tabs-section" className="px-4 py-3">
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition 
              ${
                activeTab === tab.id
                  ? "bg-[#0284C7] text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}
