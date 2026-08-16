# Jiangbin Huang — Data Science Portfolio

Personal portfolio for Jiangbin Huang, an applied data scientist with an M.S. in Applied Mathematics. The site presents selected work across quantitative research, data engineering, applied AI, and statistical modeling.

## Featured projects

### Point-in-Time S&P 500 Return Modeling

An auditable quantitative research project using historical S&P 500 membership, liquidity controls, point-in-time panels, walk-forward model selection, factor-regime interactions, locked holdout evaluation, placebo tests, moving-block bootstrap, Reality Check, and transaction-cost sensitivity analysis.

Research repository: [jbinhuang01/sp500-modeling](https://github.com/jbinhuang01/sp500-modeling)

### LLM Response Quality Classification

A reproducible four-label evaluation workflow for accuracy, completeness, reasoning quality, and hallucination risk across 150+ reviewed LLM outputs.

### Three-Layer Data Lake Pipeline

An hourly European energy data lake that joins market prices, generation,
weather, and archived forecast vintages across DE-LU, France, and Austria.
The current Gold panel contains 30 forecast runs and 21,600 market-impact
rows. The analysis uses fixed effects and two-way clustered standard errors to
separate recurring time patterns from the forecast-error relationship.

Research repository: [jbinhuang01/regional-energy-data-lake](https://github.com/jbinhuang01/regional-energy-data-lake)

## Experience represented

- Co-Founder & Data Scientist — Early-Stage Data & AI Startup
- Data / AI Researcher — Feelie
- Data Analyst Intern — UW Engineering Services
- Research Assistant — UW Department of Civil Engineering

The Civil Engineering research work included processing 1.2M+ monthly sensor records, building congestion-monitoring datasets, clustering recurring traffic patterns, and evaluating ARIMA and LSTM forecasting approaches.

## Technical focus

Python, SQL, pandas, NumPy, scikit-learn, PyTorch, TensorFlow, LangChain, OpenAI API, ETL, data quality, feature engineering, statistical modeling, time-series forecasting, machine learning, Tableau, Power BI, AWS EC2, and Git.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Repository structure

```text
app/                 Next.js pages and shared styles
public/assets/       Project images used by the portfolio cards
docs/projects/       Short project case-study notes
site-config.js       Contact and profile configuration
```

The production site is deployed through Vercel from the `main` branch:
[jb-portfolio-blond.vercel.app](https://jb-portfolio-blond.vercel.app)

## Contact

- GitHub: [jbinhuang01](https://github.com/jbinhuang01)
- LinkedIn: [Jiangbin Huang](https://www.linkedin.com/in/jb-huang-9511141ba)
- Email: jbinhuang01@gmail.com
