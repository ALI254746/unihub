"use client";
import { 
  BookOpen, Calendar, CheckSquare, ChevronRight, 
  Settings, Layout, GraduationCap, Clock, 
  MoreHorizontal, Plus, Search, FileText,
  Bell, Command, User, LogOut, Menu
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div>
               <h1 className="text-3xl font-bold text-[#F7F8F8] tracking-tight mb-2">Xush kelibsiz, Tolib 👋</h1>
               <p className="text-[#8A8F98]">Bugungi rejalaringiz va o'zlashtirish ko'rsatkichlaringiz.</p>
           </div>
           <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1D21] hover:bg-[#25262B] text-[#E8E8E8] text-sm font-medium rounded-full border border-white/10 transition-all shadow-sm">
                   <Calendar size={16} />
                   <span>Jadvalni ko'rish</span>
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-[#5E6AD2] hover:bg-[#4E5AC0] text-white text-sm font-medium rounded-full shadow-[0_0_15px_rgba(94,106,210,0.3)] transition-all">
                   <Plus size={16} />
                   <span>Yangi Vazifa</span>
               </button>
           </div>
        </div>

        {/* Status Banner */}
        <div className="mb-10 group relative overflow-hidden bg-gradient-to-r from-[#17181C] to-[#0F1012] rounded-xl border border-white/5 p-1">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5E6AD2] to-transparent opacity-50"></div>
            <div className="relative flex items-center justify-between px-6 py-4 rounded-lg bg-[#0E0F11]/50 backdrop-blur-sm">
               <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#1C2C24] border border-[#263F32] flex items-center justify-center text-[#4CC38A]">
                       <CheckSquare size={20} />
                   </div>
                   <div>
                       <h3 className="text-sm font-semibold text-[#E8E8E8]">Tasdiqlangan Talaba Maqomi</h3>
                       <p className="text-xs text-[#8A8F98] mt-0.5">Siz barcha kampus imkoniyatlari va raqamli kutubxonadan to'liq foydalana olasiz.</p>
                   </div>
               </div>
               <ChevronRight size={16} className="text-[#8A8F98] group-hover:text-white transition-colors" />
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Schedule & Tasks) */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Today's Schedule Section */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-1">
                       <h2 className="text-base font-semibold text-[#E8E8E8] flex items-center gap-2">
                          <Clock size={16} className="text-[#5E6AD2]" /> 
                          Bugungi Darslar
                       </h2>
                       <span className="text-xs text-[#8A8F98] hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-white/5 transition-colors">To'liq jadval →</span>
                    </div>
                    <div className="space-y-1">
                        <ScheduleItem time="08:30" subject="Algoritmlar va Ma'lumotlar Tuzilmasi" room="B-204" type="Ma'ruza" status="current" />
                        <ScheduleItem time="10:00" subject="Tizimli Dizayn (System Design)" room="A-101" type="Seminar" status="upcoming" />
                        <ScheduleItem time="13:30" subject="Akademik Ingliz Tili" room="C-305" type="Amaliyot" status="upcoming" />
                    </div>
                </div>

                {/* Tasks Section */}
                <div>
                   <div className="flex items-center justify-between mb-4 px-1 mt-10">
                       <h2 className="text-base font-semibold text-[#E8E8E8] flex items-center gap-2">
                          <CheckSquare size={16} className="text-[#D25E5E]" /> 
                          Vazifalar
                       </h2>
                       <button className="text-xs flex items-center gap-1 text-[#8A8F98] hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors">
                           <Plus size={12} />
                           Yangi qo'shish
                       </button>
                    </div>
                    <div className="space-y-[2px]">
                        <div className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#555] uppercase tracking-wider">
                            <span>Vazifa nomi</span>
                            <div className="flex gap-12 pr-4">
                                <span className="hidden sm:block">Muddat</span>
                                <span>Ustuvorlik</span>
                            </div>
                        </div>
                        <TaskItem label="Labaratoriya ishi #4 ni topshirish" deadline="Bugun, 23:59" priority="High" />
                        <TaskItem label="React Hooks bo'limini o'qish" deadline="Ertaga" priority="Medium" />
                        <TaskItem label="Yakuniy imtihonlarga ro'yxatdan o'tish" deadline="3 kundan so'ng" priority="Urgent" />
                    </div>
                </div>

            </div>

            {/* Right Column (Academic Stats) */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#121316] rounded-xl border border-white/5 p-5">
                    <h2 className="text-sm font-semibold text-[#E8E8E8] mb-6 flex items-center justify-between">
                        O'zlashtirish
                        <MoreHorizontal size={16} className="text-[#555] cursor-pointer hover:text-white" />
                    </h2>
                    
                    <div className="space-y-6">
                        <StatRow label="Joriy GPA" value="4.6" max="5.0" trend="+0.2" />
                        <StatRow label="O'zlashtirish" value="92%" max="100%" trend="+5%" />
                        <StatRow label="Kreditlar" value="18" max="24" neutral />
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h3 className="text-xs font-medium text-[#8A8F98] mb-4 uppercase tracking-wider">So'nggi Baholar</h3>
                        <div className="space-y-3">
                            <GradeItem subject="Matematika" grade="4.5" color="blue" />
                            <GradeItem subject="Fizika" grade="3.8" color="yellow" />
                            <GradeItem subject="Java Dasturlash" grade="5.0" color="green" />
                        </div>
                        <button className="w-full mt-6 py-2 text-xs font-medium text-[#8A8F98] hover:text-white hover:bg-white/5 rounded transition-colors border border-dashed border-white/10 hover:border-white/20">
                            Transkriptni ko'rish
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

// ----------------------
// Subcomponents (Linear Style)
// ----------------------

function ScheduleItem({ time, subject, room, type, status }) {
    const isCurrent = status === 'current';
    return (
        <div className={`flex items-center group p-3 rounded-lg border transition-all duration-200 ${isCurrent ? 'bg-[#1C1D21] border-[#5E6AD2]/30 shadow-[0_4px_12px_rgba(0,0,0,0.2)]' : 'bg-[#121316] border-white/5 hover:border-white/10 hover:bg-[#1C1D21]'}`}>
            <div className={`flex flex-col items-center justify-center w-14 h-12 rounded-[4px] border ${isCurrent ? 'bg-[#5E6AD2]/10 border-[#5E6AD2]/30 text-[#5E6AD2]' : 'bg-[#1C1D21] border-white/10 text-[#8A8F98]'}`}>
                <span className="text-xs font-bold leading-none">{time}</span>
            </div>
            <div className="flex-1 ml-4">
                <span className={`text-[13px] font-medium block mb-0.5 ${isCurrent ? 'text-white' : 'text-[#E8E8E8]'}`}>{subject}</span>
                <div className="flex items-center gap-3 text-[11px] text-[#8A8F98]">
                    <span className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-green-500 animate-pulse' : 'bg-[#333]'}`}></span> {type}</span>
                    <span className="bg-white/5 px-1.5 rounded text-[#777]">{room}</span>
                </div>
            </div>
            {isCurrent && (
                <div className="px-2 py-1 bg-[#5E6AD2] text-white text-[10px] font-bold rounded shadow-[0_0_10px_rgba(94,106,210,0.4)]">
                    HOZIR
                </div>
            )}
        </div>
    );
}

function TaskItem({ label, deadline, priority }) {
    const priorityColors = {
        'High': 'text-orange-400',
        'Urgent': 'text-red-400',
        'Medium': 'text-blue-400'
    };

    return (
        <div className="flex items-center justify-between p-3 rounded-md hover:bg-[#1C1D21] border border-transparent hover:border-white/5 transition-all group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-[#333] rounded-[4px] flex items-center justify-center group-hover:border-[#555] transition-colors bg-[#0E0F11]"></div>
                <span className="text-[13px] text-[#E8E8E8] group-hover:text-white transition-colors line-clamp-1">{label}</span>
            </div>
            <div className="flex items-center gap-12 pr-4 text-[11px] font-medium">
                <span className="text-[#555] hidden sm:block">{deadline}</span>
                <span className={`${priorityColors[priority]} bg-white/5 px-2 py-0.5 rounded`}>{priority}</span>
            </div>
        </div>
    );
}

function StatRow({ label, value, max, trend, neutral }) {
    return (
        <div className="flex items-end justify-between">
            <div>
                <div className="text-[11px] font-medium text-[#8A8F98] uppercase tracking-wider mb-1">{label}</div>
                <div className="text-2xl font-light text-white font-mono flex items-baseline gap-1">
                    {value} <span className="text-sm text-[#555]">/ {max}</span>
                </div>
            </div>
            {!neutral && (
                <div className={`text-xs font-medium px-1.5 py-0.5 rounded bg-opacity-10 ${trend.startsWith('+') ? 'text-green-400 bg-green-500' : 'text-red-400 bg-red-500'}`}>
                    {trend}
                </div>
            )}
        </div>
    );
}

function GradeItem({ subject, grade, color }) {
    const colorMap = {
        'green': 'bg-green-500/10 text-green-400 border-green-500/20',
        'blue': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'yellow': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    };

    return (
        <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-[#E8E8E8]">{subject}</span>
            </div>
            <span className={`text-xs font-mono font-medium px-1.5 py-0.5 rounded border ${colorMap[color]}`}>{grade}</span>
        </div>
    );
}
