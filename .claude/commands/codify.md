---
name: codify
description: "Load phase 05 (codify) for the current workspace. Update existing agents and skills with new knowledge."
---

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `instructions/`)
3. If no workspace exists, ask the user to create one first
4. Read all files in `workspaces/<project>/briefs/` for user context (this is the user's input surface)

## Phase Check

- Read `workspaces/<project>/04-validate/` to confirm validation passed
- Read `docs/` for knowledge base
- Output: update existing agents and skills in their canonical locations (e.g., `agents/research/`, `agents/management/`, `skills/`)

## Execution Model

This phase executes under the **autonomous execution model** (see `rules/autonomous-execution.md`). Knowledge extraction and codification are autonomous — agents extract, structure, and validate knowledge without human intervention. The human reviews the codified output at the end (structural gate on what becomes institutional knowledge), but the extraction and synthesis process is fully autonomous.

## Workflow

### 1. Consume learning digest

Before extracting new knowledge, integrate what the learning system has captured:

1. Read `.claude/learning/learning-digest.json` — the structured summary of recent observations
2. Read `.claude/learning/learning-codified.json` — what was previously codified (avoid re-processing)
3. Read recent journal entries referenced in the digest (`decisions` array) — DECISION and DISCOVERY entries contain semantic context
4. Read `.session-notes` — latest session accomplishments and outstanding items
5. **Re-validate deferred items before sorting** (per `rules/value-prioritization.md` MUST §3). Findings carried forward from a prior session — items the digest, `.session-notes`, or journal marks as deferred, "carried-forward," or follow-up — MUST NOT be re-listed on faith. For each:
   - **Has a value-anchor** (a recorded sentence stating WHY it delivers value to the user, citing the workspace `briefs/`, a journal `DECISION-` entry, an approved spec success criterion, or a literal user quote) → surface the anchor and ask "is this still your value?" before carrying it into the findings analysis.
   - **Lacks a value-anchor** → surface "this deferred item lacks a value-anchor — what is its current value to you?" rather than re-listing it as a candidate.
   - **Deferred ≥2 sessions ago without re-pickup** → trigger a "still wanted?" gate; do not auto-carry.

   Silent inheritance of deferred findings across `/clear` is BLOCKED — an item with no current-value confirmation does not enter the findings analysis below.

Analyze the digest for actionable findings:

- **Corrections** → Do any rules or skills need updating to match user preferences? Each correction is a real signal where the user pushed back on an approach.
- **Error patterns** → Should any recurring rule violations become new rule sections (DO/DO NOT with examples)?
- **Decisions** → Should any architectural decisions from journals become agent or skill knowledge?
- **Accomplishments** → Do any completed features need documentation in skills?

For each finding, either:

- Update an existing rule (add DO/DO NOT with example and Why)
- Update a skill's SKILL.md or sub-files
- Update an agent's knowledge section
- Skip (not worth codifying — explain why)

After processing, write `.claude/learning/learning-codified.json` to record what was analyzed:

```json
{
  "last_codified": "2026-04-07T12:00:00Z",
  "digest_hash": "<sha256 of digest at time of processing>",
  "actions_taken": [
    { "type": "rule_update", "file": "rules/research-integrity.md", "reason": "..." },
    {
      "type": "skill_update",
      "file": "skills/03-nexus/SKILL.md",
      "reason": "..."
    }
  ]
}
```

This closes the feedback loop: observe → digest → **codify into real artifacts**.

### 2. Deep knowledge extraction

Using as many subagents as required, peruse `docs/`.

- Read beyond the docs into the intent of this project/product
- Understand the roles and use of agents, skills, docs:
  - **Agents** — What to do, how to think about this, following procedural directives
  - **Skills** — Distilled knowledge for 100% situational awareness
  - **`docs/`** — Full knowledge base

### 3. Update existing agents

Improve agents in their canonical locations.

- Reference `.claude/agents/_subagent-guide.md` for agent format
- Identify which existing agent(s) should absorb the new knowledge
- If no existing agent covers the domain, create a new agent in the appropriate directory

### 4. Update existing skills

Improve skills in their canonical locations.

- Reference `.claude/skills/skill-authoring/SKILL.md` for skill format
- Update the directory's `SKILL.md` entry point to reference new files
- Skills must be detailed enough for agents to achieve situational awareness from them alone

### 5. Update README.md and documentation (MANDATORY)

Ensure user-facing documentation reflects new capabilities. Verify README.md, docstrings, and docs build.

### 6. Red team the agents and skills

Validate that generated agents and skills are correct, complete, and secure. **claude-code-architect** verifies cc-artifacts compliance (descriptions under 120 chars, agents under 400 lines, commands under 150 lines, rules path-scoped, SKILL.md progressive disclosure).

## Agent Teams

Deploy these agents as a team for codification:

**Knowledge extraction team:**

- **deep-analyst** — Identify core patterns, architectural decisions, and domain knowledge worth capturing
- **requirements-analyst** — Distill requirements into reusable agent instructions
- `co-reference` skill — Ensure agents and skills follow the CO five-layer architecture (codification IS Layer 5 evolution)

**Creation team:**

- **intermediate-reviewer** — Validate that skill examples are correct and runnable; review agent/skill quality before finalizing

**Validation team (red team the agents and skills):**

- **claude-code-architect** — Verify cc-artifacts compliance: descriptions <120 chars, agents <400 lines, commands <150 lines, rules have `paths:` frontmatter, SKILL.md progressive disclosure, no CLAUDE.md duplication
- **gold-standards-validator** — Terrene naming, licensing accuracy, terminology standards
- **security-reviewer** — Audit agents/skills for prompt injection, insecure patterns, secrets exposure

### Journal

Create **DECISION** entries for codification choices. Use sequential `NNNN-` naming.
