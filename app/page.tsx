export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-8 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <section className="mb-20">
          <h1 className="text-5xl font-bold mb-6">
            Jiangbin Huang
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Data Engineer & Applied ML Engineer specializing in 
            scalable streaming systems, real-time analytics pipelines,
            and quantitative risk modeling.
          </p>
        </section>

        {/* About */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            I design and build production-grade data systems integrating
            distributed data engineering (Kafka, Spark, Delta Lake)
            with advanced machine learning models (LSTM, GARCH, XGBoost).
            My work focuses on performance, scalability, and measurable impact.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Selected Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Crypto Risk Engine
              </h3>
              <p className="text-gray-600">
                Kafka → Spark → Delta Lake pipeline processing 500k+ trades daily,
                with LSTM-based volatility forecasting and VaR dashboard.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">
                Streaming Traffic Forecasting
              </h3>
              <p className="text-gray-600">
                Built real-time data pipeline handling 1.2M+ sensor readings
                and trained LSTM time-series model achieving 87% accuracy.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}