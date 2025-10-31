import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    login: "",
    pass: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.login || !newUser.pass) {
      setMessage("❗ Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const exists = users.find(
        (u) => u.login.toLowerCase() === newUser.login.toLowerCase()
      );

      if (exists) {
        setMessage("⚠️ Bu login artıq mövcuddur!");
        return;
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          login: newUser.login,
          pass: newUser.pass,
          role: "user",
        }),
      });

      setMessage("✅ Qeydiyyat uğurla tamamlandı!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Serverə yazmaq mümkün olmadı!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Yeni istifadəçi qeydiyyatı
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Login"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newUser.login}
            onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
          />

          <input
            type="password"
            placeholder="Şifrə"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newUser.pass}
            onChange={(e) => setNewUser({ ...newUser, pass: e.target.value })}
          />

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold rounded-lg p-3 hover:bg-green-700 transition"
          >
            Qeydiyyatdan keç
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium text-blue-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
