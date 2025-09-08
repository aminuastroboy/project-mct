import React, { useState } from 'react'
import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Insights from './screens/Insights'
import ErrorBoundary from './utils/ErrorBoundary'

export default function App(){
  const [tab, setTab] = useState<'home'|'calendar'|'insights'>('home')

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="header card" style={{marginTop:20}}>
          <div style={{fontSize:20, fontWeight:700}}>🌸 Menstrual Tracker</div>
          <div style={{fontSize:14, color:'#444'}}>v2 — private demo</div>
        </header>

        <main style={{maxWidth:900, margin:'22px auto', padding:'0 12px', flex:1}}>
          {tab==='home' && <Home />}
          {tab==='calendar' && <Calendar />}
          {tab==='insights' && <Insights />}
        </main>

        <nav className="bottom-nav" role="navigation" aria-label="main nav">
          <button className={`btn ${tab==='home' ? 'active' : ''}`} onClick={()=>setTab('home')}><span role="img" aria-label="home">🏠</span> Home</button>
          <button className={`btn ${tab==='calendar' ? 'active' : ''}`} onClick={()=>setTab('calendar')}><span role="img" aria-label="calendar">🗓️</span> Calendar</button>
          <button className={`btn ${tab==='insights' ? 'active' : ''}`} onClick={()=>setTab('insights')}><span role="img" aria-label="insights">📊</span> Insights</button>
        </nav>
      </div>
    </ErrorBoundary>
  )
}
