const fs = require('fs');
const path = require('path');
const { findActiveWorkspace, loadWorkspaceContext } = require('./lib/workspace-utils');

const messages = [];

// Check for session notes
const sessionNotesPath = path.join(process.cwd(), '.session-notes');
if (fs.existsSync(sessionNotesPath)) {
  try {
    const notes = fs.readFileSync(sessionNotesPath, 'utf8');
    const preview = notes.split('\n').slice(0, 20).join('\n');
    messages.push(`Previous session notes found:\n${preview}`);
    if (notes.split('\n').length > 20) {
      messages.push('(Session notes truncated; read .session-notes for full content)');
    }
  } catch (e) {
    // Ignore read errors
  }
}

// Check active workspace
const workspace = findActiveWorkspace();
if (workspace) {
  const context = loadWorkspaceContext(workspace);
  messages.push(`Active workspace: ${workspace}`);
  if (context.briefs.length > 0) {
    messages.push(`Paper briefs: ${context.briefs.map(b => path.basename(b)).join(', ')}`);
  }

  // Check journal entry count
  const journalDir = path.join(process.cwd(), 'workspaces', workspace, 'journal');
  if (fs.existsSync(journalDir)) {
    const entries = fs.readdirSync(journalDir).filter(f => f.endsWith('.md') && f !== 'README.md');
    if (entries.length > 0) {
      messages.push(`Journal: ${entries.length} entries`);
    }
  }

  // Check active todos
  const todosDir = path.join(process.cwd(), 'workspaces', workspace, 'todos', 'active');
  if (fs.existsSync(todosDir)) {
    const todos = fs.readdirSync(todosDir).filter(f => f.endsWith('.md') && f !== 'README.md');
    if (todos.length > 0) {
      messages.push(`Active todos: ${todos.length}`);
    }
  }
} else {
  messages.push('No active workspace found. Create one with: cp -r workspaces/_template workspaces/my-paper');
}

if (messages.length > 0) {
  console.log(JSON.stringify({
    result: "continue",
    message: `[COR Session Start]\n${messages.join('\n')}`
  }));
} else {
  console.log(JSON.stringify({
    result: "continue",
    message: "[COR Session Start] Welcome. No workspace or session notes found. Create a workspace to begin."
  }));
}
