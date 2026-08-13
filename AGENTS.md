# Project publishing policy

- The canonical repository is the GitHub `origin` remote (`mattyuhz/Zurich`).
- Completed site changes must be pushed to `origin/main`. The GitHub Actions Pages workflow publishes that branch to GitHub Pages.
- Do not deploy this project with ChatGPT Sites and do not push changes to the `sites` Git remote.
- The presence of `.openai/hosting.json` in a local checkout is legacy project configuration; it is not authorization to publish to ChatGPT Sites.
