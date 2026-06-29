---
name: complexity-review
description: Review code, diffs, or snippets specifically for unnecessary or unjustified complexity. Use when the user asks for a complexity-focused or simplification-focused review, such as reducing maintenance surface, reviewing over-engineering, pruning abstractions, removing unused options, or replacing needless dependencies. Not a general correctness, security, performance, accessibility, or architecture review.
---

# Complexity Review

## Purpose

Review the provided code, diff, or snippet for complexity that lacks a current, evidence-backed reason to exist.

The goal is justified simplicity: smaller maintenance surface, fewer moving parts, and less future burden without weakening behavior, safety, compatibility, readability, or reviewability. Do not optimize for line count.

## Boundaries

This is a focused complexity review, not a general correctness, security, performance, accessibility, or architecture review.

Do not recommend redesigns, broad rewrites, module moves, public API changes, compatibility changes, or harness-boundary changes unless the user explicitly asks for that scope.

Prefer local simplifications that preserve the current behavior and contract.

## Principles

Report a simplification only when it is:

- behavior-preserving
- concrete and local enough to review
- supported by the available code, diff, snippet, tests, configuration, documentation, or package usage
- scoped to what the available context can prove
- not weakening protected complexity

Prefer the smallest change that removes the unjustified surface.

Do not reward code golf. If the shorter version is harder to understand, do not suggest it.

## What to inspect

Look for unjustified maintenance surface in these areas:

- `abstraction`: interfaces, base classes, adapters, strategies, plugin layers, factories, wrappers, or indirection with no current need
- `api`: exports, public methods, options, parameters, overloads, events, or extension points not supported by current usage or requirements
- `configuration`: flags, environment variables, settings, mode switches, or defaults no current caller uses
- `dependency`: libraries, utilities, polyfills, or framework additions that duplicate existing project, platform, runtime, or standard-library behavior
- `state`: caches, lifecycle hooks, mutable state, synchronization, retries, queues, or invalidation logic without a current failure mode or caller need
- `control-flow`: branches, fallbacks, special cases, or mode handling that can be collapsed without changing behavior
- `duplication`: hand-written helpers or repeated logic that can be replaced by existing project patterns, standard-library features, or clearer direct code
- `test-support`: test helpers, fixtures, mocks, or test-only abstractions that add indirection without improving behavior verification

Do not remove actual test coverage merely to reduce code.

## Protected complexity

Do not simplify away complexity that protects:

- behavior: correctness, validation, error semantics, type safety, and data-loss protection
- safety: security, accessibility, and compatibility
- contracts: public APIs, documented extension points, adapter boundaries, and harness boundaries
- operability: observability, debuggability, and test coverage
- maintainability: local conventions, clear boundaries, readability, and future change safety

Do not treat exported APIs, compatibility layers, adapters, harness integrations, or documented extension points as removable unless the available evidence proves they are unused and unsupported.

## Evidence rules

Match the strength of each claim to the available context.

- With a diff only, report only what the diff proves.
- With a pasted snippet only, report only what the snippet proves and do not invent repository context.
- With nearby context, use local call sites and existing project patterns.
- With repository access, inspect imports, exports, call sites, tests, configuration, documentation, package scripts, and package usage before claiming something is unused, redundant, or single-use.

When a simplification depends on an assumption, state the assumption in `Safe because:` and mark the risk as `medium`.

If an idea is plausible but not safely actionable, omit it or list it under `Possible follow-ups`.

## Finding actions

Use exactly one action per finding:

- `delete`: remove unused or redundant code with no replacement
- `inline`: remove unnecessary indirection by moving behavior to the caller
- `replace`: replace custom or third-party behavior with an existing project, standard-library, runtime, platform, or native feature
- `consolidate`: merge duplicated logic into an existing pattern without creating a new speculative abstraction
- `shrink`: express the same behavior more directly without changing the surrounding structure

## Risk levels

Use exactly one risk level per finding:

- `low`: behavior preservation is clear, local, and has no public API or compatibility impact
- `medium`: likely safe, but depends on caller behavior, compatibility assumptions, or test coverage

Do not report `high` risk items as findings. Use `Possible follow-ups` instead.

## Output

Start with a one-sentence verdict.

Then use these sections in order:

1. `Findings`
2. `Kept complexity`
3. `Possible follow-ups`
4. `Final`

Omit empty sections except `Final`.

### Locations

For repository files, use repository-relative paths with line numbers.

For pasted snippets or partial diffs, identify the snippet or diff hunk clearly instead of inventing file paths or line numbers.

### Findings

Use one bullet per finding:

`- <location> [<surface>/<action>] <what to simplify>. Replace with: <replacement-or-none>. Safe because: <evidence>. Risk: <low|medium>.`

Rules:

- Include one surface and one action.
- Include a concrete replacement or say `none`.
- Include a safety reason based on available evidence.
- Do not emit a finding without a concrete location, change, replacement, safety reason, and risk level.

### Kept complexity

Use this section only when a tempting simplification was considered but rejected, and explaining why helps prevent unsafe churn.

Format:

`- <location> Keep this complexity. Reason: <current justification>.`

Use this especially for public APIs, compatibility layers, validation, security, tests, adapter boundaries, and harness boundaries.

### Possible follow-ups

Use this section sparingly, only for high-risk ideas with a concrete investigation target and clearly missing evidence.

Format:

`- <location> [<surface>/<action>] <possible simplification>. Risk: high. Needs: <missing evidence>.`

### Final

End with one of:

`<maintenance-surface summary>.`

or:

`No safe simplifications found. Remaining complexity appears justified by the available evidence.`

or:

`No safe simplifications found in the provided context. More context is needed before making stronger claims.`

## Examples

Good finding:

`- src/date.ts:L4-L12 [dependency/replace] Remove the date-fns import used only for one localized date label. Replace with: Intl.DateTimeFormat. Safe because: the existing options map directly to Intl.DateTimeFormat for the supported locales. Risk: low.`

Good kept complexity:

`- src/client.ts:L31-L58 Keep this complexity. Reason: this wrapper is exported as part of the documented adapter boundary and is used by the test harness.`

Good possible follow-up:

`- src/plugins.ts:L10-L84 [abstraction/delete] The plugin layer may be removable. Risk: high. Needs: confirmation that the exported plugin API is not supported externally and no downstream packages depend on it.`

Bad:

`Vague advice, rewrites, architecture redesigns, line-count-driven removals, or removing validation, tests, or error handling without evidence.`
