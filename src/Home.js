import React, {useState, useEffect} from 'react';
import FlowerWheel from './components/FlowerWheel';
import CycleForm from './components/CycleForm';
import Reminders from './components/Reminders';
import HealthTips from './components/HealthTips';
import Insights from './components/Insights';
import Confetti from 'react-confetti';

export default function Home(){
  const [showForm,setShowForm]=useState(false);
  const [cycles,setCycles]=useState([]);
  const [showConfetti,setShowConfetti]=useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem('cycles');
    if(saved) setCycles(JSON.parse(saved));
  },[]);
  useEffect(()=>{ localStorage.setItem('cycles', JSON.stringify(cycles)); },[cycles]);

  function addCycle(cycle){
    setCycles(prev=>[...prev, cycle]);
    setShowConfetti(true);
    setTimeout(()=>setShowConfetti(false),4000);
  }
  function updateCycle(id, updates){
    setCycles(prev=> prev.map(c=> c.id===id? {...c,...updates}: c));
  }
  function deleteCycle(id){
    setCycles(prev=> prev.filter(c=> c.id!==id));
  }

  return (
    <div className="p-6 pb-28">
      {showConfetti && <Confetti colors={["#ec4899","#f472b6","#d8b4fe","#f9a8d4"]} recycle={false} numberOfPieces={220}/>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-petal3">🌸 Cycle Tracker</h1>
        <button onClick={()=>setShowForm(true)} className="bg-petal3 text-white px-4 py-2 rounded-xl">+ Add Cycle</button>
      </div>

      <FlowerWheel cycles={cycles} onDelete={deleteCycle} onEdit={updateCycle}/>

      <div className="mt-6 space-y-4">
        <Reminders />
        <HealthTips />
        <Insights cycles={cycles} />
      </div>

      {showForm && <CycleForm onClose={()=>setShowForm(false)} onSave={addCycle} />}
    </div>
  )
}
