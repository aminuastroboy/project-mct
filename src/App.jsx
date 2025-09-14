import React, { useEffect, useState } from 'react'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Logs from './pages/Logs'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import InstallButton from './components/InstallButton'

export default function App(){
  const [showSplash, setShowSplash] = useState(true)
  const [user, setUser] = useState(null)
  const [active, setActive] = useState('home')

  useEffect(()=> {
    const raw = localStorage.getItem('cc_user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  if(showSplash) return <Splash onFinish={()=>setShowSplash(false)} />
  if(!user) return <Login onLogin={(u)=>{ setUser(u); localStorage.setItem('cc_user', JSON.stringify(u)) }} />

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-xl mx-auto">
        {active==='home' && <Home />}
        {active==='calendar' && <Calendar />}
        {active==='logs' && <Logs />}
        <div id="profile" className="mt-6"><Profile /></div>
      </div>

      <BottomNav active={active} setActive={setActive} />
      <InstallButton />
    </div>
  )
}
