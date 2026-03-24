---
name: 30-arxiv-submission
description: "arXiv submission reference. Use when preparing papers for arXiv, converting Markdown to LaTeX, handling metadata, or troubleshooting submission issues."
---

# arXiv Submission Reference

## What is arXiv?

arXiv (arxiv.org) is an open-access preprint repository operated by Cornell University. Key facts:

- **Not peer-reviewed** but moderated (papers are checked for relevance, not correctness)
- **Permanent and citable** -- papers get a unique ID (e.g., 2503.12345) and DOI
- **Standard in CS/AI** -- most AI governance, security, and ML papers appear on arXiv before (or instead of) journal publication
- **Free** -- no submission fees
- **CC BY 4.0 supported** -- compatible with open-access licensing

## Submission Process

### 1. Account and Endorsement

- Create account at https://arxiv.org/user/register
- First-time submitters in cs.CR or cs.AI may need an **endorsement** from an existing arXiv author in that category
- Endorsement is a one-time requirement per category

### 2. Category Selection

Choose the primary category appropriate to your paper's field:
- **cs.CR** (Cryptography and Security) -- trust protocols, signing, verification
- **cs.AI** (Artificial Intelligence) -- AI agent governance, AI safety
- **cs.SE** (Software Engineering) -- methodology, frameworks
- **cs.MA** (Multiagent Systems) -- agent coordination
- Cross-list to additional categories as appropriate

### 3. File Preparation

arXiv strongly prefers **LaTeX source** over PDF:

```
submission/
  main.tex          # Primary document (required)
  references.bib    # BibTeX bibliography (required if citations exist)
  figures/           # Directory for figures (optional)
```

**DO NOT include**:
- `.aux`, `.log`, `.bbl`, `.blg` files (arXiv compiles from source)
- `.pdf` of the paper itself (arXiv generates it)
- Hidden files (`.git`, `.DS_Store`)
- Large binary files (>10MB total package)

### 4. LaTeX Requirements

arXiv uses **TeX Live** for compilation. Safe packages:

```latex
% Always safe
\usepackage[utf8]{inputenc}
\usepackage{hyperref}
\usepackage{booktabs}        % Professional tables
\usepackage{listings}         % Code listings
\usepackage{amsmath,amssymb}  % Math
\usepackage{graphicx}         % Figures
\usepackage{url}              % URLs
\usepackage{xcolor}           % Colors

% Avoid
\usepackage{minted}           % Requires --shell-escape (not available on arXiv)
\usepackage{fontspec}         % XeLaTeX only (arXiv uses pdflatex by default)
```

### 5. Common Rejection Reasons

| Reason | How to Prevent |
|--------|---------------|
| Missing files | Upload ALL referenced files; test compilation locally |
| TeX errors | Compile locally with `pdflatex` + `bibtex` before uploading |
| Missing references | Ensure every `\cite{}` has a matching `\bibitem` or `.bib` entry |
| Wrong category | Choose the category that best fits your contribution |
| Not a research paper | Include clear contribution statement, related work, methodology |
| PDF-only submission | Always provide LaTeX source |

### 6. Metadata Fields

| Field | Requirement | Notes |
|-------|------------|-------|
| Title | Required | Match document title exactly |
| Authors | Required | "FirstName LastName (Affiliation)" |
| Abstract | Required | 150-300 words, plain text (no LaTeX) |
| Comments | Optional | Version, page count, companion papers |
| Category | Required | Primary + optional cross-lists |
| License | Required | Select appropriate license (e.g., CC BY 4.0) |
| Journal-ref | Optional | Leave blank for preprints |
| DOI | Optional | Leave blank (arXiv assigns its own) |

### 7. After Submission

- arXiv processes submissions in batches (typically announced next business day ET)
- You receive a temporary submission ID immediately
- The permanent arXiv ID (e.g., `2503.12345`) is assigned at announcement
- You can update with new versions (v2, v3...) -- old versions remain accessible
- **Content is archival** -- cannot be fully deleted after announcement

## Markdown to LaTeX Conversion

### Section Mapping

| Markdown | LaTeX |
|----------|-------|
| `# Title` | `\title{Title}` |
| `## Section` | `\section{Section}` |
| `### Subsection` | `\subsection{Subsection}` |
| `**bold**` | `\textbf{bold}` |
| `*italic*` | `\textit{italic}` |
| `---` (horizontal rule) | `\bigskip` or `\clearpage` |
| `[text](url)` | `\href{url}{text}` |
| `` `code` `` | `\texttt{code}` |

### Table Conversion

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

Becomes:

```latex
\begin{table}[h]
\centering
\begin{tabular}{ll}
\toprule
Header 1 & Header 2 \\
\midrule
Cell 1 & Cell 2 \\
\bottomrule
\end{tabular}
\end{table}
```

### Code Block Conversion

````markdown
```json
{"key": "value"}
```
````

Becomes:

```latex
\begin{lstlisting}[language=json]
{"key": "value"}
\end{lstlisting}
```

### Citation Conversion

Markdown references like "Haber & Stornetta (1991)" become `\cite{haber1991timestamp}` with a matching `.bib` entry.

## Quality Standards for cs.CR

Papers in cs.CR (Cryptography and Security) are evaluated on:

1. **Clear threat model** -- What attacks are considered? What is the adversary's capability?
2. **Formal or semi-formal specification** -- Protocol operations should be precisely defined
3. **Honest security analysis** -- What does the protocol defend against? What doesn't it defend against?
4. **Comparison with prior art** -- How does this relate to existing approaches?
5. **Implementation evidence** -- Reference implementation demonstrates feasibility
6. **Reproducibility** -- Open-source code, open specification
