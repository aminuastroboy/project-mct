import React, { useState, useEffect } from "react";
import FlowerRing from "./FlowerRing";
import CalendarView from "./CalendarView";
import Logs from "./Logs";
import { Calendar, Notebook, Home } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");
  const [cycles, setCycles] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const savedCycles = JSON.parse(localStorage.getItem("cycles")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setCycles(savedCycles);
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("cycles", JSON.stringify(cycles));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [cycles, notes]);

  const addCycle = (start, duration) => {
    const newCycle = {
      id: Date.now(),
      start,
      duration: parseInt(duration, 10),
    };
    setCycles([...cycles, newCycle]);
  };

  const deleteCycle = (id) => {
    setCycles(cycles.filter(c => c.id !== id));
    const newNotes = { ...notes };
    delete newNotes[id];
    setNotes(newNotes);
  };

  const updateCycle = (id, newData) => {
    setCycles(
      cycles.map(c =>
        c.id === id
          ? { ...c, start: newData.start, duration: parseInt(newData.duration, 10) }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="bg-pink-400 text-white p-4 text-center font-bold text-lg shadow-md">
        🌸 Menstrual Cycle Tracker
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {tab === "home" && (
          <div className="flex flex-col items-center">
            <FlowerRing dayOfPeriod={3} totalDays={28} />
            <p className="mt-4 text-gray-700 text-center">
              Track your periods, fertile windows, and notes with ease.
            </p>
          </div>
        )}

        {tab === "calendar" && (
          <CalendarView cycles={cycles} setCycles={setCycles} />
        )}

        {tab === "logs" && (
          <Logs
            cycles={cycles}
            notes={notes}
            setNotes={setNotes}
            deleteCycle={deleteCycle}
            updateCycle={updateCycle}
          />
        )}
      </main>

      <nav className="mt-2 bg-white rounded-t-3xl shadow-lg px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button
            onClick={() => setTab("home")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "home" ? "bg-pink-100 text-pink-600 font-medium" : ""
            }`}
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => setTab("calendar")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "calendar" ? "bg-pink-100 text-pink-600 font-medium" : ""
            }`}
          >
            <Calendar size={20} /> Calendar
          </button>
          <button
            onClick={() => setTab("logs")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "logs" ? "bg-pink-100 text-pink-600 font-medium" : ""
            }`}
          >
            <Notebook size={20} /> Logs
          </button>
        </div>
      </nav>
    </div>
  );
}
