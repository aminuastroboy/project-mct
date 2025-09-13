import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

export default function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar setPage={setPage} />
      <main className="p-6">
        {page === 'dashboard' && <Dashboard />}
        {page === 'settings' && <Settings />}
      </main>
    </div>
  )
}
