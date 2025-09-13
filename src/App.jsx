import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Flower2, CalendarDays, User } from 'lucide-react'
import Cycle from './components/Cycle'
import Logs from './components/Logs'
import Profile from './components/Profile'

const tabs = [
  { id: 'cycle', icon: <Flower2 size={24} />, component: <Cycle /> },
  { id: 'logs', icon: <CalendarDays size={24} />, component: <Logs /> },
  { id: 'profile', icon: <User size={24} />, component: <Profile /> },
]

export default function App() {
  const [active, setActive] = useState('cycle')

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find(t => t.id === active)?.component}
        </motion.div>
      </div>
      <nav className="h-16 bg-gray-900 border-t border-gray-700 flex justify-around items-center">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`p-2 rounded-full transition ${
              active === t.id ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            {t.icon}
          </button>
        ))}
      </nav>
    </div>
  )
}