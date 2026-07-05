---
name: agent-skill-design
description: Use when designing, reviewing, or refining Agent Skills, converting workflows or guidance into Skills, deciding whether content belongs in a Skill/tool/docs/policy/memory, or tightening vague, broad, unsafe, or hard-to-invoke Skills so they become reusable, selectable, safe, evaluable, and behavior-changing. Do not use as a substitute for platform-specific packaging, manifest, or authoring-spec rules.
---

# Agent Skill Design

## Purpose

Use this skill to design, review, and refine Agent Skills as practical operational capabilities for AI agents.

A good Skill is not a knowledge dump, essay, checklist, or prompt trick. It should help an agent perform a repeated class of tasks with better accuracy, consistency, safety, and efficiency.

This skill focuses on Skill substance and quality. Defer packaging details, file layout, frontmatter conventions, and platform-specific templates to the relevant authoring specification or environment-specific guidance.

## Use When

Use this skill when asked to:

- create a new Agent Skill
- review or refine an existing Agent Skill
- turn a report, workflow, guideline, practice, or project convention into a Skill
- decide whether content belongs in a Skill, tool, documentation, policy, memory, or general instruction
- reduce a Skill that is too broad, vague, heavy, unsafe, or hard to invoke

Do not use this skill as a substitute for platform-specific authoring rules.

## Core Rule

A Skill is useful only if it changes the agent's behavior for a repeated task class.

Before creating or editing a Skill, answer:

- What repeated task does this Skill improve?
- When should the agent invoke it?
- When should the agent not invoke it?
- What recurring failure does it prevent?
- What should the agent do differently because this Skill exists?
- What tools, files, references, or resources matter?
- What are the boundaries, approvals, or stop conditions?
- How can success or failure be checked?

If these questions cannot be answered, the content is probably not ready to become a Skill.

## First Decide: Skill Or Something Else

Do not turn every useful idea into a Skill. Choose the right home for the content.

| Put it in                | When                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Skill                    | It guides repeated agent behavior for a recognizable task class.                                            |
| Tool                     | It requires deterministic execution, external side effects, structured API access, or reliable computation. |
| Documentation            | It mainly preserves background knowledge, explanations, decisions, or reference material.                   |
| Policy                   | It defines non-negotiable safety, compliance, privacy, or permission rules.                                 |
| General instruction      | It applies across almost all tasks and should not depend on invocation.                                     |
| Memory                   | It is user-specific, project-specific, or preference-like context that should persist across tasks.         |
| Example or resource file | It is useful supporting material but too long or situational for the main Skill body.                       |

Prefer documentation over a Skill when the content explains but does not change action.

Prefer a tool over a Skill when reliable behavior requires deterministic execution rather than model judgment.

Prefer policy over a Skill when the rule must apply regardless of task context.

## Skill Design Workflow

### 1. Identify The Repeated Task Class

State the kind of task the Skill improves.

Good task classes are specific enough to invoke, but broad enough to recur.

Weak:

> Help with engineering.

Strong:

> Review an Agent Skill draft for trigger clarity, bounded responsibility, operational procedure, safety constraints, and evaluation criteria.

### 2. Name The Failure Modes

Start from concrete failures the Skill should prevent.

Common Skill-worthy failures include:

- the agent chooses the wrong tool or uses it incorrectly
- the agent skips verification
- the agent asks unnecessary questions
- the agent misses necessary clarification
- the agent uses stale, unsupported, or hallucinated knowledge
- the agent over-expands the task and wastes context
- the agent performs unsafe or irreversible actions without approval
- the agent cannot explain, audit, or evaluate its work
- the agent repeats a known mistake after feedback

If no recurring failure can be named, do not create a Skill yet.

### 3. Define The Trigger And Non-Trigger

Make invocation conditions explicit.

A Skill should say both:

- when to use it
- when not to use it

The trigger should be recognizable from the user's request, task state, files, or tool requirements.

If the Skill format includes a `description` field or similar metadata, treat it as part of the invocation interface. It should state the task class, trigger condition, and intended behavioral improvement clearly enough for the agent to decide whether to read or invoke the Skill. Do not rely on the main body to compensate for a vague, over-broad, or misleading description.

