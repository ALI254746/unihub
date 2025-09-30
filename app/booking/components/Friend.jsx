"use client";
import { useState } from "react";
import { FaHandshake, FaHeart, FaHandPeace } from "react-icons/fa";

export default function RandomMatchCard() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      {/* Random Match Card */}
      <div className="gradient-card rounded-3xl soft-shadow p-8 border border-gray-100/50">
        {/* <!-- Handshake Icon Header --> */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 soft-shadow">
            <i className="text-white text-2xl" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-handshake"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="handshake"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
                ></path>
              </svg>
            </i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Yangi Match Topildi!
          </h2>
          <p className="text-gray-600">
            Siz bilan bugun 3 soat kutubxonada o'tirgan
          </p>
        </div>

        {/* <!-- User Avatars and Connection --> */}
        <div className="flex items-center justify-center mb-8 relative">
          {/* <!-- Current User --> */}
          <div className="relative tooltip-trigger">
            <div className="w-24 h-24 rounded-full overflow-hidden soft-shadow border-4 border-white relative">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                alt="You"
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold match-percentage">
                87%
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-bold text-gray-900">Siz</p>
              <p className="text-sm text-gray-500">IT fakulteti</p>
            </div>
            {/* <!-- Tooltip --> */}
            <div className="tooltip absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
              <div>Xona: A-204, Stul: 15</div>
              <div>Qiziqishlar: Frontend, Chess</div>
            </div>
          </div>

          {/* <!-- Connection Line with Heart --> */}
          <div className="flex items-center mx-8">
            <div className="connection-line h-1 w-20 rounded-full"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-2">
              <i className="text-white text-sm" data-fa-i2svg="">
                <svg
                  className="svg-inline--fa fa-heart"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  ></path>
                </svg>
              </i>
            </div>
            <div className="connection-line h-1 w-20 rounded-full"></div>
          </div>

          {/* <!-- Match User --> */}
          <div className="relative tooltip-trigger">
            <div className="w-24 h-24 rounded-full overflow-hidden soft-shadow border-4 border-white relative">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                alt="Dilshod"
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold match-percentage">
                87%
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-bold text-gray-900">Dilshod</p>
              <p className="text-sm text-gray-500">IT fakulteti</p>
            </div>
            {/* <!-- Tooltip --> */}
            <div
              className="tooltip absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <div>Xona: A-204, Stul: 16</div>
              <div>Qiziqishlar: Backend, Chess</div>
            </div>
          </div>
        </div>

        {/* <!-- Matching Data --> */}
        <div className="space-y-4 mb-8">
          {/* <!-- Common Interests --> */}
          <div className="bg-white/50 rounded-2xl p-4 inner-shadow">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <i className="text-purple-500 mr-2" data-fa-i2svg="">
                <svg
                  className="svg-inline--fa fa-puzzle-piece"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="puzzle-piece"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8v0c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2v0c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2v0c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2v0c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8v0c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320v0c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256v0C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2v0z"
                  ></path>
                </svg>
              </i>
              Umumiy qiziqishlar
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <i className="mr-2" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-chess"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="chess"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M144 16c0-8.8-7.2-16-16-16s-16 7.2-16 16V32H96c-8.8 0-16 7.2-16 16s7.2 16 16 16h16V96H60.2C49.1 96 40 105.1 40 116.2c0 2.5 .5 4.9 1.3 7.3L73.8 208H72c-13.3 0-24 10.7-24 24s10.7 24 24 24h4L60 384H196L180 256h4c13.3 0 24-10.7 24-24s-10.7-24-24-24h-1.8l32.5-84.5c.9-2.3 1.3-4.8 1.3-7.3c0-11.2-9.1-20.2-20.2-20.2H144V64h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H144V16zM48 416L4.8 473.6C1.7 477.8 0 482.8 0 488c0 13.3 10.7 24 24 24H232c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L208 416H48zm288 0l-43.2 57.6c-3.1 4.2-4.8 9.2-4.8 14.4c0 13.3 10.7 24 24 24H488c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L464 416H336zM304 208v51.9c0 7.8 2.8 15.3 8 21.1L339.2 312 337 384H462.5l-3.3-72 28.3-30.8c5.4-5.9 8.5-13.6 8.5-21.7V208c0-8.8-7.2-16-16-16H464c-8.8 0-16 7.2-16 16v16H424V208c0-8.8-7.2-16-16-16H392c-8.8 0-16 7.2-16 16v16H352V208c0-8.8-7.2-16-16-16H320c-8.8 0-16 7.2-16 16zm80 96c0-8.8 7.2-16 16-16s16 7.2 16 16v32H384V304z"
                    ></path>
                  </svg>
                </i>
                Shaxmat
              </span>
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <i className="mr-2" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-code"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="code"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                    ></path>
                  </svg>
                </i>
                Dasturlash
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <i className="mr-2" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-book"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="book"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                    ></path>
                  </svg>
                </i>
                Kitob o'qish
              </span>
            </div>
          </div>

          {/* <!-- Location & Achievements --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-2xl p-4 inner-shadow">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <i className="text-red-500 mr-2" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-location-dot"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="location-dot"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                    ></path>
                  </svg>
                </i>
                Joylashuv
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <i className="mr-2 text-gray-500" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-building"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="building"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"
                      ></path>
                    </svg>
                  </i>
                  A-204 xonasi
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="mr-2 text-gray-500" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-chair"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chair"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M248 48V256h48V58.7c23.9 13.8 40 39.7 40 69.3V256h48V128C384 57.3 326.7 0 256 0H192C121.3 0 64 57.3 64 128V256h48V128c0-29.6 16.1-55.5 40-69.3V256h48V48h48zM48 288c-12.1 0-23.2 6.8-28.6 17.7l-16 32c-5 9.9-4.4 21.7 1.4 31.1S20.9 384 32 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32V384H352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384c11.1 0 21.4-5.7 27.2-15.2s6.4-21.2 1.4-31.1l-16-32C423.2 294.8 412.1 288 400 288H48z"
                      ></path>
                    </svg>
                  </i>
                  15-16 stullar (yonma-yon)
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="mr-2 text-gray-500" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-clock"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="clock"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                      ></path>
                    </svg>
                  </i>
                  3 soat birga
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl p-4 inner-shadow">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <i className="text-yellow-500 mr-2" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-trophy"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="trophy"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
                    ></path>
                  </svg>
                </i>
                Yutuqlar
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-lg mr-2">🏅</span>
                  Kutubxona sherigi (5 marta)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-lg mr-2">⭐</span>
                  Omadli stul
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-lg mr-2">🚶‍♂️</span>
                  Yo'l sherigi (3 marta)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Action Buttons --> */}
        <div className="flex space-x-4 justify-center">
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold flex items-center space-x-2 soft-shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <i data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-hand-peace"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="hand-peace"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M224 0c17.7 0 32 14.3 32 32V240H192V32c0-17.7 14.3-32 32-32zm96 160c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32zm64 64c0-17.7 14.3-32 32-32s32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V224zM93.3 51.2L175.9 240H106.1L34.7 76.8C27.6 60.6 35 41.8 51.2 34.7s35.1 .3 42.1 16.5zm27 221.3l-.2-.5h69.9H216c22.1 0 40 17.9 40 40s-17.9 40-40 40H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h56c39.8 0 72-32.2 72-72l0-.6c9.4 5.4 20.3 8.6 32 8.6c13.2 0 25.4-4 35.6-10.8c8.7 24.9 32.5 42.8 60.4 42.8c11.7 0 22.6-3.1 32-8.6V352c0 88.4-71.6 160-160 160H226.3c-42.4 0-83.1-16.9-113.1-46.9l-11.6-11.6C77.5 429.5 64 396.9 64 363V336c0-32.7 24.6-59.7 56.3-63.5z"
                ></path>
              </svg>
            </i>
            <span>Salomlashish</span>
          </button>
          <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-colors duration-300">
            Keyinroq
          </button>
        </div>
      </div>
      {/* Friends Card */}
    </>
  );
}
