import React from 'react'

export default function CycleRing({ day=1, total=28 }){
  const percent = Math.max(0, Math.min(100, (day/total)*100))
  const circumference = 2 * Math.PI * 80
  const dash = (circumference * percent) / 100
  return (
    <div className="cycle-ring">
      <svg width="220" height="220" viewBox="0 0 220 220">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="80" stroke="#fde8f6" strokeWidth="16" fill="none" />
        <circle cx="110" cy="110" r="80" stroke="url(#g1)" strokeWidth="16" fill="none"
          strokeDasharray={circumference} strokeDashoffset={circumference - dash} strokeLinecap="round" transform="rotate(-90 110 110)" />
      </svg>
      <div className="cycle-inner">
        <div style={{fontSize:18,fontWeight:700,color:'#111827'}}>Day {day}</div>
        <div className="small">of {total}</div>
      </div>
    </div>
  )
}
