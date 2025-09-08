import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Avatar } from "./components/ui/avatar";
import { Tabs } from "./components/ui/tabs";

function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <div className="flex-1 p-6">
        {tab === "home" && (
          <Card>
            <CardContent>
              <h1 className="text-xl font-bold">🌸 Menstrual Tracker</h1>
              <p className="text-gray-600">Welcome back!</p>
              <Button onClick={() => setTab("calendar")} className="mt-4">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        )}

        {tab === "calendar" && (
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">🗓️ Calendar</h2>
              <p className="text-gray-600">Cycle tracking view here...</p>
            </CardContent>
          </Card>
        )}

        {tab === "logs" && (
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">🙂 Logs</h2>
              <p className="text-gray-600">User logs and notes here...</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom navigation */}
      <nav className="bg-white rounded-t-3xl shadow-lg px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button
            onClick={() => setTab("home")}
            className={`py-2 rounded-2xl ${tab === "home" ? "bg-pink-200 font-medium" : ""}`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setTab("calendar")}
            className={`py-2 rounded-2xl ${tab === "calendar" ? "bg-pink-200 font-medium" : ""}`}
          >
            🗓️ Calendar
          </button>
          <button
            onClick={() => setTab("logs")}
            className={`py-2 rounded-2xl ${tab === "logs" ? "bg-pink-200 font-medium" : ""}`}
          >
            🙂 Logs
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
