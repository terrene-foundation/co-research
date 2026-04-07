# CO for Research (COR) -- Specification Summary

COR is a domain application of the Cognitive Orchestration (CO) methodology, applying its five-layer architecture to the specific challenges of academic research co-authorship with AI.

For the full CO specification, see [terrene.foundation](https://terrene.foundation).

## Application Identity

| Property | Value |
|----------|-------|
| Base methodology | Cognitive Orchestration (CO) |
| Domain | Academic research co-authorship |
| Designation | COR (CO for Research) |
| License | CC BY 4.0 (methodology), Apache 2.0 (tooling) |
| Publisher | Terrene Foundation |

COR extends CO with an eighth principle: **Principle 8 (Authentic Voice)**, requiring transparent disclosure of AI assistance and authentic preservation of the human researcher's voice.

## Three Failure Modes

CO identifies three failure modes in human-AI collaboration. COR maps them to research-specific manifestations:

### Amnesia (Context Loss)
- Literature insights forgotten between sessions
- Structural decisions re-debated because prior reasoning is lost
- Reviewer feedback addressed in one section but contradicted in another
- **COR mitigation**: Journal system (8 entry types), session notes, decision records

### Convention Drift (Domain Ignorance)
- Citation formats inconsistent with venue requirements
- Field-specific terminology used incorrectly
- Methodological norms violated (e.g., missing limitations section)
- **COR mitigation**: Field-expert agent, publication quality rules, venue-specific validation

### Safety Blindness (Risk Ignorance)
- Fabricated citations that do not exist
- Overclaims that cannot survive peer review
- Internal file paths in archival publications
- AI-signature patterns triggering detection tools
- **COR mitigation**: Claims-verifier agent, validate-research-content hook, academic writing style rules

## Five Layers

### L1: Intent (Specialized Agents)

Six research agents, each with a defined role:

| Agent | Role |
|-------|------|
| literature-researcher | Systematic literature discovery and assessment |
| field-expert | Domain knowledge tutor (configurable domain) |
| claims-verifier | VERIFIED / OVERCLAIMED / FABRICATED verdicts |
| argument-critic | Adversarial reviewer simulation |
| writing-partner | Paragraph-level co-writing with margin notes |
| cross-reference-auditor | Citation integrity enforcement |

Two management agents: todo-manager, gh-manager.

### L2: Context (Rules and Knowledge)

Eight rule files providing persistent context:
- Research integrity (no fabrication, no overclaims, confidence levels)
- Academic writing style (authentic voice preservation, detection bias mitigation)
- Deliberation records (decision tracking, journal requirements)
- Publication claims (verification protocol, dead reference prevention)
- Publication quality (venue compliance, citation density)
- Communication, git, security

### L3: Guardrails (Pre-Execution Hooks)

Four hooks enforcing quality at the tool level:
- **UserPromptSubmit**: Anti-amnesia rules reminder on every prompt
- **PostToolUse (Edit/Write)**: Overclaim detection, citation marker check, em dash detection, AI-signature word scan
- **SessionStart**: Workspace status, session note loading
- **Stop**: Session continuity reminder

### L4: Instructions (Structured Workflows)

Fourteen commands implementing a six-phase workflow:

| Phase | Commands | Purpose |
|-------|----------|---------|
| 1. Understand | /teach, /literature | Build domain knowledge |
| 2. Decide | /deliberate | Record structural decisions |
| 3. Write | /craft, /write-para | Two co-authorship modes |
| 4. Validate | /validate-claim, /challenge | Verify and stress-test |
| 5. Submit | /check-refs, /preflight, /publish | Audit and prepare |

Plus: /ws (status), /wrapup (continuity), /checkpoint (progress review).

### L5: Learning (Journal System)

Eight journal entry types capturing insights across sessions:

TEACH, LITERATURE, DELIBERATION, MARGIN, DEFENSE, CLAIM, CONNECTION, GAP

Each entry has YAML frontmatter (type, date, paper, section, topic, tags) and a narrative body. Sequential naming (NNNN-TYPE-topic.md) prevents collisions. The journal is the primary knowledge trail, enabling:

- Anti-amnesia across sessions
- Defense preparation evidence
- AI use disclosure documentation
- Knowledge compounding

## Two Writing Modes

### /craft (Author Writes, AI Teaches and Critiques)

The author writes their own prose. The AI provides pre-writing briefings (literature context, originality check, defense preview) and post-writing critique (argument strength, voice analysis, missing engagement, defense readiness).

Preferred for: doctoral work, papers where the author's voice is central, defense preparation.

### /write-para (AI Drafts, Author Approves)

The AI drafts paragraphs with inline margin notes explaining every structural choice. The author reviews, edits, and must explicitly approve before the next paragraph. Alternatives are presented for key decisions.

Preferred for: rapid iteration on settled arguments, sections where structure is decided.

Both modes produce journal entries and deliberation records.

## Command Chain

```
/teach + /literature    -> /deliberate    -> /craft or /write-para
                                          -> /validate-claim + /challenge
                                          -> /check-refs + /preflight + /publish
```

## Principle 8: Authentic Voice

COR adds an eighth principle to CO's seven: the requirement for transparent disclosure of AI assistance. This principle has two components:

1. **Disclosure**: Follow venue requirements for reporting AI use. COR's journal and deliberation records provide verifiable evidence of the human's intellectual contribution.

2. **Authentic voice**: Writing style rules mitigate detection bias (tools that disproportionately flag non-native English speakers and formulaic writing), not conceal AI use. The goal is prose that accurately reflects the human direction that produced it.

The co-authorship model is transparent: the human makes every structural decision, approves every paragraph, and directs the argument. The AI researches, drafts, explains, and critiques.
