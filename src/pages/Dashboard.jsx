import allShifts from "../data/all-shifts";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-green-50 p-8">
      {/* Başlıq */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 md:mb-0 animate-pulse">
          📊 Admin Dashboard
        </h1>
        <span className="text-gray-600 text-sm">İdarə paneli — növbə sistemi</span>
      </header>

      {/* Kartlar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-tr from-blue-200 to-blue-400 shadow-lg rounded-xl p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-2">Ümumi növbələr</h2>
          <p className="text-3xl font-bold text-white">{allShifts.length}</p>
        </div>

        <div className="bg-gradient-to-tr from-green-200 to-green-400 shadow-lg rounded-xl p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-2">Boş növbələr</h2>
          <p className="text-3xl font-bold text-white">
            {allShifts.filter((s) => s.status === "boşdur").length}
          </p>
        </div>

        <div className="bg-gradient-to-tr from-red-200 to-red-400 shadow-lg rounded-xl p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-2">Tutulmuş növbələr</h2>
          <p className="text-3xl font-bold text-white">
            {allShifts.filter((s) => s.status === "tutulub").length}
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🕒 Bütün növbələr</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 text-gray-700 uppercase text-sm">
                <th className="border p-3">№</th>
                <th className="border p-3">Başlama</th>
                <th className="border p-3">Bitmə</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {allShifts.map((shift) => {
                const isFree = shift.status === "boşdur";
                return (
                  <tr
                    key={shift.id}
                    className="text-center hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="border p-2 font-medium">{shift.id}</td>
                    <td className="border p-2">{shift.start}</td>
                    <td className="border p-2">{shift.end}</td>
                    <td className="border p-2 flex items-center justify-center gap-2">
                      {isFree ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-600" />
                      )}
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          isFree ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}
                      >
                        {shift.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
