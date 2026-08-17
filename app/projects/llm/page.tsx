import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LLM Response Quality Classification | Jiangbin Huang",
  description: "A human-preference study of LLM responses using grouped evaluation, soft labels, pairwise scoring, and a temporal locked test.",
};

const pipelineSteps = [
  ["A", "Start with the label", "The task has four outcomes: model A wins, model B wins, tie, or both responses are bad. Keeping the two tie outcomes matters because a winner-only classifier can hide disagreement."],
  ["B", "Keep prompts together", "The development folds are grouped by a normalized question so a near-duplicate prompt does not appear in both training and validation."],
  ["C", "Separate development from test", "Model selection uses the chronological train pool. A separate 27,127-row temporal split is frozen for the formal baseline."],
  ["D", "Compare simple models first", "Word and character TF-IDF provide interpretable references before introducing soft targets or a neural scorer."],
  ["E", "Model disagreement explicitly", "Soft-label training and pairwise scoring are evaluated with tie recall, Macro-F1, calibration, and error slices rather than accuracy alone."],
  ["F", "Keep the encoder result honest", "The pretrained pairwise encoder is still a development experiment. More rows did not automatically produce a better Macro-F1."],
];

const modelRows = [
  ["Word TF-IDF", "0.2508", "Reference baseline"],
  ["Character TF-IDF", "0.2488", "Close to word features"],
  ["Class-balanced soft-label TF-IDF", "0.2850", "Best current development result"],
  ["Pairwise TF-IDF ranker", "0.2674", "Tie recall is much higher"],
  ["Pairwise BERT, 5K MPS", "0.2398", "Exploratory encoder run"],
];

function ResultsTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="research-table-wrap">
      <table className="research-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((value, index) => <td key={`${row[0]}-${index}`}>{value}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const researchStyles = String.raw`
