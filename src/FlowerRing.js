import React from "react";
import { motion } from "framer-motion";

export default function FlowerRing({ dayOfPeriod, totalDays }) {
  const petals = 12;
  const radius = 60;
  const angleStep = (2 * Math.PI) / petals;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ transformOrigin: "80px 80px" }}
      >
        {[...Array(petals)].map((_, i) => {
          const angle = i * angleStep;
          const cx = 80 + radius * Math.cos(angle);
          const cy = 80 + radius * Math.sin(angle);
          const active = dayOfPeriod && i < (dayOfPeriod / totalDays) * petals;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={15}
              fill={active ? "#f4a6c6" : "#fde8ef"}
              className={active ? "animate-pulse" : ""}
            />
          );
        })}
      </motion.g>

      <text
        x="80"
        y="80"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="#333"
      >
        {dayOfPeriod || "—"}
      </text>
      <text x="80" y="100" textAnchor="middle" fontSize="10" fill="#666">
        Day of Period
      </text>
    </svg>
  );
}
