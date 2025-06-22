"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaTelegram, FaInstagram } from "react-icons/fa";

const staffDetails = [
  {
    id: 1,
    name: "Xayrulla Polvonov",
    position: "Bosh dekan",
    department: "Boshqaruv kafedrasi",
    room: "1-bino, 204-xona",
    workDays: "Dushanba - Shanba",
    hours: "09:00 - 17:00",
    origin: "Farg‘ona viloyati",
    bio: "20 yillik boshqaruv tajribasiga ega. Universitetda talabalar bilan ochiq muloqotga ahamiyat beradi.",
    image: "https://via.placeholder.com/150",
    telegram: "https://t.me/example",
    instagram: "https://instagram.com/example",
  },
];

export default function StaffDetailPage() {
  const staff = staffDetails[0];
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [appointment, setAppointment] = useState({ day: "", time: "" });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSend = () => {
    alert("Xabar yuborildi: " + message);
    setMessage("");
    setShowModal(false);
  };

  const handleAppointment = () => {
    alert(`Uchrashuv so‘raldi: ${appointment.day}, ${appointment.time}`);
    setAppointment({ day: "", time: "" });
  };

  const handleReviewSubmit = () => {
    alert(`Baholang: ${rating} yulduz\nIzoh: ${review}`);
    setReview("");
    setRating(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-orange-200">
        <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start">
          <img
            src={staff.image}
            alt={staff.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-orange-300 shadow-md"
          />
          <div className="text-center sm:text-left w-full">
            <h1 className="text-4xl font-extrabold text-orange-800 mb-3">
              {staff.name}
            </h1>
            <p className="text-lg text-gray-800">
              🏢 <span className="font-medium">{staff.position}</span>
            </p>
            <p className="text-gray-700">🏬 {staff.department}</p>
            <p className="text-gray-700">📍 {staff.room}</p>
            <p className="text-gray-700">
              🕘 {staff.workDays}, {staff.hours}
            </p>
            <p className="text-gray-700">🌍 {staff.origin}</p>

            <div className="mt-3 flex gap-4 text-orange-600 text-2xl">
              <a
                href={staff.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
              <a
                href={staff.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed bg-orange-50 p-4 rounded-xl border border-orange-100">
              {staff.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition"
              >
                ✉️ Xabar yuborish
              </button>
              <a
                href="/staff"
                className="text-sm text-orange-700 font-medium hover:underline self-center"
              >
                ← Orqaga barcha xodimlar ro'yxatiga
              </a>
            </div>

            <div className="mt-8 p-4 bg-orange-100 rounded-xl border border-orange-200">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">
                📅 Uchrashuv so‘rash
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Kun (masalan: Dushanba)"
                  className="border p-2 rounded-xl w-full sm:w-1/2 text-black"
                  value={appointment.day}
                  onChange={(e) =>
                    setAppointment({ ...appointment, day: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="border p-2 rounded-xl w-full sm:w-1/2 text-black"
                  value={appointment.time}
                  onChange={(e) =>
                    setAppointment({ ...appointment, time: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAppointment}
                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700"
              >
                Yuborish
              </button>
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">
                ⭐ Baholash va izoh
              </h2>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    {rating >= star ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaRegStar className="text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
              <textarea
                className="w-full h-24 p-3 border border-gray-300 rounded-xl resize-none focus:outline-orange-400"
                placeholder="Izoh yozing..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                onClick={handleReviewSubmit}
                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-orange-800 mb-4">
              Xabar yuborish
            </h2>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-orange-400"
              placeholder="Xabaringizni bu yerga yozing..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white hover:bg-orange-700"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
