// src/App.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import FlowerRing from "./FlowerRing";

function App() {
  const [tab, setTab] = useState("home");
  const [cycles, setCycles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ start: "", duration: 5 });
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cycles");
    if (saved) setCycles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cycles", JSON.stringify(cycles));
  }, [cycles]);

  const addCycle = (e) => {
    e.preventDefault();
    const newCycles = [...cycles, { ...formData, id: Date.now() }];
    setCycles(newCycles);
    setFormData({ start: "", duration: 5 });
    setShowForm(false);

    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 2000);
  };

  const deleteCycle = (id) => {
    setCycles(cycles.filter((c) => c.id !== id));
  };

  const editCycle = (id, updated) => {
    setCycles(cycles.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  // Home dynamic cycle info
  let dayOfPeriod = null;
  let totalDays = 28;
  if (cycles.length > 0) {
    const latest = cycles[cycles.length - 1];
    const startDate = new Date(latest.start);
    const today = new Date();
    const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    if (diff > 0 && diff <= latest.duration) {
      dayOfPeriod = diff;
    }
    totalDays = latest.duration || 28;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      {celebrate && <Confetti />}
      <h1 className="text-2xl font-bold text-pink-600 text-center mb-6">
        🌸 Cycle Tracker
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-6">
        {tab === "home" && (
          <div className="flex flex-col items-center">
            <FlowerRing
              dayOfPeriod={dayOfPeriod}
              totalDays={totalDays}
              celebrate={celebrate}
            />
            <p className="mt-4 text-gray-700 text-center">
              {dayOfPeriod
                ? `You are on day ${dayOfPeriod} of your cycle.`
                : "Track your periods, fertile windows, and notes with ease."}
            </p>
            <motion.button
              onClick={() => setShowForm(true)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-full shadow-lg"
            >
              ➕ Quick Add Cycle
            </motion.button>
          </div>
        )}

        {tab === "calendar" && <Calendar cycles={cycles} />}

        {tab === "logs" && (
          <div>
            <h2 className="text-lg font-semibold text-pink-600 mb-3">
              Logged Cycles
            </h2>
            {cycles.length === 0 ? (
              <p className="text-gray-500">No cycles yet.</p>
            ) : (
              <ul className="space-y-2">
                {cycles.map((c) => (
                  <li
                    key={c.id}
                    className="p-3 bg-pink-50 rounded-xl flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <span className="font-medium">Start:</span>{" "}
                        {c.start}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {c.duration} days
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          editCycle(c.id, {
                            duration: prompt("New duration:", c.duration),
                          })
                        }
                        className="text-blue-500"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteCycle(c.id)}
                        className="text-red-500"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={addCycle}
            className="bg-white rounded-2xl shadow-lg p-6 w-80"
          >
            <h2 className="text-lg font-semibold mb-4 text-pink-600">
              Add Cycle
            </h2>
            <label className="block mb-2 text-sm">Start Date</label>
            <input
              type="date"
              value={formData.start}
              onChange={(e) =>
                setFormData({ ...formData, start: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              required
            />
            <label className="block mb-2 text-sm">Duration (days)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: Number(e.target.value) })
              }
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 bg-pink-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bottom nav */}
      <nav className="mt-6 bg-white rounded-3xl shadow px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button
            onClick={() => setTab("home")}
            className={`py-2 rounded-2xl ${
              tab === "home" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setTab("calendar")}
            className={`py-2 rounded-2xl ${
              tab === "calendar" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setTab("logs")}
            className={`py-2 rounded-2xl ${
              tab === "logs" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            📝 Logs
          </button>
        </div>
      </nav>
    </div>
  );
}

function Calendar({ cycles }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const periodDays = new Set();
  const fertileDays = new Set();

  cycles.forEach((cycle) => {
    const start = new Date(cycle.start);
    const duration = cycle.duration || 5;
    for (let i = 0; i < duration; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getMonth() === month && d.getFullYear() === year) {
        periodDays.add(d.getDate());
      }
    }
    for (let i = 9; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getMonth() === month && d.getFullYear() === year) {
        fertileDays.add(d.getDate());
      }
    }
  });

  const weeks = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day++);
      }
    }
    weeks.push(week);
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold text-pink-600 text-center mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
      </div>
      {weeks.map((week, i) => (
        <div key={i} className="grid grid-cols-7 text-center">
          {week.map((d, j) =>
            d ? (
              <div
                key={j}
                className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full
                  ${d === today.getDate() ? "border-2 border-pink-500" : ""}
                  ${periodDays.has(d) ? "bg-pink-300 text-white" : ""}
                  ${fertileDays.has(d) ? "bg-green-200" : ""}
                `}
              >
                {d}
              </div>
            ) : (
              <div key={j}></div>
            )
          )}
        </div>
      ))}
      <div className="flex justify-center gap-4 text-xs text-gray-500 mt-4">
        <span>🌸 Period</span>
        <span>💚 Fertile</span>
        <span>⭕ Today</span>
      </div>
    </div>
  );
}

export default App;
