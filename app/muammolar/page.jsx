"use client";

import { useState } from "react";
import Link from "next/link";
import CustomLink from "../components/LoadingOverlay";
const initialIssues = [
  {
    title: "Yotoqxonada Wi-Fi ishlamayapti",
    description:
      "So‘nggi 2 haftadan beri 3-yotoqxonada internet juda sust yoki umuman yo‘q.",
    likes: 37,
    comments: 12,
    category: "Yotoqxona",
    time: "2 kun oldin",
  },
  {
    title: "Darsliklar yetishmaydi",
    description: "1-kurs informatika darsligi kutubxonada mavjud emas.",
    likes: 24,
    comments: 7,
    category: "O‘quv jarayoni",
    time: "5 kun oldin",
  },
];

export default function IssuesPage() {
  const [allIssues, setAllIssues] = useState(initialIssues);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category) return;

    const newIssue = {
      title,
      description,
      category,
      likes: 0,
      comments: 0,
      time: "Yangi",
    };

    setAllIssues([newIssue, ...allIssues]);
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <main className="min-h-screen bg-red-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-800 mb-6">
          🚨 Talabalar Muammolari
        </h1>
        <div className="mb-6 flex justify-start">
          <CustomLink
            href="/"
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
          >
            ← Bosh sahifaga
          </CustomLink>
        </div>
        {/* Muammo qo‘shish formasi */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-2xl shadow border border-red-200 mb-8"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-4">
            📝 Muammo qo‘shish
          </h2>
          <input
            type="text"
            placeholder="Muammo sarlavhasi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-red-100 rounded p-2 mb-3 text-sm sm:text-base text-black"
          />
          <textarea
            placeholder="Muammo tafsiloti"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-black border  border-red-100 rounded p-2 mb-3 text-sm sm:text-base"
            rows={3}
          />
          <input
            type="text"
            placeholder="Kategoriya (masalan: Yotoqxona)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-black border border-red-100 rounded p-2 mb-3 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yuborish
          </button>
        </form>

        {/* Muammolar ro‘yxati */}
        <div className="grid grid-cols-1 gap-6">
          {allIssues.map((issue, i) => (
            <div
              key={i}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow border border-red-100"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-1">
                {issue.title}
              </h2>
              <p className="text-gray-700 mb-2 text-sm sm:text-base">
                {issue.description}
              </p>
              <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-1">
                <span>📂 {issue.category}</span>
                <span>🕓 {issue.time}</span>
              </div>
              <div className="mt-3 flex gap-4 text-xs sm:text-sm text-gray-600">
                <span>👍 {issue.likes} ta</span>
                <span>💬 {issue.comments} ta izoh</span>
              </div>
              <a
                href="#"
                className="mt-2 inline-block text-sm text-red-600 hover:underline"
              >
                → Muhokamani ko‘rish
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
