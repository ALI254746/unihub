"use client";

import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Toaster, toast } from "react-hot-toast";
import QR from "react-qr-code";

// 🔼 Yuqori qator stollar
const desks = [
  { id: "desk-1", x: 1, y: 1 },
  { id: "desk-2", x: 69, y: 1 },
  { id: "desk-3", x: 135, y: 1 },
  { id: "desk-4", x: 201, y: 1 },
  { id: "desk-5", x: 267, y: 1 },
  { id: "desk-6", x: 333, y: 1 },
  { id: "desk-7", x: 399, y: 1 },
  { id: "desk-8", x: 465, y: 1 },
  { id: "desk-9", x: 531, y: 1 },
  { id: "desk-10", x: 597, y: 1 },
  { id: "desk-11", x: 663, y: 1 },
  { id: "desk-12", x: 729, y: 1 },
  { id: "desk-13", x: 795, y: 1 },
  { id: "desk-14", x: 861, y: 1 },
  { id: "desk-15", x: 927, y: 1 },
  { id: "desk-16", x: 993, y: 1 },
  { id: "desk-17", x: 1059, y: 1 },
  { id: "desk-18", x: 1125, y: 1 },
  { id: "desk-19", x: 1191, y: 1 },
  { id: "desk-20", x: 1200, y: 200 },

  { id: "desk-21", x: 1135, y: 200 },
  { id: "desk-22", x: 1070, y: 200 },
  { id: "desk-23", x: 1005, y: 200 },
  { id: "desk-24", x: 940, y: 200 },
  { id: "desk-25", x: 875, y: 200 },

  { id: "desk-26", x: 1200, y: 245 },
  { id: "desk-27", x: 1135, y: 245 },
  { id: "desk-28", x: 1070, y: 245 },
  { id: "desk-29", x: 1005, y: 245 },
  { id: "desk-30", x: 940, y: 245 },
  { id: "desk-31", x: 875, y: 245 },
  { id: "desk-32", x: 1200, y: 400 },
  { id: "desk-33", x: 1135, y: 400 },
  { id: "desk-34", x: 1070, y: 400 },
  { id: "desk-35", x: 1005, y: 400 },
  { id: "desk-36", x: 940, y: 400 },
  { id: "desk-37", x: 875, y: 400 },
  { id: "desk-38", x: 1200, y: 445 },
  { id: "desk-39", x: 1135, y: 445 },
  { id: "desk-40", x: 1070, y: 445 },
  { id: "desk-41", x: 1005, y: 445 },
  { id: "desk-42", x: 940, y: 445 },
  { id: "desk-43", x: 875, y: 445 },
  { id: "desk-44", x: 0, y: 200 },
  { id: "desk-45", x: 65, y: 200 },
  { id: "desk-46", x: 130, y: 200 },
  { id: "desk-47", x: 195, y: 200 },
  { id: "desk-48", x: 260, y: 200 },
  { id: "desk-49", x: 325, y: 200 },
  { id: "desk-50", x: 0, y: 245 },
  { id: "desk-51", x: 65, y: 245 },
  { id: "desk-52", x: 130, y: 245 },
  { id: "desk-53", x: 195, y: 245 },
  { id: "desk-54", x: 260, y: 245 },
  { id: "desk-55", x: 325, y: 245 },
  { id: "desk-56", x: 0, y: 400 },
  { id: "desk-57", x: 65, y: 400 },
  { id: "desk-58", x: 130, y: 400 },
  { id: "desk-59", x: 195, y: 400 },
  { id: "desk-60", x: 260, y: 400 },
  { id: "desk-61", x: 325, y: 400 },
  { id: "desk-62", x: 0, y: 445 },
  { id: "desk-63", x: 65, y: 445 },
  { id: "desk-64", x: 130, y: 445 },
  { id: "desk-65", x: 195, y: 445 },
  { id: "desk-66", x: 260, y: 445 },
  { id: "desk-67", x: 325, y: 445 },
];

