import React, { useState, useEffect } from "react";
import { Home, Calendar, Smile, PlusCircle } from "lucide-react";
import FlowerRing from "./FlowerRing";
import CalendarView from "./CalendarView";
import Logs from "./Logs";

export default function App() {
  const [tab, setTab] = useState("home");
  const [cycles, setCycles] = useState([]);
  const [notes, setNotes] = useState({});

  const dayOfPeriod = 3;
  const PERIOD_DAYS = 28;
  const predictedNext = "Oct 5, 2025";

  // Load from localStorage on mount
  useEffect(() => {
    const savedCycles = localStorage.getItem("cycles");
    const savedNotes = localStorage.getItem("notes");
    if (savedCycles) setCycles(JSON.parse(savedCycles));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Save whenever data changes
  useEffect(() => {
    localStorage.setItem("cycles", JSON.stringify(cycles));
  }, [cycles]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Example default data if empty
  useEffect(() => {
    if (cycles.length === 0) {
      setCycles([
        { id: 1, start: "Aug 10", duration: 5, days: [10, 11, 12, 13, 14] },
        { id: 2, start: "Sep 7", duration: 4, days: [7, 8, 9, 10] }
      ]);
    }
  }, [cycles]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-between">
      <div className="p-6 flex-1">
        {tab === "home" && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-medium">{new Date().toDateString()}</p>
            <FlowerRing dayOfPeriod={dayOfPeriod} totalDays={PERIOD_DAYS} />
            <button
              onClick={() =>
                setCycles([
                  ...cycles,
                  {
                    id: Date.now(),
                    start: new Date().toDateString(),
                    duration: 5,
                    days: [new Date().getDate()]
                  }
                ])
              }
              className="bg-pink-400 text-white rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <PlusCircle size={18} /> Log Period Start
            </button>
            <p className="text-sm text-gray-600">
              Predicted Next: {predictedNext}
            </p>
          </div>
        )}

        {tab === "calendar" && <CalendarView cycles={cycles} />}
        {tab === "logs" && <Logs cycles={cycles} notes={notes} setNotes={setNotes} />}
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
