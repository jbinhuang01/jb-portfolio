import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regional Energy Data Lake | Jiangbin Huang",
  description: "A three-layer energy data lake joining forecast vintages, weather, generation, and market prices across three European zones.",
};

const processSteps = [
  ["A", "Keep the source vintages", "Store downloaded files, checksums, manifests, and ingestion batches in Bronze so a result can be traced back to a source file."],
  ["B", "Make timestamps explicit", "Parse UTC timestamps, keep source resolution, standardize column names and units, and preserve rejected or missing records for review."],
  ["C", "Join realized and forecast weather", "For each forecast run, align the realized weather outcome with the forecast available at that run time rather than using a later revision."],
  ["D", "Build the Gold impact panel", "Create one analysis-ready table with day-ahead price, renewable regime, weather errors, generation forecast errors, and residual load."],
  ["E", "Estimate conditional relationships", "Fit zone, hour, and date fixed-effects models with standard errors two-way clustered by valid time and forecast run."],
  ["F", "State what the design cannot identify", "Treat the estimates as conditional associations. The current sample is one month, the weather coverage is sparse, and market outcomes repeat across vintages."],
];

const zoneRows = [
  ["DE-LU", "105.63", "35.75", "20.28%"],
  ["AT", "90.03", "40.87", "19.62%"],
  ["FR", "51.95", "12.26", "17.04%"],
];

const modelRows = [
  ["Day-ahead price", "21,510", "0.8372", "30", "Price level"],
  ["Price with regime interactions", "21,510", "0.8398", "30", "Price level"],
  ["24-hour price volatility", "21,480", "0.6237", "30", "Volatility"],
  ["Negative-price indicator", "21,510", "0.5335", "30", "Binary outcome"],
];

