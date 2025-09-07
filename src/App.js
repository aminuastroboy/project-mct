import React, { useState, useEffect } from "react";

export default function App() {
  const [cycles, setCycles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cycles");
    if (saved) setCycles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cycles", JSON.stringify(cycles));
  }, [cycles]);

  const addCycle = () => {
    const today = new Date().toISOString().split("T")[0];
    const newCycle = { id: Date.now(), startDate: today };
    setCycles([newCycle, ...cycles]);
  };

  const startEditing = (id, currentDate) => {
    setEditingId(id);
    setEditDate(currentDate);
  };

  const saveEdit = (id) => {
    setCycles(cycles.map((c) => (c.id === id ? { ...c, startDate: editDate } : c)));
    setEditingId(null);
    setEditDate("");
  };

  const deleteCycle = (id) => setCycles(cycles.filter((c) => c.id !== id));

  const nextCycle =
    cycles.length > 0
      ? new Date(new Date(cycles[0].startDate).getTime() + 28 * 86400000)
          .toISOString()
          .split("T")[0]
      : "N/A";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay();

  const loggedDates = cycles.map((c) => c.startDate);
  const nextDate = nextCycle !== "N/A" ? nextCycle : null;

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`e${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = new Date(year, month, d).toISOString().split("T")[0];
      const isLogged = loggedDates.includes(dateStr);
      const isNext = nextDate === dateStr;
      days.push(
        <div key={d}
          className={`h-12 flex items-center justify-center rounded-lg text-sm 
            ${isLogged ? "bg-pink-400 text-white font-bold" : ""} 
            ${isNext ? "bg-purple-400 text-white font-bold" : ""} 
            ${!isLogged && !isNext ? "bg-pink-50" : ""}`}>
          {d}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🌸 Menstrual Cycle Tracker</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mb-6 text-center">
        <h2 className="text-xl font-semibold">Next Expected Period</h2>
        <p className="text-2xl font-bold text-pink-500 mt-2">{nextCycle}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {today.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <div className="grid grid-cols-7 gap-1 text-center text-gray-700 mb-2 font-medium">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
          <div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        <div className="flex gap-3 mt-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-pink-400 inline-block rounded"></span> Logged</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-purple-400 inline-block rounded"></span> Predicted</span>
        </div>
      </div>

      <button onClick={addCycle}
        className="mb-6 px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:bg-pink-700 transition">
        ➕ Add Period Start (Today)
      </button>

      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100"><th className="p-2 text-left">Start Date</th><th className="p-2">Actions</th></tr>
          </thead>
          <tbody>
            {cycles.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">
                  {editingId === c.id ? (
                    <input type="date" value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="border rounded p-1" />
                  ) : (c.startDate)}
                </td>
                <td className="p-2 flex gap-2">
                  {editingId === c.id ? (
                    <button onClick={() => saveEdit(c.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
                  ) : (
                    <button onClick={() => startEditing(c.id, c.startDate)}
                      className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                  )}
                  <button onClick={() => deleteCycle(c.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}