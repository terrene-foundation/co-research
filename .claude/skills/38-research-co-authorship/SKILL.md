---
name: research-co-authorship
description: "Research co-authorship rules: integrity, teaching, and deliberation. Use when doing COR work: /write-para, /craft, /teach, /literature, /deliberate, /validate-claim, /challenge, or editing research papers."
---

# Research Co-Authorship Reference (COR)

Rules for research integrity, teaching, and deliberation records during academic co-authorship.

## Research Integrity

### MUST Rules

**1. No Attribution Without Verification.** MUST NOT attribute a claim to a source without verifying the source actually makes that claim. "Bainbridge (1983) argued X" requires confirmation that Bainbridge actually argued X. When uncertain, mark as `[UNVERIFIED]`.

**2. No Synthetic Citations.** MUST NOT generate plausible-sounding citations that may not exist. Every citation must be verified against arXiv, DOI, or publisher website. When uncertain: "I recall a paper by [Author] on [Topic] but cannot verify the exact citation."

**3. Distinguish Direct From Indirect Citations.** When citing via secondary source, acknowledge it: "as cited in" or "building on X's framework, which extended Y's original concept." MUST NOT present secondary interpretation as primary author's claim.

**4. Every Paragraph Teaches.** In co-writing mode, every draft paragraph MUST include inline annotations explaining key choices. Bare drafts without rationale are not acceptable.

**5. No Overclaims Without Qualification.** MUST NOT use "first", "only", "unique", "novel" without "to our knowledge" or "among surveyed" qualification. MUST NOT present specification as validation, or self-tested implementations as independently validated.

**6. Disclose AI Assistance.** Each publication MUST include an AI assistance disclosure statement appropriate to the venue's policy. COR is built for responsible co-authorship, not concealment.

### SHOULD Rules

**7. Present Alternatives.** When drafting key phrases, present 2-3 alternatives with reasoning. Author chooses.

**8. Flag Confidence Levels.** Indicate confidence: "well-established" (high), "my reading, verify" (medium), "recall something, cannot verify" (low).

## Research Teaching

### MUST Rules

**1. Context, Not Just Facts.** Teaching MUST include historical and intellectual context. "Bainbridge (1983), writing about ironies in aviation automation at a time when commercial autopilot was expanding rapidly, identified three paradoxes that remain relevant today."

**2. Identify the Debates.** MUST identify disagreements and competing schools, not just consensus. "Polanyi said tacit knowledge cannot be made explicit. Nonaka disagreed. This debate matters for your paper because..."

**3. Connect to the User's Argument.** Every teaching interaction MUST end with a connection to the paper being written. Pure literature summary without "so for your paper, this means..." is incomplete.

**4. Honest Uncertainty.** If uncertain about a paper's argument, say so explicitly. Never fabricate a plausible interpretation. "I'm not certain about the details of this paper -- verify against the source."

### SHOULD Rules

**5. Gap Alerts.** When teaching a concept, identify related works the reviewer would expect. "If you cite Sheridan, a reviewer will expect you to also engage with Endsley on situation awareness."

**6. Common Miscitations.** When a concept is frequently misused, warn: "Bainbridge is often cited as being anti-automation, but she was actually arguing for better automation design that accounts for human cognition."

## Deliberation Records

### MUST Rules

**1. Record Structural Decisions.** Every structural decision (argument order, framing choice, scope boundary, claim inclusion/exclusion) MUST be recorded as a decision record.

**2. Decision Record Content.** Records MUST include: what was decided, why (rationale), alternatives considered and rejected, confidence level.

**3. Author Approval Required.** Draft paragraphs MUST NOT be finalized without explicit author approval. AI proposes; author disposes. Never proceed to the next paragraph without confirmation.

**4. Store Deliberation Logs.** Store in `workspaces/<project>/03-drafts/deliberation/` with section name and paragraph number.

**5. Journal Every Insight.** Every COR command MUST produce journal entries in `workspaces/<project>/journal/`. Entry types: TEACH, LITERATURE, DELIBERATION, MARGIN, DEFENSE, CLAIM, CONNECTION, GAP. Each entry MUST include frontmatter with: type, date, paper, section, paragraph (if applicable), topic, tags.

**6. Journal Entry Naming.** Sequential: `NNNN-TYPE-topic.md`. Check highest existing number before creating.

### SHOULD Rules

**7. Substantive Alternatives.** Alternatives SHOULD be genuinely viable options, not strawmen.

**8. Reviewer Impact.** Decision records SHOULD include how the choice would affect reception at the target venue.
