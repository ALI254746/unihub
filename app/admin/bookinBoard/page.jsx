"use client";

import React, { useEffect, useState } from "react";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookSeat");
        if (!res.ok) throw new Error("API so‘rovda xatolik yuz berdi");
        const data = await res.json();
        setBookings(data.bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) return <p>⏳ Yuklanmoqda...</p>;
  if (error) return <p className="text-red-500">❌ Xatolik: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">
        📋 Band qilingan o‘rindiqlar
      </h1>
      {bookings.length === 0 ? (
        <p className="text-black">Hozircha hech qanday booking yo‘q</p>
      ) : (
        <table className="w-full border border-gray-300 text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Stul ID</th>
              <th className="border px-4 py-2">Foydalanuvchi</th>
              <th className="border px-4 py-2">Boshlangan</th>
              <th className="border px-4 py-2">Tugaydi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="text-center">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{b.seatId}</td>
                <td className="border px-4 py-2">
                  {b.firstName} {b.lastName}
                </td>
                <td className="border px-4 py-2">
                  {new Date(b.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(b.expiresAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
