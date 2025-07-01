"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UzbekFlag from "../components/uzbekflag";
import CoustomLink from "../components/LoadingOverlay"; // Importing custom link component

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    faculty: "",
    course: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const flagRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (
        !containerRef.current ||
        !formRef.current ||
        !buttonRef.current ||
        inputsRef.current.some((el) => !el)
      )
        return;

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      tl.from(containerRef.current, { opacity: 0, x: 50 })
        .from(formRef.current, { opacity: 0, y: 20 }, "-=0.4")
        .from(inputsRef.current, { opacity: 0, y: 20, stagger: 0.1 }, "-=0.5")
        .from(buttonRef.current, { opacity: 0, scale: 0.8 }, "-=0.4");
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        toast.success("✅ Muvaffaqiyatli ro'yxatdan o‘tildi!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Tarmoqda muammo bor yoki server ishlamayapti.");
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
    <main className="min-h-screen flex items-center justify-center bg-white md:bg-[url('/login.png')] bg-cover bg-center">
      {/* 🇺🇿 Flag */}
      <div className="hidden lg:flex absolute top-[30px] left-[488px] w-[88px] h-[66px] rounded-md z-50 items-center justify-center">
        <UzbekFlag ref={flagRef} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="hidden md:block md:w-1/2" />

        <div
          ref={containerRef}
          className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full sm:max-w-md md:w-[550px] min-h-[400px] overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            📝 Ro‘yxatdan o‘tish
          </h1>

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

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="Ism"
              value={form.firstName}
              onChange={handleFormChange}
              ref={(el) => (inputsRef.current[0] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Familiya"
              value={form.lastName}
              onChange={handleFormChange}
              ref={(el) => (inputsRef.current[1] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />
            <select
              name="faculty"
              value={form.faculty}
              onChange={handleFormChange}
              className="flex-1 w-1/2 p-2 border rounded text-black"
              required
            >
              <option value="">Yo‘nalish tanlang</option>
              <option>Axborot texnologiyalari</option>
              <option>Kompyuter ilmlari</option>
              <option>Sun’iy intellekt</option>
            </select>
            <select
              name="course"
              value={form.course}
              onChange={handleFormChange}
              className="flex-1 w-1/2 p-2  border rounded text-black"
              required
            >
              <option value="">Kursni tanlang</option>
              <option>1-kurs</option>
              <option>2-kurs</option>
              <option>3-kurs</option>
              <option>4-kurs</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleFormChange}
              ref={(el) => (inputsRef.current[2] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleFormChange}
              ref={(el) => (inputsRef.current[3] = el)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-black"
              required
            />
            <button
              type="submit"
              ref={buttonRef}
              disabled={loading}
              className="w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "⏳ Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Akkountingiz bormi?{" "}
            <CoustomLink
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Kirish
            </CoustomLink>
          </p>
        </div>
      </div>
    </main>
  );
}
