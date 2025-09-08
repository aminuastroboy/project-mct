import React, { useState } from "react";

function CycleLog({ logs, setLogs }) {
  const [date, setDate] = useState("");

  const addLog = () => {
    if (!date) return;
    setLogs([...logs, { date }]);
    setDate("");
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2">Cycle Logs</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />
      <button onClick={addLog} className="bg-pink-400 text-white rounded px-4 py-2">Add Log</button>

      <ul className="mt-4 space-y-1">
        {logs.map((log, idx) => (
          <li key={idx} className="text-sm text-gray-700">🌸 {log.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default CycleLog;
