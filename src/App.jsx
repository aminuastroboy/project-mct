import React, { useState } from "react";
import CycleLog from "./components/CycleLog";

export default function App() {
  const [logs, setLogs] = useState([]);

  const addLog = () => {
    const date = new Date().toLocaleDateString();
    setLogs([...logs, { date }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-dark via-secondary to-primary">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary drop-shadow-md">
          🌸 Menstrual Cycle Tracker
        </h1>

        <button
          onClick={addLog}
          className="w-full bg-primary hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition shadow-md"
        >
          Add Log
        </button>

        <CycleLog logs={logs} />
      </div>
    </div>
  );
}