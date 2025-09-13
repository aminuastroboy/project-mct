import React from "react"

export default function CycleCard({ logs }) {
  const lastLog = logs[logs.length - 1]
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      {lastLog ? (
        <>
          <h2 className="text-xl font-semibold text-pink-500">Last Log</h2>
          <p className="text-gray-700">{lastLog.note}</p>
          <p className="text-sm text-gray-500">{lastLog.date}</p>
        </>
      ) : (
        <p className="text-gray-500">No logs yet. Add your first entry!</p>
      )}
    </div>
  )
}
