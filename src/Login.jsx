import { useState } from "react";
import UserData from "./data/users";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ login: "", pass: "" });
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = UserData.find(
      (u) => u.login === formData.login && u.pass === formData.pass
    );

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setMessage("❌ Yanlış login və ya şifrə!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[380px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Giriş səhifəsi
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Login"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.login}
            onChange={(e) =>
              setFormData({ ...formData, login: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Şifrə"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-lg p-3 hover:bg-blue-700 transition"
          >
            Daxil ol
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
