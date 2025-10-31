
import React, { useState } from "react";
import Login from "./User";
import MainPage from "./pages/MainPage";

export default function UserApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  return (
    <>
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainPage onLogout={handleLogout} />
      )}
    </>
  );
}
