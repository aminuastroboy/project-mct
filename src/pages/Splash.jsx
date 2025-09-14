import React, { useEffect } from 'react'

export default function Splash({ onFinish }){
  useEffect(()=>{
    const t = setTimeout(()=> onFinish(), 1800)
    return ()=> clearTimeout(t)
  },[onFinish])

  return (
    <div className="flex items-center justify-center h-screen" style={{background:'linear-gradient(180deg,#fde8f6,#ffdff1)'}}>
      <div className="card rounded-xl-2 flex flex-col items-center p-6">
        <div style={{width:84,height:84,borderRadius:20,background:'linear-gradient(90deg,#fbcfe8,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{fontSize:36}}>🌸</span>
        </div>
        <h1 style={{color:'#ec4899',marginTop:12,fontWeight:700,fontSize:20}}>Cycle Care</h1>
      </div>
    </div>
  )
}
