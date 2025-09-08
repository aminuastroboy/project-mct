
import React, {useState, useEffect} from 'react';
import Confetti from 'react-confetti';
export default function Reminders(){
  const [reminders,setReminders]=useState([]);
  const [text,setText]=useState('');
  const [showConfetti,setShowConfetti]=useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem('reminders');
    if(saved) setReminders(JSON.parse(saved));
  },[]);
  useEffect(()=>{ localStorage.setItem('reminders', JSON.stringify(reminders)); },[reminders]);

  function add(){
    if(!text.trim()) return;
    setReminders(prev=>[...prev, {id:Date.now(), text}]);
    setText('');
    setShowConfetti(true);
    setTimeout(()=>setShowConfetti(false),4000);
  }
  function del(id){ setReminders(prev=> prev.filter(r=> r.id!==id)); }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      {showConfetti && <Confetti colors={["#ec4899","#f472b6","#d8b4fe","#f9a8d4"]} recycle={false} numberOfPieces={200}/>}
      <h3 className="font-semibold text-gray-800 mb-2">⏰ Reminders</h3>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add reminder..." className="flex-1 border rounded px-3 py-2"/>
        <button onClick={add} className="bg-petal3 text-white px-3 py-2 rounded">Add</button>
      </div>
      <ul className="mt-3 text-left space-y-1">
        {reminders.map(r=> <li key={r.id} className="flex justify-between items-center"><span>• {r.text}</span> <button onClick={()=>del(r.id)} className="text-red-500">Delete</button></li>)}
      </ul>
    </div>
  )
}
