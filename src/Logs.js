import React from "react";

export default function Logs({ cycles, notes, setNotes }) {
  const handleChange = (id, value) => {
    setNotes({ ...notes, [id]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      {cycles.map(cycle => (
        <div key={cycle.id} className="bg-white shadow-md rounded-xl p-4">
          <p className="font-semibold">Cycle starting {cycle.start}</p>
          <p className="text-sm text-gray-600 mb-2">
            Duration: {cycle.duration} days
          </p>
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
