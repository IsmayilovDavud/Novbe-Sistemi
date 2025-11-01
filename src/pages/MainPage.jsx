import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function MainPage({ onLogout, currentUser }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/all-shifts")
      .then((res) => res.json())
      .then((data) => {
        setShifts(data);
        setLoading(false);
      });
  }, []);

  // --- Rezerv et ---
  const handleBooking = async (id) => {
    const shift = shifts.find((s) => s.id === id);
    if (!shift || shift.status !== "boşdur") return;

    const updatedShift = {
      ...shift,
      status: "rezerv olunub",
      bookedByUser: true,
      bookedBy: currentUser?.login || "Naməlum", // 🟢 Avtomatik istifadəçi adı
      bookedUserId: currentUser?.id || Date.now().toString(), // 🟢 ID də yazılır
    };

    await fetch(`http://localhost:4000/all-shifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedShift),
    });

    setShifts((prev) => prev.map((s) => (s.id === id ? updatedShift : s)));
  };

  // --- Ləğv et ---
  const handleCancel = async (id) => {
    const shift = shifts.find((s) => s.id === id);
    if (!shift || !shift.bookedByUser) return;

    if (shift.bookedUserId !== currentUser.id) {
      alert("❌ Bu növbəni yalnız rezerv edən istifadəçi ləğv edə bilər!");
      return;
    }

    const updatedShift = {
      ...shift,
      status: "boşdur",
      bookedByUser: false,
      bookedBy: null,
      bookedUserId: null,
    };

    await fetch(`http://localhost:4000/all-shifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedShift),
    });

    setShifts((prev) => prev.map((s) => (s.id === id ? updatedShift : s)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-2xl animate-pulse">
        Yüklənir...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse drop-shadow-lg">
          📅 Növbə Cədvəli
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/change-password")}
            className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-full shadow-xl hover:bg-yellow-600 transition duration-300 transform hover:scale-110"
          >
            Şifrəni dəyiş
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-110"
          >
            Çıxış
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shifts.map((shift) => {
          const isFree = shift.status === "boşdur";
          const isMine = shift.bookedUserId === currentUser.id;

          return (
            <div
              key={shift.id}
              className={`relative p-6 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                isFree
                  ? "bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 border-2 border-cyan-400"
                  : isMine
                  ? "bg-gradient-to-tr from-green-500 via-blue-600 to-teal-500 border-2 border-green-300"
                  : "bg-gradient-to-tr from-red-500 via-pink-600 to-red-700 opacity-80 border-2 border-red-600"
              }`}
              onClick={() => isFree && handleBooking(shift.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xl font-bold text-white drop-shadow-md">
                  {shift.start} - {shift.end}
                </p>
                {isFree ? (
                  <CheckCircleIcon className="w-7 h-7 text-cyan-200 animate-pulse" />
                ) : (
                  <XCircleIcon className="w-7 h-7 text-red-200" />
                )}
              </div>

              <p className="text-white font-medium">
                Status:{" "}
                <span className="font-bold">
                  {shift.status}{" "}
                  {shift.bookedBy && (
                    <span className="text-yellow-300">
                      ({shift.bookedBy})
                    </span>
                  )}
                </span>
              </p>

              {isMine && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel(shift.id);
                  }}
                  className="mt-3 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold py-2 rounded-full hover:scale-105 transition"
                >
                  Ləğv et / Dəyiş
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
