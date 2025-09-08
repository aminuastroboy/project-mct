import React, { useState, useEffect } from "react";
import FlowerCycle from "./components/FlowerCycle";
import CalendarView from "./components/CalendarView";
import CycleLog from "./components/CycleLog";

function App() {
  const [tab, setTab] = useState("home");
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("cycleLogs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cycleLogs", JSON.stringify(logs));
  }, [logs]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-6">🌸 Menstrual Tracker</h1>

      <nav className="mt-4 bg-white rounded-2xl shadow px-4 py-2 flex gap-3">
        <button onClick={() => setTab("home")} className={tab === "home" ? "font-bold" : ""}>Home</button>
        <button onClick={() => setTab("calendar")} className={tab === "calendar" ? "font-bold" : ""}>Calendar</button>
        <button onClick={() => setTab("logs")} className={tab === "logs" ? "font-bold" : ""}>Logs</button>
      </nav>

      <div className="w-full max-w-md mt-6">
        {tab === "home" && <FlowerCycle logs={logs} />}
        {tab === "calendar" && <CalendarView logs={logs} />}
        {tab === "logs" && <CycleLog logs={logs} setLogs={setLogs} />}
      </div>
    </div>
  );
}

export default App;
