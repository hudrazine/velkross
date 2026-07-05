---
name: design-deep-modules
description: Design, reshape, or review module, service, package, API, slice, port, or adapter boundaries using the Deep Modules lens. Use when deciding what a boundary should hide, designing a stable public interface, reducing shallow/pass-through services, separating domain/application policy from infrastructure or framework details, evaluating dependency direction, or planning boundary-focused tests. Avoid for general code review, pure simplification with no boundary/API concern, tiny local bug fixes, visual-only work, or documentation-only tasks that do not define architecture or public contracts.
---

# Design Deep Modules

## Purpose

Design, reshape, or evaluate software boundaries so a small stable interface hides meaningful functionality, policy, coordination, validation, dependency handling, and change-prone design decisions.

Treat review as a path back into design: identify where a boundary is shallow, leaky, or misplaced, then recommend the smallest durable boundary change.

## Core Standard

Optimize for depth, not size.

A deep module exposes a small, coherent public surface while hiding substantial useful knowledge. A shallow module forces callers to learn nearly as much as the implementation knows.

Prefer a boundary when it hides a real decision:

- domain invariant, policy, or workflow
- sequencing, transaction, retry, idempotency, cache, or event ordering rule
- validation, authorization, consistency, or error semantics
- external system, framework, ORM, storage, transport, or vendor detail
- algorithm, performance strategy, normalization, parsing, or state transition
- change axis that should evolve without forcing unrelated callers to change

Do not create a boundary only because a file is large, a class can be split, an interface seems tidy, or a future variation is imaginable.

## Entry Paths

Choose the path from the input state, then keep using the shared lenses and checks.

### Design Path

Use this path for new modules, APIs, services, packages, slices, ports, adapters, or refactor plans.

1. Identify the caller task and the change axis.
2. Name the knowledge the boundary should hide.
3. Decide the public surface before the internal structure.
4. Prefer operations named for user/domain intent, not implementation steps.
5. Keep boundary-crossing data simple and free of outer framework, transport, ORM, database row, UI, or vendor-specific types.
6. Point dependencies toward stable policy and away from replaceable details.
7. Decide which tests protect the internal behavior and which tests protect the boundary.
8. State non-goals so the boundary does not become a speculative abstraction.

### Review Path

Use this path for existing code, diffs, snippets, or design proposals.

1. Identify the candidate boundary and its callers.
2. List the actual public surface: exports, public methods, endpoints, events, options, configuration, or documented entry points.
3. Infer the hidden knowledge: rules, sequencing, data access, effects, failure handling, dependency policy, or compatibility promise.
4. Check whether callers still repeat internal ordering, branching, validation, mapping, cache, transaction, or integration details.
5. Check whether inner code depends on outer framework, persistence, transport, UI, or vendor types.
6. Distinguish shallow complexity from protected depth before recommending changes.
7. Recommend the smallest durable redesign, not a broad rewrite.

## Design Lenses

Apply these questions while designing or reviewing:

- What should a caller be able to forget after this boundary exists?
- What concrete design decision becomes private?
- Which code changes for the same reason, and which code changes for a different reason?
- Does the public API describe intent, or does it expose internal steps?
- Can common caller workflows happen through one coherent operation instead of repeated call choreography?
- Are special cases handled inside the module when they are part of the hidden knowledge?
- Are safety-relevant semantics visible enough for callers to make correct decisions?
- Does the boundary reduce coupling without adding empty ceremony?
- Can the boundary be enforced by language, package exports, project references, lint rules, architecture tests, or review conventions?
- Would a future internal implementation change preserve the public contract?

## Red Flags

Report these only when supported by evidence:

