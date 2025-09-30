"use client";
import { useState } from "react";
import {
  FaBell,
  FaPlus,
  FaMagnifyingGlass,
  FaHeart,
  FaComment,
  FaShare,
  FaHouse,
  FaCalendar,
  FaLightbulb,
  FaUser,
} from "react-icons/fa6";

const mockIdeas = [
  {
    id: 1,
    user: {
      name: "Emma Johnson",
      avatar: "/avatar-1.jpg",
      year: "3rd Year, Computer Science",
    },
    date: "2 days ago",
    title: "Campus Tech Hackathon",
    description:
      "Let's organize a weekend hackathon focused on solving campus problems with technology...",
    tags: ["#tech", "#event", "#innovation"],
    likes: 32,
    comments: 8,
  },
  {
    id: 2,
    user: {
      name: "James Wilson",
      avatar: "/avatar-2.jpg",
      year: "2nd Year, Business Administration",
    },
    date: "Yesterday",
    title: "Sustainability Week",
    description:
      "I propose we organize a sustainability week with workshops, speakers...",
    tags: ["#sustainability", "#event"],
    likes: 18,
    comments: 5,
  },
];

export default function IdeasPage() {
  const [liked, setLiked] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen max-w-md mx-auto relative pb-20">
      <div className="px-2 py-2 bg-white rounded-2xl border-2 border-blue-500">
        <div className="flex items-center gap-2">
          {/* Search - 75% */}
          <div className="w-3/4 relative">
            <input
              type="text"
              placeholder="Search ideas..."
              className="w-full text-center px-4 py-2 border border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-400 transition-all duration-300
    placeholder:px-5 text-black font-bold  placeholder:italic placeholder:animate-pulse bg-gradient-to-r from-white via-blue-50 to-white"
            />
            <FaMagnifyingGlass className="absolute left-3.5 top-3 text-[#0284C7]" />
          </div>

          {/* Button - 25% */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-1/4 bg-[#0284C7] text-white rounded-full py-2.5 font-medium hover:bg-primary-700 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            <span className="hidden sm:inline">Share your idea</span>
          </button>
        </div>
      </div>
      {/* Idea Cards */}
      <div className="pt-2 pb-16">
        {mockIdeas.map((idea) => (
          <div
            key={idea.id}
            className="p-4 mb-3 mx-0 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <img
                  src={idea.user.avatar}
                  className="w-10 h-10 rounded-full mr-3"
                  alt="user"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {idea.user.name}
                  </h3>
                  <p className="text-xs text-gray-500">{idea.user.year}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{idea.date}</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {idea.title}
            </h2>
            <p className="text-gray-600 mb-3">{idea.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                className={`flex items-center gap-1 ${
                  liked[idea.id] ? "text-primary-600" : "text-gray-500"
                }`}
                onClick={() => toggleLike(idea.id)}
              >
                <FaHeart />
                <span>{idea.likes + (liked[idea.id] ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                <FaComment />
                <span>{idea.comments}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                <FaShare />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 bg-opacity-30 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/30 backdrop-blur-lg  rounded-2xl  shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Share your idea
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Idea title"
                className=" font-extrabold mb-4 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 placeholder:font-extrabold text-black"
              />
              <textarea
                placeholder="Idea description"
                rows={4}
                className=" font-extrabold text-black placeholder:font-extrabold  mb-4 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2"
              />
              <button className="w-full bg-blue-600 text-white rounded-xl py-2.5 font-medium hover:bg-blue-700 transition">
                Post Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
