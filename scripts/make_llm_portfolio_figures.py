"""Create the compact figures used by the portfolio LLM walkthrough.

Example:
    python scripts/make_llm_portfolio_figures.py \
        --results-root ../llm_response_quality/outputs \
        --output-root public/assets/llm
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


NAVY = "#234d6f"
TEAL = "#167c70"
INK = "#18212a"
MUTED = "#5c6672"
GRID = "#d8e0e7"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def save(fig: plt.Figure, path: Path) -> None:
    fig.savefig(path, dpi=180, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def model_comparison(results_root: Path, output_root: Path) -> None:
    rows = read_csv(results_root / "final_model_comparison.csv")
    labels = [
        "Word TF-IDF",
        "Char TF-IDF",
        "Soft-label TF-IDF",
        "Pairwise TF-IDF",
        "BERT 2K / MPS",
        "BERT 5K / MPS",
        "Locked word TF-IDF",
    ]
    macro = [float(row["macro_f1"]) for row in rows]
    tie = [float(row["tie_recall"]) if row["tie_recall"] else np.nan for row in rows]

    fig, axes = plt.subplots(1, 2, figsize=(12, 5.8), gridspec_kw={"wspace": 0.42})
    positions = np.arange(len(labels))
    colors = [NAVY, NAVY, TEAL, "#7a6aa6", "#b07b4d", "#b07b4d", "#7f8c96"]
    axes[0].barh(positions, macro, color=colors)
    axes[0].set_yticks(positions, labels)
    axes[0].invert_yaxis()
    axes[0].set_xlim(0, 0.34)
    axes[0].set_title("Macro-F1", loc="left", color=INK, weight="bold")
    axes[0].set_xlabel("Mean or formal test value")
    axes[1].barh(positions, np.nan_to_num(tie, nan=0.0), color=colors)
    axes[1].set_yticks(positions, labels)
    axes[1].invert_yaxis()
    axes[1].set_xlim(0, 0.8)
    axes[1].set_title("Tie recall", loc="left", color=INK, weight="bold")
    axes[1].set_xlabel("Development value; blank means not reported")
    for axis in axes:
        axis.grid(axis="x", color=GRID, linewidth=0.8)
        axis.set_axisbelow(True)
        axis.spines[["top", "right", "left"]].set_visible(False)
        axis.tick_params(axis="y", length=0, colors=MUTED)
        axis.tick_params(axis="x", colors=MUTED)
    fig.suptitle("LLM preference models: performance and disagreement", x=0.08, ha="left", color=INK, fontsize=15, weight="bold")
    fig.text(0.08, 0.02, "Soft-label TF-IDF is the current development leader; pairwise models recover more ties.", color=MUTED, fontsize=9)
    save(fig, output_root / "model-comparison.png")


def soft_label_tradeoff(results_root: Path, output_root: Path) -> None:
    rows = read_csv(results_root / "soft_label_multiseed" / "confidence_intervals.csv")
    values: dict[str, dict[str, float]] = {}
    for row in rows:
        if row["metric"] in {"accuracy", "macro_f1", "tie_recall"}:
            values.setdefault(row["model"], {})[row["metric"]] = float(row["mean"])
    names = ["Accuracy", "Macro-F1", "Tie recall"]
    metrics = ["accuracy", "macro_f1", "tie_recall"]
    x = np.arange(len(names))
    width = 0.34
    fig, axis = plt.subplots(figsize=(9.4, 4.8))
    hard = [values["hard_label_baseline"][metric] for metric in metrics]
    soft = [values["soft_label_model"][metric] for metric in metrics]
    axis.bar(x - width / 2, hard, width, label="Hard-label TF-IDF", color=NAVY)
    axis.bar(x + width / 2, soft, width, label="Class-balanced soft-label", color=TEAL)
    axis.set_xticks(x, names)
    axis.set_ylim(0, 0.42)
    axis.set_ylabel("Mean across 3 seeds")
    axis.set_title("Soft labels change the winner / disagreement trade-off", loc="left", color=INK, weight="bold")
    axis.grid(axis="y", color=GRID, linewidth=0.8)
    axis.set_axisbelow(True)
    axis.spines[["top", "right"]].set_visible(False)
    axis.legend(frameon=False, ncol=2, loc="upper left")
    for index, value in enumerate(hard):
        axis.text(index - width / 2, value + 0.009, f"{value:.3f}", ha="center", fontsize=8, color=NAVY)
    for index, value in enumerate(soft):
        axis.text(index + width / 2, value + 0.009, f"{value:.3f}", ha="center", fontsize=8, color=TEAL)
    fig.text(0.1, 0.01, "The soft-label model lowers accuracy but improves Macro-F1 and tie recall.", color=MUTED, fontsize=9)
    save(fig, output_root / "soft-label-tradeoff.png")


def slice_accuracy(results_root: Path, output_root: Path) -> None:
    rows = read_csv(results_root / "train_pool_analysis" / "slice_metrics.csv")
    wanted = [
        ("is_creative_writing", "True", "Creative writing"),
        ("is_domain_knowledge", "False", "No domain knowledge"),
        ("is_math", "True", "Math"),
        ("is_code", "True", "Code"),
        ("is_hard_prompt", "True", "Hard prompt"),
        ("language", "en", "English"),
        ("language", "ru", "Russian"),
        ("language", "pl", "Polish"),
    ]
    selected = []
    for slice_name, value, label in wanted:
        match = next(row for row in rows if row["slice"] == slice_name and row["value"] == value)
        selected.append((label, float(match["accuracy"]), int(match["n_rows"])))
    selected.sort(key=lambda item: item[1])
    labels = [item[0] for item in selected]
    accuracy = [item[1] for item in selected]
    sample_sizes = [item[2] for item in selected]
    fig, axis = plt.subplots(figsize=(8.6, 5.2))
    bars = axis.barh(labels, accuracy, color=TEAL)
    axis.set_xlim(0, 0.48)
    axis.set_xlabel("Accuracy in word-TF-IDF OOF slice")
    axis.set_title("Selected train-pool slices", loc="left", color=INK, weight="bold")
    axis.grid(axis="x", color=GRID, linewidth=0.8)
    axis.set_axisbelow(True)
    axis.spines[["top", "right", "left"]].set_visible(False)
    axis.tick_params(axis="y", length=0, colors=MUTED)
    for bar, value, n_rows in zip(bars, accuracy, sample_sizes):
        axis.text(value + 0.008, bar.get_y() + bar.get_height() / 2, f"{value:.3f}  (n={n_rows:,})", va="center", fontsize=8, color=INK)
    fig.text(0.1, 0.01, "These are descriptive OOF slices, not causal comparisons.", color=MUTED, fontsize=9)
    save(fig, output_root / "slice-accuracy.png")


def locked_baseline(results_root: Path, output_root: Path) -> None:
    rows = read_csv(results_root / "final_model_comparison.csv")
    labels = ["Best dev\nsoft-label TF-IDF", "Formal locked\nword TF-IDF"]
    values = [float(rows[2]["macro_f1"]), float(rows[6]["macro_f1"])]
    colors = [TEAL, "#7f8c96"]
    fig, axis = plt.subplots(figsize=(6.8, 4.4))
    bars = axis.bar(labels, values, color=colors, width=0.55)
    axis.set_ylim(0, 0.32)
    axis.set_ylabel("Macro-F1")
    axis.set_title("Development selection vs. frozen baseline", loc="left", color=INK, weight="bold")
    axis.grid(axis="y", color=GRID, linewidth=0.8)
    axis.set_axisbelow(True)
    axis.spines[["top", "right"]].set_visible(False)
    for bar, value in zip(bars, values):
        axis.text(bar.get_x() + bar.get_width() / 2, value + 0.009, f"{value:.4f}", ha="center", color=INK, weight="bold")
    fig.text(0.1, 0.01, "Different protocols: do not treat this as a head-to-head test.", color=MUTED, fontsize=9)
    save(fig, output_root / "locked-baseline.png")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--results-root", type=Path, required=True)
    parser.add_argument("--output-root", type=Path, required=True)
    args = parser.parse_args()
    args.output_root.mkdir(parents=True, exist_ok=True)
    plt.rcParams.update({"font.family": "DejaVu Sans", "axes.titleweight": "bold"})
    model_comparison(args.results_root, args.output_root)
    soft_label_tradeoff(args.results_root, args.output_root)
    slice_accuracy(args.results_root, args.output_root)
    locked_baseline(args.results_root, args.output_root)


if __name__ == "__main__":
    main()
