const fs = require('fs');
const path = require('path');

function findActiveWorkspace() {
  const workspacesDir = path.join(process.cwd(), 'workspaces');
  if (!fs.existsSync(workspacesDir)) return null;

  const dirs = fs.readdirSync(workspacesDir)
    .filter(d => !d.startsWith('_') && fs.statSync(path.join(workspacesDir, d)).isDirectory());

  // Return the most recently modified workspace
  return dirs.sort((a, b) => {
    const aTime = fs.statSync(path.join(workspacesDir, a)).mtimeMs;
    const bTime = fs.statSync(path.join(workspacesDir, b)).mtimeMs;
    return bTime - aTime;
  })[0] || null;
}

function loadWorkspaceContext(workspaceName) {
  const wsDir = path.join(process.cwd(), 'workspaces', workspaceName);
  const briefsDir = path.join(wsDir, 'briefs');
  let context = { name: workspaceName, briefs: [] };

  if (fs.existsSync(briefsDir)) {
    context.briefs = fs.readdirSync(briefsDir)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(briefsDir, f));
  }

  return context;
}

module.exports = { findActiveWorkspace, loadWorkspaceContext };
