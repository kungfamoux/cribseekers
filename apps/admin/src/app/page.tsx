export default function AdminHomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CribSeekers Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your real estate platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Properties</h3>
              <p className="text-gray-600">Manage property listings</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Users</h3>
              <p className="text-gray-600">Manage user accounts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">View platform statistics</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
