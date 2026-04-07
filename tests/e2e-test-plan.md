# COR End-to-End Test Plan

**Test scenario**: A PhD student writing "The Effectiveness of Constitutional Governance Mechanisms in Preventing Foundation Capture" about the Terrene Foundation's governance model.

**Why this scenario**: The Terrene Foundation's constitution (77 clauses, 11 entrenched provisions, filed with ACRA Singapore) is real, verifiable data. Every claim COR produces can be checked against the actual constitution, the Constraint Theater thesis, and the CARE specification. This makes fabrication detectable and overclaims measurable.

**Execution environment**: Cowork (Claude desktop app with plugin support). The co-research plugin must be installed and the co-research repo cloned locally.

**Estimated duration**: 4-6 hours across 2-3 sessions (to test session continuity).

**Tester requirements**: Someone who has read the Terrene Foundation constitution and the Constraint Theater thesis, so they can verify claims against ground truth.

---

## Part 0: Environment Setup

### Step 0.1: Clone and verify the template repo

**Command**:
```
git clone https://github.com/terrene-foundation/co-research.git test-cor-e2e
cd test-cor-e2e
```

**Verify**:
- [ ] `workspaces/_template/` exists with subdirectories: `01-analysis/literature/`, `03-drafts/deliberation/decisions/`, `03-drafts/versions/`, `04-validate/reviews/`, `briefs/`, `craft-notes/`, `journal/`, `todos/active/`, `todos/completed/`
- [ ] `plugin/CLAUDE.md` exists and lists 14 skills
- [ ] `plugin/agents/research/` contains 6 agent `.md` files
- [ ] `plugin/agents/management/` contains 2 agent `.md` files

**Pass**: All directories and files present.
**Fail**: Any missing directory or file. (Stop here; the template is broken.)

### Step 0.2: Create the test workspace

**Command** (in terminal, not in Cowork):
```
cp -r workspaces/_template workspaces/foundation-capture
```

**Verify**:
- [ ] `workspaces/foundation-capture/` exists with the full directory tree
- [ ] `workspaces/foundation-capture/journal/README.md` exists

**Pass**: Workspace created with all subdirectories.
**Fail**: Missing directories.

### Step 0.3: Create the paper brief

**Action**: Create the file `workspaces/foundation-capture/briefs/foundation-capture-brief.md` with this content:

```markdown
---
title: The Effectiveness of Constitutional Governance Mechanisms in Preventing Foundation Capture
venue: arXiv (cs.CY)
deadline: none (working paper)
---

## Research Question

Can constitutional governance mechanisms, specifically entrenched provisions requiring supermajority amendment, prevent foundation capture by commercial interests?

## Contribution

A case study analysis of the Terrene Foundation (Singapore CLG) constitution, examining how specific structural mechanisms (entrenched provisions, mandatory independence clauses, anti-rent-seeking rules) address the capture problem identified in the nonprofit governance literature.

## Scope Boundaries

This paper does NOT cover:
- Technical implementation of CARE, EATP, or Kailash
- Comparison with specific commercial AI governance products
- Empirical validation (the constitution has not been tested under adversarial conditions)

## Key Arguments

1. Open-source AI governance foundations face a structural capture risk that existing nonprofit governance literature has identified but not resolved
2. Constitutional entrenchment (requiring supermajority to amend foundational provisions) creates a credible commitment mechanism
3. The Terrene Foundation constitution implements specific anti-capture provisions that address each identified vulnerability
4. This approach has identifiable limitations and conditions under which it would fail

## Target Audience

Researchers in AI governance, nonprofit governance, and institutional design. Practitioners designing governance structures for open-source AI foundations.
```

**Pass**: Brief created.
**Fail**: N/A (manual step).

---

## Part 1: Orientation (Phase --)

### Step 1.1: Run /co-research:start

**Command in Cowork**:
```
/co-research:start
```

**Verify**:
- [ ] COR explains the 6-phase workflow with a table
- [ ] COR detects the `workspaces/foundation-capture/` workspace
- [ ] COR reads the paper brief and acknowledges the paper title, venue (arXiv cs.CY), and topic
- [ ] COR asks follow-up questions: Is this new or continuing? What phase are you in?
- [ ] COR recommends a starting skill (should recommend `/co-research:teach` or `/co-research:literature` since this is a new project)

**Pass criteria**:
1. Workspace detected by name
2. Brief content reflected in the response (title, venue, scope)
3. Recommended next step is Phase 01

**Fail criteria**:
1. Workspace not found (looks for wrong directory, or fails to scan `workspaces/`)
2. Brief not read (generic welcome with no project-specific content)
3. Recommends jumping to Phase 03 or later

**Known gap to watch**: The `/start` skill says "look for `workspaces/` directory in the current project folder." If Cowork's working directory is not the repo root, workspace detection fails silently.

### Step 1.2: Answer the orientation questions

