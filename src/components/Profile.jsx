import React from 'react'

export default function Profile() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="p-3 bg-gray-800 rounded-lg shadow">
        <p className="text-gray-300">Cycle Length: 28 days</p>
        <p className="text-gray-300">Theme: Dark</p>
      </div>
    </div>
  )
}