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
            I joined hourly prices, generation, weather, and archived forecast
            runs across DE-LU, France, and Austria. The raw files stay separate
            from the typed tables and model-ready panel.
          </p>
          <a className="inline-block mt-4 underline" href="https://github.com/jbinhuang01/regional-energy-data-lake">
            Walkthrough and repository
          </a>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            LLM Response Quality Classification
          </h2>
          <p className="text-gray-600 mt-2">
            A human-preference study using 135K Arena votes. The project
            compares hard labels, disagreement-aware soft labels, pairwise
            rankers, and a pretrained encoder under grouped and temporal splits.
          </p>
          <a className="inline-block mt-4 underline" href="/projects/llm">
            Read the project walkthrough
          </a>
        </div>

      </div>
    </main>
  );
}
