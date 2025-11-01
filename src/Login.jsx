// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 Props:
  - onLogin(user)  <-- App.jsx-dən gəlməlidir və currentUser-i set etməlidir
*/
export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ login: "", pass: "", mobile: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Helper: api base (json-server)
  const API_USERS = "http://localhost:3000/users";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.login || !formData.pass) {
      setMessage("Login və şifrə daxil et.");
      return;
    }

    try {
      const res = await fetch(API_USERS);
      if (!res.ok) throw new Error("users endpoint error");
      const users = await res.json();

      // case-insensitive login comparison, password exact
      const foundUser = users.find(
        (u) =>
          String(u.login).trim().toLowerCase() ===
            String(formData.login).trim().toLowerCase() &&
          String(u.pass) === String(formData.pass)
      );

      if (!foundUser) {
        setMessage("Yanlış login və ya şifrə.");
        return;
      }

      // successful login: inform parent and navigate to role route
      onLogin(foundUser);
      // navigate explicitly (App.jsx also may redirect on currentUser)
      navigate(`/${foundUser.role}`);
    } catch (err) {
      console.error(err);
      setMessage("Serverə qoşulmaq mümkün olmadı. json-server işləyir?");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.login || !formData.pass || !formData.mobile) {
      setMessage("Bütün sahələri doldur.");
      return;
    }

    try {
      const res = await fetch(API_USERS);
      if (!res.ok) throw new Error("users endpoint error");
      const users = await res.json();

      const exists = users.find(
        (u) =>
          String(u.login).trim().toLowerCase() ===
          String(formData.login).trim().toLowerCase()
      );
      if (exists) {
        setMessage("Bu login artıq mövcuddur. Daxil ol.");
        return;
      }

      const newUser = {
        id: Date.now(),
        login: formData.login.trim(),
        pass: formData.pass,
        role: "user",
        mobile: formData.mobile,
        hasReserved: false
      };

      const postRes = await fetch(API_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!postRes.ok) throw new Error("user create failed");

      // set parent and navigate to user page
      onLogin(newUser);
      navigate("/user");
    } catch (err) {
      console.error(err);
      setMessage("Qeydiyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {showRegister ? "Qeydiyyat" : "Daxil ol"}
        </h2>

        <form onSubmit={showRegister ? handleRegister : handleLogin} className="flex flex-col gap-4">
          <input
            placeholder="Login"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          {showRegister && (
            <input
              placeholder="Mobil nömrə"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
          )}

          <button
            type="submit"
            className={`py-3 rounded-lg text-white font-semibold transition ${
              showRegister ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {showRegister ? "Qeydiyyatdan keç" : "Daxil ol"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {!showRegister ? (
            <p className="text-indigo-600 cursor-pointer" onClick={() => { setShowRegister(true); setMessage(""); }}>
              Hesabın yoxdur? Qeydiyyatdan keç
            </p>
          ) : (
            <p className="text-indigo-600 cursor-pointer" onClick={() => { setShowRegister(false); setMessage(""); }}>
              Artıq hesabın var? Daxil ol
            </p>
          )}
        </div>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
