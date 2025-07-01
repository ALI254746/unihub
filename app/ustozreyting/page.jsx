"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import CustomLink from "../components/LoadingOverlay";
const mockTeachers = [
  {
    id: "t1",
    name: "Abdurahmon Qodirov",
    subject: "Algoritmlar va Ma'lumotlar tuzilmasi",
    experience: "10 yil",
    phone: "+998 90 123 45 67",
    region: "Toshkent",
    rating: 4.3,
    reviews: [
      { user: "Ali Karimov", rating: 5, comment: "Juda yaxshi tushuntiradi!" },
      { user: "Dilshod Qodirov", rating: 4, comment: "Fan qiziqarli o'tdi." },
    ],
  },
  {
    id: "t2",
    name: "Mohira Ahmedova",
    subject: "Sun'iy intellekt asoslari",
    experience: "6 yil",
    phone: "+998 91 234 56 78",
    region: "Samarqand",
    rating: 4.8,
    reviews: [
      {
        user: "Madina Saidova",
        rating: 5,
        comment: "Interaktiv uslubda o'tadi!",
      },
      {
        user: "Shaxzod Mamatqulov",
        rating: 5,
        comment: "Yaxshi motivatsiya beradi.",
      },
    ],
  },
];

export default function TeacherRatingsPage() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalTeacher, setModalTeacher] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Barchasi");

  const handleSubmit = (id) => {
    if (!newRating || !newComment) return;
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              reviews: [
                ...t.reviews,
                { user: "Siz", rating: newRating, comment: newComment },
              ],
              rating:
                (t.rating * t.reviews.length + newRating) /
                (t.reviews.length + 1),
            }
          : t
      )
    );
    setNewRating(0);
    setNewComment("");
    setSelectedTeacher(null);
  };

  // 🔍 Filter logic
  const uniqueSubjects = [
    "Barchasi",
    ...new Set(mockTeachers.map((t) => t.subject)),
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = teacher.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      subjectFilter === "Barchasi" || teacher.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            🏆 Ustozlar Reytingi
          </h1>
          <CustomLink
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            ← Bosh sahifaga
          </CustomLink>
        </div>

        {/* 🔍 Qidiruv + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="🔎 Ustoz ismini yozing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border rounded text-black"
          />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full sm:w-1/3 p-3 border rounded text-black"
          >
            {uniqueSubjects.map((subject, i) => (
              <option key={i} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* 👨‍🏫 Teachers List */}
        {filteredTeachers.length === 0 ? (
          <p className="text-gray-500 mt-6">Ustoz topilmadi...</p>
        ) : (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white p-6 rounded-2xl shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {teacher.name} —{" "}
                <span className="text-gray-600">{teacher.subject}</span>
              </h2>
              <p className="text-sm text-gray-500">
                Tajriba: {teacher.experience}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <p className="font-medium text-yellow-600 text-lg">
                  {teacher.rating.toFixed(1)}
                </p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(teacher.rating)
                          ? "fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() =>
                    selectedTeacher === teacher.id
                      ? setSelectedTeacher(null)
                      : setSelectedTeacher(teacher.id)
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {selectedTeacher === teacher.id
                    ? "Yopish"
                    : "💬 Fikr bildirish / Ko‘rish"}
                </button>

                <button
                  onClick={() => setModalTeacher(teacher)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  ℹ️ Ustoz haqida
                </button>
              </div>

              {selectedTeacher === teacher.id && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700">Baholash:</p>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`cursor-pointer text-2xl ${
                            i < newRating ? "text-yellow-500" : "text-gray-300"
                          }`}
                          onClick={() => setNewRating(i + 1)}
                        />
                      ))}
                    </div>
                    <textarea
                      placeholder="Fikringiz..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-3 border rounded text-black"
                    />
                    <button
                      onClick={() => handleSubmit(teacher.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Yuborish
                    </button>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Izohlar:
                    </h3>
                    <ul className="space-y-2">
                      {teacher.reviews.map((r, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 p-3 rounded-lg flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium text-gray-700">
                              {r.user}
                            </p>
                            <p className="text-sm text-gray-600">{r.comment}</p>
                          </div>
                          <div className="text-yellow-500">
                            {Array.from({ length: r.rating }, (_, j) => (
                              <FaStar key={j} />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Modal for teacher info */}
        {modalTeacher && (
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-300 w-full max-w-md space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                ℹ️ {modalTeacher.name}
              </h2>
              <p className="text-gray-700">📚 Fan: {modalTeacher.subject}</p>
              <p className="text-gray-700">📞 Tel: {modalTeacher.phone}</p>
              <p className="text-gray-700">📍 Viloyat: {modalTeacher.region}</p>
              <p className="text-gray-700">
                🕒 Tajriba: {modalTeacher.experience}
              </p>
              <button
                onClick={() => setModalTeacher(null)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
