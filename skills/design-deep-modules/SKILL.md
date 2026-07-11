---
name: design-deep-modules
description: Design, review, reshape, or incrementally migrate module, service, package, API, slice, port, or adapter boundaries using the Deep Modules lens. Use when deciding what callers should know, which design decisions a boundary should hide, whether a boundary should be preserved, deepened, merged, split, or delayed, how dependencies should point, or how to enforce and test a stable public contract. Avoid for deployment-topology decisions alone, general code review, pure simplification with no boundary concern, tiny local fixes, visual-only work, or documentation that does not define architecture or public contracts.
---

# Design Deep Modules

## Objective

Design or reshape a cohesive boundary so callers rely on a small, stable contract while the module owns meaningful functionality, policy, coordination, validation, dependency handling, and change-prone decisions.

Treat review as input to a boundary decision, not as a search for more abstractions. Recommend the smallest durable change supported by evidence.

## Depth Standard

Optimize for depth, not size.

Judge the interface by the total knowledge required to use it correctly, including:

- operations, types, events, options, and configuration
- preconditions, side effects, failure semantics, and consistency guarantees
- ordering, lifecycle, ownership, cleanup, and compatibility expectations
- internal concepts or call sequences callers must reconstruct

Judge the implementation by the useful, cohesive knowledge it hides. Count domain rules, workflows, algorithms, state transitions, integration differences, validation, authorization, retries, transactions, caching, observability, and recovery behavior as depth when they belong to the same abstraction.

Require both depth and cohesion. Do not treat a small interface as justification for a god module, or a large file as proof that a boundary should be split.

Do not confuse a deep module with a deployment topology. Apply the lens within a process, package, library, plugin, or service boundary without using it alone to justify distribution or independent deployment.

Generalize only when current callers, repeated use, or a demonstrated change axis supports it. Prefer a focused boundary over a speculative universal interface.

## Task Modes

Choose the mode that matches the requested outcome, then use the shared workflow.

- **Design:** define a new boundary or a target design.
- **Review:** assess an existing boundary, code change, or proposal and identify supported boundary changes.
- **Migrate:** move existing callers and dependencies toward a target boundary without requiring a broad rewrite.

## Shared Workflow

### 1. Inspect The Evidence

Identify the candidate boundary, its callers, supported workflows, public entry points, and compatibility surfaces. Inspect repository documentation, exports, call sites, dependency direction, tests, and change history when they can answer the design question.

Distinguish observed behavior from assumptions. Do not infer a public contract from naming or file layout alone.

### 2. Map Interface Burden And Hidden Knowledge

List what each caller must know or coordinate. Include informal contract knowledge, not only public symbols.

List the decisions the module owns or should own. Group decisions that change for the same reason, and separate decisions with independent change axes.

Ask:

- What should callers be able to forget after crossing this boundary?
- Which workflow, rule, or integration detail becomes private?
- Does the interface express caller intent or expose implementation steps?
- Do callers repeat sequencing, branching, validation, mapping, retries, transactions, cache invalidation, or cleanup?
- Do framework, transport, persistence, UI, or vendor types leak into policy that should outlive them?
- Are safety-relevant consequences visible even when their mechanics are hidden?

### 3. Choose A Boundary Move

Choose one primary move. Combine moves only when the evidence shows distinct boundary problems.

| Move       | Choose when                                                                                                                                            | Required result                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `preserve` | Existing complexity protects a contract, policy, dependency direction, external-effect seam, compatibility promise, diagnostics, or recovery behavior. | Keep the protected knowledge and explain why callers benefit from the boundary.               |
| `deepen`   | Callers reconstruct workflow or internal decisions, the public surface is unstable, or infrastructure details leak outward.                            | Move coherent knowledge inward and expose intent-level operations with explicit consequences. |
| `merge`    | A layer, wrapper, service, or interface mostly passes through calls and owns no distinct abstraction or contract.                                      | Remove ceremony while preserving any real translation, policy, or compatibility behavior.     |
| `split`    | Internals have low cohesion, unrelated change axes, conflicting ownership, or independently evolving policies despite a small public surface.          | Create cohesive boundaries without making callers orchestrate the separated internals.        |
| `delay`    | The change axis, caller need, alternative implementation, or stable contract is not yet demonstrated.                                                  | Keep the design focused and record the evidence that would justify a future abstraction.      |

