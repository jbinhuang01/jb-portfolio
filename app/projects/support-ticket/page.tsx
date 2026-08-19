import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support Ticket Triage | Jiangbin Huang",
  description: "A local support-ticket routing service with a review queue and monitoring API.",
};

const routeRows = [
  ["account", "account access and personal details"],
  ["card", "card issues and card payments"],
  ["order_delivery", "orders, delivery, and tracking"],
  ["payment", "payment failures and fees"],
  ["refund", "refund and cancellation requests"],
  ["top_up", "top-up problems"],
  ["transfer", "bank transfer questions"],
  ["verification", "identity and verification"],
  ["other", "messages outside the main queues"],
];

const experimentRows = [
  ["Word + character TF-IDF", "0.7922", "0.90", "current model"],
  ["Frozen BERT embeddings", "0.7277", "0.75", "not promoted"],
  ["Confidence calibration", "0.7642", "0.80", "not promoted"],
];

const styles = String.raw`
.triage-page{width:min(1180px,90vw);margin:0 auto;padding:2rem 0 6rem;color:#18212a}
.triage-page h1,.triage-page h2,.triage-page h3{color:#18212a}
.triage-page h1{max-width:980px;margin:.35rem 0 1rem;font-size:clamp(2.6rem,6vw,5.6rem);line-height:.98}
.triage-page h2{max-width:900px;margin:.2rem 0 1rem;font-size:clamp(1.6rem,3.4vw,2.8rem);line-height:1.12}
.triage-page h3{margin:0 0 .35rem;font-size:1rem}
.back-link{display:inline-block;margin-bottom:2rem;color:#234d6f;font-size:.86rem;font-weight:750;text-decoration:none}
.triage-hero{border-bottom:1px solid #cbd4dd;padding:2rem 0 4rem}
.triage-lede{max-width:850px;margin:0 0 1.5rem;color:#5c6672;font-size:clamp(1.05rem,1.8vw,1.3rem);line-height:1.65}
.triage-links{display:flex;flex-wrap:wrap;align-items:center;gap:1rem;color:#5c6672;font-size:.84rem}
.triage-section{border-bottom:1px solid #cbd4dd;padding:4.5rem 0}
.triage-section>p:not(.eyebrow){max-width:900px;color:#5c6672;font-size:.98rem;line-height:1.7}
.triage-figure{max-width:1000px;margin:2rem 0 0;border:1px solid #cbd4dd;border-radius:6px;background:#fff;overflow:hidden}
.triage-figure img{display:block;width:100%}
.triage-figure figcaption{padding:.9rem 1rem;color:#5c6672;font-size:.78rem;line-height:1.5}
.triage-table-wrap{overflow-x:auto;margin:1.5rem 0}
.triage-table{width:100%;min-width:600px;border-collapse:collapse;border-top:1px solid #18212a;font-size:.82rem}
.triage-table th,.triage-table td{padding:.85rem .8rem;border-bottom:1px solid #cbd4dd;text-align:left}
.triage-table th{color:#234d6f;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase}
.triage-table td:not(:first-child){font-variant-numeric:tabular-nums}
.triage-callout{max-width:920px;margin:1.5rem 0;padding:1.2rem 1.3rem;border-left:4px solid #167c70;background:#edf6f4;color:#3f5960;font-size:.95rem;line-height:1.65}
.triage-code{max-width:900px;margin:1.5rem 0;padding:1.1rem 1.2rem;border:1px solid #cbd4dd;border-radius:6px;background:#f3f6f7;color:#18212a;overflow-x:auto;font:500 .84rem/1.65 ui-monospace,SFMono-Regular,Menlo,monospace}
.triage-final{border-bottom:0}
@media(max-width:760px){.triage-page{width:min(100% - 2rem,1180px)}.triage-section{padding:3rem 0}.triage-links{align-items:flex-start;flex-direction:column}}
`;

