"use client";

import { useState } from "react";

export default function JoinTournamentModal({
  isOpen,
  onClose,
  tournamentName,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    direction: "",
    why: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yuborilayotgan ma’lumot:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
        <h2 className="text-xl font-semibold text-indigo-700 text-center">
          {tournamentName} Turniriga Qo‘shilish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-black">
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefon raqam"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="direction"
            placeholder="Yo‘nalishingiz"
            value={form.direction}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="why"
            placeholder="Nega bu turnirga qo‘shilmoqchisiz?"
            value={form.why}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
