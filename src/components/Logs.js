import React, { useState } from "react";

export const Logs = ({ logs, addLog, deleteLog }) => {
  const [date, setDate] = useState("");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Cycle Logs</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <button
          onClick={() => {
            if (date) {
              addLog(date);
              setDate("");
            }
          }}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="flex justify-between items-center">
            <span>{log.date}</span>
            <button
              onClick={() => deleteLog(log.id)}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
