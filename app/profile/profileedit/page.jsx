"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const defaultUser = {
  name: "",
  surname: "",
  direction: "",
  course: "",
  group: "",
  phone: "",
  bio: "",
  social: {
    telegram: "",
    instagram: "",
    linkedin: "",
  },
  achievements: [],
};

export default function ProfilePage() {
  const [user, setUser] = useState(defaultUser);
  const [formData, setFormData] = useState(defaultUser);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile", { credentials: "include" });
      if (res.ok) {
        const profile = await res.json();
        setUser(profile);
        setFormData(profile);
      } else {
        console.error("Profilni olishda xatolik");
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["telegram", "instagram", "linkedin"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "surname",
      "direction",
      "course",
      "group",
      "phone",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert(
        `Iltimos, quyidagi maydonlarni to‘ldiring:\n- ${emptyFields.join(
          "\n- "
        )}`
      );
      return;
    }

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
      setFormData(updated);
      setShowEdit(false);
    } else {
      alert("Xatolik yuz berdi, qayta urinib ko‘ring.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-5xl mx-auto">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👤 Profilim</h1>
          <Link
            href="/"
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            ← Bosh sahifaga
          </Link>
        </nav>

        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                user.name
              )}`}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-gray-400"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {user.name} {user.surname}
              </h2>
              <p className="text-gray-600 mt-1">
                {user.direction} · {user.course}
              </p>
              <p className="text-gray-600 mt-1 italic max-w-md">{user.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center sm:text-left">
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">Guruh</p>
              <p className="text-gray-700">{user.group}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">Telefon</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>
          </div>

          <div className="flex gap-6 justify-center sm:justify-start mb-8 text-gray-700">
            <a
              href={
                user.social.telegram
                  ? `https://t.me/${user.social.telegram.replace(/^@/, "")}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              📨 Telegram
            </a>
            <a
              href={
                user.social.instagram
                  ? `https://instagram.com/${user.social.instagram.replace(
                      /^@/,
                      ""
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 Instagram
            </a>
            <a
              href={
                user.social.linkedin
                  ? `https://linkedin.com/in/${user.social.linkedin.replace(
                      /^@/,
                      ""
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 LinkedIn
            </a>
          </div>

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

          <div className="mt-8 text-right">
            <button
              onClick={() => setShowEdit(true)}
              className="px-5 py-3 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Profilni tahrirlash ✏️
            </button>
          </div>
        </section>
      </div>

      {showEdit && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Familya"
                className="border p-2 rounded"
              />
              <select
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className="p-2 border rounded text-black"
              >
                <option value="">Yo‘nalish tanlang</option>
                <option>Axborot texnologiyalari</option>
                <option>Kompyuter ilmlari</option>
                <option>Sun’iy intellekt</option>
              </select>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="p-2 border rounded text-black"
              >
                <option value="">Kursni tanlang</option>
                <option>1-kurs</option>
                <option>2-kurs</option>
                <option>3-kurs</option>
                <option>4-kurs</option>
              </select>

              <input
                name="group"
                value={formData.group}
                onChange={handleChange}
                placeholder="Guruh"
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

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Yutuqlar
              </label>
              {formData.achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 text-black"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...formData.achievements];
                      updated[index] = e.target.value;
                      setFormData({ ...formData, achievements: updated });
                    }}
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.achievements.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, achievements: updated });
                    }}
                    className="text-red-600 font-bold text-xl"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    achievements: [...formData.achievements, ""],
                  })
                }
                className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
              >
                ➕ Yutuq qo‘shish
              </button>
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
