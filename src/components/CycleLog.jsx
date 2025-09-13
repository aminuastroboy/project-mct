import React from "react";

export default function CycleLog({ logs }) {
  if (logs.length === 0) {
    return (
      <p className="text-gray-400 text-center">No logs yet. Start tracking today! 🌙</p>
    );
  }

  return (
    <ul className="space-y-2 max-h-60 overflow-y-auto">
      {logs.map((log, index) => (
        <li
          key={index}
          className="bg-gray-800 p-3 rounded-lg shadow flex justify-between items-center"
        >
          <span>{log.date}</span>
          <span className="text-primary font-semibold">Logged</span>
        </li>
      ))}
    </ul>
  );
}