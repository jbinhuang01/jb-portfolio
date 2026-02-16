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

      {/* Expertise */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold mb-10">
          Expertise
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-gray-700">

          {/* Data Engineering */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Data Engineering
            </h3>

            <ul className="space-y-2 text-sm">
              <li>End-to-end ETL pipeline design</li>
              <li>Real-time streaming systems (Kafka, Spark)</li>
              <li>Schema design, partitioning & indexing</li>
            </ul>

            <p className="text-xs text-gray-500 mt-4">
              Kafka · Spark · Delta Lake · SQL · AWS
            </p>
          </div>

          {/* Machine Learning */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Machine Learning
            </h3>

            <ul className="space-y-2 text-sm">
              <li>Feature engineering & model selection</li>
              <li>LSTM, XGBoost, ARIMA</li>
              <li>Cross-validation & performance evaluation</li>
            </ul>

            <p className="text-xs text-gray-500 mt-4">
              PyTorch · scikit-learn · TensorFlow
            </p>
          </div>

          {/* Statistical Inference */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Statistical Inference
            </h3>

            <ul className="space-y-2 text-sm">
              <li>A/B testing & experiment design</li>
              <li>Hypothesis testing & confidence intervals</li>
              <li>Regression & time-series analysis</li>
            </ul>

            <p className="text-xs text-gray-500 mt-4">
              Probability · Statistical Modeling
            </p>
          </div>

        </div>
      </section>
      {/* Education */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold mb-8">Education</h2>

        <div className="space-y-6 text-gray-700">

          <div>
            <h3 className="text-xl font-medium">
              University of Washington
            </h3>
            <p>Master of Science in Applied Mathematics (2023–2024)</p>
            <p className="text-gray-500">
              Scientific Computing, Database Management,
              Machine Learning for Big Data
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              University of Washington
            </h3>
            <p>Bachelor of Science in Applied Mathematics (2020–2023)</p>
            <p className="text-gray-500">
              Data Structures, Algorithms, Statistical Methods,
              Computational Mathematics
            </p>
          </div>

        </div>
      </section>
      {/* Selected Coursework */}
    <section className="mb-24">
      <h2 className="text-3xl font-semibold mb-10">
        Selected Coursework
      </h2>

      <div className="grid md:grid-cols-3 gap-10 text-gray-700">

        <div>
          <h3 className="font-medium mb-4">
            Applied Mathematics
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Probability & Random Processes</li>
            <li>Scientific Computing</li>
            <li>Partial Differential Equations</li>
            <li>Linear Algebra & Numerical Analysis</li>
            <li>Dynamical Systems & Chaos</li>
            <li>Applied Complex Analysis</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">
            Computer Science
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Data Structures & Algorithms</li>
            <li>Database Systems</li>
            <li>Algorithms & Complexity</li>
            <li>Scientific Computing (Programming)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">
            Statistics & Modeling
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Statistical Methods</li>
            <li>Discrete Mathematical Modeling</li>
            <li>Time-Series Modeling</li>
          </ul>
        </div>

      </div>
    </section>
    </main>
  );
}