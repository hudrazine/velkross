---
name: tdd
description: Apply practical test-driven development for adding or changing behavior, fixing bugs with regression tests, refactoring while preserving observable behavior, and code changes that can be driven by examples. Use a small List → Red → Green → Refactor loop, with lightweight variants for UI, integration, database, CLI, file-system, and external-boundary work. Avoid strict TDD for visual-only styling, exploratory spikes, unknown SDK investigation, mechanical migrations, or documentation-only changes unless tests clarify the final behavior.
---

# TDD

Use this skill to implement software through a practical test-driven development loop.

TDD is not merely "write tests first." Treat it as a design and feedback discipline:

> Describe the next observable behavior, prove it is missing with a failing test, implement only enough to satisfy it, then improve the design while tests stay green.

## Core Loop

Use this loop by default:

```text
List → Red → Green → Refactor → Repeat
```

- **List**: Keep a short list of observable behaviors to implement or protect.
- **Red**: Write one focused test that fails because the behavior is missing or wrong.
- **Green**: Make the smallest honest production change that satisfies the test.
- **Refactor**: Improve design only while relevant tests are passing.
- **Repeat**: Return to the list and choose the next smallest behavior deliberately.

## Calibrate the Loop

Choose the lightest loop that still protects the behavior and design decision being made.

- **Strict loop**: Use for domain logic, parsers, validators, formatters, converters, state machines, permission rules, date or money logic, and public API behavior.
- **Regression-first**: For reported bugs, reproduce the bug with a failing test before fixing it whenever practical.
- **Characterization-first**: For refactoring untested code, first capture current observable behavior, then refactor while tests stay green.
- **Lightweight loop**: For UI components, integration boundaries, database access, external API clients, command-line behavior, and file-system behavior, keep the same Red/Green discipline but use the most useful test level and avoid over-isolating framework behavior.
- **Spike then test**: For unknown SDKs or exploratory work, do the smallest useful spike first, then convert the discovered final behavior into tests before treating the implementation as complete.
- **Skip strict TDD unless useful**: For visual-only styling, throwaway spikes, mechanical migrations, or documentation-only changes, use tests only when they clarify behavior or reduce real risk.

If the user asks for a different workflow, follow that request and preserve as much test-driven feedback as still fits.

## Core Rules

### Rule 1: Keep a Test List

Before changing production code, create or infer a short test list.

The test list should describe externally visible behavior, not implementation steps.

Good test-list items:

```text
- accepts a valid email address
- rejects an empty user name
- returns a stable error code for invalid input
- preserves existing metadata when updating a record
```

Bad test-list items:

```text
- add an if statement
- use a regex
- mock the service class
- refactor the parser
```

Keep the list small and update it as new cases are discovered.

### Rule 2: One Behavior Per Cycle

Each TDD cycle should target one observable behavior.

Do not combine multiple behavior changes in one test unless they are inseparable.

Prefer this:

```text
- rejects an empty name
- rejects an invalid email
- creates a user for valid input
```

Avoid this:

```text
- validates input and creates a user correctly
```

### Rule 3: Red Must Fail for the Right Reason

A Red test is valid only if it fails because the intended behavior is missing or wrong.

Invalid Red states include:

- import errors unrelated to the behavior
- syntax errors
- wrong test setup
- missing fixture data
- assertion does not execute
- test passes immediately when it should fail

Before implementing production code, confirm the failure reason.

### Rule 4: Green Means Minimum Useful Implementation

When making a test pass, write the smallest production change that honestly satisfies the current behavior.

Do not implement future cases just because they are obvious.

Allowed during Green:

- straightforward minimal logic
- temporary duplication
- simple hardcoded behavior if the current test is intentionally narrow
- small scaffolding needed to reach the behavior

Not allowed during Green:

- broad abstractions not demanded by tests
- speculative options
- unrelated cleanup
- changing multiple modules without need
- adding features not represented in the test list

### Rule 5: Refactor Only While Green

Refactoring happens only when the relevant tests are passing.

During Refactor:

- do not change observable behavior
- improve names
- remove duplication
- clarify boundaries
- simplify conditionals
- extract functions only when the shape is justified
- improve test readability
- preserve public contracts unless a new Red test requires changing them

