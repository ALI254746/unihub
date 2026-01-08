"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Shield, ChevronRight, ScanLine, X, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    faculty: "",
    course: "",
    email: "",
    password: ""
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Tarmoqda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const startScan = () => {
    setShowScanner(true);
    setScanning(true);
    
    // Simulate scanning
    setTimeout(() => {
      setScanning(false);
      setForm(prev => ({
        ...prev,
        firstName: "Tolib",
        lastName: "Eshpo'latov",
        faculty: "Kompyuter Injiniringi",
        course: "3-kurs",
        email: "tolib@student.uz"
      }));
      setShowScanner(false);
      toast.success("Talaba ma'lumotlari yuklandi!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans selection:bg-[#5E6AD2] selection:text-white flex flex-col relative overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#5E6AD2]/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#4285F4]/5 blur-[100px] rounded-full mix-blend-screen" />
            <div className="stars-bg absolute inset-0 opacity-20" />
        </div>

        {/* Header */}
        <header className="absolute top-0 w-full p-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#8F9AF8] flex items-center justify-center shadow-[0_0_15px_rgba(94,106,210,0.5)]">
                    <span className="font-serif font-bold text-white">U</span>
                </div>
                <span className="font-medium text-lg tracking-tight">UniHub</span>
            </div>
            <Link href="/login" className="text-sm text-[#8A8F98] hover:text-[#F7F8F8] transition-colors">
                Tizimga kirish
            </Link>
        </header>

        <ToastContainer theme="dark" position="top-center" />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 z-10">
            <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-12 items-center">
                
                {/* Left Side - Visuals */}
                <div className="hidden md:flex flex-col gap-6">
                     <div className="relative group perspective-container">
                        <div className="tilted-card relative w-full aspect-[4/3] bg-[#0E0F11] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                             <div className="absolute inset-0 bg-gradient-to-br from-[#5E6AD2]/20 to-transparent opacity-50 z-10" />
                             <Image 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop"
                                alt="Students"
                                fill
                                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                             />
                             
                             {/* Floating Card */}
                             <div className="absolute bottom-6 left-6 right-6 bg-[#08090A]/80 backdrop-blur-md border border-white/10 p-4 rounded-lg z-20 transform group-hover:translate-y-[-5px] transition-transform">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#1C2C24] flex items-center justify-center text-[#4CC38A] border border-[#263F32]">
                                        <Shield size={14} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#8A8F98] uppercase tracking-wider font-semibold">Himoyalangan Tizim</div>
                                        <div className="text-sm font-medium">Talabalar uchun maxsus</div>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#4CC38A] w-[80%] rounded-full animate-pulse" />
                                </div>
                             </div>
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                         <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                             Universitet hayotingizni <br/> raqamlashtiring.
                         </h2>
                         <p className="text-[#8A8F98] text-sm leading-relaxed max-w-sm">
                             Dars jadvali, baholar, kutubxona va kampus yangiliklari — barchasi yagona professional platformada.
                         </p>
                     </div>
                </div>

                {/* Right Side - Form */}
                <div className="relative">
                     <div className="bg-[#0E0F11]/50 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                         
                         <div className="mb-8 text-center">
                             <h1 className="text-2xl font-semibold mb-2">Talaba sifatida ro'yxatdan o'tish</h1>
                             <p className="text-sm text-[#8A8F98]">Ma'lumotlaringizni kiriting yoki ID kartangizni skanerlang.</p>
                         </div>

                         {/* Quick Action - Scan */}
                         <button 
                            onClick={startScan}
                            className="w-full mb-8 flex items-center justify-center gap-3 py-3 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/30 hover:bg-[#5E6AD2]/20 hover:border-[#5E6AD2]/50 text-[#5E6AD2] hover:text-[#7A85E6] transition-all group"
                         >
                            <ScanLine size={18} />
                            <span className="text-sm font-medium">ID Kartani Skanerlash</span>
                            <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                         </button>

                         <div className="relative flex items-center gap-4 mb-8">
                             <div className="h-px bg-white/5 flex-1" />
                             <span className="text-[10px] text-[#555] font-medium uppercase tracking-widest">Yoki</span>
                             <div className="h-px bg-white/5 flex-1" />
                         </div>

                         <form onSubmit={handleSubmit} className="space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                 <InputGroup 
                                    name="firstName" 
                                    placeholder="Ism" 
                                    value={form.firstName} 
                                    onChange={handleFormChange} 
                                 />
                                 <InputGroup 
                                    name="lastName" 
                                    placeholder="Familiya" 
                                    value={form.lastName} 
                                    onChange={handleFormChange} 
                                 />
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <SelectGroup 
                                     name="faculty"
                                     value={form.faculty}
                                     onChange={handleFormChange}
                                     options={["Axborot Texnologiyalari", "Kiberxavfsizlik", "Sun'iy Intellekt"]}
                                     placeholder="Yo'nalish"
                                 />
                                 <SelectGroup 
                                     name="course"
                                     value={form.course}
                                     onChange={handleFormChange}
                                     options={["1-kurs", "2-kurs", "3-kurs", "4-kurs"]}
                                     placeholder="Kurs"
                                 />
                             </div>

                             <InputGroup 
                                type="email"
                                name="email" 
                                placeholder="Student Email" 
                                value={form.email} 
                                onChange={handleFormChange} 
                             />

                             <InputGroup 
                                type="password"
                                name="password" 
                                placeholder="Parol yarating" 
                                value={form.password} 
                                onChange={handleFormChange} 
                             />

                             <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-2 bg-[#F7F8F8] hover:bg-white text-black font-medium py-2.5 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                             >
                                 {loading && <Loader2 size={16} className="animate-spin" />}
                                 {loading ? "Yaratilmoqda..." : "Hisob yaratish"}
                                 {!loading && <ArrowRight size={16} />}
                             </button>
                         </form>
                     </div>
                </div>

            </div>
        </div>

        {/* Scanner Modal overlay */}
        {showScanner && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-[#0E0F11] border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <button 
                        onClick={() => setShowScanner(false)}
                        className="absolute top-4 right-4 text-[#8A8F98] hover:text-white"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-medium text-white">ID Kartani Skanerlash</h3>
                        <p className="text-sm text-[#8A8F98]">Kamerani talabalik guvohnomangizdagi QR kodga qarating.</p>
                    </div>

                    <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-white/10 mb-6 group">
                        {/* Fake Camera Feed */}
                        <Image 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop"
                            alt="Camera Feed"
                            fill
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-2 border-[#5E6AD2] rounded-lg relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#5E6AD2] shadow-[0_0_15px_#5E6AD2] animate-[scan_2s_ease-in-out_infinite]" />
                                {/* Corner markers */}
                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#5E6AD2]" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#5E6AD2]" />
                                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#5E6AD2]" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#5E6AD2]" />
                            </div>
                        </div>
                        {scanning && (
                             <div className="absolute bottom-4 left-0 right-0 text-center text-xs font-mono text-[#5E6AD2] animate-pulse">
                                 AI QIDIRMOQDA...
                             </div>
                        )}
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

function InputGroup({ ...props }) {
    return (
        <input 
            {...props}
            className="w-full bg-[#16181D] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#5E6AD2]/50 focus:bg-[#1C1D23] transition-all"
        />
    );
}

function SelectGroup({ options, placeholder, ...props }) {
    return (
        <div className="relative">
            <select 
                {...props}
                className="w-full appearance-none bg-[#16181D] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5E6AD2]/50 focus:bg-[#1C1D23] transition-all text-opacity-90"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#1C1D23]">{opt}</option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                <ChevronRight size={14} className="rotate-90" />
            </div>
        </div>
    );
}
