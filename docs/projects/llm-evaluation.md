# LLM Response Quality Classification

This project started as a small rubric-based review set and grew into a study
of human preferences between two LLM responses. The current experiments use
135,634 public Arena votes, grouped question splits, a temporal locked test,
soft-label training, pairwise scoring, and a development-scale pretrained
encoder.

The main result is not that a larger encoder wins. The best current development
Macro-F1 is 0.2850 from a class-balanced soft-label TF-IDF model. A pairwise
ranker has lower Macro-F1 but much higher tie recall, which makes the trade-off
between winner prediction and disagreement visible. The 5K pairwise BERT run
reached Macro-F1 0.2398 and remains an exploratory result.

The formal word-TF-IDF baseline was evaluated once on 27,127 temporal locked
rows and reached Macro-F1 0.2505. That test is kept separate from later model
selection.

The code and detailed result tables are in the [research repository](https://github.com/jbinhuang01/llm_response). The portfolio walkthrough explains the data split, model progression, error pattern, and current limitations.
