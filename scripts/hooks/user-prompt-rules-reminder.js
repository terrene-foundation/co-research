#!/usr/bin/env node
/**
 * Hook: user-prompt-rules-reminder
 * Event: UserPromptSubmit
 * Purpose: Inject critical rules into conversation on EVERY user message.
 *          This is the PRIMARY mechanism that survives context compression,
 *          because it runs fresh on every turn (independent of memory).
 *
 * COR (CO for Research) workspace rules injection.
 *
 * Exit Codes:
 *   0 = success (continue)
 */

const fs = require("fs");
const path = require("path");
const {
  parseEnvFile,
  discoverModelsAndKeys,
  buildCompactSummary,
  ensureEnvFile,
} = require("./lib/env-utils");
const { buildWorkspaceSummary } = require("./lib/workspace-utils");

const TIMEOUT_MS = 3000;
const timeout = setTimeout(() => {
  console.log(JSON.stringify({ continue: true }));
  process.exit(0);
}, TIMEOUT_MS);

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  clearTimeout(timeout);
  try {
    const data = JSON.parse(input);
    const result = buildReminder(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch {
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }
});

function buildReminder(data) {
  const cwd = data.cwd || process.cwd();

  // ── Always inject env summary (brief, 1-2 lines) ─────────────────
  const envPath = path.join(cwd, ".env");
  let envSummary = "No .env found";
  let failures = [];

  if (fs.existsSync(envPath)) {
    const env = parseEnvFile(envPath);
    const discovery = discoverModelsAndKeys(env);
    envSummary = buildCompactSummary(env, discovery);
    failures = discovery.validations.filter((v) => v.status === "MISSING_KEY");
  } else {
    // Try to create .env
    ensureEnvFile(cwd);
  }

  // ── Build the reminder lines ──────────────────────────────────────
  const lines = [];

  // Line 1: Always show model/key status (compressed, 1 line)
  lines.push(`[ENV] ${envSummary}`);

  // Line 2: If there are failures, highlight them
  if (failures.length > 0) {
    lines.push(
      `[ENV] CRITICAL: ${failures.length} model(s) missing API keys — LLM calls will fail!`,
    );
  }

  // Line 3: COR research integrity rules (anti-amnesia)
  lines.push(
    "[COR] Research co-authorship mode active. " +
      "Every claim must cite a verified source. No fabricated references. " +
      "Teach as you write. " +
      "Check deliberation decisions before re-debating settled questions.",
  );

  // Line 4: Core behavioral rules
  lines.push(
    "[RULES] No overclaims: 'first', 'only', 'novel' require 'to our knowledge' qualification. " +
      "No em dashes (U+2014). No AI-signature words. " +
      "Disclose AI assistance per venue requirements (Principle 8).",
  );

  // Line 5: Workspace context (survives compaction — primary anti-amnesia mechanism)
  try {
    const wsSummary = buildWorkspaceSummary(cwd);
    if (wsSummary) {
      lines.push(`[WORKSPACE] ${wsSummary}`);
    }
  } catch {}

  return {
    continue: true,
    hookSpecificOutput: {
      hookEventName: "UserPromptSubmit",
      suppressOutput: false,
      message: lines.join("\n"),
    },
  };
}
