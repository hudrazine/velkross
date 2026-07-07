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

Install Velkross as a plugin for your agent harness, then start a new session or reload plugins so the bundled guidance, hooks, rules, and skills are discovered.

### Codex

Add the Velkross marketplace, then install Velkross from the Codex plugin browser.

```bash
codex plugin marketplace add hudrazine/velkross
codex
```

In Codex CLI, open `/plugins`, select Velkross, and install it. In the Codex app, open **Plugins**, select Velkross from the added marketplace, and install it. Start a new thread after installation so the bundled hooks and skills are available.

### Claude Code

Add the Velkross marketplace, install the plugin, then reload plugins in the active Claude Code session.

```bash
claude plugin marketplace add hudrazine/velkross
claude plugin install velkross@velkross
```

Inside Claude Code:

```text
/reload-plugins
```

### Cursor

Install Velkross as a local Cursor plugin by cloning this repository into Cursor's local plugin directory.

macOS/Linux:

```bash
mkdir -p ~/.cursor/plugins/local
git clone https://github.com/hudrazine/velkross.git ~/.cursor/plugins/local/velkross
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.cursor\plugins\local"
git clone https://github.com/hudrazine/velkross.git "$env:USERPROFILE\.cursor\plugins\local\velkross"
```

Restart Cursor or run **Developer: Reload Window** so the bundled rules and skills are loaded.

To update a local Cursor installation:

```bash
git -C ~/.cursor/plugins/local/velkross pull
```

<details>
<summary>Uninstallation</summary>

Remove the Velkross plugin from your agent harness, then restart or reload the harness.

### Codex

In Codex CLI, open the plugin browser:

```bash
codex
```

Then run:

```text
/plugins
```

Open Velkross from the Velkross marketplace and select `Uninstall plugin`. In the Codex app, open **Plugins**, select Velkross, and uninstall it. Start a new thread after uninstalling.

To remove the Velkross marketplace from Codex CLI as well:

```bash
codex plugin marketplace remove velkross
```

### Claude Code

Uninstall Velkross, then reload plugins.

```bash
claude plugin uninstall velkross@velkross
```

Inside Claude Code:

```text
/reload-plugins
```

### Cursor

Remove the local plugin checkout, then restart Cursor or run **Developer: Reload Window**.

macOS/Linux:

```bash
rm -rf ~/.cursor/plugins/local/velkross
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\plugins\local\velkross"
```

</details>

## Usage

Once installed, Velkross should apply its mergeability guidance through the host harness lifecycle. In normal coding sessions, you can ask your agent to implement, review, debug, or refactor as usual; Velkross adds the shared engineering judgment in the background.

Bundled skills can also be invoked explicitly when your harness supports direct skill or plugin invocation. Use them when you want a specific Velkross workflow for memory, review, or other focused engineering tasks.

## Core guidance

Mergeability-first Engineering is the default guidance bundled with Velkross. It gives agents a steady implementation bias toward changes that preserve maintainability, correctness, type safety, architectural boundaries, and practical testability.

## Skills

| Skill                 | Use it for                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `agent-skill-design`  | Design, review, and refine reusable Agent Skills with clear triggers and evaluation checks.           |
| `agent-memory`        | Save, recall, and organize repo-local project context across conversations.                           |
| `clarify-or-proceed`  | Decide whether to clarify, assume, investigate, compare options, or proceed when a task is ambiguous. |
| `complexity-review`   | Review code, diffs, or snippets for unjustified complexity and safe simplifications.                  |
| `design-deep-modules` | Design, reshape, or review module boundaries using the Deep Modules lens.                             |
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
