"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
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
    { title: "Informatsiya", href: "/darsresurslari" },
    { title: "Topshiriqlar", href: "/darsresurslari/topshiriqlarBazasi" },
    { title: "Xizmatlar", href: "/darsresurslari/xizmatlar" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <Toaster position="top-center" reverseOrder={false} />

      <div
        className="sticky top-0 left-0 w-full z-50 shadow backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255,0.2)", // oq fon, 80% oppoq
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Chap qism */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <span className="text-pink-600 text-2xl">📚</span> Tayyor PDF
              </h1>

              {/* Bosh sahifa tugmasi — faqat mobil uchun o‘ng tomonga yopishib turadi */}
              <Link
                href="/"
                className="ml-auto inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                <span>Bosh sahifa</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Taplar */}
            <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
              {routes.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className={`px-3 py-1 text-sm rounded-full font-medium transition ${
                    pathname === r.href
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
          {/* Xizmat qo‘shish tugmasi */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap"
            >
              <FiPlus className="text-sm" /> Xizmat qo‘shish
            </button>
          </div>
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
    </>
  );
}
