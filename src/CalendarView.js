import React, { useState } from "react";

export default function CalendarView({ cycles, setCycles }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const toggleDay = (day) => {
    const dateKey = `${year}-${month + 1}-${day}`;
    let updated = [...cycles];

    const existingCycle = updated.find(c => c.start === dateKey);
    if (existingCycle) {
      updated = updated.filter(c => c.start !== dateKey);
    } else {
      updated.push({
        id: Date.now(),
        start: dateKey,
        duration: 1,
      });
    }

    setCycles(updated);
  };

  const isPeriodDay = (day) => {
    const dateKey = `${year}-${month + 1}-${day}`;
    return cycles.some(c => c.start === dateKey);
  };

  const isFertileDay = (day) => {
    const date = new Date(year, month, day);
    return cycles.some(cycle => {
      const startDate = new Date(cycle.start);
      if (isNaN(startDate)) return false;
      const fertileStart = new Date(startDate);
      fertileStart.setDate(fertileStart.getDate() + 10);

      const fertileEnd = new Date(startDate);
      fertileEnd.setDate(fertileEnd.getDate() + 17);

      return date >= fertileStart && date <= fertileEnd;
    });
  };

  const blanks = Array(firstDay).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...daysArray];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>◀</button>
        <h2 className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>▶</button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2">
        {totalSlots.map((day, idx) =>
          day ? (
            <button
              key={idx}
              onClick={() => toggleDay(day)}
              className={`w-10 h-10 flex items-center justify-center rounded-full mx-auto transition ${
                isPeriodDay(day)
                  ? "bg-pink-400 text-white"
                  : isFertileDay(day)
                  ? "bg-green-300 text-white"
                  : "hover:bg-pink-100 text-gray-700"
              }`}
            >
              {day}
            </button>
          ) : (
            <div key={idx} />
          )
        )}
      </div>

      <div className="flex justify-around text-sm mt-4">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-400 rounded-full inline-block" /> Period
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-300 rounded-full inline-block" /> Fertile
        </div>
      </div>
    </div>
  );
}
