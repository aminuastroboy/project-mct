
import React from 'react';
function dayDifference(start){
  const s=new Date(start); const t=new Date();
  return Math.floor((t - s)/(1000*60*60*24)) + 1;
}
export default function FlowerWheel({cycles=[], onDelete, onEdit}){
  const latest = cycles.length? cycles[cycles.length-1]: null;
  const day = latest? dayDifference(latest.start): null;
  const duration = latest? latest.duration: null;
  // simple ovulation prediction: ovulation = start + 14 days - this is a demo heuristic
  const ovulation = latest? new Date(new Date(latest.start).getTime() + (14*24*60*60*1000)).toISOString().slice(0,10): null;
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center">
      <div className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-petal1 to-petal2 flex items-center justify-center text-white font-bold text-xl">
        {day? `Day ${Math.min(day,duration)}` : 'No Cycle'}
      </div>
      {latest && <div className="mt-3 text-sm text-gray-600">Started: {latest.start} — Duration: {latest.duration} days</div>}
      {ovulation && <div className="mt-2 text-sm text-green-600">Estimated ovulation: {ovulation}</div>}
      <div className="mt-3 flex justify-center gap-3">
        {latest && <button onClick={()=>onDelete(latest.id)} className="text-red-500">Delete</button>}
        {latest && <button onClick={()=>{ const d = prompt('New duration', latest.duration); if(d){ onEdit(latest.id, {duration: Number(d)}); } }} className="text-blue-500">Edit</button>}
      </div>
    </div>
  )
}
