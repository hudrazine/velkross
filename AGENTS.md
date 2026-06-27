# Repository Instructions

Guidance for AI coding agents working in this repository.

## Mergeability-first Engineering

Deliver code that is ready to review and merge, not merely code that appears to work.

### Durable change

- Prefer the smallest durable change, not the smallest diff. Durable means the change preserves or improves correctness, maintainability, type safety, and architectural boundaries. A tiny patch in the wrong layer is not durable; it is future rework.
- Stay within the requested scope. Improve code directly touched by the task when it improves correctness or maintainability, but avoid broad rewrites, unrelated cleanup, dependency changes, public API changes, compatibility layers, or formatting-only churn unless explicitly requested.
- Prefer deletion over addition, boring over clever, and fewer moving parts over more. Keep changes local when that preserves the existing architecture, but do not put logic in the wrong layer merely to reduce file count.
- Prefer the smallest obvious implementation. Do not compress code into clever one-liners when named intermediate steps are easier to read, type-check, test, or debug.

### Reuse and local consistency

- Existing implementation patterns are part of the design. Match the local approach for the same kind of behavior, including domain models, utilities, naming, test style, and error conventions. Do not introduce a new pattern unless the existing one is clearly insufficient; if you do, make the reason explicit.
- New code must justify itself against this ladder:

  1. Is this behavior necessary for the requested scope, or is it YAGNI?
  2. Does the codebase already provide a helper, utility, domain model, pattern, or convention for it?
  3. Does the standard library already cover it?
  4. Does a native platform feature cover it?
  5. Does an approved dependency already used by the project cover it without adding inappropriate coupling?
  6. Only then, add the minimum durable implementation.

### Boundaries, types, and state

- Do not weaken type safety to make the implementation easier. Avoid language-specific escape hatches such as `any`, unsafe casts, non-null assertions, unchecked assumptions, duplicated logic, silent fallbacks, and boolean state flags that create unclear combinations. Prefer explicit domain types, narrow interfaces, validated inputs at boundaries, and state models that make invalid states hard to represent.
- Keep domain logic, I/O, state management, and presentation concerns separated. Isolate side effects at clear boundaries. Do not pass infrastructure details through layers that should remain domain-focused.
- Prefer explicit constraints over implicit assumptions. When an implementation depends on a limit, invariant, ordering guarantee, lifecycle assumption, ownership rule, or environmental assumption, make that constraint visible in the type, API, validation, or a short nearby comment.

### Root causes and error semantics

- For bug fixes, treat the report as a symptom, not the diagnosis. Fix the shared root cause rather than adding path-specific guards that leave equivalent callers broken.
- Preserve error semantics. Do not swallow errors, add silent fallback behavior, or convert failures into ambiguous states unless that behavior is part of the behavioral contract.
- Do not be "lazy" about validation at trust boundaries, data-loss prevention, security, accessibility where applicable, or behavior explicitly required by the task.

### Intentional simplification

- Simple implementations are preferred when they preserve the behavioral contract and architectural boundaries.
- Intentional simplifications must have a clear ceiling. Name the constraint, why it is acceptable now, and the upgrade path if the constraint stops holding.
- Avoid speculative abstraction. Add an abstraction only when it removes real duplication, clarifies a domain concept, isolates a real boundary, or makes future required change safer.

### Testability and verification

- Tests should prove behavior, not implementation details. When behavior changes, add or update focused tests for the observable contract, including plausible edge cases and failure paths. Non-trivial logic should leave behind at least one runnable check that would fail if the logic regresses.
- Do not remove or weaken tests unless the behavior contract changed intentionally.
- Changes should be practically verifiable. Prefer designs that can be checked with focused behavior tests and broader project-level checks when risk warrants them.

## Git

- Format commit messages as Conventional Commits: `<type>(<scope>): <summary>`.
- Keep commit messages concise and searchable.
- Include the reason for a change in the commit body when useful.

## Issues and Pull Requests

- Format PR titles like commit messages so they are suitable for final squash commit titles.
- Keep issues and pull requests concise and searchable.
- Briefly summarize the main changes in PR descriptions and include the reason when useful.
- Add issue references, screenshots, test notes, and breaking-change notes only when relevant.
