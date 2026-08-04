const processSteps = [
  ["A", "Static price data", "Use a static, reproducible price source so the experiment is not dependent on a live API or rate limits."],
  ["B", "Data cleaning and outlier detection", "Align dates, repair missing values, flag implausible price jumps, and preserve an audit trail."],
  ["C", "Descriptive analysis and visualization", "Inspect normalized price paths, annual returns, correlations, and distributional behavior."],
  ["D", "Risk/return features and peer groups", "Construct return, volatility, drawdown, persistence, and PCA-based company profiles."],
  ["E", "Rolling clustering and market regime", "Re-estimate peer groups through time and add point-in-time volatility/regime information."],
  ["F", "Prediction models and strategy backtest", "Compare frozen model families and evaluate top-N portfolios after turnover costs."],
  ["G", "Point-in-time and historical membership", "Use historical index membership and only information available at each evaluation date."],
  ["H", "Placebo, bootstrap, and Reality Check", "Test whether the observed result survives random portfolios, dependence-aware resampling, and model selection."],
  ["I", "Locked out-of-sample holdout", "Evaluate the frozen specification on eight quarterly periods that were not used for development."],
  ["J", "Advanced Gradient Boosting", "Use the selected nonlinear model only after the validation design is fixed."],
  ["K", "Fair comparison of new factors", "Add momentum and risk blocks without changing the baseline universe or model parameters."],
  ["L", "Final report and conclusion", "Separate exploratory evidence from confirmatory evidence and document limitations."],
];

const modelRows = [
  ["Gradient Boosting", "0.042", "60.1%", "0.0315", "8.25%", "1.765"],
  ["Elastic Net", "-0.023", "50.4%", "-0.0156", "2.40%", "1.161"],
  ["Huber", "-0.055", "48.4%", "-0.0205", "0.10%", "0.980"],
  ["Ridge", "-0.049", "48.7%", "-0.0211", "-3.31%", "0.754"],
];

const costRows = [
  ["0%", "8.98%", "4.54%"],
  ["0.5%", "8.25%", "3.94%"],
  ["1%", "7.51%", "3.34%"],
  ["2%", "6.03%", "2.14%"],
];

