import { useState } from "react";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Bütün sahələri doldurun!");
    
    // LocalStorage-ə istifadəçi əlavə et
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === username)) {
      return alert("Bu istifadəçi adı artıq mövcuddur!");
    }
    users.push({ username, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    onRegister({ username, role: "user" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Qeydiyyat</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Qeydiyyatdan keç
        </button>
      </form>
    </div>
  );
}
