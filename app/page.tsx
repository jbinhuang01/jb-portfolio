import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24">

      {/* Hero Section */}
      <section className="mb-24">
        <h1 className="text-5xl font-semibold tracking-tight mb-6">
          Jiangbin Huang
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl">
          Data Engineer & Data Scientist building scalable data systems,
          real-time ML pipelines, and quantitative risk models.
        </p>

        <Link
          href="/projects"
          className="inline-block mt-8 border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
        >
          View Projects
        </Link>
      </section>

      {/* Expertise Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold mb-8">Expertise</h2>

        <div className="grid md:grid-cols-2 gap-10 text-gray-600">
          <div>
            <h3 className="font-medium mb-2">Data Engineering</h3>
            <p>
              Kafka, Spark, Delta Lake, distributed ETL,
              real-time streaming systems, production pipelines.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Data Science</h3>
            <p>
              LSTM, XGBoost, time-series modeling,
              risk forecasting, statistical modeling.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}