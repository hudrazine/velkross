---
name: agent-skill-design
description: "Design, review, or refine the behavioral substance of Agent Skills: decide whether a repeated task belongs in a Skill, define its responsibility, invocation and non-invocation conditions, degree of freedom, tool and resource boundaries, failure handling, and evaluation cases. Use when turning workflows or guidance into a Skill design or correcting a Skill that is vague, broad, unsafe, hard to invoke, or difficult to evaluate. Do not use for platform-specific packaging, manifests, file templates, installation, or authoring-spec compliance."
---

# Agent Skill Design

## Purpose

Design Agent Skills as selectable behavior modules for recurring task classes.

Focus on what the agent should do differently, when that behavior should apply, where its responsibility ends, and how to tell whether it helped. Defer packaging, file layout, metadata syntax, templates, installation, and platform-specific validation to the applicable authoring skill or specification.

## Core Criterion

Create or retain a Skill only when it improves observable agent behavior for a recognizable, recurring task class.

Do not use a Skill merely to preserve information, repeat universal rules, or restate behavior the model already performs reliably. Require a concrete answer to all of these questions:

- What recurring task does the Skill improve?
- What observed or credible failure does it prevent?
- What should the agent do differently because the Skill exists?
- When should and should not that behavior activate?
- What evidence would show an improvement over the current baseline?

If the behavioral difference or evidence cannot be stated, gather examples or keep the content outside a Skill until the need is clearer.

## Design Procedure

### 1. Establish Evidence And Baseline

Start from representative tasks, artifacts, feedback, traces, or observed failures. Distinguish observed problems from hypotheses.

Record:

- representative requests that expose the need
- how the agent behaves without the Skill
- the failure, waste, risk, or inconsistency to reduce
- the observable behavior or outcome that should improve
- constraints that must remain unchanged

Do not design from generic virtues such as accuracy, safety, or helpfulness alone. Translate them into task-specific decisions and checks.

### 2. Choose The Responsible Mechanism

Place each concern in the mechanism that can own it reliably.

- **Skill:** Use when conditional guidance should change model behavior for a recurring, recognizable task class.
- **Tool or script:** Use when execution, computation, validation, or side effects should be deterministic and repeatable.
- **Documentation:** Use when the content mainly preserves explanations, background, decisions, or reference knowledge.
- **Policy:** Use when a rule must apply regardless of whether a Skill is invoked.
- **General instruction:** Use when behavior applies across most tasks and should always remain in context.
- **Memory:** Use when user-specific or project-specific context should persist across tasks.
- **Authoring guidance:** Use when the concern is packaging, metadata syntax, file layout, templates, installation, or platform compatibility.

Prefer the simpler owner. Use a Skill to coordinate other mechanisms only when model judgment is necessary to select or sequence them.

### 3. Bound The Responsibility And Invocation

Define one coherent task class: narrow enough to recognize, broad enough to recur.

Specify:

- the task state or user intent that should invoke the Skill
- positive examples that should invoke it
- nearby negative examples that should not
- adjacent responsibilities delegated elsewhere
- the completion, handoff, and stop conditions

Treat the Skill description or equivalent discovery metadata as an invocation interface. Make the task class and trigger recognizable before the body is loaded. Do not rely on domain expertise or instructions hidden in the body to repair vague discovery metadata.

Split a design only when responsibility, trigger, tools, permissions, safety boundary, output contract, or evaluation criteria materially differ. Do not split merely to make files smaller.

### 4. Define The Behavioral Contract

State the outcome, relevant context, hard constraints, required evidence, success criteria, and output contract. Distinguish hard constraints from decision principles and preferences: constraints cannot be violated, principles resolve tradeoffs, and preferences may yield to justified context. Prescribe intermediate steps only when they prevent a known failure.

Match instruction strength to task shape:

- **High freedom:** Define outcomes, evidence, decision principles, and constraints while leaving information gathering, decomposition, comparison, and solution paths open when multiple approaches are valid.
- **Medium freedom:** Give a preferred sequence, checkpoints, or parameterized method when consistency matters but variation remains useful.
- **Low freedom:** Require an exact sequence or deterministic tool when the task is fragile, order-dependent, destructive, or difficult to recover.

Define clarification thresholds for ambiguities that materially change the outcome, risk, or supported contract. Allow reasonable, reversible assumptions only where the task-specific boundary permits them, and keep material assumptions visible.

Do not require transcripts of hidden reasoning. Require conclusions, supporting evidence, material assumptions, uncertainty, and verification results when they are needed to evaluate the outcome.

Prefer decision rules, procedures, checks, and failure handling over background explanation. Keep examples only when they encode a real requirement, clarify a decision boundary, or correct a measured failure.

