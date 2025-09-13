import React from 'react'

export default function InfoCard({title, value}){
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">{title}</div>
          <div className="text-lg font-semibold" style={{color:'#fff'}}>{value}</div>
        </div>
      </div>
    </div>
  )
}
