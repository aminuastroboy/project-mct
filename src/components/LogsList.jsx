import React from "react"
import { Trash2 } from "lucide-react"

export default function LogsList({ logs, deleteLog }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-semibold text-pink-600">📒 Logs</h2>
      {logs.length === 0 && <p className="text-gray-500">No logs added yet.</p>}
      <ul className="space-y-2 mt-2">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex justify-between items-center bg-pink-50 p-2 rounded-lg"
          >
            <div>
              <p className="font-medium">{log.note}</p>
              <p className="text-xs text-gray-500">{log.date}</p>
            </div>
            <button
              onClick={() => deleteLog(log.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
