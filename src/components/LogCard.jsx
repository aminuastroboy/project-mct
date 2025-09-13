import React from 'react'

export default function LogCard({ item, onDelete }){
  return (
    <div className="card flex justify-between items-center">
      <div>
        <div className="font-medium">{item.date}</div>
        <div className="small">{item.note || '—'}</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button className="text-sm small text-red-400" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
