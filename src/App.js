import React, { useState } from 'react';
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Insights from './screens/Insights';
import Login from './screens/Login';

export default function App() {
  const [tab, setTab] = useState('home');
  const [user, setUser] = useState(() => localStorage.getItem('m_user') || null);

  if (!user) return <Login onLogin={(u) => setUser(u)} />;

  return (
    <div className="min-h-screen flex flex-col bg-animated">
      <div className="flex-1 overflow-y-auto">
        {tab === 'home' && <Home />}
        {tab === 'calendar' && <Calendar />}
        {tab === 'insights' && <Insights />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button onClick={() => setTab('home')} className={\`py-2 rounded-2xl \${tab === 'home' ? 'bg-petal2 text-white' : ''}\`}>🏠 Home</button>
          <button onClick={() => setTab('calendar')} className={\`py-2 rounded-2xl \${tab === 'calendar' ? 'bg-petal2 text-white' : ''}\`}>📅 Calendar</button>
          <button onClick={() => setTab('insights')} className={\`py-2 rounded-2xl \${tab === 'insights' ? 'bg-petal2 text-white' : ''}\`}>📊 Insights</button>
        </div>
      </nav>
    </div>
  );
}