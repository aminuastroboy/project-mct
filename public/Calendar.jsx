import React, { useEffect, useState } from 'react'
import CalendarView from '../components/CalendarView'
import { parseISO } from 'date-fns'
import { nextPeriodStart, ovulationDay, fertileWindow } from '../utils/cycleCalculator'

export default function Calendar(){
  const [cycleStart, setCycleStart] = useState(null)
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  useEffect(()=> {
    const cs = localStorage.getItem('cc_cycleStart')
    const cl = localStorage.getItem('cc_cycleLength')
    const pl = localStorage.getItem('cc_periodLength')
    setCycleStart(cs ? parseISO(cs) : null)
    if(cl) setCycleLength(Number(cl))
    if(pl) setPeriodLength(Number(pl))
  },[])

  // build marked map for current month
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const marked = {}
  if(cycleStart){
    // mark each period block for several cycles
    let start = cycleStart
    for(let i=0;i<6;i++){
      const pStart = nextPeriodStart(start, cycleLength)
      for(let d=0; d<periodLength; d++){
        const dt = new Date(pStart); dt.setDate(pStart.getDate()+d)
        const key = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`
        marked[key] = { type: 'period', label: 'Period' }
      }
      // fertile window
      const fw = fertileWindow(start, cycleLength)
      for(let dt=new Date(fw.start); dt<=fw.end; dt.setDate(dt.getDate()+1)){
        const key = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`
        if(!marked[key]) marked[key] = { type: 'fertile', label: 'Fertile' }
      }
      // ovulation
      const ov = ovulationDay(start, cycleLength)
      const keyOv = `${ov.getFullYear()}-${ov.getMonth()+1}-${ov.getDate()}`
      marked[keyOv] = { type: 'ovulation', label: 'Ovulation' }

      start = pStart
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-600">Calendar</h2>
      </div>
      <CalendarView year={year} month={month} marked={marked} />
    </div>
  )
}
