"use client";

import { useState } from "react";

type Project = {
  category: string;
  label: string;
  title: string;
  description: string;
  metrics: Array<[string, string]>;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    category: "ai",
    label: "Applied AI / NLP evaluation",
    title: "LLM Response Quality Classification",
    description:
      "A reproducible four-label classification workflow for evaluating accuracy, completeness, reasoning quality, and hallucination risk.",
    metrics: [["150+", "reviewed outputs"], ["1.00", "macro F1 demo"], ["2", "baseline families"]],
    image: "/assets/llm-quality.png",
    link: "https://github.com/jbinhuang01/jb-portfolio/tree/portfolio-v2",
  },
  {
    category: "data",
    label: "Data engineering / analytics",
    title: "Three-Layer Data Lake Pipeline",
    description:
      "Configuration-driven ingestion with raw snapshots, validation, rejected-record handling, curated customer metrics, and SQL publishing.",
    metrics: [["3", "data layers"], ["98.4%", "valid demo rows"], ["3", "reason-coded rejects"]],
    image: "/assets/data-lake.png",
    link: "https://github.com/jbinhuang01/jb-portfolio/tree/portfolio-v2",
  },
  {
    category: "modeling",
    label: "Quantitative research / point-in-time validation",
    title: "Point-in-Time S&P 500 Return Modeling",
    description:
      "A leakage-aware equity panel using historical index membership, liquidity controls, walk-forward model comparison, factor regimes, placebo tests, moving-block bootstrap, Reality Check, and locked holdout evaluation. The final analysis reports an exploratory signal rather than claiming persistent alpha.",
    metrics: [["704", "historical members"], ["8", "locked OOS quarters"], ["0.04", "locked OOS R²"]],
    image: "/assets/sp500-segments.png",
    link: "https://github.com/jbinhuang01/sp500-modeling",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top">JH</a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
        </nav>
      </header>

      <main id="top">
        <section className="intro">
          <p className="eyebrow">Seattle, WA · U.S. Citizen</p>
          <h1>Jiangbin Huang</h1>
          <p className="intro-role">Data Scientist · Applied AI · Analytics Engineering</p>
          <p className="intro-copy">
            I build validated data pipelines, statistical and machine learning
            workflows, and LLM evaluation systems that turn messy inputs into
            reproducible decisions.
          </p>
          <div className="intro-actions">
            <a className="button primary" href="#projects">View projects</a>
            <a className="button secondary" href="mailto:jbinhuang01@gmail.com">Email</a>
            <a className="text-link" href="https://github.com/jbinhuang01">GitHub</a>
            <a className="text-link" href="https://www.linkedin.com/in/jb-huang-9511141ba">LinkedIn</a>
          </div>
          <dl className="evidence-strip">
            <div><dt>1.2M+</dt><dd>sensor records processed monthly</dd></div>
            <div><dt>40%</dt><dd>SQL query performance improvement</dd></div>
            <div><dt>200+</dt><dd>manual reporting hours saved annually</dd></div>
            <div><dt>150+</dt><dd>LLM responses evaluated</dd></div>
          </dl>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2>Production-oriented projects</h2></div>
            <div className="filters" role="group" aria-label="Filter projects">
              {[['all', 'All'], ['ai', 'Applied AI'], ['data', 'Data Engineering'], ['modeling', 'Modeling']].map(([value, label]) => (
                <button className={`filter ${filter === value ? "active" : ""}`} key={value} onClick={() => setFilter(value)} type="button">{label}</button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <img src={project.image} alt={`${project.title} project visualization`} />
                <div className="project-content">
                  <p className="project-meta">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <dl className="project-results">
                    {project.metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
                  </dl>
                  <a className="project-link" href={project.link}>View technical work on GitHub</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading"><div><p className="eyebrow">Experience</p><h2>From data contracts to model review</h2></div></div>
          <div className="experience-list">
            <article><div><h3>Co-Founder &amp; Data Scientist</h3><p>Early-Stage Data &amp; AI Startup</p></div><p>Built Python and SQL workflows, a three-layer data lake pattern, model-selection pipelines, RAG evaluation, and repeatable technical handoff assets.</p><time>2025 — Present</time></article>
            <article><div><h3>Data / AI Researcher</h3><p>Feelie</p></div><p>Standardized 500K+ conversation records and connected DistilBERT emotion classification, LLM response generation, and rubric-based output review.</p><time>2024 — 2025</time></article>
            <article><div><h3>Data Analyst Intern</h3><p>UW Engineering Services</p></div><p>Built validated ETL and SQL reporting workflows, improved query performance by 40%, and automated 200+ hours of annual reporting work.</p><time>2022 — 2024</time></article>
            <article><div><h3>Research Assistant</h3><p>UW Department of Civil Engineering</p></div><p>Processed 1.2M+ sensor records per month with timestamp alignment, missing-value treatment, noise filtering, and feature engineering; built congestion-monitoring datasets, applied clustering to identify recurring traffic patterns and high-risk locations, and evaluated ARIMA and LSTM forecasting approaches for short-term traffic prediction.</p><time>2021 — 2023</time></article>
          </div>
        </section>

        <section className="capabilities-section" id="skills">
          <div className="section-heading"><div><p className="eyebrow">Capabilities</p><h2>Methods backed by working pipelines</h2></div></div>
          <div className="capability-grid">
            <article><h3>Statistics &amp; Machine Learning</h3><p>Model selection, feature engineering, cross-validation, hypothesis testing, regression, classification, clustering, and time-series forecasting.</p><p className="technology-line">XGBoost · Random Forest · Logistic Regression · PCA · ARIMA · LSTM</p></article>
            <article><h3>Applied AI &amp; LLM Systems</h3><p>RAG workflows, response-quality classification, retrieval evaluation, prompt testing, embeddings, hallucination review, and model evaluation.</p><p className="technology-line">PyTorch · scikit-learn · TensorFlow · LangChain · OpenAI API</p></article>
            <article><h3>Data Engineering &amp; Analytics</h3><p>ETL development, data validation, layered data lakes, schema design, SQL optimization, analytics datasets, and reporting automation.</p><p className="technology-line">Python · SQL · pandas · AWS · Tableau · Power BI</p></article>
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="section-heading"><div><p className="eyebrow">Education</p><h2>Applied mathematics foundation</h2></div></div>
          <div className="education-list">
            <article><div><h3>Master of Science, Applied Mathematics</h3><p>University of Washington · Seattle, WA</p></div><p>Scientific computing, machine learning for large-scale data, database systems, probability, and statistical modeling.</p><time>Dec 2024 · GPA 3.5</time></article>
            <article><div><h3>Bachelor of Science, Applied Mathematics</h3><p>University of Washington · Seattle, WA</p></div><p>Data structures, algorithms, numerical analysis, statistical methods, and computational mathematics.</p><time>Jun 2023 · GPA 3.7</time></article>
          </div>
        </section>
      </main>

      <footer id="contact"><div><p className="eyebrow">Contact</p><h2>Building reliable data products and applied AI workflows.</h2></div><div className="footer-links"><a href="mailto:jbinhuang01@gmail.com">jbinhuang01@gmail.com</a><a href="https://www.linkedin.com/in/jb-huang-9511141ba">LinkedIn</a><a href="https://github.com/jbinhuang01">GitHub</a></div></footer>
    </>
  );
}
