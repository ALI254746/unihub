"use client";
import React from "react";
import Link from "next/link";
import { 
  Command, 
  Menu, 
  GraduationCap, 
  Users, 
  Trophy, 
  Rocket, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function StudentsPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const steps = [
    {
      title: "Ro'yxatdan o'ting",
      description: "Universitet emailingiz orqali tizimga kiring va shaxsiy profilingizni yarating.",
      icon: <Users className="text-[#5E6AD2]" size={24} />
    },
    {
      title: "Qiziqishlarni tanlang",
      description: "O'z yo'nalishingiz va qiziqishlaringizni belgilang, biz sizga mos kontentni taklif qilamiz.",
      icon: <CheckCircle2 className="text-[#FDBE2E]" size={24} />
    },
    {
      title: "Faol bo'ling",
      description: "Tadbirlarda qatnashing, loyihalarga qo'shiling va reytingingizni oshiring.",
      icon: <Rocket className="text-[#FB5859]" size={24} />
    }
  ];

  const benefits = [
    {
      title: "Yagona Ekosistema",
      description: "Barcha kerakli vositalar bir joyda: kutubxona, e'lonlar, xarita va messenjer.",
      color: "border-[#5E6AD2]/20 bg-[#5E6AD2]/5"
    },
    {
      title: "Karyera Imkoniyatlari",
      description: "Top kompaniyalardan amaliyot va ish takliflari, rezyume yaratish yordamchisi.",
      color: "border-[#28C840]/20 bg-[#28C840]/5"
    },
    {
      title: "Networking",
      description: "Boshqa universitet talabalari bilan aloqa o'rnating va hamkorlik qiling.",
      color: "border-[#A485F6]/20 bg-[#A485F6]/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FB5859]/10 via-[#FB5859]/5 to-transparent blur-[100px] pointer-events-none -z-10" />

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
             <Link href="/talabalar" className="text-[#F7F8F8] transition-colors">Talabalar uchun</Link>
             <Link href="/tariflar" className="hover:text-[#F7F8F8] transition-colors">Tariflar</Link>
             <Link href="/asoschi" className="hover:text-[#F7F8F8] transition-colors">Asoschi</Link>
             <Link href="/yordam" className="hover:text-[#F7F8F8] transition-colors">Yordam</Link>
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

      <main className="pt-32 pb-20 w-full max-w-[1200px] mx-auto px-6">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="flex-1 max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] text-xs font-medium mb-6">
               <GraduationCap size={14} />
               <span>Talabalar uchun maxsus</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#F7F8F8] mb-6 leading-[1.1]">
               Kelajagingizni biz bilan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E6AD2] to-[#A485F6]">quring</span>
             </h1>
             <p className="text-lg text-[#8A8F98] mb-8 leading-relaxed">
               O'qish, rivojlanish va karyera qurish uchun barcha imkoniyatlar. Talaba bo'lish endi yanada maroqli.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
               <button onClick={handleGoogleLogin} className="h-11 px-8 rounded-full bg-[#F7F8F8] text-[#08090A] font-medium hover:bg-white hover:scale-105 transition-all">
                 Boshlash
               </button>
               <button className="h-11 px-8 rounded-full border border-white/10 text-[#F7F8F8] font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                 <span>Videoni ko'rish</span>
               </button>
             </div>
          </div>
          
          <div className="flex-1 relative w-full h-[400px] md:h-[500px]">
             {/* Decorative Elements replacing Image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6AD2]/20 to-[#FB5859]/20 rounded-3xl blur-3xl" />
             <div className="absolute inset-4 bg-[#0E0F11] rounded-2xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden group">
               <div className="flex justify-between items-start">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                   <Trophy className="text-[#FDBE2E]" size={24} />
                 </div>
                 <div className="px-3 py-1 rounded-full bg-[#28C840]/10 text-[#28C840] text-xs font-medium">
                   Top 1% Talaba
                 </div>
               </div>
               
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#A485F6]" />
                     <div className="flex-1">
                       <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                       <div className="h-2 w-16 bg-white/10 rounded" />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-8 pt-8 border-t border-white/5">
                 <div className="flex justify-between items-center text-sm text-[#8A8F98]">
                   <span>Haftalik faollik</span>
                   <span className="text-[#F7F8F8]">+24%</span>
                 </div>
                 <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full w-[70%] bg-[#5E6AD2]" />
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {benefits.map((item, index) => (
            <div key={index} className={`p-8 rounded-2xl border ${item.color} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
              <h3 className="text-xl font-medium text-[#F7F8F8] mb-4">{item.title}</h3>
              <p className="text-[#8A8F98] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Steps Section */}
        <div className="mb-24">
           <h2 className="text-3xl md:text-4xl font-medium text-center text-[#F7F8F8] mb-16">
             Qanday boshlash kerak?
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/30 to-transparent border-t border-dashed border-[#5E6AD2]/30" />
             
             {steps.map((step, index) => (
               <div key={index} className="relative flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-[#08090A] border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-[#5E6AD2] transition-colors shadow-[0_0_0_8px_rgba(8,9,10,1)]">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                     {step.icon}
                   </div>
                 </div>
                 <h3 className="text-xl font-medium text-[#F7F8F8] mb-3">{step.title}</h3>
                 <p className="text-[#8A8F98] text-sm max-w-xs">{step.description}</p>
               </div>
             ))}
           </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-[#0E0F11] border border-white/5 p-12 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-transparent to-transparent pointer-events-none" />
           
           <h2 className="text-3xl font-medium text-[#F7F8F8] mb-6 relative z-10">Talabalar safida ko'rishdan xursandmiz</h2>
           <p className="text-[#8A8F98] max-w-xl mx-auto mb-8 relative z-10">
             Minglab talabalar allaqachon biz bilan birga. Siz ham o'z o'rningizni egallang.
           </p>
           
           <button 
             onClick={handleGoogleLogin} 
             className="relative z-10 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#F7F8F8] text-[#08090A] font-medium hover:bg-white transition-colors"
           >
             <span>Ro'yxatdan o'tish</span>
             <ArrowRight size={18} />
           </button>
        </div>

      </main>
    </div>
  );
}
