#!/usr/bin/env node

/**
 * validate-arxiv-content.js
 *
 * PostToolUse hook that validates content written to publications/ directory
 * for arXiv submission quality. Checks for common issues that cause
 * arXiv rejections or embarrassing archival content.
 *
 * Runs on Edit|Write operations that touch publications/ or 05-arxiv/
 */

const fs = require("fs");
const path = require("path");

async function main() {
  const input = JSON.parse(fs.readFileSync("/dev/stdin", "utf8"));
  const toolName = input.tool_name;
  const toolInput = input.tool_input || {};

  // Only check files in publications directory
  const filePath = toolInput.file_path || "";
  if (!filePath.includes("publications/") && !filePath.includes("05-arxiv/")) {
    process.exit(0);
  }

  // Only check markdown and tex files
  const ext = path.extname(filePath).toLowerCase();
  if (![".md", ".tex", ".bib"].includes(ext)) {
    process.exit(0);
  }

  // Read the file content
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    process.exit(0);
  }

  const warnings = [];

  // Check for internal file path references
  const internalPathPatterns = [
    /workspaces\//g,
    /\.claude\//g,
    /scripts\/hooks\//g,
  ];

  for (const pattern of internalPathPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      // Allow references in context (e.g., "see docs/...")
      // but flag if they look like internal paths
      const inSentence = content.match(
        new RegExp(`.{0,30}${pattern.source}.{0,30}`, "g"),
      );
      if (inSentence) {
        for (const ctx of inSentence.slice(0, 2)) {
          // Only warn if it looks like an internal reference, not a description
          if (
            !ctx.includes("repository") &&
            !ctx.includes("directory") &&
            !ctx.includes("file structure")
          ) {
            warnings.push(
              `Possible internal path reference: "${ctx.trim().substring(0, 60)}..."`,
            );
          }
        }
      }
    }
  }

  // Check for TODO/TBD/placeholder markers
  const todoPatterns = [
    /\[TODO\]/gi,
    /\[TBD\]/gi,
    /\[INSERT.*?\]/gi,
    /\[PLACEHOLDER\]/gi,
    /TODO:/gi,
    /FIXME:/gi,
    /HACK:/gi,
    /XXX:/gi,
  ];

  for (const pattern of todoPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      warnings.push(
        `Placeholder marker found: "${matches[0]}" (archival content must not contain placeholders)`,
      );
    }
  }

  // Check for unfalsifiable claims (skip headings)
  const unfalsifiablePatterns = [
    /best practice/gi,
    /widely accepted/gi,
    /well known that/gi,
    /it is obvious/gi,
    /clearly superior/gi,
  ];

  const lines = content.split("\n");
  for (const pattern of unfalsifiablePatterns) {
    for (const line of lines) {
      if (line.startsWith("#")) continue; // Skip headings
      const matches = line.match(pattern);
      if (matches) {
        warnings.push(
          `Potentially unfalsifiable claim: "${matches[0]}" — consider citing a source or removing`,
        );
        break; // One warning per pattern is enough
      }
    }
  }

  // Check for sensitive content patterns
  const sensitivePatterns = [
    /\b\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}\b/g, // Credit card-like
    /\b[A-Z0-9._%+-]+@(?!example\.com)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Non-example emails
  ];

  for (const pattern of sensitivePatterns) {
    const matches = content.match(pattern);
    if (matches) {
      warnings.push(
        `Potentially sensitive content: "${matches[0].substring(0, 20)}..." — verify this should be in archival content`,
      );
    }
  }

  if (warnings.length > 0) {
    const header = `arXiv Quality Check (${warnings.length} warning${warnings.length > 1 ? "s" : ""}):`;
    const body = warnings.map((w) => `  - ${w}`).join("\n");
    console.error(`${header}\n${body}`);
    // Warnings only — don't block the edit
    process.exit(0);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`arXiv validation error: ${err.message}`);
  process.exit(0); // Don't block on hook errors
});
