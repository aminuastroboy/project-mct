import React, {useEffect, useState} from 'react';

export default function Logs(){
  const [cycles,setCycles]=useState([]);
  useEffect(()=>{ const s=localStorage.getItem('cycles'); if(s) setCycles(JSON.parse(s)); },[]);
  function remove(id){ const next = cycles.filter(c=> c.id!==id); setCycles(next); localStorage.setItem('cycles', JSON.stringify(next)); }
  return (
    <div className="p-6 pb-28">
      <h2 className="text-2xl font-bold text-petal3 mb-4">📜 Logs</h2>
      {cycles.length===0 && <p className="text-gray-600">No cycles logged yet.</p>}
      <ul className="space-y-3">
        {cycles.map(c=>(<li key={c.id} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"><div><div><b>Start:</b> {c.start}</div><div><b>Duration:</b> {c.duration} days</div></div><div className="flex gap-2"><button onClick={()=>{ const d = prompt('New duration', c.duration); if(d){ const updated = cycles.map(x=> x.id===c.id? {...x, duration: Number(d)}: x); setCycles(updated); localStorage.setItem('cycles', JSON.stringify(updated)); } }} className="text-blue-500">Edit</button><button onClick={()=>{ if(window.confirm('Delete this cycle?')) remove(c.id); }} className="text-red-500">Delete</button></div></li>))}
      </ul>
    </div>
  )
}
