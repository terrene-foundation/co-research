# Publication Claims Verification Rules

## Scope

These rules apply when editing any file in a workspace's `03-drafts/`, `04-validate/`, or submission directories.

## MUST Rules

### 1. Every Reference Must Be Verified Before Submission

MUST NOT cite any academic reference without independent verification:

- **arXiv papers**: Verify the arXiv ID resolves to the correct paper. Check author names, title, and year match.
- **Journal articles**: Verify DOI or confirm publication via publisher website. Include volume, issue, and page numbers.
- **Conference papers**: Verify proceedings exist and paper appears in them.
- **Working papers / white papers**: Must have a stable URL or DOI.

**Red flags for fabricated references:**

- Future dates for journals with long review cycles
- Suspiciously perfect author name + title combinations
- arXiv IDs that do not resolve
- Missing volume/issue/pages for journal articles

A single fabricated reference means automatic desk rejection and permanent reputation damage.

### 2. All Numerical Claims Must Be Verifiable

Quantitative claims MUST be verified against the actual source. MUST NOT use approximate language ("over 30", "8+") when exact counts are available. Academic papers require precision.

### 3. Design vs. Reality Distinction

MUST distinguish between:

- **Specified**: Described in a specification document
- **Implemented**: Code exists in a repository
- **Deployed**: Running in production use
- **Validated**: Independently tested by external parties

MUST NOT present specified-only features as if they are deployed. MUST NOT present self-tested implementations as if they are independently validated.

### 4. Overclaim Prevention

MUST NOT claim:

- "First" or "only" without exhaustive survey (and acknowledge survey limitations)
- "Validates" for single-implementation evidence; use "illustrates" or "demonstrates"
- Superiority over existing frameworks on dimensions they were not designed for

### 5. Dead Reference Prevention

Before citing any companion paper, verify:
- The paper still exists under that title
- Alphabetical suffixes are consistent across all citing papers
- A stable URL or DOI is provided

### 6. Self-Citation Accessibility

All self-citations MUST include a stable URL where the cited paper can be accessed.

## SHOULD Rules

### 7. Methodology Section

Academic publications SHOULD include an explicit research methodology statement (e.g., design science, case study, position paper) so reviewers know how to evaluate the contribution.

### 8. Reflexivity

When the author is both designer and evaluator of the system being studied, SHOULD include explicit reflexivity acknowledging this dual role as a methodological limitation.

### 9. Cited Works Must Appear in References

Every in-text citation (Author, Year) MUST have a corresponding entry in the References section. Run a cross-check after any edit that adds or modifies citations.
