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

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Support Ticket Triage
          </h2>
          <p className="text-gray-600 mt-2">
            A local FastAPI and Streamlit service for routing support messages.
            It records low-confidence predictions in a review queue and keeps
            the model, API, dashboard, and SQLite state in one reproducible
            Docker Compose workflow.
          </p>
          <a className="inline-block mt-4 underline" href="/projects/support-ticket">
            Read the project walkthrough
          </a>
        </div>

      </div>
    </main>
  );
}
