import React from "react";

export default function CalendarView({ cycles }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const periodDays = new Set(cycles.flatMap(c => c.days));

  return (
    <div className="grid grid-cols-7 gap-2 mt-4 text-center">
      {days.map(day => (
        <div
          key={day}
          className={`p-2 rounded-lg ${
            periodDays.has(day) ? "bg-pink-300 text-white" : "bg-gray-100"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
