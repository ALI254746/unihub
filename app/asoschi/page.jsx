"use client";
import React from "react";
import Link from "next/link";
import { 
  Command, 
  Menu, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail,
  Code
} from "lucide-react";

export default function FounderPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

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
             <Link href="/asoschi" className="text-[#F7F8F8] transition-colors">Asoschi</Link>
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

      <main className="pt-32 pb-20 w-full max-w-[1000px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Left: Image/Card */}
          <div className="w-full max-w-[400px] relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6AD2] to-[#A485F6] rounded-[40px] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
             <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-[3/4] bg-[#0E0F11]">
                {/* Placeholder for Founder Image - You can replace this with a real image */}
                <div className="w-full h-full bg-gradient-to-br from-[#1A1B1E] to-[#08090A] flex flex-col items-center justify-center p-8 text-center">
                   <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Code size={40} className="text-[#5E6AD2]" />
                   </div>
                   <p className="text-[#8A8F98] text-sm italic">
                     "Kelajak bugun yaratiladi. Har bir qator kod - yangi imkoniyat."
                   </p>
                </div>
                
                {/* Overlay Name */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#000000] to-transparent">
                   <h2 className="text-2xl font-medium text-[#F7F8F8]">Hojiakbar</h2>
                   <p className="text-[#5E6AD2] font-medium">Full Stack Developer</p>
                </div>
             </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[#5E6AD2] text-xs font-medium mb-6">
               <span>TUIT Student</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F7F8F8] mb-8 leading-tight">
               Talabalar uchun <span className="text-[#5E6AD2]">innovatsion</span> yechimlar yaratuvchisi
             </h1>
             
             <div className="space-y-6 text-[#8A8F98] text-lg leading-relaxed mb-10">
               <p>
                 Assalomu alaykum! Men Hojiakbar, Toshkent Axborot Texnologiyalari Universiteti (TATU) 4-kurs talabasiman.
               </p>
               <p>
                 <span className="text-[#F7F8F8]">Talaba + (UniHub)</span> loyihasi mening talabalik davridagi kuzatuvlarim va tajribam asosida tug'ilgan. Maqsadim - O'zbekiston talabalari uchun o'qish, rivojlanish va muloqot qilishni osonlashtiradigan yagona raqamli makon yaratish.
               </p>
               <p>
                 Dasturlashga bo'lgan qiziqishim va muammolarga zamonaviy yechim topish istagim ushbu platformani yaratishga undadi.
               </p>
             </div>

             <div className="flex items-center gap-6">
                <a href="https://github.com/hojiakbar-code" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#F7F8F8] transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#F7F8F8] transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com/hojiakbar.code" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#F7F8F8] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="mailto:contact@unihub.uz" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7F8F8] text-[#08090A] font-medium hover:bg-white transition-colors">
                  <Mail size={18} />
                  <span>Bog'lanish</span>
                </a>
             </div>
          </div>

        </div>

        {/* Quote Section */}
        <div className="mt-32 text-center max-w-2xl mx-auto">
           <Code size={32} className="text-[#5E6AD2] mx-auto mb-8 opacity-50" />
           <p className="text-2xl font-medium text-[#F7F8F8] leading-relaxed mb-6">
             "Eng yaxshi investitsiya - bu o'z bilimingizga kiritilgan sarmoyadir. Create. Code. Inspire."
           </p>
           <div className="text-[#8A8F98] text-sm">Hojiakbar | Web Developer</div>
        </div>

      </main>
    </div>
  );
}
