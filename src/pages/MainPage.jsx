import React, { useState } from "react";
import allShifts from "../data/all-shifts";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function MainPage({ onLogout }) {
  const [shifts, setShifts] = useState(allShifts);

  const handleBooking = (id) => {
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === id && shift.status === "boşdur"
          ? { ...shift, status: "doludur", bookedByUser: true }
          : shift
      )
    );
  };

  const handleCancel = (id) => {
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === id && shift.bookedByUser
          ? { ...shift, status: "boşdur", bookedByUser: false }
          : shift
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse drop-shadow-lg">
          📅 Növbə Cədvəli
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-110 hover:rotate-1"
        >
          Çıxış
        </button>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shifts.map((shift) => {
          const isFree = shift.status === "boşdur";
          const bookedByUser = shift.bookedByUser;

          return (
            <div
              key={shift.id}
              className={`relative p-6 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ${
                isFree
                  ? "bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 border-2 border-cyan-400 hover:shadow-[0_0_20px_rgba(72,255,233,0.7)]"
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

              <p className="font-medium text-white drop-shadow">
                Status:{" "}
                <span className={isFree ? "text-cyan-200 font-bold" : "text-red-200 font-bold"}>
                  {shift.status}
                </span>
              </p>

              {isFree && (
                <p className="mt-2 text-sm text-white italic animate-pulse drop-shadow">
                  Klikləyərək rezerv edin
                </p>
              )}

              {bookedByUser && (
                <button
                  onClick={() => handleCancel(shift.id)}
                  className="mt-3 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold py-2 rounded-full shadow-lg 
                             hover:from-blue-400 hover:via-pink-500 hover:to-purple-600 
                             hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] hover:scale-105 transition transform duration-300"
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
