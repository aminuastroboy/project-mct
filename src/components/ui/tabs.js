
import React,{useState} from 'react';
export function Tabs({tabs,defaultTab=0}){
  const [active,setActive]=useState(defaultTab);
  return (<div>
    <div className="flex gap-2 mb-3">{tabs.map((t,i)=>(
      <button key={i} onClick={()=>setActive(i)} className={`px-4 py-2 rounded-xl text-sm ${active===i?'bg-petal3 text-white':'bg-gray-100'}`}>
        {t.label}
      </button>
    ))}</div>
    <div>{tabs[active]?.content}</div>
  </div>)
}
