import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./components/Card";
import { Logs } from "./components/Logs";
import { Insights } from "./components/Insights";
import { Reminder } from "./components/Reminder";

function App() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("cycleLogs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cycleLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (date) => {
    const newLog = { id: Date.now(), date };
    setLogs([...logs, newLog]);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-center"
      >
        Menstrual Cycle Tracker
      </motion.h1>

      <Card>
        <Logs logs={logs} addLog={addLog} deleteLog={deleteLog} />
      </Card>

      <Card>
        <Insights logs={logs} />
      </Card>

      <Card>
        <Reminder />
      </Card>
    </div>
  );
}

export default App;