Avoid hidden triggers that only work if the agent already understands the domain deeply.

### 4. Write Operational Guidance

Write instructions that change behavior.

Prefer:

- decision rules
- ordered procedures
- verification checks
- tool-use rules
- stop conditions
- safety boundaries
- output contracts
- failure handling

Avoid:

- generic advice
- long background explanations
- motivational language
- duplicated authoring specs
- examples that do not affect execution

When converting a report or guideline into a Skill, do not mirror the source structure. Extract only the claims, decisions, risks, procedures, and checks that should change agent behavior.

### 5. Add Boundaries And Checks

A Skill should define where the agent must slow down, ask, verify, or stop.

Include boundaries for:

- destructive or irreversible actions
- private, sensitive, or secret data
- external content and untrusted instructions
- user approval requirements
- tool failures or missing resources
- uncertainty that affects safety or correctness
- handoff to another Skill, tool, policy, or documentation

High-risk behavior should rely on explicit approval, constrained tools, or deterministic checks rather than broad model judgment.

### 6. Compress

After drafting, remove anything that does not help invocation, execution, safety, or evaluation.

Keep the main Skill body focused on what the agent needs during execution. Move long examples, templates, source notes, research background, and supporting references into separate resources when possible.

## Quality Gates

A Skill is not ready for practical use unless it has:

- a clear repeated task class
- a clear invocation trigger
- a description that supports accurate invocation before the main body is read
- clear non-trigger conditions or boundaries
- concrete behavior-changing instructions
- bounded responsibility
- relevant tools, files, or resources identified when needed
- handling for missing, failed, or unsafe tool/resource use
- explicit safety, approval, and stop conditions where relevant
- observable success and failure checks
- minimal background material in the main body
- no unnecessary duplication of authoring specs, platform rules, policies, or general instructions

If a Skill fails one of these gates, revise the smallest responsible part.

## Refinement Rules

When refining an existing Skill, preserve its core responsibility unless the user explicitly asks for a redesign.

Before editing, classify the problem:

| Problem          | Preferred fix                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| Unclear trigger  | Rewrite the description and Use When section.                                   |
| Too broad        | Narrow the task class or split by responsibility.                               |
| Too vague        | Replace advice with procedures, decision rules, and checks.                     |
| Too long         | Move background, examples, and references out of the main body.                 |
| Tool misuse      | Clarify tool choice, required inputs, failure handling, and side effects.       |
| Unsafe autonomy  | Add approval rules, stop conditions, and deterministic checks.                  |
| Poor evaluation  | Add observable quality gates or realistic failure cases.                        |
| Repeated overlap | Delegate to another Skill, tool, policy, documentation, or general instruction. |

Fix the smallest responsible part. Do not inflate a Skill to cover every adjacent case.

Split a Skill only when one of these meaningfully differs:

- responsibility
- invocation trigger
- tool surface
- permissions or approval rules
- safety boundary
- output type
- evaluation criteria

Do not encode taste as law. Preferences, examples, and one-off judgments should become rules only when they prevent repeated failures.

## Anti-Patterns

Avoid these patterns:

- **Knowledge dump:** stores information but does not guide action.
- **Generic virtue list:** says to be accurate, safe, concise, or helpful without task-specific behavior.
- **Hidden trigger:** useful only if the agent already knows when to invoke it.
- **Over-broad mega-skill:** tries to govern too many unrelated behaviors.
- **Tool-blind instruction:** says what to achieve but not how to use required tools or resources.
- **No stop condition:** lets the agent continue when it should ask, verify, escalate, or stop.
- **No evaluation check:** gives no way to tell whether the Skill improved behavior.
- **Spec duplication:** repeats packaging, template, or platform rules owned by the relevant authoring specification.

## Output Contract

When asked to create or refine a Skill, provide:

1. a brief diagnosis of the intended task class and failure modes
2. the proposed Skill content
3. notes on what was intentionally delegated to authoring specs, tools, documentation, policy, memory, general instructions, or other Skills
4. remaining risks, unresolved boundaries, or evaluation gaps

Prefer a practical draft that can be tested over a perfect framework that only explains principles.
