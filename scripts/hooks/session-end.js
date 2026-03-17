const fs = require('fs');
const path = require('path');

const sessionNotesPath = path.join(process.cwd(), '.session-notes');
const hasSessionNotes = fs.existsSync(sessionNotesPath);

if (!hasSessionNotes) {
  console.log(JSON.stringify({
    result: "continue",
    message: "[COR] Session ending without session notes. Consider running /wrapup to save progress for the next session."
  }));
} else {
  // Check if session notes are from today
  try {
    const stats = fs.statSync(sessionNotesPath);
    const noteDate = new Date(stats.mtime).toDateString();
    const today = new Date().toDateString();
    if (noteDate !== today) {
      console.log(JSON.stringify({
        result: "continue",
        message: "[COR] Session notes exist but are from a previous session. Consider running /wrapup to update them."
      }));
    } else {
      console.log(JSON.stringify({ result: "continue" }));
    }
  } catch (e) {
    console.log(JSON.stringify({ result: "continue" }));
  }
}
