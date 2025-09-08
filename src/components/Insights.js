import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const Insights = ({ logs }) => {
  if (logs.length < 2) {
    return <p className="text-gray-500">Add at least 2 logs to see insights.</p>;
  }

  const sorted = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  const cycles = [];
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i].date) - new Date(sorted[i-1].date)) / (1000*60*60*24);
    cycles.push({ name: i, length: diff });
  }

  const avgCycle = cycles.reduce((a, c) => a + c.length, 0) / cycles.length;
  const lastDate = new Date(sorted[sorted.length-1].date);
  const fertileWindow = new Date(lastDate);
  fertileWindow.setDate(fertileWindow.getDate() + avgCycle - 14);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Insights</h2>
      <p>Average cycle length: {Math.round(avgCycle)} days</p>
      <p>Next fertile window: around {fertileWindow.toDateString()}</p>

      <div className="h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cycles}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="length" stroke="#ec4899" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
