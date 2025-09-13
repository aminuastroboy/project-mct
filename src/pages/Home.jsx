import React from 'react'
import CycleRing from '../components/CycleRing.jsx'
import InfoCard from '../components/InfoCard.jsx'

export default function Home(){
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="card flex-shrink-0 flex items-center justify-center">
          <CycleRing />
        </div>

        <div className="flex-1 space-y-4">
          <InfoCard title="Next period" value="In 5 days" />
          <InfoCard title="Cycle day" value="Day 12" />
          <InfoCard title="Fertile window" value="Sep 18 - Sep 23" />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Health Tips</h3>
        <p className="small mt-2">Stay hydrated and track any unusual symptoms. Use the logs to note cramps, mood, or other changes.</p>
      </div>
    </div>
  )
}
