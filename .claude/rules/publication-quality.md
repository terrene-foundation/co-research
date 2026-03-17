# Publication Quality Standards

## Scope

These rules apply when working on documents destined for submission to any academic venue.

## MUST Rules

### 1. No Internal References in Publication Content

Publication documents MUST NOT contain:

- References to internal file paths (workspaces/, .claude/, scripts/)
- References to internal tools, hooks, or CI processes
- Draft TODO markers or placeholder text
- Comments intended only for collaborators

### 2. All Claims Must Be Substantiated

Every technical claim MUST be either:

- Demonstrated by the research design with clear reasoning
- Supported by cited prior work with a specific reference
- Explicitly flagged as a limitation or conjecture

Unacceptable: "This is best practice", "Industry standard approach", "widely accepted" without citation.

### 3. Honest Limitations Section Required

Every publication MUST include an explicit limitations section that:

- Names specific failure modes or threats to validity
- Acknowledges what has NOT been empirically verified
- Uses concrete language, not hedges

### 4. Version, Authorship, and Disclosure

Every publication MUST include:

- Version number and date
- Author attribution with affiliation
- Disclosure of author's relationship to the work
- AI use disclosure per venue requirements (Principle 8)
- License statement where applicable

### 5. Terminology Consistency

Publication terminology MUST be internally consistent. Key terms defined in one section must be used identically throughout.

### 6. Citation Density Must Meet Venue Minimum

| Venue | Minimum References |
|-------|--------------------|
| arXiv (cs.*) | 15 |
| SSRN | 10 |
| AIES | 25 |
| AI & Society | 30 |

Adjust these thresholds for your field's conventions.

### 7. Blind Review Compliance

For double-blind venues:

- No author names in body text (only in designated author block)
- No self-identifying references in body text
- No institutional identifiers that reveal authorship

### 8. No Archival Content That Cannot Be Retracted

Since arXiv and SSRN content is permanent:

- No negotiation strategies or internal positioning
- No financial projections or revenue models
- No personal contact information beyond published affiliations
- No speculative claims about future work not yet begun

## SHOULD Rules

### 9. Self-Contained Document

Publications SHOULD be understandable without reading companion documents.

### 10. Comparison Table with Existing Work

Publications SHOULD include a feature comparison table showing how the contribution relates to prior work.

### 11. Explicit Contribution Statement

Publications SHOULD include a clear 2-3 sentence contribution statement near the end of the introduction.

### 12. Evidence Over Assertion

When claiming maturity or quality, publications SHOULD cite specific metrics rather than qualitative statements.
