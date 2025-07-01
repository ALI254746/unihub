"use client";
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Stol (faqat ko‘rinish uchun)
const desks = [
  { id: "desk-1", x: 100, y: 100 },
  { id: "desk-2", x: 300, y: 100 },
  { id: "desk-3", x: 500, y: 100 },
];

// Stullar
const seats = [
  { id: "seat-1", x: 90, y: 160 },
  { id: "seat-2", x: 310, y: 160 },
  { id: "seat-3", x: 510, y: 160 },
  { id: "seat-4", x: 130, y: 160 },
  { id: "seat-5", x: 330, y: 160 },
];

export default function SeatMap() {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    setBookedSeats(saved);
  }, []);

  const handleSeatClick = (id) => {
    if (bookedSeats.includes(id)) return;
    const updated = [...bookedSeats, id];
    setBookedSeats(updated);
    localStorage.setItem("bookedSeats", JSON.stringify(updated));
  };

  return (
    <div className="w-full h-screen bg-white">
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
            width={800}
            height={600}
            viewBox="0 0 800 600"
            className="bg-gray-100"
          >
            {/* Stollar */}
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

            {/* Stullar */}
            {seats.map((seat) => (
              <circle
                key={seat.id}
                cx={seat.x}
                cy={seat.y}
                r="18"
                fill={bookedSeats.includes(seat.id) ? "gray" : "green"}
                stroke="black"
                strokeWidth="2"
                cursor="pointer"
                onClick={() => handleSeatClick(seat.id)}
              />
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
