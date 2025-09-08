import React from 'react'
import InsightsSmall from '../widgets/InsightsSmall'
import HealthTips from '../widgets/HealthTips'
import Reminders from '../widgets/Reminders'

export default function Insights(){
  const cycles = JSON.parse(localStorage.getItem('cycles')||'[]')
  return (
    <div className="space-y-4">
      <div className="card">
        <InsightsSmall cycles={cycles} />
      </div>
      <div className="card">
        <HealthTips />
      </div>
      <div className="card">
        <Reminders />
      </div>
    </div>
  )
}
