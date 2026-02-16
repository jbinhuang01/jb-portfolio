export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-semibold mb-12">
        Projects
      </h1>

      <div className="space-y-8">

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Real-Time Crypto Risk Engine
          </h2>
          <p className="text-gray-600 mt-2">
            Streaming risk analytics system using Kafka, Spark,
            and LSTM volatility forecasting.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Streaming Traffic Forecasting
          </h2>
          <p className="text-gray-600 mt-2">
            Real-time sensor ingestion with time-series ML models.
          </p>
        </div>

      </div>
    </main>
  );
}