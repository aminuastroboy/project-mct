import React, { useState } from "react"
import { motion } from "framer-motion"
import Header from "./components/Header"
import CycleCard from "./components/CycleCard"
import AddLogForm from "./components/AddLogForm"
import LogsList from "./components/LogsList"
import CircleVisualizer from "./components/CircleVisualizer"

export default function App() {
  const [logs, setLogs] = useState([])

  const addLog = (log) => {
    setLogs((prev) => [...prev, { ...log, id: Date.now() }])
  }

  const deleteLog = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl space-y-6"
      >
        <CycleCard logs={logs} />
        <CircleVisualizer logs={logs} />
        <AddLogForm addLog={addLog} />
        <LogsList logs={logs} deleteLog={deleteLog} />
      </motion.div>
    </div>
  )
}
