import React, { useState } from 'react'

type Props = { onClose: ()=>void; onSave: (c: {id:number; start:string; duration:number})=>void }

export default function CycleForm({onClose, onSave}: Props){
  const [start, setStart] = useState('')
  const [duration, setDuration] = useState(5)

  return (
    <div className="modal-backdrop">
      <form className="form" onSubmit={(e)=>{ e.preventDefault(); onSave({id: Date.now(), start, duration: Number(duration)}); onClose(); }}>
        <h3 style={{marginTop:0}}>Add Cycle</h3>
        <label style={{display:'block', marginBottom:6}}>Start date</label>
        <input type="date" value={start} onChange={(e)=>setStart(e.target.value)} style={{width:'100%', padding:8, marginBottom:10}} required />
        <label style={{display:'block', marginBottom:6}}>Duration (days)</label>
        <input type="number" min={1} value={duration} onChange={(e)=>setDuration(Number(e.target.value))} style={{width:'100%', padding:8, marginBottom:10}} required />
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button type="button" onClick={onClose} style={{padding:'8px 12px', borderRadius:8}}>Cancel</button>
          <button type="submit" style={{padding:'8px 12px', borderRadius:8, background:'#ec4899', color:'#fff'}}>Save</button>
        </div>
      </form>
    </div>
  )
}
