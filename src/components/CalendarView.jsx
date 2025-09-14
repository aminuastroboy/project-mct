import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDate } from 'date-fns'

export default function CalendarView({ year, month, marked={} }){
  // month: 0-indexed
  const start = startOfMonth(new Date(year, month, 1))
  const end = endOfMonth(start)
  const days = eachDayOfInterval({ start, end })
  return (
    <div className="card p-3">
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>(
          <div key={d} className="text-xs text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map(d=>{
          const day = getDate(d)
          const key = `${d.getFullYear()}-${d.getMonth()+1}-${day}`
          const m = marked[key]
          const classes = m ? (m.type==='period'?'bg-pink-100':'') : ''
          return (
            <div key={key} className={`p-2 rounded-lg ${m? (m.type==='period'?'bg-pink-100':'bg-green-100') :'bg-white'} shadow`}>
              <div className="text-sm font-medium">{day}</div>
              {m && <div className="text-xs mt-1">{m.label}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
