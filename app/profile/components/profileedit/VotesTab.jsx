import React from "react";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";

const PollCard = ({ icon, question, options, totalVotes, deadline }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <span className=" text-[#0284C7] mr-2">{icon}</span>
          <span className="text-black font-bold">{question}</span>
        </h3>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          Faol
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {options.map((opt, index) => (
          <div key={index} className="relative">
            <button
              className={`w-full px-4 py-3 rounded-xl border text-left flex justify-between items-center ${
                opt.active
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200 hover:bg-blue-50"
              }`}
            >
              <span className="text-black">{opt.label}</span>
              <span
                className={`text-xs font-medium ${
                  opt.active ? "text-primary-600" : "text-gray-500"
                }`}
              >
                {opt.percent}%
              </span>
            </button>
            <div
              className={`absolute bottom-0 left-0 h-1 ${
                opt.active ? "bg-primary-500" : "bg-gray-300"
              } rounded-b-xl`}
              style={{ width: `${opt.percent}%` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{totalVotes} ta ovoz</span>
        <span>Muddat: {deadline}</span>
      </div>
    </div>
  );
};

const Vote = () => {
  return (
    <section id="active-polls" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Faol so'rovlar</h2>
        <button className="text-sm text-blue-400 font-medium">Barchasi</button>
      </div>

      {/* Poll 1: Event Date */}
      <PollCard
        icon={<FaCalendar />}
        question="Yig'ilish qachon bo'lsin?"
        totalVotes={25}
        deadline="23 Iyul"
        options={[
          { label: "Dushanba", percent: 56, active: true },
          { label: "Seshanba", percent: 32, active: false },
          { label: "Chorshanba", percent: 12, active: false },
        ]}
      />

      {/* Poll 2: Location */}
      <PollCard
        icon={<FaLocationDot />}
        question="Uchrashuv qayerda o'tkazilsin?"
        totalVotes={18}
        deadline="25 Iyul"
        options={[
          { label: "Universitet hovlisi", percent: 45, active: false },
          { label: "Zoom", percent: 38, active: true },
          { label: "Kutubxona", percent: 17, active: false },
        ]}
      />
    </section>
  );
};

export default Vote;
