import React from "react";
import { motion } from "framer-motion";

const colors = ["#f472b6", "#facc15", "#60a5fa", "#34d399", "#f87171"];

export default function Confetti({ count = 20, onDone }) {
  const confetti = Array.from({ length: count });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((_, i) => {
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.5, ease: "ease-out" }}
            className="w-3 h-3 rounded-full absolute left-1/2 top-1/2"
            style={{ backgroundColor: color }}
            onAnimationComplete={i === confetti.length - 1 ? onDone : undefined}
          />
        );
      })}
    </div>
  );
}
