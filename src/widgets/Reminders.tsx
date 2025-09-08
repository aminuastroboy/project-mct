import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function Reminders(){
  const [items, setItems] = useState<{id:number; text:string}[]>([])
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)

  useEffect(()=>{ const s = localStorage.getItem('reminders'); if(s) setItems(JSON.parse(s)) }, [])
  useEffect(()=> localStorage.setItem('reminders', JSON.stringify(items)), [items])

  function add(){ if(!text.trim()) return; setItems(p=>[...p, {id:Date.now(), text}]); setText(''); setShow(true); setTimeout(()=>setShow(false), 2500) }
  function del(id:number){ setItems(p=>p.filter(x=>x.id!==id)) }

  return (
    <div>
      {show && <Confetti recycle={false} numberOfPieces={120} colors={['#ec4899','#f472b6','#d8b4fe','#f9a8d4']} />}
      <h3 style={{marginTop:0}}>⏰ Reminders</h3>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Add reminder..." style={{flex:1, padding:8}} />
        <button onClick={add} style={{background:'#ec4899', color:'#fff', padding:'8px 12px', borderRadius:8}}>Add</button>
      </div>
      <ul style={{margin:0, padding:0, listStyle:'none'}}>
        {items.map(it=> <li key={it.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}><span>• {it.text}</span><button onClick={()=>del(it.id)} style={{color:'#ef4444'}}>Delete</button></li>)}
      </ul>
    </div>
  )
}
