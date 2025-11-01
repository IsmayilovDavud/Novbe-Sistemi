// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";

export default function Admin({ onLogout, currentUser }) {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-shifts")
      .then((res) => res.json())
      .then(setShifts)
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = async (id) => {
    const shift = shifts.find((s) => s.id === id);
    if (!shift) return;

    const newStatus = shift.status === "boşdur" ? "rezerv olunub" : "boşdur";
    const updatedShift = {
      ...shift,
      status: newStatus,
      bookedByUser: newStatus === "rezerv olunub" ? "Admin tərəfindən" : false,
      bookedBy: newStatus === "rezerv olunub" ? "Admin" : null,
      bookedUserId: newStatus === "rezerv olunub" ? currentUser.id : null,
    };

    await fetch(`http://localhost:4000/all-shifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedShift),
    });

    setShifts((prev) => prev.map((s) => (s.id === id ? updatedShift : s)));
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/all-shifts/${id}`, { method: "DELETE" });
    setShifts((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 drop-shadow-lg">
          Admin Paneli - Növbələr
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-full shadow-md transform transition hover:scale-105"
        >
          Çıxış
        </button>
      </div>

      {/* Shift Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Başlama vaxtı</th>
              <th className="py-3 px-6 text-left">Bitmə vaxtı</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Rezerv edən</th>
              <th className="py-3 px-6 text-left">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {shifts.length > 0 ? (
              shifts.map((shift) => (
                <tr
                  key={shift.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{shift.id}</td>
                  <td className="py-3 px-6">{shift.start}</td>
                  <td className="py-3 px-6">{shift.end}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      shift.status === "rezerv olunub"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {shift.status}
                  </td>
                  <td className="py-3 px-6">
                    {shift.status === "rezerv olunub"
                      ? shift.bookedBy || "Naməlum"
                      : "-"}
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      onClick={() => handleEdit(shift.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(shift.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="py-4 px-6 text-center text-gray-500"
                  colSpan="6"
                >
                  Hələ növbə yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
