"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Tarmoqda muammo bor yoki server ishlamayapti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-blue-100">
        {/* 🔔 Toast xabarlari shu yerda chiqadi */}

        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          🔐 Ro‘yxatdan o‘tish
        </h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            className="z-50"
          />
          <input
            type="email"
            placeholder="Email manzil"
            className="w-full border border-blue-200 rounded p-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parol"
            className="w-full border border-blue-200 rounded p-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-black">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </main>
  );
}
