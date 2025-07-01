"use client";
import { useState } from "react";
import CustomLink from "@/app/components/LoadingOverlay"; // Importing custom link component

export default function CreateClubPage() {
  const [form, setForm] = useState({
    fullname: "",
    name: "",
    description: "",
    interests: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("So‘rov yuborilmoqda...");

    try {
      const res = await fetch("/api/club-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage(
          "✅ Klub ochish so‘rovingiz yuborildi. Admin tasdiqlashi kerak."
        );
        setForm({ fullname: "", name: "", description: "", interests: "" });
      } else {
        setMessage("❌ Xatolik yuz berdi.");
      }
    } catch (error) {
      setMessage("🔌 Server bilan bog‘lanishda muammo.");
    }
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-yellow-700">
            🏗 Klub ochish so‘rovi
          </h1>
          <CustomLink
            href="/talabalarkulubi"
            className="text-sm text-yellow-600 hover:underline"
          >
            ← Talaba klublariga qaytish
          </CustomLink>
        </div>

        {message && (
          <p className="mb-4 text-sm text-gray-600 bg-yellow-100 p-2 rounded">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ism familiyangiz"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            className="w-full p-3 border border-yellow-300 rounded text-black"
            required
          />
          <input
            type="text"
            placeholder="Klub nomi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-yellow-300 rounded text-black"
            required
          />
          <textarea
            placeholder="Klub tavsifi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 border border-yellow-300 rounded h-32 text-black"
            required
          />
          <input
            type="text"
            placeholder="Qiziqishlar (vergul bilan ajrating)"
            value={form.interests}
            onChange={(e) => setForm({ ...form, interests: e.target.value })}
            className="w-full p-3 border border-yellow-300 rounded text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
          >
            So‘rov yuborish
          </button>
        </form>
      </div>
    </main>
  );
}
