import React from 'react'
import CycleRing from '../components/CycleRing.jsx'
import InfoCard from '../components/InfoCard.jsx'

export default function Home({ logs, addLog }){
  return (
    <div>
      <div className="card mb-6 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          <CycleRing />
          <div>
            <h2 className="text-xl font-semibold">Welcome back, Amina</h2>
            <div className="small mt-1">Next period predicted in <strong>5 days</strong></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={()=>{}}>Add Log</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard title="Cycle Day" value="12" subtitle="Current day in cycle" />
        <InfoCard title="Ovulation" value="Sep 20" subtitle="Estimated" />
        <InfoCard title="Average length" value="28 days" subtitle="User setting" />
      </div>
    </div>
  )
}
