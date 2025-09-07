import Petal from "./Petal";

export default function Tracker({ user, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-animated relative overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-md shadow rounded-b-2xl">
        <h1 className="text-lg font-semibold text-pink-700">🌸 Hi {user}</h1>
        <button
          onClick={onLogout}
          className="text-sm px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 -z-10">
          {[...Array(8)].map((_, i) => (
            <Petal key={i} delay={i * 2} size={16 + Math.random() * 20} />
          ))}
        </div>

        <div className="text-center">
          <div className="w-48 h-48 rounded-full border-8 border-pink-400 flex items-center justify-center text-xl font-bold text-pink-700 shadow-lg mx-auto">
            3 Days Left 🌺
          </div>
          <p className="mt-6 text-gray-700">Your next cycle is approaching.</p>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow px-6 py-3">
        <div className="grid grid-cols-3 text-center text-sm">
          <button className="py-2 rounded-2xl bg-pink-100 font-medium">🏠 Home</button>
          <button className="py-2 rounded-2xl">📅 Calendar</button>
          <button className="py-2 rounded-2xl">📝 Logs</button>
        </div>
      </nav>
    </div>
  );
}
