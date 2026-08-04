# Point-in-Time S&P 500 Return Modeling

## Question

Can a leakage-aware, point-in-time company panel produce useful cross-sectional ranking information after realistic validation and transaction costs?

## Methods

- Historical S&P 500 membership rather than today’s survivor set
- Liquidity screening and historical member price coverage
- 12-month feature windows and non-overlapping quarterly targets
- Walk-forward model comparison with a locked holdout
- Factor-regime interactions, placebo tests, moving-block bootstrap, Reality Check, and cost/top-N sensitivity

## Result

The project finds an exploratory signal in the locked holdout, but the corrected statistical tests do not justify claiming persistent alpha. The main contribution is the validation design and auditability of the research process.

[Open the research repository](https://github.com/jbinhuang01/sp500-modeling)
