import React, { useState } from 'react'

export default function CycleForm({ onClose, onSave }){
  const [start, setStart] = useState('')
  const [duration, setDuration] = useState(5)
  const [note, setNote] = useState('')

  function submit(e){ e.preventDefault(); onSave({ id: Date.now(), start, duration: Number(duration), note }); onClose() }

  return (
    <div className="modal-backdrop">
      <form className="form" onSubmit={submit}>
        <h3 style={{marginTop:0}}>Add Cycle</h3>
        <label className="small-muted">Start</label>
        <input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)} required />
        <label className="small-muted" style={{marginTop:8}}>Duration</label>
        <input className="input" type="number" min="1" value={duration} onChange={e=>setDuration(e.target.value)} required />
        <label className="small-muted" style={{marginTop:8}}>Note</label>
        <input className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. heavy flow" />
        <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
          <button type="button" onClick={onClose} style={{padding:8,borderRadius:8}}>Cancel</button>
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
