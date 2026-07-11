---
name: tdd
description: Apply practical, language-agnostic test-driven development when implementing observable behavior, reproducing and fixing bugs, or changing untested code where executable examples can guide the design. Use a small List → Red → Green → Refactor loop, with regression-first, characterization-first, refactoring, and spike-then-test variants. Do not use strict TDD for visual-only styling, exploratory work before behavior is understood, mechanical migrations, or documentation-only changes unless tests clarify a real contract or risk.
---

# TDD

Implement software through short feedback loops that make each behavior and design decision observable.

```text
List → Red → Green → Refactor → Repeat
```

Treat this as a design discipline, not merely a requirement to write tests first. Preserve the user's requested workflow and apply the strongest test-driven feedback that fits the task.

## Choose the Operating Mode

Choose the mode before editing production code.

- **Behavior change**: Use the full List → Red → Green → Refactor loop.
- **Bug fix**: Reproduce the reported failure with a regression test, then make the smallest fix.
- **Untested existing code**: Capture relevant current behavior with a characterization test, then add a failing test for the desired change.
- **Pure refactoring**: Establish relevant Green coverage and refactor in small steps. Do not manufacture a failing test when observable behavior must not change.
- **Exploration**: Run the smallest useful spike when an SDK, algorithm, or external behavior is unknown. Keep or discard the spike deliberately, then test the stable behavior before treating production work as complete.
- **Non-behavioral work**: Skip strict TDD for visual-only styling, mechanical migrations, generated output, and documentation-only changes unless an executable check protects a real contract or risk.

## Prepare

Before starting a cycle:

1. Identify the target behavior and useful observation boundary.
2. Inspect nearby code and tests for the established framework, naming, fixtures, doubles, and commands.
3. Run the narrowest relevant existing tests to establish a known baseline.
4. Create or infer a short test list of observable behaviors, including important boundaries and failures.
5. Choose the smallest next example that will clarify the contract or force useful generalization.

Do not introduce a new test framework when the repository already provides a practical one.

If the baseline is already failing, separate pre-existing failures from failures introduced by the change. Continue only when the relevant behavior can still be isolated and verified; never report a pre-existing failure as a new Red or Green result.

Write test-list items as behavior:

```text
- accepts a valid identifier
- rejects an empty identifier with a stable error code
- preserves metadata when updating a record
```

Do not write implementation tasks such as “add an if statement,” “use a regex,” or “mock the service.” Add discoveries to the list instead of expanding the current cycle.

## Run the Cycle

### Red: Prove the Behavior Is Missing

Write one focused executable example with one primary reason to fail. Multiple assertions are acceptable when they describe one coherent observable result.

Prefer tests with:

- a specification-like name
- minimal relevant setup
- explicit input and expected outcome
- assertions on public behavior or meaningful side effects
- failure output that explains the unmet contract

Run the narrowest relevant command and inspect the failure. Proceed only when it fails because the behavior is missing or wrong, not because of syntax, imports, setup, fixtures, or an assertion that never ran.

If the test passes immediately, do not force a Red by damaging working code. Determine whether the test is weak, the behavior already exists, or the reproduction conditions are incomplete. Strengthen the test, mark the behavior complete, or investigate the missing precondition as appropriate.

### Green: Satisfy the Current Contract

Make the smallest honest production change that satisfies the current example and preserves established behavior.

During Green:

- keep the change local and straightforward
- avoid unrelated cleanup and speculative options
- tolerate temporary duplication when it keeps the step small
- add only scaffolding required to reach the tested behavior
- run the focused test, then relevant nearby tests

A narrow hardcoded implementation may be used as a temporary TDD step when the current example intentionally leaves the general rule unknown. Add the next example that forces generalization. Do not finish with a hardcoded special case when the known contract is broader.

### Refactor: Improve Structure While Green

Improve production and test code only while the relevant tests pass.

Use the Green state to:

- clarify names and boundaries
- remove meaningful duplication
- simplify branching and state
- separate decisions from effects
- improve test readability and setup
- delete premature or obsolete abstractions

Do not change observable behavior during Refactor. If a behavior change becomes necessary, return to the test list and begin a new Red cycle.

### Repeat Deliberately

Mark the completed item, record new discoveries, and choose the next example. Prefer this progression when it teaches the design something useful:

1. regression for a reported bug
2. simplest representative behavior
3. a second example that defeats a special-case implementation
4. important boundary or failure
5. state transition or integration edge

Do not code every imagined case in advance. Stop when the requested contract is implemented, material risks have proportionate coverage, and remaining gaps are explicit.

## Choose the Test Boundary

Choose the narrowest boundary that observes the real behavior with fast, stable, maintainable feedback. Do not default mechanically to the smallest function or to end-to-end testing.

- Use **unit tests** for pure rules, parsing, validation, formatting, and state transitions.
- Use **integration tests** for persistence semantics, transactions, serialization, file systems, framework wiring, and external adapters.
- Use **component tests** for rendered UI behavior and interaction state.
- Use **end-to-end tests** sparingly for critical flows or contracts that lower levels cannot establish confidently.

Avoid duplicating the same assertion at every level unless the risk justifies it.

Test observable outcomes such as returned values, errors, persisted state, emitted events, rendered behavior, and meaningful side effects. Avoid private methods, incidental call order, internal structure, and intermediate values unless that interaction is itself the contract.

Use mocks, fakes, or stubs at slow, unstable, nondeterministic, destructive, or externally controlled boundaries. Prefer real collaborators when they are fast and reliable. Excessive internal mocking usually signals the wrong observation boundary or a dependency that should be made explicit.

Keep tests repeatable and independent. Control relevant clocks, randomness, identifiers, time zones, environment, shared state, network access, and concurrency. Introduce the smallest seam needed for control; do not begin with a broad rewrite merely to make code testable.

Use precise assertions by default. Keep snapshots small and intentional. Use coverage to find unexamined risk, not as a substitute for meaningful behavioral evidence.

## Handle Verification Limits

When a practical automated test cannot be written or run:

1. Explain the concrete limitation.
2. Perform the strongest available deterministic check.
3. Keep the production change as small as possible.
4. Provide the exact test or command that should be run later when known.
5. Report the remaining verification gap without presenting the work as fully proven.

Do not silently skip, disable, weaken, or rewrite an effective test merely to obtain Green. Change a test's expectation only when the intended contract changed.

## Completion Contract

Finish only when:

- the requested observable behavior is implemented
- bug fixes have regression coverage when practical
- relevant focused tests pass
- broader checks have been run in proportion to the affected boundary and risk
- refactoring has preserved Green
- no temporary special case violates the known contract
- deferred cases and verification gaps are explicit

Report concisely:

1. the behavior implemented, fixed, or preserved
2. the tests added or changed
3. the commands run and their results
4. any intentionally deferred case, remaining risk, or untested area

The goal is not maximal test count or coverage. Use small executable examples to reach a correct, maintainable change with credible evidence.
