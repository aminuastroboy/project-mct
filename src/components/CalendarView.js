import React from "react";

function CalendarView({ logs }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-center">
      <h2 className="text-lg font-semibold">Calendar</h2>
      <p>{logs.length ? "Feature coming soon with data" : "Add logs to see calendar"}</p>
    </div>
  );
}

export default CalendarView;
