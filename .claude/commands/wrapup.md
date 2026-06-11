---
name: wrapup
description: "Write session notes before ending. Captures context for next session."
---

Write session notes to preserve context for the next session.

1. Determine the active workspace:
   - If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
   - Otherwise, use the most recently modified directory under `workspaces/` (excluding `instructions/`)

### Journal Check

Before writing session notes, review the session's work and create journal entries for any un-journaled decisions, discoveries, or risks:
- Were any research decisions made without DECISION entries? (methodology choices, scope changes, analytical framing)
- Were any literature findings or insights discovered without DISCOVERY entries?
- Were any integrity risks or methodological concerns identified without RISK entries?
- Were any cross-paper connections noted without CONNECTION entries?
- Were any research gaps flagged without GAP entries?

Create entries for anything missing, then proceed to write session notes.

2. Write a `.session-notes` file in the workspace root using plain language a non-technical user can understand:
   - **Accomplished**: Describe in terms of what users can now do or what's been decided, not technical tasks ("Users can now sign up and log in" not "Implemented auth endpoints")
   - **In progress**: Describe what's being worked on in terms of user-visible features
   - **Blockers**: Describe any decisions needed from the user in clear, specific terms with the implications of each option
   - **Next steps**: Describe what will happen next session in terms of outcomes
   - **Active todo**: Which todo was being worked on (for the AI's context restoration)

### Outstanding Ledger — the Forest (cumulative)

The `.session-notes` MUST also carry the running forest: every open forest-level workstream or blocked-item, NOT itemized todos (those live in the workspace `todos/`). It is carried forward each session so the next session inherits its bearings instead of re-deriving them from memory. Each row carries a short single-token (whitespace-free), UNIQUE, STABLE **ID** (`F1`, `F2`, … — never reused, never renamed) plus a **value-anchor**: why the item matters, citing a user-anchored source (the workspace `briefs/`, a `specs/` section, a journal DECISION entry, or a literal user quote).

```markdown
### Outstanding Ledger (forest)

| ID  | Item         | Value-anchor (user-anchored source)                          | Status                            |
| --- | ------------ | ------------------------------------------------------------ | --------------------------------- |
| F1  | <workstream> | <why it matters — briefs/ / specs §X / journal DECISION>      | BLOCKED on X / queued / in-flight |

Closed this session: `F2` → receipt `<PR #N / commit SHA / journal NNNN>`.
```

If the forest is empty, write the sentinel explicitly: "Forest empty — every item closed or externally blocked." NEVER omit this section. An absent ledger is indistinguishable from a forgotten one; absence is not done.

### Ledger Reconciliation (every wrapup)

Reconcile the ledger against the prior `.session-notes` on every wrapup:

1. **Carry forward** every prior row whose work is not yet delivered, KEEPING ITS ID UNCHANGED. The item text MAY be reworded; the ID MUST NOT. A prior open ID silently disappearing is BLOCKED — that is the stale-snapshot trap.
2. **Close with receipt** — for each item delivered this session, move it to the "Closed this session" line, referenced BY ITS ID, WITH a durable receipt (PR number, commit SHA, or journal entry NNNN). No ID or no receipt → it is NOT closed; carry it forward.
3. **Grow** — add any new forest-level workstream or blocked-item with a FRESH UNIQUE ID and a value-anchor citing a user-anchored source. No value-anchor → request it from the user; do NOT invent one.
4. **Empty forest** still writes the sentinel. The sentinel and open rows are mutually exclusive — asserting "Forest empty" with rows present is a defect.

**Why**: Reconciliation converts a per-session note into a durable forest record. Closing only by ID-with-receipt makes "done" auditable rather than asserted, and the no-silent-vanish rule guarantees a workstream cannot be lost simply because a session forgot to mention it. The ledger is forest-level only (workstreams and blocked-items, typically 2–6 rows) — itemizing individual todos here defeats the forest-vs-trees purpose.

3. Keep it concise (under 30 lines plus the ledger). This file is read by the next session's startup to restore context.

4. Overwrite any existing `.session-notes` — only the latest matters. The ledger section is reconciled (carried forward by ID), never dropped by the overwrite.
