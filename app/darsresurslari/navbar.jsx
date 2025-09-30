"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import {
  FaArrowLeft,
  FaHome,
  FaPlus,
  FaSearch,
  FaUser,
  FaMedal,
  FaBook,
  FaBrain,
  FaGraduationCap,
  FaDollarSign,
  FaStar,
  FaStarHalfAlt,
  FaLanguage,
  FaFileLines,
  FaUsers,
  FaLaptopCode,
  FaCode,
} from "react-icons/fa";
export default function NavbarIssues() {
  const [Fan, setFan] = useState("");
  const [service, setService] = useState("");
  const [Kurs, setKurs] = useState("");
  const [Narx, setNarx] = useState("");
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Fan || !service || !Kurs || !Narx || !telegram || !description) {
      toast.error("barcha maydonlarni to'ldirings");
      return false;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/talabaXizmatAdd", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Fan,
          service,
          Kurs,
          Narx,
          telegram,
          description,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Xizmat muvaffaqiyatli qo‘shildi!");
        //forma tozalansin
        setFan("");
        setService("");
        setDescription("");
        setKurs("");
        setTelegram("");
        setNarx("");
      } else {
        toast.error("xatolik yuz berdi");
      }
    } catch (error) {
      console.error("xatolik:", error);
      toast.error("tarmoqda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const routes = [
    { title: "Topshiriqlar", href: "/darsresurslari" },
    { title: "Xizmatlar", href: "/darsresurslari/xizmatlar" },
  ];

  return (
    <div className="font-sans bg-gray-50 ">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0  bg-white/10 backdrop-blur-sm shadow-sm px-4 py-3 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="flex items-center px-3 py-1.5 text-sm rounded-full bg-blue-100 text-[#0284C7] hover:bg-blue-200 cursor-pointer transition">
              <FaHome className="text-xs mr-1.5" />
              <span>Bosh sahifaga</span>
            </span>
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0284C7] text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm hover:bg-[#0369A1]"
          >
            <FaPlus className="mr-1 text-xs" />
            Xizmat qo'shish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-[72px] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition whitespace-nowrap ${
                  pathname === r.href
                    ? "bg-[#0284C7] text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative text-black">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
              >
                ✖
              </button>

              <h2 className="text-lg font-semibold mb-4">
                🛠 Yangi xizmat qo‘shish
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={Fan}
                  onChange={(e) => setFan(e.target.value)}
                  placeholder="Fan"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  required
                />
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Xizmat turi"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  required
                />
                <input
                  type="text"
                  value={Kurs}
                  onChange={(e) => setKurs(e.target.value)}
                  placeholder="Nechinchi kurs uchun"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  required
                />
                <input
                  type="text"
                  value={Narx}
                  onChange={(e) => setNarx(e.target.value)}
                  placeholder="xizmat narxi"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  required
                />
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="Telegram havola"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Qo‘shimcha tavsif"
                  rows={3}
                  className="w-full border px-3 py-2 rounded-md text-sm"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    Bekor
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    disabled={loading}
                  >
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
