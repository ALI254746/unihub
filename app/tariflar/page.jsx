"use client";
import React from "react";
import Link from "next/link";
import { 
  Command, 
  Menu, 
  Check, 
  Zap, 
  Star, 
  Shield 
} from "lucide-react";

export default function PricingPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const plans = [
    {
      name: "Talaba",
      price: "Bepul",
      description: "Talabalik davrini oson va qulay boshlash uchun.",
      features: [
        "Unihub tarmog'iga kirish",
        "Kitoblar ijarasi va savdosi",
        "Yo'qolgan buyumlarni qidirish",
        "Cheklangan e'lonlar soni (3 ta)",
        "Fakultet yangiliklaridan xabardorlik"
      ],
      cta: "Boshlash",
      popular: false,
      color: "border-white/10 bg-white/5",
      buttonStyle: "bg-white/10 hover:bg-white/20 text-[#F7F8F8]"
    },
    {
      name: "Pro Talaba",
      price: "19,000 so'm/oy",
      description: "Faol talabalar uchun kengaytirilgan imkoniyatlar.",
      features: [
        "Barcha bepul imkoniyatlar",
        "Cheksiz e'lonlar joylashtirish",
        "E'lonlarni 'Top' ga ko'tarish",
        "Karyera va amaliyot bo'limiga kirish",
        "Mentorlar bilan bog'lanish",
        "Shaxsiy portfoli yaratish"
      ],
      cta: "Pro ga o'tish",
      popular: true,
      color: "border-[#5E6AD2]/50 bg-[#5E6AD2]/10 shadow-[0_0_50px_-12px_rgba(94,106,210,0.5)]",
      buttonStyle: "bg-[#F7F8F8] hover:bg-white text-[#08090A]"
    },
    {
      name: "Biznes",
      price: "Kelishilgan holda",
      description: "Kompaniyalar va tashkilotlar uchun maxsus yechimlar.",
      features: [
        "Vakansiyalar joylashtirish",
        "Talabalar bazasidan qidirish",
        "Hamkorlik dasturlari",
        "Reklama joylashtirish",
        "Shaxsiy menejer xizmati"
      ],
      cta: "Bog'lanish",
      popular: false,
      color: "border-[#FDBE2E]/20 bg-[#FDBE2E]/5",
      buttonStyle: "bg-white/10 hover:bg-white/20 text-[#F7F8F8]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-transparent to-transparent blur-[120px] pointer-events-none -z-10" />

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
             <Link href="/tariflar" className="text-[#F7F8F8] transition-colors">Tariflar</Link>
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
        
        {/* Page Title */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F7F8F8] mb-6">
            O'zingizga mos tarifni <span className="text-[#5E6AD2]">tanlang</span>
          </h1>
          <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
            Talaba + har qanday ehtiyoj uchun moslashuvchan yechimlarni taklif etadi. O'qish va rivojlanish uchun eng yaxshi vositalarni qo'lga kiriting.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl border ${plan.color} backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#5E6AD2] text-white text-xs font-medium shadow-lg flex items-center gap-1">
                  <Star size={12} fill="currentColor" />
                  <span>Eng mashhur</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-medium text-[#F7F8F8] mb-2">{plan.name}</h3>
                <div className="text-3xl font-semibold text-white mb-4">{plan.price}</div>
                <p className="text-[#8A8F98] text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#F7F8F8]/80">
                    <Check size={18} className="text-[#5E6AD2] shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleGoogleLogin}
                className={`w-full h-12 rounded-full font-medium transition-all duration-200 ${plan.buttonStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
           <h2 className="text-2xl md:text-3xl font-medium text-center text-[#F7F8F8] mb-12">
             Ko'p so'raladigan savollar
           </h2>
           
           <div className="space-y-4">
             {[
               { q: "Bepul tarif cheklanganmi?", a: "Ha, bepul tarifda e'lonlar soni va ba'zi qo'shimcha funksiyalar cheklangan, lekin asosiy imkoniyatlar (kitob ijarasi, qidiruv) to'liq ishlaydi." },
               { q: "Pro tarifga qanday o'tishim mumkin?", a: "Pro tarifga o'tish uchun profilingizdagi 'Sozlamalar' bo'limiga kirib, to'lov turini tanlashingiz kifoya." },
               { q: "Biznes hamkorlik uchun kimga murojaat qilish kerak?", a: "Biznes hamkorlik bo'limi orqali so'rov qoldiring, menejerlarimiz siz bilan bog'lanishadi." }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <h3 className="text-lg font-medium text-[#F7F8F8] mb-2">{item.q}</h3>
                 <p className="text-[#8A8F98] text-sm leading-relaxed">{item.a}</p>
               </div>
             ))}
           </div>
        </div>

      </main>
    </div>
  );
}
