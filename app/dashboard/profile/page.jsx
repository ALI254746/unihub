"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe, 
  Layers, 
  Users as UsersIcon, 
  Briefcase,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Fingerprint,
  Camera,
  X,
  Download,
  Upload,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProfileSkeleton from "./skeleton";

export default function StudentProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  
  // Timeline Edit State
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [timelineForm, setTimelineForm] = useState({
      role: "", company: "", date: "", description: "", link: "", tags: ""
  });
  const [editingTimelineId, setEditingTimelineId] = useState(null); // null = creating new
  const [timelineSaving, setTimelineSaving] = useState(false);

  const [error, setError] = useState(null);
  
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get("uid");
  const fileInputRef = useRef(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    if (urlUserId) {
        localStorage.setItem("user_id", urlUserId);
    }
  }, [urlUserId]);

  const handleEditClick = () => {
    setEditForm({
        bio: user.bio || "",
        location: user.location || "",
        skills: user.skills ? user.skills.join(", ") : "",
        linkedin: user.socials?.linkedin || "",
        github: user.socials?.github || "",
        website: user.socials?.website || ""
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
        const userId = urlUserId || localStorage.getItem("user_id");
        if (!userId) throw new Error("User ID not found");

        const payload = {
            bio: editForm.bio,
            location: editForm.location,
            skills: editForm.skills.split(",").map(s => s.trim()).filter(Boolean),
            socials: {
                linkedin: editForm.linkedin,
                github: editForm.github,
                website: editForm.website
            }
        };

        const res = await fetch(`http://localhost:4000/users/${userId}/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success && data.user) {
            setUser(prev => ({
                ...prev,
                bio: payload.bio,
                location: payload.location,
                skills: payload.skills,
                socials: payload.socials
            }));
            setIsEditing(false);
        } else {
            alert("Xatolik: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Saqlashda xatolik yuz berdi");
    } finally {
        setSaving(false);
    }
  };

  // --- TIMELINE HANDLERS ---

  const handleAddTimeline = () => {
      setTimelineForm({ role: "", company: "", date: "", description: "", link: "", tags: "" });
      setEditingTimelineId(null);
      setIsTimelineModalOpen(true);
  };

  const handleEditTimeline = (item) => {
      setTimelineForm({
          role: item.role,
          company: item.company,
          date: item.date,
          description: item.description,
          link: item.link || "",
          tags: item.tags ? item.tags.join(", ") : ""
      });
      setEditingTimelineId(item.id);
      setIsTimelineModalOpen(true);
  };

  const handleDeleteTimeline = async (itemId) => {
      if (!confirm("Are you sure you want to delete this item?")) return;
      
      const userId = urlUserId || localStorage.getItem("user_id");
      const updatedTimeline = user.timeline.filter(t => t.id !== itemId);
      
      // Optimistic update
      const previousTimeline = user.timeline;
      setUser(prev => ({ ...prev, timeline: updatedTimeline }));

      try {
           const res = await fetch(`http://localhost:4000/users/${userId}/profile`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ timeline: updatedTimeline })
          });
          if (!res.ok) throw new Error("Failed to delete");
      } catch (err) {
          alert("O'chirishda xatolik");
          setUser(prev => ({ ...prev, timeline: previousTimeline }));
      }
  };

  const handleSaveTimeline = async (e) => {
      e.preventDefault();
      setTimelineSaving(true);
      
      try {
          const userId = urlUserId || localStorage.getItem("user_id");
          let updatedTimeline = [...(user.timeline || [])];
          
          const newItem = {
              id: editingTimelineId || Date.now().toString(), // Generate ID if new
              role: timelineForm.role,
              company: timelineForm.company,
              date: timelineForm.date,
              description: timelineForm.description,
              link: timelineForm.link,
              tags: timelineForm.tags.split(",").map(s => s.trim()).filter(Boolean)
          };

          if (editingTimelineId) {
              updatedTimeline = updatedTimeline.map(t => t.id === editingTimelineId ? newItem : t);
          } else {
              updatedTimeline.push(newItem);
          }

          const res = await fetch(`http://localhost:4000/users/${userId}/profile`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ timeline: updatedTimeline })
          });
          
          const data = await res.json();
          if (data.success) {
              setUser(prev => ({ ...prev, timeline: updatedTimeline }));
              setIsTimelineModalOpen(false);
          } else {
              alert("Xatolik: " + data.message);
          }
      } catch (err) {
          console.error(err);
          alert("Saqlashda xatolik");
      } finally {
          setTimelineSaving(false);
      }
  };
  
  // -------------------------

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUser(prev => ({ ...prev, avatarUrl: objectUrl }));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
        const userId = urlUserId || localStorage.getItem("user_id");
        if (!userId) throw new Error("User ID not found");

        const res = await fetch(`http://localhost:4000/users/${userId}/avatar`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (data.success && data.user) {
            setUser(prev => ({ ...prev, avatarUrl: data.user.avatarUrl }));
        }
    } catch (error) {
        console.error("Upload error:", error);
    } finally {
        setUploading(false);
    }
  };

  const handleCVClick = () => {
    if (user.cvUrl) {
        window.open(user.cvUrl, '_blank');
    } else {
        cvInputRef.current?.click();
    }
  };

  const handleCVUploadClick = (e) => {
      e.stopPropagation();
      cvInputRef.current?.click();
  }

  const handleCVChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCvUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const userId = urlUserId || localStorage.getItem("user_id");
        if (!userId) throw new Error("User ID not found");

        const res = await fetch(`http://localhost:4000/users/${userId}/cv`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (data.success && data.cvUrl) {
            setUser(prev => ({ ...prev, cvUrl: data.cvUrl }));
            alert("CV muvaffaqiyatli yuklandi!");
        }
    } catch (error) {
        console.error("CV Upload error:", error);
    } finally {
        setCvUploading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
        const targetUserId = urlUserId || localStorage.getItem("user_id");
        
        if (!targetUserId) {
             setUser({
                fullName: "Demo Student",
                email: "demo@example.com",
                avatarUrl: "https://github.com/shadcn.png",
                isVerifiedStudent: true,
                universityName: "Toshkent Axborot Texnologiyalari Universiteti",
                studentHemisId: "380221100000",
                studentData: {
                    level: "3-kurs",
                    group: "912-21",
                    degree: "Bakalavr",
                    paymentForm: "Davlat granti"
                },
                bio: "Bu demo profil.",
                location: "Toshkent",
                skills: ["Demo", "React"],
                socials: {},
                stats: { projects: 0, followers: 0 },
                timeline: []
            });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/users/${targetUserId}`);
            if (!res.ok) throw new Error("API Error");
            const data = await res.json();
            if (data.success && data.user) {
                setUser(data.user);
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchUserData();
  }, [urlUserId]);

  if (loading) return <ProfileSkeleton />;

  if (error) return (
    <div className="min-h-screen bg-[#08090A] text-red-500 flex flex-col items-center justify-center gap-4">
        <h1>Xatolik yuz berdi</h1>
        <p className="opacity-70">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Qayta yuklash</button>
    </div>
  );

  if (!user) return <div className="min-h-screen bg-[#08090A] text-white flex items-center justify-center">Foydalanuvchi topilmadi</div>;

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans selection:bg-[#5E6AD2]/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
         {/* BENTO GRID */}
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
             
             {/* 1. Profile Info */}
             <div className="md:col-span-2 md:row-span-2 bg-[#0E0F11] border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
                 <div className="absolute top-0 right-0 p-32 bg-[#5E6AD2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#5E6AD2]/20 transition-all duration-700" />
                 <div className="relative z-10">
                     <div className="flex items-start justify-between mb-6">
                         <div className="relative group/avatar">
                             <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-[#5E6AD2] to-[#8F9AF8] shadow-[0_0_30px_rgba(94,106,210,0.3)]">
                                 <div className="w-full h-full rounded-full overflow-hidden relative cursor-pointer bg-black" onClick={handleAvatarClick}>
                                     <Image 
                                       src={user.avatarUrl || "https://github.com/shadcn.png"} 
                                       alt="Avatar" 
                                       width={128} 
                                       height={128}
                                       className={`object-cover w-full h-full transition-all duration-500 ${uploading ? 'opacity-50 blur-sm scale-100' : 'group-hover/avatar:scale-110'}`}
                                     />
                                     {uploading && (
                                         <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="w-8 h-8 border-2 border-white/80 border-t-white/20 rounded-full animate-spin"></div>
                                         </div>
                                     )}
                                     {!uploading && (
                                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20">
                                             <Camera size={24} className="text-white" />
                                         </div>
                                     )}
                                 </div>
                             </div>
                             <div className="absolute -bottom-2 -right-2 bg-[#0E0F11] border border-white/10 p-2 rounded-full shadow-lg z-30">
                                 {user.isVerifiedStudent ? (
                                    <div className="text-[#28C840]"><CheckCircle2 size={16} strokeWidth={3} /></div>
                                 ) : <div className="w-3 h-3 bg-gray-500 rounded-full" />}
                             </div>
                             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                         </div>
                         <button onClick={handleEditClick} className="px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-xs font-medium transition-colors">Edit Profile</button>
                     </div>
                     <h1 className="text-2xl font-bold text-white mb-2">{user.fullName}</h1>
                     <p className="text-[#5E6AD2] font-medium mb-4 flex items-center gap-2"><Code2 size={16} /> @student_dev</p>
                     <p className="text-[#8A8F98] leading-relaxed text-sm">{user.bio}</p>
                 </div>
                 <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-[#8A8F98]"><MapPin size={14} className="text-[#5E6AD2]" />{user.location}</div>
                    {user.socials?.github && <a href={user.socials.github} target="_blank" className="p-2 bg-white/5 rounded-lg text-[#8A8F98] hover:text-white"><Github size={16} /></a>}
                    {user.socials?.linkedin && <a href={user.socials.linkedin} target="_blank" className="p-2 bg-white/5 rounded-lg text-[#8A8F98] hover:text-white"><Linkedin size={16} /></a>}
                    {user.socials?.website && <a href={user.socials.website} target="_blank" className="p-2 bg-white/5 rounded-lg text-[#8A8F98] hover:text-white"><Globe size={16} /></a>}
                 </div>
             </div>

             {/* 2. ID Card */}
             <div className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-[#1a1c22] to-[#0E0F11] border border-white/10 rounded-3xl p-1 relative overflow-hidden flex flex-col">
                 <div className="bg-[#5E6AD2]/20 h-1.5 w-full absolute top-0 left-0" />
                 <div className="flex-1 p-5 flex flex-col">
                     <div className="flex items-center justify-between mb-6">
                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10"><Building2 size={20} className="text-white" /></div>
                         <Fingerprint size={24} className="text-white/20" />
                     </div>
                     <div className="flex-1 space-y-4">
                         <div><span className="text-[9px] text-[#8A8F98] uppercase tracking-wider block mb-1">Student ID</span><span className="font-mono text-lg text-white tracking-widest">{user.studentHemisId}</span></div>
                         <div><span className="text-[9px] text-[#8A8F98] uppercase tracking-wider block mb-1">University</span><span className="text-sm text-white font-medium leading-tight block">{user.universityName}</span></div>
                         <div className="grid grid-cols-2 gap-2 pt-2">
                             <div className="bg-white/5 p-2 rounded-lg"><span className="text-[9px] text-[#8A8F98] block mb-0.5">Level</span><span className="text-xs text-white">{user.studentData?.level}</span></div>
                             <div className="bg-white/5 p-2 rounded-lg"><span className="text-[9px] text-[#8A8F98] block mb-0.5">Group</span><span className="text-xs text-[#5E6AD2] font-bold">{user.studentData?.group}</span></div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* 3. Stats & Skills & Degree */}
             <div className="bg-[#0E0F11] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center hover:bg-white/5 transition-colors group">
                 <Layers size={20} className="text-blue-500 mb-2" />
                 <span className="text-2xl font-bold text-white">{user.stats?.projects || 0}</span>
                 <span className="text-xs text-[#8A8F98]">Projects</span>
             </div>
             <div className="bg-[#0E0F11] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center hover:bg-white/5 transition-colors group">
                 <UsersIcon size={20} className="text-purple-500 mb-2" />
                 <span className="text-2xl font-bold text-white">{user.stats?.followers || 0}</span>
                 <span className="text-xs text-[#8A8F98]">Followers</span>
             </div>
             
             <div className="md:col-span-2 bg-[#0E0F11] border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-4"><Cpu size={18} className="text-[#5E6AD2]" /><h3 className="text-sm font-bold text-white">Tech Stack</h3></div>
                 <div className="flex flex-wrap gap-2">
                     {user.skills?.map((skill, index) => <span key={index} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-xs text-[#8A8F98]">{skill}</span>)}
                 </div>
             </div>

             <div className="md:col-span-1 bg-[#1A1C1E] border border-white/10 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden">
                 <GraduationCap className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-[-15deg]" />
                 <span className="text-xs text-[#8A8F98] uppercase tracking-wider mb-2">Degree</span>
                 <h3 className="text-xl font-bold text-white mb-1">{user.studentData?.degree || "Bachelor"}</h3>
                 <p className="text-xs text-[#5E6AD2]">{user.studentData?.paymentForm}</p>
             </div>
             
             {/* CV / RESUME BLOCK */}
             <div onClick={handleCVClick} className="md:col-span-1 bg-[#5E6AD2] rounded-3xl p-6 flex flex-col justify-between items-start hover:bg-[#4b56b2] transition-colors cursor-pointer text-white relative group">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                     {cvUploading ? <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"/> : <Briefcase size={20} />}
                 </div>
                 <div>
                     <h3 className="font-bold text-lg leading-tight mb-1">
                         {user.cvUrl ? "Download CV" : "Upload CV"}
                     </h3>
                     <p className="text-xs opacity-80 flex items-center gap-1">
                         {user.cvUrl ? "PDF Resume" : "Open for Work"} 
                         {user.cvUrl ? <Download size={12} /> : <Upload size={12} />}
                     </p>
                 </div>
                 {user.cvUrl && (
                    <button onClick={handleCVUploadClick} title="Upload New CV" className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
                        <Upload size={14} className="text-white"/>
                    </button>
                 )}
                 <input type="file" ref={cvInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleCVChange} />
             </div>
         </div>

         {/* TIMELINE */}
         <div className="max-w-4xl mx-auto pt-8">
             <div className="flex items-center gap-4 mb-8">
                 <div className="h-px bg-white/10 flex-1" />
                 <h2 className="text-lg font-bold text-white flex items-center gap-2"><Terminal size={20} className="text-[#5E6AD2]" />Experience & Projects</h2>
                 <button onClick={handleAddTimeline} className="p-2 bg-white/5 hover:bg-[#5E6AD2]/20 hover:text-[#5E6AD2] rounded-lg transition-colors ml-4">
                     <Plus size={20} />
                 </button>
                 <div className="h-px bg-white/10 flex-1" />
             </div>
             <div className="space-y-6">
                {user.timeline?.map((item) => (
                    <div key={item.id} className="group flex flex-col md:flex-row gap-6 md:gap-10 hover:bg-white/5 p-4 rounded-2xl transition-colors border border-transparent hover:border-white/5 relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditTimeline(item)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white">
                                <Pencil size={14} />
                            </button>
                            <button onClick={() => handleDeleteTimeline(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        
                        <div className="md:w-32 md:text-right shrink-0"><span className="text-xs font-mono text-[#8A8F98] py-1 px-2 border border-white/10 rounded-lg inline-block">{item.date}</span></div>
                        <div className="flex-1 pb-4 border-b border-white/5 group-last:border-0 group-hover:border-transparent">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-base font-bold text-white group-hover:text-[#5E6AD2] transition-colors">{item.role}</h3>
                                    <p className="text-sm text-[#8A8F98]">{item.company}</p>
                                </div>
                                {item.link && (
                                    <a href={item.link} target="_blank" className="p-2 text-[#8A8F98] hover:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 mr-12">
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                            <p className="text-sm text-[#F7F8F8]/80 leading-relaxed mb-4">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags?.map((tag, t) => (
                                    <span key={t} className="text-[10px] bg-[#5E6AD2]/10 text-[#5E6AD2] px-2 py-0.5 rounded font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                
                {(!user.timeline || user.timeline.length === 0) && (
                    <div className="text-center py-12 text-[#8A8F98] text-sm italic">
                        No experience or projects added yet. Click + to add.
                    </div>
                )}
            </div>
         </div>
         
         {/* EDIT PROFILE MODAL */}
         {isEditing && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                 <div className="bg-[#1C1D21] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                     <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#1C1D21] z-10">
                         <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                         <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-[#8A8F98]" /></button>
                     </div>
                     <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                         {/* ... Fields ... */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="text-xs text-[#8A8F98] uppercase font-bold mb-2 block">Full Name</label><input type="text" value={user.fullName} readOnly disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[#8A8F98] cursor-not-allowed" /></div>
                             <div><label className="text-xs text-[#8A8F98] uppercase font-bold mb-2 block">University</label><input type="text" value={user.universityName} readOnly disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[#8A8F98] cursor-not-allowed" /></div>
                         </div>
                         <div><label className="text-xs text-white uppercase font-bold mb-2 block">Bio</label><textarea value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none h-24 resize-none" /></div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="text-xs text-white uppercase font-bold mb-2 block">Location</label><input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" /></div>
                             <div><label className="text-xs text-white uppercase font-bold mb-2 block">Skills</label><input type="text" value={editForm.skills} onChange={e => setEditForm({...editForm, skills: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" /></div>
                         </div>
                         <div className="space-y-4 pt-4 border-t border-white/5">
                             <h3 className="text-sm font-bold text-white">Social Links</h3>
                             <div className="flex items-center gap-3"><Github size={18} className="text-[#8A8F98]" /><input type="text" value={editForm.github} onChange={e => setEditForm({...editForm, github: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-2 text-white text-sm" placeholder="GitHub URL" /></div>
                             <div className="flex items-center gap-3"><Linkedin size={18} className="text-[#0077b5]" /><input type="text" value={editForm.linkedin} onChange={e => setEditForm({...editForm, linkedin: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-2 text-white text-sm" placeholder="LinkedIn URL" /></div>
                             <div className="flex items-center gap-3"><Globe size={18} className="text-pink-500" /><input type="text" value={editForm.website} onChange={e => setEditForm({...editForm, website: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-2 text-white text-sm" placeholder="Website URL" /></div>
                         </div>
                         <div className="flex justify-end gap-3 pt-6">
                             <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5">Cancel</button>
                             <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#5E6AD2] text-white hover:bg-[#4b56b2] shadow-lg shadow-[#5E6AD2]/25 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
                         </div>
                     </form>
                 </div>
             </div>
         )}

         {/* TIMELINE MODAL */}
         {isTimelineModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                 <div className="bg-[#1C1D21] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
                     <div className="p-6 border-b border-white/10 flex items-center justify-between">
                         <h2 className="text-xl font-bold text-white">{editingTimelineId ? "Edit Experience" : "Add Experience"}</h2>
                         <button onClick={() => setIsTimelineModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-[#8A8F98]" /></button>
                     </div>
                     <form onSubmit={handleSaveTimeline} className="p-6 space-y-4">
                         <div>
                             <label className="text-xs text-white uppercase font-bold mb-2 block">Role / Job Title</label>
                             <input required type="text" value={timelineForm.role} onChange={e => setTimelineForm({...timelineForm, role: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" placeholder="e.g. Frontend Developer" />
                         </div>
                         <div>
                             <label className="text-xs text-white uppercase font-bold mb-2 block">Company / Project Name</label>
                             <input required type="text" value={timelineForm.company} onChange={e => setTimelineForm({...timelineForm, company: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" placeholder="e.g. Unihub Startup" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                 <label className="text-xs text-white uppercase font-bold mb-2 block">Date Range</label>
                                 <input required type="text" value={timelineForm.date} onChange={e => setTimelineForm({...timelineForm, date: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" placeholder="e.g. 2024 - Present" />
                             </div>
                             <div>
                                 <label className="text-xs text-white uppercase font-bold mb-2 block">Link (Optional)</label>
                                 <input type="text" value={timelineForm.link} onChange={e => setTimelineForm({...timelineForm, link: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" placeholder="https://..." />
                             </div>
                         </div>
                         <div>
                             <label className="text-xs text-white uppercase font-bold mb-2 block">Description</label>
                             <textarea required value={timelineForm.description} onChange={e => setTimelineForm({...timelineForm, description: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none h-24 resize-none" placeholder="Describe your responsibilities..." />
                         </div>
                         <div>
                             <label className="text-xs text-white uppercase font-bold mb-2 block">Tags (Comma separated)</label>
                             <input type="text" value={timelineForm.tags} onChange={e => setTimelineForm({...timelineForm, tags: e.target.value})} className="w-full bg-[#0E0F11] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#5E6AD2] focus:outline-none" placeholder="React, Node.js, Design..." />
                         </div>

                         <div className="flex justify-end gap-3 pt-4">
                             <button type="button" onClick={() => setIsTimelineModalOpen(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5">Cancel</button>
                             <button type="submit" disabled={timelineSaving} className="px-6 py-2.5 rounded-xl bg-[#5E6AD2] text-white hover:bg-[#4b56b2] shadow-lg shadow-[#5E6AD2]/25 disabled:opacity-50">{timelineSaving ? "Saving..." : "Save Item"}</button>
                         </div>
                     </form>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
}
