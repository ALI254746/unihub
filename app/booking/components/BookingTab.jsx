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
  { id: "desk-44", x: 875, y: 600 },
  { id: "desk-45", x: 940, y: 600 },
  { id: "desk-46", x: 1005, y: 600 },
  { id: "desk-47", x: 1070, y: 600 },
  { id: "desk-48", x: 1135, y: 600 },
  { id: "desk-49", x: 1200, y: 600 },
  { id: "desk-50", x: 875, y: 645 },
  { id: "desk-51", x: 940, y: 645 },
  { id: "desk-52", x: 1005, y: 645 },
  { id: "desk-53", x: 1070, y: 645 },
  { id: "desk-54", x: 1135, y: 645 },
  { id: "desk-55", x: 1200, y: 645 },
  { id: "desk-56", x: 875, y: 800 },
  { id: "desk-57", x: 940, y: 800 },
  { id: "desk-58", x: 1005, y: 800 },
  { id: "desk-59", x: 1070, y: 800 },
  { id: "desk-60", x: 1135, y: 800 },
  { id: "desk-61", x: 1200, y: 800 },
  { id: "desk-62", x: 875, y: 845 },
  { id: "desk-63", x: 940, y: 845 },
  { id: "desk-64", x: 1005, y: 845 },
  { id: "desk-65", x: 1070, y: 845 },
  { id: "desk-66", x: 1135, y: 845 },
  { id: "desk-67", x: 1200, y: 845 },
  { id: "desk-68", x: 1, y: 200 },

  { id: "desk-69", x: 69, y: 200 },
  { id: "desk-70", x: 135, y: 200 },
  { id: "desk-71", x: 201, y: 200 },
  { id: "desk-72", x: 267, y: 200 },
  { id: "desk-73", x: 333, y: 200 },
  { id: "desk-74", x: 1, y: 245 },
  { id: "desk-75", x: 69, y: 245 },
  { id: "desk-76", x: 135, y: 245 },
  { id: "desk-77", x: 201, y: 245 },
  { id: "desk-78", x: 267, y: 245 },
  { id: "desk-79", x: 333, y: 245 },
  { id: "desk-80", x: 1, y: 400 },
  { id: "desk-81", x: 69, y: 400 },
  { id: "desk-82", x: 135, y: 400 },
  { id: "desk-83", x: 201, y: 400 },
  { id: "desk-84", x: 267, y: 400 },
  { id: "desk-85", x: 333, y: 400 },
  { id: "desk-86", x: 1, y: 445 },
  { id: "desk-87", x: 69, y: 445 },
  { id: "desk-88", x: 135, y: 445 },
  { id: "desk-89", x: 201, y: 445 },
  { id: "desk-90", x: 267, y: 445 },
  { id: "desk-91", x: 333, y: 445 },
  { id: "desk-92", x: 1, y: 600 },
  { id: "desk-93", x: 69, y: 600 },
  { id: "desk-94", x: 135, y: 600 },
  { id: "desk-95", x: 201, y: 600 },
  { id: "desk-96", x: 267, y: 600 },
  { id: "desk-97", x: 333, y: 600 },
  { id: "desk-98", x: 1, y: 645 },
  { id: "desk-99", x: 69, y: 645 },
  { id: "desk-100", x: 135, y: 645 },
  { id: "desk-101", x: 201, y: 645 },
  { id: "desk-102", x: 267, y: 645 },
  { id: "desk-103", x: 333, y: 645 },
  { id: "desk-104", x: 1, y: 800 },
  { id: "desk-105", x: 69, y: 800 },
  { id: "desk-106", x: 135, y: 800 },
  { id: "desk-107", x: 201, y: 800 },
  { id: "desk-108", x: 267, y: 800 },
  { id: "desk-109", x: 333, y: 800 },
  { id: "desk-110", x: 1, y: 845 },
  { id: "desk-111", x: 69, y: 845 },
  { id: "desk-112", x: 135, y: 845 },
  { id: "desk-113", x: 201, y: 845 },
  { id: "desk-114", x: 267, y: 845 },
  { id: "desk-115", x: 333, y: 845 },
  { id: "desk-116", x: 1, y: 1160 },
  { id: "desk-117", x: 69, y: 1160 },
  { id: "desk-118", x: 135, y: 1160 },
  { id: "desk-119", x: 201, y: 1160 },
  { id: "desk-120", x: 267, y: 1160 },
  { id: "desk-121", x: 333, y: 1160 },
  { id: "desk-122", x: 399, y: 1160 },
  { id: "desk-123", x: 465, y: 1160 },
  { id: "desk-124", x: 531, y: 1160 },
  { id: "desk-125", x: 597, y: 1160 },
  { id: "desk-126", x: 663, y: 1160 },
  { id: "desk-127", x: 729, y: 1160 },
  { id: "desk-128", x: 795, y: 1160 },
  { id: "desk-129", x: 861, y: 1160 },
  { id: "desk-130", x: 927, y: 1160 },
  { id: "desk-131", x: 993, y: 1160 },
  { id: "desk-132", x: 1059, y: 1160 },
  { id: "desk-133", x: 1125, y: 1160 },
  { id: "desk-134", x: 1191, y: 1160 },
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
  { id: "seat-20", x: 1230, y: 170 },
  { id: "seat-21", x: 1160, y: 170 },
  { id: "seat-22", x: 1095, y: 170 },
  { id: "seat-23", x: 1035, y: 170 },
  { id: "seat-24", x: 965, y: 170 },
  { id: "seat-25", x: 900, y: 170 },
  { id: "seat-26", x: 1230, y: 310 },
  { id: "seat-27", x: 1165, y: 310 },
  { id: "seat-28", x: 1095, y: 310 },
  { id: "seat-29", x: 1035, y: 310 },
  { id: "seat-30", x: 969, y: 310 },
  { id: "seat-31", x: 900, y: 310 },
  { id: "seat-32", x: 1230, y: 375 },
  { id: "seat-33", x: 1165, y: 375 },
  { id: "seat-34", x: 1095, y: 375 },
  { id: "seat-35", x: 1035, y: 375 },
  { id: "seat-36", x: 969, y: 375 },
  { id: "seat-37", x: 900, y: 375 },
  { id: "seat-38", x: 1230, y: 510 },
  { id: "seat-39", x: 1165, y: 510 },
  { id: "seat-40", x: 1099, y: 510 },
  { id: "seat-41", x: 1035, y: 510 },
  { id: "seat-42", x: 969, y: 510 },
  { id: "seat-43", x: 900, y: 510 },
  { id: "seat-44", x: 900, y: 575 },
  { id: "seat-45", x: 969, y: 575 },
  { id: "seat-46", x: 1035, y: 575 },
  { id: "seat-47", x: 1099, y: 575 },
  { id: "seat-48", x: 1165, y: 575 },
  { id: "seat-49", x: 1230, y: 575 },
  { id: "seat-50", x: 900, y: 715 },
  { id: "seat-51", x: 969, y: 715 },
  { id: "seat-52", x: 1035, y: 715 },
  { id: "seat-53", x: 1099, y: 715 },
  { id: "seat-54", x: 1165, y: 715 },
  { id: "seat-55", x: 1230, y: 715 },
  { id: "seat-56", x: 900, y: 770 },
  { id: "seat-57", x: 969, y: 770 },
  { id: "seat-58", x: 1035, y: 770 },
  { id: "seat-59", x: 1099, y: 770 },
  { id: "seat-60", x: 1165, y: 770 },
  { id: "seat-61", x: 1230, y: 770 },
  { id: "seat-62", x: 900, y: 910 },
  { id: "seat-63", x: 969, y: 910 },
  { id: "seat-64", x: 1035, y: 910 },
  { id: "seat-65", x: 1099, y: 910 },
  { id: "seat-66", x: 1165, y: 910 },
  { id: "seat-67", x: 1230, y: 910 },
  { id: "seat-68", x: 25, y: 170 },
  { id: "seat-69", x: 95, y: 170 },
  { id: "seat-70", x: 160, y: 170 },
  { id: "seat-71", x: 225, y: 170 },
  { id: "seat-72", x: 295, y: 170 },
  { id: "seat-73", x: 365, y: 170 },
  { id: "seat-74", x: 25, y: 310 },
  { id: "seat-75", x: 95, y: 310 },
  { id: "seat-76", x: 160, y: 310 },
  { id: "seat-77", x: 225, y: 310 },
  { id: "seat-78", x: 295, y: 310 },
  { id: "seat-79", x: 365, y: 310 },
  { id: "seat-80", x: 25, y: 375 },
  { id: "seat-81", x: 95, y: 375 },
  { id: "seat-82", x: 160, y: 375 },
  { id: "seat-83", x: 225, y: 375 },
  { id: "seat-84", x: 295, y: 375 },
  { id: "seat-85", x: 365, y: 375 },
  { id: "seat-86", x: 25, y: 510 },
  { id: "seat-87", x: 95, y: 510 },
  { id: "seat-88", x: 160, y: 510 },
  { id: "seat-89", x: 225, y: 510 },
  { id: "seat-90", x: 295, y: 510 },
  { id: "seat-91", x: 365, y: 510 },
  { id: "seat-92", x: 25, y: 575 },
  { id: "seat-93", x: 95, y: 575 },
  { id: "seat-94", x: 160, y: 575 },
  { id: "seat-95", x: 225, y: 575 },
  { id: "seat-96", x: 295, y: 575 },
  { id: "seat-97", x: 365, y: 575 },
  { id: "seat-98", x: 25, y: 715 },
  { id: "seat-99", x: 95, y: 715 },
  { id: "seat-100", x: 160, y: 715 },
  { id: "seat-101", x: 225, y: 715 },
  { id: "seat-102", x: 295, y: 715 },
  { id: "seat-103", x: 365, y: 715 },
  { id: "seat-104", x: 25, y: 770 },
  { id: "seat-105", x: 95, y: 770 },
  { id: "seat-106", x: 160, y: 770 },
  { id: "seat-107", x: 225, y: 770 },
  { id: "seat-108", x: 295, y: 770 },
  { id: "seat-109", x: 365, y: 770 },
  { id: "seat-110", x: 25, y: 910 },
  { id: "seat-111", x: 95, y: 910 },
  { id: "seat-112", x: 160, y: 910 },
  { id: "seat-113", x: 225, y: 910 },
  { id: "seat-114", x: 295, y: 910 },
  { id: "seat-115", x: 365, y: 910 },
  { id: "seat-116", x: 25, y: 1125 },
  { id: "seat-117", x: 100, y: 1125 },
  { id: "seat-118", x: 165, y: 1125 },
  { id: "seat-119", x: 230, y: 1125 },
  { id: "seat-120", x: 295, y: 1125 },
  { id: "seat-121", x: 360, y: 1125 },
  { id: "seat-122", x: 425, y: 1125 },
  { id: "seat-123", x: 490, y: 1125 },
  { id: "seat-124", x: 555, y: 1125 },
  { id: "seat-125", x: 620, y: 1125 },
  { id: "seat-126", x: 685, y: 1125 },
  { id: "seat-127", x: 760, y: 1125 },
  { id: "seat-128", x: 825, y: 1125 },
  { id: "seat-129", x: 893, y: 1125 },
  { id: "seat-130", x: 955, y: 1125 },
  { id: "seat-131", x: 1025, y: 1125 },
  { id: "seat-132", x: 1088, y: 1125 },
  { id: "seat-133", x: 1155, y: 1125 },
  { id: "seat-134", x: 1220, y: 1125 },
];
const allSeats = seats.map((seat, index) => ({
  ...seat,
  label: index + 1,
  id: `seat-${index + 1}`, // ✅ faqat tartibli id
}));
const allDesks = desks.map((desk, index) => ({
  ...desk,
  label: index + 1,
  id: `desk-${index + 1}`, // ✅ faqat tartibli id
}));