const coefficientRows = [
  ["Actual residual load", "+19.05", "<0.001", "Higher residual load is associated with higher price."],
  ["Solar forecast error", "−2.27", "<0.001", "The standardized error has a negative price association."],
  ["Wind-onshore forecast error", "−2.62", "<0.001", "The standardized error has a negative price association."],
  ["Temperature absolute error", "−1.44", "<0.001", "Temperature error is associated with lower price in this panel."],
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

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="research-figure"><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>;
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
.research-figures{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:2rem}
.research-figure{overflow:hidden;margin:0;border:1px solid #cbd4dd;border-radius:6px;background:#fff}
.research-figure img{display:block;width:100%;border-bottom:1px solid #cbd4dd}
.research-figure figcaption{padding:.9rem 1rem;color:#5c6672;font-size:.78rem;line-height:1.5}
.research-table-wrap{overflow-x:auto;margin:1.5rem 0}
.research-table{width:100%;min-width:650px;border-collapse:collapse;border-top:1px solid #18212a;font-size:.82rem}
.research-table th,.research-table td{padding:.85rem .8rem;border-bottom:1px solid #cbd4dd;text-align:left;white-space:nowrap}
.research-table th{color:#234d6f;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase}
.research-table td:not(:first-child){font-variant-numeric:tabular-nums}
.research-callout{max-width:920px;margin:1.5rem 0;padding:1.2rem 1.3rem;border-left:4px solid #167c70;background:#edf6f4;color:#3f5960;font-size:.95rem;line-height:1.65}
.table-note{font-size:.82rem!important}
.research-final{border-bottom:0}
@media(max-width:760px){.research-page{width:min(100% - 2rem,1180px)}.research-process,.research-figures{grid-template-columns:1fr}.research-section{padding:3rem 0}.research-links{align-items:flex-start;flex-direction:column}}
`;

export default function EnergyProjectPage() {
  return (
    <main className="research-page">
      <style>{researchStyles}</style>
      <a className="back-link" href="/#projects">← Back to selected work</a>
      <header className="research-hero">
        <p className="eyebrow">Energy data engineering / forecast impact</p>
        <h1>Regional Energy Data Lake</h1>
        <p className="research-lede">A three-layer data lake for asking a narrow market question with messy, versioned inputs: when a weather or generation forecast is wrong, what relationship does the error have with the next observed electricity price?</p>
        <div className="research-links"><a className="button primary" href="https://github.com/jbinhuang01/regional-energy-data-lake">Open project repository</a><span>Python · pandas · Parquet · fixed effects · clustered inference</span></div>
      </header>

      <section className="research-section">
        <p className="eyebrow">Research question</p>
        <h2>Do forecast errors line up with market outcomes after the obvious time patterns are accounted for?</h2>
        <p>The project does not try to forecast prices with a black-box model. It first makes the data lineage explicit, then asks whether forecast error is associated with day-ahead price, price volatility, and negative-price probability. That distinction matters because the same realized market outcome is observed against multiple forecast vintages.</p>
        <div className="research-callout"><strong>Current scope:</strong> 30 archived forecast runs, 3 bidding zones, 588 common valid hours per zone, and 21,600 Gold rows. The current sample is one month, so the results are useful for demonstrating the design and its limitations, not for claiming a stable market law.</div>
      </section>

      <section className="research-section">
        <p className="eyebrow">End-to-end process</p>
        <h2>From raw source files to one panel I can rerun</h2>
        <ol className="research-process">
          {processSteps.map(([letter, title, description], index) => <li key={letter}><span className="process-index">{letter}</span><div><h3>{index + 1}. {title}</h3><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="research-section">
        <p className="eyebrow">Visual evidence</p>
        <h2>The zone split is part of the result</h2>
        <div className="research-figures">
          <Figure src="/assets/data-lake.png" alt="Mean price and negative-price rate by renewable regime across three bidding zones" caption="High-renewable hours have lower mean prices in all three zones, but the baseline price level and negative-price rate differ across DE-LU, Austria, and France." />
          <Figure src="/assets/energy/regime-interactions.png" alt="Forecast-error coefficients by renewable regime" caption="The interaction plot shows that the relationship between forecast-error variables and price is not identical across renewable regimes." />
        </div>
      </section>

      <section className="research-section">
        <p className="eyebrow">Descriptive results</p>
        <h2>High-renewable hours are cheaper in every zone</h2>
        <p>The regime split is defined inside each zone. It is a descriptive comparison, not a causal estimate, but it gives a useful check before fitting the fixed-effects models.</p>
        <ResultsTable headers={["Zone", "Low-renewable mean €/MWh", "High-renewable mean €/MWh", "High-regime negative-price rate"]} rows={zoneRows} />
      </section>

      <section className="research-section">
        <p className="eyebrow">Model specification</p>
        <h2>A simple model with uncertainty treated seriously</h2>
        <p>The main price model includes bidding-zone, UTC hour, and valid-date fixed effects. Continuous predictors are standardized within zone. Standard errors are two-way clustered by valid time and forecast run, with 30 forecast runs setting the smallest cluster count.</p>
        <ResultsTable headers={["Outcome", "Rows", "R²", "Forecast-run clusters", "Model type"]} rows={modelRows} />
        <p className="table-note">R² is descriptive fit, not out-of-sample forecasting accuracy. Repeated market outcomes across vintages are the reason the forecast-run dimension is part of the inference design.</p>
      </section>

      <section className="research-section">
        <p className="eyebrow">Selected coefficients</p>
        <h2>What the model says, conditionally</h2>
        <ResultsTable headers={["Predictor", "Coefficient", "Clustered p-value", "Reading"]} rows={coefficientRows} />
        <p>The coefficient signs are consistent with a market where residual load pushes prices up while positive renewable-generation forecast errors coincide with lower prices. These are conditional associations in the current panel; they should not be read as causal effects of changing the forecast.</p>
      </section>

      <section className="research-section research-final">
        <p className="eyebrow">Final takeaway</p>
        <h2>The point is being able to trace the result back to the source</h2>
        <p>The useful part of this project is the connection between versioned ingestion and statistical interpretation. Bronze preserves what arrived, Silver makes the source differences inspectable, and Gold gives the model one reproducible panel. The current result is a clear next step rather than a finished claim: extend the vintage history, add more representative weather points, and test whether the zone-specific relationships survive across seasons.</p>
        <a className="button primary" href="https://github.com/jbinhuang01/regional-energy-data-lake">Read the code and reports on GitHub</a>
      </section>
    </main>
  );
}
