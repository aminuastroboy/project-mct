import React from 'react'
import { Flower2, List, User } from 'lucide-react'

export default function FloatingNav({ page, setPage }){
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bottom-6 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-3xl px-4 py-2 flex gap-6 items-center z-50 shadow-lg">
      <button onClick={() => setPage('home')} className={`p-3 rounded-full ${page==='home'?'bg-gradient-to-br from-[#6C63FF] to-[#FF4D6D] text-white':'text-gray-400'}`} title="Home">
        <Flower2 size={22} />
      </button>
      <button onClick={() => setPage('log')} className={`p-3 rounded-full ${page==='log'?'bg-gradient-to-br from-[#6C63FF] to-[#FF4D6D] text-white':'text-gray-400'}`} title="Logs">
        <List size={22} />
      </button>
      <button onClick={() => setPage('profile')} className={`p-3 rounded-full ${page==='profile'?'bg-gradient-to-br from-[#6C63FF] to-[#FF4D6D] text-white':'text-gray-400'}`} title="Profile">
        <User size={22} />
      </button>
    </nav>
  )
}