const factorRows = [
  ["Baseline", "8.25%", "1.765", "0.0395"],
  ["Baseline + momentum", "-1.13%", "0.886", "0.2220"],
  ["Baseline + momentum/risk", "-5.39%", "0.612", "0.0009"],
  ["Full factor block", "-2.83%", "0.767", "0.0083"],
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
.research-figure img{display:block;width:100%;aspect-ratio:1.55;object-fit:cover;border-bottom:1px solid #cbd4dd}
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

export default function SP500ProjectPage() {
  return (
    <main className="research-page">
      <style>{researchStyles}</style>
      <a className="back-link" href="/#projects">← Back to selected work</a>
      <header className="research-hero">
        <p className="eyebrow">Quantitative research / point-in-time validation</p>
        <h1>Point-in-Time S&amp;P 500 Return Modeling</h1>
        <p className="research-lede">A reproducible research pipeline for testing cross-sectional return ranking under historical membership, realistic costs, strict time ordering, and multiple-testing-aware inference.</p>
        <div className="research-links"><a className="button primary" href="https://github.com/jbinhuang01/sp500-modeling">Open research repository</a><span>Python · pandas · scikit-learn · time-series validation</span></div>
      </header>

      <section className="research-section">
        <p className="eyebrow">Research question</p>
        <h2>Can a leakage-aware company panel produce useful ranking information out of sample?</h2>
        <p>The study starts with static historical prices, builds risk/return features, and progressively tightens the design. The final specification uses historical S&amp;P 500 membership, a 12-month feature window, non-overlapping quarterly targets, a locked eight-quarter holdout, five-stock portfolios, and a 0.5% transaction cost per turnover.</p>
      </section>

      <section className="research-section">
        <p className="eyebrow">End-to-end process</p>
        <h2>From raw prices to a defensible conclusion</h2>
        <ol className="research-process">
          {processSteps.map(([letter, title, description], index) => <li key={letter}><span className="process-index">{letter}</span><div><h3>{index + 1}. {title}</h3><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="research-section">
        <p className="eyebrow">Visual evidence</p>
        <h2>What the panel and strategy look like</h2>
        <div className="research-figures">
          <Figure src="/assets/sp500/normalized-price-trends.png" alt="Normalized S&P 500 company price trends" caption="Normalized company price paths reveal strong heterogeneity and structural breaks that motivate robust cleaning and time-aware evaluation." />
          <Figure src="/assets/sp500/peer-segments.png" alt="S&P 500 company peer segments" caption="PCA-based peer segments summarize differences in historical risk, return, drawdown, and persistence features." />
          <Figure src="/assets/sp500/rolling-cluster-heatmap.png" alt="Rolling 60-month peer group assignments" caption="Rolling clustering shows that peer-group membership is not static across market periods." />
          <Figure src="/assets/sp500/advanced-model-comparison.png" alt="Advanced model comparison development and holdout" caption="Model selection is separated from the locked holdout; the holdout is evaluated only after the specification is frozen." />
          <Figure src="/assets/sp500/advanced-statistical-validation.png" alt="Advanced statistical validation results" caption="Placebo, block bootstrap, Reality Check, and cost/top-N sensitivity provide a more conservative interpretation of the observed result." />
          <Figure src="/assets/sp500/confirmatory-holdout.png" alt="Locked out-of-sample confirmatory holdout" caption="The final confirmatory holdout keeps the selected specification fixed and reports performance on eight previously locked quarterly periods." />
          <Figure src="/assets/sp500/factor-expansion.png" alt="Factor expansion development and holdout" caption="The factor expansion is an apples-to-apples test: additional price factors did not improve the frozen baseline on the holdout." />
        </div>
      </section>

      <section className="research-section">
        <p className="eyebrow">Model comparison</p>
        <h2>Locked holdout performance</h2>
        <p>All rows below use the same historical-membership holdout, eight quarterly evaluation periods, Top-5 selection, and 0.5% transaction cost.</p>
        <ResultsTable headers={["Model", "OOS R²", "Direction", "Rank corr.", "Mean q. net excess", "Terminal wealth"]} rows={modelRows} />
      </section>

      <section className="research-section">
        <p className="eyebrow">Robustness and inference</p>
        <h2>The important result is the qualification</h2>
        <div className="research-callout"><strong>Exploratory alpha p = 0.0395.</strong> Before dependence and model-selection corrections, the Gradient Boosting alpha looks significant. After moving-block bootstrap and four-model Reality Check, the p-values are 0.1237 and 0.1361. With only eight quarterly observations, the evidence is promising but not confirmatory proof of persistent alpha.</div>
        <ResultsTable headers={["Test / quantity", "Value", "Interpretation"]} rows={[["Raw alpha p-value", "0.0395", "Nominal significance before corrections"], ["Random Top-5 placebo p-value", "0.0002", "Observed portfolio beats random selection"], ["Moving-block bootstrap p-value", "0.1237", "Not significant after dependence-aware resampling"], ["Reality Check p-value", "0.1361", "Not significant after four-model selection"], ["Bootstrap 95% interval", "[-1.26%, 21.83%]", "Wide interval due to only eight quarters"]]} />
      </section>

      <section className="research-section">
        <p className="eyebrow">Implementation sensitivity</p>
        <h2>Transaction costs and portfolio breadth</h2>
        <ResultsTable headers={["Cost per turnover", "Top-5 mean q. net excess", "Top-10 mean q. net excess"]} rows={costRows} />
        <p className="table-note">The signal remains positive in this sample at 2% cost, but portfolio performance is not the same as statistical proof. Costs, turnover, liquidity, and the small number of holdout periods remain central limitations.</p>
      </section>

      <section className="research-section">
        <p className="eyebrow">Factor expansion</p>
        <h2>More features did not automatically improve the model</h2>
        <ResultsTable headers={["Factor block", "Mean q. net excess", "Terminal wealth", "Alpha p"]} rows={factorRows} />
        <p>The baseline is intentionally retained because it performs better on the locked holdout. This is a useful negative result: complexity was treated as a hypothesis to test, not as an automatic upgrade.</p>
      </section>

      <section className="research-section research-final">
        <p className="eyebrow">Final takeaway</p>
        <h2>Research-grade evidence requires disciplined restraint</h2>
        <p>The project demonstrates a complete applied-mathematics workflow: data auditing, feature construction, clustering, supervised learning, portfolio simulation, point-in-time design, resampling inference, and confirmatory holdout analysis. The strongest conclusion is not that the strategy is production-ready; it is that the research process makes the strength and uncertainty of the signal explicit.</p>
        <a className="button primary" href="https://github.com/jbinhuang01/sp500-modeling">Read the code and reports on GitHub</a>
      </section>
    </main>
  );
}
