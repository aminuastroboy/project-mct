import React, { useState } from 'react'

export default function App() {
  const [logs, setLogs] = useState([])

  const addLog = () => {
    const newLog = { id: Date.now(), date: new Date().toLocaleDateString() }
    setLogs([...logs, newLog])
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Menstrual Cycle Tracker</h1>
      <button onClick={addLog}>Add Log</button>
      <ul>
        {logs.map(log => (
          <li key={log.id}>{log.date}</li>
        ))}
      </ul>
    </div>
  )
}
