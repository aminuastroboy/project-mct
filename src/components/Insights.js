import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Insights({cycles=[]}){
  const data = cycles.map((c, idx)=> ({name: `C${idx+1}`, length: c.duration}));
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="font-semibold mb-3">📊 Insights</h3>
      {data.length===0 ? <p className="text-gray-600">Add cycles to see trends.</p> :
      <div className="h-48"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="length" stroke="#ec4899" strokeWidth={2} dot={{r:4}}/></LineChart></ResponsiveContainer></div>}
    </div>
  )
}
