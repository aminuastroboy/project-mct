import React from 'react';
const tips = [
  'Stay hydrated and eat iron-rich foods during your period.',
  'Gentle exercise like walking or yoga can reduce cramps.',
  'Prioritize sleep for hormone balance.',
  'Track mood and symptoms to spot patterns.'
];
export default function HealthTips(){ return (
  <div className="bg-white rounded-2xl p-4 shadow">
    <h3 className="font-semibold mb-2">💡 Health Tips</h3>
    <ul className="text-left text-gray-700 space-y-1">{tips.map((t,i)=>(<li key={i}>• {t}</li>))}</ul>
  </div>
)}