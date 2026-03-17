# Git Workflow Rules

## Scope

These rules apply to all git operations in this repository.

## MUST Rules

### 1. Conventional Commits

Commit messages MUST follow conventional commits format.

**Format**:
```
type(scope): description

[optional body]
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
```
docs(literature): add assessment of Smith (2024) on institutional design
feat(draft): complete methodology section first draft
fix(refs): correct citation suffix for Hong 2026a/b
chore(workspace): set up new paper workspace
```

### 2. Branch Naming

Feature branches MUST follow naming convention.

**Format**: `type/description`

**Examples**:
- `docs/literature-review`
- `feat/methodology-section`
- `fix/citation-audit`

### 3. Atomic Commits

Each commit MUST be self-contained.

- One commit per logical change
- Each commit should be coherent (a complete literature note, a full section draft, etc.)

**Incorrect**:
```
"WIP"
"fix stuff"
"update files"
```

## MUST NOT Rules

### 1. No Secrets in Commits

MUST NOT commit sensitive information (API keys, passwords, personal contact details beyond published affiliations).

### 2. No Large Binaries

MUST NOT commit large binary files (PDFs over 10MB, dataset files). Use Git LFS or external storage.
