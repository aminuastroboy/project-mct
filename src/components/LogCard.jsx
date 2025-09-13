import React, { useState } from 'react'

export default function LogCard({ item, onUpdate, onDelete }){
  const [editing, setEditing] = useState(false)
  const [note, setNote] = useState(item.note||'')

  function save(){
    onUpdate(item.id, { note })
    setEditing(false)
  }

  return (
    <div className="card flex items-center justify-between">
      <div>
        <div className="font-medium">{item.date}</div>
        <div className="small">{item.note||'—'}</div>
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <div className="flex items-center gap-2">
            <input className="input" value={note} onChange={e=>setNote(e.target.value)} />
            <button className="btn-primary" onClick={save}>Save</button>
          </div>
        ) : (
          <>
            <button className="text-sm small" onClick={()=>setEditing(true)}>Edit</button>
            <button className="text-sm small text-red-400" onClick={()=>onDelete(item.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  )
}
