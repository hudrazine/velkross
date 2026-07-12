---
name: complexity-review
description: Review implemented code, diffs, or snippets for unjustified maintenance complexity and concrete behavior-preserving simplifications. Use for simplification-focused reviews of needless abstractions, unused API or configuration, redundant dependencies, avoidable state or control flow, duplicated logic, test indirection, or over-engineering. Avoid for implementation planning, general correctness, security, performance, accessibility, module-boundary, or architecture review.
---

# Complexity Review

## Purpose

Review implemented code for complexity that lacks a current, evidence-backed reason to exist.

Reduce unjustified maintenance surface while preserving behavior, safety, compatibility, contracts, readability, operability, and useful verification. Optimize for justified simplicity, not fewer lines.

Treat the review as the requested outcome. Do not implement a simplification unless the user also asks for changes.

## Review Standard

Report a simplification only when the available evidence supports all of the following:

- the complexity has no current responsibility or requirement
- the proposed change is concrete and local enough to review
- relevant behavior and contracts remain unchanged
- safety, readability, diagnostics, and effective test coverage are not weakened
- the removed maintenance surface justifies the change and its risk

Reject code golf, speculative cleanup, and shorter code that is harder to understand. Prefer the smallest durable change that removes the unjustified surface.

## Review Method

1. Identify the supplied scope and the evidence available from the diff, snippet, nearby files, or repository.
2. Inspect the most relevant complexity surfaces and prioritize candidates with meaningful maintenance cost.
3. Test each candidate against protected behavior and contracts before recommending it.
4. Gather only the claim-specific evidence needed to establish that the change is safe.
5. Report supported findings, useful explanations of kept complexity, and high-value investigations that remain unproven.
6. Stop when the material candidates in scope have enough coverage to support the verdict, further search is unlikely to change it, or the evidence boundary has been reached.

Do not continue searching to increase the number of findings, but do not stop merely because the first safe finding is available.

## Complexity Surfaces

Use these as review lenses rather than an exhaustive checklist:

- `abstraction`: interfaces, base classes, adapters, strategies, factories, wrappers, or indirection with no current responsibility
- `api`: exports, methods, options, parameters, overloads, events, or extension points with no supported caller or requirement
- `configuration`: flags, environment variables, settings, modes, or defaults with no current use
- `dependency`: libraries, utilities, or polyfills that duplicate suitable project, runtime, platform, or standard-library behavior
- `state`: caches, lifecycle hooks, mutable state, synchronization, retries, queues, or invalidation without a current failure mode or caller need
- `control-flow`: branches, fallbacks, special cases, or modes that can be collapsed without changing behavior
- `duplication`: repeated or hand-written logic that an existing project pattern or clearer direct code can replace
- `test-support`: helpers, fixtures, mocks, or test-only abstractions that add indirection without improving behavioral verification

Classify a supported finding with one action: `delete`, `inline`, `replace`, `consolidate`, or `shrink`.

## Protected Complexity

Preserve complexity that currently protects:

- correctness, validation, error semantics, type safety, or data-loss prevention
- security, accessibility, or compatibility
- public APIs, documented extension points, adapters, or harness boundaries
- observability, debuggability, recovery behavior, or effective test coverage
- clear ownership, local conventions, readability, or known future-change safety

Treat exported APIs, compatibility layers, adapters, harness integrations, and documented extension points as protected unless evidence establishes that they are unused and unsupported.

Do not disguise a correctness, security, performance, accessibility, or architecture concern as a simplification finding. Mention an adjacent concern only when it materially prevents a safe simplification, and route broader review to the appropriate task.

## Evidence Routing

Match each claim to the context and evidence it actually requires:

- For unused API, configuration, or abstraction claims, inspect relevant exports, callers, documentation, configuration, and supported extension points.
- For dependency replacement, compare the used behavior, edge cases, compatibility range, and available project, runtime, platform, or standard-library capability.
- For state or control-flow removal, inspect lifecycle, failure paths, ordering, concurrency, cleanup, and tests where relevant.
- For consolidation, confirm that the candidate paths share behavior, error semantics, and ownership rather than merely resembling one another.
- For test-support removal, confirm that no behavioral coverage, diagnostic value, or external-effect seam is lost.

With only a diff or snippet, make only claims that the supplied material proves and do not invent repository context. With repository access, inspect beyond the immediate file only when the claim depends on it.

Do not turn missing evidence into a finding. Omit a weak idea or report it as a possible follow-up with the exact evidence needed to decide it.

## Risk

Use risk to describe the impact of making an evidence-supported change, not confidence in an unsupported assumption:

- `low`: behavior preservation is clear and local, with no public contract or compatibility impact
- `medium`: evidence supports the simplification, but verification spans multiple callers, lifecycle behavior, or compatibility-sensitive code

Keep high-risk changes, public contract changes, broad rewrites, module moves, and harness-boundary changes out of findings. Report them only as possible follow-ups when investigation would be valuable. Use a boundary or architecture review when the decision changes what callers must know rather than locally removing maintenance surface.

## Output Contract

Lead with a one-sentence verdict. For each finding, include:

- a concrete file location, diff hunk, or snippet identifier
- one `[<surface>/<action>]` classification
- the proposed simplification and replacement, when applicable
- the evidence that makes it safe
- `low` or `medium` change risk and any material caveat

Include `Kept Complexity` only when explaining a tempting but unsafe simplification would prevent churn. Include `Possible Follow-ups` only for a concrete, valuable investigation, and state the missing evidence.

If no finding is supported, say that no safe simplification was found and whether the existing complexity appears justified or the supplied context is insufficient.

Adapt headings and prose to the user's language and requested response style. Preserve the verdict, evidence, material caveats, and actionable next step before optional detail.
