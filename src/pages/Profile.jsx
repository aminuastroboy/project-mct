import React from 'react'

export default function Profile({ user, setUser, logout, setLogs }){

  function resetAll(){
    if(confirm('Reset all logs and settings? This cannot be undone.')){
      setLogs([])
      setUser({ name: 'Amina', email: 'amina@example.com' })
      alert('Reset complete')
    }
  }

  return (
    <div>
      <div className="card mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-400 flex items-center justify-center text-white font-bold">A</div>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="small">{user?.email}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" onClick={logout}>Logout</button>
          <button className="input" onClick={resetAll}>Reset Data</button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Settings</h3>
        <div className="small">Cycle length: 28 days</div>
      </div>
    </div>
  )
}
