"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, KeyRound, Sparkles, Loader2 } from "lucide-react";

// Import แค่ Component (ห้าม Import CONFIG ตัวจริงมาที่นี่)
import ValentineApp from "@/component/valentine";
import { verifyAndGetConfig } from "./action";
// Import Server Action ที่เราสร้างตะกี้

// Type สำหรับ Config (เพื่อให้ TypeScript ไม่บ่น)
type ConfigType = any; // หรือจะ import type มาจากไฟล์ config ก็ได้

export default function Page() {
  const [status, setStatus] = useState<'locked' | 'unlocked'>('locked');
  const [configData, setConfigData] = useState<ConfigType | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setErrorMsg(""); // เคลียร์ข้อความเก่า

    try {
      // --- เรียก Server Action ---
      // ส่งรหัสไปให้ Server ตรวจ Server จะส่ง Config กลับมา
      const result = await verifyAndGetConfig(inputValue);

      if (result) {
        setConfigData(result.data);
        setStatus('unlocked');
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">

        {/* --- 1. หน้าใส่รหัส (Login) --- */}
        {status === 'locked' && (
          <motion.div
            key="login-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            className="fixed inset-0 w-full h-[100dvh] bg-rose-50 flex flex-col items-center justify-center px-6 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-10 left-10 text-rose-200"
              >
                <Heart size={40} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute bottom-10 right-10 text-rose-200"
              >
                <Sparkles size={40} />
              </motion.div>
            </div>

            {/* Login Box */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-rose-200 w-full max-w-xs text-center relative z-10"
            >
              <div className="mb-6 flex justify-center text-rose-400">
                <div className="bg-rose-100 p-4 rounded-full">
                  <Lock size={40} />
                </div>
              </div>

              <h1 className="text-xl font-bold text-rose-800 mb-2">กรอกอะไรก็ได้ <br /> แล้วกดกุญแจ</h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text" // หรือ password
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  placeholder="กรอกอะไรก็ได้"
                  className="w-full text-center text-xl tracking-widest p-3 rounded-xl border-2 border-rose-100 focus:border-rose-400 focus:outline-none bg-rose-50/50 text-rose-600 placeholder:text-rose-300 transition-colors font-bold"
                  maxLength={10}
                  autoFocus
                />

                {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <KeyRound size={18} />
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* --- 2. หน้า ValentineApp (เมื่อได้ Config จาก Server แล้ว) --- */}
        {status === 'unlocked' && configData && (
          <motion.div
            key="app-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <ValentineApp CONFIG={configData} />
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}