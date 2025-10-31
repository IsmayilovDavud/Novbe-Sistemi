import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-shifts")
      .then((res) => res.json())
      .then((data) => setShifts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">📊 Növbə Dashboard</h1>

      <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Başlama</th>
            <th className="p-3">Bitmə</th>
            <th className="p-3">Status</th>
            <th className="p-3">Rezerv edən</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center">{shift.start}</td>
              <td className="p-3 text-center">{shift.end}</td>
              <td
                className={`p-3 text-center font-semibold ${
                  shift.status === "boşdur"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {shift.status}
              </td>
              <td className="p-3 text-center">
                {shift.bookedBy ? (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {shift.bookedBy}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
