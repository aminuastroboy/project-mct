import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Plus, Trash2, Edit } from 'lucide-react'

export default function App() {
  const [logs, setLogs] = useState([])
  const [cycleDay, setCycleDay] = useState('')

  const addLog = () => {
    if (!cycleDay) return
    setLogs([...logs, { id: Date.now(), day: cycleDay }])
    setCycleDay('')
  }

  const deleteLog = (id) => {
    setLogs(logs.filter(l => l.id !== id))
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <motion.h1 
        className="text-3xl font-bold text-pink-600 mb-4 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CalendarDays className="w-8 h-8"/> Menstrual Tracker
      </motion.h1>

      <div className="flex gap-2 mb-6">
        <input 
          type="number" 
          placeholder="Cycle Day" 
          className="border rounded-lg px-3 py-2 flex-1"
          value={cycleDay}
          onChange={e => setCycleDay(e.target.value)}
        />
        <button 
          onClick={addLog}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4"/> Add
        </button>
      </div>

      <div className="space-y-3">
        {logs.map(log => (
          <motion.div 
            key={log.id}
            className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span>Day {log.day}</span>
            <div className="flex gap-2">
              <button className="text-blue-500"><Edit className="w-4 h-4"/></button>
              <button onClick={() => deleteLog(log.id)} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