function ResultsTable({ rows, headers = ["Item", "Result", "Notes"] }: { rows: string[][]; headers?: string[] }) {
  return (
    <div className="triage-table-wrap">
      <table className="triage-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((value, index) => <td key={`${row[0]}-${index}`}>{value}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function SupportTicketProjectPage() {
  return (
    <main className="triage-page">
      <style>{styles}</style>
      <Link className="back-link" href="/#projects">← Back to selected work</Link>
      <header className="triage-hero">
        <p className="eyebrow">Applied AI / support operations</p>
        <h1>Support Ticket Triage</h1>
        <p className="triage-lede">I built a local service for routing customer-support messages. The interesting part is not just the classifier: uncertain predictions are written to a review queue, and the reviewer&apos;s correction can be recorded for the next training cycle.</p>
        <div className="triage-links"><a className="button primary" href="https://github.com/jbinhuang01/dashboard">Open the GitHub repository</a><span>Python · FastAPI · Streamlit · scikit-learn · SQLite · Docker</span></div>
      </header>

      <section className="triage-section">
        <p className="eyebrow">The workflow</p>
        <h2>A prediction is useful only if the uncertain cases have somewhere to go</h2>
        <p>The API returns a route, confidence, top alternatives, and a review flag. It owns the model and database so the dashboard stays a client of the same HTTP interface that another application could use.</p>
        <figure className="triage-figure"><img src="/assets/support-ticket-triage.svg" alt="Support ticket message flowing through a model and review queue" /><figcaption>The local version uses Streamlit on port 8501, FastAPI on port 8000, and SQLite for the review queue and prediction metrics.</figcaption></figure>
      </section>

      <section className="triage-section">
        <p className="eyebrow">Model</p>
        <h2>Small enough to understand and run on a laptop</h2>
        <p>The serving model uses word and character n-grams with logistic regression. Word features capture common phrases; character features help with spelling variations and short messages. A few explicit rules handle high-precision requests such as cancelling an order.</p>
        <div className="triage-callout"><strong>Held-out test:</strong> 31,496 training rows, 8,454 test rows, 0.9838 accuracy, 0.9780 Macro-F1. These are public-data benchmark numbers, not a production accuracy guarantee.</div>
        <ResultsTable rows={routeRows.map(([route, description]) => [route, description, "shared routing class"])} />
      </section>

      <section className="triage-section">
        <p className="eyebrow">Review policy</p>
        <h2>Confidence is a routing decision, not a quality certificate</h2>
        <p>The default review threshold is 0.60. Below it, the prediction is stored as pending unless an explicit rule has already matched. The `/metrics` endpoint reports total predictions, auto-acceptance, review rate, average confidence, and route distribution.</p>
        <pre className="triage-code">{`POST /predict
{
  "text": "I need to cancel my order"
}

→ { "route": "refund", "confidence": 0.5124,
    "needs_review": true, "review_status": "pending" }`}</pre>
        <p>There is also a separate frozen challenge set. I keep it outside rule changes and model training so it remains a useful check when the routing policy changes.</p>
      </section>

      <section className="triage-section">
        <p className="eyebrow">What I tried</p>
        <h2>The more complicated experiment was not better</h2>
        <p>I trained a frozen-BERT embedding challenger and tested confidence calibration. Both were kept as experiments rather than promoted to the API because they were worse on the held-out challenge set.</p>
        <ResultsTable rows={experimentRows} headers={["Model", "Challenge Macro-F1", "Accuracy", "Decision"]} />
        <p>The comparison is in the repository under `reports/`. Keeping the weaker experiments visible makes the model choice easier to explain than presenting only the final score.</p>
      </section>

      <section className="triage-section triage-final">
        <p className="eyebrow">Current scope</p>
        <h2>A local, reproducible service rather than a cloud product</h2>
        <p>The current version runs with Docker Compose and stores state in a local SQLite file. It has health checks, metrics, a smoke test, and CI. PostgreSQL and Cloud Run notes are included for later work, but cloud deployment is deliberately not part of the default workflow.</p>
        <a className="button primary" href="https://github.com/jbinhuang01/dashboard">Read the code and run it locally</a>
      </section>
    </main>
  );
}
