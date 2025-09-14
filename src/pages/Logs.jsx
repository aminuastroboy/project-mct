import React, { useState, useEffect } from 'react'

export default function Logs(){
  const [logs, setLogs] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('cc_logs')||'[]')
    setLogs(saved)
  },[])

  function add(){
    if (!text.trim()) return
    const entry = { id: Date.now(), date: new Date().toISOString(), text }
    const updated = [...logs, entry]
    setLogs(updated)
    localStorage.setItem('cc_logs', JSON.stringify(updated))
    // if mentions period -> set cycleStart
    if (text.toLowerCase().includes('period')){
      localStorage.setItem('cycleStart', new Date().toISOString())
    }
    setText('')
  }

  function del(id){
    const updated = logs.filter(l=>l.id!==id)
    setLogs(updated)
    localStorage.setItem('cc_logs', JSON.stringify(updated))
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex gap-2">
          <input className="flex-1 p-2 border rounded-lg" placeholder="Add a log (e.g. Period started, cramps)" value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn-primary" onClick={add}>Add</button>
        </div>
      </div>

      <div>
        {logs.length===0 && <div className="small">No logs yet — add your first entry.</div>}
        {logs.slice().reverse().map(l=>(
          <div key={l.id} className="card mb-3">
            <div className="flex justify-between items-start">
              <div>
                <div style={{fontWeight:700}}>{new Date(l.date).toLocaleString()}</div>
                <div className="small mt-1">{l.text}</div>
              </div>
              <div className="flex flex-col items-end">
                <button className="small text-red-500" onClick={()=>del(l.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <button className="btn-primary" onClick={()=>{ window.location.href='#profile' }}>Go to Profile</button>
      </div>
    </div>
  )
}
