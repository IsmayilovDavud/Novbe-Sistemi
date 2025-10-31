import React, { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-shifts")
      .then((res) => res.json())
      .then((data) => setShifts(data));
  }, []);

  const total = shifts.length;
  const free = shifts.filter((s) => s.status === "boşdur").length;
  const booked = shifts.filter((s) => s.status !== "boşdur").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-green-50 p-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 md:mb-0 animate-pulse">
          📊 Admin Dashboard
        </h1>
        <span className="text-gray-600 text-sm">Növbə idarəetmə paneli</span>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-300 shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Ümumi növbələr</h2>
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>
        <div className="bg-green-300 shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Boş növbələr</h2>
          <p className="text-3xl font-bold text-white">{free}</p>
        </div>
        <div className="bg-red-300 shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Rezerv olunub</h2>
          <p className="text-3xl font-bold text-white">{booked}</p>
        </div>
      </section>

      <section className="bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🕒 Bütün növbələr</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 text-gray-700 uppercase">
                <th className="border p-3">№</th>
                <th className="border p-3">Başlama</th>
                <th className="border p-3">Bitmə</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((s) => (
                <tr key={s.id} className="text-center hover:bg-gray-50">
                  <td className="border p-2 font-medium">{s.id}</td>
                  <td className="border p-2">{s.start}</td>
                  <td className="border p-2">{s.end}</td>
                  <td className="border p-2 flex items-center justify-center gap-2">
                    {s.status === "boşdur" ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        s.status === "boşdur"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
