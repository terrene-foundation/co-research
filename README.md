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

For researchers who prefer a desktop interface. No coding experience needed.

**What you need before starting:**

- Claude Desktop installed (version with Cowork support; your institution may provide this)
- A Claude Pro, Max, or Team subscription
- About 10 minutes for one-time setup

**Step 1: Download the research workspace**

You need a copy of the COR workspace files on your computer. Choose one method:

**Method A (recommended for non-technical users):** Go to [github.com/terrene-foundation/co-research](https://github.com/terrene-foundation/co-research). Click the green **"Code"** button, then click **"Download ZIP"**. Unzip the downloaded file. Rename the folder to `my-research` and move it to your Documents folder.

**Method B (if you know git):**

```bash
git clone https://github.com/terrene-foundation/co-research.git my-research
```

**Step 2: Install the COR plugin in Claude Desktop**

1. Open Claude Desktop
2. Switch to the **"Cowork"** tab (at the top of the window)
3. In the left sidebar, click **"Customize"**
4. Click **"Browse plugins"**
5. Search for `co-research` and click **"Install"**

If `co-research` does not appear in the plugin browser, install it manually: click **"Load from folder"** and navigate to the `plugin` folder inside the `my-research` folder you downloaded in Step 1.

**Step 3: Open your workspace**

1. In the Cowork tab, click **"Open folder"** (or drag your `my-research` folder into the Cowork window)
2. Type `/co-research:start` in the chat
3. COR will introduce itself, explain the six-phase workflow, and ask about your research project

**Step 4 (optional): Configure for your field**

Open the `CLAUDE.md` file in your `my-research` folder with any text editor (TextEdit on Mac, Notepad on Windows). Find the **"Research Domain"** section near the bottom. Replace the example content with your field's key papers, debates, and terminology. This helps COR give field-specific guidance.

**Troubleshooting:**

- **"Plugin not found" in the browser**: Use the manual "Load from folder" method in Step 2
- **The folder won't open in Cowork**: Make sure you are in the Cowork tab, not the regular Chat tab
- **Commands don't work**: Make sure you type the full skill name with the plugin prefix, e.g., `/co-research:teach` (not just `/teach`)

### What both paths share

- Same 6 research agents + 2 management agents
- Same 14 skills implementing the 6-phase workflow
- Same two co-authorship modes (`craft` and `write-para`)
- Same workspace structure, journal system, and deliberation records
- Same rules for research integrity, writing style, and publication quality

### Limitations of the Cowork plugin (compared to CLI)

The Cowork plugin provides the same methodology and agents as the CLI version, with these differences:

| Feature                   | CLI (Claude Code)                                                                                                        | Cowork Plugin                                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Guardrail enforcement** | Hooks automatically block fabricated citations, missing disclaimers, and AI-signature words before they reach your draft | Rules are advisory. COR follows them but cannot programmatically enforce them. You should still run `/co-research:validate-claim` and `/co-research:check-refs` manually.                       |
| **Session memory**        | `.session-notes` is read automatically on the next session start                                                         | You must run `/co-research:wrapup` before ending a session. The next session does not auto-read the notes; tell COR to "read .session-notes" or run `/co-research:start` which checks for them. |
| **Workspace detection**   | Hooks automatically detect the active workspace                                                                          | COR infers the workspace from the folder you open. If you have multiple workspaces, tell COR which one to use.                                                                                  |
| **Skill names**           | `/teach`, `/literature`, `/craft`, etc.                                                                                  | `/co-research:teach`, `/co-research:literature`, `/co-research:craft`, etc. (plugin prefix required)                                                                                            |
| **Agent permissions**     | Agents can enforce permission modes and use hooks                                                                        | Plugin agents cannot use hooks or override permission settings (Cowork security restriction).                                                                                                   |
| **File system access**    | Full access                                                                                                              | Access limited to the folder you opened in Cowork.                                                                                                                                              |

These limitations do not affect the core methodology. The six-phase workflow, co-authorship modes, agents, and journal system all work identically.

## The Five Layers

COR implements all five CO layers, specialized for academic research:

| Layer  | Name         | COR Implementation                                                                                                                                                     |
| ------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **L1** | Intent       | 6 research agents (literature-researcher, field-expert, claims-verifier, argument-critic, writing-partner, cross-reference-auditor) + 2 management agents              |
| **L2** | Context      | 8 rule files (research integrity, writing style, deliberation records, publication claims, publication quality, communication, git, security) + research domain skills |
| **L3** | Guardrails   | Pre-execution hooks for citation verification, overclaim prevention, and AI-signature word detection                                                                   |
| **L4** | Instructions | 14 commands implementing a 6-phase workflow with two co-authorship modes (`/craft` and `/write-para`)                                                                  |
| **L5** | Learning     | Journal system with 8 entry types (TEACH, LITERATURE, DELIBERATION, MARGIN, DEFENSE, CLAIM, CONNECTION, GAP) preserving insights across sessions                       |

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

The standard workflow progresses through six phases:

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
