import React from 'react'

export default function InfoCard({title,value,subtitle}){
  return (
    <div className="card">
      <div className="text-sm small">{title}</div>
      <div className="text-lg font-semibold" style={{color:'#fff'}}>{value}</div>
      <div className="small mt-2">{subtitle}</div>
    </div>
  )
}
