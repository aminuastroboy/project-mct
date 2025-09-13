import React from 'react'

export default function CycleRing(){
  const petals = Array.from({length:12}).map((_,i)=>i) // 12 petals
  const centerText = 'Day 12'

  return (
    <div className="cycle-ring" style={{width:240,height:240}}>
      {petals.map((p,idx)=>{
        const angle = (idx / petals.length) * Math.PI * 2 - Math.PI/2
        const r = 100
        const x = Math.cos(angle) * r + 120 - 10
        const y = Math.sin(angle) * r + 120 - 10
        return <div key={idx} className="pet" style={{left: x, top: y, width: 18, height: 18, background: idx<3 ? 'rgba(255,77,109,0.9)' : 'rgba(108,99,255,0.9)'}} />
      })}

      <div className="inner">
        <div style={{fontSize:18, fontWeight:700, color:'#fff'}}>{centerText}</div>
        <div className="small mt-1">Next in 5 days</div>
      </div>
    </div>
  )
}
