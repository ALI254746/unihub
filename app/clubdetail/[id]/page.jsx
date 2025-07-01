"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import CustomLink from "../../components/LoadingOverlay";

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFormClub, setOpenFormClub] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    direction: "",
    course: "",
    phone: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Profilni olish
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Klublarni olish
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/clubs");
        if (res.ok) {
          const result = await res.json();
          setClubs(result.data);
        } else {
          console.error("Clublarni olishda xatolik:", res.statusText);
        }
      } catch (error) {
        console.error("Tarmoq xatosi:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Form validatsiyasi
  const validateForm = () => {
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        const fieldNames = {
          firstName: "Ismingiz",
          lastName: "Familiyangiz",
          direction: "Yo‘nalish",
          course: "Kurs",
          phone: "Telefon raqami",
          reason: "Sabab",
        };
        toast.error(`${fieldNames[key]} kiritilmagan!`);
        return false;
      }
    }
    return true;
  };

  const handleJoin = async () => {
    if (!validateForm()) return;

    try {
      const dataToSend = {
        clubId: openFormClub._id,
        clubName: openFormClub.name,
        firstName: form.firstName,
        lastName: form.lastName,
        direction: form.direction,
        course: form.course,
        phone: form.phone,
        reason: form.reason,
      };

      const res = await fetch("/api/clubJoinrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        toast.success("✅ Klubga qo‘shilish so‘rovi yuborildi");
      } else {
        const errText = await res.text();
        toast.error("❌ Xatolik: " + errText);
      }
    } catch (err) {
      toast.error("🔌 Tarmoq xatoligi: " + err.message);
    }

    setOpenFormClub(null);
    setForm({
      firstName: "",
      lastName: "",
      direction: "",
      course: "",
      phone: "",
      reason: "",
    });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (profileLoading) {
    return <p>Profil yuklanmoqda...</p>;
  }

  // Profil mavjud va to'liq emas (masalan, name yoki surname bo'sh bo'lsa)
  const profileIsIncomplete =
    !profile ||
    !profile.name ||
    !profile.surname ||
    !profile.direction ||
    !profile.course ||
    !profile.phone;

  return (
    <main className="min-h-screen bg-yellow-50 p-4 sm:p-6 relative">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Agar profil to'liq bo'lmasa, foydalanuvchini profilni to'ldirishga yo'naltiring */}
      {profileIsIncomplete && (
        <div className="max-w-xl mx-auto p-4 bg-yellow-100 border border-yellow-400 rounded mb-6 text-yellow-900 text-center">
          <p>
            Klubga qo‘shilish yoki ochish uchun <b>profil ma'lumotlaringizni</b>{" "}
            to‘liq to‘ldirishingiz kerak. Iltimos,{" "}
            <CustomLink href="/profile/profileedit" className="underline">
              bu yerga
            </CustomLink>{" "}
            o'ting va ma'lumotlaringizni kiriting.
          </p>
        </div>
      )}

      {openFormClub && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-yellow-700">
              📝 {openFormClub.name} klubiga qo‘shilish
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Ism"
                value={form.firstName}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Familiya"
                value={form.lastName}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
              />
              <select
                name="direction"
                value={form.direction}
                onChange={handleFormChange}
                className="p-2 border rounded text-black"
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
                className="p-2 border rounded text-black"
              >
                <option value="">Kursni tanlang</option>
                <option>1-kurs</option>
                <option>2-kurs</option>
                <option>3-kurs</option>
                <option>4-kurs</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Telefon raqami"
                value={form.phone}
                onChange={handleFormChange}
                className="p-2 border rounded text-black col-span-2"
              />
              <textarea
                name="reason"
                placeholder="Nega bu klubga qo‘shilmoqchisiz?"
                value={form.reason}
                onChange={handleFormChange}
                className="p-2 border rounded text-black col-span-2"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenFormClub(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleJoin}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-6">
          <CustomLink
            href="/"
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            ← Bosh sahifaga
          </CustomLink>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-yellow-800">
            🏅 Talabalar Klublari
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Klub nomi yoki tavsifi bo‘yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
            {!profileIsIncomplete && (
              <CustomLink
                href="/clubyaratish"
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 whitespace-nowrap"
              >
                ➕ Klub ochish
              </CustomLink>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="text-center text-yellow-700 mt-20 col-span-full animate-pulse">
              <span className="inline-block w-6 h-6 mr-2 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></span>
              Ma’lumotlar yuklanmoqda...
            </div>
          ) : filteredClubs.length === 0 ? (
            <p className="text-center text-yellow-900 font-semibold col-span-full">
              Qidiruv natijasi topilmadi.
            </p>
          ) : (
            filteredClubs.map((club) => (
              <div
                key={club._id}
                className="bg-white p-6 rounded-2xl shadow border border-yellow-200 flex flex-col"
              >
                <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
                  {club.name}
                </h2>
                <p className="text-gray-700 mb-2 flex-grow">
                  {club.description}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  👤 Yetakchi: {club.fullname || "Noma’lum"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  👥 A’zolar: {club.members?.length || 0} ta
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  🎯 Qiziqishlar: {club.interest || "–"}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setOpenFormClub(club)}
                    disabled={profileIsIncomplete} // profil to'liq bo'lmasa buttonni o'chirish
                    className={`px-4 py-2 rounded text-white ${
                      profileIsIncomplete
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    Klubga qo‘shilish
                  </button>
                  <CustomLink
                    href={`/clubdetail/${club._id}`}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-center"
                  >
                    Klubni Ko‘rish
                  </CustomLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
