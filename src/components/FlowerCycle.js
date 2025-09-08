import React from "react";

function FlowerCycle({ logs }) {
  if (!logs.length) return <p className="text-center text-gray-500">No logs yet 🌸</p>;
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-center">
      <h2 className="text-lg font-semibold">Cycle Overview</h2>
      <p>Last period: {logs[logs.length - 1].date}</p>
    </div>
  );
}

export default FlowerCycle;
