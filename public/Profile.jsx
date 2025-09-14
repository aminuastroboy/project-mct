import React, { useState, useEffect } from 'react'

export default function Profile({ onBack }){
  const [user, setUser] = useState({ name: 'Amina', email: '' })
  useEffect(()=> {
    const raw = localStorage.getItem('cc_user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  function logout(){
    localStorage.removeItem('cc_user')
    window.location.reload()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">A</div>
          <div>
            <div className="font-semibold">{user.username || user.name}</div>
            <div className="small">{user.email || 'amina@example.com'}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-700">Reminders</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div>
              <div className="font-medium">Period Start Reminder</div>
              <div className="small">Notify before period</div>
            </div>
            <div className="text-sm text-pink-600">On</div>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div>
              <div className="font-medium">Ovulation Reminder</div>
              <div className="small">Notify on ovulation day</div>
            </div>
            <div className="text-sm text-pink-600">On</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={logout} className="btn-primary">Logout</button>
      </div>
    </div>
  )
}
