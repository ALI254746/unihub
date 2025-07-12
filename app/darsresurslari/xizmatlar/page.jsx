"use client";

import { useEffect, useState } from "react";
import {
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
  FaTelegram,
} from "react-icons/fa";

export default function XizmatlarPage() {
  const [xizmatlar, setXizmatlar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApprovedServices = async () => {
    try {
      const res = await fetch("/api/adminapi/serviceStudent");
      const json = await res.json();
      if (res.ok) {
        const approved = json.data.filter((x) => x.status === "approved");
        setXizmatlar(approved);
      }
    } catch (err) {
      console.error("Xizmatlarni olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedServices();
  }, []);

  const handleRating = async (xizmatId, value) => {
    try {
      const res = await fetch(`/api/talabaXizmatAdd/rate/${xizmatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (res.ok) {
        const json = await res.json();
        setXizmatlar((prev) =>
          prev.map((x) =>
            x._id === xizmatId
              ? { ...x, rank: json.average, myRating: json.myRating }
              : x
          )
        );
      } else {
        alert("❌ Reytingni saqlashda xatolik");
      }
    } catch (err) {
      console.error("Bahoni berishda xatolik:", err);
    }
  };

  // 🔎 Filtrlash
  const filteredXizmatlar = xizmatlar.filter((x) => {
    const q = searchTerm.toLowerCase();
    return (
      x.fan?.toLowerCase().includes(q) ||
      x.xizmatTuri?.toLowerCase().includes(q) ||
      x.description?.toLowerCase().includes(q) ||
      x.user?.firstName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl bg-gray-50 mx-auto relative ">
      <div className=" font-sans min-h-screen px-4 pt-6 pb-24">
        <h1 className="text-[#0284C7] font-bold text-lg mb-3">
          Talaba xizmatlari
        </h1>

        {/* 🔍 Qidiruv */}
        <div className="mb-4 text-black  ">
          <div className="relative">
            <input
              type="text"
              placeholder="Xizmat qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 pl-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284C7] focus:border-[#0284C7]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* 📦 Xizmatlar */}
        {loading ? (
          <p className="text-center text-gray-500">⏳ Yuklanmoqda...</p>
        ) : filteredXizmatlar.length === 0 ? (
          <p className="text-center text-gray-500">
            Hech qanday mos xizmat topilmadi.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
            {filteredXizmatlar.map((x) => (
              <ServiceCard
                key={x._id}
                name={x.user?.firstName || "Foydalanuvchi"}
                score={x.user?.points || 0}
                title={`${x.fan} – ${x.xizmatTuri}`}
                desc={x.description}
                level={x.kurs}
                price={x.narxi || "Kelishiladi"}
                rating={x.rank || 0}
                reviews={x.ratingCount || 0}
                telegram={x.telegramHavola}
                myRating={x.myRating}
                onRate={(star) => handleRating(x._id, star)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({
  name,
  score,
  title,
  desc,
  level,
  price,
  rating,
  reviews,
  telegram,
  myRating,
  onRate,
}) {
  // 3.5 dan yuqori bo‘lsa yaxlitlab 4 ta yulduz, past bo‘lsa yarim yulduz
  let fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  if (rating % 1 > 0.75) fullStars += 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FaUser className="text-gray-500" />
          </div>
          <span className="font-semibold text-gray-800">{name}</span>
        </div>
        <div className="flex items-center">
          <FaMedal className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{score}</span>
        </div>
      </div>

      {/* Ma'lumotlar */}
      <div className="space-y-1.5">
        <div className="flex items-start">
          <FaBook className="text-[#0284C7] w-5 mt-0.5" />
          <span className="text-sm text-gray-800 font-medium ml-1">
            {title}
          </span>
        </div>
        <div className="flex items-start">
          <FaBrain className="text-[#0284C7] w-5 mt-0.5" />
          <span className="text-sm text-gray-600 ml-1">{desc}</span>
        </div>
        <div className="flex items-start">
          <FaGraduationCap className="text-[#0284C7] w-5 mt-0.5" />
          <span className="text-sm text-gray-600 ml-1">{level}</span>
        </div>
        <div className="flex items-start">
          <FaDollarSign className="text-[#0284C7] w-5 mt-0.5" />
          <span className="text-sm text-green-600 font-semibold ml-1">
            {price}
          </span>
        </div>
      </div>

      {/* Reyting + Baho berish */}
      <div className="flex items-center gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((star) => {
          let icon;
          if (star <= fullStars) {
            icon = <FaStar className="text-yellow-400" />;
          } else if (star === fullStars + 1 && hasHalfStar) {
            icon = <FaStarHalfAlt className="text-yellow-400" />;
          } else {
            icon = <FaStar className="text-gray-300" />;
          }

          return (
            <button
              key={star}
              onClick={() => onRate && onRate(star)}
              className="text-xl hover:scale-110 transition-transform"
              title={`${star} yulduz`}
            >
              {icon}
            </button>
          );
        })}

        <span className="text-sm text-gray-600 ml-2">
          ⭐ {rating?.toFixed(1) || "0.0"}
        </span>
      </div>

      {/* Telegram */}
      {telegram && (
        <a
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-500 text-white py-2 rounded-full text-sm font-medium flex items-center justify-center mt-2 hover:bg-blue-600"
        >
          <FaTelegram className="mr-1.5" /> Telegram orqali bog'lanish
        </a>
      )}
    </div>
  );
}
