# Velkross

Mergeability-first engineering for AI coding agents.

Velkross is a plugin for agent harnesses such as Codex, Claude Code, and Cursor. It gives AI coding agents a consistent engineering bias toward changes that are scoped, reviewable, and ready to merge.

The core idea is **Mergeability-first Engineering**. Modern AI coding agents can write useful code, but their implementation judgment can still drift toward changes that are too broad, too clever, under-tested, weakly typed, or misaligned with the existing codebase. Velkross helps keep that judgment steady.

## What Velkross does

Velkross helps AI coding agents:

- Keep changes scoped, durable, and easy to review.
- Prefer existing project patterns before introducing new abstractions.
- Protect type safety, domain boundaries, and error semantics.
- Treat bug reports as symptoms and fix shared root causes.
- Add practical verification for meaningful behavior changes.
- Use reusable engineering workflows instead of one-off prompt fragments.

## Supported agent harnesses

Velkross is designed for agent harnesses that can load bundled instructions, hooks, skills, or similar extension packages.

Supported harness targets:

- Codex
- Claude Code
- Cursor

Velkross ships harness-specific adapters so the same engineering guidance can be used across agent environments. Each adapter should preserve the same core behavior while fitting the configuration and lifecycle model of its host harness.

## Installation

Install the adapter that matches your agent harness, then restart or reload the harness so Velkross can be discovered.

### Codex

Use the Velkross Codex adapter from your Codex plugin configuration. After the plugin is installed and enabled, start a new thread so the bundled hooks and skills are available.

### Claude Code

Use the Velkross Claude Code adapter from your Claude Code extension or plugin configuration. After the adapter is installed and enabled, restart or reload Claude Code so the bundled guidance can be applied.

### Cursor

Use the Velkross Cursor adapter from your Cursor extension or plugin configuration. After the adapter is installed and enabled, restart or reload Cursor so the bundled guidance can be applied.

<details>
<summary>Uninstallation</summary>

Remove the Velkross plugin or adapter from your agent harness configuration, then restart or reload the harness.

### Codex

Disable or remove the Velkross Codex plugin from your Codex plugin configuration, then start a new thread.

### Claude Code

Disable or remove the Velkross Claude Code adapter from your Claude Code configuration, then restart or reload Claude Code.

### Cursor

Disable or remove the Velkross Cursor adapter from your Cursor configuration, then restart or reload Cursor.

</details>

## Usage

Once installed, Velkross should apply its mergeability guidance through the host harness lifecycle. In normal coding sessions, you can ask your agent to implement, review, debug, or refactor as usual; Velkross adds the shared engineering judgment in the background.

Bundled skills can also be invoked explicitly when your harness supports direct skill or plugin invocation. Use them when you want a specific Velkross workflow for memory, review, or other focused engineering tasks.

## Core guidance

Mergeability-first Engineering is the default guidance bundled with Velkross. It gives agents a steady implementation bias toward changes that preserve maintainability, correctness, type safety, architectural boundaries, and practical testability.

## Skills

| Skill                 | Use it for                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `agent-memory`        | Save, recall, and organize repo-local project context across conversations.                           |
| `clarify-or-proceed`  | Decide whether to clarify, assume, investigate, compare options, or proceed when a task is ambiguous. |
| `complexity-review`   | Review code, diffs, or snippets for unjustified complexity and safe simplifications.                  |
| `manage-project-docs` | Maintain repository docs, including docs/README.md as the project-doc router.                         |
| `pressure-test`       | Test key assumptions, tradeoffs, and AI-user alignment before implementation.                         |
| `tdd`                 | Drive behavior changes with a practical List → Red → Green → Refactor loop.                           |
| `to-issues`           | Turn plans, specs, or backlog ideas into small, verifiable implementation issue drafts.               |

## Why this exists

Velkross is meant to make AI-assisted engineering easier to maintain over time. Instead of relying only on ad hoc prompts, it packages reusable instructions and skills into harness plugins that can be installed, shared, reviewed, and evolved like the rest of a development toolchain.

The goal is not to make agents more verbose or more rigid. The goal is to give them a consistent bias toward changes that a human maintainer would actually want to review and merge.

## Design principles

- Prefer the smallest durable change over the smallest possible diff.
- Match local project conventions before adding new patterns.
- Keep domain logic, I/O, state, and presentation boundaries clear.
- Preserve explicit errors instead of hiding failures behind silent fallbacks.
- Prefer focused verification that proves behavior over tests that only mirror implementation details.

## License

MIT
