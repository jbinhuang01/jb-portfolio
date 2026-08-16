export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-semibold mb-12">
        Projects
      </h1>

      <div className="space-y-8">

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Regional Energy Data Lake
          </h2>
          <p className="text-gray-600 mt-2">
            Hourly prices, generation, weather, and forecast vintages joined
            across DE-LU, France, and Austria. The pipeline keeps raw source
            snapshots separate from typed data and model-ready outputs.
          </p>
          <a className="inline-block mt-4 underline" href="https://github.com/jbinhuang01/regional-energy-data-lake">
            Repository and analysis
          </a>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            LLM Response Quality Classification
          </h2>
          <p className="text-gray-600 mt-2">
            A four-label review workflow for accuracy, completeness, reasoning
            quality, and hallucination risk across 150+ responses.
          </p>
        </div>

      </div>
    </main>
  );
}
