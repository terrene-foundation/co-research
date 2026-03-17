# Deliberation Records Rules

## Scope

These rules apply during `/write-para`, `/deliberate`, `/craft`, and any writing in a workspace's `03-drafts/` directory.

## MUST Rules

### 1. Record Structural Decisions

Every structural decision (argument order, framing choice, scope boundary, claim inclusion/exclusion) MUST be recorded as a decision record.

### 2. Decision Record Content

Decision records MUST include:

- What was decided
- Why (the rationale, not just the choice)
- What alternatives were considered and rejected
- Confidence level

### 3. Author Approval Required

Draft paragraphs MUST NOT be finalized without explicit author approval. The AI proposes; the author disposes. Never proceed to the next paragraph without confirmation.

### 4. Store Deliberation Logs

Deliberation logs MUST be stored in the workspace's `03-drafts/deliberation/decisions/` directory with a descriptive filename.

### 5. Journal Every Insight

Every COR command MUST produce journal entries in the workspace's `journal/` directory. Entry types: TEACH, LITERATURE, DELIBERATION, MARGIN, DEFENSE, CLAIM, CONNECTION, GAP. Each entry MUST include frontmatter with: type, date, paper, section, paragraph (if applicable), topic, and tags. See the workspace's `journal/README.md` for the format.

The journal is the primary knowledge trail. It enables extraction into defense preparation, presentations, and supplementary materials. No insight should be lost.

### 6. Journal Entry Naming

Journal entries MUST follow sequential naming: `NNNN-TYPE-topic.md` (e.g., `0001-MARGIN-opening-question.md`). Check the highest existing number before creating a new entry.

## SHOULD Rules

### 7. Substantive Alternatives

Alternatives SHOULD be genuinely viable options, not strawmen. At least two real choices.

### 8. Reviewer Impact

Decision records SHOULD include a "reviewer impact" note: how would this choice affect reception at the target venue?
