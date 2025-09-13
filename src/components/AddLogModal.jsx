import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AddLogModal({ onClose, onSave }){
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [note, setNote] = useState('')

  function submit(e){
    e.preventDefault()
    const item = { id: Date.now(), date, note }
    onSave(item)
  }

  return (
    <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}}>
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)'}} onClick={onClose}></div>
      <motion.form initial={{scale:0.96,opacity:0}} animate={{scale:1,opacity:1}} onSubmit={submit} className="card" style={{minWidth:320,zIndex:70}}>
        <h3 className="text-lg font-semibold">Add Log</h3>
        <label className="small mt-2">Date</label>
        <input className="input mt-1" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        <label className="small mt-2">Note</label>
        <input className="input mt-1" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. cramps, mood" />
        <div className="flex gap-2 mt-4 justify-end">
          <button type="button" className="input" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Save</button>
        </div>
      </motion.form>
    </div>
  )
}
