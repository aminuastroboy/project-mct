import { motion } from "framer-motion";

export default function Petal({ delay = 0, size = 20 }) {
  return (
    <motion.div
      className="absolute text-pink-300 select-none"
      initial={{ y: -50, x: Math.random() * window.innerWidth }}
      animate={{ y: window.innerHeight + 50, x: Math.random() * window.innerWidth }}
      transition={{ duration: 15, repeat: Infinity, delay }}
      style={{ fontSize: size }}
    >
      ❀
    </motion.div>
  );
}