If behavior must change, stop refactoring and start a new Red cycle.

### Rule 6: Test Behavior, Not Implementation Details

Tests should describe what the system does from a useful boundary.

Prefer testing:

- returned values
- thrown errors or result objects
- persisted state
- emitted events
- rendered user-visible behavior
- externally visible side effects
- public API contracts

Avoid testing:

- private methods
- internal call order
- incidental intermediate values
- implementation-specific class structure
- mocks of ordinary internal functions
- details that make refactoring harder

### Rule 7: Use Mocks Only at Boundaries

Use mocks, fakes, or stubs for external or unstable dependencies:

- network APIs
- databases
- file systems
- clocks
- random ID generators
- email, SMS, or payment providers
- OS or platform APIs
- third-party SDKs

Avoid mocking ordinary internal functions. If a unit requires excessive mocking, prefer redesigning dependencies so the core behavior is easier to test.

### Rule 8: Capture New Discoveries Without Derailing

When new cases appear during implementation, add them to the test list instead of implementing them immediately.

Examples:

```text
- What should happen for whitespace-only input?
- Should duplicate IDs be rejected?
- Should full-width numbers be accepted?
- Should errors use typed codes instead of messages?
```

Finish the current cycle first, then choose the next item deliberately.

## Workflow

### Step 0: Inspect Existing Conventions

Before writing tests:

1. Identify the language, test framework, package manager, and existing test commands.
2. Inspect nearby tests for naming, fixture, mocking, and assertion style.
3. Follow existing project conventions unless they are clearly broken.
4. Prefer the smallest relevant test command before running broad suites.

Do not introduce a new test framework if the project already has one.

### Step 1: Build the Test List

Create a compact list of observable behaviors.

Use this format internally or in concise progress/final summaries:

```text
Test List
- [ ] behavior A
- [ ] behavior B
- [ ] behavior C
```

Mark completed items as the implementation progresses.

### Step 2: Choose the Next Smallest Behavior

Pick the next item using this priority:

1. regression for a reported bug
2. simplest failing case that clarifies the API
3. most central happy path
4. important boundary case
5. error case
6. integration or edge case

Prefer tests that teach the implementation something new.

### Step 3: Write the Red Test

Add one focused test.

A good test has:

- a name that reads like a specification
- minimal setup
- one main reason to fail
- clear input
- clear expected output
- no dependency on unrelated behavior

Example structure:

```text
given a specific state/input
when the behavior is invoked
then the expected observable result occurs
```

Run the narrowest relevant test command and confirm it fails for the expected reason.

### Step 4: Make It Green

Implement only what is needed for the current test.

During Green:

- prefer simple code over clever code
- keep changes local
- preserve existing behavior
- avoid premature abstraction
- avoid unrelated cleanup
- avoid untested behavior unless required to compile or reach the tested path

Run the same narrow test command again.

The cycle is not Green until the target test passes.

### Step 5: Refactor

With tests passing, improve the design.

Look for:

- duplication
- unclear names
- excessive branching
- mixed responsibilities
- hidden dependencies
- repeated setup in tests
- awkward public API shape
- code that became testable only through implementation details

After refactoring, rerun the relevant tests.

If refactoring breaks a test, either restore behavior or start a new Red cycle if the behavior should change.

### Step 6: Repeat

Return to the test list.

Continue until:

- the requested behavior is complete
- the bug is protected by a regression test
- important edge cases are covered
- remaining cases are explicitly deferred
- relevant tests pass

## Existing Code, Bugs, and Refactors

### Existing Code Without Tests

When modifying untested existing code:

1. First write a characterization test for current behavior if feasible.
2. If the behavior is buggy, write a failing regression test that captures the desired behavior.
3. Make the minimal fix.
4. Refactor only after tests are green.

If the code is too coupled to test directly, first introduce the smallest seam that enables testing. Avoid large rewrites before a test harness exists.

### Bugs

For bug fixes, use this stricter flow:

```text
1. Reproduce the bug with a failing test.
2. Confirm the test fails for the reported reason.
3. Apply the smallest fix.
4. Confirm the regression test passes.
5. Run nearby tests.
6. Refactor only if the tests remain green.
```

