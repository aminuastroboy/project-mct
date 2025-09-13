import React from 'react'
import Home from './pages/Home.jsx'
import Logs from './pages/Logs.jsx'
import Profile from './pages/Profile.jsx'
import FloatingNav from './components/FloatingNav.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

export default function App(){
  const [page, setPage] = useLocalStorage('mct_page', 'home')
  const [user, setUser] = useLocalStorage('mct_user', { name: 'Amina', email: 'amina@example.com' })
  const [logs, setLogs] = useLocalStorage('mct_logs', [
    { id: Date.now()-86400000, date: new Date(Date.now()-86400000).toISOString().slice(0,10), note: 'Demo - cramps' }
  ])

  function addLog(item){ setLogs(prev => prev ? [item, ...prev] : [item]) }
  function updateLog(id,data){ setLogs(prev => prev.map(x=> x.id===id? {...x,...data}: x)) }
  function deleteLog(id){ setLogs(prev => prev.filter(x=> x.id!==id)) }
  function logout(){ setUser(null); setPage('home') }

  return (
    <div className="min-h-screen">
      <div className="container">
        {page==='home' && <Home logs={logs||[]} addLog={addLog} />}
        {page==='logs' && <Logs logs={logs||[]} addLog={addLog} updateLog={updateLog} deleteLog={deleteLog} />}
        {page==='profile' && <Profile user={user} setUser={setUser} logout={logout} setLogs={setLogs} />}
      </div>
      <FloatingNav page={page} setPage={setPage} />
    </div>
  )
}
