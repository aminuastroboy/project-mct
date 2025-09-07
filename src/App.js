import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowerRing from "./FlowerRing";
import Confetti from "./Confetti";

function App() {
  const [tab, setTab] = React.useState("home");
  const [cycles, setCycles] = React.useState(() => {
    const saved = localStorage.getItem("cycles");
    return saved ? JSON.parse(saved) : [];
  });
  const [celebrate, setCelebrate] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("cycles", JSON.stringify(cycles));
  }, [cycles]);

  const addCycle = (start, duration) => {
    setCycles([...cycles, { start, duration }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col">
      <header className="p-4 text-center font-bold text-xl text-pink-700">
        🌸 My Cycle Tracker
      </header>

      <main className="flex-1 p-4">
        {tab === "home" && <Home cycles={cycles} addCycle={addCycle} celebrate={celebrate} setCelebrate={setCelebrate} />}
        {tab === "calendar" && <Calendar cycles={cycles} />}
        {tab === "logs" && <Logs cycles={cycles} />}
      </main>

      <nav className="mt-4 bg-white rounded-3xl shadow-lg px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button onClick={() => setTab("home")} className={`py-2 rounded-2xl ${tab==="home"?"bg-pink-200 font-medium":""}`}>🏠 Home</button>
          <button onClick={() => setTab("calendar")} className={`py-2 rounded-2xl ${tab==="calendar"?"bg-pink-200 font-medium":""}`}>🗓️ Calendar</button>
          <button onClick={() => setTab("logs")} className={`py-2 rounded-2xl ${tab==="logs"?"bg-pink-200 font-medium":""}`}>📖 Logs</button>
        </div>
      </nav>
    </div>
  );
}

function Home({ cycles, addCycle, celebrate, setCelebrate }) {
  let dayOfPeriod = null;
  let totalDays = 28;

  if (cycles.length > 0) {
    const latestCycle = cycles[cycles.length - 1];
    const startDate = new Date(latestCycle.start);
    const today = new Date();
    const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    if (diff > 0 && diff <= latestCycle.duration) dayOfPeriod = diff;
    totalDays = latestCycle.duration || 28;
  }

  const [showForm, setShowForm] = React.useState(false);
  const [newStart, setNewStart] = React.useState("");
  const [newDuration, setNewDuration] = React.useState(5);

  const handleAddCycle = () => {
    if (!newStart) return;
    addCycle(newStart, newDuration);
    setShowForm(false);
    setNewStart("");
    setNewDuration(5);
    setCelebrate(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <FlowerRing dayOfPeriod={dayOfPeriod} totalDays={totalDays} celebrate={celebrate} />
      <p className="text-gray-700 text-center">
        {dayOfPeriod ? `You are on day ${dayOfPeriod} of your cycle.` : "Track your periods, fertile windows, and notes with ease."}
      </p>

      {!showForm ? (
        <motion.button
          onClick={() => setShowForm(true)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-4 px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-full shadow-lg"
        >
          ➕ Quick Add Cycle
        </motion.button>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-sm text-sm">
          <label className="block mb-2 font-medium text-gray-700">Start Date</label>
          <input type="date" value={newStart} onChange={e => setNewStart(e.target.value)} className="w-full border rounded-md p-2 mb-3" />
          <label className="block mb-2 font-medium text-gray-700">Duration (days)</label>
          <input type="number" min="1" max="40" value={newDuration} onChange={e => setNewDuration(e.target.value)} className="w-full border rounded-md p-2 mb-3" />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="px-3 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
            <button onClick={handleAddCycle} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow">Save</button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {celebrate && <Confetti count={30} onDone={() => setCelebrate(false)} />}
      </AnimatePresence>
    </div>
  );
}

function Calendar({ cycles }) {
  return (
    <div className="text-center text-gray-600">
      <p>📅 Calendar view coming soon...</p>
    </div>
  );
}

function Logs({ cycles }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-pink-600">Cycle Logs</h2>
      {cycles.length === 0 && <p className="text-gray-500">No logs yet.</p>}
      {cycles.map((c, i) => (
        <div key={i} className="p-3 bg-white rounded-xl shadow flex justify-between">
          <span>{c.start}</span>
          <span>{c.duration} days</span>
        </div>
      ))}
    </div>
  );
}

export default App;
