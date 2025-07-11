"use client";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import { FiFolder, FiClock } from "react-icons/fi";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Hammasi");
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return `${diffSec} soniya oldin`;
    if (diffMin < 60) return `${diffMin} daqiqa oldin`;
    if (diffHrs < 24) return `${diffHrs} soat oldin`;
    if (diffDays < 7) return `${diffDays} kun oldin`;

    return past.toLocaleDateString("uz-UZ"); // eski sanalar
  }

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues");
        const data = await res.json();
        setIssues(data.data);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Yuklanmoqda...</p>
        ) : (
          <div className="flex flex-col gap-5">
            {issues
              .filter((issue) =>
                activeFilter === "Hammasi"
                  ? true
                  : issue.category === activeFilter
              )
              .map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white p-5 rounded-2xl shadow border border-gray-100"
                >
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    {issue.title}
                  </h2>
                  <p className="text-gray-700 mb-3 text-sm sm:text-base">
                    {issue.description}
                  </p>

                  <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FiFolder /> {issue.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock /> {timeAgo(issue.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaThumbsUp /> {issue.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCommentAlt /> {issue.comments || 0}
                      </span>
                      <a
                        href="#"
                        className="text-red-600 hover:underline text-sm"
                      >
                        → Muhokamani ko‘rish
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
