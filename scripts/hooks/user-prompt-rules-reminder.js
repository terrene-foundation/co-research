const { findActiveWorkspace } = require('./lib/workspace-utils');

const workspace = findActiveWorkspace();
const wsContext = workspace ? ` Active workspace: ${workspace}.` : '';

const reminder = `[COR] Research co-authorship mode active.${wsContext}
- Every claim must cite a verified source. No fabricated references.
- Every paragraph must teach (inline annotations required in /write-para mode).
- Check decision records before re-debating settled questions.
- Disclose AI assistance per venue requirements (Principle 8).
- No overclaims: "first", "only", "novel" require "to our knowledge" qualification.`;

console.log(JSON.stringify({
  result: "continue",
  message: reminder
}));
