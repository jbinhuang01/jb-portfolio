import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support ticket routing | Jiangbin Huang",
  description: "A local support-ticket routing service with a review queue.",
};

const experimentRows = [
  ["Word + character TF-IDF", "0.7922", "kept"],
  ["Frozen BERT embeddings", "0.7277", "not kept"],
  ["Confidence calibration", "0.7642", "not kept"],
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
.triage-table{width:100%;min-width:520px;border-collapse:collapse;border-top:1px solid #18212a;font-size:.82rem}
.triage-table th,.triage-table td{padding:.85rem .8rem;border-bottom:1px solid #cbd4dd;text-align:left}
.triage-table th{color:#234d6f;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase}
.triage-table td:not(:first-child){font-variant-numeric:tabular-nums}
.triage-callout{max-width:920px;margin:1.5rem 0;padding:1.2rem 1.3rem;border-left:4px solid #167c70;background:#edf6f4;color:#3f5960;font-size:.95rem;line-height:1.65}
.triage-code{max-width:900px;margin:1.5rem 0;padding:1.1rem 1.2rem;border:1px solid #cbd4dd;border-radius:6px;background:#f3f6f7;color:#18212a;overflow-x:auto;font:500 .84rem/1.65 ui-monospace,SFMono-Regular,Menlo,monospace}
.triage-list{max-width:850px;margin:1.2rem 0;padding-left:1.2rem;color:#5c6672;line-height:1.75}
.triage-final{border-bottom:0}
@media(max-width:760px){.triage-page{width:min(100% - 2rem,1180px)}.triage-section{padding:3rem 0}.triage-links{align-items:flex-start;flex-direction:column}}
`;

function ResultsTable({ rows }: { rows: string[][] }) {
  return (
    <div className="triage-table-wrap">
      <table className="triage-table">
        <thead><tr><th>Experiment</th><th>Challenge Macro-F1</th><th>Decision</th></tr></thead>
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
        <p className="eyebrow">Customer support tooling</p>
        <h1>Support ticket routing</h1>
        <p className="triage-lede">I wanted a small project that went beyond a notebook. This one takes a customer message through an API, saves the prediction, and leaves a place for a reviewer to correct it when the model is unsure.</p>
        <div className="triage-links"><a className="button primary" href="https://github.com/jbinhuang01/dashboard">GitHub repository</a><span>Python · FastAPI · Streamlit · scikit-learn · SQLite · Docker</span></div>
      </header>

      <section className="triage-section">
        <p className="eyebrow">The basic loop</p>
        <h2>What happens after a message comes in</h2>
        <p>The dashboard sends the message to FastAPI. The API chooses a route, calculates a confidence score, writes the result to SQLite, and returns the top alternatives. When the score is below 0.60, the row stays in the review queue instead of being treated as settled.</p>
        <figure className="triage-figure"><img src="/assets/support-ticket-triage.svg" alt="Local support ticket review page showing a customer message, prediction, and review queue" /><figcaption>This is the local setup: a simple review page on top of the same API used by the prediction request.</figcaption></figure>
      </section>

      <section className="triage-section">
        <p className="eyebrow">Model choice</p>
        <h2>I kept the first model deliberately boring</h2>
        <p>The serving model is a word-and-character TF-IDF pipeline with logistic regression. Word features handle common phrases; character features help with spelling differences and short messages. A few explicit rules cover requests that are easy to recognize, such as cancelling an order.</p>
        <div className="triage-callout"><strong>Held-out split:</strong> 31,496 training rows and 8,454 test rows. Accuracy was 0.9838 and Macro-F1 was 0.9780 on this public-data benchmark. That score should not be read as expected accuracy on a real support queue.</div>
        <p>The shared router has ten coarse routes, including account, card, order delivery, payment, refund, transfer, and an `other` bucket. The two source datasets use different original labels, so I mapped them into this smaller set rather than pretending the taxonomies were identical.</p>
      </section>

      <section className="triage-section">
        <p className="eyebrow">Review queue</p>
        <h2>The uncertain cases are still part of the system</h2>
        <p>A prediction is not the same thing as a confirmed label. The API returns the route, confidence, alternatives, and review status. A reviewer can submit a corrected route through the dashboard or <code>POST /review/:prediction_id</code>.</p>
        <pre className="triage-code">{`POST /predict
{
  "text": "I need to cancel my order"
}

→ { "route": "refund", "confidence": 0.5124,
    "needs_review": true, "review_status": "pending" }`}</pre>
        <p>There is also a 40-row challenge set that is kept separate from training and rule changes. It is small, but it gives me a fixed place to check whether a new experiment actually helps.</p>
      </section>

      <section className="triage-section">
        <p className="eyebrow">Experiments</p>
        <h2>The bigger experiment did not help this dataset</h2>
        <p>I tried frozen BERT embeddings and a confidence-calibration step. Both stayed in the repository as comparisons; neither replaced the smaller serving model.</p>
        <ResultsTable rows={experimentRows} />
        <p>The main reason is simple: the alternatives were worse on the frozen challenge set. Keeping that result visible is more useful than presenting only the model that made it into the API.</p>
      </section>

      <section className="triage-section triage-final">
        <p className="eyebrow">Before real use</p>
        <h2>What I would change before connecting real tickets</h2>
        <ul className="triage-list">
          <li>Replace the public and synthetic data with a reviewed sample from the actual support queue.</li>
          <li>Move from local SQLite to a managed database if more than one API instance is needed.</li>
          <li>Measure correction rates by route instead of relying on one overall score.</li>
          <li>Add authentication and audit permissions before exposing the review endpoint.</li>
        </ul>
        <a className="button primary" href="https://github.com/jbinhuang01/dashboard">Read the code</a>
      </section>
    </main>
  );
}
