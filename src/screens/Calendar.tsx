import React from 'react'

export default function Calendar(){
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 style={{margin:0}}>Mini Calendar</h3>
        <p style={{color:'#666'}}>Calendar UI placeholder — shows predicted period & fertile days when cycles added.</p>
      </div>
      <div className="card">
        <p style={{color:'#666'}}>You can tap a day to add or edit cycles (coming soon).</p>
      </div>
    </div>
  )
}
