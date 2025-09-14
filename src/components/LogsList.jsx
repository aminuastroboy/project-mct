import React, { useState, useEffect } from 'react'

export default function LogsList(){
  const [logs, setLogs] = useState([])
  const [note, setNote] = useState('')
  useEffect(()=> {
    const raw = localStorage.getItem('cc_logs')
    setLogs(raw ? JSON.parse(raw) : [])
  }, [])

  function save(all){
    setLogs(all)
    localStorage.setItem('cc_logs', JSON.stringify(all))
  }

  function add(){
    if(!note.trim()) return
    const entry = { id: Date.now(), date: new Date().toISOString().slice(0,10), text: note }
    const all = [...logs, entry]
    save(all)
    // if note indicates period start, set cycleStart
    if(note.toLowerCase().includes('period')) {
      localStorage.setItem('cc_cycleStart', new Date().toISOString().slice(0,10))
    }
    setNote('')
  }

  function del(id){
    const all = logs.filter(l=>l.id!==id)
    save(all)
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. cramps, mood" className="flex-1 p-2 rounded-lg border" />
        <button onClick={add} className="btn-primary">Add</button>
      </div>
      <div className="space-y-2">
        {logs.length===0 && <div className="small">No logs yet — add one.</div>}
        {logs.slice().reverse().map(l=>(
          <div key={l.id} className="card flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{l.date}</div>
              <div className="small">{l.text}</div>
            </div>
            <div className="flex flex-col items-end">
              <button onClick={()=>del(l.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