.research-page{width:min(1180px,90vw);margin:0 auto;padding:2rem 0 6rem;color:#18212a}
.research-page h1,.research-page h2,.research-page h3{color:#18212a}
.research-page h1{max-width:980px;margin:.35rem 0 1rem;font-size:clamp(2.6rem,6vw,5.6rem);line-height:.98}
.research-page h2{max-width:900px;margin:.2rem 0 1rem;font-size:clamp(1.6rem,3.4vw,2.8rem);line-height:1.12}
.research-page h3{margin:0 0 .35rem;font-size:1rem}
.back-link{display:inline-block;margin-bottom:2rem;color:#234d6f;font-size:.86rem;font-weight:750;text-decoration:none}
.research-hero{border-bottom:1px solid #cbd4dd;padding:2rem 0 4rem}
.research-lede{max-width:850px;margin:0 0 1.5rem;color:#5c6672;font-size:clamp(1.05rem,1.8vw,1.3rem);line-height:1.65}
.research-links{display:flex;flex-wrap:wrap;align-items:center;gap:1rem;color:#5c6672;font-size:.84rem}
.research-section{border-bottom:1px solid #cbd4dd;padding:4.5rem 0}
.research-section>p:not(.eyebrow){max-width:900px;color:#5c6672;font-size:.98rem;line-height:1.7}
.research-process{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 2rem;margin:2rem 0;padding:0;list-style:none;border-top:1px solid #18212a}
.research-process li{display:grid;grid-template-columns:2.5rem 1fr;gap:.8rem;border-bottom:1px solid #cbd4dd;padding:1.2rem 0}
.process-index{display:grid;width:2.2rem;height:2.2rem;place-items:center;border-radius:50%;background:#234d6f;color:#fff;font-size:.8rem;font-weight:850}
.research-process p{margin:0;color:#5c6672;font-size:.86rem;line-height:1.5}
.research-figure{max-width:900px;margin:2rem 0 0;border:1px solid #cbd4dd;background:#fff}
.research-figure img{display:block;width:100%}
.research-figure figcaption{padding:.9rem 1rem;color:#5c6672;font-size:.78rem;line-height:1.5}
.research-table-wrap{overflow-x:auto;margin:1.5rem 0}
.research-table{width:100%;min-width:600px;border-collapse:collapse;border-top:1px solid #18212a;font-size:.82rem}
.research-table th,.research-table td{padding:.85rem .8rem;border-bottom:1px solid #cbd4dd;text-align:left}
.research-table th{color:#234d6f;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase}
.research-table td:not(:first-child){font-variant-numeric:tabular-nums}
.research-callout{max-width:920px;margin:1.5rem 0;padding:1.2rem 1.3rem;border-left:4px solid #167c70;background:#edf6f4;color:#3f5960;font-size:.95rem;line-height:1.65}
.research-final{border-bottom:0}
@media(max-width:760px){.research-page{width:min(100% - 2rem,1180px)}.research-process{grid-template-columns:1fr}.research-section{padding:3rem 0}.research-links{align-items:flex-start;flex-direction:column}}
`;

export default function LLMProjectPage() {
  return (
    <main className="research-page">
      <style>{researchStyles}</style>
      <Link className="back-link" href="/#projects">← Back to selected work</Link>
      <header className="research-hero">
        <p className="eyebrow">Applied AI / preference modeling</p>
        <h1>LLM Response Quality Classification</h1>
        <p className="research-lede">I started with a small rubric for reviewing response quality, then moved to a larger question: can a model predict human preferences while admitting that reviewers sometimes disagree?</p>
        <div className="research-links"><a className="button primary" href="https://github.com/jbinhuang01/llm_response">Open research repository</a><span>Python · scikit-learn · PyTorch · grouped evaluation</span></div>
      </header>

      <section className="research-section">
        <p className="eyebrow">Research question</p>
        <h2>Can a text model tell the difference between a clear winner and a genuinely ambiguous comparison?</h2>
        <p>The main data source is the public Arena preference export. Each record contains a prompt, two responses, and a human vote. Instead of collapsing every vote into a binary winner, the pipeline keeps model A, model B, tie, and tie (bothbad) as separate outcomes.</p>
        <div className="research-callout"><strong>Current scale:</strong> 135,634 votes, 53 models, 126 languages, and a 27,127-row temporal test held out from later model selection.</div>
      </section>

      <section className="research-section">
        <p className="eyebrow">Evaluation design</p>
        <h2>The split is part of the model</h2>
        <ol className="research-process">
          {pipelineSteps.map(([letter, title, description]) => <li key={letter}><span className="process-index">{letter}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="research-section">
        <p className="eyebrow">Model comparison</p>
        <h2>More complexity did not automatically solve the hard part</h2>
        <p>The development metric is Macro-F1 because the two tie classes are smaller than the two winner classes. Tie recall is reported separately because a system that never predicts ties can still look acceptable on accuracy.</p>
        <ResultsTable headers={["Model", "Mean Macro-F1", "Reading"]} rows={modelRows} />
        <figure className="research-figure"><img src="/assets/llm-quality.png" alt="LLM response quality experiment visualization" /><figcaption>The portfolio image is a compact view of the earlier quality-labeling work. The current research repository contains the larger preference experiments, split manifests, reports, and out-of-fold predictions.</figcaption></figure>
      </section>

      <section className="research-section">
        <p className="eyebrow">What changed with soft labels</p>
        <h2>The best current model trades some winner accuracy for better disagreement coverage</h2>
        <p>The class-balanced soft-label TF-IDF model reached mean Macro-F1 0.2850 and mean tie recall 0.3385 across three seeds. Its accuracy was lower than the hard-label baseline. That is not a universal improvement; it is a deliberate choice to make ambiguous judgments visible.</p>
        <p>The pairwise TF-IDF ranker pushed tie recall to 0.7016, but its Macro-F1 was 0.2674. It shows that the score-difference structure is useful, while the underlying response-quality scorer still needs work.</p>
      </section>

      <section className="research-section">
        <p className="eyebrow">Pretrained encoder</p>
        <h2>The encoder is currently an exploratory result</h2>
        <p>The shared BERT pairwise scorer was run locally with MPS on 2K and 5K rows. The 5K run reached Macro-F1 0.2398 and tie recall 0.6989. It is not selected as the final model. The next fair comparison would fix the seeds, epochs, token budget, and development folds before any new locked evaluation.</p>
      </section>

      <section className="research-section research-final">
        <p className="eyebrow">Takeaway</p>
        <h2>The useful result is a better evaluation question</h2>
        <p>The hard-label baseline learns a winner signal but misses disagreement. Soft targets improve the balance between winner and tie classes, while pairwise scoring makes the disagreement trade-off easier to inspect. The current evidence supports the evaluation design; it does not support claiming that the pretrained encoder is already the best model.</p>
        <a className="button primary" href="https://github.com/jbinhuang01/llm_response">Read the code and reports on GitHub</a>
      </section>
    </main>
  );
}
