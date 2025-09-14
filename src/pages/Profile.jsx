import React from 'react'

export default function Profile(){
  const user = JSON.parse(localStorage.getItem('cc_user')||'{}')
  function logout(){
    localStorage.removeItem('cc_user')
    window.location.reload()
  }
  return (
    <div id="profile" className="space-y-4">
      <div className="card flex items-center gap-4">
        <div style={{width:64,height:64,borderRadius:14,background:'linear-gradient(90deg,#fbcfe8,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center'}}>🌸</div>
        <div>
          <div style={{fontWeight:700}}>{user.name || user.username || 'Amina'}</div>
          <div className="small">{user.username || ''}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{fontWeight:700,color:'#6b7280'}}>Reminders</h3>
        <div className="mt-2 space-y-2">
          <div className="p-3 rounded-xl" style={{background:'#fff7f9'}}>
            <div style={{fontWeight:700}}>Period Start Reminder</div>
            <div className="small">On</div>
          </div>
          <div className="p-3 rounded-xl" style={{background:'#fff7f9'}}>
            <div style={{fontWeight:700}}>Ovulation Reminder</div>
            <div className="small">On</div>
          </div>
          <div className="p-3 rounded-xl" style={{background:'#fff7f9'}}>
            <div style={{fontWeight:700}}>Medication Reminder</div>
            <div className="small">Off</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn-primary" onClick={logout}>Logout</button>
        <button className="p-3 rounded-lg border" onClick={()=>{ localStorage.removeItem('cc_logs'); localStorage.removeItem('cycleStart'); alert('Data reset') }}>Reset Data</button>
      </div>
    </div>
  )
}
