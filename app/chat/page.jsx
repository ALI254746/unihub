// app/chat/page.tsx
"use client";
import { useState } from "react";
import CustomLink from "../components/LoadingOverlay"; // Importing custom link component
const sampleUsers = [
  {
    name: "Diyor Mahmudov",
    gender: "Male",
    gpa: 3.9,
    direction: "Dasturiy injiniring",
    course: "2-kurs",
    interests: ["React", "Hackathon", "Blog yozish"],
  },
  {
    name: "Dilnoza Karimova",
    gender: "Female",
    gpa: 3.7,
    direction: "Axborot xavfsizligi",
    course: "3-kurs",
    interests: ["Cybersecurity", "C++", "Kitob o‘qish"],
  },
  {
    name: "Azamat Toshpulatov",
    gender: "Male",
    gpa: 4.0,
    direction: "Sun’iy intellekt",
    course: "4-kurs",
    interests: ["AI", "Python", "Chess"],
  },
];

export default function ChatPage() {
  const [userIndex, setUserIndex] = useState(0);
  const [messages, setMessages] = useState([
    { from: "other", text: "Salom! Qanday o'qishyapsiz?" },
    { from: "me", text: "Salom, yaxshi! Sizchi?" },
    { from: "other", text: "Men ham yaxshi, React o‘rganayapman" },
  ]);
  const [input, setInput] = useState("");

  const randomUser = sampleUsers[userIndex];

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  const handleNextUser = () => {
    setUserIndex((prev) => (prev + 1) % sampleUsers.length);
    setMessages([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4 md:p-6">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
          🎥 Video Chat Format
        </h1>
        <CustomLink
          href="/"
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ← Bosh sahifaga
        </CustomLink>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-2">
        <div className="bg-black rounded-xl overflow-hidden relative aspect-video">
          <div className="absolute bottom-2 left-2 text-white text-sm bg-gray-800 bg-opacity-60 px-2 py-1 rounded">
            Siz
          </div>
          <video
            className="w-full h-full object-cover bg-gray-800"
            autoPlay
            muted
          ></video>
        </div>

        <div className="bg-black rounded-xl overflow-hidden relative aspect-video">
          <div className="absolute bottom-2 left-2 text-white text-sm bg-gray-800 bg-opacity-60 px-2 py-1 rounded">
            {randomUser.name}
          </div>
          <video className="w-full h-full object-cover bg-gray-800"></video>
        </div>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-200 max-w-5xl mx-auto mb-4 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="text-xl font-bold text-indigo-700">
              {randomUser.name}
            </h3>
            <p className="text-gray-600">
              👫 {randomUser.gender} · {randomUser.course}
            </p>
            <p className="text-gray-600">📚 {randomUser.direction}</p>
            <p className="text-gray-600">📊 GPA: {randomUser.gpa}</p>
          </div>
          <div>
            <p className="text-sm text-black">🎯 Qiziqishlar:</p>
            <ul className="list-disc list-inside text-gray-700">
              {randomUser.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl h-64 overflow-y-auto mb-4 space-y-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 italic mt-20">
              Suhbat boshlanmadi. Birinchi siz yozishingiz mumkin.
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`w-fit max-w-[70%] px-4 py-2 rounded-lg text-sm shadow break-words ${
                  msg.from === "me"
                    ? "ml-auto bg-indigo-600 text-black"
                    : "bg-white border border-indigo-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xabaringizni yozing..."
            className="flex-grow px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Yuborish
          </button>
          <button
            onClick={handleNextUser}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
          >
            Keyingisi
          </button>
        </div>
      </section>
    </main>
  );
}
