import React, { useEffect, useMemo, useState } from "react";
import { Home, Calendar, Smile } from "lucide-react";

/** ----------------------- persistence ----------------------- **/
const CYCLES_KEY = "cb_cycles_v1";
const LOGS_KEY = "cb_logs_v1"; // by date

const load = (k, fallback) => {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const iso = (d) => new Date(d).toISOString().split("T")[0];
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const between = (d, a, b) => d >= iso(a) && d <= iso(b);
const daysSince = (start) => Math.floor((new Date() - new Date(start)) / 86400000) + 1;

export default function App() {
  const [tab, setTab] = useState("home");
  const [cycles, setCycles] = useState(() => load(CYCLES_KEY, []));
  const [logs, setLogs] = useState(() => load(LOGS_KEY, {}));
  const PERIOD_DAYS = 5;

  useEffect(() => save(CYCLES_KEY, cycles), [cycles]);
  useEffect(() => save(LOGS_KEY, logs), [logs]);

  const lastStart = cycles[0]?.startDate || null;
  const todayISO = iso(new Date());

  const dayOfPeriod = useMemo(() => {
    if (!lastStart) return null;
    const end = iso(addDays(lastStart, PERIOD_DAYS - 1));
    if (between(todayISO, lastStart, end)) return daysSince(lastStart);
    return null;
  }, [lastStart, todayISO]);

  const avgCycleLen = useMemo(() => {
    if (cycles.length < 2) return 28;
    const gaps = [];
    for (let i = 0; i < cycles.length - 1; i++) {
      const a = new Date(cycles[i].startDate);
      const b = new Date(cycles[i + 1].startDate);
      gaps.push(Math.round((a - b) / 86400000) * -1);
    }
    const avg = Math.round(gaps.reduce((s, v) => s + v, 0) / gaps.length);
    return avg || 28;
  }, [cycles]);

  const predictedNext = lastStart ? iso(addDays(lastStart, avgCycleLen)) : "—";

  const addTodayStart = () => {
    const startDate = todayISO;
    if (cycles.find(c => c.startDate === startDate)) return;
    setCycles([{ id: Date.now(), startDate }, ...cycles]);
  };

  const updateCycleDate = (id, newDate) => {
    setCycles(prev =>
      prev.map(c => (c.id === id ? { ...c, startDate: newDate } : c))
          .sort((a,b)=> new Date(b.startDate)-new Date(a.startDate))
    );
  };
  const deleteCycle = (id) => setCycles(prev => prev.filter(c => c.id !== id));

  return (
    <div className="min-h-screen bg-petal text-[color:var(--ink)] flex items-stretch justify-center">
      <div className="w-full max-w-md px-4 py-6 flex flex-col">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Cycle Bloom</h1>
        </header>

        <main className="flex-1">
          {tab === "home" && (
            <div>Home content here</div>
          )}
          {tab === "calendar" && (
            <div>Calendar content here</div>
          )}
          {tab === "logs" && (
            <div>Logs content here</div>
          )}
        </main>

        <nav className="mt-4 bg-white rounded-3xl shadow-soft px-6 py-3">
          <div className="grid grid-cols-3 text-center text-sm">
            <button onClick={()=>setTab("home")} className={`flex flex-col items-center py-2 rounded-2xl ${tab==="home"?"bg-petal2 font-medium":""}`}>
              <Home size={18} />
              <span>Home</span>
            </button>
            <button onClick={()=>setTab("calendar")} className={`flex flex-col items-center py-2 rounded-2xl ${tab==="calendar"?"bg-petal2 font-medium":""}`}>
              <Calendar size={18} />
              <span>Calendar</span>
            </button>
            <button onClick={()=>setTab("logs")} className={`flex flex-col items-center py-2 rounded-2xl ${tab==="logs"?"bg-petal2 font-medium":""}`}>
              <Smile size={18} />
              <span>Logs</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
