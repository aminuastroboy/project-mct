import React from 'react'
import LogsList from '../components/LogsList'

export default function Logs(){
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-pink-600">Logs</h2>
      </div>
      <LogsList />
      <div className="mt-4">
        <a className="text-pink-600" href="#profile">Go to Profile</a>
      </div>
    </div>
  )
}
