# Project publishing policy

- The canonical repository is the GitHub `origin` remote (`mattyuhz/Zurich`).
- Pull requests target `main`. The existing GitHub Actions workflow in `.github/workflows/pages.yml` publishes the approved deployment branch to GitHub Pages.
- Do not deploy this project with ChatGPT Sites and do not push changes to the `sites` Git remote.
- The presence of `.openai/hosting.json` is legacy project configuration; it is not authorization to publish to ChatGPT Sites.

# Multi-agent contribution workflow

Assume other agents may be working in this repository at the same time.

- For every independent task, use a separate Git worktree and a branch named `codex/<short-task-name>`.
- Do not implement feature work directly on `main` or on the GitHub Pages deployment branch.
- Before editing, inspect `git status`, the current branch, and recent commits. Treat existing uncommitted changes as another contributor's work unless the user explicitly assigns them to you.
- Never stage, amend, discard, stash, reset, or otherwise alter another contributor's changes. Stage only explicit files belonging to your task; do not use `git add -A` in a shared or dirty checkout.
- Divide concurrent work by file or clearly owned module whenever possible. If another task is editing the same file, coordinate first or wait rather than producing overlapping changes.
- Keep each commit focused on one task. Rebase or merge the latest `origin/main` into your branch before handoff, then run the relevant build and tests.
- Push the task branch and open a pull request targeting `main`. Do not merge the pull request unless the user explicitly requests it.
- In the pull request, summarize the scope, files changed, validation performed, and any known overlap or follow-up work.
- Never force-push a shared branch. Never push directly to the GitHub Pages deployment branch.
- Publishing happens only after reviewed changes reach the canonical branch and the GitHub Pages workflow succeeds.