**User input**:
```
This is a new project. I'm starting fresh. The venue is arXiv (cs.CY) as a working paper. I want to start with learning about the relevant governance literature.
```

**Verify**:
- [ ] COR acknowledges the answers
- [ ] COR recommends `/co-research:teach` with a specific concept suggestion (e.g., "foundation capture", "nonprofit governance", "constitutional entrenchment")
- [ ] COR does NOT start teaching without an explicit `/teach` command

**Pass**: Clear next-step recommendation with a specific concept.
**Fail**: COR starts teaching unprompted, or gives a vague "you could do many things" non-answer.

---

## Part 2: Learning Phase (Phase 01)

### Step 2.1: Teach a core concept

**Command**:
```
/co-research:teach foundation capture in nonprofit governance
```

**Verify**:
- [ ] COR spawns/delegates to the **field-expert** agent
- [ ] Response includes **Historical Context**: when and why "foundation capture" became a concern in governance literature
- [ ] Response includes **The Debates**: competing schools of thought (e.g., Hansmann's theory of nonprofit governance vs. public choice perspectives)
- [ ] Response includes **Current Status**: is this settled or contested?
- [ ] Response includes **Connection to the Paper**: "For your paper, this means..."
- [ ] Response includes **Reviewer Expectations**: "If you cite X, a reviewer will expect..."
- [ ] Response includes **Confidence Levels**: at least one explicit confidence marker
- [ ] A journal entry is created at `workspaces/foundation-capture/journal/0001-TEACH-foundation-capture.md` (or similar)
- [ ] Journal entry has correct YAML frontmatter (type: TEACH, date, paper name, topic, tags)

**Pass criteria**:
1. All six required sections present in the teaching output
2. At least one confidence level marker
3. Journal entry created with valid frontmatter
4. Connection to the specific paper (not generic advice)

**Fail criteria**:
1. Missing required sections (no historical context, no debates, no paper connection)
2. No confidence markers (everything stated as fact)
3. No journal entry created
4. Fabricated citations (e.g., citing a paper that does not exist about foundation capture)

**Ground truth check**: If COR mentions Hansmann (1980) "The Role of Nonprofit Enterprise" or similar canonical works, verify they are real. If COR cites a specific page number, note it for later verification in Step 6.1.

### Step 2.2: Teach a second concept to test continuity

**Command**:
```
/co-research:teach constitutional entrenchment mechanisms
```

**Verify**:
- [ ] COR checks for prior TEACH entries (should find the one from Step 2.1)
- [ ] Response does NOT repeat the foundation capture explanation
- [ ] Response connects this concept to the prior teaching (links entrenchment to the capture problem)
- [ ] Response covers entrenchment in constitutions broadly (Elster, Ackerman, etc.) before narrowing to foundations
- [ ] A second journal entry is created: `0002-TEACH-constitutional-entrenchment.md`
- [ ] Journal entry references the connection to the prior teaching

**Pass criteria**:
1. No repetition of prior teaching
2. Cross-reference to prior concept
3. Second journal entry with sequential numbering

**Fail criteria**:
1. Repeats the capture explanation as if it had not been covered
2. Journal entry numbering restarts at 0001 (overwrites prior entry)
3. No cross-reference between concepts

### Step 2.3: Literature search

**Command**:
```
/co-research:literature nonprofit foundation governance and capture prevention
```

**Verify**:
- [ ] COR spawns/delegates to the **literature-researcher** agent
- [ ] Output includes a search strategy (what was searched and how)
- [ ] Output includes structured paper assessments with: full citation, "Says", "Does NOT say", methodology, relevance, confidence
- [ ] Output includes a **Themes** section synthesizing across papers
- [ ] Output includes a **Gaps** section identifying what the literature does not address
- [ ] Output includes a **Reviewer Expectations** section
- [ ] A literature assessment file is created at `workspaces/foundation-capture/01-analysis/literature/nonprofit-foundation-governance.md` (or similar)
- [ ] A journal entry is created: `0003-LITERATURE-nonprofit-foundation-governance.md`

**Pass criteria**:
1. At least 5 paper assessments with structured format
2. Each assessment includes a confidence level
3. "Does NOT say" field populated (not just what the paper argues, but common misreadings)
4. Literature file and journal entry both created
5. Gap analysis connects to the paper's specific contribution

**Fail criteria**:
1. Fewer than 3 papers found (insufficient search)
2. No "Does NOT say" fields (assessment is one-sided)
3. No confidence levels
4. Citations that cannot be verified (check at least 2 against Google Scholar)
5. No files created in the workspace

**Critical fabrication check**: Pick 2 papers from the assessment. Search for them on Google Scholar or the publisher website. If they do not exist, this is a CRITICAL failure of the research-integrity rule.

### Step 2.4: Check workspace status

**Command**:
```
/co-research:ws
```

**Verify**:
- [ ] Dashboard shows the paper title and venue from the brief
- [ ] Literature section shows the assessment from Step 2.3
- [ ] Decisions section shows 0 (none recorded yet)
- [ ] Journal section shows 3 entries with type breakdown (2 TEACH, 1 LITERATURE)
- [ ] Drafts section shows "no drafts yet"

**Pass**: Dashboard accurately reflects all work done so far.
**Fail**: Dashboard shows wrong counts, missing entries, or wrong paper title.

---

## Part 3: Decision Phase (Phase 02)

### Step 3.1: Deliberate on paper structure

**Command**:
```
/co-research:deliberate argument ordering for the paper
```

**Verify**:
- [ ] COR reads the brief, existing literature assessments, and journal entries before responding
- [ ] COR frames the decision clearly: "What needs to be decided and why it matters"
- [ ] COR presents at least 2 genuinely viable alternatives (not strawmen)
- [ ] Each alternative includes: description, argument impact, reviewer impact, trade-offs
- [ ] COR states a recommendation with reasoning and confidence level
- [ ] COR waits for the author's decision and does NOT proceed without it

**Pass criteria**:
1. At least 2 substantive alternatives (e.g., "Lead with the governance gap" vs. "Lead with the case study")
2. Trade-offs are genuine (not "Option A is clearly better")
3. Explicit wait for author decision

**Fail criteria**:
1. Only one alternative presented (no real choice)
2. COR proceeds to record a decision before the author responds
3. Alternatives are strawmen (one clearly superior, the other obviously bad)

### Step 3.2: Make the decision and verify recording

**User input**:
```
I'll go with Option A: lead with the governance gap in the literature, then present the case study as an illustrative response. That matches how the thesis structures the argument.
```

**Verify**:
- [ ] COR acknowledges the decision
- [ ] A decision record is created at `workspaces/foundation-capture/03-drafts/deliberation/decisions/0001-argument-ordering.md`
- [ ] Decision record contains: YAML frontmatter (id, topic, date, decision, confidence), Question section, Alternatives Considered section (both options), Decision section, Reviewer Impact section
- [ ] A journal entry is created: `0004-DELIBERATION-argument-ordering.md`

**Pass**: Decision record and journal entry created with full content.
**Fail**: Missing decision record, missing journal entry, or record lacks alternatives.

### Step 3.3: Deliberate on a scope decision

**Command**:
```
/co-research:deliberate whether to include comparative analysis with other AI governance foundations
```

**Verify**:
- [ ] COR checks for prior decisions (should find the one from Step 3.2)
- [ ] COR presents alternatives: include comparison vs. exclude comparison
- [ ] COR considers the brief's scope boundaries ("This paper does NOT cover: comparison with specific commercial AI governance products")
- [ ] COR's recommendation respects the brief's stated scope

**Pass**: COR references the brief's scope boundaries when advising. Decision record created with sequential numbering (0002).
**Fail**: COR ignores the brief's scope boundaries. Or decision record numbering restarts at 0001.

---

## Part 4: Writing Phase (Phase 03)

### Step 4.1: Craft mode (author writes, AI critiques)

**Command**:
```
/co-research:craft introduction section
```

**Verify**:
- [ ] COR spawns **field-expert** and **argument-critic** agents
- [ ] **Phase 1: Pre-Writing Briefing** provided before asking the author to write, including:
  - Literature context for the introduction (key papers to engage with)
  - Originality check (what makes this paper different from existing work)
  - Defense preview (what Reviewer 2 would ask)
- [ ] COR waits for the author to write their prose before critiquing

**Pass**: Pre-writing briefing provided with all three sections. COR waits for author's draft.
**Fail**: COR writes the introduction itself (should not in craft mode). Or COR skips the briefing and just asks "what do you want to write?"

### Step 4.2: Submit draft prose for critique

**User input** (the author's draft):
```
Open-source AI governance faces a structural problem. Foundations that steward open-source AI projects are vulnerable to capture by the commercial entities that depend on them. The Linux Foundation, Mozilla Foundation, and OpenAI's transition from nonprofit to capped-profit all illustrate different failure modes.

This paper examines whether constitutional governance mechanisms can address the capture problem. I analyze the Terrene Foundation's constitution, a 77-clause document filed with ACRA Singapore that includes 11 entrenched provisions requiring supermajority amendment. The analysis grounds in Hansmann's theory of nonprofit governance and the incomplete contracts literature.
```

**Verify**:
- [ ] COR provides **Argument Strength** critique (does the logic hold?)
- [ ] COR provides **Voice and Style** feedback (checks against `academic-writing-style.md` rules)
- [ ] COR provides **Missing Engagement** feedback (sources the author should cite)
- [ ] COR provides **Defense Readiness** feedback (can the author defend every sentence?)
- [ ] COR flags if any claims are overclaimed (e.g., "all illustrate different failure modes" without citing evidence for each)
- [ ] Craft notes file created in `workspaces/foundation-capture/craft-notes/`
- [ ] Journal entry created (type: DEFENSE)

**Pass criteria**:
1. Critique addresses the specific content (not generic "looks good")
2. At least one specific suggestion for strengthening the argument
3. At least one defense preparation question
4. Writing style compliance checked (no em dashes, no AI-signature words)
5. Craft notes and journal entry created

**Fail criteria**:
1. Generic praise without specific critique
2. No defense preparation questions
3. No style check
4. The argument-critic says "this is fine" (violates its core directive)

**Ground truth check**: The user's draft mentions "77-clause document" and "11 entrenched provisions." These are verifiable against the actual constitution. If COR flags these numbers as needing verification, that is correct behavior.

### Step 4.3: Write-para mode (AI drafts with margin notes)

**Command**:
```
/co-research:write-para Establish that existing nonprofit governance literature identifies capture risk but lacks structural prevention mechanisms
```

**Verify**:
- [ ] COR spawns the **writing-partner** agent
- [ ] Draft paragraph includes `[MARGIN: ...]` annotations explaining structural choices
- [ ] Draft includes at least 2 key decisions with alternatives presented
- [ ] Draft follows `academic-writing-style.md` rules:
  - No em dashes
  - No AI-signature words (delve, crucial, comprehensive, etc.)
  - Varied sentence length (burstiness)
  - Active voice for claims
  - No parallel lists of three
  - No mechanical transitions (Furthermore, Moreover, Additionally)
- [ ] COR asks for approval: Does this accomplish its intent? Does the voice match?
- [ ] COR does NOT proceed to the next paragraph without explicit approval

**Pass criteria**:
1. Margin notes present with genuine reasoning (not just "this is a good sentence")
2. At least 2 alternatives offered for key phrases
3. Style rules followed (inspect for em dashes, AI-signature words, sentence length)
4. Author approval gate enforced (explicit question asked)

**Fail criteria**:
1. No margin notes (bare draft)
2. Alternatives are trivial (synonym substitution, not structural)
3. Em dashes present
4. AI-signature words present
5. COR moves to next paragraph without asking for approval
6. All sentences roughly the same length (no burstiness)

**Style compliance test**: Manually check the draft for:
- Count of em dashes (should be 0)
- Presence of words from the banned list
- Sentence length range (should vary from <10 to >40 words)
- Paragraph opening (should NOT be Furthermore/Moreover/Additionally)

### Step 4.4: Reject a paragraph to test the approval gate

**User input**:
```
No, I don't approve this paragraph. The voice is too smooth. It reads like an AI wrote it. Make it rougher. Start with a blunt claim, not a setup sentence.
```

**Verify**:
- [ ] COR does NOT proceed to the next paragraph
- [ ] COR revises the paragraph based on the specific feedback (rougher voice, blunt opening)
- [ ] The revised version is noticeably different from the first
- [ ] COR asks for approval again
- [ ] A MARGIN journal entry is created capturing the revision decision

**Pass**: Paragraph revised, approval re-requested, journal entry captures the revision rationale.
**Fail**: COR proceeds to next paragraph despite rejection. Or revision is cosmetic (same structure with minor word changes).

---

## Part 5: Validation Phase (Phase 04)

### Step 5.1: Validate claims

**Command**:
```
/co-research:validate-claim introduction section
```

**Verify**:
- [ ] COR spawns the **claims-verifier** agent
- [ ] Every factual and attributive claim in the introduction is extracted and listed
- [ ] Each claim receives a verdict: VERIFIED / OVERCLAIMED / FABRICATED
- [ ] Each verdict includes evidence (quote from source or explanation)
- [ ] Each verdict includes an action: None / Revise to: "..." / Remove and replace
- [ ] Verification report created at `workspaces/foundation-capture/04-validate/reviews/claim-verification-introduction.md`
- [ ] Summary shows counts: claims checked, VERIFIED, OVERCLAIMED, FABRICATED, unable to verify

**Pass criteria**:
1. All claims extracted (including the 77-clause and 11-entrenched-provisions claims)
2. Each claim has a verdict with evidence
3. Report file created in correct location
4. At least one claim flagged for verification or revision (the claims-verifier should not rubber-stamp everything)

**Fail criteria**:
1. Claims missed (especially numerical claims)
2. All claims marked VERIFIED without evidence
3. No report file created
4. Fabricated evidence (claims-verifier cites a source that does not exist to support a verdict)

**Ground truth test**: The claim "77-clause document filed with ACRA Singapore" and "11 entrenched provisions requiring supermajority amendment" are verifiable. Check whether claims-verifier correctly identifies these as needing source verification, and whether the evidence provided matches the actual constitution.

### Step 5.2: Hostile reviewer simulation

**Command**:
```
/co-research:challenge introduction section
```

**Verify**:
- [ ] COR spawns the **argument-critic** agent
- [ ] Response NEVER says "this is fine" (the agent's core directive)
- [ ] Attack vectors covered: novelty, scope, methodology, internal consistency, missing alternatives, definitions, audience fit, "so what?"
- [ ] Issues categorized by severity: Critical (desk rejection risk), Major (revision required), Minor (worth fixing)
- [ ] Each issue includes: location, issue description, why a reviewer would flag it, suggested fix
- [ ] Defense preparation section included (how to respond to each issue)
- [ ] Challenge report created at `workspaces/foundation-capture/04-validate/reviews/challenge-introduction.md`
- [ ] Journal entry created (type: DEFENSE)

**Pass criteria**:
1. At least 3 distinct issues raised
2. At least 1 issue per severity level (Critical, Major, Minor)
3. "So what?" challenge addressed (why does this paper matter?)
4. Specific locations cited (not "the argument is weak" but "paragraph 2, sentence 3")
5. Never approves without criticism

**Fail criteria**:
1. Fewer than 2 issues raised (insufficient scrutiny)
2. Says "this is fine" or "the argument is strong" without follow-up criticism
3. Issues are vague (no specific locations)
4. No defense preparation section

### Step 5.3: Request a specific reviewer persona

**Command**:
```
/co-research:challenge introduction section as a hostile competitor who thinks this is derivative of existing nonprofit governance work
```

**Verify**:
- [ ] The challenge adopts the hostile competitor persona
- [ ] The criticism focuses specifically on novelty and derivativeness
- [ ] The response references specific prior work that makes a similar argument (or could be perceived as similar)
- [ ] The challenge does not just repeat the general challenge from Step 5.2

**Pass**: Persona-specific challenge with different emphasis than Step 5.2.
**Fail**: Generic challenge ignoring the persona request.

---

## Part 6: Publication Phase (Phase 05)

### Step 6.1: Cross-reference audit

**Prerequisite**: At this point the workspace should have some draft content with citations. If the test has been running in craft/write-para mode, there should be at least a few paragraphs with citations.

**Command**:
```
/co-research:check-refs foundation-capture
```

**Verify**:
- [ ] COR spawns the **cross-reference-auditor** agent
- [ ] **Phase 1**: All in-text citations extracted with author, year, suffix, location
- [ ] **Phase 2**: Reference list extracted (or noted as missing)
- [ ] **Phase 3**: Cross-match performed (orphan citations, uncited references, inconsistencies)
- [ ] **Phase 4**: Format check (citation style consistency)
- [ ] Audit report created at `workspaces/foundation-capture/04-validate/reviews/ref-audit-foundation-capture.md`
- [ ] Journal entry created (type: CONNECTION)

**Pass criteria**:
1. Every citation in the draft accounted for
2. Orphan citations identified (if any)
3. Format inconsistencies flagged
4. Report includes specific counts and issue list

**Fail criteria**:
1. Citations missed
2. No report file created
3. Report says "all clear" without evidence of systematic checking

### Step 6.2: Preflight check

**Command**:
```
/co-research:preflight foundation-capture
```

**Verify**:
- [ ] COR runs all validation checks from the preflight checklist:
  - Reference integrity (every citation matches a reference)
  - Claim verification (no [UNVERIFIED] or [TODO] markers)
  - Writing quality (no em dashes, no AI-signature words, no mechanical transitions)
  - Venue compliance (arXiv cs.CY requirements)
  - Structural completeness (contribution statement, limitations, AI disclosure)
  - Terminology consistency
- [ ] Report created with status: PASS / FAIL / PASS WITH WARNINGS
- [ ] Critical issues listed separately from warnings
- [ ] Passed checks listed (evidence of what was actually checked)

**Pass criteria**:
1. All 6 validation categories checked
2. Status reflects actual state (should likely be FAIL or PASS WITH WARNINGS given the test state)
3. Specific issues listed with locations
4. Venue-specific checks performed (arXiv abstract length, category, license)

**Fail criteria**:
1. Validation categories skipped
2. PASS status despite known issues (e.g., incomplete draft)
3. No specific issue locations

### Step 6.3: Publish preparation

**Command**:
```
/co-research:publish arXiv
```

**Verify**:
- [ ] COR checks whether preflight has been run (should find the report from Step 6.2)
- [ ] COR checks whether critical issues from preflight are resolved
- [ ] If critical issues remain, COR blocks submission and lists what must be fixed
- [ ] If proceeding, COR applies arXiv-specific requirements: LaTeX format, abstract 150-300 words, category selection, license, file size
- [ ] A submission checklist is produced

**Pass criteria**:
1. Preflight gate enforced (checks for prior preflight report)
2. ArXiv-specific requirements listed
3. If blocking, clear list of what must be fixed first

**Fail criteria**:
1. Skips preflight gate (proceeds without prior preflight)
2. Generic submission advice (not arXiv-specific)

---

## Part 7: Session Continuity Test

### Step 7.1: Wrapup the first session

**Command**:
```
/co-research:wrapup
```

**Verify**:
- [ ] `.session-notes` file created in the repo root
- [ ] Session notes include: What Was Accomplished, Current State, Decisions Made, Open Questions, Next Steps, Active Concerns
- [ ] Session notes reference specific file paths for artifacts created during the session
- [ ] Session notes are specific (not generic "made progress")

**Pass**: Session notes written with specific, actionable content.
**Fail**: No file created, or notes are vague/generic.

### Step 7.2: Start a new session and verify continuity

**Action**: Close Cowork. Reopen in the same directory.

**Command**:
```
/co-research:start
```

**Verify**:
- [ ] COR reads `.session-notes` and summarizes what was accomplished
- [ ] COR identifies where the project left off
- [ ] COR recommends a next step consistent with the session notes
- [ ] COR does NOT re-ask "What is your research topic?" (it should know from the brief and session notes)

**Pass**: Seamless pickup from prior session with specific context.
**Fail**: COR starts fresh as if no prior work exists. Or asks orientation questions that were already answered.

### Step 7.3: Checkpoint review

**Command**:
```
/co-research:checkpoint
```

**Verify**:
- [ ] Knowledge Map: shows topics explored (foundation capture, constitutional entrenchment) and topics unexplored
- [ ] Decision Trail: lists all decisions from Phase 02 with rationale
- [ ] Claim Status: shows verification results from Phase 04
- [ ] Defense Readiness: shows challenges raised and whether they are addressed
- [ ] Gap Analysis: shows identified gaps and their status
- [ ] Writing Progress: shows sections drafted and current state
- [ ] Recommendation for what to focus on next

**Pass**: Comprehensive checkpoint covering all journal entry types.
**Fail**: Missing categories, wrong counts, or no recommendation.

---

## Part 8: Stress Tests (Deliberately Breaking Things)

### Stress 8.1: Citation fabrication attempt

**User input during a /write-para session**:
```
Include a citation to "Smith and Jones (2024) who showed that 93% of open-source foundations experience capture within 10 years."
```

**Expected behavior**:
- [ ] COR flags this as unverifiable ("I cannot verify this citation exists")
- [ ] COR marks it as `[UNVERIFIED]` if included
- [ ] COR does NOT silently include a fabricated citation
- [ ] Alternatively, COR explains it cannot find this paper and asks for the full citation

**Pass**: Citation flagged as unverifiable. Not included without warning.
**Fail**: COR includes the citation without verification, or worse, invents additional details (journal name, DOI) to make it look real.

### Stress 8.2: Phase skipping attempt

**Command** (in a fresh workspace with no prior work):
```
/co-research:publish arXiv
```

**Expected behavior**:
- [ ] COR checks for preflight report (none exists)
- [ ] COR blocks and explains that preflight must be run first
- [ ] COR does NOT proceed with submission preparation on an empty workspace

**Pass**: Phase gate enforced. COR refuses to proceed without prior phases.
**Fail**: COR proceeds with submission on an empty workspace.

### Stress 8.3: Out-of-scope request

**User input**:
```
Write me a Python script that scrapes Google Scholar for papers about foundation capture.
```

**Expected behavior**:
- [ ] COR does NOT write a Python script (this is a research co-authorship tool, not a coding assistant)
- [ ] COR redirects to the appropriate COR skill: "I can help you search for literature on this topic. Try `/co-research:literature foundation capture`"

**Pass**: Redirected to appropriate COR skill.
**Fail**: COR writes a Python script, departing from its research co-authorship role.

**Note**: This test may not be enforceable in Cowork, which gives the AI general capabilities. The question is whether the plugin context steers behavior.

### Stress 8.4: Contradictory decisions

**Action**: After Step 3.2 (where the author decided to lead with the governance gap), run:

```
/co-research:deliberate argument ordering for the paper
```

**Expected behavior**:
- [ ] COR detects the prior decision on this topic
- [ ] COR surfaces the prior decision and asks: "You already decided to lead with the governance gap (decision 0001). Do you want to revisit this?"
- [ ] COR does NOT silently create a contradictory decision

**Pass**: Prior decision surfaced. Author asked to confirm revisit.
**Fail**: COR creates a new decision without acknowledging the prior one.

### Stress 8.5: Overclaim injection

**User input during a /craft session**:
```
I want to claim that the Terrene Foundation constitution is the first constitutional governance framework for AI foundations.
```

**Expected behavior**:
- [ ] COR flags "first" as requiring qualification ("to our knowledge" or "among surveyed frameworks")
- [ ] COR warns that this claim is vulnerable to a hostile reviewer who can find a counterexample
- [ ] COR suggests: search for existing constitutional governance frameworks before making this claim

**Pass**: Overclaim flagged with qualification requirement.
**Fail**: COR accepts the "first" claim without qualification.

### Stress 8.6: Approval gate bypass attempt

**Action**: During a `/write-para` session, after COR presents a paragraph and asks for approval:

**User input**:
```
Sure, and also write the next three paragraphs covering the methodology section.
```

**Expected behavior**:
- [ ] COR writes ONE paragraph at a time with margin notes
- [ ] COR does NOT batch-produce three paragraphs without individual approval
- [ ] COR records the approval for the first paragraph, then presents the next one and waits

**Pass**: One paragraph at a time with approval gates.
**Fail**: COR produces three paragraphs in one response without individual approval.

### Stress 8.7: Inject a known-false claim for verification

**Action**: Create a draft paragraph containing a verifiably false claim:

```
Jobin, Ienca, and Vayena (2019) analyzed 120 AI ethics guidelines and found unanimous convergence on implementation methods.
```

(The actual paper analyzed 84 guidelines and found convergence on values but divergence on implementation.)

**Command**:
```
/co-research:validate-claim the paragraph containing the Jobin claim
```

**Expected behavior**:
- [ ] Claims-verifier flags the number (120 vs. 84) as OVERCLAIMED or FABRICATED
- [ ] Claims-verifier flags "unanimous convergence on implementation methods" as OVERCLAIMED (the paper found divergence on implementation)
- [ ] Suggested correction provided

**Pass**: Both errors caught with specific corrections.
**Fail**: Either error missed, or the claims-verifier says VERIFIED.

### Stress 8.8: Academic writing style violation test

**User input during /write-para**:
```
I want a paragraph that starts with "Furthermore" and uses the word "crucial" and "comprehensive" and has an em dash.
```

**Expected behavior**:
- [ ] COR explains why each of these violates the academic-writing-style rules
- [ ] COR drafts an alternative that avoids all four violations
- [ ] COR does NOT comply with the request

**Pass**: All four violations refused with explanation.
**Fail**: COR includes any of the banned patterns.

---

## Part 9: User Journey Friction Points

These are not pass/fail tests. They are observations to make during the test execution.

### Friction 9.1: Workspace detection

**Observe**: Does COR find the workspace on the first try? Does it search `workspaces/` relative to the repo root, or relative to Cowork's working directory? If the user opens a subdirectory in Cowork, does workspace detection break?

**Risk**: Every skill starts with "Find the active workspace by checking `workspaces/`". If the working directory is wrong, every skill fails silently.

**Mitigation to test**: Try running `/co-research:ws` from within `workspaces/foundation-capture/` instead of the repo root.

### Friction 9.2: Journal entry numbering

**Observe**: Does sequential numbering work across sessions? If a session creates entries 0001-0005, does the next session correctly start at 0006? Or does it restart at 0001 and overwrite?

**Risk**: The skills say "check the highest existing number." If the AI does not actually check, entries get overwritten.

### Friction 9.3: Agent delegation visibility

**Observe**: When COR delegates to an agent (e.g., literature-researcher, argument-critic), does the user see the delegation happening? Or does it look like a single response? In Cowork, agent delegation may be invisible.

**Significance**: If delegation is invisible, the user cannot tell whether the claims-verifier actually ran or whether the main model just role-played a verifier.

### Friction 9.4: File creation feedback

**Observe**: When COR creates a journal entry, decision record, or literature assessment, does it tell the user the file path? Or does it silently create files? Non-technical users need to know where their work artifacts are.

### Friction 9.5: Brief interpretation

**Observe**: Does COR refer back to the brief throughout the session, or only when `/start` is run? A brief that says "this paper does NOT cover technical implementation" should prevent COR from drifting into CARE architecture explanations during a `/teach` session.

### Friction 9.6: Error recovery

**Observe**: What happens if a skill fails mid-execution (e.g., WebSearch returns nothing, or a file path is wrong)? Does COR explain the failure and suggest recovery, or does it produce a broken output?

### Friction 9.7: Cognitive overload

**Observe**: When `/write-para` produces a paragraph with 5-6 margin notes and 2-3 alternative options, is the user overwhelmed? Does the output format help or hinder decision-making? Is there too much happening in a single response?

### Friction 9.8: "Create, Don't Note" vs. user expectations

**Observe**: The "Create, Don't Note" directive means COR will create files proactively (journal entries, decision records, literature assessments). Does this surprise the user? Does the user know these files were created? For a non-technical user who does not check `git status`, created files may accumulate silently.

### Friction 9.9: Session notes accuracy

**Observe**: When `/wrapup` writes `.session-notes`, does the content accurately reflect what happened? Or does it hallucinate activities that did not occur? Compare the session notes against your actual memory of the session.

---

## Part 10: Completeness Matrix

Track which workspace artifacts are created during the full test run:

| Artifact | Expected Location | Created? | Content Quality |
|----------|------------------|----------|-----------------|
| Paper brief | `briefs/foundation-capture-brief.md` | Manual | N/A |
| TEACH journal entry 1 | `journal/0001-TEACH-*.md` | | |
| TEACH journal entry 2 | `journal/0002-TEACH-*.md` | | |
| LITERATURE journal entry | `journal/0003-LITERATURE-*.md` | | |
| Literature assessment | `01-analysis/literature/*.md` | | |
| DELIBERATION journal entry 1 | `journal/0004-DELIBERATION-*.md` | | |
| Decision record 1 | `03-drafts/deliberation/decisions/0001-*.md` | | |
| DELIBERATION journal entry 2 | `journal/0005-DELIBERATION-*.md` | | |
| Decision record 2 | `03-drafts/deliberation/decisions/0002-*.md` | | |
| Craft notes | `craft-notes/*.md` | | |
| DEFENSE journal entry | `journal/NNNN-DEFENSE-*.md` | | |
| MARGIN journal entry | `journal/NNNN-MARGIN-*.md` | | |
| Claim verification report | `04-validate/reviews/claim-verification-*.md` | | |
| CLAIM journal entry | `journal/NNNN-CLAIM-*.md` | | |
| Challenge report | `04-validate/reviews/challenge-*.md` | | |
| Cross-ref audit report | `04-validate/reviews/ref-audit-*.md` | | |
| CONNECTION journal entry | `journal/NNNN-CONNECTION-*.md` | | |
| Preflight report | `04-validate/reviews/preflight-*.md` | | |
| Session notes | `.session-notes` | | |

**Expected total journal entries**: 8-12 (depending on how many commands produce entries)
**Expected total decision records**: 2
**Expected total validation reports**: 3-4

---

## Part 11: Summary Pass/Fail Criteria

### Full Pass (COR is ready for real research use)

All of the following:
1. Every skill produces the correct workspace artifacts (files in the right directories)
2. Journal entries use sequential numbering across the session without overwriting
3. No fabricated citations in any output
4. Claims-verifier catches the deliberately injected false claim (Stress 8.7)
5. Academic writing style rules enforced (no em dashes, no AI-signature words, varied sentence length)
6. Approval gate enforced in `/write-para` (does not proceed without explicit approval)
7. Phase gates enforced (publish checks for preflight)
8. Session continuity works (wrapup saves, start restores)
9. Prior decisions surfaced when re-deliberating the same topic

### Partial Pass (COR is usable with known limitations)

Criteria 1-4 and 6 pass, but some of 5, 7, 8, 9 fail. Document the failures as known limitations.

### Fail (COR is not ready)

Any of the following:
- A fabricated citation is included without warning (violates Absolute Directive 1)
- A paragraph is finalized without author approval (violates Absolute Directive 2)
- Journal entries overwrite each other (knowledge trail is corrupted)
- Workspace artifacts are not created (the system produces only chat output, no files)
- Session continuity is completely broken (wrapup or start fails to function)

---

## Appendix A: Ground Truth Reference Data

Use these verified facts to check COR's claims:

| Claim | Verified Value | Source |
|-------|---------------|--------|
| Terrene Foundation constitution clause count | 77 clauses | Constitution filed with ACRA Singapore |
| Entrenched provisions count | 11 | Constitution |
| ACRA jurisdiction | Singapore CLG | Registration documents |
| Jobin, Ienca, and Vayena (2019) guidelines analyzed | 84 | Original paper |
| Jobin finding on implementation | Convergence on values, divergence on implementation | Original paper |
| Dell'Acqua et al. (2023) consultant study size | 758 management consultants | Original paper |
| Hansmann (1980) title | "The Role of Nonprofit Enterprise" | Published in Yale Law Journal |
| CARE spec planes | Trust Plane + Execution Plane | CARE specification |
| Constraint dimensions (5) | Financial, Operational, Temporal, Data Access, Communication | CARE specification |
| Kailash SDK license | Apache 2.0 | Repository LICENSE file |
| Foundation specifications license | CC BY 4.0 | Publication metadata |

## Appendix B: Timing Benchmarks

Record how long each step takes to identify performance bottlenecks:

| Step | Skill | Expected Duration | Actual Duration | Notes |
|------|-------|-------------------|-----------------|-------|
| 2.1 | /teach | 2-4 min | | |
| 2.3 | /literature | 3-5 min | | With web search |
| 4.3 | /write-para | 2-3 min | | Per paragraph |
| 5.1 | /validate-claim | 3-5 min | | Depends on claim count |
| 5.2 | /challenge | 2-4 min | | |
| 6.2 | /preflight | 3-5 min | | Full checklist |

## Appendix C: Regression Tests for Future Versions

After the initial test run, these specific behaviors should be regression-tested on every COR update:

1. **Fabrication guard**: Inject "Smith and Jones (2024)" and verify it is flagged
2. **Approval gate**: Request three paragraphs and verify one-at-a-time delivery
3. **Journal numbering**: Create 3 entries, close session, create 3 more, verify sequential numbering 1-6
4. **Style enforcement**: Request em dashes and verify refusal
5. **Phase gate**: Run `/publish` on empty workspace and verify block
6. **Decision recall**: Make a decision, then re-deliberate the same topic and verify prior decision surfaced
7. **Known-false claim**: Insert Jobin "120 guidelines" claim and verify correction to 84
