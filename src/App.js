import React, {useState, useEffect} from 'react';
import Home from './Home';
import CalendarView from './Calendar';
import Logs from './Logs';

export default function App(){
  const [tab,setTab]=useState('home');
  return (
    <div className="min-h-screen flex flex-col bg-animated">
      <div className="flex-1 overflow-y-auto">
        {tab==='home' && <Home/>}
        {tab==='calendar' && <CalendarView/>}
        {tab==='logs' && <Logs/>}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button onClick={()=>setTab('home')} className={`py-2 rounded-2xl ${tab==='home'?'bg-petal2 text-white':''}`}>🏠 Home</button>
          <button onClick={()=>setTab('calendar')} className={`py-2 rounded-2xl ${tab==='calendar'?'bg-petal2 text-white':''}`}>📅 Calendar</button>
          <button onClick={()=>setTab('logs')} className={`py-2 rounded-2xl ${tab==='logs'?'bg-petal2 text-white':''}`}>📜 Logs</button>
        </div>
      </nav>
    </div>
  )
}
