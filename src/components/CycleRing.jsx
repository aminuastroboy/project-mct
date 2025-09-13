import React from 'react'

export default function CycleRing(){
  return (
    <div className="calendar-ring" role="img" aria-label="cycle ring">
      <div style={{display:'grid',placeItems:'center'}}>
        <div className="text-center">
          <div className="text-sm small">Cycle Day</div>
          <div className="text-2xl font-bold" style={{color:'#fff'}}>12</div>
        </div>
      </div>
    </div>
  )
}
