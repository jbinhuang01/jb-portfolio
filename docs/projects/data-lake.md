# Regional Energy Data Lake

This project started with a practical question: when a weather forecast is
wrong, does the error show up in the next few hours of electricity prices?

I built the data layer around hourly European energy data rather than hiding
the source differences behind one convenience table. The current panel covers
DE-LU, France, and Austria and combines market prices, generation, weather,
and archived forecast vintages.

## What is in the lake

- **Bronze** stores the downloaded source files, manifests, checksums, and
  ingestion batches so a run can be traced back to the file that produced it.
- **Silver** parses timestamps, normalizes units and column names, preserves
  the source resolution, and records missing or rejected rows instead of
  silently dropping them.
- **Gold** joins realized weather with each archived forecast run and creates
  a common analysis panel. The panel has 30 forecast runs, 3 zones, and 21,600
  market-impact rows after the timestamp and availability checks.

## Analysis question

The model is deliberately modest: zone, date, and hour fixed effects with
standard errors two-way clustered by valid time and forecast run. That setup
asks whether forecast error is associated with price movement after removing
the most obvious recurring time patterns. It is not presented as a trading
strategy or a causal estimate.

The main result is directional rather than dramatic. High-renewable hours are
associated with lower prices in all three zones in the current sample, while
the size of the relationship differs materially between DE-LU, Austria, and
France. That difference is why the panel keeps the zones separate instead of
reporting one pooled average.

## Repository

[github.com/jbinhuang01/regional-energy-data-lake](https://github.com/jbinhuang01/regional-energy-data-lake)
