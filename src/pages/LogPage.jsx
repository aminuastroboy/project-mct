import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import LogCard from '../components/LogCard.jsx'
import AddLogModal from '../components/AddLogModal.jsx'

export default function LogPage(){
  const [logs, setLogs] = useLocalStorage('mct_logs', [])
  const [showAdd, setShowAdd] = useState(false)

  function addLog(item){
    setLogs(prev => [...(prev||[]), item])
  }
  function updateLog(id, data){
    setLogs(prev => (prev||[]).map(x => x.id===id ? {...x, ...data} : x))
  }
  function deleteLog(id){
    setLogs(prev => (prev||[]).filter(x => x.id!==id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Logs</h2>
        <button className="btn-primary" onClick={()=>setShowAdd(true)}>+ Add Log</button>
      </div>

      <div className="space-y-3">
        {(!logs || logs.length===0) && <div className="small">No logs yet — add your first entry.</div>}
        {(logs||[]).slice().reverse().map(l => (
          <LogCard key={l.id} item={l} onUpdate={updateLog} onDelete={deleteLog} />
        ))}
      </div>

      { showAdd && <AddLogModal onClose={()=>setShowAdd(false)} onSave={(d)=>{ addLog(d); setShowAdd(false) }} /> }
    </div>
  )
}
