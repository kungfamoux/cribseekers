export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CribSeekers
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Modern Nigerian Real Estate Platform
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
