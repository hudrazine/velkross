# Velkross

Language-agnostic mergeability-first engineering for AI coding agents.

Velkross is a plugin for AI coding agent harnesses such as Codex, Claude Code, and Cursor. It gives agents a stable engineering stance centered on mergeability: changes should be scoped, understandable, aligned with the existing codebase, and practically verifiable.

The goal is not to replace project conventions, language expertise, or the agent's general coding ability. Velkross adds a review-oriented bias on top of them so the agent keeps asking the engineering question that matters during collaboration: is this change ready to review and merge?

## What Velkross is

Velkross packages three layers of reusable agent guidance:

- **A baseline engineering stance** through Mergeability-first Engineering.
- **On-demand workflows** through bundled skills for planning, implementation, review, documentation, memory, and ticket drafting.
- **Harness adapters** that deliver the same core behavior through Codex, Claude Code, Cursor, and similar agent environments.

## Why mergeability

Modern AI coding agents are flexible enough to work across many languages, frameworks, and project styles. That flexibility is useful, but it can also make implementation judgment drift toward changes that are too broad, too clever, weakly verified, or misaligned with the surrounding codebase.

Mergeability-first Engineering keeps the agent oriented around the review boundary. A useful change should not merely appear to work. It should preserve the relevant contracts, fit the local architecture, respect error and data semantics, remain understandable to a maintainer, and leave behind proportionate verification when behavior changes.

This is not a replacement for generic software principles. Velkross assumes modern agents already know many common programming patterns. Its job is to keep the agent's choices grounded in the practical standard a human reviewer eventually applies: can this be safely reviewed, maintained, and merged?

## How it works

### Baseline guidance

Mergeability-first Engineering is the always-on guidance bundled with Velkross. It gives agents a steady implementation bias toward changes that preserve maintainability, correctness, type safety where applicable, architectural boundaries, explicit contracts, and practical testability.

### Workflow skills

Skills make the baseline actionable in specific situations. Use them when the agent needs a focused workflow for clarifying scope, pressure-testing a plan, designing a boundary, reducing complexity, practicing TDD, preserving project context, maintaining docs, or turning ideas into implementation tickets.

### Harness adapters

Velkross ships harness-specific adapters so the same engineering guidance can be used across agent environments. Each adapter fits the configuration and lifecycle model of its host harness while preserving the same core engineering behavior.

## Usage

Once installed, Velkross should apply its mergeability guidance through the host harness lifecycle. In normal coding sessions, you can ask your agent to implement, review, debug, or refactor as usual; Velkross adds the shared engineering judgment in the background.

When your harness supports direct skill or plugin invocation, you can also call a bundled workflow explicitly:

```text
Use Velkross while implementing this change.
Use clarify-or-proceed to help choose the next step.
Pressure-test this plan before implementation.
Review this diff for unnecessary complexity.
Use TDD for this behavior change.
```

## Skills

Velkross skills are on-demand workflows that make Mergeability-first Engineering actionable in specific moments of software development.

### Decide and align

Use these when the task is still ambiguous, risky, or shaped by unresolved tradeoffs.

- `clarify-or-proceed`: Decide whether to ask, assume, investigate, compare options, or proceed.
- `pressure-test`: Test key assumptions, tradeoffs, and AI-user alignment before implementation.

### Build and verify

Use this when behavior needs to be changed with practical verification.

- `tdd`: Drive behavior changes with a practical List -> Red -> Green -> Refactor loop.

### Design and review

Use these when the shape of the code matters as much as the immediate behavior.

- `design-deep-modules`: Design, review, reshape, or incrementally migrate module boundaries using the Deep Modules lens.
- `complexity-review`: Review code, diffs, or snippets for unjustified complexity and safe simplifications.

### Preserve project knowledge

Use these when context should survive beyond the current conversation or stay trustworthy in repository docs.

- `agent-memory`: Save, recall, and organize repo-local project context across conversations.
- `manage-project-docs`: Maintain repository docs, including docs/README.md as the project-doc router.

### Turn work into artifacts

Use these when ideas, plans, or reusable practices need to become implementation-ready artifacts.

- `to-tickets`: Turn plans, specs, or backlog ideas into small, verifiable implementation ticket drafts for tracker or file-based workflows.
- `agent-skill-design`: Design and review Agent Skill responsibilities, invocation boundaries, behavioral contracts, and evaluation criteria before platform-specific authoring.

## Supported agent harnesses

Velkross is designed for agent harnesses that can load bundled instructions, hooks, skills, rules, or similar extension packages.

Supported harness targets:

- Codex
- Claude Code
- Cursor

## Installation

Install Velkross as a plugin for your agent harness, then start a new session or reload plugins so the bundled guidance, hooks, rules, and skills are discovered.

### Codex

Add the Velkross marketplace, then install Velkross from the Codex plugin browser.

```bash
codex plugin marketplace add hudrazine/velkross
codex
```

In Codex CLI, open `/plugins`, select Velkross, and install it. In the Codex app, open **Plugins**, select Velkross from the added marketplace, and install it. Start a new thread after installation so the bundled hooks and skills are available.

Velkross includes Codex hooks. If Codex warns that hooks need review, open the hooks review view in the Codex app or use `/hooks` in the CLI, inspect the Velkross hook definitions, and trust them to enable the hook behavior.

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

## Why this exists

Velkross is meant to make AI-assisted engineering easier to maintain over time. Instead of relying only on ad hoc prompts, it packages reusable guidance and workflows into harness plugins that can be installed, shared, reviewed, and evolved like the rest of a development toolchain.

The goal is not to make agents more verbose or more rigid. The goal is to give them a consistent bias toward changes that a human maintainer would actually want to review and merge.

## License

MIT
