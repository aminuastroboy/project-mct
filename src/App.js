import React, { useEffect, useMemo, useState } from "react";

/** ----------------------- persistence ----------------------- **/
const CYCLES_KEY = "cb_cycles_v1";
const LOGS_KEY = "cb_logs_v1"; // by date

const load = (k, fallback) => {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/** ----------------------- date helpers ----------------------- **/
const iso = (d) => new Date(d).toISOString().split("T")[0];
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const between = (d, a, b) => d >= iso(a) && d <= iso(b);
const daysSince = (start) => Math.floor((new Date() - new Date(start)) / 86400000) + 1;

/** ----------------------- UI ----------------------- **/
export default function App() {
  const [tab, setTab] = useState("home"); // home | calendar | logs
  const [cycles, setCycles] = useState(() => load(CYCLES_KEY, []));
  const [logs, setLogs] = useState(() => load(LOGS_KEY, {})); // { [isoDate]: {mood,cramps,flow,energy} }
  const PERIOD_DAYS = 5;

  useEffect(() => save(CYCLES_KEY, cycles), [cycles]);
  useEffect(() => save(LOGS_KEY, logs), [logs]);

  // last start
  const lastStart = cycles[0]?.startDate || null;
  const todayISO = iso(new Date());

  // day-of-period on home
  const dayOfPeriod = useMemo(() => {
    if (!lastStart) return null;
    const end = iso(addDays(lastStart, PERIOD_DAYS - 1));
    if (between(todayISO, lastStart, end)) return daysSince(lastStart);
    return null;
  }, [lastStart, todayISO]);

  // predicted next start (simple 28-day assumption or average gap if available)
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
    // avoid duplicate same-day
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
            <Home
              dayOfPeriod={dayOfPeriod}
              predictedNext={predictedNext}
              onAddStart={addTodayStart}
            />
          )}
          {tab === "calendar" && (
            <Calendar
              cycles={cycles}
              periodDays={PERIOD_DAYS}
              avgCycleLen={avgCycleLen}
              onEdit={updateCycleDate}
              onDelete={deleteCycle}
            />
          )}
          {tab === "logs" && (
            <Logs
              dateISO={todayISO}
              data={logs[todayISO] || {}}
              onChange={(patch) => setLogs(prev => ({ ...prev, [todayISO]: { ...(prev[todayISO]||{}), ...patch } }))}
            />
          )}
        </main>

        <nav className="mt-4 bg-white rounded-3xl shadow-soft px-6 py-3">
          <div className="grid grid-cols-3 text-center text-sm">
            <button onClick={()=>setTab("home")} className={\`py-2 rounded-2xl \${tab==="home"?"bg-petal2 font-medium":""}\`}>🏠 Home</button>
            <button onClick={()=>setTab("calendar")} className={\`py-2 rounded-2xl \${tab==="calendar"?"bg-petal2 font-medium":""}\`}>🗓️ Calendar</button>
            <button onClick={()=>setTab("logs")} className={\`py-2 rounded-2xl \${tab==="logs"?"bg-petal2 font-medium":""}\`}>🙂 Logs</button>
          </div>
        </nav>
      </div>
    </div>
  );
}

/** ----------------------- Home ----------------------- **/
function Home({ dayOfPeriod, predictedNext, onAddStart }) {
  const today = new Date().toLocaleDateString(undefined, { weekday:"long", month:"short", day:"numeric" });
  return (
    <div className="space-y-5">
      <div className="text-center text-[15px] text-gray-600">{today}</div>

      <div className="card relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-petal2" />
        <div className="flex flex-col items-center py-6">
          <FlowerRing value={dayOfPeriod ?? 0} showValue={dayOfPeriod !== null}/>
          <div className="mt-3 text-center">
            {dayOfPeriod !== null ? (
              <>
                <div className="text-4xl font-bold text-rose-500">{dayOfPeriod}</div>
                <div className="text-sm text-gray-600">Day of Period</div>
              </>
            ) : (
              <div className="text-sm text-gray-600">Next period around <span className="font-medium">{predictedNext}</span></div>
            )}
          </div>
        </div>
        <button onClick={onAddStart} className="btn btn-primary absolute right-4 bottom-4 shadow-soft">＋</button>
      </div>
    </div>
  );
}

function FlowerRing({ value, showValue }) {
  return (
    <div className="w-48 h-48 rounded-full border-8 border-rose-300 relative flex items-center justify-center">
      <svg width="60" height="60" viewBox="0 0 100 100" className="absolute -top-2">
        <path d="M50 60c0-12 7-19 12-24-5 0-9 2-12 6-3-4-7-6-12-6 5 5 12 12 12 24z" fill="#7c3aed"/>
      </svg>
      {showValue ? <span className="text-5xl font-bold text-rose-500">{value}</span> : <span className="text-lg text-gray-500">No period logged</span>}
    </div>
  );
}

/** ----------------------- Calendar ----------------------- **/
function Calendar({ cycles, periodDays, avgCycleLen, onEdit, onDelete }) {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const start = new Date(y, m, 1);
  const end = new Date(y, m + 1, 0);
  const firstDow = start.getDay();
  const days = end.getDate();

  // Build sets for period & predicted fertile
  const periodSet = new Set();
  cycles.forEach(c => {
    const s = new Date(c.startDate);
    for (let i=0;i<periodDays;i++){
      const d = iso(addDays(s, i));
      periodSet.add(d);
    }
  });

  // Fertile window: around projected ovulation from last cycle in visible month
  let fertileSet = new Set();
  if (cycles.length) {
    const last = new Date(cycles[0].startDate);
    const ovulation = addDays(last, Math.round(avgCycleLen/2));
    for (let i=-2;i<=2;i++) {
      fertileSet.add(iso(addDays(ovulation, i)));
    }
  }

  const grid = [];
  for (let i=0;i<firstDow;i++) grid.push(null);
  for (let d=1; d<=days; d++) grid.push(new Date(y,m,d));

  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="text-center text-lg font-semibold mb-4">Calendar</h2>
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
          {["S","M","T","W","T","F","S"].map((x)=> <div key={x} className="py-1">{x}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {grid.map((d,i)=>{
            if(!d) return <div key={\`e\${i}\`} />;
            const dISO = iso(d);
            const isPeriod = periodSet.has(dISO);
            const isFertile = fertileSet.has(dISO);
            return (
              <div key={dISO} className="h-14 rounded-2xl bg-white flex flex-col items-center justify-center border border-purple-100">
                <div className="text-sm">{d.getDate()}</div>
                <div className="flex gap-1 mt-1">
                  {isPeriod && <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />}
                  {isFertile && <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span className="badge bg-rose-100"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Period</span>
          <span className="badge bg-emerald-100"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Fertile</span>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Recent Entries</h3>
        <ul className="space-y-2">
          {cycles.length === 0 && <li className="text-sm text-gray-500">No entries yet.</li>}
          {cycles.map(c => (
            <li key={c.id} className="flex items-center justify-between bg-petal2 rounded-2xl p-3">
              <span className="text-sm">{c.startDate}</span>
              <span className="flex items-center gap-2">
                <input type="date" className="border rounded-lg px-2 py-1 text-sm"
                       defaultValue={c.startDate} onChange={(e)=>onEdit(c.id, e.target.value)} />
                <button onClick={()=>onDelete(c.id)} className="text-rose-600 text-sm">Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** ----------------------- Logs ----------------------- **/
function Logs({ dateISO, data, onChange }) {
  const Row = ({icon,label,children}) => (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow-soft px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-petal2 flex items-center justify-center text-lg">{icon}</div>
        <div className="font-medium">{label}</div>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-gray-600">Logs for <span className="font-medium">{dateISO}</span></div>

      <Row icon="🙂" label="Mood">
        <select className="border rounded-xl px-3 py-2 text-sm"
                value={data.mood || ""} onChange={e=>onChange({mood:e.target.value})}>
          <option value="">Select</option>
          <option>Happy</option><option>Calm</option><option>Moody</option><option>Sad</option>
        </select>
      </Row>

      <Row icon="⚡" label="Cramps">
        <select className="border rounded-xl px-3 py-2 text-sm"
                value={data.cramps || ""} onChange={e=>onChange({cramps:e.target.value})}>
          <option value="">None</option>
          <option>Mild</option><option>Moderate</option><option>Severe</option>
        </select>
      </Row>

      <Row icon="💧" label="Flow">
        <select className="border rounded-xl px-3 py-2 text-sm"
                value={data.flow || ""} onChange={e=>onChange({flow:e.target.value})}>
          <option value="">None</option>
          <option>Light</option><option>Medium</option><option>Heavy</option>
        </select>
      </Row>

      <Row icon="☀️" label="Energy">
        <select className="border rounded-xl px-3 py-2 text-sm"
                value={data.energy || ""} onChange={e=>onChange({energy:e.target.value})}>
          <option value="">Select</option>
          <option>Low</option><option>Normal</option><option>High</option>
        </select>
      </Row>
    </div>
  );
}
