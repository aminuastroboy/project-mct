import React, {useState} from 'react';
export default function CycleForm({onClose,onSave}){
  const [start,setStart]=useState('');
  const [duration,setDuration]=useState(5);
  function submit(e){
    e.preventDefault();
    onSave({id:Date.now(), start, duration: Number(duration)});
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white rounded-2xl p-6 w-80">
        <h3 className="text-lg font-semibold text-petal3 mb-3">Add Cycle</h3>
        <label className="block text-sm mb-1">Start date</label>
        <input required type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full border rounded px-3 py-2 mb-3"/>
        <label className="block text-sm mb-1">Duration (days)</label>
        <input required type="number" min="1" value={duration} onChange={e=>setDuration(e.target.value)} className="w-full border rounded px-3 py-2 mb-4"/>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-3 py-2 bg-petal3 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
