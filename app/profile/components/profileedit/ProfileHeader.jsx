"use client";
import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaGithub,
  FaUserGraduate,
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
  FaUsers,
} from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

import { FaPenToSquare } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const defaultUser = {
  name: "",
  surname: "",
  direction: "",
  course: "",
  group: "",
  phone: "",
  bio: "",
  social: {
    telegram: "",
    instagram: "",
    linkedin: "",
  },
  achievements: [],
};
export default function ProfileHeader() {
  const [data, setData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(defaultUser);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["telegram", "instagram", "linkedin"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "surname",
      "direction",
      "course",
      "group",
      "phone",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      toast.error(
        `Iltimos, quyidagi maydonlarni toldiring:\n- ${emptyFields.join(
          "\n- "
        )}`
      );
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        const updated = await res.json();
        setData(updated);
        setFormData(updated);
        toast.success("Ma'lumotlar muvaffaqiyatli saqlandi!");
        setShowEdit(false);
      } else {
        toast.error("Xatolik yuz berdi, qayta urinib ko‘ring.");
      }
    } catch (err) {
      console.error("❌ Tarmoq xatoligi:", err);
      toast.error("Internetga ulanishingizni tekshiring.");
    }
  };
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          console.warn("⚠️ userId topilmadi:", result.error);
        }
      } catch (err) {
        console.error("❌ userId olishda xatolik:", err);
      }
    };
    fetchUserId();
  }, []);

  if (!data)
    return (
      <div className="text-black font-extrabold justify-between">
        Yuklanmoqda...
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md  flex flex-col ">
      {/* Top Section: Avatar + Info */}

      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative self-start">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>

        {/* User Info */}
        <div className="flex-1 self-start">
          <h2 className="text-lg font-semibold text-black">
            {data.name} {data.surname}
          </h2>
          <p className="text-sm text-gray-600">
            {data.direction} {data.course}
          </p>
          <div className="flex gap-4 text-xl mt-2">
            {data.social?.instagram && (
              <a
                href={`https://instagram.com/${data.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-600 hover:text-pink-800" />
              </a>
            )}
            {data.social?.telegram && (
              <a
                href={`https://t.me/${data.social.telegram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="text-blue-500 hover:text-blue-700" />
              </a>
            )}
            {data.social?.linkedin && (
              <a
                href={`https://linkedin.com/in/${data.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-800 hover:text-blue-900" />
              </a>
            )}
            {data.social?.github && (
              <a
                href={`https://github.com/${data.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="hover:text-gray-900" />
              </a>
            )}
          </div>
        </div>
      </div>
      {/* GPA va Actions - pastga tushgan */}
      <div className="flex justify-between gap-3 pt-2 mt-1">
        <span className="flex items-center bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
          <FaStar className="mr-1 text-sm" />
          GPA-{data.gpa || "4.8"}
        </span>

        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md"
        >
          <FaPenToSquare className="mr-1" />
          Tahrirlash
        </button>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm px-3 text-black py-1 border border-gray-400 rounded-md hover:bg-gray-100"
        >
          {showDetails ? "Yopish" : "Batafsil"}
        </button>
      </div>
      {/* Batafsil qismi */}
      {showDetails && (
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
            <FaUsers className="text-blue-500" />
            <span className="">Guruh: {data.group}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
            <MdPerson className="text-blue-500" />
            <span>{data.bio || "Bio yo'q"}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
            <FaPhone className="text-blue-500" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-start gap-2 bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
            <span className="font-semibold">Yutuqlar:</span>
            <span>
              {data.achievements?.length > 0
                ? data.achievements.join(", ")
                : "—"}
            </span>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white/30 backdrop-blur-sm   shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden  md:max-w-md mx-auto rounded  z-50 overflow-y-auto">
            <Toaster position="top-right" /> {/* 🟢 MUHIM */}
            <form
              onSubmit={handleSubmit}
              className=" p-6 rounded-xl shadow-xl w-full max-w-xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Profilni Tahrirlash
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ism"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Familya"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <select
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Yo‘nalish tanlang</option>
                  <option>Axborot texnologiyalari</option>
                  <option>Kompyuter ilmlari</option>
                  <option>Sun’iy intellekt</option>
                </select>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Kursni tanlang</option>
                  <option>1-kurs</option>
                  <option>2-kurs</option>
                  <option>3-kurs</option>
                  <option>4-kurs</option>
                </select>

                <input
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  placeholder="Guruh"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                rows={3}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black">
                <input
                  name="telegram"
                  value={formData.social.telegram}
                  onChange={handleChange}
                  placeholder="Telegram"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  name="instagram"
                  value={formData.social.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  name="linkedin"
                  value={formData.social.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn"
                  className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Yutuqlar
                </label>
                {formData.achievements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-2 text-black"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...formData.achievements];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, achievements: updated });
                      }}
                      className="border-2 font-extrabold border-gray-200 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.achievements.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, achievements: updated });
                      }}
                      className="text-red-600 font-bold text-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      achievements: [...formData.achievements, ""],
                    })
                  }
                  className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  ➕ Yutuq qo‘shish
                </button>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 border-2 text-white rounded hover:bg-red-600"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
