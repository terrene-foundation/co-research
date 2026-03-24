# COR Agents

This directory contains specialized agents for the COR (Cognitive Orchestration for Research) workspace.

## Agent Architecture

Agents operate in separate context windows, each specializing in a specific domain. They are coordinated through the root `CLAUDE.md`.

## Available Agents

### Research Co-Authorship

| Agent                       | Purpose                                                            | When to Use                                                |
| --------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| **literature-researcher**   | Literature discovery, paper assessment, citation verification      | Finding and assessing papers for the literature review     |
| **field-expert**            | Domain knowledge tutor, historical context, debates                | Understanding concepts, debates, and reviewer expectations |
| **argument-critic**         | Adversarial reviewer simulation, never says "this is fine"         | Stress-testing arguments before submission                 |
| **writing-partner**         | Paragraph-level co-writing with margin notes and deliberation      | Drafting and refining manuscript text                      |
| **claims-verifier**         | Verifies claims against cited sources                              | Validating attributions and factual claims                 |
| **cross-reference-auditor** | Citation integrity, reference list completeness, scope enforcement | Pre-submission citation and reference audit                |

### Analysis & Review

| Agent                     | Purpose                                              | When to Use                                                  |
| ------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **deep-analyst**          | Risk analysis, failure points, complexity assessment | Complex decisions, structural analysis, strategy evaluation  |
| **requirements-analyst**  | Requirements breakdown, systematic analysis          | New initiatives, specification requirements, project scoping |
| **intermediate-reviewer** | Document and content quality review                  | After significant document changes                           |
| **security-reviewer**     | Security review for sensitive content                | Before committing sensitive, strategic, or personal content  |

### Project Management

| Agent            | Purpose                              | When to Use                                   |
| ---------------- | ------------------------------------ | --------------------------------------------- |
| **todo-manager** | Task tracking and project management | Creating and managing work items              |
| **gh-manager**   | GitHub issue and project management  | Syncing with GitHub Projects, managing issues |

## Suggested Workflows

### For New Research Projects

1. **field-expert** -> Understand the domain landscape and key debates
2. **literature-researcher** -> Systematic literature search
3. **requirements-analyst** -> Break down the research scope
4. **deep-analyst** -> Identify risks and gaps in the research design

### For Manuscript Drafting

1. **writing-partner** -> Draft paragraphs with margin notes
2. **argument-critic** -> Stress-test each section
3. **claims-verifier** -> Verify all attributions
4. **intermediate-reviewer** -> Quality review

### For Pre-Submission

1. **cross-reference-auditor** -> Citation and reference integrity
2. **claims-verifier** -> Final claim verification
3. **argument-critic** -> Hostile reviewer simulation
4. **security-reviewer** -> Archival safety check
5. **intermediate-reviewer** -> Final quality review
