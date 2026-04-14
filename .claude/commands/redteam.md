---
name: redteam
description: "Phase 04 (Review). Red team review and stress testing. Produces finalized output."
---

## What This Phase Does (present to user)

Stress-test everything from adversarial angles and produce finalized output. Phase 04 (Review) is where the work gets validated and finalized — looking for logical gaps, inconsistencies, weak arguments, and missing provisions. Think of it as bringing in a hostile reviewer, a pedantic editor, and a methodological critic to find every weakness.

## Your Role (communicate to user)

Review the findings and decide which issues matter. Results will be presented as attack scenarios: "A reviewer could exploit X by arguing Y." You decide whether to fix it, accept the risk, or investigate further.

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `instructions/`)
3. If no workspace exists, ask the user to create one first
4. Read all files in `workspaces/<project>/briefs/` for user context

## Phase Check

- Verify `todos/active/` is empty (all implemented) or note remaining items
- Read `workspaces/<project>/03-user-flows/` for validation criteria if they exist
- Validation results go into `workspaces/<project>/04-validate/`
- If gaps are found, document them and feed back to implementation (use `/implement` to fix)

## Workflow

### 1. Spec coverage audit (MUST run first)

Walk `workspaces/<project>/briefs/` → `specs/_index.md` → relevant spec files → `02-plans/` → artifacts produced during `/implement` and verify that EVERY specified item was actually built — not just exists. **Specs are the PRIMARY source** — they contain the detailed thesis, methodology, and claim-to-evidence mapping that the brief only summarizes. For each spec file, extract assertions at field level and verify against the actual artifacts. Artifact diverging from spec without logged deviation = HIGH. Produce `04-validate/.spec-coverage` as a table mapping brief item → spec file → todo → artifact → status. **Existence is NOT fulfillment.**

### 2. Document consistency audit

Review all related documents for internal consistency:

- Cross-reference accuracy (every reference points to a real section or source)
- Terminology consistency (same terms used the same way throughout)
- No contradictions between documents
- No orphaned or circular references

### 3. Adversarial stress testing

Deploy agents to attack the content from hostile perspectives:

- **Logical gaps**: Are there undefined terms, ambiguous claims, or missing justifications?
- **Consistency failures**: Do any documents or sections contradict each other?
- **Methodological weaknesses**: Are research methods appropriate and well-justified?
- **Evidence gaps**: Are claims proportional to the evidence presented?
- **Reviewer attacks**: What would the most hostile reviewer at the target venue say?

### 4. Publication quality check (if work is destined for publication)

If the initiative involves publications or external-facing content:

- Apply publication-quality rules (`rules/publication-quality.md`)
- Verify all claims are substantiated (no unsupported assertions)
- Verify honest limitations are present and concrete
- Verify no internal file paths or references in publication content
- Check terminology consistency throughout

### 5. Iterate until convergence

Continuously engage review agents:

- Identify root causes of gaps
- Implement the most precise fix
- Verify no regressions (fixing one issue doesn't create another)
- Keep iterating until agents find no more gaps

### 6. Report results (in plain language)

Report results as scenarios the user can evaluate:

- **What was tested**: Describe each attack vector in narrative form ("A hostile reviewer argues that the methodology is insufficient because...")
- **What held**: Confirm which arguments and evidence hold up
- **What didn't hold**: Describe vulnerabilities as specific scenarios with severity ratings
- **What was fixed**: Describe fixes in terms of what they prevent
- **Overall confidence**: Summarize as "X out of Y attack vectors are defended. The remaining vulnerabilities are: [plain description]"

## What Comes Next

After review produces finalized output, the next steps are:

- **`/codify`** (Phase 05) -- Capture institutional knowledge into .claude/ artifacts (human approval required)
- **`/publish`** (Phase 06) -- Package and ship for venue-specific submission

Do NOT skip `/codify` -- the knowledge captured during review is some of the most valuable for future sessions.

## Agent Teams

Deploy these agents as a red team for validation:

**Core red team (always):**

- **argument-critic** — Identify logical gaps, attack vectors, weak arguments
- **claims-verifier** — Verify factual claims against sources
- **cross-reference-auditor** — Cross-reference accuracy, document consistency

**Publication validation (deploy for papers and submissions):**

- **field-expert** — Domain knowledge to assess whether arguments hold
- **literature-researcher** — Find competing work that challenges our claims

Run multiple red team rounds. Converge when all agents find no remaining gaps.
