"use client";

import { useState } from "react";
import dayjs from "dayjs";

const initialBookedSlots = [
  {
    date: "2025-06-25",
    zal: "Sport Zal A",
    sport: "Futbol",
    time: "10:00",
    user: "Ali",
    status: "partial",
    maxPlayers: 10,
    joinedUsers: [],
  },
  {
    date: "2025-06-25",
    zal: "Sport Zal B",
    sport: "Basketbol",
    time: "14:00",
    user: "Madina",
    status: "full",
    maxPlayers: 8,
    joinedUsers: [],
  },
];

const times = Array.from({ length: 12 }, (_, i) => {
  const hour = 8 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const zalList = [
  { name: "Sport Zal A", price: 200000 },
  { name: "Sport Zal B", price: 0 },
];

const sportTypes = ["Futbol", "Tennis", "Basketbol", "Voleybol"];

export default function BookingSport() {
  const currentUser = "Islom";

  const [bookedSlots, setBookedSlots] = useState(initialBookedSlots);
  const [selectedZal, setSelectedZal] = useState("Sport Zal A");
  const [selectedSport, setSelectedSport] = useState("Futbol");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [status, setStatus] = useState("partial");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [joinModal, setJoinModal] = useState(null);
  const [joinForm, setJoinForm] = useState({
    name: "",
    surname: "",
    group: "",
    faculty: "",
    phone: "",
  });

  const handleBooking = () => {
    const newBooking = {
      date: selectedDate,
      zal: selectedZal,
      sport: selectedSport,
      time: selectedTime,
      user: currentUser,
      status,
      maxPlayers,
      joinedUsers: [],
    };

    setBookedSlots((prev) => [...prev, newBooking]);
    setSelectedTime(null);
    alert("✅ Band qilindi!");
  };

  const isBooked = (time) => {
    return bookedSlots.some(
      (b) =>
        b.date === selectedDate &&
        b.zal === selectedZal &&
        b.sport === selectedSport &&
        b.time === time
    );
  };

  const handleJoinRequest = () => {
    setBookedSlots((prev) =>
      prev.map((b) =>
        b === joinModal
          ? { ...b, joinedUsers: [...b.joinedUsers, joinForm] }
          : b
      )
    );
    setJoinModal(null);
    setJoinForm({ name: "", surname: "", group: "", faculty: "", phone: "" });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
        🏟 Sport Zal Bron Qilish
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-black">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zal
          </label>
          <select
            value={selectedZal}
            onChange={(e) => setSelectedZal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {zalList.map((zal) => (
              <option key={zal.name} value={zal.name}>
                {zal.name}{" "}
                {zal.price > 0 ? `- ${zal.price} so'm/soat` : "(Bepul)"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sport turi
          </label>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {sportTypes.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-black">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sana tanlang
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Odamlar soni
          </label>
          <select
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md"
          >
            {[5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} ta
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 text-black">
        <label className="block text-sm font-medium text-gray-700 mb-1 ">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md"
        >
          <option value="partial">Bizga odam kerak</option>
          <option value="full">To‘liqmiz</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-2">
          Vaqtni tanlang:
        </p>
        <div className="flex flex-wrap gap-2">
          {times.map((time) => {
            const booked = isBooked(time);
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                disabled={booked}
                onClick={() => !booked && setSelectedTime(time)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition 
                  ${
                    booked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-300"
                  }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {selectedTime && (
        <div className="mt-6 text-center">
          <button
            onClick={handleBooking}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
          >
            ✅ Band qilish
          </button>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📋 Band qilingan vaqtlar:
        </h3>
        <ul className="space-y-4">
          {bookedSlots.filter(
            (b) => b.date === selectedDate && b.zal === selectedZal
          ).length === 0 ? (
            <p className="text-sm text-gray-500">
              Hozircha band qilingan vaqtlar yo‘q.
            </p>
          ) : (
            bookedSlots
              .filter((b) => b.date === selectedDate && b.zal === selectedZal)
              .map((b, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between bg-white rounded-xl px-5 py-3 shadow"
                >
                  <div>
                    <p className="text-base font-medium text-gray-800">
                      🕒 {b.time} — ⚽ {b.sport}
                    </p>
                    <p className="text-sm text-gray-500">👤 {b.user}</p>
                    <p className="text-sm text-gray-600">
                      👥 Odamlar: {b.joinedUsers.length}/{b.maxPlayers}
                    </p>
                  </div>
                  {b.status === "partial" &&
                    b.joinedUsers.length < b.maxPlayers && (
                      <button
                        onClick={() => setJoinModal(b)}
                        className="mt-2 sm:mt-0 bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full hover:bg-green-200"
                      >
                        ➕ Qo‘shilishni so‘rash
                      </button>
                    )}
                </li>
              ))
          )}
        </ul>
      </div>

      {joinModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md text-black">
            <h3 className="text-lg font-semibold text-center text-indigo-700 mb-4">
              📝 Qo‘shilish so‘rovi
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ism"
                value={joinForm.name}
                onChange={(e) =>
                  setJoinForm({ ...joinForm, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Familiya"
                value={joinForm.surname}
                onChange={(e) =>
                  setJoinForm({ ...joinForm, surname: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Fakultet"
                value={joinForm.faculty}
                onChange={(e) =>
                  setJoinForm({ ...joinForm, faculty: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Guruh"
                value={joinForm.group}
                onChange={(e) =>
                  setJoinForm({ ...joinForm, group: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Telefon raqami"
                value={joinForm.phone}
                onChange={(e) =>
                  setJoinForm({ ...joinForm, phone: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setJoinModal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleJoinRequest}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
