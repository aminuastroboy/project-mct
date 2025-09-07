import { useState } from "react";
import { motion } from "framer-motion";
import Petal from "./Petal";

export default function LoginRegister({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-animated p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {[...Array(12)].map((_, i) => (
          <Petal key={i} delay={i * 1.5} size={16 + Math.random() * 20} />
        ))}
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          {isLogin ? "Welcome Back 🌸" : "Create Account 🌺"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "No account?" : "Already registered?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-500 font-medium hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </motion.div>
  );
}
