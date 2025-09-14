import React from 'react'
import { Home, Calendar, List } from 'lucide-react'

export default function Navbar({ tab, setTab }){
  const items = [
    { id:'home', icon: <Home size={18} />, label:'Home' },
    { id:'calendar', icon: <Calendar size={18} />, label:'Calendar' },
    { id:'logs', icon: <List size={18} />, label:'Logs' },
  ]

  return (
    <div className="navbar">
      {items.map(i=>(
        <button key={i.id} onClick={()=>setTab(i.id)} className="tab-btn">
          <div className="icon-badge" style={{background: tab===i.id ? 'linear-gradient(90deg,#f9a8d4,#ec4899)' : 'transparent'}}>
            {i.icon}
          </div>
          <div className="small" style={{color: tab===i.id ? '#ec4899':'#6b7280'}}>{i.label}</div>
        </button>
      ))}
    </div>
  )
}
