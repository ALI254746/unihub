"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, X, ChevronRight } from "lucide-react"; 
import CoustomLink from "./LoadingOverlay"; 

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data.isLoggedIn) {
            setIsLoggedIn(true);
            return;
        }

        const token = localStorage.getItem("unihub_token");
        if (token) {
            const res2 = await fetch("/api/me", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            const data2 = await res2.json();
            setIsLoggedIn(data2.isLoggedIn);
        } else {
            setIsLoggedIn(false);
        }
    } catch (e) {
        setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false); 
    router.push("/");
    router.refresh(); 
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
      
      {/* 1. Logo Section */}
      <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
             <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-110 transition-transform">
                 U
             </div>
             <span className="font-medium text-sm text-[#F7F8F8] tracking-tight group-hover:text-white transition-colors">UniHub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
              <NavLink href="/elonlar">E'lonlar</NavLink>
              <NavLink href="/darsresurslari">Resurslar</NavLink>
              <NavLink href="/talabalarkulubi">Klublar</NavLink>
              <NavLink href="/about">Biz haqimizda</NavLink>
          </div>
      </div>

      {/* 2. Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden text-[#8A8F98] hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-4">
            <button className="relative text-[#8A8F98] hover:text-[#F7F8F8] transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#5E6AD2] ring-2 ring-[#08090A]"></span>
            </button>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-[#8A8F98] hover:text-red-400 transition-colors"
            >
              Chiqish
            </button>
            <CoustomLink
               href="/dashboard"
               className="bg-[#F7F8F8] text-black hover:bg-white text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
               Boshqaruv
            </CoustomLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <CoustomLink
              href="/login"
              className="text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors px-2"
            >
              Kirish
            </CoustomLink>
            <CoustomLink
              href="/register"
              className="bg-[#F7F8F8] text-black hover:bg-white text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center gap-1 group"
            >
              Ro'yxatdan o'tish <ChevronRight size={12} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
            </CoustomLink>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[#08090A] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden z-50 animate-in slide-in-from-top-2">
              <NavLink href="/elonlar" mobile>E'lonlar</NavLink>
              <NavLink href="/darsresurslari" mobile>Resurslar</NavLink>
              <NavLink href="/booking" mobile>Joy band qilish</NavLink>
              <NavLink href="/talabalarkulubi" mobile>Klublar</NavLink>
              <div className="h-px bg-white/5 my-2"></div>
              {isLoggedIn ? (
                  <>
                    <CoustomLink href="/dashboard" className="text-sm font-medium text-white">Boshqaruv Paneli</CoustomLink>
                    <button onClick={handleLogout} className="text-sm font-medium text-red-400 text-left">Chiqish</button>
                  </>
              ) : (
                  <>
                    <CoustomLink href="/login" className="text-sm font-medium text-[#8A8F98]">Kirish</CoustomLink>
                    <CoustomLink href="/register" className="text-sm font-medium text-white">Ro'yxatdan o'tish</CoustomLink>
                  </>
              )}
          </div>
      )}

    </div>
  );
}

function NavLink({ href, children, mobile }) {
    return (
        <CoustomLink 
            href={href} 
            className={`text-sm font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors ${mobile ? 'block py-2' : ''}`}
        >
            {children}
        </CoustomLink>
    )
}
