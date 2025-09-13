import React from 'react'
import { Flower2, List, User } from 'lucide-react'

export default function FloatingNav({ page, setPage }){
  const items = [
    { id: 'home', icon: <Flower2 size={22} /> },
    { id: 'logs', icon: <List size={22} /> },
    { id: 'profile', icon: <User size={22} /> },
  ]
  return (
    <div className="bottom-nav">
      {items.map(it => (
        <button key={it.id} className={`nav-btn ${page===it.id?'active':''}`} onClick={()=>setPage(it.id)} title={it.id}>
          {it.icon}
        </button>
      ))}
    </div>
  )
}
