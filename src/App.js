import { useState } from "react";
import LoginRegister from "./LoginRegister";
import Tracker from "./Tracker";

function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Tracker user={user} onLogout={() => setUser(null)} />
  ) : (
    <LoginRegister onAuth={(email) => setUser(email)} />
  );
}

export default App;
