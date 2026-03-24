#!/usr/bin/env node

/**
 * validate-publication-content.js
 *
 * PostToolUse hook that validates content written to publication directories
 * for academic submission quality. Covers arXiv, SSRN, AIES, AI & Society.
 * Supersedes validate-arxiv-content.js with broader venue coverage.
 *
 * Runs on Edit|Write operations that touch:
 *   publications/
 *   workspaces/<paper>/05-arxiv/
 *   workspaces/<paper>/05-submit/
 */

const fs = require("fs");
const path = require("path");

async function main() {
  const input = JSON.parse(fs.readFileSync("/dev/stdin", "utf8"));
  const toolName = input.tool_name;
  const toolInput = input.tool_input || {};

  // Only check files in publication directories
  const filePath = toolInput.file_path || "";
  const isPublication =
    filePath.includes("publications/") ||
    filePath.includes("05-arxiv/") ||
    filePath.includes("05-submit/");

  if (!isPublication) {
    process.exit(0);
  }

  // Only check markdown, tex, and bib files
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

  // --- Internal path references ---
  const internalPathPatterns = [
    /workspaces\//g,
    /\.claude\//g,
    /scripts\/hooks\//g,
  ];

  for (const pattern of internalPathPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      const inSentence = content.match(
        new RegExp(`.{0,30}${pattern.source}.{0,30}`, "g"),
      );
      if (inSentence) {
        for (const ctx of inSentence.slice(0, 2)) {
          if (
            !ctx.includes("repository") &&
            !ctx.includes("directory") &&
            !ctx.includes("file structure")
          ) {
            warnings.push(
              `Internal path reference: "${ctx.trim().substring(0, 60)}..."`,
            );
          }
        }
      }
    }
  }

  // --- TODO/TBD/placeholder markers ---
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
        `Placeholder marker: "${matches[0]}" (archival content must not contain placeholders)`,
      );
    }
  }

  // --- Unfalsifiable claims ---
  const unfalsifiablePatterns = [
    /best practice/gi,
    /widely accepted/gi,
    /well known that/gi,
    /it is obvious/gi,
    /clearly superior/gi,
    /industry standard/gi,
    /state of the art/gi,
  ];

  const lines = content.split("\n");
  for (const pattern of unfalsifiablePatterns) {
    for (const line of lines) {
      if (
        line.startsWith("#") ||
        line.startsWith("\\section") ||
        line.startsWith("\\subsection")
      )
        continue;
      const matches = line.match(pattern);
      if (matches) {
        warnings.push(
          `Unfalsifiable claim: "${matches[0]}" — cite a source or remove`,
        );
        break;
      }
    }
  }

  // --- Sensitive content ---
  const sensitivePatterns = [
    /\b\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}\b/g, // Credit card-like
    /\b[A-Z0-9._%+-]+@(?!example\.com)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Non-example emails
  ];

  for (const pattern of sensitivePatterns) {
    const matches = content.match(pattern);
    if (matches) {
      warnings.push(
        `Sensitive content: "${matches[0].substring(0, 20)}..." — verify for archival safety`,
      );
    }
  }

  // --- Blind review violations (for conference submission paths) ---
  const isBlindReview =
    filePath.includes("aies") ||
    filePath.includes("ai-society") ||
    filePath.includes("ai_society");

  if (isBlindReview) {
    // Only check body text, not frontmatter or author blocks
    const bodyContent = content
      .replace(/\\author\{[^}]*\}/g, "") // Remove LaTeX author blocks
      .replace(/^---[\s\S]*?---/m, ""); // Remove YAML frontmatter

    // Check for self-identifying patterns in body text
    // (Add your own name/institution patterns here for blind review checks)
  }

  // --- Overclaim patterns ---
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

  // --- In-text citation without reference entry ---
  if (ext === ".md") {
    // Find (Author, Year) or (Author et al., Year) citations
    const citationPattern =
      /\(([A-Z][a-z]+(?:\s+(?:et\s+al\.|&\s+[A-Z][a-z]+))?),?\s+(\d{4})\)/g;
    let citMatch;
    while ((citMatch = citationPattern.exec(content)) !== null) {
      const authorSurname = citMatch[1].split(/\s+/)[0];
      const year = citMatch[2];
      // Check if this author+year appears in references section
      const refsStart = content.indexOf("## References");
      if (refsStart > 0) {
        const refs = content.substring(refsStart);
        if (!refs.includes(authorSurname) || !refs.includes(year)) {
          warnings.push(
            `Orphan citation: (${citMatch[1]}, ${year}) — not found in References section`,
          );
        }
      }
    }
  }

  // --- Disclosure section check ---
  if (ext === ".md" || ext === ".tex") {
    const hasDisclosure =
      content.includes("## Disclosure") ||
      content.includes("\\section{Disclosure") ||
      content.includes("\\section*{Disclosure");

    if (!hasDisclosure && content.length > 5000) {
      warnings.push(
        "No Disclosure section found — academic publications should include author disclosure",
      );
    }
  }

  // --- Limitations section check ---
  if (ext === ".md" || ext === ".tex") {
    const hasLimitations =
      content.includes("Limitation") ||
      content.includes("Does Not Solve") ||
      content.includes("does not solve");

    if (!hasLimitations && content.length > 5000) {
      warnings.push(
        "No Limitations section found — academic publications must include honest limitations",
      );
    }
  }

  // --- Output warnings ---
  if (warnings.length > 0) {
    const header = `Publication Quality Check (${warnings.length} warning${warnings.length > 1 ? "s" : ""}):`;
    const body = warnings.map((w) => `  - ${w}`).join("\n");
    console.error(`${header}\n${body}`);
    process.exit(0);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`Publication validation error: ${err.message}`);
  process.exit(0);
});
