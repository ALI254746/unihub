"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      setIsLoggedIn(data.isLoggedIn);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false); // frontend holatini darhol o‘zgartiramiz
    router.push("/");
    router.refresh(); // backend holatini yangilaymiz
  };

  return (
    <nav className="flex justify-between items-center max-w-5xl mx-auto mb-8">
      <div className="text-2xl font-bold text-gray-800">🎓 UniHub</div>
      <div className="space-x-4">
        {isLoggedIn === null ? (
          <span className="text-gray-500">Yuklanmoqda...</span>
        ) : isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
