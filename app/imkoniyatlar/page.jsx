"use client";
import React from "react";
import Link from "next/link";
import { 
  Command, 
  Menu, 
  BookOpen, 
  Search, 
  Users, 
  Calendar, 
  Briefcase, 
  Zap,
  ArrowRight
} from "lucide-react";

export default function OpportunitiesPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const opportunities = [
    {
      title: "Kitoblar Ijarasi va Savdosi",
      description: "O'zingizga kerakli o'quv qo'llanmalari va badiiy kitoblarni oson toping, ijaraga oling yoki soting. Talabalar uchun maxsus platforma.",
      icon: <BookOpen className="text-[#5E6AD2]" size={24} />,
      color: "from-[#5E6AD2]/20 to-[#5E6AD2]/5"
    },
    {
      title: "Yo'qolgan Buyumlar",
      description: "Universitet hududida yo'qolgan buyumlarni tez va oson topish imkoniyati. Topilmalar haqida e'lon bering yoki qidiring.",
      icon: <Search className="text-[#FDBE2E]" size={24} />,
      color: "from-[#FDBE2E]/20 to-[#FDBE2E]/5"
    },
    {
      title: "Talabalar Tarmog'i",
      description: "Fakultet va yo'nalishlar bo'yicha boshqa talabalar bilan tanishing, tajriba almashing va hamkorlik qiling.",
      icon: <Users className="text-[#FB5859]" size={24} />,
      color: "from-[#FB5859]/20 to-[#FB5859]/5"
    },
    {
      title: "Tadbirlar va Yangiliklar",
      description: "Universitet hayotidagi eng so'nggi yangiliklar va tadbirlardan xabardor bo'ling. Hech qanday muhim voqeani o'tkazib yubormang.",
      icon: <Calendar className="text-[#28C840]" size={24} />,
      color: "from-[#28C840]/20 to-[#28C840]/5"
    },
    {
      title: "Karyera va Amaliyot",
      description: "O'z sohangiz bo'yicha amaliyot va ish o'rinlarini toping. Karyerangizni talabalik davridanoq quring.",
      icon: <Briefcase className="text-[#A485F6]" size={24} />,
      color: "from-[#A485F6]/20 to-[#A485F6]/5"
    },
    {
      title: "Startap Loyihalar",
      description: "O'z g'oyalaringizni amalga oshirish uchun jamoa to'plang va mentorlar ko'magidan foydalaning.",
      icon: <Zap className="text-[#FF8F00]" size={24} />,
      color: "from-[#FF8F00]/20 to-[#FF8F00]/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/20 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Header (Consistent with Home) */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[64px] border-b border-white/5 bg-[#08090A]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
             <div className="w-5 h-5 text-white flex items-center justify-center">
               <Command size={18} />
             </div>
             <span className="font-medium text-sm tracking-tight group-hover:text-white/80 transition-colors">Talaba +</span>
          </Link>

          {/* Center: Nav (Hidden Mobile) */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#8A8F98]">
             <Link href="/imkoniyatlar" className="text-[#F7F8F8] transition-colors">Imkoniyatlar</Link>
             <Link href="/talabalar" className="hover:text-[#F7F8F8] transition-colors">Talabalar uchun</Link>
             <Link href="/tariflar" className="hover:text-[#F7F8F8] transition-colors">Tariflar</Link>
             <Link href="/asoschi" className="hover:text-[#F7F8F8] transition-colors">Asoschi</Link>
             <Link href="/yordam" className="hover:text-[#F7F8F8] transition-colors">Yordam</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
             <button 
               onClick={handleGoogleLogin}
               className="hidden md:block text-[13px] font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors px-2 py-1"
             >
               Kirish
             </button>
             <button 
               onClick={handleGoogleLogin}
               className="text-[13px] font-medium bg-[#F7F8F8] text-black px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
             >
               Ro'yxatdan o'tish
             </button>
             <button className="md:hidden text-[#8A8F98]">
               <Menu size={20} />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 relative z-10 flex flex-col w-full max-w-[1200px] mx-auto px-6">
        
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F7F8F8] mb-6">
            Cheksiz <span className="text-[#5E6AD2]">Imkoniyatlar</span>
          </h1>
          <p className="text-lg text-[#8A8F98] max-w-2xl leading-relaxed">
            Talaba + platformasi sizga o'qish, rivojlanish va talabalik davrini samarali o'tkazish uchun keng ko'lamli imkoniyatlarni taqdim etadi.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((item, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-medium text-[#F7F8F8] mb-3 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              
              <p className="text-[#8A8F98] text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="flex items-center text-[#5E6AD2] text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span>Batafsil</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1A1B1E] to-[#08090A] border border-white/5 relative overflow-hidden text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-transparent to-transparent pointer-events-none" />
           
           <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 relative z-10">
             Imkoniyatlardan foydalanishni boshlang
           </h2>
           <p className="text-[#8A8F98] mb-8 max-w-xl mx-auto relative z-10">
             Bugunoq ro'yxatdan o'ting va talabalik hayotingizni yanada qiziqarli va samarali qiling.
           </p>
           
           <button 
             onClick={handleGoogleLogin}
             className="relative z-10 h-12 px-8 rounded-full bg-[#F7F8F8] text-[#08090A] font-medium text-base hover:bg-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-200"
           >
             Hoziroq Boshlash
           </button>
        </div>

      </main>
    </div>
  );
}
