import React from 'react'

export default function CycleRing({ day=1, total=28 }){
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(100, Math.round((day/total)*100)))
  const offset = circumference - (circumference * percent / 100)
  return (
    <div className="cycle-ring card flex flex-col items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#fbcfe8" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={radius} stroke="#fee2ec" strokeWidth="16" fill="none" />
        <circle cx="100" cy="100" r={radius} stroke="url(#g)" strokeWidth="16" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold text-pink-600">Day {day}</div>
        <div className="small mt-1">of {total}</div>
      </div>
    </div>
  )
}
