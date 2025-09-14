import React from 'react'

const tips = [
  "Drink enough water today 💧",
  "Light exercise helps with cramps 🧘‍♀️",
  "Eat iron-rich foods to reduce fatigue 🥬",
  "Use a heating pad for lower back pain ♨️"
]

const messages = [
  "You're stronger than you think 🌸",
  "Take a deep breath — you’ve got this 🌞",
  "Small self-care counts 💖",
  "Today is a new day — be kind to yourself 🌺"
]

export default function HealthTips(){
  const today = new Date().getDate()
  const tip = tips[today % tips.length]
  const msg = messages[today % messages.length]
  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="font-semibold text-gray-700">Health Tip</h3>
        <p className="mt-2 text-gray-600">{tip}</p>
      </div>
      <div className="card bg-pink-50">
        <p className="text-pink-700 font-medium">{msg}</p>
      </div>
    </div>
  )
}
