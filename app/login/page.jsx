"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 Yangi holat
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // 👈 Yuklanishni boshladik

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const msg = await res.text();
        setError(msg || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("Tizimga ulanishda xatolik");
      console.error("Login error:", err);
    } finally {
      setLoading(false); // 👈 Har holda tugatildi
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          🔐 Tizimga kirish - UniHub
        </h1>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 text-black"
            required
          />
          <input
            type="password"
            placeholder="Parol"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "⏳ Yuklanmoqda..." : "Kirish"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Akkountingiz yo‘qmi?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Ro‘yxatdan o‘ting
          </Link>
        </p>
      </div>
    </main>
  );
}
