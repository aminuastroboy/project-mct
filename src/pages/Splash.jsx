import React, { useEffect } from 'react'

export default function Splash({ onFinish }){
  useEffect(()=>{
    const t = setTimeout(()=> onFinish(), 1500)
    return ()=> clearTimeout(t)
  },[onFinish])
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400">
      <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
        <div className="text-6xl">🌸</div>
        <h1 className="text-2xl font-bold text-pink-600 mt-2">Cycle Care</h1>
      </div>
    </div>
  )
}
