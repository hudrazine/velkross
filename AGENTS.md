# Repository Instructions

Guidance for AI coding agents working in this repository.

## Project Overview

Velkross is an agent harness plugin that packages Mergeability-first Engineering guidance, hooks, and reusable skills for AI coding agents. The project is intended to support harnesses such as Codex, Claude Code, and Cursor while keeping the shared engineering behavior consistent across adapters.

## Commands

Use Vite+ (`vp`) as the project toolchain entry point. Vite+ manages the Node.js runtime, package manager, formatting, linting, type checks, tests, builds, and workspace tasks. It is distinct from Vite.

After installing dependencies, read the local Vite+ documentation under `node_modules/vite-plus/docs/` when tool behavior or configuration details matter. Start with `node_modules/vite-plus/docs/guide/index.md`, then open the relevant guide.

- `vp install`: Install dependencies.
- `vp check`: Run formatting, linting, and type checks. Use `--fix` to apply automatic fixes.
- `vp run test`: Run tests.
- `vp env doctor`: Check setup, runtime, or package-manager behavior when something looks wrong.

## Git

- Format commit messages as Conventional Commits: `<type>(<scope>): <summary>`.
- Keep commit messages concise and searchable.
- Include the reason for a change in the commit body when useful.

## Issues and Pull Requests

- Format PR titles like commit messages so they are suitable for final squash commit titles.
- Keep issues and pull requests concise and searchable.
- Briefly summarize the main changes in PR descriptions and include the reason when useful.
- Add issue references, screenshots, test notes, and breaking-change notes only when relevant.
