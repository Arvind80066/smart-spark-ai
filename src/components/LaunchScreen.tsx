
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LaunchScreenProps {
  onComplete: () => void;
}

export function LaunchScreen({ onComplete }: LaunchScreenProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after 1.5s of logo animation
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1500);

    // Complete animation after 3.5s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-violet-950">
        {/* Optional neural wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="neural-pattern"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(30)"
              >
                <path
                  d="M 0,25 L 50,25 M 25,0 L 25,50"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-pattern)" />
          </svg>
        </div>
      </div>

      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{
          scale: [0.8, 1.05, 1],
          opacity: 1,
          rotateY: [15, 0],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.7, 1],
          ease: "easeOut",
        }}
        className="relative w-24 h-24 mb-6"
      >
        {/* Logo */}
        <img
          src="/lovable-uploads/dd0646a7-9a45-4b11-a407-28ccef2a3d74.png"
          alt="AI Powerhouse Logo"
          className="w-full h-full object-cover"
        />

        {/* Light reflection */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 100, opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 mix-blend-overlay"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}
        />

        {/* Neural energy loops */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1.2, 1.2],
            opacity: [0, 0.5, 0],
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            delay: 0.7,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
          className="absolute inset-0 border-2 border-amber-300 rounded-full -z-10"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.6, 1.4, 1.4],
            opacity: [0, 0.3, 0],
            rotate: -360,
          }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
          className="absolute inset-0 border border-amber-500 rounded-full -z-10"
        />
      </motion.div>

      {/* Text animation */}
      <AnimatePresence>
        {showText && (
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent",
              "tracking-wide"
            )}
          >
            AI Powerhouse
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
