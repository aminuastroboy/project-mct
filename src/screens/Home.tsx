import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import CycleForm from '../widgets/CycleForm'
import Reminders from '../widgets/Reminders'
import HealthTips from '../widgets/HealthTips'
import InsightsSmall from '../widgets/InsightsSmall'

type Cycle = { id: number; start: string; duration: number }

export default function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(()=>{
    const s = localStorage.getItem('cycles')
    if(s) setCycles(JSON.parse(s))
  },[])
  useEffect(()=> localStorage.setItem('cycles', JSON.stringify(cycles)), [cycles])

  function addCycle(c: Cycle){ setCycles(p=>[...p,c]); setCelebrate(true); setTimeout(()=>setCelebrate(false),3500) }
  function deleteCycle(id: number){ setCycles(p=>p.filter(x=>x.id!==id)) }
  function editCycle(id: number, data: Partial<Cycle>){ setCycles(p=>p.map(x=> x.id===id? {...x,...data}: x)) }

  const latest = cycles.length? cycles[cycles.length-1]: null
  const daysSince = (start: string)=> Math.max(1, Math.floor((Date.now() - new Date(start).getTime())/(1000*60*60*24))+1)

  return (
    <div className="space-y-4">
      {celebrate && <Confetti recycle={false} numberOfPieces={180} colors={['#ec4899','#f472b6','#d8b4fe','#f9a8d4']} />}
      <div className="card" style={{textAlign:'center'}}>
        <div className="petal-circle">{ latest ? `Day ${Math.min(daysSince(latest.start), latest.duration)}` : '—' }</div>
        <div style={{marginTop:10, color:'#555'}}>{ latest ? `Started ${latest.start} • ${latest.duration} days` : 'No cycle yet — add one' }</div>
        <div style={{marginTop:8}}>
          <button className="btn" onClick={()=>setShowForm(true)} style={{background:'#ec4899', color:'#fff'}}>+ Add Cycle</button>
        </div>
        { latest && <div style={{marginTop:8}}><button onClick={()=>{ if(confirm('Delete latest cycle?')) deleteCycle(latest.id) }} style={{background:'transparent', border:'none', color:'#e11d48', cursor:'pointer'}}>Delete</button></div> }
      </div>

      <div className="card">
        <Reminders />
      </div>

      <div className="card">
        <HealthTips />
      </div>

      <div className="card">
        <InsightsSmall cycles={cycles} />
      </div>

      { showForm && <CycleForm onClose={()=>setShowForm(false)} onSave={(c)=>addCycle(c)} /> }
    </div>
  )
}
