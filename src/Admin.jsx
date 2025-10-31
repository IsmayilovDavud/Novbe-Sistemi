import Dashboard from "./pages/Dashboard";

export default function Admin({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-700 text-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">👑 Admin Panel</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Çıxış
        </button>
      </header>

      {/* Dashboard Component */}
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
