import React, { useState } from "react";
import { Home, Calendar, Smile, PlusCircle } from "lucide-react";
import FlowerRing from "./FlowerRing";
import CalendarView from "./CalendarView";
import Logs from "./Logs";

export default function App() {
  const [tab, setTab] = useState("home");

  // Example cycle data
  const cycles = [
    { id: 1, start: "Aug 10", duration: 5, days: [10, 11, 12, 13, 14] },
    { id: 2, start: "Sep 7", duration: 4, days: [7, 8, 9, 10] }
  ];

  const dayOfPeriod = 3;
  const PERIOD_DAYS = 28;
  const predictedNext = "Oct 5, 2025";

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-between">
      <div className="p-6 flex-1">
        {tab === "home" && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-medium">{new Date().toDateString()}</p>
            <FlowerRing dayOfPeriod={dayOfPeriod} totalDays={PERIOD_DAYS} />
            <button className="bg-pink-400 text-white rounded-xl px-4 py-2 flex items-center gap-2">
              <PlusCircle size={18} /> Log Period Start
            </button>
            <p className="text-sm text-gray-600">
              Predicted Next: {predictedNext}
            </p>
          </div>
        )}

        {tab === "calendar" && <CalendarView cycles={cycles} />}
        {tab === "logs" && <Logs cycles={cycles} />}
      </div>

      <nav className="bg-white rounded-t-3xl shadow-md px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button
            onClick={() => setTab("home")}
            className={`py-2 flex flex-col items-center ${
              tab === "home" ? "text-pink-500" : ""
            }`}
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => setTab("calendar")}
            className={`py-2 flex flex-col items-center ${
              tab === "calendar" ? "text-pink-500" : ""
            }`}
          >
            <Calendar size={20} /> Calendar
          </button>
          <button
            onClick={() => setTab("logs")}
            className={`py-2 flex flex-col items-center ${
              tab === "logs" ? "text-pink-500" : ""
            }`}
          >
            <Smile size={20} /> Logs
          </button>
        </div>
      </nav>
    </div>
  );
}
