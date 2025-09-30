"use client";
import React from "react";

// Mock ma'lumotlar (keyinchalik API dan olinadi)
const requests = [
  {
    id: 1,
    name: "Sabina Akramova",
    subject: "Fizika fanidan yordam kerak",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    price: 25000,
    timeAgo: "2 soat oldin",
  },
];

export default function ServiceRequest() {
  return (
    <div id="service-requests" className="px-4 py-2 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Xizmat so'rovlari</h3>
        <button className="text-primary text-sm font-medium flex items-center">
          Yangi so‘rov
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 
              14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 
              32 32s32-14.3 32-32V288H400c17.7 0 
              32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
        </button>
      </div>

      {/* So‘rovlar */}
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-3"
        >
          <div className="flex items-center">
            <img
              src={req.avatar}
              alt={req.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h4 className="font-semibold">{req.name}</h4>
              <p className="text-sm text-gray-600">{req.subject}</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-primary font-bold">
                {req.price.toLocaleString()} so‘m
              </span>
              <p className="text-xs text-gray-500">{req.timeAgo}</p>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center">
              <svg
                className="mr-1 w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M376.6 84.5c11.3-13.6 
                  9.5-33.8-4.1-45.1s-33.8-9.5-45.1 
                  4.1L192 206 56.6 43.5C45.3 29.9 
                  25.1 28.1 11.5 39.4S-3.9 70.9 
                  7.4 84.5L150.3 256 7.4 427.5c-11.3 
                  13.6-9.5 33.8 4.1 45.1s33.8 
                  9.5 45.1-4.1L192 306l135.4 
                  162.5c11.3 13.6 31.5 15.4 
                  45.1 4.1s15.4-31.5 4.1-45.1L233.7 
                  256 376.6 84.5z"
                />
              </svg>
              Rad etish
            </button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center">
              <svg
                className="mr-1 w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 105.4c12.5 
                  12.5 12.5 32.8 0 45.3l-256 
                  256c-12.5 12.5-32.8 12.5-45.3 
                  0l-128-128c-12.5-12.5-12.5-32.8 
                  0-45.3s32.8-12.5 45.3 
                  0L160 338.7 393.4 105.4c12.5-12.5 
                  32.8-12.5 45.3 0z"
                />
              </svg>
              Qabul qilish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
