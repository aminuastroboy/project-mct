import React, { useState } from "react";
import Home from "./Home";
import Calendar from "./Calendar";
import Insights from "./Insights";
import { CalendarDays, BarChart3, Home as HomeIcon } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="flex-1 overflow-y-auto">
        {tab === "home" && <Home />}
        {tab === "calendar" && <Calendar />}
        {tab === "insights" && <Insights />}
      </div>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white rounded-t-3xl shadow-md px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button
            onClick={() => setTab("home")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "home" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-1 text-pink-500" /> Home
          </button>
          <button
            onClick={() => setTab("calendar")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "calendar" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            <CalendarDays className="w-5 h-5 mb-1 text-pink-500" /> Calendar
          </button>
          <button
            onClick={() => setTab("insights")}
            className={`py-2 rounded-2xl flex flex-col items-center ${
              tab === "insights" ? "bg-pink-100 font-medium" : ""
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-1 text-pink-500" /> Insights
          </button>
        </div>
      </nav>
    </div>
  );
}
