# CO for Research (COR) -- Template Repository

Cognitive Orchestration methodology for academic research co-authorship with AI.

## What This Is

A template repository implementing **COR** (CO for Research), a structured methodology for human-AI collaboration in academic research. COR applies the five-layer Cognitive Orchestration (CO) architecture to the specific challenges of scholarly writing: maintaining research integrity, preventing citation fabrication, preserving authentic voice, and producing work that withstands peer review.

Based on the [Cognitive Orchestration specification](https://terrene.foundation) (CC BY 4.0, Terrene Foundation).

**Two ways to use COR**: via Claude Code (CLI, full enforcement) or via Claude Desktop Cowork (plugin, broader accessibility).

## Quick Start

### Option A: Claude Code (CLI)

For developers and technical researchers. Full CO enforcement via hooks.

```bash
git clone https://github.com/terrene-foundation/co-research.git my-research
cd my-research
claude
```

Then type `/start`. COR introduces itself, explains the workflow, and asks about your research project.

**Setup**:
1. Open `CLAUDE.md` and configure the **Research Domain** section with your field's key papers, debates, and terminology
2. Update the `field-expert` agent (`.claude/agents/research/field-expert.md`) with domain-specific knowledge
3. Create a workspace: `cp -r workspaces/_template workspaces/my-paper`
4. Add your paper brief to `workspaces/my-paper/briefs/`

**Commands**: `/teach`, `/literature`, `/deliberate`, `/craft`, `/write-para`, `/validate-claim`, `/challenge`, `/check-refs`, `/preflight`, `/publish`, `/ws`, `/wrapup`, `/checkpoint`

### Option B: Claude Desktop Cowork (Plugin)

For non-technical researchers. Same methodology, accessible through a desktop interface.

**Step 1**: Clone the template (you need the workspace structure):
```bash
git clone https://github.com/terrene-foundation/co-research.git my-research
```

**Step 2**: Install the COR plugin in Claude Desktop:
- Open Claude Desktop, switch to Cowork tab
- Click "Customize" in left sidebar, then "Browse plugins"
- Install `co-research` (or load from the `plugin/` folder in this repo)

**Step 3**: Open the cloned folder in Cowork and type `/co-research:start`

**Skills**: All commands are available as `/co-research:teach`, `/co-research:literature`, `/co-research:craft`, etc.

**What's different from CLI**: Hooks (automated validation) are advisory in Cowork, not enforced. Session memory requires manual `/co-research:wrapup`. All other functionality (skills, agents, co-authorship modes) works identically.

### What both paths share

- Same 6 research agents + 2 management agents
- Same 13 skills implementing the 5-phase workflow
- Same two co-authorship modes (`craft` and `write-para`)
- Same workspace structure, journal system, and deliberation records
- Same rules for research integrity, writing style, and publication quality

## The Five Layers

COR implements all five CO layers, specialized for academic research:

| Layer | Name | COR Implementation |
|-------|------|-------------------|
| **L1** | Intent | 6 research agents (literature-researcher, field-expert, claims-verifier, argument-critic, writing-partner, cross-reference-auditor) + 2 management agents |
| **L2** | Context | 8 rule files (research integrity, writing style, deliberation records, publication claims, publication quality, communication, git, security) + research domain skills |
| **L3** | Guardrails | Pre-execution hooks for citation verification, overclaim prevention, and AI-signature word detection |
| **L4** | Instructions | 13 commands implementing a 5-phase workflow with two co-authorship modes (`/craft` and `/write-para`) |
| **L5** | Learning | Journal system with 8 entry types (TEACH, LITERATURE, DELIBERATION, MARGIN, DEFENSE, CLAIM, CONNECTION, GAP) preserving insights across sessions |

## Two Writing Modes

COR supports two co-authorship modes. Choose based on your goals:

### `/craft` -- Author Writes, AI Teaches and Critiques

The author writes their own prose. The AI provides literature gap analysis, originality coaching, defense preparation, and critical feedback. Preferred for:
- Doctoral work where originality must be demonstrable
- Papers where the author's voice is central to the argument
- Defense preparation (the author must be able to defend every sentence)

### `/write-para` -- AI Drafts, Author Approves

The AI drafts paragraphs with inline margin notes explaining every structural choice. The author reviews, edits, and approves. No paragraph advances without explicit approval. Preferred for:
- Rapid iteration on well-understood arguments
- Sections where the structure is settled and execution is the bottleneck
- Co-authored papers where the AI handles initial drafting

Both modes produce journal entries and deliberation records, maintaining a complete audit trail of how the paper was constructed.

## Workspace Structure

Each paper gets its own workspace:

```
workspaces/my-paper/
  briefs/               # Paper scope, objectives, venue targets
  01-analysis/
    literature/         # Literature notes and paper assessments
  03-drafts/
    deliberation/
      decisions/        # Structural decision records
    versions/           # Draft snapshots
  04-validate/
    reviews/            # Verification reports, challenge results
  craft-notes/          # /craft output: literature gaps, challenges
  journal/              # Insight journal (8 entry types)
  todos/
    active/             # Current work items
    completed/          # Done items
```

## COR Command Chain

The standard workflow progresses through five phases:

```
/teach + /literature       Phase 1: Build understanding
        |
    /deliberate            Phase 2: Make structural decisions
        |
  /craft or /write-para    Phase 3: Write with deliberation
        |
/validate-claim            Phase 4: Verify claims and arguments
  + /challenge
        |
  /check-refs              Phase 5: Audit and prepare for submission
  + /preflight
  + /publish
```

Additional commands: `/ws` (workspace status), `/wrapup` (session continuity), `/checkpoint` (learning progress review).

## Principle 8: Authentic Voice

COR practitioners disclose AI assistance according to venue requirements. The writing style rules in this template mitigate detection bias (statistical tools that disproportionately flag non-native English speakers and formulaic academic writing), not conceal AI use.

The co-authorship model is transparent: the human researcher makes every structural decision, approves every paragraph, and directs the argument. The AI researches, drafts, explains, and critiques. Journal entries and deliberation records create a complete trail of the human's intellectual contribution.

Venues increasingly require AI use disclosure. COR's journal and deliberation system provides the evidence to support honest disclosure.

## Configuration

### Research Domain

Open `CLAUDE.md` and replace the `## Research Domain` section with your field's:
- Foundational papers and canonical citations
- Active debates and competing schools of thought
- Key journals and conferences
- Standard terminology and methodology expectations

### Field Expert

Open `.claude/agents/research/field-expert.md` and update the domain knowledge section with expertise specific to your research area.

### Venue Requirements

Publication quality rules (`.claude/rules/publication-quality.md`) include citation density minimums by venue. Adjust these for your field's norms.

### Writing Style

Academic writing style rules (`.claude/rules/academic-writing-style.md`) are calibrated for social sciences and interdisciplinary work. Adjust for your field if conventions differ (e.g., STEM fields may have different expectations for passive voice).

## License

- **Code** (hooks, scripts, configuration): Apache 2.0
- **CO Methodology**: CC BY 4.0, Terrene Foundation

## Links

- [Terrene Foundation](https://terrene.foundation)
- [CO Specification](https://terrene.foundation) (CC BY 4.0)
- [GitHub: terrene-foundation](https://github.com/terrene-foundation)
