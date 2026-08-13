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
- After opening or updating a draft pull request with visual changes, provide a current screenshot in the PR for review.
- Never force-push a shared branch. Never push directly to the GitHub Pages deployment branch.
- Publishing happens only after reviewed changes reach the canonical branch and the GitHub Pages workflow succeeds.

# Canonical source and generated output

- `app/`, `public/`, `index.html`, and the supporting source/configuration files are the canonical implementation.
- Do not hand-edit hashed JavaScript or CSS bundles under `site/assets/`, and do not use a generated bundle as the only implementation of a feature.
- `npm run build:pages` must produce the complete deployable artifact in `pages-dist/`. GitHub Actions builds this artifact from the merged source and deploys it; contributors do not coordinate generated asset filenames across PRs.
- The glossary enhancement source currently lives in `site/glossary-links.js` and `site/glossary-links.css`; `app/pages-entry.tsx` imports both so they are bundled from source with every Pages build.
- Before opening or updating a PR, run `npm run check`. A PR must not remove an established feature assertion merely to make checks pass.

# Concurrent pull requests

- Concurrent PRs are encouraged when their source ownership is distinct. Record the files or module owned by each task before editing.
- Each task branch must start from a freshly fetched `origin/main`. Before handoff, fetch again and merge or rebase the latest `origin/main`, then rerun `npm run check`.
- When two PRs touch the same source file, the later PR must integrate the earlier merged result and show that the complete feature suite still passes. Never resolve overlap by accepting an entire generated file from one side.
- Do not carry product source only on an unmerged local branch. If a PR intentionally contains generated output only, treat it as incomplete and do not merge it.