- `pass-through`: methods, services, layers, or adapters mostly forward calls without adding policy, translation, validation, orchestration, or a stable abstraction
- `classitis`: many tiny modules increase navigation while hiding little useful knowledge
- `false-abstraction`: the API hides safety, authorization, durability, consistency, failure, or ordering semantics that callers must understand
- `leaky-boundary`: framework, HTTP, ORM, database row, storage, transport, UI, or vendor details cross into domain or application policy
- `empty-interface`: an interface or port exists before there is a meaningful alternative, dependency inversion need, test seam, package boundary, or compatibility promise
- `unstable-public-api`: too many exports, flags, overloads, options, or special cases become public contract
- `wrong-axis`: code is split by technical layer or file shape when changes actually happen by feature, use case, domain concept, or integration boundary
- `cycle`: package, slice, or layer cycles make the intended boundary unenforceable
- `caller-choreography`: callers must remember internal ordering, branching, retries, cache invalidation, transaction scope, mapping, or cleanup
- `over-generalized-api`: generic operations push domain workflow reconstruction back to callers

## Protected Depth

Do not flatten or delete complexity that protects:

- domain invariants
- validation and error semantics
- authorization, consistency, transaction, retry, idempotency, cache, or event ordering rules
- compatibility of a documented or exported public API
- adapter, harness, plugin, or integration boundaries
- testability of external effects
- separation between domain/application policy and infrastructure details
- observability, diagnostics, or recovery behavior needed at the boundary

If complexity may protect one of these but the evidence is incomplete, ask a targeted question or list a follow-up instead of making a finding.

## Test Strategy

Match tests to the boundary being designed or changed.

- Use unit tests for hidden domain rules, state transitions, validators, parsers, normalizers, algorithms, and policy decisions.
- Use narrow integration tests for adapters that bind ports to databases, queues, HTTP clients, file systems, framework wiring, or third-party SDKs.
- Use contract tests for service, package, message, or API boundaries shared across independently changing consumers and providers.
- Use property-based tests when the module promises invariants across broad input spaces.
- Use architecture tests, lint rules, package export checks, or dependency graph checks when boundary direction, cycles, or private imports are part of the contract.

Avoid over-mocking internal collaboration. Mock or fake unstable external boundaries, clocks, ID generators, network calls, databases, filesystems, and third-party providers.

## Output Shapes

Choose the output shape that matches the task. Keep recommendations concrete and reviewable.

### Design Output

Use this shape for design and refactor planning:

```text
Verdict: <one-sentence design direction>

Boundary:
- Name:
- Callers:
- Hidden knowledge:
- Public surface:
- Internal responsibilities:
- Dependencies:
- Boundary data:
- Tests:
- Non-goals:

Risks:
- <risk and mitigation>
```

### Review Output

Use this shape for code, diff, snippet, or design review:

```text
Verdict: <one-sentence depth assessment>

Findings:
- <location> [<red-flag>] <problem>. Recommendation: <small durable redesign>. Evidence: <specific evidence>. Risk: <low|medium|high>.

Protected Depth:
- <location> Keep this complexity. Reason: <protected design knowledge or boundary contract>.

Possible Follow-ups:
- <location or boundary> <investigation>. Needs: <missing evidence>.

Final:
<short summary of the boundary direction>
```

Omit empty sections except `Verdict` and `Final`.

## Decision Rules

Prefer local boundary improvements when they preserve public contracts and caller behavior.

Do not recommend a new abstraction unless it hides real knowledge, removes caller choreography, isolates a real dependency boundary, or matches an established local pattern.

Do not recommend collapsing a boundary only because its implementation is short. First check whether it protects a contract, dependency direction, test seam, or change axis.

Do not move logic across layers to reduce file count if doing so leaks infrastructure details into policy or forces callers to learn internal sequencing.

Treat public APIs, package exports, adapter contracts, persistence formats, message shapes, and documented extension points as compatibility surfaces unless the task explicitly changes them.

## Stop Conditions

Ask a targeted question before recommending a boundary change when:

- supported callers or compatibility promises are unknown
- the public API might need to change
- safety, authorization, consistency, durability, or data-loss semantics are unclear
- the evidence cannot distinguish shallow ceremony from protected depth

Stop at a possible follow-up instead of a finding when the available code or design note does not prove the problem.
