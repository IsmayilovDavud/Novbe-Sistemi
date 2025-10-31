import { useState } from "react";

export default function ChangePassword({ currentUser }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (oldPass !== currentUser.pass) {
      setMessage("❌ Köhnə şifrə yanlışdır!");
      return;
    }

    try {
      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentUser, pass: newPass }),
      });

      setMessage("✅ Şifrə uğurla dəyişdirildi!");
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Serverə yazmaq mümkün olmadı!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">🔒 Şifrəni dəyiş</h2>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Köhnə şifrə"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            className="border rounded-lg p-3"
          />
          <input
            type="password"
            placeholder="Yeni şifrə"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="border rounded-lg p-3"
          />
          <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
            Dəyiş
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