Do not fix a bug only by inspection unless no practical test can be written. If no test can be written, explain why and minimize the change.

### Refactoring

For pure refactoring:

1. Find or add characterization coverage around the behavior that must not change.
2. Run tests and establish Green.
3. Refactor in small steps.
4. Run tests after each meaningful step.
5. Do not mix behavior changes into the refactor.

If behavior changes become necessary, stop and start a Red cycle for the new behavior.

## Choosing Test Level

Prefer the lowest test level that gives confidence without coupling to implementation details.

Use unit tests for:

- pure logic
- validation
- parsing
- formatting
- state transitions
- domain rules

Use integration tests for:

- database behavior
- API boundaries
- file-system behavior
- framework wiring
- serialization/deserialization

Use component tests for:

- user-visible UI behavior
- form validation
- interaction state

Use E2E tests sparingly for:

- critical user flows
- cross-system smoke coverage
- behavior that cannot be trusted through lower-level tests

Do not test the same behavior redundantly at every level unless the risk justifies it.

## Designing for Testability

Make behavior testable by separating core logic from effects.

Prefer this shape:

```text
core behavior: pure or mostly pure
dependencies: passed in explicitly
effects: isolated at boundaries
```

Useful injectable dependencies include:

```text
clock
id generator
logger
repository
HTTP client
file system adapter
transaction runner
configuration provider
```

Avoid hiding unstable dependencies inside domain logic.

For example, prefer passing a clock over calling the real system time inside business rules.

## Test Quality and Anti-Patterns

A good TDD test should be behavior-oriented, focused, deterministic, readable, independent, fast enough for frequent execution, specific about the expected result, and resilient to harmless refactoring.

A poor TDD test is usually too broad, too dependent on mocks, too coupled to internals, vague in its assertion, slow without reason, hard to understand, or brittle under refactoring.

Avoid these patterns:

- **Test-after disguise**: Writing production code first and then adding tests afterward is not TDD. Recover by writing the next behavior as a Red test before continuing.
- **Multi-behavior Red**: A single failing test that covers many behaviors makes diagnosis hard. Split it into smaller cases.
- **Green by overbuilding**: Do not implement the whole imagined final design to pass one small test. Let later tests force generalization.
- **Refactor while Red**: Do not restructure code while tests are failing unless the failure is caused by an incomplete mechanical edit. Get back to Green first.
- **Mock-driven internals**: Do not verify internal collaboration details unless they are the meaningful contract. Prefer testing the observable result.
- **Snapshot abuse**: Avoid large snapshots as the main TDD assertion. Use precise assertions for behavior. Snapshots are acceptable only when they are small, intentional, and reviewed.
- **Coverage theater**: Do not add tests only to increase coverage numbers. A useful test protects behavior or design intent.

## Working Protocol

Before editing, establish:

```text
- target behavior
- existing test framework
- likely test file location
- narrow test command
- initial test list
```

If the repository conventions are discoverable, follow them without asking.

During editing:

- work in small cycles
- track the current test-list item, Red result, Green change, refactor, and test result internally
- do not report every cycle unless the user asks for a detailed TDD trace or the work is long enough that concise progress updates are useful
- avoid large unrelated changes

If tests cannot be run, say so clearly and provide the exact command that should be run.

## Final Summary

When finishing a task, include:

1. what behavior was implemented or fixed
2. what tests were added or changed
3. which test commands were run
4. whether the relevant tests passed
5. any remaining cases, risks, or untested areas intentionally left out

Keep the summary concise but specific.

Before finalizing, verify:

```text
[ ] A test list exists or was inferred.
[ ] Each implemented behavior had a focused test when practical.
[ ] At least one relevant test failed before the implementation when practical.
[ ] Red failed for the expected reason.
[ ] Green used the smallest useful implementation.
[ ] Refactoring happened only while tests were green.
[ ] Tests describe behavior instead of implementation details.
[ ] Mocks are limited to external boundaries.
[ ] New discoveries were added to the test list instead of derailing the cycle.
[ ] Relevant tests were run or the reason they could not run is documented.
```

## Final Principle

The goal is not to maximize the number of tests.

The goal is to make every small design decision safe, observable, and reversible.

Prefer small steps, clear behavior, fast feedback, and continuous cleanup.
