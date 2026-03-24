#!/usr/bin/env node

/**
 * validate-teaching-notes.js
 *
 * PostToolUse hook for COR (CO for Research and Publications).
 * Validates literature/teaching notes for completeness:
 *   - Must include connection to the paper being written
 *   - Must include contrasting viewpoints or limitations
 *   - Year validation for cited works
 *
 * Runs on Edit|Write operations that touch:
 *   workspaces/<paper>/01-analysis/literature/
 */

const fs = require("fs");
const path = require("path");

async function main() {
  const input = JSON.parse(fs.readFileSync("/dev/stdin", "utf8"));
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || "";

  if (!filePath.includes("01-analysis/literature/")) {
    process.exit(0);
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".md") {
    process.exit(0);
  }

  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    process.exit(0);
  }

  const warnings = [];

  // Check for connection to paper
  const hasConnection =
    content.toLowerCase().includes("connection to") ||
    content.toLowerCase().includes("relevance") ||
    content.toLowerCase().includes("for your paper") ||
    content.toLowerCase().includes("for the paper") ||
    content.toLowerCase().includes("relates to");

  if (!hasConnection && content.length > 200) {
    warnings.push(
      "Missing connection: Literature note should include how this relates to the paper being written",
    );
  }

  // Check for contrasting viewpoints
  const hasDebate =
    content.toLowerCase().includes("disagree") ||
    content.toLowerCase().includes("debate") ||
    content.toLowerCase().includes("contrast") ||
    content.toLowerCase().includes("limitation") ||
    content.toLowerCase().includes("however") ||
    content.toLowerCase().includes("criticiz") ||
    content.toLowerCase().includes("counter");

  if (!hasDebate && content.length > 500) {
    warnings.push(
      "Missing debate: Literature note should mention contrasting viewpoints or limitations",
    );
  }

  // Year validation
  const yearPattern = /\((\d{4})\)/g;
  let match;
  while ((match = yearPattern.exec(content)) !== null) {
    const year = parseInt(match[1]);
    if (year > 2027) {
      warnings.push(`Future year: (${year}) — likely error`);
    }
    if (year < 1940 && year > 1000) {
      warnings.push(
        `Very old citation: (${year}) — unusual for this domain, verify`,
      );
    }
  }

  if (warnings.length > 0) {
    const header = `Teaching Note Check (${warnings.length} warning${warnings.length > 1 ? "s" : ""}):`;
    const body = warnings.map((w) => `  - ${w}`).join("\n");
    console.error(`${header}\n${body}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`Teaching note validation error: ${err.message}`);
  process.exit(0);
});
