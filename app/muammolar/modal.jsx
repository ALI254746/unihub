"use client";
import { useState, useEffect } from "react";

export default function IssueModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Yotoqxona");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category }),
      });

      const data = await res.json();

      if (res.ok) {
        // Forma tozalansin
        setTitle("");
        setDescription("");
        setCategory("Yotoqxona");
        onSuccess?.(); // agar props orqali yangi issue yuklansa
        onClose(); // modal yopilsin
      } else {
        alert(data.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Tarmoqda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[500px] bg-white rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          📝 Muammo qo‘shish
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Muammo sarlavhasi"
            className="w-full border border-gray-300 rounded p-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder="Muammo tavsifi"
            className="w-full border border-gray-300 rounded p-2 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-medium">
              Kategoriya:
            </label>
            <select
              className="border rounded px-2 py-1 text-sm text-gray-800"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Yotoqxona</option>
              <option>Kutubxona</option>
              <option>Dars jarayoni</option>
              <option>Internet</option>
              <option>Boshqaruv</option>
              <option>Oshxona</option>
              <option>Gigiyena / Tozalik</option>
              <option>Boshqa</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline text-sm"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
              disabled={loading}
            >
              {loading ? "Yuborilmoqda..." : "Yuborish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
