"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { Scan, AlertCircle, Check, Loader2, Link as LinkIcon, Shield, Command } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const router = useRouter();
  
  const [hemisId, setHemisId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const fileInputRef = useRef(null);

  const [debugLogs, setDebugLogs] = useState([]);
  
  const addLog = (msg) => {
    console.log(msg);
    setDebugLogs(prev => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev].slice(0, 5));
  };

  useEffect(() => {
    let scanner;

    if (showScanner) {
      addLog("Initializing Scanner...");
      setTimeout(() => {
          if (!document.getElementById("reader")) {
              addLog("Error: 'reader' element not found");
              return;
          }

          try {
            // Using the pre-built scanner component which tends to be more robust
            scanner = new Html5QrcodeScanner(
                "reader",
                { 
                    fps: 10, 
                    qrbox: 250,
                    // aspectRatio removed for better compatibility
                    showTorchButtonIfSupported: true,
                },
                false
            );

            scanner.render(
                (decodedText) => {
                    // Success callback
                    setHemisId(decodedText);
                    setShowScanner(false);
                    verifyStudent(decodedText);
                    scanner.clear().catch(e => console.log("Clear error", e));
                },
                (errorMessage) => {
                    // Scan error callback (ignore)
                }
            );

            addLog("Scanner Initialized (Standard Mode)");
          } catch (e) {
              addLog(`Init Error: ${e.message}`);
              setError("Skanerni ishga tushirishda xatolik.");
          }
      }, 500);
    }

    return () => {
      if (scanner) {
         try {
            scanner.clear();
         } catch (e) {
             // ignore clear errors during unmount
         }
      }
    };
  }, [showScanner]);

  const verifyStudent = async (url) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/users/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, hemisUrl: url }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessData(data.user);
        // Save ID immediately to local storage
        if (data.user && data.user._id) {
            localStorage.setItem("user_id", data.user._id);
        }
        setTimeout(() => router.push(`/dashboard?uid=${data.user._id}`), 3000);
      } else {
        setError(data.message || "Tasdiqlashda xatolik yuz berdi");
      }
    } catch (err) {
      setError("Tarmoq xatoligi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader-file-hidden");
    html5QrCode.scanFile(file, true)
      .then(decodedText => {
         setHemisId(decodedText);
         verifyStudent(decodedText);
      })
      .catch(err => {
         setError("QR kod o'qilmadi. Aniqroq rasm yuklab ko'ring.");
      });
  };

  // SUCCESS STATE
  if (successData) {
     return (
        <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans flex items-center justify-center p-6 relative overflow-hidden">
             <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#28C840]/20 via-[#28C840]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

             <div className="max-w-md w-full text-center space-y-8 relative z-10">
                 <div className="w-20 h-20 bg-[#28C840]/10 text-[#28C840] rounded-full flex items-center justify-center mx-auto border border-[#28C840]/20 shadow-[0_0_30px_-5px_rgba(40,200,64,0.3)] animate-scale-in">
                    <Check size={40} strokeWidth={3} />
                 </div>
                 
                 <div>
                   <h1 className="text-3xl font-medium tracking-tight mb-2">Tasdiqlandi!</h1>
                   <p className="text-[#8A8F98]">Sizning talabalik maqomingiz muvaffaqiyatli tasdiqlandi.</p>
                 </div>
                 
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-4 backdrop-blur-sm">
                     <div>
                         <span className="text-xs text-[#8A8F98] uppercase tracking-wider font-medium">F.I.SH</span>
                         <p className="text-lg font-medium text-white border-b border-white/5 pb-2 mt-1">{successData.fullName}</p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <span className="text-xs text-[#8A8F98] uppercase tracking-wider font-medium">Fakultet</span>
                             <p className="text-base text-white mt-1">{successData.studentData?.faculty || "Noma'lum"}</p>
                         </div>
                         <div>
                             <span className="text-xs text-[#8A8F98] uppercase tracking-wider font-medium">Guruh</span>
                             <p className="text-base font-mono mt-1 bg-white/10 px-2 py-0.5 rounded inline-block text-[#5E6AD2]">{successData.studentData?.group || "---"}</p>
                         </div>
                     </div>
                 </div>

                 <div className="flex items-center justify-center gap-2 text-sm text-[#8A8F98] animate-pulse">
                   <Loader2 size={16} className="animate-spin" />
                   <span>Ishchi stolga yo'naltirilmoqda...</span>
                 </div>
             </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans flex relative overflow-hidden">
      
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/10 via-[#5E6AD2]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
           <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg text-white flex items-center justify-center">
             <Command size={18} />
           </div>
           <span className="font-medium text-sm tracking-tight group-hover:text-white/80 transition-colors">Talaba +</span>
        </Link>
      </div>

      {/* LEFT SIDE - VISUAL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 border-r border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5E6AD2]/5 via-transparent to-transparent opacity-50" />
          
          <div className="max-w-md space-y-8 relative z-10">
              <div className="relative w-full aspect-square bg-[#0E0F11] rounded-3xl border border-white/10 p-8 flex items-center justify-center shadow-2xl overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#5E6AD2]/10 to-transparent opacity-50" />
                 <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 border-2 border-dashed border-[#5E6AD2]/30 rounded-xl animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-4 border-2 border-[#5E6AD2]/20 rounded-xl animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Scan size={64} className="text-[#5E6AD2]" />
                    </div>
                    <div className="absolute -top-4 -right-4 bg-[#28C840] text-black p-2 rounded-lg shadow-lg animate-bounce delay-100">
                      <Check size={20} />
                    </div>
                 </div>
              </div>
              
              <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-3xl font-medium text-white leading-tight">
                     Talabalik maqomini <br/> <span className="text-[#5E6AD2]">tasdiqlash</span>
                  </h2>
                  <p className="text-[#8A8F98] text-lg leading-relaxed">
                     Universitet ma'lumotlaringizni HEMIS tizimi orqali integratsiya qiling va platformaning barcha imkoniyatlaridan foydalaning.
                  </p>
              </div>
          </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
         <div className="w-full max-w-sm space-y-8">
            
            <div className="space-y-2 text-center lg:text-left">
               <h1 className="text-3xl font-bold tracking-tight text-white">Verifikatsiya</h1>
               <p className="text-[#8A8F98]">HEMIS ID yoki QR kod orqali tasdiqlang.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-center gap-3">
                   <AlertCircle size={18} className="shrink-0 text-red-500" />
                   {error}
                </div>
            )}

            <div className="space-y-6">
                
                {/* Scanner Section */}
                <div className="bg-[#0E0F11] border border-white/10 rounded-2xl overflow-hidden p-1.5 shadow-lg relative">
                   <div id="reader-file-hidden" className="hidden"></div>
                   
                   {showScanner ? (
                       <div className="relative aspect-square bg-black rounded-xl overflow-hidden">
                           <div id="reader" className="w-full h-full [&_video]:object-cover"></div>
                           <button 
                             onClick={() => setShowScanner(false)}
                             className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-black/70 transition-colors border border-white/10 z-10"
                           >
                             Yopish
                           </button>
                           {/* Overlay */}
                           <div className="absolute inset-0 border-[30px] border-black/30 pointer-events-none z-0"></div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-[#5E6AD2] rounded-lg shadow-[0_0_20px_rgba(94,106,210,0.5)] pointer-events-none animate-pulse z-0"></div>
                       </div>
                   ) : (
                       <div className="aspect-[4/3] flex flex-col items-center justify-center gap-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed rounded-xl border border-dashed border-white/10 hover:bg-white/5 transition-all">
                           <button 
                             onClick={() => setShowScanner(true)}
                             className="flex flex-col items-center gap-3 group"
                           >
                              <div className="w-16 h-16 rounded-full bg-[#5E6AD2]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#5E6AD2]/20">
                                  <Scan size={32} className="text-[#5E6AD2]" strokeWidth={2} />
                              </div>
                              <div className="text-center">
                                  <span className="block text-sm font-medium text-white group-hover:text-[#5E6AD2] transition-colors">Kamerani ochish</span>
                              </div>
                           </button>
                           
                           <div className="flex items-center gap-2 w-full px-8">
                              <div className="h-px bg-white/10 flex-1"></div>
                              <span className="text-[10px] text-[#8A8F98] uppercase">Yoki</span>
                              <div className="h-px bg-white/10 flex-1"></div>
                           </div>

                           <button 
                             onClick={() => fileInputRef.current?.click()}
                             className="text-xs text-[#8A8F98] hover:text-white transition-colors flex items-center gap-2"
                           >
                             <LinkIcon size={12} />
                             <span>Rasm yuklash</span>
                           </button>
                           <input 
                             type="file" 
                             ref={fileInputRef} 
                             onChange={handleFileUpload} 
                             accept="image/*" 
                             className="hidden" 
                           />
                       </div>
                   )}
                </div>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-[#8A8F98] text-xs uppercase tracking-widest font-medium">Yoki ID kiriting</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1 group">
                       <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8F98] group-focus-within:text-[#5E6AD2] transition-colors" />
                       <input 
                           type="text" 
                           value={hemisId}
                           onChange={(e) => setHemisId(e.target.value)}
                           placeholder="HEMIS ID / URL"
                           className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-white placeholder-[#8A8F98] focus:outline-none focus:border-[#5E6AD2]/50 focus:bg-white/10 transition-all text-sm font-medium"
                       />
                    </div>
                    <button 
                        onClick={() => verifyStudent(hemisId)}
                        disabled={loading || !hemisId}
                        className="bg-[#F7F8F8] text-[#08090A] h-12 px-6 rounded-xl hover:bg-white hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#F7F8F8] font-medium transition-all flex items-center justify-center min-w-[100px] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Tasdiqlash"}
                    </button>
                </div>

            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#8A8F98]">
                <Shield size={14} className="text-[#5E6AD2]" />
                <span>Ma'lumotlaringiz xavfsizligi kafolatlangan.</span>
            </div>

            {/* DEBUG LOGS */}
            <div className="mt-4 p-2 bg-black/50 rounded text-[10px] font-mono text-red-400 max-h-32 overflow-y-auto">
                {debugLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}
            </div>

         </div>
      </div>
    </div>
  );
}
