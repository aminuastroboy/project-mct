import React, { useState } from 'react'
import LogCard from '../components/LogCard.jsx'

export default function Logs({ logs, addLog, updateLog, deleteLog }){
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [note, setNote] = useState('')

  function submit(e){
    e.preventDefault()
    const item = { id: Date.now(), date, note }
    addLog(item)
    setDate(new Date().toISOString().slice(0,10))
    setNote('')
    setShow(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Logs</h2>
        <button className="btn btn-primary" onClick={()=>setShow(true)}>+ Add Log</button>
      </div>

      <div className="space-y-3">
        {(!logs || logs.length===0) && <div className="small">No logs yet. Add your first entry.</div>}
        {logs && logs.map(l=> <LogCard key={l.id} item={l} onDelete={()=>deleteLog(l.id)} />)}
      </div>

      { show && (
        <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.5)'}} onClick={()=>setShow(false)}></div>
          <form onSubmit={submit} className="card" style={{minWidth:320,zIndex:70}}>
            <h3 className="text-lg font-semibold mb-2">Add Log</h3>
            <label className="small">Date</label>
            <input className="input mt-1" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
            <label className="small mt-2">Note</label>
            <textarea className="input mt-1" rows="3" value={note} onChange={e=>setNote(e.target.value)} />
            <div className="flex gap-2 mt-4 justify-end">
              <button type="button" className="input" onClick={()=>setShow(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
