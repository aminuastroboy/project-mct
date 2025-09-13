import React, { useState } from "react"

export default function AddLogForm({ addLog }) {
  const [note, setNote] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!note || !date) return
    addLog({ note, date })
    setNote("")
    setDate("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-2xl p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold text-pink-600">➕ Add Log</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="w-full bg-pink-500 text-white rounded p-2 hover:bg-pink-600"
      >
        Save Log
      </button>
    </form>
  )
}
