import React, { useState } from 'react'
import FloatingNav from './components/FloatingNav.jsx'
import Home from './pages/Home.jsx'
import LogPage from './pages/LogPage.jsx'
import Profile from './pages/Profile.jsx'

export default function App(){
  const [page, setPage] = useState('home') // 'home' | 'log' | 'profile'

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="container">
          {page === 'home' && <Home />}
          {page === 'log' && <LogPage />}
          {page === 'profile' && <Profile />}
        </div>
      </div>

      <FloatingNav page={page} setPage={setPage} />
    </div>
  )
}
