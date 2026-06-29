---
name: complexity-review
description: Review code, diffs, or snippets for unnecessary or unjustified complexity. Use for simplification-focused reviews that look for needless abstractions, unused options, redundant dependencies, avoidable state, duplicated logic, or over-engineering. Not for general correctness, security, performance, accessibility, or architecture review.
---

# Complexity Review

## Role

Review the provided code, diff, or snippet for complexity that lacks a current, evidence-backed reason to exist.

This is a focused complexity review. It is not a general correctness, security, performance, accessibility, or architecture review.

## Goal

Produce an evidence-backed simplification review that reduces unjustified maintenance surface while preserving behavior, safety, compatibility, readability, and reviewability.

The target is justified simplicity, not fewer lines. Do not reward code golf or suggest a shorter version that is harder to understand.

## Scope

Prefer local simplifications that preserve the current behavior and contract.

Do not recommend redesigns, broad rewrites, module moves, public API changes, compatibility changes, or harness-boundary changes unless the user explicitly asks for that scope.

## Reportable simplifications

Report a simplification only when it is:

- behavior-preserving
- concrete and local enough to review
- supported by the available code, diff, snippet, tests, configuration, documentation, or package usage
- scoped to what the available context can prove
- not weakening protected complexity

Prefer the smallest change that removes the unjustified surface.

Do not remove actual test coverage merely to reduce code.

## Complexity surfaces

Classify each finding by the maintenance surface it removes; use these labels as review lenses, not as an exhaustive checklist:

- `abstraction`: interfaces, base classes, adapters, strategies, plugin layers, factories, wrappers, or indirection with no current need
- `api`: exports, public methods, options, parameters, overloads, events, or extension points not supported by current usage or requirements
- `configuration`: flags, environment variables, settings, mode switches, or defaults no current caller uses
- `dependency`: libraries, utilities, polyfills, or framework additions that duplicate existing project, platform, runtime, or standard-library behavior
- `state`: caches, lifecycle hooks, mutable state, synchronization, retries, queues, or invalidation logic without a current failure mode or caller need
- `control-flow`: branches, fallbacks, special cases, or mode handling that can be collapsed without changing behavior
- `duplication`: repeated or hand-written logic that can be replaced by existing project patterns, standard-library features, or clearer direct code
- `test-support`: test helpers, fixtures, mocks, or test-only abstractions that add indirection without improving behavior verification

## Protected complexity

Do not simplify away complexity that protects:

- `behavior`: correctness, validation, error semantics, type safety, and data-loss protection
- `safety`: security, accessibility, and compatibility
- `contracts`: public APIs, documented extension points, adapter boundaries, and harness boundaries
- `operability`: observability, debuggability, and test coverage
- `maintainability`: local conventions, clear boundaries, readability, and future change safety

Treat exported APIs, compatibility layers, adapters, harness integrations, and documented extension points as protected unless the available evidence proves they are unused and unsupported.

## Evidence rules

Match the strength of each claim to the available context.

- With a diff only, report only what the diff proves.
- With a pasted snippet only, report only what the snippet proves. Do not invent repository context.
- With nearby context, use local call sites and existing project patterns.
- With repository access, inspect imports, exports, call sites, tests, configuration, documentation, package scripts, and package usage before claiming something is unused, redundant, or single-use.

When a simplification depends on an assumption, state the assumption in `Safe because:` and mark the risk as `medium`.

If an idea is plausible but not safely actionable, omit it or list it under `Possible follow-ups`.

## Finding actions

Each finding tag pairs one complexity surface with one action: `[<surface>/<action>]`.

Use one action per finding:

- `delete`: remove unused or redundant code with no replacement
- `inline`: remove unnecessary indirection by moving behavior to the caller
- `replace`: replace custom or third-party behavior with an existing project, standard-library, runtime, platform, or native feature
- `consolidate`: merge duplicated logic into an existing pattern without creating a speculative abstraction
- `shrink`: express the same behavior more directly without changing the surrounding structure

## Risk levels

Use one risk level per finding:

- `low`: behavior preservation is clear, local, and has no public API or compatibility impact
- `medium`: likely safe, but depends on caller behavior, compatibility assumptions, or test coverage

Do not report high-risk ideas as findings. Put them under `Possible follow-ups`.

## Response format

Start with a one-sentence verdict.

Then use these sections in order, omitting empty sections except `Final`:

1. `Findings`
2. `Kept complexity`
3. `Possible follow-ups`
4. `Final`

### Findings

Use one bullet per finding:

`- <location> [<surface>/<action>] <what to simplify>. Replace with: <replacement-or-none>. Safe because: <evidence>. Risk: <low|medium>.`

Where:

- `<location>` is a repository-relative path with line numbers when available
- for pasted snippets or partial diffs, identify the snippet or diff hunk instead of inventing file paths or line numbers
- `<surface>` is one of the labels from `Complexity surfaces`
- `<action>` is one of the labels from `Finding actions`
- `<evidence>` cites only what the available context can support

A finding is invalid without a concrete location, surface, action, change, replacement, safety reason, and risk level.

### Kept complexity

Use only when a tempting simplification was considered but rejected, and explaining why helps prevent unsafe churn.

Format:

`- <location> Keep this complexity. Reason: <current justification>.`

Use this especially for public APIs, compatibility layers, validation, security, tests, adapter boundaries, and harness boundaries.

### Possible follow-ups

Use sparingly for high-risk ideas with a concrete investigation target and clearly missing evidence.

Format:

`- <location> [<surface>/<action>] <possible simplification>. Risk: high. Needs: <missing evidence>.`

### Final

End with one of:

`<maintenance-surface summary>.`

or:

`No safe simplifications found. Remaining complexity appears justified by the available evidence.`

or:

`No safe simplifications found in the provided context. More context is needed before making stronger claims.`

## Stop rules

Use the minimum context needed to make evidence-backed simplification claims.

Stop once the review can produce concrete, safe findings or conclude that no safe simplifications are available.

Do not continue searching only to increase the number of findings.

If the available context cannot prove that a simplification is safe, omit it or put it under `Possible follow-ups`.

## Examples

Good finding:

`- src/date.ts:L4-L12 [dependency/replace] Remove the date-fns import used only for one localized date label. Replace with: Intl.DateTimeFormat. Safe because: the existing options map directly to Intl.DateTimeFormat for the supported locales. Risk: low.`

Good kept complexity:

`- src/client.ts:L31-L58 Keep this complexity. Reason: this wrapper is exported as part of the documented adapter boundary and is used by the test harness.`

Good possible follow-up:

`- src/plugins.ts:L10-L84 [abstraction/delete] The plugin layer may be removable. Risk: high. Needs: confirmation that the exported plugin API is not supported externally and no downstream packages depend on it.`
