---
name: complexity-review
description: Review implemented code, diffs, or snippets for unnecessary or unjustified complexity. Use for simplification-focused reviews that look for needless abstractions, unused options, redundant dependencies, avoidable state, duplicated logic, or over-engineering. Avoid for implementation planning, general correctness, security, performance, accessibility, or architecture review.
---

# Complexity Review

## Purpose

Review the provided code, diff, or snippet for complexity that lacks a current, evidence-backed reason to exist.

Produce an evidence-backed simplification review that reduces unjustified maintenance surface while preserving behavior, safety, compatibility, readability, and reviewability.

This is a focused complexity review. It is not an implementation-planning, general correctness, security, performance, accessibility, or architecture review.

## Core Standard

Optimize for justified simplicity, not fewer lines.

Report complexity only when the available evidence shows it lacks a current reason to exist and can be simplified without changing behavior, weakening safety, breaking contracts, reducing readability, or removing useful verification.

Do not reward code golf or suggest a shorter version that is harder to understand.

## Review Procedure

1. Identify the review context: diff, snippet, nearby files, or repository access.
2. Gather only the evidence needed to make safe simplification claims.
3. Find candidate complexity surfaces: abstraction, API, configuration, dependency, state, control flow, duplication, or test support.
4. Reject candidates that protect behavior, safety, contracts, operability, or maintainability.
5. For each remaining candidate, choose one action: delete, inline, replace, consolidate, or shrink.
6. Assign risk based on evidence strength and compatibility impact.
7. Stop when safe findings are available or no safe simplifications can be proven.

## Complexity Surfaces

Classify each finding by the maintenance surface it removes; use these labels as review lenses, not as an exhaustive checklist:

- `abstraction`: interfaces, base classes, adapters, strategies, plugin layers, factories, wrappers, or indirection with no current need
- `api`: exports, public methods, options, parameters, overloads, events, or extension points not supported by current usage or requirements
- `configuration`: flags, environment variables, settings, mode switches, or defaults no current caller uses
- `dependency`: libraries, utilities, polyfills, or framework additions that duplicate existing project, platform, runtime, or standard-library behavior
- `state`: caches, lifecycle hooks, mutable state, synchronization, retries, queues, or invalidation logic without a current failure mode or caller need
- `control-flow`: branches, fallbacks, special cases, or mode handling that can be collapsed without changing behavior
- `duplication`: repeated or hand-written logic that can be replaced by existing project patterns, standard-library features, or clearer direct code
- `test-support`: test helpers, fixtures, mocks, or test-only abstractions that add indirection without improving behavior verification

## Protected Complexity

Do not simplify away complexity that protects:

- `behavior`: correctness, validation, error semantics, type safety, and data-loss protection
- `safety`: security, accessibility, and compatibility
- `contracts`: public APIs, documented extension points, adapter boundaries, and harness boundaries
- `operability`: observability, debuggability, and test coverage
- `maintainability`: local conventions, clear boundaries, readability, and future change safety

Treat exported APIs, compatibility layers, adapters, harness integrations, and documented extension points as protected unless the available evidence proves they are unused and unsupported.

## Evidence Rules

Match the strength of each claim to the available context.

- With a diff only, report only what the diff proves.
- With a pasted snippet only, report only what the snippet proves. Do not invent repository context.
- With nearby context, use local call sites and existing project patterns.
- With repository access, inspect imports, exports, call sites, tests, configuration, documentation, package scripts, and package usage before claiming something is unused, redundant, or single-use.

When a simplification depends on an assumption, state the assumption in `Safe because:` and mark the risk as `medium`.

If an idea is plausible but not safely actionable, omit it or list it under `Possible Follow-ups`.

## Finding Actions

Each finding tag pairs one complexity surface with one action: `[<surface>/<action>]`.

Use one action per finding:

- `delete`: remove unused or redundant code with no replacement
- `inline`: remove unnecessary indirection by moving behavior to the caller
- `replace`: replace custom or third-party behavior with an existing project, standard-library, runtime, platform, or native feature
- `consolidate`: merge duplicated logic into an existing pattern without creating a speculative abstraction
- `shrink`: express the same behavior more directly without changing the surrounding structure

## Risk Levels

Use one risk level per finding:

- `low`: behavior preservation is clear, local, and has no public API or compatibility impact
- `medium`: likely safe, but depends on caller behavior, compatibility assumptions, or test coverage

Do not report high-risk ideas as findings. Put them under `Possible Follow-ups`.

## Output Shape

Start with a one-sentence verdict.

```text
Verdict: <one-sentence simplification assessment>

Findings:
- <location> [<surface>/<action>] <simplification>. Replace with: <replacement-or-none>. Safe because: <evidence>. Risk: <low|medium>.

Kept Complexity:
- <location> Keep this complexity. Reason: <current justification>.

Possible Follow-ups:
- <location> [<surface>/<action>] <possible simplification>. Risk: high. Needs: <missing evidence>.

Final:
<maintenance-surface summary or no-safe-simplifications conclusion>
```

Omit empty sections except `Verdict` and `Final`.

## Decision Rules

Prefer local simplifications that preserve the current behavior and contract.

Do not recommend redesigns, broad rewrites, module moves, public API changes, compatibility changes, or harness-boundary changes unless the user explicitly asks for that scope.

A simplification is reportable only when it is:

- behavior-preserving
- concrete and local enough to review
- supported by the available code, diff, snippet, tests, configuration, documentation, or package usage
- scoped to what the available context can prove
- not weakening protected complexity

Prefer the smallest change that removes the unjustified surface.

Do not remove actual test coverage merely to reduce code.

A finding is invalid without a concrete location, surface, action, change, replacement, safety reason, and risk level.

Use `Kept Complexity` only when a tempting simplification was considered but rejected, and explaining why helps prevent unsafe churn.

Use this especially for public APIs, compatibility layers, validation, security, tests, adapter boundaries, and harness boundaries.

For pasted snippets or partial diffs, identify the snippet or diff hunk instead of inventing repository paths or line numbers.

## Stop Conditions

Use the minimum context needed to make evidence-backed simplification claims.

Stop once the review can produce concrete, safe findings or conclude that no safe simplifications are available.

Do not continue searching only to increase the number of findings.

If the available context cannot prove that a simplification is safe, omit it or put it under `Possible Follow-ups`.