export default function SeatMap() {
  const [qrValue, setQrValue] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [usageDuration, setUsageDuration] = useState(30);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingDuration, setBookingDuration] = useState("10");
  const [timer, setTimer] = useState(Date.now());
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // cookie yuborish uchun MUHIM
        });

        const data = await res.json();

        if (res.ok) {
          setCurrentUserId(data.userId);
          console.log("✅ currentUserId:", data.userId);
        } else {
          console.warn("⚠️ userId topilmadi:", data.error);
        }
      } catch (err) {
        console.error("❌ userId olishda xatolik:", err);
      }
    };

    fetchUserId();
  }, []);
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
        console.log("data", data);

        const formatted = data.bookings.map((b) => ({
          id: b.seatId,
          createdAt: new Date(b.createdAt),
          expiresAt: new Date(b.expiresAt),
          status: b.status, // 👈 statusni qo‘shamiz
          usageStartedAt: b.usageStartedAt ? new Date(b.usageStartedAt) : null,
          usageExpiresAt: b.usageExpiresAt ? new Date(b.usageExpiresAt) : null,
          userId: b.userId, // ✅ bu endi kerak bo‘ladi
          user: {
            name: b.firstName,
            surname: b.lastName,
          },
        }));
        console.log("user id ", formatted);
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
    if (
      info.status === "active" &&
      info.usageStartedAt &&
      info.usageExpiresAt
    ) {
      const durationMs =
        new Date(info.usageExpiresAt) - new Date(info.usageStartedAt);
      return Math.floor(durationMs / 60000);
    }

    // booked holat
    const durationMs = new Date(info.expiresAt) - new Date(info.createdAt);
    return Math.floor(durationMs / 60000);
  };

  const getRemainingTime = (id) => {
    const info = getBookingInfo(id);
    if (!info) return "Noma'lum";

    const now = new Date();

    let remainingMs;

    if (info.status === "active" && info.usageExpiresAt) {
      remainingMs = new Date(info.usageExpiresAt) - now;
    } else {
      remainingMs = new Date(info.expiresAt) - now;
    }

    if (remainingMs <= 0) return "Tugagan";

    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    return `${minutes} daqiqa ${seconds} soniya`;
  };
  const onFinish = async () => {
    try {
      const res = await fetch("/api/finishedUsingSeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatId: selectedSeat }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Xatolik");

      toast.success("Foydalanish tugatildi");

      // Foydalanuvchining joyini o‘chirib tashlaymiz
      setBookedSeats((prev) => prev.filter((b) => b.id !== selectedSeat));

      localStorage.removeItem("myBookingQR");
      setSelectedSeat(null);
    } catch (error) {
      console.error(error);
      toast.error("Tugatishda xatolik yuz berdi");
    }
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
          userId: data.booking.userId,
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
  const handleSeatClick = (seatId) => {
    setSelectedSeat(seatId);
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
  const cancelBooking = async () => {
    try {
      const res = await fetch("/api/cancelBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatId: selectedSeat }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Bekor qilishda xatolik");

      toast.success("Band qilish bekor qilindi");

      setBookedSeats((prev) => prev.filter((b) => b.id !== selectedSeat));
      localStorage.removeItem("myBookingQR");
      setSelectedSeat(null);
    } catch (error) {
      console.error("cancelBooking error:", error);
      toast.error("Server bilan bog‘lanishda xatolik");
    }
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      await fetch("/api/cleanupExpiredBookings");
    }, 60000); // har 60 soniyada tekshiradi

    return () => clearInterval(interval);
  }, []);

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
    if (!selectedSeat || !currentUserId) return null;

    const booking = getBookingInfo(selectedSeat);
    // const isBooked = isSeatBooked(selectedSeat);
    // const isActive = isSeatActive(selectedSeat);
    const isBooked = !!booking; // booking mavjud bo‘lsa true
    const isActive = booking?.status === "active"; // status active bo‘lsa active holatda
    const isMyBooking = String(booking?.userId) === String(currentUserId);

    const savedQR = localStorage.getItem("myBookingQR");
    let isMySeat = false;
    if (savedQR) {
      try {
        const parsedQR = JSON.parse(savedQR);
        isMySeat = parsedQR.seatId === selectedSeat;
      } catch {
        isMySeat = false;
      }
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
        {isMySeat && (
          <button
            onClick={() => {
              const qr = localStorage.getItem("myBookingQR");
              if (qr) {
                setQrValue(qr);
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
          {/* ✅ 1. STUL BO‘SH */}
          {!isBooked && (
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

          {/* ✅ 2. STUL BOOKED HOLATIDA */}
          {isBooked && !isActive && (
            <>
              {isMyBooking ? (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-green-600">
                    Siz bu stulni band qilgansiz
                  </h2>

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
                    onClick={() => {
                      if (isMySeat) {
                        onArrived(); // 🔄 QR code mos kelgan, aktivlashtiramiz
                      } else {
                        toast.error("QR kod mos emas yoki mavjud emas!");
                      }
                    }}
                    className="w-full px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                  >
                    ✅ Keldim
                  </button>

                  <button
                    onClick={cancelBooking}
                    className="w-full px-6 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    ❌ Bandni bekor qilish
                  </button>

                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Yopish
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-red-600">
                    Stul band qilingan
                  </h2>
                  <p className="text-black">
                    👤 Foydalanuvchi: <br />
                    <strong className="text-black">
                      {booking?.user?.name} {booking?.user?.surname}
                    </strong>
                  </p>
                  <p className="text-gray-700">
                    ⏱ Muddati: {getBookingDuration(selectedSeat)} daqiqa <br />
                    ⌛ Qolgan vaqt: {getRemainingTime(selectedSeat)}
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Yopish
                  </button>
                </>
              )}
            </>
          )}

          {/* ✅ 3. STUL ACTIVE HOLATIDA */}
          {isActive && (
            <>
              {isMyBooking ? (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-green-700">
                    Foydalanish aktiv holatda
                  </h2>
                  <p className="text-gray-700">
                    ⏱ Muddati: {getBookingDuration(selectedSeat)} daqiqa <br />
                    ⌛ Qolgan vaqt: {getRemainingTime(selectedSeat)}
                  </p>

                  <button
                    onClick={onFinish}
                    className="w-full px-6 py-2 mt-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                  >
                    🔚 Tugatdim
                  </button>

                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Yopish
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-red-600">
                    Stul aktiv holatda
                  </h2>
                  <p className="text-black">
                    👤 Foydalanuvchi: <br />
                    <strong className="text-black">
                      {booking?.user?.name} {booking?.user?.surname}
                    </strong>
                  </p>
                  <p className="text-gray-700">
                    ⏱ Muddati: {getBookingDuration(selectedSeat)} daqiqa <br />
                    ⌛ Qolgan vaqt: {getRemainingTime(selectedSeat)}
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Yopish
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-screen rounded-3xl overflow-auto ">
      {/* Chap tomon - 70% */}
      <div className="w-full md:flex-[7] min-h-[70vh] max-h-[90vh]  md:min-h-0 bg-cyan-400/10 rounded-3xl p-1">
        {/* Bu yerga chapdagi kontent kiradi */}
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
              width={1580}
              height={1480}
              viewBox="50 0 1150 1200"
              className=" bg-black/40 backdrop-blur-lg  rounded-3xl"
            >
              {allSeats.map((seat) => (
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
                    fill={getSeatColor(seat.id)}
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
                    {seat.label}
                  </text>
                </g>
              ))}
              <g>
                <text
                  x="1100" // gorizontal joylashuvi
                  y="1030" // vertikal joylashuvi
                  fill="black" // matn rangi
                  fontSize="32" // font o'lchami (text-3xl ≈ 30-32px)
                  fontWeight="bold"
                  textAnchor="middle" // o‘rtadan hizalash (ixtiyoriy)
                >
                  Kirish
                </text>
              </g>
              {allDesks.map((desk) => (
                <g key={desk.id}>
                  <rect
                    x={desk.x}
                    y={desk.y}
                    width="60"
                    height="40"
                    fill="#8B4513"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <text
                    x={desk.x + 30} // markazi uchun
                    y={desk.y + 25} // vertikal o'rtasi (40 / 2) + 5
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {desk.label}
                  </text>
                </g>
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
      {/* O‘ng tomon - 50% */}
      <div className="w-full md:flex-[3] bg-gray-100 p-1  max-h-[90vh]md:min-h-0">
        {/* Bu yerga o‘ngdagi kontent kiradi */}
        <div className="w-full bg-white  rounded-xl shadow-md p-3 sm:p-4 mb-2">
          <h3 className="text-md font-bold text-gray-800  mb-3">
            Joriy bandlar
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-blue-200/40  rounded-md">
              <div>
                <p className="text-sm font-medium text-black ">Asosiy zal</p>
                <p className="text-xs text-gray-500 ">08:00 - 23:00</p>
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-green-100  text-green-800 dark:text-green-400 rounded-full">
                80% bo'sh
              </div>
            </div>

            <div className="flex justify-between items-center p-2 bg-gray-50  rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-800 ">
                  Kompyuter xonasi
                </p>
                <p className="text-xs text-gray-500 ">10:00 - 14:00</p>
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 dark:text-yellow-400 rounded-full">
                40% bo'sh
              </div>
            </div>

            <div className="flex justify-between items-center p-2 bg-gray-50  rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-800 ">
                  Kichik o'qish zali
                </p>
                <p className="text-xs text-gray-500 ">13:00 - 17:00</p>
              </div>
              <div className="text-xs font-medium px-2 py-1 bg-red-100  text-red-800 dark:text-red-400 rounded-full">
                10% bo'sh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
