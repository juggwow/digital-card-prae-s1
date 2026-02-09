"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ArrowRight, Music, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { StageIntro, StageMemory, StageReassurance, StageInteractive, StageFinale } from "@/component/stage";
import { ConfigType } from "@/component/config";

export default function ValentineApp({ CONFIG }: { CONFIG: ConfigType }) {
    const [stage, setStage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    // Preload Images
    useEffect(() => {
        const preloadImages = async () => {
            const imageUrls = [
                CONFIG.memoryImage,
                ...CONFIG.reasons.map(r => r.image),
                "/hand.jpg",
            ];

            const promises = imageUrls.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });

            await Promise.all(promises);
            setIsLoading(false);
        };

        preloadImages();
    }, []);

    const startMusic = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => { });
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-br from-rose-50 via-white to-rose-100 overflow-hidden touch-none select-none">

            <audio ref={audioRef} loop src="/bgm.mp3" />

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
                            isLoading={isLoading}
                            CONFIG={CONFIG}
                        />
                    )}
                    {stage === 1 && <StageMemory key="1" onNext={() => setStage(2)} CONFIG={CONFIG} />}
                    {stage === 2 && <StageReassurance key="2" onNext={() => setStage(3)} CONFIG={CONFIG} />}
                    {stage === 3 && <StageInteractive key="3" onNext={() => setStage(4)} CONFIG={CONFIG} />}
                    {stage === 4 && <StageFinale key="4" onRestart={() => setStage(0)} CONFIG={CONFIG} />}
                </AnimatePresence>
            </main>

            <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 pb-safe">
                {[0, 1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-500 ${s <= stage ? "w-6 bg-rose-500" : "w-1.5 bg-rose-200"}`}
                    />
                ))}
            </div>
        </div>
    );
}