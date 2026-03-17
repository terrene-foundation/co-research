# Security Rules

## Scope

These rules apply to all changes in this repository.

## MUST Rules

### 1. No Sensitive Information in Documents

Documents MUST NOT contain:

- Real API keys, passwords, or tokens
- Personal contact information (phone numbers, personal emails) unless explicitly authorized
- Unpublished collaboration terms or negotiation details
- Draft legal opinions marked as privileged

### 2. No Archival Content That Cannot Be Retracted

Since arXiv and SSRN content is permanent and cannot be removed:

- No negotiation strategies or internal positioning
- No financial projections or revenue models
- No unpublished partnership details
- No personal contact information beyond published affiliations
- No speculative claims about collaborators' unpublished work

### 3. No .env in Git

MUST NOT commit .env files to version control.

### 4. No Hardcoded Secrets in Scripts

Hook scripts MUST NOT contain hardcoded credentials.

## Research-Specific Security

### Pre-Publication Content

- Review for unintended information disclosure before committing drafts to public repositories
- Unpublished findings, datasets, or methodological innovations should be in private repositories until publication
- Reviewer comments and editorial correspondence should never be committed

### Collaboration Documents

- Co-author agreements and contribution records may contain sensitive details; review before committing
- IRB (Institutional Review Board) documents containing participant information must never be committed
