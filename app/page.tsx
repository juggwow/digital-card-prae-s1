"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ArrowRight, Music, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

// --- Configuration ---
const CONFIG = {
  partnerName: "Teerak",
  memoryImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop",
  reassuranceText: [
    "รู้ไหม...",
    "โลกอาจจะใจร้ายในบางวัน",
    "แต่เค้าจะเป็น Safe Zone",
    "ให้เธอเสมอเลยนะ ❤️",
  ],
  reasons: [
    "รอยยิ้มของเธอ",
    "เสียงหัวเราะ",
    "ความใจดี",
    "แก้มย้อยๆ"
  ],
};

// --- Components ---

// เพิ่ม prop: onStartMusic เพื่อรับคำสั่งเปิดเพลง
const StageIntro = ({ onNext, onStartMusic }: { onNext: () => void, onStartMusic: () => void }) => {

  const handleStart = () => {
    onStartMusic(); // สั่งเล่นเพลง
    onNext();       // เปลี่ยนหน้า
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-6 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="relative cursor-pointer" onClick={handleStart}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-rose-500 drop-shadow-2xl"
        >
          <Heart size={100} fill="currentColor" />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg pointer-events-none">
          TAP ME
        </div>
      </div>

      <div className="space-y-2">
        {/* <h1 className="text-3xl font-bold text-rose-800 tracking-wider">
          For {CONFIG.partnerName}
        </h1> */}
        {/* <p className="text-rose-400 text-sm animate-pulse">
            (แตะหัวใจเพื่อเริ่ม & เปิดเพลง)
          </p> */}
      </div>
    </motion.div>
  );
};

const StageMemory = ({ onNext }: { onNext: () => void }) => (
  <motion.div
    className="w-full px-6 flex flex-col items-center space-y-8"
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -50, opacity: 0 }}
  >
    <div className="bg-white p-3 pb-12 shadow-xl rotate-2 rounded-lg w-full max-w-[300px] mx-auto transform transition active:scale-95 duration-300">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-100">
        <img src={CONFIG.memoryImage} alt="Memory" className="w-full h-full object-cover" />
      </div>
      <div className="mt-4 text-center font-serif text-gray-600 italic text-lg">
        "วันของเรา :)"
      </div>
    </div>
    <button onClick={onNext} className="bg-rose-500 active:bg-rose-600 text-white px-8 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-rose-200 font-medium text-lg touch-manipulation">
      ไปต่อครับ <ArrowRight size={20} />
    </button>
  </motion.div>
);

const StageReassurance = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 9000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div className="px-8 text-center flex flex-col justify-center h-full space-y-6" onClick={onNext}>
      {CONFIG.reassuranceText.map((text, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 1.8, duration: 1 }}
          className="text-2xl text-rose-800 font-serif leading-relaxed"
        >
          {text}
        </motion.p>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }} className="fixed bottom-10 left-0 w-full text-center">
        <span className="text-rose-300 text-xs animate-bounce">แตะเพื่อไปต่อ</span>
      </motion.div>
    </motion.div>
  );
};

const StageInteractive = ({ onNext }: { onNext: () => void }) => {
  const [revealed, setRevealed] = useState<number[]>([]);
  const toggleReveal = (index: number) => {
    if (!revealed.includes(index)) {
      navigator.vibrate?.(50);
      setRevealed([...revealed, index]);
    }
  };
  const isAllRevealed = revealed.length === CONFIG.reasons.length;

  return (
    <div className="w-full px-6 text-center flex flex-col h-full justify-center">
      <h2 className="text-xl font-bold text-rose-600 mb-6">ทำไมถึงรักเธอน่ะหรอ?</h2>
      <div className="grid grid-cols-2 gap-3 mb-8 w-full">
        {CONFIG.reasons.map((reason, index) => (
          <motion.button
            key={index}
            onClick={() => toggleReveal(index)}
            className={`h-28 rounded-2xl flex items-center justify-center p-2 shadow-sm transition-all touch-manipulation ${revealed.includes(index) ? "bg-white text-rose-600 border-2 border-rose-100" : "bg-rose-400 text-white active:scale-95"
              }`}
            whileTap={{ scale: 0.95 }}
          >
            {revealed.includes(index) ? <span className="font-semibold text-sm">{reason}</span> : <Stars size={28} />}
          </motion.button>
        ))}
      </div>
      <div className="h-16 flex items-center justify-center">
        {isAllRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onNext}
            className="bg-rose-600 text-white px-8 py-3 rounded-full shadow-xl font-bold text-lg animate-pulse"
          >
            ความลับสุดท้าย ❤️
          </motion.button>
        )}
      </div>
    </div>
  );
};

