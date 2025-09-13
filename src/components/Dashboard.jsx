import React from 'react'
import LogCard from './LogCard'
import CycleChart from './CycleChart'

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <LogCard />
      <CycleChart />
    </div>
  )
}
