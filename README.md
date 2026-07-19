# Velkross

Language-agnostic trust-preserving software evolution for AI coding agents.

Velkross is a plugin for AI coding agent harnesses such as Codex, Claude Code, and Cursor. It gives agents a stable engineering stance centered on preserving justified trust while software changes: supported contracts should remain dependable, success and failure should stay semantically correct, effects should be contained and recoverable, and behavioral claims should be practically verifiable.

The goal is not to replace project conventions, language expertise, or the agent's general coding ability. Velkross adds a shared center of engineering judgment so the agent keeps asking the question that matters as a system evolves: does this change achieve the required outcome while preserving or strengthening the grounds for trust in the software?

## What Velkross is

Velkross packages three layers of reusable agent guidance:

- **A baseline engineering stance** through Trust-Preserving Software Evolution.
- **On-demand workflows** through bundled skills for planning, implementation, review, documentation, memory, and ticket drafting.
- **Harness adapters** that deliver the same core behavior through Codex, Claude Code, Cursor, and similar agent environments.

## Why trust-preserving evolution

Modern AI coding agents are flexible enough to work across many languages, frameworks, and project styles. That flexibility is useful, but it can also make implementation judgment drift toward changes that are too broad, too clever, weakly verified, or disconnected from the contracts and conceptual model of the surrounding system.

Trust-Preserving Software Evolution keeps the agent oriented around the system qualities that make change safe to depend on. A sound change should not merely appear to work. It should preserve supported contracts not required to change, remain correct in success and failure, fit the system's responsibilities and vocabulary, contain uncertainty and failure, and leave behind evidence capable of revealing when its behavioral claims are false.

Trust preservation is not status-quo preservation. Existing behavior may be a supported contract, a material dependency, an incidental implementation detail, or a defect. Velkross helps the agent distinguish them and make the smallest complete change at the boundary that owns the behavior, with rigor proportionate to impact and uncertainty.

## How it works

### Baseline engineering guidance

Trust-Preserving Software Evolution is the always-on guidance bundled with Velkross. It establishes decision boundaries and priorities around supported contracts, semantic correctness, valid state, conceptual coherence, contained failure, recoverability, and falsifiable evidence without redefining the task or expanding the agent's authority.

### Workflow skills

Skills make the baseline actionable in specific situations. Use them when the agent needs a focused workflow for clarifying scope, building shared understanding, designing a boundary, reducing complexity, practicing TDD, preserving project context, maintaining docs, or turning ideas into implementation tickets.

### Harness adapters

Velkross ships harness-specific adapters so the same engineering guidance can be used across agent environments. Each adapter fits the configuration and lifecycle model of its host harness while preserving the same core engineering behavior.

## Usage

Once installed, Velkross should apply its baseline engineering guidance through the host harness lifecycle. In normal coding sessions, you can ask your agent to implement, review, debug, or refactor as usual; Velkross adds the shared engineering judgment in the background.

When your harness supports direct skill or plugin invocation, you can also call a bundled workflow explicitly:

```text
Use Velkross while implementing this change.
Use alignment-interview to interview me until we share the same understanding.
Review this diff for unnecessary complexity.
Use TDD for this behavior change.
```

## Skills

Velkross skills are on-demand workflows that complement Trust-Preserving Software Evolution in specific moments of software development.

### Decide and align

Use this when shared understanding should be established before acting.

- `alignment-interview`: Elicit and organize context, resolve decisions, and show progress through dependency-aware question rounds.

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
- `project-development-docs`: Search, read, and maintain repository-local development documentation under `.dev-docs/`.

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
codex plugin marketplace add hudrazine/velkross --ref v0.4.1
codex
```

In Codex CLI, open `/plugins`, select Velkross, and install it. In the Codex app, open **Plugins**, select Velkross from the added marketplace, and install it. Start a new thread after installation so the bundled hooks and skills are available.

Velkross includes Codex hooks. If Codex warns that hooks need review, open the hooks review view in the Codex app or use `/hooks` in the CLI, inspect the Velkross hook definitions, and trust them to enable the hook behavior.

### Claude Code

Add the Velkross marketplace, install the plugin, then reload plugins in the active Claude Code session.

```bash
claude plugin marketplace add hudrazine/velkross@v0.4.1
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
git clone --branch v0.4.1 https://github.com/hudrazine/velkross.git ~/.cursor/plugins/local/velkross
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.cursor\plugins\local"
git clone --branch v0.4.1 https://github.com/hudrazine/velkross.git "$env:USERPROFILE\.cursor\plugins\local\velkross"
```

Restart Cursor or run **Developer: Reload Window** so the bundled rules and skills are loaded.

To switch a local Cursor installation to another release, fetch the tags and check out the desired version:

```bash
git -C ~/.cursor/plugins/local/velkross fetch --tags
git -C ~/.cursor/plugins/local/velkross checkout vX.Y.Z
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

The goal is not to make agents more verbose or more rigid. The goal is to give them a consistent bias toward software changes whose contracts, correctness, effects, recovery paths, and evidence remain worthy of justified trust.

## License

MIT
