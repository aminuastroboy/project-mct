import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function InsightsSmall({cycles}:{cycles:any[]}){
  if(!cycles || cycles.length<2) return <p style={{color:'#666'}}>Add at least 2 cycles to see trends.</p>
  const sorted = [...cycles].sort((a,b)=> new Date(a.start).getTime() - new Date(b.start).getTime())
  const data = []
  for(let i=1;i<sorted.length;i++){
    const d = (new Date(sorted[i].start).getTime() - new Date(sorted[i-1].start).getTime())/(1000*60*60*24)
    data.push({name:`C${i}`, length: Math.round(d)})
  }
  const avg = Math.round(data.reduce((s:any,c:any)=>s+c.length,0)/data.length)
  return (
    <div>
      <h3 style={{marginTop:0}}>📊 Insights</h3>
      <p style={{margin:0}}>Avg cycle: {avg} days</p>
      <div style={{height:180, marginTop:8}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="length" stroke="#ec4899" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
