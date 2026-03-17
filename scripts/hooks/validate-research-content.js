const fs = require('fs');
const path = require('path');

// PostToolUse hook for Edit/Write operations
// Checks for common issues in research content

const toolInput = JSON.parse(process.env.TOOL_INPUT || '{}');
const filePath = toolInput.file_path || '';

// Only check files in workspace drafts or publication directories
const isResearchContent = filePath.includes('/03-drafts/') ||
  filePath.includes('/04-validate/') ||
  filePath.includes('/submission/') ||
  filePath.includes('/publications/');

if (!isResearchContent) {
  console.log(JSON.stringify({ result: "continue" }));
  process.exit(0);
}

// Read the file content
let content = '';
try {
  if (toolInput.new_string) {
    content = toolInput.new_string;
  } else if (toolInput.content) {
    content = toolInput.content;
  } else if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
  }
} catch (e) {
  console.log(JSON.stringify({ result: "continue" }));
  process.exit(0);
}

if (!content) {
  console.log(JSON.stringify({ result: "continue" }));
  process.exit(0);
}

const warnings = [];

// Check for overclaim markers without qualification
const overclaim_patterns = [
  { pattern: /\bthe first\b(?!.*\bto our knowledge\b)/gi, label: '"the first" without "to our knowledge" qualification' },
  { pattern: /\bthe only\b(?!.*\bto our knowledge\b)/gi, label: '"the only" without "to our knowledge" qualification' },
  { pattern: /\bunique(?:ly)?\b(?!.*\b(?:to our knowledge|among surveyed)\b)/gi, label: '"unique" without qualification' },
  { pattern: /\bnovel\b(?!.*\b(?:to our knowledge|among surveyed)\b)/gi, label: '"novel" without qualification' },
];

for (const { pattern, label } of overclaim_patterns) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    // Check each line individually for the pattern
    if (pattern.test(lines[i]) && !/to our knowledge|among surveyed/i.test(lines[i])) {
      warnings.push(`Line ${i + 1}: Possible overclaim: ${label}`);
      break; // One warning per pattern type is enough
    }
    pattern.lastIndex = 0; // Reset regex state
  }
}

// Check for unverified citation markers
const unverified_patterns = [
  /\[UNVERIFIED\]/g,
  /\[TODO\]/g,
  /\[TBD\]/g,
  /\[INSERT/g,
  /\[PLACEHOLDER\]/g,
];

for (const pattern of unverified_patterns) {
  const match = content.match(pattern);
  if (match) {
    warnings.push(`Found ${match.length} "${match[0]}" marker(s) -- resolve before submission`);
  }
}

// Check for internal file path references in publication content
if (filePath.includes('/submission/') || filePath.includes('/publications/')) {
  const internal_paths = [
    /workspaces\//g,
    /\.claude\//g,
    /scripts\/hooks\//g,
    /docs\//g,
  ];
  for (const pattern of internal_paths) {
    if (pattern.test(content)) {
      warnings.push(`Internal file path reference found (${pattern.source}) -- remove from publication content`);
    }
    pattern.lastIndex = 0;
  }
}

// Check for em dashes (AI signature)
if (/\u2014/.test(content)) {
  const count = (content.match(/\u2014/g) || []).length;
  warnings.push(`Found ${count} em dash(es) (U+2014) -- replace with commas, parentheses, semicolons, or restructure`);
}

// Check for AI-signature words
const ai_words = [
  'delve', 'delving', 'multifaceted', 'tapestry', 'realm',
  'intricate', 'pivotal', 'cornerstone', 'commendable',
  'meticulous', 'beacon', 'bustling', 'endeavors',
];

for (const word of ai_words) {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  if (regex.test(content)) {
    warnings.push(`AI-signature word found: "${word}" -- consider alternative phrasing`);
  }
}

if (warnings.length > 0) {
  console.log(JSON.stringify({
    result: "continue",
    message: `[COR Validation] ${warnings.length} warning(s) in ${path.basename(filePath)}:\n${warnings.map(w => `  - ${w}`).join('\n')}`
  }));
} else {
  console.log(JSON.stringify({ result: "continue" }));
}
