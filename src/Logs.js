import React, { useState } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";

export default function Logs({ cycles, notes, setNotes, deleteCycle, updateCycle }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ start: "", duration: "" });

  const handleChange = (id, value) => {
    setNotes({ ...notes, [id]: value });
  };

  const startEdit = (cycle) => {
    setEditingId(cycle.id);
    setEditData({ start: cycle.start, duration: cycle.duration });
  };

  const saveEdit = () => {
    updateCycle(editingId, editData);
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="flex flex-col gap-4">
      {cycles.map(cycle => (
        <div key={cycle.id} className="bg-white shadow-md rounded-xl p-4">
          {editingId === cycle.id ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="date"
                value={editData.start}
                onChange={e => setEditData({ ...editData, start: e.target.value })}
                className="border rounded-md p-2 text-sm"
              />
              <input
                type="number"
                min="1"
                max="10"
                value={editData.duration}
                onChange={e => setEditData({ ...editData, duration: e.target.value })}
                className="border rounded-md p-2 text-sm w-20"
              />
              <button onClick={saveEdit} className="text-green-500"><Check size={18} /></button>
              <button onClick={cancelEdit} className="text-gray-400"><X size={18} /></button>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">Cycle starting {cycle.start}</p>
                <p className="text-sm text-gray-600">Duration: {cycle.duration} days</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(cycle)} className="text-blue-500"><Pencil size={18} /></button>
                <button onClick={() => deleteCycle(cycle.id)} className="text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          )}
          <textarea
            value={notes[cycle.id] || ""}
            onChange={e => handleChange(cycle.id, e.target.value)}
            placeholder="Add notes..."
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
      ))}
    </div>
  );
}
