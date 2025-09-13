import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export default function Profile(){
  const [user, setUser] = useLocalStorage('mct_user', { name: 'Amina', contact: 'amina@example.com' })
  // logs state not needed here except for reset option
  // const [, setLogs] = useLocalStorage('mct_logs', [])

  function logout(){
    localStorage.removeItem('mct_user')
    // keep logs by default
    window.location.reload()
  }

  function resetAll(){
    if (confirm('Reset all data? This cannot be undone.')){
      localStorage.removeItem('mct_logs')
      localStorage.removeItem('mct_user')
      window.location.reload()
    }
  }

  return (
    <div className="space-y-4">
      <div className="card flex items-center gap-4">
        <div style={{width:64,height:64,borderRadius:12,background:'linear-gradient(90deg,#6C63FF,#FF4D6D)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>A</div>
        <div>
          <div className="font-semibold text-lg">{user?.name}</div>
          <div className="small">{user?.contact}</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Settings</h3>
        <div className="mt-3 space-y-2">
          <div className="small">Cycle length: 28 days</div>
          <div className="small">Luteal phase: 14 days</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-primary" onClick={logout}>Logout</button>
        <button className="input" onClick={resetAll}>Reset Data</button>
      </div>
    </div>
  )
}