// 🔼 Yuqori qator stullar
const seats = [
  { id: "seat-1", x: 25, y: 65 },
  { id: "seat-2", x: 100, y: 65 },
  { id: "seat-3", x: 165, y: 65 },
  { id: "seat-4", x: 230, y: 65 },
  { id: "seat-5", x: 295, y: 65 },
  { id: "seat-6", x: 360, y: 65 },
  { id: "seat-7", x: 425, y: 65 },
  { id: "seat-8", x: 490, y: 65 },
  { id: "seat-9", x: 555, y: 65 },
  { id: "seat-10", x: 620, y: 65 },
  { id: "seat-11", x: 685, y: 65 },
  { id: "seat-12", x: 760, y: 65 },
  { id: "seat-13", x: 825, y: 65 },
  { id: "seat-14", x: 893, y: 65 },
  { id: "seat-15", x: 955, y: 65 },
  { id: "seat-16", x: 1025, y: 65 },
  { id: "seat-17", x: 1088, y: 65 },
  { id: "seat-18", x: 1155, y: 65 },
  { id: "seat-19", x: 1230, y: 65 },
  { id: "seat-20", x: 165, y: 170 },
  { id: "seat-21", x: 230, y: 170 },
  { id: "seat-22", x: 295, y: 170 },
  { id: "seat-23", x: 360, y: 170 },

  { id: "seat-24", x: 1025, y: 320 },
  { id: "seat-25", x: 955, y: 320 },
  { id: "seat-26", x: 893, y: 320 },
  { id: "seat-27", x: 100, y: 170 },
  { id: "seat-28", x: 25, y: 170 },
  { id: "seat-29", x: 1160, y: 170 },
  { id: "seat-30", x: 1095, y: 170 },
  { id: "seat-31", x: 1035, y: 170 },
  { id: "seat-32", x: 970, y: 170 },
  { id: "seat-33", x: 910, y: 170 },
  { id: "seat-34", x: 1230, y: 370 },
  { id: "seat-35", x: 1155, y: 370 },
  { id: "seat-36", x: 1088, y: 370 },
  { id: "seat-37", x: 1025, y: 370 },
  { id: "seat-38", x: 955, y: 370 },
  { id: "seat-39", x: 893, y: 370 },
  { id: "seat-40", x: 1230, y: 510 },
  { id: "seat-41", x: 1155, y: 510 },
  { id: "seat-42", x: 1088, y: 510 },
  { id: "seat-43", x: 1025, y: 510 },
  { id: "seat-44", x: 955, y: 510 },
  { id: "seat-45", x: 893, y: 510 },
  { id: "seat-46", x: 25, y: 320 },
  { id: "seat-47", x: 100, y: 320 },
  { id: "seat-48", x: 165, y: 320 },
  { id: "seat-49", x: 230, y: 320 },
  { id: "seat-50", x: 295, y: 320 },
  { id: "seat-51", x: 360, y: 320 },
  { id: "seat-52", x: 25, y: 370 },
  { id: "seat-53", x: 100, y: 370 },
  { id: "seat-54", x: 165, y: 370 },
  { id: "seat-55", x: 230, y: 370 },
  { id: "seat-56", x: 295, y: 370 },
  { id: "seat-57", x: 360, y: 370 },
  { id: "seat-58", x: 25, y: 510 },
  { id: "seat-59", x: 100, y: 510 },
  { id: "seat-60", x: 165, y: 510 },
  { id: "seat-61", x: 230, y: 510 },
  { id: "seat-62", x: 295, y: 510 },
  { id: "seat-63", x: 360, y: 510 },
  { id: "seat-64", x: 1230, y: 320 },

  { id: "seat-65", x: 1088, y: 320 },
  { id: "seat-66", x: 1230, y: 170 },
  { id: "seat-67", x: 1155, y: 320 },
];
const bottomSeats = seats.map((seat, i) => ({
  ...seat,

  y: 1200 - seat.y - 10,
}));

