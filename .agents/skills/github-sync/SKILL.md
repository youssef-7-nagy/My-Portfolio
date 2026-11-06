---
name: github-sync
description: >-
  Automates committing and pushing any project updates directly to the official GitHub
  repository at https://github.com/youssef-7-nagy/My-Portfolio. Use whenever the user asks to
  push updates, deploy changes, or sync with GitHub.
---

# GitHub Sync & Deployment Skill

This skill ensures all workspace updates, UI changes, and feature modifications are cleanly committed and pushed to the official repository:
**Repository URL**: `https://github.com/youssef-7-nagy/My-Portfolio.git`
**Default Branch**: `main`

## Workflow

When asked to push updates or sync code:

1. **Verify Project Cleanliness & Build**:
   Ensure linting and building pass before pushing:
   ```powershell
   npm --prefix portfolio-frontend run lint
   npm --prefix portfolio-frontend run build
   ```

2. **Stage Changes**:
   Stage only tracked and intended files (ensuring `.gitignore` protects `node_modules` and `dist`):
   ```powershell
   git status
   git add .
   ```

3. **Commit with Descriptive Message**:
   Write a clear, concise commit message following standard conventions:
   ```powershell
   git commit -m "feat/fix/style: <concise description of updates>"
   ```

4. **Push to Remote `origin main`**:
   Push directly to the tracked remote:
   ```powershell
   git push origin main
   ```