Reject changes that merely move code, rename layers, add an interface for hypothetical variation, or reduce file count without reducing caller knowledge or protecting a real decision.

### 4. Define The Boundary Contract

Define:

- callers and caller-intent operations
- formal and informal interface contract
- hidden decisions and internal responsibilities
- boundary data free of avoidable outer-framework or vendor coupling
- dependency direction and ownership of abstractions
- compatibility surfaces and error semantics
- non-goals and intentionally visible consequences

Point dependencies toward stable policy and away from replaceable details. Let the policy owner define an abstraction only when inversion protects a real boundary, test seam, or compatibility promise.

### 5. Make The Boundary Enforceable

Use the strongest practical mechanism already supported by the language, build, or repository: visibility controls, explicit exports, package rules, dependency constraints, architecture tests, lint rules, or focused review conventions.

Prefer machine-enforced restrictions when the repository can support them. Do not propose a new dependency or governance layer when an existing mechanism can express the contract.

### 6. Verify The Result

Match verification to the boundary contract:

- test hidden rules and state transitions through focused behavioral checks
- test adapters at the external boundary they translate
- test shared public contracts across independently changing consumers and providers
- check forbidden dependencies, private imports, cycles, and exported surfaces when they are part of the design
- compare representative callers before and after; confirm they know less and perform less choreography
- confirm internal changes along the intended change axis can preserve the public contract

Avoid over-mocking internal collaboration. Fake or mock unstable external effects only when needed to verify policy separately from infrastructure.

## Incremental Migration

For Migration mode:

1. Visualize current callers, dependency violations, and high-cost change paths.
2. Define the target public entry point and compatibility expectations.
3. Prevent new violations when practical without requiring the existing baseline to be clean first.
4. Introduce the target path and move callers in small, behavior-preserving slices.
5. Keep temporary adapters, abstractions, or toggles explicit, owned, and removable.
6. Remove direct internal access, obsolete entry points, temporary machinery, and dead implementations after migration.
7. Strengthen enforcement only as the migrated boundary becomes authoritative.

Do not propose a big-bang rewrite when a compatible incremental path can establish the same boundary. Do not leave migration scaffolding as an accidental permanent API.

## Uncertainty And Stop Conditions

State assumptions and offer compatible alternatives when missing evidence does not prevent a useful recommendation.

Ask a targeted question before selecting or implementing a boundary change only when the answer materially affects:

- supported callers or compatibility promises
- safety, authorization, consistency, durability, or data-loss semantics
- ownership or dependency direction
- whether complexity is shallow ceremony or protected depth

Report an investigation as a follow-up instead of a finding when evidence does not prove the problem. Preserve existing observable behavior unless the requested outcome explicitly changes the contract.

## Output Contract

Adapt the response to the task and omit empty sections. Include:

```text
Verdict: <one-sentence boundary decision>

Evidence:
- <specific caller, contract, dependency, or change-axis evidence>

Boundary:
- Move: <preserve|deepen|merge|split|delay>
- Callers:
- Interface contract:
- Hidden decisions:
- Dependency direction:
- Enforcement:

Migration: <only when needed>
Verification: <observable checks>
Risks or unknowns: <material caveat and mitigation or needed evidence>
Next action: <smallest useful next step>
```

For code review, attach each finding to a concrete location and explain the caller impact. For a short response, preserve the verdict, strongest evidence, material caveat, and next action; remove repetition and optional background first.
