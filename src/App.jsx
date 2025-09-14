import React, { useState, useEffect } from 'react'
import Splash from './pages/Splash.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Calendar from './pages/Calendar.jsx'
import Logs from './pages/Logs.jsx'
import Navbar from './components/Navbar.jsx'

export default function App(){
  const [showSplash, setShowSplash] = useState(true)
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('home')

  useEffect(()=>{
    const saved = localStorage.getItem('cc_user')
    if (saved) setUser(JSON.parse(saved))
  },[])

  if (showSplash) return <Splash onFinish={()=>setShowSplash(false)} />

  if (!user) return <Login onLogin={(u)=>{ localStorage.setItem('cc_user', JSON.stringify(u)); setUser(u) }} />

  return (
    <div className="app-shell">
      <div className="container">
        {tab==='home' && <Home user={user} />}
        {tab==='calendar' && <Calendar />}
        {tab==='logs' && <Logs />}
      </div>

      <Navbar tab={tab} setTab={setTab} />
    </div>
  )
}
