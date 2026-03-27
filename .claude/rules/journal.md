# Journal Rules

## Scope

These rules apply to ALL workspace operations. The journal is the primary knowledge trail for every research project.

## MUST Rules

### 1. Journal Every Insight

Every COR skill that produces insights, decisions, or discoveries MUST create corresponding journal entries in the workspace's `journal/` directory. No insight should be lost between sessions.

### 2. Sequential Naming

Journal entries MUST use sequential naming: `NNNN-TYPE-topic.md` (e.g., `0001-DECISION-chose-mixed-methods.md`, `0002-DISCOVERY-citation-network-cluster.md`). Before creating a new entry, MUST check the highest existing number in the journal directory.

### 3. Frontmatter Required

Journal entries MUST include YAML frontmatter with these fields:

```yaml
---
type: DECISION | DISCOVERY | TRADE-OFF | RISK | CONNECTION | GAP
date: YYYY-MM-DD
created_at: [ISO-8601 timestamp]
author: human | agent | co-authored
session_id: [session ID if available]
project: [project name]
topic: [brief description]
phase: teach | literature | deliberate | craft | validate-claim | challenge | check-refs | preflight | publish | codify
tags: [list of relevant tags]
---
```

- `created_at`: precise creation timestamp for temporal analysis
- `author`: who drove the insight — `human` (user identified it), `agent` (AI surfaced it), or `co-authored` (emerged through dialogue)
- `session_id`: links the entry to the session that produced it

### 4. Use Correct Entry Types

Six entry types exist. Use the right one:

| Type | Purpose | When Created |
|------|---------|-------------|
| **DECISION** | Record a research choice with rationale, alternatives considered, and consequences | When making methodological, analytical, structural, or scope decisions about the research |
| **DISCOVERY** | Capture something learned -- a finding, pattern, insight, or literature connection | When literature review, analysis, or exploration reveals new understanding |
| **TRADE-OFF** | Document a trade-off evaluation -- what was gained and what was sacrificed | When balancing competing methodological concerns, scope vs. depth, or rigor vs. feasibility |
| **RISK** | Record an identified risk, integrity concern, or vulnerability in the research | When validation, review, or challenge reveals potential problems (weak claims, citation gaps, methodological flaws) |
| **CONNECTION** | Note a relationship between papers, concepts, findings, or arguments | When cross-referencing reveals links that strengthen or complicate the argument |
| **GAP** | Flag something missing that needs attention | When analysis reveals missing literature, untested claims, unresolved questions, or absent evidence |

### 5. For Discussion Section

Every journal entry MUST include a `## For Discussion` section with 2-3 questions that probe the reasoning behind the entry. These questions should be specific to the entry content — not generic templates. They scaffold metacognition and prepare for oral follow-up.

### 6. Self-Contained Entries

Each journal entry MUST be self-contained -- readable without requiring other context. Include enough background that a future session (or a different co-author) can understand the entry on its own.

## SHOULD Rules

### 1. Decision Rationale

DECISION entries SHOULD include alternatives considered and the rationale for the choice, not just the decision itself.

### 2. Consequences and Follow-Up

Entries SHOULD include consequences, follow-up actions, or next steps where applicable.

### 3. Citation Context

DISCOVERY and CONNECTION entries involving literature SHOULD include enough citation context (author, year, key claim) that the connection can be verified without re-reading the source.

## MUST NOT Rules

### 1. No Overwriting

MUST NOT overwrite existing journal entries. Each entry is immutable once created. If a decision changes, create a new entry that references the original.

### 2. No Entries Without Frontmatter

MUST NOT create journal entries without proper YAML frontmatter. The frontmatter enables searching, filtering, and cross-referencing.
