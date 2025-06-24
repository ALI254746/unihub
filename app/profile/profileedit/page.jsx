"use client";

const user = {
  name: "Ali Karimov",
  gpa: 3.8,
  direction: "Kompyuter injiniring",
  course: "3-kurs",
  email: "ali.karimov@example.com",
  phone: "+998 90 123 45 67",
  bio: "Dasturchi, IT entuziasti, Open Source faoli.",
  social: {
    telegram: "https://t.me/alikarimov",
    instagram: "https://instagram.com/alikarimov",
    linkedin: "https://linkedin.com/in/alikarimov",
  },
  achievements: [
    "Frontend tanlovida 1-o‘rin",
    "Open Source loyihaga hissa qo‘shgan",
    "Hackathon 2024 finalchisi",
  ],
};

import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👤 Profilim</h1>
          <Link
            href="/"
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            ← Bosh sahifaga
          </Link>
        </nav>

        {/* Profile Card */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                user.name
              )}`}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-gray-400 hover:shadow-lg transition-shadow duration-300"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {user.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {user.direction} · {user.course}
              </p>
              <p className="text-gray-600 mt-1 italic max-w-md">{user.bio}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center sm:text-left">
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">GPA</p>
              <p className="text-2xl font-bold text-gray-800">{user.gpa}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">Telefon</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center sm:justify-start mb-8 text-gray-700">
            <a
              href={user.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path d="M22.54 3.42a1.74 1.74 0 00-2.38-.44L3.48 11.11a1.5 1.5 0 00.12 2.71l4.18 1.37 2.15 6.1a1.5 1.5 0 002.44.39l3.86-4.91 5.13-11.41a1.74 1.74 0 00-.42-2.44z" />
              </svg>
            </a>
            <a
              href={user.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            <a
              href={user.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.75h4v12H3v-12zM8 8.75h3.6v1.63h.05a3.95 3.95 0 013.55-1.95c3.8 0 4.5 2.5 4.5 5.75v6.57H15v-6c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.2v6.11H8v-12z" />
              </svg>
            </a>
          </div>

          {/* Yutuqlar */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              🏆 Yutuqlar
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {user.achievements.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>✔️</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tahrirlash tugmasi */}
          <div className="mt-8 text-right">
            <button className="px-5 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
              Profilni tahrirlash ✏️
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
