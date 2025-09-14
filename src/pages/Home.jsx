import React from 'react'
import CycleRing from '../components/CycleRing.jsx'
import { format, addDays } from 'date-fns'

const tips = [
  "Drink enough water today 💧",
  "Eat fruits and veggies 🍎🥦",
  "Get at least 7 hours of sleep 😴",
  "Light exercise boosts mood 🏃‍♀️",
]
const messages = [
  "You're stronger than you think 🌸",
  "Take care of yourself, always ❤️",
  "Every day is a fresh start 🌞",
  "Your health matters most 🌺",
]

export default function Home({ user }){
  const today = new Date()
  const tip = tips[today.getDate() % tips.length]
  const msg = messages[today.getDate() % messages.length]

  // Get cycle info (if any)
  const cycleStart = localStorage.getItem('cycleStart')
  const nextOv = cycleStart ? format(addDays(new Date(cycleStart), 14), 'MMM d') : '—'

  return (
    <div className="space-y-4">
      <div className="card text-center">
        <CycleRing day={3} total={28} />
        <div className="mt-3 font-semibold" style={{color:'#ec4899'}}>Day 3 of 28</div>
        <div className="small mt-1">Next Ovulation: <span style={{color:'#ec4899',fontWeight:700}}>{nextOv} 🌸</span></div>
      </div>

      <div className="card">
        <h3 style={{fontWeight:700,color:'#6b7280'}}>Health Tip</h3>
        <p className="mt-2">{tip}</p>
      </div>

      <div className="card" style={{background:'#fff0f6'}}>
        <p style={{fontWeight:700,color:'#ec4899'}}>{msg}</p>
      </div>
    </div>
  )
}
