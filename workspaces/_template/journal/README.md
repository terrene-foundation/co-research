# Research Journal

The journal is the primary knowledge trail for the research project. Every COR command produces journal entries that capture insights, decisions, challenges, and connections. These entries enable extraction into defense preparation, presentations, supplementary materials, and AI use disclosure documentation.

## Entry Types

| Type | Description | Created By |
|------|-------------|------------|
| **TEACH** | Concept explanations with context and connections | `/teach` |
| **LITERATURE** | Paper assessments, search results, synthesis | `/literature` |
| **DELIBERATION** | Structural decisions with rationale | `/deliberate` |
| **MARGIN** | Writing decisions, paragraph annotations | `/write-para` |
| **DEFENSE** | Challenges raised, vulnerabilities identified | `/challenge`, `/craft` |
| **CLAIM** | Claim verification results | `/validate-claim` |
| **CONNECTION** | Cross-reference findings, citation relationships | `/check-refs` |
| **GAP** | Missing literature, unresolved questions, submission issues | `/preflight`, `/publish` |

## Naming Convention

```
NNNN-TYPE-topic.md
```

Examples:
- `0001-TEACH-incomplete-contracts.md`
- `0002-LITERATURE-agency-theory-survey.md`
- `0003-DELIBERATION-argument-ordering.md`
- `0004-MARGIN-opening-paragraph.md`
- `0005-DEFENSE-methodology-challenge.md`
- `0006-CLAIM-bainbridge-attribution.md`
- `0007-CONNECTION-citation-audit-round1.md`
- `0008-GAP-missing-practitioner-evidence.md`

Always check the highest existing number before creating a new entry.

## Frontmatter Format

Every journal entry must include YAML frontmatter:

```yaml
---
type: TEACH | LITERATURE | DELIBERATION | MARGIN | DEFENSE | CLAIM | CONNECTION | GAP
date: YYYY-MM-DD
paper: [paper name from brief]
section: [section name, if applicable]
paragraph: [paragraph number, if applicable]
topic: [brief topic description]
tags: [list of relevant tags]
---
```

## Body Content

After frontmatter, write the insight in full. Include:

- What was learned, decided, or discovered
- Why it matters for the paper
- Any follow-up actions needed
- References to source material

## Purpose

The journal serves multiple functions:

1. **Anti-amnesia**: Prevents re-discovering the same insights across sessions
2. **Defense preparation**: Provides evidence that the author engaged deeply with the material
3. **AI use disclosure**: Documents the human's intellectual contribution to the co-authored work
4. **Knowledge compounding**: Each session builds on prior insights rather than starting fresh
