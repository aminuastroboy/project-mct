import React from 'react'

export default function Cycle() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-48 h-48 rounded-full border-8 border-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.7)]">
        <span className="text-xl font-semibold text-pink-300">Cycle Day 12</span>
      </div>
      <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg shadow-md">
        Add Log
      </button>
    </div>
  )
}