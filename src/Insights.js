import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays, Heart, Lightbulb, Bell } from "lucide-react";
import Confetti from "react-confetti";

export default function Insights() {
  const cycleHistory = [
    { month: "May", length: 28 },
    { month: "Jun", length: 30 },
    { month: "Jul", length: 29 },
    { month: "Aug", length: 27 },
    { month: "Sep", length: 28 },
  ];

  const [reminders, setReminders] = useState([
    { id: 1, text: "Stay hydrated 💧" },
    { id: 2, text: "Gentle exercise 🧘🏽‍♀️" },
  ]);
  const [newReminder, setNewReminder] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const addReminder = () => {
    if (!newReminder.trim()) return;
    setReminders([...reminders, { id: Date.now(), text: newReminder }]);
    setNewReminder("");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto max-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      {showConfetti && (
        <Confetti
          colors={["#ec4899", "#f472b6", "#d8b4fe", "#f9a8d4"]}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      {/* Cycle Overview */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-pink-500" />
            Cycle Overview
          </h2>
          <p className="mt-2 text-gray-700">Average Cycle: 28 days</p>
          <p className="text-gray-700">Average Period Length: 5 days</p>
          <p className="mt-2 font-medium text-pink-600">
            Next Period: Sept 29
          </p>
          <p className="font-medium text-pink-600">Ovulation: Sept 15</p>
        </CardContent>
      </Card>

      {/* Cycle History */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Cycle History
          </h2>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="length"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ovulation */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-green-500" />
            Ovulation & Fertile Window
          </h2>
          <p className="mt-2 text-gray-700">
            Your predicted fertile window is <b>Sept 12 - Sept 17</b>.
          </p>
          <p className="text-gray-700">Ovulation expected on <b>Sept 15</b>.</p>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Health Tips
          </h2>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li>🌿 Eat more leafy greens for iron during your period.</li>
            <li>💤 Prioritize good sleep for hormone balance.</li>
            <li>💧 Stay hydrated daily.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="rounded-2xl shadow-md mb-20">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-500" />
            Reminders
          </h2>
          <ul className="mt-2 space-y-1 text-gray-700">
            {reminders.map((r) => (
              <li key={r.id}>• {r.text}</li>
            ))}
          </ul>
          <div className="flex mt-3 gap-2">
            <input
              type="text"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Add reminder..."
              className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={addReminder}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600"
            >
              Add
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
