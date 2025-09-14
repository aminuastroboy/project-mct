import React, { useState, useEffect } from 'react'
import CycleRing from '../components/CycleRing'
import HealthTips from '../components/HealthTips'
import { parseISO, differenceInDays } from 'date-fns'
import { nextPeriodStart, ovulationDay, fertileWindow } from '../utils/cycleCalculator'

export default function Home(){
  const [cycleStart, setCycleStart] = useState(null)
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  const [today, setToday] = useState(new Date())

  useEffect(()=> {
    const cs = localStorage.getItem('cc_cycleStart')
    const cl = localStorage.getItem('cc_cycleLength')
    const pl = localStorage.getItem('cc_periodLength')
    setCycleStart(cs ? parseISO(cs) : null)
    if(cl) setCycleLength(Number(cl))
    if(pl) setPeriodLength(Number(pl))
  },[])

  function saveSettings(e){
    e.preventDefault()
    if(cycleStart) localStorage.setItem('cc_cycleStart', cycleStart.toISOString().slice(0,10))
    localStorage.setItem('cc_cycleLength', cycleLength)
    localStorage.setItem('cc_periodLength', periodLength)
    alert('Saved')
  }

  let nextPeriod = null
  let ov = null
  let fertile = null
  if(cycleStart){
    nextPeriod = nextPeriodStart(cycleStart, cycleLength)
    ov = ovulationDay(cycleStart, cycleLength)
    fertile = fertileWindow(cycleStart, cycleLength)
  }

  const progressDay = cycleStart ? (differenceInDays(today, cycleStart) % cycleLength) + 1 : 1

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-600">Home</h2>
        <div className="small">Welcome</div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <CycleRing day={progressDay} total={cycleLength} />
        {nextPeriod ? (
          <div className="text-center">
            <div className="font-semibold text-pink-600">Next Period: {nextPeriod.toISOString().slice(0,10)}</div>
            <div className="small mt-1">{Math.max(0, differenceInDays(nextPeriod, today))} days remaining</div>
            <div className="small mt-1">Ovulation: {ov.toISOString().slice(0,10)}</div>
          </div>
        ) : (
          <div className="small">No cycle start set. Add a period log to enable predictions.</div>
        )}
      </div>

      <HealthTips />

      <form onSubmit={saveSettings} className="card mt-2">
        <h3 className="font-semibold text-gray-700">Cycle Settings</h3>
        <label className="small mt-2">Last Period Start</label>
        <input type="date" value={cycleStart? cycleStart.toISOString().slice(0,10):''} onChange={e=>setCycleStart(e.target.value? new Date(e.target.value): null)} className="mt-1 p-2 border rounded w-full" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <label className="small">Cycle Length</label>
            <input type="number" min="20" max="40" value={cycleLength} onChange={e=>setCycleLength(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
          <div className="flex-1">
            <label className="small">Period Length</label>
            <input type="number" min="2" max="10" value={periodLength} onChange={e=>setPeriodLength(e.target.value)} className="mt-1 p-2 border rounded w-full" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="btn-primary" type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  )
}