### 5. Design Interfaces And Boundaries

Introduce tools, scripts, references, or other Skills only for a current behavioral need. For each dependency, define what the agent must know:

- when to use it and when direct judgment is required
- required inputs and expected outputs
- relevant error behavior and missing-result handling
- side effects, approval needs, and ownership boundaries
- retry, concurrency, idempotency, and stopping limits when relevant
- the handoff back to model judgment or another mechanism

Prefer deterministic execution for predictable processing and validation. Retain model judgment where results change the next decision, ambiguity is semantic, approval is required, or final evidence must be assessed.

Separate Skill-specific boundaries from global safeguards. Delegate universal permission, privacy, security, and approval rules to policy or general instructions. Include only the additional boundary created by this task class, and rely on constrained tools or deterministic enforcement for high-risk actions where available.

### 6. Design Evaluation Before Drafting

Define a small representative evaluation set before optimizing wording.

- **Positive trigger:** Select the Skill for requests inside its task class.
- **Negative trigger:** Do not select the Skill for similar but out-of-scope requests.
- **Normal behavior:** Produce the intended decisions, checks, evidence, and outcome.
- **Failure or absence:** Keep missing inputs, unavailable resources, tool failures, and uncertainty visible.
- **Boundary:** Respect approval, stop, delegation, and responsibility limits.
- **Regression:** Improve or preserve results against the prior baseline.

Evaluate the final outcome as well as the execution path. A correct intermediate result is insufficient if the final response omits required evidence, caveats, decisions, or artifacts.

Use the strongest practical evidence available: deterministic assertions where possible, realistic task runs where judgment matters, and human review for qualitative requirements. Compare quality, completeness, corrections, resource use, and failure behavior only to the degree relevant to the Skill.

### 7. Compress And Delegate

State each rule once. Remove repeated rationale, generic advice, motivational language, and examples that do not change execution.

Keep the always-needed behavioral core in the Skill body. Delegate detailed reference knowledge, variants, implementation examples, and platform-specific instructions to resources or the mechanism that owns them. Preserve explicit routing so the agent knows when delegated material matters.

Remove instructions or tools one coherent group at a time and rerun the same representative evaluations. Count lower token use, latency, or tool calls as an improvement only when required behavior remains intact.

## Review Rubric

Accept a Skill design only when it has:

- a recurring and recognizable task class
- evidence or a credible failure hypothesis grounded in examples
- a behavioral difference from the no-Skill baseline
- precise invocation and non-invocation conditions
- one bounded responsibility with explicit delegation
- instruction strength matched to task fragility
- hard constraints, decision principles, and preferences that are distinguishable, with clarification thresholds proportionate to task risk
- outcome, constraints, evidence, success, and output expectations where relevant
- dependency contracts and failure handling proportionate to actual tool or resource use
- task-specific boundaries without duplicating global policy
- representative positive, negative, failure, boundary, and regression checks
- no content that belongs only to an authoring specification or platform adapter
- no instruction, example, or dependency that lacks behavioral value

Revise the smallest responsible part when a design fails the rubric.

## Refinement Decisions

Classify the observed problem before editing.

- **No demonstrated need:** Gather representative failures or keep the content outside a Skill.
- **Wrong mechanism:** Move the concern to a tool, documentation, policy, instruction, memory, or authoring guidance.
- **Unclear invocation:** Tighten discovery metadata and add positive and negative trigger cases.
- **Too broad:** Narrow the task class or split along a material responsibility boundary.
- **Too vague:** Replace generic advice with decisions, procedures, evidence, and checks.
- **Too prescriptive:** Preserve hard constraints but restore judgment where multiple approaches are valid.
- **Tool or resource misuse:** Define routing, contracts, side effects, failure handling, and handoffs.
- **Unsafe autonomy:** Isolate the task-specific boundary and delegate enforceable safeguards appropriately.
- **Poor evaluation:** Add representative behavior and trigger cases tied to the baseline.
- **Too heavy:** Remove repetition and conditionally route non-core material.

Preserve the Skill's core responsibility unless the user requests a redesign or the evidence shows that the current boundary is the problem. Do not encode taste, one-off judgments, or speculative extension points as mandatory behavior.

## Output Contract

For a design or review request, provide:

1. the intended task class, baseline, and failure modes
2. the proposed responsibility, invocation boundary, and behavioral contract
3. dependencies, task-specific boundaries, and delegated concerns
4. representative evaluation cases and success criteria
5. remaining assumptions, risks, or evidence gaps

When authoring or editing is also requested, pass this design to the applicable authoring skill or specification. Do not duplicate its packaging rules, templates, or platform-specific validation.
