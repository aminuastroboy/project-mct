import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Day 1', flow: 3 },
  { day: 'Day 2', flow: 2 },
  { day: 'Day 3', flow: 1 },
  { day: 'Day 4', flow: 2 },
  { day: 'Day 5', flow: 3 },
]

export default function CycleChart() {
  return (
    <div className="p-6 rounded-2xl bg-gray-900 shadow-xl">
      <h2 className="text-lg font-bold mb-4">Cycle Flow Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="flow" stroke="#00f5ff" strokeWidth={3} />
          <CartesianGrid stroke="#333" strokeDasharray="5 5" />
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
