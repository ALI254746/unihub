"use client";
import React from "react";
import Link from "next/link";
// Removed Next.js Image as it's not currently used (using div placeholders)
import { ChevronRight, Command, Menu } from "lucide-react";

export default function Home() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans overflow-x-hidden selection:bg-[#5E6AD2] selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/20 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Header (Linear Style) */}
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
             <Link href="/imkoniyatlar" className="hover:text-[#F7F8F8] transition-colors">Imkoniyatlar</Link>
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
      <main className="pt-32 pb-0 relative z-10 flex flex-col w-full overflow-hidden">
        
        {/* Text Content Container (Centered & on top) */}
        <div className="px-6 max-w-[1200px] mx-auto w-full flex flex-col items-start relative z-20">
            {/* Badge */}
            <div className="mb-8 animate-fade-in opacity-0 [animation-delay:200ms]" style={{ animationFillMode: 'forwards' }}>
               <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-medium text-[#8A8F98] group">
                  <span className="text-[#5E6AD2]">Yangi</span>
                  <span className="w-px h-3 bg-white/10"></span>
                  <span className="group-hover:text-[#F7F8F8] transition-colors">UniHub 2.0 ishga tushdi</span>
                  <ChevronRight size={12} className="text-[#8A8F98] group-hover:text-[#F7F8F8]" />
               </button>
            </div>

            {/* Animated H1 Heading */}
            <h1 className="text-left text-5xl md:text-7xl leading-[1.1] font-medium tracking-tight text-[#F7F8F8] mb-8 w-full max-w-4xl">
               <span className="block">
                  {["Talabalikni", "rejalashtirish"].map((word, i) => (
                    <span key={i} className="inline-block animate-fade-in-up mr-[0.25em]" style={{ animationDelay: `${i * 100}ms` }}>
                      {word}
                    </span>
                  ))}
               </span>
               <span className="block">
                  {["va", "boshqarish", "vositasi."].map((word, i) => (
                    <span key={i} className="inline-block animate-fade-in-up mr-[0.25em]" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                      {word}
                    </span>
                  ))}
               </span>
            </h1>

            {/* Paragraph */}
            <p className="text-left text-lg md:text-[21px] leading-relaxed text-[#8A8F98] max-w-2xl mb-10 flex flex-wrap justify-start gap-[0.25em]">
              {/* Subtext broken into words for individual animation */}
              {"Zamonaviy ta'lim tizimi bilan tanishing. Masalalar, loyihalar va o'quv rejasini tartibga soling, diqqatni muhim narsalarga qarating."
                .split(" ")
                .map((word, i) => (
                  <span 
                    key={i} 
                    className="inline-block animate-fade-in-up" 
                    style={{ animationDelay: `${500 + (i * 30)}ms` }} // Starts after H1, faster stagger
                  >
                    {word}
                  </span>
                ))}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mb-24 opacity-0 animate-fade-in-up [animation-delay:800ms] w-full" style={{ animationFillMode: 'forwards' }}>
               
               {/* Primary Button */}
               <button 
                 onClick={handleGoogleLogin} 
                 className="h-10 px-6 rounded-full bg-[#F7F8F8] text-[#08090A] font-medium text-sm hover:bg-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-200"
               >
                 Boshlash
               </button>

               {/* Secondary Button / Link */}
               <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#F7F8F8] transition-colors text-sm font-medium group">
                 <span>Yangi: Talabalar uchun mobil ilova</span>
                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
        </div>

        {/* Visual / 3D Perspective Container - Full Width & Moved Up */}
        <div className="w-full mt-8 relative z-10 group animate-fade-in" style={{ perspective: '3000px', animationFillMode: 'forwards', animationDelay: '1200ms' }}>
           
           <div className="relative w-full aspect-[20/9] bg-[#0E0F11] rounded-xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-out origin-left border-t-white/20 flex font-sans select-none"
                style={{ transform: 'rotate(-9deg) skewX(17deg) scale(0.85)', transformOrigin: 'top left' }}>
              

               {/* High-Fidelity Linear App Mock (Re-implemented with Tailwind) */}
               <div className="flex w-full h-full bg-[#0E0F11]">
                  
                  {/* Sidebar */}
                  <div className="w-[240px] h-full bg-[#131416] border-r border-white/5 flex flex-col p-5 hidden md:flex animate-fade-in" style={{ animationFillMode: 'forwards', animationDelay: '1600ms' }}>
                     {/* Traffic Lights */}
                     <div className="flex gap-2 mb-8">
                        <div className="w-3 h-3 rounded-full bg-[#FB5859]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FDBE2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                     </div>

                     {/* Nav Items */}
                     <div className="space-y-6">
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 px-2 py-1.5 rounded-md bg-white/5 border border-white/5">
                              <div className="w-4 h-4 rounded bg-[#5E6AD2]"></div>
                              <div className="h-2 w-20 bg-white/40 rounded-sm"></div>
                           </div>
                           <div className="flex items-center gap-3 px-2 py-1.5">
                              <div className="w-4 h-4 rounded border border-white/20"></div>
                              <div className="h-2 w-16 bg-white/20 rounded-sm"></div>
                           </div>
                           <div className="flex items-center gap-3 px-2 py-1.5">
                              <div className="w-4 h-4 rounded border border-white/20"></div>
                              <div className="h-2 w-24 bg-white/20 rounded-sm"></div>
                           </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-3">
                           {[1, 2, 3, 4].map(i => (
                              <div key={i} className="flex items-center gap-3 px-2">
                                 <div className="w-3 h-3 rounded-sm bg-white/10"></div>
                                 <div className="h-2 w-full bg-white/10 rounded-sm"></div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col h-full bg-[#08090A] relative animate-fade-in" style={{ animationFillMode: 'forwards', animationDelay: '2000ms' }}>
                     
                     {/* Header */}
                     <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-[#0E0F11]/50 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                           <div className="w-6 h-6 rounded-md bg-[#5E6AD2]/20 flex items-center justify-center border border-[#5E6AD2]/30">
                              <div className="w-3 h-3 text-[#5E6AD2]">#</div>
                           </div>
                           <div className="h-3 w-32 bg-white/20 rounded-sm"></div>
                        </div>
                        <div className="flex gap-3">
                           <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5"></div>
                           <div className="w-20 h-8 rounded-md bg-[#5E6AD2] shadow-[0_0_15px_rgba(94,106,210,0.4)]"></div>
                        </div>
                     </div>

                     {/* Content List (Issues) */}
                     <div className="flex-1 p-8 space-y-1">
                        {/* Column Headers */}
                        <div className="flex items-center px-4 pb-4 border-b border-white/5 mb-2 gap-4">
                           <div className="w-4 h-4 border border-white/20 rounded"></div>
                           <div className="h-2 w-12 bg-white/10 rounded-sm"></div>
                           <div className="h-2 w-32 bg-white/10 rounded-sm"></div>
                        </div>

                        {/* List Items */}
                        {[1, 2, 3, 4, 5].map((item, index) => (
                           <div key={index} className={`flex items-center gap-4 px-4 py-3 border-b border-white/5 ${index === 1 ? 'bg-white/[0.02]' : ''}`}>
                              <div className="w-4 h-4 border border-white/20 rounded"></div>
                              <div className="flex items-center gap-3 flex-1">
                                 <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                                 <div className="h-2.5 w-16 bg-white/10 rounded-sm"></div>
                                 <div className={`h-2.5 rounded-sm ${index === 0 ? 'w-48 bg-white/40' : 'w-32 bg-white/20'}`}></div>
                              </div>
                              <div className="flex gap-2">
                                 <div className="h-5 w-16 rounded-full border border-white/10 bg-white/5"></div>
                                 <div className="h-5 w-12 rounded-full border border-white/10 bg-white/5"></div>
                              </div>
                           </div>
                        ))}
                        
                        {/* Floating Gradient Overlay suitable for Dark Mode */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090A] to-transparent pointer-events-none"></div>
                     </div>
                  </div>
               </div>

           </div>

           {/* Floor Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-[#5E6AD2] opacity-15 blur-[100px] rounded-[100%] pointer-events-none -z-10" />
        </div>

      </main>
    </div>
  );
}
