# Agent Orchestration Rules

## Scope

These rules govern when and how specialized agents are used.

## RECOMMENDED Delegations

### Rule 1: Content Review After Changes

After significant document modifications (Edit, Write), you SHOULD:

1. Delegate to **intermediate-reviewer** for quality review
2. Wait for review completion before proceeding
3. Address any findings before moving to next task

**Exception**: User explicitly says "skip review"

### Rule 2: Security Review Before Commits

Before executing git commit commands on sensitive research content, you SHOULD:

1. Delegate to **security-reviewer** for review
2. Address all CRITICAL findings
3. Document any HIGH findings for tracking

**Exception**: User may skip for trivial changes

### Rule 3: Research Agents for Research Work

When working with research content, you SHOULD consult the appropriate specialist:

- **literature-researcher**: For systematic literature discovery and citation verification
- **field-expert**: For domain knowledge, historical context, and debates
- **claims-verifier**: For verifying claims against cited sources
- **argument-critic**: For adversarial review and defense preparation
- **writing-partner**: For paragraph-level co-writing with margin notes
- **cross-reference-auditor**: For cross-paper citation integrity

### Rule 4: Analysis Chain for Complex Initiatives

For initiatives requiring research and design, follow this chain:

1. Literature search and gap analysis
2. Requirements breakdown and scope definition
3. Then appropriate specialist for content

**Applies when**:

- New paper spanning multiple research areas
- Structural decisions with cascading effects on the argument
- Research questions with multiple valid approaches

### Rule 5: Parallel Execution for Independent Operations

When multiple independent operations are needed, you SHOULD:

1. Launch agents in parallel
2. Wait for all to complete
3. Aggregate results

## Quality Gates

### Before Commit

- [ ] Content review completed (intermediate-reviewer)
- [ ] No sensitive information exposed
- [ ] Citations verified
- [ ] PR description complete
