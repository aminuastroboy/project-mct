import React, { useEffect, useMemo, useState } from "react";
import { Home, Calendar, Smile, PlusCircle } from "lucide-react";

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

  /** ---------------- Home Screen ---------------- **/
  const HomeScreen = () => (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg font-medium">{new Date().toDateString()}</p>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="80" cy="80" r="70" stroke="#fde8ef" strokeWidth="16" fill="none"/>
          <circle cx="80" cy="80" r="70" stroke="#f4a6c6" strokeWidth="16" fill="none"
            strokeDasharray={440} strokeDashoffset={dayOfPeriod ? 440 - (dayOfPeriod / PERIOD_DAYS) * 440 : 440}
            strokeLinecap="round"/>
        </svg>
        {dayOfPeriod ? (
          <div className="text-center">
            <div className="text-3xl font-bold">{dayOfPeriod}</div>
            <div className="text-sm text-gray-600">Day of Period</div>
          </div>
        ) : (
          <div className="text-center text-gray-600">Not on period</div>
        )}
      </div>
      <button onClick={addTodayStart} className="btn btn-primary flex items-center gap-2">
        <PlusCircle size={18}/> Log Period Start
      </button>
      <p className="text-sm text-gray-600">Predicted Next: {predictedNext}</p>
    </div>
  );

  /** ---------------- Calendar Screen ---------------- **/
  const CalendarScreen = () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const days = [];
    for (let i = 1; i <= monthEnd.getDate(); i++) days.push(new Date(today.getFullYear(), today.getMonth(), i));

    // Mark period & fertile
    const periodDays = new Set();
    const fertileDays = new Set();
    cycles.forEach(c => {
      for (let i = 0; i < PERIOD_DAYS; i++) periodDays.add(iso(addDays(c.startDate, i)));
      const fertile = addDays(c.startDate, 14);
      for (let i = -2; i <= 2; i++) fertileDays.add(iso(addDays(fertile, i)));
    });

    return (
      <div>
        <h2 className="text-center font-semibold mb-2">
          {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
        </h2>
        <div className="grid grid-cols-7 text-center text-xs mb-1 text-gray-500">
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {Array(monthStart.getDay()).fill(null).map((_,i)=><div key={"b"+i}></div>)}
          {days.map(d=>{
            const dISO = iso(d);
            const isPeriod = periodDays.has(dISO);
            const isFertile = fertileDays.has(dISO);
            return (
              <div key={dISO} className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto 
                ${isPeriod?"bg-rose-300 text-white":isFertile?"bg-mint text-white":""}`}>
                {d.getDate()}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 justify-center mt-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-rose-300"></span>Period</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-mint"></span>Fertile</span>
        </div>
      </div>
    );
  };

  /** ---------------- Logs Screen ---------------- **/
  const categories = ["Mood", "Cramps", "Flow", "Energy"];
  const LogsScreen = () => {
    const todayLog = logs[todayISO] || {};
    const toggle = (cat) => {
      setLogs({ ...logs, [todayISO]: { ...todayLog, [cat]: !todayLog[cat] } });
    };
    return (
      <div className="space-y-3">
        {categories.map(c=>(
          <button key={c} onClick={()=>toggle(c)}
            className={`w-full card flex justify-between ${todayLog[c]?"bg-petal2":""}`}>
            <span>{c}</span>
            <span>{todayLog[c]?"✓":""}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-petal text-[color:var(--ink)] flex items-stretch justify-center">
      <div className="w-full max-w-md px-4 py-6 flex flex-col">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Cycle Bloom</h1>
        </header>

        <main className="flex-1">
          {tab === "home" && <HomeScreen/>}
          {tab === "calendar" && <CalendarScreen/>}
          {tab === "logs" && <LogsScreen/>}
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
