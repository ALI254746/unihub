import React from "react";
import {
  FaCalendar,
  FaChevronRight,
  FaArrowRight,
  FaUpload,
  FaDownload,
} from "react-icons/fa";

export default function TasksTap() {
  const tasks = [
    {
      id: 1,
      title: "Dasturlash asoslari",
      description: "Amaliy ish #5 - Funksiyalar",
      date: "12-May, 2023",
      status: "Topshirilgan",
      statusColor: "green",
    },
    {
      id: 2,
      title: "Ma'lumotlar bazasi",
      description: "Amaliy ish #3 - SQL so'rovlar",
      date: "15-May, 2023",
      status: "Jarayonda",
      statusColor: "yellow",
    },
    {
      id: 3,
      title: "Iqtisod asoslari",
      description: "Taqdimot tayyorlash",
      date: "10-May, 2023",
      status: "Kechikkan",
      statusColor: "red",
    },
  ];
  return (
    <div id="tasks-section" className="px-0 py-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg text-black font-bold">Topshiriqlar</h3>
        <button className="text-blue-500 text-sm font-medium flex items-center">
          Barchasi <FaChevronRight className="ml-1 text-xs" />
        </button>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-blue-600 font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <span
                className={`bg-${task.statusColor}-100 text-${task.statusColor}-800 text-xs px-2 py-1 rounded`}
              >
                {task.status}
              </span>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-sm text-gray-500">
                <FaCalendar className="mr-1 text-xs" />
                <span>{task.date}</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button className="text-green-600 hover:underline flex items-center text-sm">
                  <FaUpload className="mr-1" /> Yuklash
                </button>
                <button className="text-blue-600 hover:underline flex items-center text-sm">
                  <FaDownload className="mr-1" /> Yuklab olish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
