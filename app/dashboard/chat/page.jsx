"use client";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Mic, MicOff, Video, VideoOff, Send, SkipForward, XCircle, Search } from "lucide-react";

// Backend manzili (Env o'zgaruvchisidan olinadi yoki localhost)
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function RandomVideoChat() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, searching, connected
  
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  
  const socketRef = useRef();
  const peerRef = useRef();

  // 1. Initial Setup (Camera & Socket)
  useEffect(() => {
    // Camera Setup
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
              setLocalStream(stream);
              if (localVideoRef.current) {
                  localVideoRef.current.srcObject = stream;
              }
          })
          .catch((err) => {
              console.error("Camera access error:", err);
              alert("Kameraga ruxsat berilmadi: " + err.message);
          });
    } else {
        alert("Xatolik: Telefonda kamerani ishlatish uchun 'HTTPS' kerak yoki Chrome sozlamalarini o'zgartirish kerak.");
    }

    // Socket Setup
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
        console.log("✅ Socket Connected");
    });

    socketRef.current.on("matched", ({ roomId, initiator }) => {
        console.log("🤝 Matched!", roomId, initiator);
        setStatus("connected");
        
        if (peerRef.current) {
            peerRef.current.destroy();
        }

        const streamToUse = localVideoRef.current?.srcObject; 
        if (!streamToUse) {
            console.error("❌ Local stream not ready");
            return;
        }

        const peer = new Peer({
            initiator: initiator,
            trickle: false,
            stream: streamToUse,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }, 
                    { urls: 'stun:global.stun.twilio.com:3478' }
                ]
            }
        });

        peer.on("signal", (data) => {
            if (!peer.destroyed) {
                socketRef.current.emit("signal", { roomId, signal: data });
            }
        });

        peer.on("stream", (stream) => {
            console.log("📺 Remote Stream Received");
            setRemoteStream(stream);
            
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
                remoteVideoRef.current.onloadedmetadata = () => {
                    remoteVideoRef.current.play().catch(e => console.error("Play error:", e));
                };
            }
        });

        peer.on("close", () => {
             console.log("Peer closed");
             setRemoteStream(null);
             handleStop(); 
        });

        peer.on("error", (err) => {
            console.error("Peer Error:", err);
            handleStop();
        });

        peerRef.current = peer;
    });

    socketRef.current.on("signal", (signal) => {
        if (peerRef.current && !peerRef.current.destroyed) {
            peerRef.current.signal(signal);
        }
    });

    socketRef.current.on("partner-disconnected", () => {
        alert("Partner disconnected");
        handleStop();
    });

    return () => {
        if (socketRef.current) socketRef.current.disconnect();
        if (peerRef.current) peerRef.current.destroy();
    };
  }, []);

  const handleStartSearch = () => {
      if (!socketRef.current) return;
      
      if (peerRef.current) {
          peerRef.current.destroy();
          peerRef.current = null;
      }
      setRemoteStream(null);
      
      setStatus("searching");
      socketRef.current.emit("join-queue");
  };

  const handleStop = () => {
      if (peerRef.current) {
          peerRef.current.destroy();
          peerRef.current = null;
      }
      if (socketRef.current) {
          socketRef.current.emit("leave-queue");
      }
      setStatus("idle");
      setRemoteStream(null);
  };
  
  const handleNext = () => {
      handleStop(); 
      setTimeout(() => handleStartSearch(), 500); 
  }

  const toggleMic = () => {
      if (localStream) {
          const track = localStream.getAudioTracks()[0];
          if (track) {
              track.enabled = !micOn;
              setMicOn(!micOn);
          }
      }
  }

  const toggleCamera = () => {
       if (localStream) {
          const track = localStream.getVideoTracks()[0];
          if (track) {
              track.enabled = !cameraOn;
              setCameraOn(!cameraOn);
          }
      }
  }

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-[#5E6AD2] flex items-center justify-center font-bold">U</div>
           <span className="font-bold">UniHub Random</span>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-white/10 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500' : status === 'searching' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
          {status === 'idle' && "Offline"}
          {status === 'searching' && "Searching..."}
          {status === 'connected' && "Connected"}
      </div>

      {/* VIDEO CONTAINER */}
      <div className="w-full max-w-6xl aspect-video bg-[#0E0F11] rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl">
          
          {/* Main Remote Video */}
          <div className="absolute inset-0 flex items-center justify-center">
              {remoteStream ? (
                  <video 
                    ref={remoteVideoRef} 
                    playsInline 
                    autoPlay 
                    // Muted is essential for autoplay in many browsers
                    muted 
                    className="w-full h-full object-cover bg-[#1a1c22]"
                  />
              ) : (
                  <div className="flex flex-col items-center gap-4 opacity-50">
                      {status === 'searching' ? (
                          <>
                            <div className="w-16 h-16 border-4 border-[#5E6AD2] border-t-transparent rounded-full animate-spin" />
                            <p>Looking for a student...</p>
                          </>
                      ) : (
                           <>
                             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                                 <Search size={32} />
                             </div>
                             <p>Press Start to find a partner</p>
                           </>
                      )}
                  </div>
              )}
          </div>

          {/* Local User Video (PIP) */}
          <div className="absolute bottom-6 right-6 w-48 aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/20 shadow-lg group z-20">
              <video 
                ref={localVideoRef} 
                playsInline 
                autoPlay 
                muted 
                className={`w-full h-full object-cover transform scale-x-[-1] ${!cameraOn && 'hidden'}`}
              />
              {!cameraOn && <div className="absolute inset-0 flex items-center justify-center bg-[#1C1D21]"><VideoOff className="opacity-50"/></div>}
              
              <div className="absolute bottom-2 left-2 text-[10px] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  You
              </div>
          </div>

          {/* Controls Bar (Bottom) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-3 rounded-full border border-white/10 z-30">
              
              <button onClick={toggleMic} className={`p-4 rounded-full transition-colors ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}>
                  {micOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>
              
              <button onClick={toggleCamera} className={`p-4 rounded-full transition-colors ${cameraOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}>
                   {cameraOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>

              <div className="w-px h-8 bg-white/20 mx-2" />

              {status === 'idle' ? (
                  <button onClick={handleStartSearch} className="px-8 py-4 bg-[#5E6AD2] hover:bg-[#4b56b2] text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-[#5E6AD2]/20">
                      <Search size={20} /> Start
                  </button>
              ) : (
                  <>
                    <button onClick={handleNext} className="px-8 py-4 bg-[#5E6AD2] hover:bg-[#4b56b2] text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105">
                        <SkipForward size={20} /> Next
                    </button>
                    <button onClick={handleStop} className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full transition-colors">
                        <XCircle size={24} />
                    </button>
                  </>
              )}
          </div>
      </div>

    </div>
  );
}
