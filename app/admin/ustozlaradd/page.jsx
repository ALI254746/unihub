"use client";
import { useState } from "react";

export default function AdminUstozlarPage() {
  const [ustozlar, setUstozlar] = useState([
    {
      id: 1,
      name: "Prof. Anvar Xudoyberdiyev",
      subject: "Matematika",
      kafedra: "Aniq fanlar",
      lavozim: "Katta o‘qituvchi",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    kafedra: "",
    lavozim: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.subject) return;

    const newUstoz = {
      id: Date.now(),
      ...form,
    };

    setUstozlar((prev) => [...prev, newUstoz]);
    setForm({ name: "", subject: "", kafedra: "", lavozim: "" });
    setSuccess("✅ Ustoz qo‘shildi");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleDelete = (id) => {
    if (confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      setUstozlar((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        👨‍🏫 Ustozlar boshqaruvi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ustoz qo‘shish formasi */}
        <div className="bg-white p-6 rounded-xl border shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ➕ Yangi ustoz qo‘shish
          </h2>

          {success && <p className="text-green-600 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Ism familiyasi"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded text-black"
              required
            />
            <input
              type="text"
              placeholder="Fani (masalan: Matematika)"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border p-2 rounded text-black"
              required
            />
            <input
              type="text"
              placeholder="Kafedra"
              value={form.kafedra}
              onChange={(e) => setForm({ ...form, kafedra: e.target.value })}
              className="w-full border p-2 rounded text-black"
            />
            <input
              type="text"
              placeholder="Lavozimi (masalan: dotsent)"
              value={form.lavozim}
              onChange={(e) => setForm({ ...form, lavozim: e.target.value })}
              className="w-full border p-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Qo‘shish
            </button>
          </form>
        </div>

        {/* Ustozlar ro‘yxati */}
        <div className="bg-white p-6 rounded-xl border shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📋 Ustozlar ro‘yxati
          </h2>
          {ustozlar.length === 0 ? (
            <p className="text-gray-500">Hozircha ustozlar kiritilmagan.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-auto pr-2">
              {ustozlar.map((u) => (
                <div
                  key={u.id}
                  className="border p-4 rounded-lg bg-gray-50 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {u.name}
                    </h3>
                    <p className="text-sm text-gray-600">📘 Fan: {u.subject}</p>
                    <p className="text-sm text-gray-600">
                      🏢 Kafedra: {u.kafedra || "Ko‘rsatilmagan"}
                    </p>
                    <p className="text-sm text-gray-600">
                      🎓 Lavozim: {u.lavozim || "Noma’lum"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-500 hover:underline"
                  >
                    🗑 O‘chirish
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
