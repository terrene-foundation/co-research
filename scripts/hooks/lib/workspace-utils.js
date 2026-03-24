/**
 * Shared utility: Workspace detection and phase derivation.
 *
 * Used by session-start.js, user-prompt-rules-reminder.js, and phase commands.
 * COR (CO for Research) workspace utilities.
 */

const fs = require("fs");
const path = require("path");

/**
 * Detect the active workspace under workspaces/.
 * Returns the most recently modified project directory, or null if none.
 *
 * @param {string} cwd - Project root directory
 * @returns {{ name: string, path: string } | null}
 */
function detectActiveWorkspace(cwd) {
  const wsDir = path.join(cwd, "workspaces");
  try {
    const entries = fs.readdirSync(wsDir, { withFileTypes: true });
    const projects = entries
      .filter((e) => e.isDirectory() && e.name !== "instructions" && !e.name.startsWith("_"))
      .map((e) => {
        const fullPath = path.join(wsDir, e.name);
        try {
          const stat = fs.statSync(fullPath);
          return { name: e.name, path: fullPath, mtime: stat.mtime.getTime() };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.mtime - a.mtime);

    return projects.length > 0
      ? { name: projects[0].name, path: projects[0].path }
      : null;
  } catch {
    return null;
  }
}

/**
 * Derive the current phase from workspace filesystem state.
 *
 * Research workspace phases:
 * - Has 05-arxiv/ or 05-submit/ with files -> phase 05-submit
 * - Has 04-validate/ with files -> phase 04-validate
 * - Has 03-drafts/ with files -> phase 03-drafts
 * - Has 02-plans/ or deliberation records -> phase 02-deliberate
 * - Has 01-analysis/ with files -> phase 01-analyze
 * - Empty workspace -> not-started
 *
 * @param {string} workspacePath - Absolute path to workspace directory
 * @param {string} cwd - Project root (for checking .claude/agents/project/)
 * @returns {string} Phase identifier
 */
function derivePhase(workspacePath, cwd) {
  // Check for submission artifacts (phase 05)
  if (
    dirHasFiles(path.join(workspacePath, "05-arxiv")) ||
    dirHasFiles(path.join(workspacePath, "05-submit"))
  ) {
    return "05-submit";
  }

  // Check for validation artifacts (phase 04)
  if (dirHasFiles(path.join(workspacePath, "04-validate"))) {
    return "04-validate";
  }

  // Check for drafts (phase 03)
  if (dirHasFiles(path.join(workspacePath, "03-drafts"))) {
    return "03-drafts";
  }

  // Check for deliberation / planning (phase 02)
  if (
    dirHasFiles(path.join(workspacePath, "02-plans")) ||
    dirHasFiles(path.join(workspacePath, "03-drafts", "deliberation", "decisions"))
  ) {
    return "02-deliberate";
  }

  // Check for analysis artifacts (phase 01)
  if (dirHasFiles(path.join(workspacePath, "01-analysis"))) {
    return "01-analyze";
  }

  return "not-started";
}

/**
 * Get todo progress counts.
 *
 * @param {string} workspacePath
 * @returns {{ active: number, completed: number }}
 */
function getTodoProgress(workspacePath) {
  return {
    active: countFiles(path.join(workspacePath, "todos", "active")),
    completed: countFiles(path.join(workspacePath, "todos", "completed")),
  };
}

/**
 * Read .session-notes content if present.
 *
 * @param {string} workspacePath
 * @returns {{ content: string, stale: boolean, age: string } | null}
 */
function getSessionNotes(workspacePath) {
  const notesPath = path.join(workspacePath, ".session-notes");
  try {
    const content = fs.readFileSync(notesPath, "utf8");
    const stat = fs.statSync(notesPath);
    const ageMs = Date.now() - stat.mtime.getTime();
    const ageHours = Math.round(ageMs / (1000 * 60 * 60));
    const stale = ageMs > 24 * 60 * 60 * 1000;

    let age;
    if (ageHours < 1) age = "< 1h ago";
    else if (ageHours < 24) age = `${ageHours}h ago`;
    else age = `${Math.round(ageHours / 24)}d ago`;

    return { content: content.trim(), stale, age };
  } catch {
    return null;
  }
}

/**
 * Build a compact 1-line workspace summary for per-turn injection.
 *
 * @param {string} cwd
 * @returns {string | null}
 */
function buildWorkspaceSummary(cwd) {
  const ws = detectActiveWorkspace(cwd);
  if (!ws) return null;

  const phase = derivePhase(ws.path, cwd);
  const todos = getTodoProgress(ws.path);

  const parts = [ws.name, `Phase: ${phase}`];
  if (todos.active > 0 || todos.completed > 0) {
    parts.push(`Todos: ${todos.active} active / ${todos.completed} done`);
  }

  return parts.join(" | ");
}

// ── Helpers ────────────────────────────────────────────────────────────

function dirHasFiles(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath);
    return entries.some((e) => !e.startsWith("."));
  } catch {
    return false;
  }
}

function countFiles(dirPath) {
  try {
    return fs.readdirSync(dirPath).filter((e) => !e.startsWith(".")).length;
  } catch {
    return 0;
  }
}

module.exports = {
  detectActiveWorkspace,
  derivePhase,
  getTodoProgress,
  getSessionNotes,
  buildWorkspaceSummary,
  dirHasFiles,
  countFiles,
};
