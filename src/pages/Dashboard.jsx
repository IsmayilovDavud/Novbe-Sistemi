import allShifts from "../data/all-shifts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Başlıq */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-700">📊 Admin Dashboard</h1>
        <span className="text-gray-500 text-sm">İdarə paneli — növbə sistemi</span>
      </header>

      {/* Kartlar bölməsi */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Ümumi növbələr</h2>
          <p className="text-3xl font-bold text-blue-600">{allShifts.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Boş növbələr</h2>
          <p className="text-3xl font-bold text-green-600">
            {allShifts.filter((s) => s.status === "boşdur").length}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Tutulmuş növbələr</h2>
          <p className="text-3xl font-bold text-red-600">
            {allShifts.filter((s) => s.status === "tutulub").length}
          </p>
        </div>
      </section>

      {/* Növbə cədvəli */}
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">🕒 Bütün növbələr</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3">№</th>
              <th className="border p-3">Başlama</th>
              <th className="border p-3">Bitmə</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {allShifts.map((shift) => (
              <tr
                key={shift.id}
                className="text-center hover:bg-gray-50 transition"
              >
                <td className="border p-2 font-medium">{shift.id}</td>
                <td className="border p-2">{shift.start}</td>
                <td className="border p-2">{shift.end}</td>
                <td
                  className={`border p-2 font-semibold ${
                    shift.status === "boşdur"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {shift.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
