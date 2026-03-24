#!/usr/bin/env node

/**
 * validate-research-content.js
 *
 * PostToolUse hook for COR (CO for Research and Publications).
 * Validates content written to research workspaces for:
 *   - Unverified citation markers
 *   - Overclaim patterns (first, only, novel without qualification)
 *   - Em dashes and AI-signature words
 *   - Internal path references in publication content
 *
 * Runs on Edit|Write operations that touch:
 *   workspaces/<paper>/03-drafts/
 *   workspaces/<paper>/04-validate/
 *   publications/
 */

const fs = require("fs");
const path = require("path");

async function main() {
  const input = JSON.parse(fs.readFileSync("/dev/stdin", "utf8"));
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || "";

  const isResearchDraft =
    filePath.includes("/03-drafts/") ||
    filePath.includes("/04-validate/") ||
    filePath.includes("/submission/") ||
    filePath.includes("/publications/");

  if (!isResearchDraft) {
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

  // --- Overclaim patterns without qualification ---
  const overclaims = [
    {
      pattern:
        /\bthe first\b(?!\s+(?:to our knowledge|among surveyed|in this))/gi,
      msg: '"the first" without qualification — add "to our knowledge" or cite survey',
    },
    {
      pattern:
        /\bthe only\b(?!\s+(?:to our knowledge|among surveyed|in this))/gi,
      msg: '"the only" without qualification — add "to our knowledge" or cite survey',
    },
    {
      pattern: /\bentirely novel\b/gi,
      msg: '"entirely novel" — strong claim, verify and qualify',
    },
    {
      pattern: /\bunprecedented\b/gi,
      msg: '"unprecedented" — verify against existing work',
    },
  ];

  for (const { pattern, msg } of overclaims) {
    if (pattern.test(content)) {
      warnings.push(`Overclaim: ${msg}`);
    }
  }

  // --- Unverified citation markers ---
  const unverified = content.match(/\[UNVERIFIED\]/g);
  if (unverified) {
    warnings.push(
      `${unverified.length} [UNVERIFIED] citation(s) remaining — verify before submission`,
    );
  }

  // --- TODO/TBD/placeholder markers ---
  const todoPatterns = [
    /\[TODO\]/gi,
    /\[TBD\]/gi,
    /\[INSERT.*?\]/gi,
    /\[PLACEHOLDER\]/gi,
  ];

  for (const pattern of todoPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      warnings.push(
        `Found ${matches.length} "${matches[0]}" marker(s) — resolve before submission`,
      );
    }
  }

  // --- Em dashes (AI signature) ---
  if (/\u2014/.test(content)) {
    const count = (content.match(/\u2014/g) || []).length;
    warnings.push(
      `Found ${count} em dash(es) (U+2014) — replace with commas, parentheses, semicolons, or restructure`,
    );
  }

  // --- AI-signature words ---
  const aiWords = [
    "delve",
    "delving",
    "multifaceted",
    "tapestry",
    "realm",
    "intricate",
    "pivotal",
    "cornerstone",
    "commendable",
    "meticulous",
    "beacon",
    "bustling",
    "endeavors",
  ];

  for (const word of aiWords) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    if (regex.test(content)) {
      warnings.push(
        `AI-signature word found: "${word}" — consider alternative phrasing`,
      );
    }
  }

  // --- Internal path references in publication content ---
  if (
    filePath.includes("/submission/") ||
    filePath.includes("/publications/")
  ) {
    const internalPaths = [/workspaces\//g, /\.claude\//g, /scripts\/hooks\//g];
    for (const pattern of internalPaths) {
      if (pattern.test(content)) {
        warnings.push(
          `Internal path reference (${pattern.source}) — remove from publication content`,
        );
      }
      pattern.lastIndex = 0;
    }
  }

  if (warnings.length > 0) {
    const header = `Research Content Check (${warnings.length} warning${warnings.length > 1 ? "s" : ""}):`;
    const body = warnings.map((w) => `  - ${w}`).join("\n");
    console.error(`${header}\n${body}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`Research validation error: ${err.message}`);
  process.exit(0);
});
