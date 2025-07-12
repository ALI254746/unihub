"use client";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaHouse,
  FaMicrophoneSlash,
  FaFlag,
  FaMicrophone,
  FaVideo,
  FaArrowRight,
  FaGraduationCap,
  FaUniversity,
  FaVenus,
  FaCog,
  FaBookOpen,
  FaSyncAlt,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

// 1. Mobil UI komponenti
function MobileChatPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const toggleMic = () => setIsMuted((prev) => !prev);
  const toggleCamera = () => setCameraOn((prev) => !prev);

  const handleNextStudent = () => {
    setConnecting(true);
    setTimeout(() => setConnecting(false), 2000);
  };

  return (
    <div className="bg-black font-sans h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-black/90 backdrop-blur-md text-white py-4 px-5 flex items-center justify-between border-b border-gray-800 fixed top-0 w-full z-10">
        <div className="flex items-center space-x-4">
          <button className="text-[#0284c7]">
            <FaHome className="text-xl" />
          </button>
          <h1 className="text-lg font-semibold">StudentConnect</h1>
        </div>
        <button className="text-gray-400">
          <FaCog className="text-lg" />
        </button>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 flex flex-col relative mt-14 mb-20">
        {/* Remote student video */}
        <div className="w-full h-full bg-gray-900 relative overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2c5cfa61e3-a50a9468d59a5772aea3.png"
            alt="student video"
          />

          {/* Student Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-16">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-white text-xl font-bold">Sarah Johnson</h2>
                <div className="flex flex-col mt-1 text-gray-300 text-sm space-y-1">
                  <div className="flex items-center">
                    <FaBookOpen className="text-[#0284c7] mr-2 w-5" />
                    <span>Computer Science</span>
                  </div>
                  <div className="flex items-center">
                    <FaUniversity className="text-[#0284c7] mr-2 w-5" />
                    <span>Stanford University</span>
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="text-[#0284c7] mr-2 w-5" />
                    <span>Engineering Faculty</span>
                  </div>
                  <div className="flex items-center">
                    <FaVenus className="text-[#0284c7] mr-2 w-5" />
                    <span>Female</span>
                  </div>
                </div>
              </div>

              {/* Mic & Camera Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={toggleMic}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                >
                  {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button
                  onClick={toggleCamera}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                >
                  {cameraOn ? <FaVideo /> : <FaVideoSlash />}
                </button>
              </div>
            </div>
          </div>

          {/* Your own video */}
          <div className="absolute top-4 right-4 w-28 h-40 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
            <img
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a0624f33d8-ae384df92da11dc30bf5.png"
              alt="your video"
            />
            <div className="absolute bottom-1 right-1">
              <button className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">
                <FaSyncAlt />
              </button>
            </div>
          </div>

          {/* Connection status */}
          <div className="absolute top-4 left-4 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-white mr-1"></span>
            Connected
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-4 border-t border-gray-800">
        <div className="flex flex-col space-y-3">
          {/* <div className="flex justify-center space-x-4">
            <button className="text-gray-400 flex flex-col items-center text-xs">
              <FaFlag className="text-lg mb-1" />
              Report
            </button>
            <button className="text-gray-400 flex flex-col items-center text-xs">
              <FaHeart className="text-lg mb-1" />
              Like
            </button>
            <button className="text-gray-400 flex flex-col items-center text-xs">
              <FaEnvelope className="text-lg mb-1" />
              Message
            </button>
          </div> */}
          <button
            onClick={handleNextStudent}
            className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg active:scale-[0.98] transition-transform"
          >
            <span>Next Student</span>
            <FaArrowRight />
          </button>
        </div>
      </footer>

      {/* Overlay */}
      {connecting && (
        <div className="fixed inset-0 bg-black/80 z-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#0284c7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">
              Connecting to next student...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Finding someone in your field of study
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
function DesktopChatPage() {
  const [containerHeight, setContainerHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => setContainerHeight(window.innerHeight + "px");
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleNextStudent = () => {
    const el = document.getElementById("student-video");
    if (el) {
      el.style.opacity = 0.3;
      setTimeout(() => {
        el.style.opacity = 1;
      }, 500);
    }
  };

  return (
    <main
      className="relative bg-gray-50 font-sans overflow-hidden"
      style={{ height: containerHeight }}
    >
      {/* Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 p-3 rounded-full shadow-lg">
          <FaHome className="text-white text-lg" />
        </button>
      </div>

      {/* Connection Status */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>Connected</span>
        </div>
      </div>

      {/* Video Chat Section */}
      <div className="flex w-full" style={{ height: containerHeight }}>
        {/* Student Video (Left) */}
        <div
          id="student-video"
          className="relative w-1/2 h-full overflow-hidden transition-opacity duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3d66ae0a74-7ed0bace6bd6056e8ead.png"
            alt="Student Video"
            className="w-full h-full object-cover"
          />
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-sm">
              <FaMicrophoneSlash className="text-white text-sm" />
            </button>
            <button className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-sm">
              <FaFlag className="text-white text-sm" />
            </button>
          </div>
          {/* Info Panel */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pt-12 text-white">
            <h3 className="text-xl font-semibold mb-2">Sarah Chen</h3>
            <div className="space-y-1 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-blue-300" />
                <span>Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUniversity className="text-blue-300" />
                <span>Stanford University</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUniversity className="text-blue-300" />
                <span>Engineering Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <FaVenus className="text-pink-300" />
                <span>Female</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Video (Right) */}
        <div className="relative w-1/2 h-full p-4">
          <div className="w-full h-full bg-black/20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/aab43ceee4-8376bbf7754461436b32.png"
              alt="Your Video"
              className="w-full h-full object-cover"
            />
            {/* You Label */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                You
              </span>
            </div>
            {/* Your Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <FaMicrophone className="text-white text-sm" />
              </button>
              <button className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <FaVideo className="text-white text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Next Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleNextStudent}
          className="bg-sky-600 hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          <FaArrowRight />
          <span>Next Student</span>
        </button>
      </div>
    </main>
  );
}
export default function VideoChatPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // ilk renderda tekshirish
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileChatPage /> : <DesktopChatPage />;
}
