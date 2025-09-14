import React, { useState, useEffect } from 'react'
import { addDays } from 'date-fns'

export default function Calendar(){
  const [logs, setLogs] = useState([])
  const [cycleStart, setCycleStart] = useState(null)

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('cc_logs')||'[]')
    setLogs(saved)
    const cs = localStorage.getItem('cycleStart')
    if (cs) setCycleStart(new Date(cs))
  },[])

  const cycleLength = 28, periodLen = 5
  const today = new Date()
  const year = today.getFullYear(), month = today.getMonth()
  const daysInMonth = new Date(year, month+1, 0).getDate()

  const loggedDays = logs.map(l=> new Date(l.date).getDate())

  let predicted = []
  if (cycleStart){
    let next = new Date(cycleStart)
    // advance until within current month or beyond
    while (next.getMonth() < month) next = addDays(next, cycleLength)
    // collect period days for that cycle and maybe next
    for (let i=0;i<periodLen;i++){
      const d = addDays(next, i)
      if (d.getMonth()===month) predicted.push(d.getDate())
    }
    // ovulation = +14
    const ov = addDays(next,14)
    var ovDay = ov.getMonth()===month ? ov.getDate() : null
  }

  const cells = Array.from({length: daysInMonth}, (_,i)=>i+1)

  return (
    <div className="space-y-3">
      <div className="card p-3">
        <h3 style={{fontWeight:700,color:'#6b7280'}}>Calendar</h3>
        <div className="grid grid-cols-7 gap-2 mt-3 text-center">
          {cells.map(d=>{
            const isToday = d===today.getDate()
            const isLogged = loggedDays.includes(d)
            const isPred = predicted.includes(d)
            const isOv = typeof ovDay==='number' && ovDay===d
            return (
              <div key={d} className="p-2 rounded-lg shadow" style={{background: isToday? '#fde8f6': isLogged? '#d1fae5': isPred? '#fff1f2':'#fff'}}>
                <div style={{fontWeight:isToday?700:500}}>{d}</div>
                <div className="small">
                  {isOv? '🌸':''}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="small">Legend: 🌸 = predicted ovulation, pink = predicted period, green = logged day</div>
    </div>
  )
}
