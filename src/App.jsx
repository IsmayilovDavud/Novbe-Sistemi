import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import MainPage from "./pages/MainPage";
import NewUser from "./pages/NewUser"; // ✅ Əlavə et

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  return (
    <Router>
      <Routes>
        {/* Giriş səhifəsi */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Yeni istifadəçi qeydiyyatı */}
        <Route path="/new-user" element={<NewUser />} />

        {/* Admin panel */}
        <Route
          path="/admin"
          element={
            currentUser?.role === "admin" ? (
              <Admin onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* İstifadəçi paneli */}
        <Route
          path="/user"
          element={
            currentUser?.role === "user" ? (
              <MainPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
