import React, { useState } from 'react'

export default function Logs() {
  const [logs, setLogs] = useState([
    { id: 1, text: "Day 10 - Mild cramps" },
    { id: 2, text: "Day 11 - Feeling good" },
  ])

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Your Logs</h2>
      {logs.map(log => (
        <div key={log.id} className="p-3 bg-gray-800 rounded-lg shadow">
          {log.text}
        </div>
      ))}
    </div>
  )
}