import React, { useEffect, useState } from 'react'
import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Insights from './screens/Insights'
import ErrorBoundary from './utils/ErrorBoundary'

export default function App(){
  const [tab, setTab] = useState('home')

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="header card" style={{marginTop:12}}>
          <div className="brand">🌸 Menstrual Tracker</div>
          <div className="small-muted">demo</div>
        </header>

        <main style={{paddingTop:12}}>
          {tab==='home' && <Home />}
          {tab==='calendar' && <Calendar />}
          {tab==='insights' && <Insights />}
        </main>

        <div style={{height:90}} />
        <nav className="nav" role="navigation" aria-label="main nav">
          <button className={`btn ${tab==='home'?'active':''}`} onClick={()=>setTab('home')}>🏠 Home</button>
          <button className={`btn ${tab==='calendar'?'active':''}`} onClick={()=>setTab('calendar')}>📅 Calendar</button>
          <button className={`btn ${tab==='insights'?'active':''}`} onClick={()=>setTab('insights')}>📊 Insights</button>
        </nav>
      </div>
    </ErrorBoundary>
  )
}