const StageFinale = ({ onRestart }: { onRestart: () => void }) => {
  useEffect(() => {
    // Effect พลุกระดาษ (Confetti) เหมือนเดิม
    const end = Date.now() + 3000;
    const interval: any = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center px-4 space-y-6 flex flex-col items-center h-full justify-center"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl font-bold text-rose-500 font-serif drop-shadow-sm">
          Happy Valentine's
        </h1>
        <p className="text-lg text-rose-800 leading-relaxed mt-4">
          ขอบคุณที่เข้ามาเป็น<br />ความสดใสให้กันนะ
        </p>

        {/* Gift Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mx-auto mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-dashed border-2 border-rose-300 max-w-[280px]"
        >
          <div className="text-4xl mb-2">🎁</div>
          <p className="text-rose-600 font-bold text-xl">Special Dinner</p>
          <p className="text-gray-500 font-medium">Tonight @ 19:00</p>
        </motion.div>
        {/* --- ส่วนปุ่ม Replay แบบ Icon ใหญ่ --- */}
        <div className="h-24 flex items-start justify-center">
          <motion.button
            onClick={onRestart}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="group relative p-4 text-rose-300 hover:text-rose-500 transition-colors duration-300"
          >
            {/* 1. วงกลมลูกศร (Replay Arrow) */}
            <RotateCcw size={48} strokeWidth={1.5} className="drop-shadow-md" />

            {/* 2. หัวใจตรงกลาง (Absolute Position) */}
            <div className="absolute inset-0 flex items-center justify-center pt-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={16} fill="currentColor" className="text-rose-500" />
              </motion.div>
            </div>
          </motion.button>
        </div>
      </div>


    </motion.div>
  );
};

// --- Main App Component ---
export default function ValentineApp() {
  const [stage, setStage] = useState(0);

  // -- ส่วนจัดการเพลง --
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // เริ่มเล่นเพลง (จะถูกเรียกเมื่อ User กดปุ่มเริ่ม)
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // ปรับระดับเสียง 40% ไม่ให้ดังเกินไป
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(e => console.log("Audio play error:", e));
    }
  };

  // ปุ่มเปิด/ปิดเสียง
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = CONFIG.memoryImage;
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-rose-50 via-white to-rose-100 overflow-hidden touch-none select-none">

      {/* --- ส่วน Audio Element (ซ่อนไว้) --- */}
      {/* ใส่ไฟล์เพลงชื่อ bgm.mp3 ในโฟลเดอร์ public */}
      <audio ref={audioRef} loop src="/bgm.mp3" />

      {/* --- ปุ่มควบคุมเพลง (มุมขวาบน) --- */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 z-50 p-2 bg-white/50 backdrop-blur-sm rounded-full text-rose-600 shadow-sm active:scale-95 transition-all"
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[10%] left-[10%] text-rose-300"
        >
          <Heart size={30} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-[20%] right-[10%] text-rose-300"
        >
          <Heart size={40} />
        </motion.div>
      </div>

      <main className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <StageIntro
              key="0"
              onNext={() => setStage(1)}
              onStartMusic={startMusic}
            />
          )}
          {stage === 1 && <StageMemory key="1" onNext={() => setStage(2)} />}
          {stage === 2 && <StageReassurance key="2" onNext={() => setStage(3)} />}
          {stage === 3 && <StageInteractive key="3" onNext={() => setStage(4)} />}
          {stage === 4 && <StageFinale key="4" onRestart={() => setStage(1)} />}
        </AnimatePresence>
      </main>

      <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 pb-safe">
        {[0, 1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-500 ${s <= stage ? "w-6 bg-rose-500" : "w-1.5 bg-rose-200"
              }`}
          />
        ))}
      </div>
    </div>
  );
}