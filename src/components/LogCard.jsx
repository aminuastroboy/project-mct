import React from 'react'

export default function LogCard() {
  return (
    <div className="p-6 rounded-2xl bg-gray-900 shadow-xl">
      <h2 className="text-lg font-bold mb-4">Recent Logs</h2>
      <ul className="space-y-2">
        <li className="bg-gray-800 p-3 rounded-lg">2025-09-01: Flow - Medium</li>
        <li className="bg-gray-800 p-3 rounded-lg">2025-08-31: Flow - Light</li>
        <li className="bg-gray-800 p-3 rounded-lg">2025-08-30: Flow - Heavy</li>
      </ul>
    </div>
  )
}
