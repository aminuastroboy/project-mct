import React from "react"

export default function CircleVisualizer({ logs }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 text-center">
      <h2 className="text-lg font-semibold text-pink-600">🔄 Cycle Visual</h2>
      <div className="mt-4 flex justify-center">
        <div className="w-40 h-40 rounded-full border-8 border-pink-400 flex items-center justify-center">
          <span className="text-pink-600 font-bold text-xl">
            {logs.length} logs
          </span>
        </div>
      </div>
    </div>
  )
}
