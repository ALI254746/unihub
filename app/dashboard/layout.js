"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { 
  Layout, Calendar, GraduationCap, BookOpen, CheckSquare, 
  FileText, Settings, ChevronRight, Menu, Search, Bell, MoreHorizontal, User, Video
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const urlUid = searchParams.get("uid");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      // 1. Agar URL da UID bo'lsa, uni saqlab olamiz
      if (urlUid) {
          localStorage.setItem("user_id", urlUid);
          setUserId(urlUid);
      } else {
          // 2. Agar URL da bo'lmasa, LocalStorage dan olamiz
          const storedId = localStorage.getItem("user_id");
          if (storedId) {
              setUserId(storedId);
          }
      }
  }, [urlUid]);

  return (
    <div className="min-h-screen flex bg-[#08090A] text-[#F7F8F8] font-sans selection:bg-[#5E6AD2] selection:text-white">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#08090A]/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
         
         {/* Sidebar Header */}
         <div className="h-14 flex items-center px-4 gap-3 border-b border-white/5">
             <div className="w-6 h-6 bg-gradient-to-br from-[#5E6AD2] to-[#8F9AF8] text-white flex items-center justify-center rounded-[6px] text-xs font-bold shadow-[0_0_15px_rgba(94,106,210,0.4)]">
               U
             </div>
             <span className="font-medium text-sm tracking-tight text-[#E8E8E8]">UniHub</span>
             <div className="flex-1" />
             <div className="md:hidden p-1 hover:bg-white/5 rounded" onClick={() => setSidebarOpen(false)}>
               <ChevronRight size={16} className="rotate-180 text-[#8A8F98]" />
             </div>
         </div>

         {/* Navigation */}
         <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
             <div className="px-2 pb-2">
                <button className="w-full flex items-center gap-2 bg-[#1C1D21] hover:bg-[#2C2D33] text-[#F7F8F8] text-sm px-3 py-2 rounded-md border border-white/10 transition-all shadow-sm group">
                  <span className="flex-1 text-left font-medium">Yangi Vazifa</span>
                  <div className="bg-[#383940] w-5 h-5 flex items-center justify-center rounded text-[10px] text-[#A0A0A0] group-hover:text-white border border-white/10">C</div>
                </button>
             </div>

             <div className="pt-4 pb-2 px-3 text-[11px] font-medium text-[#8A8F98] uppercase tracking-wider">Asosiy</div>
             <NavItem icon={<Layout size={16} />} label="Boshqaruv" href="/dashboard" />
             <NavItem icon={<User size={16} />} label="Mening Profilim" href={`/dashboard/profile${userId ? `?uid=${userId}` : ''}`} />
             <NavItem icon={<Calendar size={16} />} label="Dars Jadvali" />
             <NavItem icon={<GraduationCap size={16} />} label="Baholar va GPA" />
             <NavItem icon={<BookOpen size={16} />} label="Kutubxona" />
             <NavItem icon={<CheckSquare size={16} />} label="Vazifalar" />
             <NavItem icon={<Video size={16} />} label="Random Chat" href="/dashboard/chat" />
             
             <div className="pt-6 pb-2 px-3 text-[11px] font-medium text-[#8A8F98] uppercase tracking-wider">Saralanganlar</div>
             <NavItem icon={<FileText size={16} />} label="Imtihonga tayyorgarlik" />
             <NavItem icon={<FileText size={16} />} label="Dissertatsiya qoralamasi" />
         </div>

         {/* Sidebar Footer */}
         <div className="p-3 border-t border-white/10">
             <NavItem icon={<Settings size={16} />} label="Sozlamalar" />
             <div className="flex items-center gap-3 px-3 py-2.5 mt-2 cursor-pointer hover:bg-white/5 rounded-md transition-colors group">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#333] to-[#555] border border-white/10 flex items-center justify-center text-xs font-medium text-white shadow-inner">TH</div>
                 <div className="flex flex-col">
                   <span className="text-sm font-medium text-[#E8E8E8] group-hover:text-white">Talaba Hisobi</span>
                   <span className="text-[11px] text-[#8A8F98]">Online</span>
                 </div>
             </div>
         </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          
          {/* Top Bar - Common for all dashboard pages */}
          <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#08090A]/80 backdrop-blur-md sticky top-0 z-20">
             <div className="flex items-center gap-3">
               <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-[#8A8F98] hover:text-white">
                 <Menu size={20} />
               </button>
               <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <span className="hover:text-[#E8E8E8] transition-colors cursor-pointer">UniHub</span>
                  <span className="text-[#333]">\</span>
                  <span className="text-[#E8E8E8]">Boshqaruv</span>
               </div>
             </div>
             
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-2 py-1 bg-[#1C1D21] border border-white/10 rounded-md text-xs text-[#8A8F98]">
                    <Search size={14} />
                    <span className="hidden sm:inline">Qidirish...</span>
                    <span className="hidden sm:flex items-center justify-center w-5 h-5 bg-[#2C2D33] rounded-[3px] text-[10px]">/</span>
                 </div>
                 <div className="w-px h-4 bg-white/10 mx-1"></div>
                 <Bell size={18} className="text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
                 <MoreHorizontal size={18} className="text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
             </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
             {children}
          </div>

      </main>
    </div>
  );
}

function NavItem({ icon, label, active, href }) {
    const content = (
        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 group ${active ? 'bg-[#1C1D21] text-[#E8E8E8]' : 'hover:bg-white/5 text-[#8A8F98] hover:text-[#E8E8E8]'}`}>
            <span className={`${active ? 'text-[#5E6AD2]' : 'text-[#555] group-hover:text-[#8A8F98]'}`}>{icon}</span>
            <span className="text-[13px] font-medium">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shadow-[0_0_8px_rgba(94,106,210,0.6)]"></div>}
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
