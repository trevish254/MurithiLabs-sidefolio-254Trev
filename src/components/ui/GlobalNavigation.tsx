"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const TRACKS = [
  { file: "/ambient.mp3", title: "Ambient Beats", artist: "Orange Free Sounds" },
  { file: "/syouki_takahashi-midnight-forest-184304.mp3", title: "Midnight Forest", artist: "Syouki Takahashi" },
  { file: "/rockot-eona-emotional-ambient-pop-351436.mp3", title: "Eona Emotional Ambient", artist: "Rockot" },
  { file: "/nveravetyanmusic-deep-future-garage-royalty-free-music-163081.mp3", title: "Future Garage", artist: "Nver Avetyan" },
  { file: "/tunetank-inspiring-cinematic-music-409347.mp3", title: "Inspiring Cinematic", artist: "Tunetank" },
  { file: "/evgeny_bardyuzha-embrace-364091 (1).mp3", title: "Embrace", artist: "Evgeny Bardyuzha" },
  { file: "/kornevmusic-epic-478847.mp3", title: "Epic Cinematic", artist: "Kornev Music" },
  { file: "/folk_acoustic_music-a-call-to-the-soul-149262.mp3", title: "Soul Call", artist: "Folk Acoustic" }
];

export default function GlobalNavigation() {
  const [showDirectory, setShowDirectory] = useState(false);
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, isPlaying]);

  const playNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const playPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={TRACKS[currentTrackIndex].file} onEnded={() => playNext()} preload="auto" />
      {/* ── DIRECTORY OVERLAY ── */}
      <motion.div 
        initial={false}
        animate={showDirectory ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-md flex flex-col items-center justify-end pb-[6rem] px-6"
        onClick={() => setShowDirectory(false)}
      >
        <motion.div 
           initial={false}
           animate={showDirectory ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
           transition={{ type: "spring", stiffness: 280, damping: 22 }}
           className="grid grid-cols-2 md:grid-cols-3 gap-[1px] max-w-[280px] w-full origin-bottom"
           onClick={(e) => e.stopPropagation()}
        >
           {/* Row 1 */}
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">For Agencies</span>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">For Brands</span>
           </div>
           
           {/* Row 2 */}
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group relative">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">Works</span>
              <div className="mt-auto w-2 h-2 border-r border-t border-white/40 -rotate-45" />
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">Insights</span>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">About</span>
           </div>

           {/* Row 3 */}
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex flex-col p-3 hover:bg-white/10 transition cursor-pointer group">
              <span className="text-white text-[8px] font-bold uppercase tracking-widest mb-auto">Contact</span>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex items-center justify-center hover:bg-white/10 transition cursor-pointer group">
              <svg className="w-4 h-4 text-white/60 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 aspect-square flex items-center justify-center hover:bg-white/10 transition cursor-pointer group">
              <svg className="w-4 h-4 text-white/60 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           </div>
        </motion.div>
      </motion.div>

      {/* ── MUSIC OVERLAY ── */}
      <motion.div 
        initial={false}
        animate={showMusicControls ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-md flex flex-col items-center justify-end pb-[6rem] px-6"
        onClick={() => setShowMusicControls(false)}
      >
        <motion.div 
           initial={false}
           animate={showMusicControls ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
           transition={{ type: "spring", stiffness: 280, damping: 22 }}
           className="w-full max-w-[280px] origin-bottom flex flex-col gap-[1px]"
           onClick={(e) => e.stopPropagation()}
        >
           {/* Track Information Pane */}
           <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 flex flex-col gap-3 relative overflow-hidden group">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-black/40 border border-white/10 flex items-center justify-center shadow-inner">
                    <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l12-2v13M9 9l12-2M5 21a3 3 0 100-6 3 3 0 000 6zm12-2a3 3 0 100-6 3 3 0 000 6z"/></svg>
                 </div>
                 <div className="flex flex-col max-w-[160px]">
                    <span className="text-white text-[10px] font-bold tracking-wider truncate uppercase">{TRACKS[currentTrackIndex].title}</span>
                    <span className="text-white/50 text-[8px] uppercase tracking-widest mt-0.5 truncate">{TRACKS[currentTrackIndex].artist}</span>
                 </div>
              </div>
              {/* Minimal progress representation */}
              <div className="w-full h-1 bg-white/10 mt-1 relative overflow-hidden">
                 <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "100%" : "30%" }}
                    transition={isPlaying ? { duration: 180, ease: "linear", repeat: Infinity } : { duration: 0 }}
                    className="absolute top-0 left-0 h-full bg-white/70" 
                 />
              </div>
           </div>

           {/* Extended Controls Pane */}
           <div className="grid grid-cols-4 gap-[1px]">
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition cursor-pointer active:scale-95" onClick={playPrev}>
                 <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition cursor-pointer col-span-2 active:scale-95" onClick={(e) => { e.stopPropagation(); toggleSound(); }}>
                 {isPlaying ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                 ) : (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 )}
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition cursor-pointer active:scale-95" onClick={playNext}>
                 <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </div>
           </div>
        </motion.div>
      </motion.div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]">
        <div className="bg-black/40 backdrop-blur-2xl px-8 py-3 flex items-center gap-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 transition-all">
          <div 
            className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-all"
            onClick={() => setShowDirectory(!showDirectory)}
          >
            {showDirectory ? (
              <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
                <div className="w-4 h-[1px] bg-white rotate-45 absolute" />
                <div className="w-4 h-[1px] bg-white -rotate-45 absolute" />
              </div>
            ) : (
              <div className="w-5 h-5 bg-white/20 flex items-center justify-center p-1.5 overflow-hidden group-hover:bg-white/30 transition">
                 <div className="w-full h-full bg-white transition-transform duration-300 group-hover:scale-90" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[8px] text-white/70 group-hover:text-white uppercase tracking-widest font-black leading-none transition">
                {showDirectory ? "Close" : "Directory"}
              </span>
              {!showDirectory && (
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-white/30 group-hover:bg-white/50 transition" />)}
                </div>
              )}
            </div>
          </div>

          <div className="w-px h-8 bg-white/10" />

          {/* MUSIC CONTROLS */}
          <div className="flex items-center gap-6">

            {/* Play/Pause */}
            <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-all p-1" onClick={toggleSound}>
              {isPlaying ? (
                 <svg className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
              ) : (
                 <svg className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <button onClick={() => setVolume(Math.max(0, volume - 0.2))} className="text-white/50 hover:text-white text-xs px-1 py-1 active:scale-95 transition-all focus:outline-none leading-none">−</button>
              
              <div className="flex space-x-[2px]">
                 {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
                    <div key={i} className={`w-1.5 h-1.5 transition-colors ${volume >= level ? 'bg-white' : 'bg-white/20'}`} />
                 ))}
              </div>

              <button onClick={() => setVolume(Math.min(1, volume + 0.2))} className="text-white/50 hover:text-white text-xs px-1 py-1 active:scale-95 transition-all focus:outline-none leading-none">+</button>
            </div>

            {/* Visualizer (Click to open Music Menu) */}
            <div className="flex flex-col items-end cursor-pointer group pl-2 border-l border-white/10" onClick={() => setShowMusicControls(!showMusicControls)}>
              <span className="text-[8px] text-white/70 group-hover:text-white uppercase tracking-widest font-black leading-none transition">
                {showMusicControls ? "Close" : "Sound"}
              </span>
              
              {isPlaying ? (
                <div className="flex items-center items-end gap-0.5 h-3 mt-1">
                  <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-0.5 bg-white" />
                  <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-0.5 bg-white" />
                  <motion.div animate={{ height: ["50%", "100%", "50%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-0.5 bg-white" />
                  <motion.div animate={{ height: ["100%", "40%", "100%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-0.5 bg-white" />
                </div>
              ) : (
                <div className="flex items-center items-end gap-0.5 h-3 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-0.5 h-[40%] bg-white" />
                  <div className="w-0.5 h-[80%] bg-white" />
                  <div className="w-0.5 h-[50%] bg-white" />
                  <div className="w-0.5 h-[100%] bg-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
