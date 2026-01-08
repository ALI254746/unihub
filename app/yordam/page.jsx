"use client";
import React from "react";
import Link from "next/link";
import { 
  Command, 
  Menu, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  FileText, 
  ChevronRight
} from "lucide-react";

export default function HelpPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const categories = [
    {
      title: "Boshlash uchun",
      description: "Ro'yxatdan o'tish, profilni sozlash va birinchi qadamlar.",
      icon: <FileText className="text-[#5E6AD2]" size={24} />
    },
    {
      title: "Xavfsizlik",
      description: "Parolni tiklash, xavfsizlik sozlamalari va maxfiylik.",
      icon: <ShieldIcon className="text-[#28C840]" size={24} />
    },
    {
      title: "To'lovlar",
      description: "Tariflar, to'lov usullari va obunani boshqarish.",
      icon: <CreditCardIcon className="text-[#FDBE2E]" size={24} />
    },
    {
      title: "Texnik yordam",
      description: "Texnik muammolar, xatoliklar va tizim ishlashi.",
      icon: <WrenchIcon className="text-[#FB5859]" size={24} />
    }
  ];

  const popularArticles = [
    "Parolni qanday tiklash mumkin?",
    "Pro tarifga o'tish yo'riqnomasi",
    "E'lon joylashtirish tartibi",
    "Profil ma'lumotlarini o'zgartirish",
    "Hamkorlik dasturi haqida"
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[64px] border-b border-white/5 bg-[#08090A]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
             <div className="w-5 h-5 text-white flex items-center justify-center">
               <Command size={18} />
             </div>
             <span className="font-medium text-sm tracking-tight group-hover:text-white/80 transition-colors">Talaba +</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#8A8F98]">
             <Link href="/imkoniyatlar" className="hover:text-[#F7F8F8] transition-colors">Imkoniyatlar</Link>
             <Link href="/talabalar" className="hover:text-[#F7F8F8] transition-colors">Talabalar uchun</Link>
             <Link href="/tariflar" className="hover:text-[#F7F8F8] transition-colors">Tariflar</Link>
             <Link href="/asoschi" className="hover:text-[#F7F8F8] transition-colors">Asoschi</Link>
             <Link href="/yordam" className="text-[#F7F8F8] transition-colors">Yordam</Link>
          </nav>

          <div className="flex items-center gap-3">
             <button onClick={handleGoogleLogin} className="hidden md:block text-[13px] font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors px-2 py-1">
               Kirish
             </button>
             <button onClick={handleGoogleLogin} className="text-[13px] font-medium bg-[#F7F8F8] text-black px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
               Ro'yxatdan o'tish
             </button>
             <button className="md:hidden text-[#8A8F98]">
               <Menu size={20} />
             </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 w-full max-w-[1000px] mx-auto px-6">
        
        {/* Search Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F7F8F8] mb-8">
            Qanday yordam bera <span className="text-[#5E6AD2]">olamiz?</span>
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5E6AD2] to-[#A485F6] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative flex items-center bg-[#0E0F11] border border-white/10 rounded-2xl p-2 pr-4 shadow-2xl">
               <div className="p-3 text-[#8A8F98]">
                 <Search size={20} />
               </div>
               <input 
                 type="text" 
                 placeholder="Savolingizni yozing..." 
                 className="flex-1 bg-transparent border-none outline-none text-[#F7F8F8] placeholder-[#8A8F98] text-base"
               />
               <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-[#8A8F98]">
                 <span className="text-xs">⌘</span>K
               </kbd>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {categories.map((category, index) => (
            <button key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#F7F8F8] mb-1 group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                <p className="text-[#8A8F98] text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-20">
          <h2 className="text-xl font-medium text-[#F7F8F8] mb-6">Ko'p o'qiladigan maqolalar</h2>
          <div className="bg-[#0E0F11] rounded-2xl border border-white/5 divide-y divide-white/5">
            {popularArticles.map((article, index) => (
              <button key={index} className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#8A8F98]">
                    <Book size={16} />
                  </div>
                  <span className="text-[#F7F8F8] font-medium">{article}</span>
                </div>
                <ChevronRight size={16} className="text-[#8A8F98] group-hover:text-[#F7F8F8] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1A1B1E] to-[#08090A] border border-white/5">
             <div className="w-12 h-12 rounded-full bg-[#5E6AD2]/10 flex items-center justify-center mb-6 text-[#5E6AD2]">
               <MessageCircle size={24} />
             </div>
             <h3 className="text-xl font-medium text-[#F7F8F8] mb-2">Jonli Chat</h3>
             <p className="text-[#8A8F98] text-sm mb-6">Operatorlarimiz har kuni 09:00 dan 18:00 gacha javob berishadi.</p>
             <button className="text-[#5E6AD2] text-sm font-medium hover:text-[#7682E6] transition-colors flex items-center gap-2">
               Chatni boshlash <ChevronRight size={14} />
             </button>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1A1B1E] to-[#08090A] border border-white/5">
             <div className="w-12 h-12 rounded-full bg-[#28C840]/10 flex items-center justify-center mb-6 text-[#28C840]">
               <Mail size={24} />
             </div>
             <h3 className="text-xl font-medium text-[#F7F8F8] mb-2">Email orqali yozing</h3>
             <p className="text-[#8A8F98] text-sm mb-6">Murakkab masalalar bo'yicha batafsil javob olish uchun.</p>
             <button className="text-[#28C840] text-sm font-medium hover:text-[#4ADE60] transition-colors flex items-center gap-2">
               xabar yuborish <ChevronRight size={14} />
             </button>
          </div>
        </div>

      </main>
    </div>
  );
}

// Simple Icon Components for specific use if not in lucide defaults or for custom styling
function ShieldIcon({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CreditCardIcon({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function WrenchIcon({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
