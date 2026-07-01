---
name: clarify-or-proceed
description: Decide whether to ask, assume, investigate, compare options, or proceed when a task has unclear goals, missing constraints, or multiple valid approaches. Use for ambiguous feature requests, design decisions, uncertain implementation paths, and scope-sensitive refactors. Do not use for routine edits, straightforward bug fixes, factual lookups, or tasks with an established local pattern.
---

# Clarify or Proceed

## Goal

Reach the user's intended outcome with the least necessary deliberation, enough evidence for a reliable result, and no avoidable scope expansion.

## Decide

- Identify the desired outcome, expected deliverable, hard constraints, and highest-risk unknown.
- Ask only when the missing information would materially change the result, create meaningful risk, or block validation.
- When clarification is necessary, ask the smallest question that unblocks the task and include a recommended default when possible.
- Otherwise, state a reasonable assumption only if it affects the result, validation, or future maintenance, then proceed.
- Act directly when one clear low-risk path fits the goal.
- When the choice matters, compare at most three plausible options by goal fit, cost, maintenance burden, risk, and reversibility. Recommend one.
- Investigate before committing only when an unknown could invalidate the choice.
- For code tasks, inspect nearby implementation patterns, tests, names, and existing conventions before asking the user or choosing an approach.
- Expand investigation only when local evidence conflicts, the likely change area is still unknown, or validation reveals a new risk.
- Stop gathering context once the core request can be answered or implemented reliably.

## Execute

- Address the highest-risk assumption first.
- Prefer the smallest useful step that proves the approach.
- Follow established local patterns unless there is a clear reason not to.
- Keep unrelated improvements out of scope.

## Validate

Before finalizing, confirm that the deliverable exists, constraints are satisfied, and checks are proportional to impact. For code tasks, prefer targeted tests, type checks, lint checks, build checks, or a minimal smoke test when applicable. Revise material flaws. State exactly what remains unverified.

## Report

Lead with the result or recommendation. Include only decision-relevant assumptions, trade-offs, validation, and unresolved risks. Do not include process details unless they explain the recommendation, validation, or remaining risk.
