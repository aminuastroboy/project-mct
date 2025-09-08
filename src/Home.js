import React, { useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  const logCycle = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="p-6 text-center">
      {showConfetti && (
        <Confetti
          colors={["#ec4899", "#f472b6", "#d8b4fe", "#f9a8d4"]}
          numberOfPieces={200}
          recycle={false}
        />
      )}
      <h1 className="text-2xl font-bold text-pink-600">🌸 Menstrual Tracker</h1>
      <p className="mt-2 text-gray-700">Track your cycle with ease.</p>

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">
          Flower Wheel (Demo)
        </h2>
        <p className="mt-2 text-gray-600">
          Today is Day <b>3</b> of your cycle 🌺
        </p>
        <button
          onClick={logCycle}
          className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600"
        >
          Log New Cycle
        </button>
      </div>
    </div>
  );
}