const bottomDesks = desks.map((desk, i) => ({
  ...desk,

  y: 1200 - desk.y - 40,
}));
export default function SeatMap() {
  const [qrValue, setQrValue] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [usageDuration, setUsageDuration] = useState(30);

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingDuration, setBookingDuration] = useState("10");
  const [timer, setTimer] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const savedQR = localStorage.getItem("myBookingQR");
      if (savedQR) {
        const qrObj = JSON.parse(savedQR);
        const now = new Date();

        if (new Date(qrObj.expiresAt) < now) {
          localStorage.removeItem("myBookingQR");
          console.log("⏳ QR code muddati tugadi, o‘chirildi");
        }
      }
    }, 60000); // har 1 daqiqada tekshiramiz

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookSeat");
        if (!res.ok) throw new Error("Bookinglarni olishda xatolik");
        const data = await res.json();
        console.log(data);

        const formatted = data.bookings.map((b) => ({
          id: b.seatId,
          createdAt: new Date(b.createdAt),
          expiresAt: new Date(b.expiresAt),
          status: b.status, // 👈 statusni qo‘shamiz
          user: {
            name: b.firstName,
            surname: b.lastName,
          },
        }));
        setBookedSeats(formatted);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeModal = () => setSelectedSeat(null);

  const isSeatBooked = (id) => {
    const seat = bookedSeats.find((seat) => seat.id === id);
    return seat && seat.expiresAt > new Date();
  };

  const getBookingInfo = (id) => bookedSeats.find((seat) => seat.id === id);
  const isSeatActive = (seatId) => {
    const info = getBookingInfo(seatId);
    return info?.status === "active";
  };

  const getBookingDuration = (id) => {
    const info = getBookingInfo(id);
    if (!info) return "Noma'lum";
    const durationMs = info.expiresAt - info.createdAt;
    return Math.floor(durationMs / 60000);
  };

  const getRemainingTime = (id) => {
    const info = getBookingInfo(id);
    if (!info) return "Noma'lum";
    const remainingMs = info.expiresAt - new Date();
    if (remainingMs <= 0) return "Tugagan";
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    return `${minutes} daqiqa ${seconds} soniya`;
  };

  const handleSeatClick = (id) => {
    setSelectedSeat(id);
    setBookingDuration("10");
  };

  const confirmBooking = async () => {
    try {
      const response = await fetch("/api/bookSeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatId: selectedSeat,
          durationMinutes: parseInt(bookingDuration, 10),
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        return;
      }

      const data = await response.json();
      setBookedSeats((prev) => [
        ...prev,
        {
          id: selectedSeat,
          expiresAt: new Date(data.booking.expiresAt),
          createdAt: new Date(data.booking.createdAt),
          user: {
            name: data.booking.firstName,
            surname: data.booking.lastName,
          },
          status: data.booking.status, // ❗️ bu muhim
        },
      ]);

      // ✅ QR qiymatini tayyorlash
      const qrData = {
        seatId: data.booking.seatId,
        firstName: data.booking.firstName,
        lastName: data.booking.lastName,
        createdAt: data.booking.createdAt,
        expiresAt: data.booking.expiresAt,
      };

      setQrValue(JSON.stringify(qrData));
      localStorage.setItem("myBookingQR", JSON.stringify(qrData)); // string shaklida QR codega uzatamiz
      setShowQR(true);
      setSelectedSeat(null);
    } catch (error) {
      alert("Server bilan bog‘lanishda xatolik yuz berdi");
      console.error(error);
    }
  };
  const onArrived = async () => {
    const savedQR = localStorage.getItem("myBookingQR");
    if (!savedQR) return toast.error("QR topilmadi");

    if (!usageDuration || isNaN(usageDuration))
      return toast.error("Muddati noto‘g‘ri");

    try {
      const res = await fetch("/api/startUsing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatId: selectedSeat,
          scannedQR: savedQR,
          usageDuration: parseInt(usageDuration, 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Xatolik");

      toast.success("Joydan foydalanish boshlandi!");
      // 🔄 Bookinglarni yangilash
      setBookedSeats((prev) =>
        prev.map((b) =>
          b.id === selectedSeat
            ? {
                ...b,
                status: "active",
                usageStartedAt: new Date(data.booking.usageStartedAt),
                usageExpiresAt: new Date(data.booking.usageExpiresAt),
              }
            : b
        )
      );
      setSelectedSeat(null);
    } catch (error) {
      console.error(error);
      toast.error("Server bilan bog‘lanishda xatolik");
    }
  };
  function getSeatColor(seatId) {
    const info = getBookingInfo(seatId);
    if (!info) return "green";

    switch (info.status) {
      case "active":
        return "red"; // faollashtirilgan joy
      case "booked":
        return "yellow"; // band qilingan, lekin foydalanilmagan
      case "finished":
        return "blue"; // tugagan joy
      default:
        return "gray"; // nomaʼlum holat
    }
  }

  const renderModal = () => {
    if (!selectedSeat) return null;
    const isBooked = isSeatBooked(selectedSeat);
    const mySeatId = localStorage.getItem("myBookingQR")
      ? JSON.parse(localStorage.getItem("myBookingQR")).seatId
      : null;

    // renderModal funksiyasi ichida:
    const isMySeat =
      localStorage.getItem("myBookingQR") &&
      JSON.parse(localStorage.getItem("myBookingQR")).seatId === selectedSeat;

    return (
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
        {isMySeat && (
          <button
            onClick={() => {
              const savedQR = localStorage.getItem("myBookingQR");
              if (savedQR) {
                setQrValue(savedQR);
                setShowQR(true);
              } else {
                toast.error("Sizda QR kod mavjud emas!");
              }
            }}
            className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 z-50"
          >
            📄 QR Kodim
          </button>
        )}

        <div className="bg-white rounded-lg p-6 shadow-lg w-[300px] text-center">
          {isBooked ? (
            <>
              <h2 className="text-xl font-semibold mb-2 text-red-600">
                Stul band qilingan
              </h2>
              <p className=" text-black">
                👤 Foydalanuvchi: <br />
                <strong className="text-black">
                  {getBookingInfo(selectedSeat)?.user?.name}{" "}
                  {getBookingInfo(selectedSeat)?.user?.surname}
                </strong>
              </p>
              <p className="text-gray-700">
                ⏱ Muddati: {getBookingDuration(selectedSeat)} daqiqa <br />⌛
                Qolgan vaqt: {getRemainingTime(selectedSeat)}
              </p>

              {selectedSeat === mySeatId && !isSeatActive(selectedSeat) && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Necha daqiqa foydalanmoqchisiz?
                  </label>
                  <select
                    value={usageDuration}
                    onChange={(e) => setUsageDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded text-black mb-2"
                  >
                    <option value="30">30 daqiqa</option>
                    <option value="60">1 soat</option>
                    <option value="90">1.5 soat</option>
                    <option value="120">2 soat</option>
                  </select>
                  <button
                    onClick={onArrived}
                    className="w-full px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                  >
                    ✅ Keldim
                  </button>
                </div>
              )}
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Yopish
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-black">
                Stulni band qilish
              </h2>
              <p className="mb-4 text-gray-700">
                Siz {selectedSeat} raqamli stulni tanladingiz.
              </p>

              <label
                htmlFor="duration"
                className="block mb-2 text-left font-medium text-gray-700"
              >
                Band qilish muddati:
              </label>
              <select
                id="duration"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-6 text-black"
              >
                <option value="10">10 daqiqa</option>
                <option value="20">20 daqiqa</option>
                <option value="30">30 daqiqa</option>
                <option value="60">1 soat</option>
                <option value="120">2 soat</option>
              </select>

              <button
                onClick={confirmBooking}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Band qilish
              </button>
              <button
                onClick={closeModal}
                className="mt-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Yopish
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen bg-white">
      <Toaster position="top-center" />

      {/* SVG rendering skipped for brevity */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        limitToBounds={false}
        centerOnInit={false}
        panning={{ velocityDisabled: false }}
        wheel={{ step: 50, wheelEnabled: true }}
        doubleClick={{ disabled: true }}
        pinch={{ step: 5 }}
        zoomAnimation={{
          animationTime: 300,
          animationType: "easeOut",
        }}
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <svg
            width={1290}
            height={1200}
            viewBox="0 0 1300 1200"
            className="bg-blue-200"
          >
            {/* Yuqori stollar */}
            {desks.map((desk) => (
              <rect
                key={desk.id}
                x={desk.x}
                y={desk.y}
                width="60"
                height="40"
                fill="#8B4513"
                stroke="black"
                strokeWidth="2"
              />
            ))}

            {/* Yuqori stullar */}
            {seats.map((seat, index) => (
              <g
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
                style={{
                  cursor: isSeatBooked(seat.id) ? "not-allowed" : "pointer",
                }}
              >
                <circle
                  cx={seat.x}
                  cy={seat.y}
                  r="19"
                  fill={getSeatColor(seat.id)} // ✅ rangni avtomatik tanlaymiz
                  stroke="black"
                  strokeWidth="2"
                />
                <text
                  x={seat.x}
                  y={seat.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {index + 1}
                </text>
              </g>
            ))}

            {/* Pastki stullar */}
            {bottomSeats.map((seat, index) => (
              <g
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
                style={{
                  cursor: isSeatBooked(seat.id) ? "not-allowed" : "pointer",
                }}
              >
                <circle
                  cx={seat.x}
                  cy={seat.y}
                  r="19"
                  fill={isSeatBooked(seat.id) ? "#FFD700" : "green"}
                  stroke="black"
                  strokeWidth="2"
                />
                <text
                  x={seat.x}
                  y={seat.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {index + 1}
                </text>
              </g>
            ))}

            {/* Pastki stollar */}
            {bottomDesks.map((desk) => (
              <rect
                key={desk.id}
                x={desk.x}
                y={desk.y}
                width="60"
                height="40"
                fill="#8B4513"
                stroke="black"
                strokeWidth="2"
              />
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>
      {renderModal()}
      {showQR && qrValue && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-[300px]">
            <h2 className="text-xl font-bold text-black mb-4">
              🎉 Band qilish muvaffaqiyatli!
            </h2>
            <p className="text-black mb-2">Quyidagi QR kodni saqlang:</p>
            <div className="bg-white p-4 rounded">
              <QR value={qrValue} size={200} />
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
