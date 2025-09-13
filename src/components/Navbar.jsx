import React from 'react'

export default function Navbar({ setPage }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-lg">
      <h1 className="text-xl font-bold text-glow">MCT</h1>
      <div className="space-x-4">
        <button onClick={() => setPage('dashboard')} className="hover:text-glow">Dashboard</button>
        <button onClick={() => setPage('settings')} className="hover:text-glow">Settings</button>
      </div>
    </nav>
  )
}
