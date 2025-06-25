"use client";

import { useState } from "react";
import Link from "next/link";

const initialUser = {
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

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["telegram", "instagram", "linkedin"].includes(name)) {
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setShowEdit(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 relative">
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
            <a href={user.social.telegram} target="_blank">
              📨 Telegram
            </a>
            <a href={user.social.instagram} target="_blank">
              📷 Instagram
            </a>
            <a href={user.social.linkedin} target="_blank">
              🔗 LinkedIn
            </a>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🏆 Yutuqlar
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {user.achievements.map((item, idx) => (
                <li key={idx}>✔️ {item}</li>
              ))}
            </ul>
          </div>

          {/* Tahrirlash tugmasi */}
          <div className="mt-8 text-right">
            <button
              onClick={() => setShowEdit(true)}
              className="px-5 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              Profilni tahrirlash ✏️
            </button>
          </div>
        </section>
      </div>

      {/* Modal Form */}
      {showEdit && (
        <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Profilni Tahrirlash
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ism"
                className="border p-2 rounded"
              />
              <input
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="GPA"
                className="border p-2 rounded"
              />
              <input
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                placeholder="Yo‘nalish"
                className="border p-2 rounded"
              />
              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Kurs"
                className="border p-2 rounded"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefon"
                className="border p-2 rounded"
              />
            </div>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border p-2 rounded w-full text-black"
              rows={3}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black">
              <input
                name="telegram"
                value={formData.social.telegram}
                onChange={handleChange}
                placeholder="Telegram"
                className="border p-2 rounded"
              />
              <input
                name="instagram"
                value={formData.social.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="border p-2 rounded"
              />
              <input
                name="linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
