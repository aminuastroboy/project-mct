import React from 'react'

export default function BottomNav({ active, setActive }){
  const tabs = [
    { id:'home', label:'Home', emoji:'🏠' },
    { id:'calendar', label:'Calendar', emoji:'🗓️' },
    { id:'logs', label:'Logs', emoji:'📝' },
  ]
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bottom-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 flex gap-6 items-center shadow">
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setActive(t.id)} className={`flex flex-col items-center text-xs ${active===t.id?'text-pink-600':'text-gray-500'}`}>
          <div className="text-lg">{t.emoji}</div>
          <div>{t.label}</div>
        </button>
      ))}
    </nav>
  )
}
