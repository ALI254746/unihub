"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import UzbekFlag from "../components/uzbekflag";
import CoustomLink from "../components/LoadingOverlay"; // Importing custom link component
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const containerRef = useRef();
  const formRef = useRef();
  const inputsRef = useRef([]);
  const buttonRef = useRef();
  const flagRef = useRef();
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current, { opacity: 1, duration: 0.4 });

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      tl.from(formRef.current, { opacity: 0, y: 20 })
        .from(
          inputsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(buttonRef.current, { opacity: 0, scale: 0.8 }, "-=0.4");
    };

    // DOM yuklanishini to‘liq kutamiz
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const msg = await res.text();
        setError(msg || "Xatolik yuz berdi");
      }
    } catch {
      setError("Tizimga ulanishda xatolik");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const tail = document.querySelector("#flag-tail");

    if (!tail) return;

    gsap.to(tail, {
      rotate: 4,
      skewX: 6,
      y: 2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "left center",
    });
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white md:bg-[url('/login.png')] bg-cover bg-center">
      <div className="hidden lg:flex absolute top-[30px] left-[488px] w-[88px] h-[66px] rounded-md z-50 items-center justify-center">
        <UzbekFlag ref={flagRef} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="hidden md:block md:w-1/2"></div>

        <div
          ref={containerRef}
          className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full sm:max-w-md md:w-[550px] min-h-[360px] overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            🔐 Tizimga kirish - UniHub
          </h1>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              ref={(el) => (inputsRef.current[0] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />
            <input
              type="password"
              placeholder="Parol"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              ref={(el) => (inputsRef.current[1] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />

            <button
              type="submit"
              ref={buttonRef}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded hover:from-blue-700 hover:to-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "⏳ Yuklanmoqda..." : "Kirish"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Akkountingiz yo‘qmi?{" "}
            <CoustomLink
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Ro‘yxatdan o‘ting
            </CoustomLink>
          </p>
        </div>
      </div>
    </main>
  );
}
