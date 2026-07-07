# Mergeability-first Engineering

Deliver code that is ready to review and merge, not merely code that appears to work.

These are standing engineering principles, not a step-by-step workflow. Apply them whenever making implementation decisions.

Use these rules as the shared engineering center of gravity for implementation decisions. Optimize for correctness, maintainability, explicit contracts, architectural fit, and practical verifiability.

## Core standard

- Prefer the smallest durable change, not the smallest diff. A durable change preserves or improves correctness, maintainability, type safety, behavioral contracts, and architectural boundaries.
- Small is good only when the change is made in the right layer and preserves the existing contract. A tiny patch in the wrong place is future rework.
- When principles conflict, preserve correctness, explicit contracts, type safety, architectural boundaries, and practical verifiability before optimizing for convenience, diff size, or local cleanup.
- Leave code easy for a human reviewer to understand. Express intent through names, types, structure, and focused tests. Add short nearby comments only for non-obvious constraints, invariants, or tradeoffs.

## Change scope and durability

- Stay within the requested scope. Fix or improve code directly touched by the task when it materially improves correctness, maintainability, or clarity.
- Treat broad rewrites, unrelated cleanup, dependency changes, public API changes, compatibility layers, formatting-only churn, and large structural moves as high-cost choices, not forbidden moves. Use them only when required for correctness, architectural fit, or the requested behavior.
- Prefer deletion over addition, boring over clever, and fewer moving parts over more.
- Keep changes local when that fits the existing architecture. Do not place logic in the wrong layer merely to reduce file count or diff size.
- Prefer the smallest obvious implementation. Do not compress code into clever one-liners when named intermediate steps are easier to read, type-check, test, or debug.

## Existing design and reuse

- Existing implementation patterns are part of the design. Match the local approach for the same kind of behavior, including domain models, utilities, naming, state management, error conventions, and test style.
- Do not introduce a new pattern merely because it seems cleaner in isolation. Introduce a new pattern only when the existing one is clearly insufficient or actively harmful for the requested change, and make the reason visible through naming, structure, tests, or a short nearby comment.
- Before adding new implementation, confirm that the behavior is required by the requested scope and is not already covered by directly relevant existing patterns, project models, helpers, utilities, conventions, standard/runtime/platform capabilities, already-adopted framework features, or approved dependencies. Add only the minimum durable implementation that remains after those checks.
- Avoid duplicating existing domain logic, validation rules, error mapping, serialization, state transitions, or formatting conventions unless the existing abstraction is clearly the wrong fit.

## Boundaries, contracts, types, and state

- Do not weaken contracts or type safety to make implementation easier. Avoid unsafe escape hatches, unchecked assumptions, overly broad types, silent coercion, and assertions that merely suppress uncertainty.
- When modeling inputs, outputs, or state-related behavior, make invalid states hard to represent. Prefer explicit domain types, narrow interfaces, validated inputs at boundaries, and state models with clear allowed transitions.
- Avoid boolean flag combinations that create unclear or impossible states. Prefer named states, structured variants, or explicit lifecycle models when behavior depends on state.
- Keep domain logic, I/O, persistence, state management, and presentation concerns separated. Isolate side effects at clear boundaries.
- Do not pass infrastructure details through layers that should remain domain-focused.
- Preserve observable behavior, public APIs, and data contracts unless the task explicitly changes them. This includes API shapes, persistence formats, lifecycle assumptions, ordering guarantees, ownership rules, error behavior, and user-visible behavior.
- Prefer explicit constraints over implicit assumptions. When code depends on a limit, invariant, ordering guarantee, lifecycle rule, ownership rule, or environmental assumption, make that constraint visible in the type, API, validation, or a short nearby comment.

## Root causes, errors, and required safeguards

- For bug fixes, treat the report as a symptom, not the diagnosis. Find and fix the shared root cause rather than adding path-specific guards that leave equivalent callers broken.
- Preserve error semantics. Do not swallow errors, hide failures behind default values, add silent fallback behavior, or convert failures into ambiguous states unless that behavior is part of the existing contract.
- If fallback behavior is required, make its trigger, scope, and observable result explicit.
- Treat validation at trust boundaries, data-loss prevention, security, accessibility where applicable, and explicitly required behavior as correctness requirements, not optional polish.
- Do not introduce behavior that makes failures harder to detect, debug, test, or recover from.

## Simplicity and abstraction

- Prefer simple implementations when they preserve the behavioral contract and architectural boundaries.
- Avoid speculative abstraction. Add an abstraction only when it removes real duplication, clarifies a domain concept, isolates a real boundary, or makes a known required change safer.
- Do not add configuration surfaces, adapters, compatibility layers, generic frameworks, or extension points for hypothetical future needs.
- When an intentional simplification creates a non-obvious ceiling for behavior, scalability, or compatibility, name the constraint, why it is acceptable now, and the upgrade path if the constraint stops holding.
- Simplicity must not come from ignoring edge cases, weakening validation, collapsing distinct states, or moving responsibility into the wrong layer.

## Verification and reviewability

- Tests should prove observable behavior, not implementation details.
- When behavior changes, add or update focused tests for the contract being changed, including plausible edge cases and failure paths.
- Non-trivial logic should leave behind at least one runnable check that would fail if the logic regresses.
- Do not remove, skip, or weaken tests unless the behavior contract changed intentionally.
- Use proportionate verification. Prefer focused behavior tests for local logic and broader project-level checks when integration risk, persistence, concurrency, security, or user-visible behavior warrants it.
- A change is not merge-ready merely because the happy path works. It should be understandable, scoped, consistent with the existing design, safe at boundaries, and practically verifiable.
