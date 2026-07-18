# Development Document Content Design

Use this reference when creating a development document, substantially changing its body, or
reviewing whether its content communicates its topic clearly and accurately.

## Core Principle

Write for the decisions and questions the document owns. Lead with the current conclusion,
intended behavior, or system boundary. Add rationale, detail, and history only when they help
maintainers make or verify decisions.

Do not use prose, tables, or diagrams to mechanically mirror code, tests, types, schemas,
configuration, generated information, or other owning sources.

## Knowledge States

Keep these states distinguishable when they are relevant:

- current and verified behavior;
- current but unverified claims;
- planned or proposed behavior;
- historical context and rationale;
- rejected alternatives.

Do not infer correctness from recency. Link material current-state claims to their owning sources
when practical, and state what remains unverified.

## Content By Document Type

Use these as selection prompts, not mandatory templates. Include only content needed for the
document's purpose.

- **`product`:** Consider the problem, users, goals, non-goals, scope, and success conditions.
- **`spec`:** Consider requirements, non-requirements, acceptance criteria, boundaries, failure behavior, and verification state.
- **`architecture`:** Consider context, boundaries, responsibilities, interactions, data flow, invariants, and failure or recovery behavior.
- **`decision`:** Consider context, decision drivers, the decision, alternatives, consequences, and reconsideration conditions.
- **`development`:** Consider intent, stable workflows, exceptions, and links to the executable sources that own exact commands.
- **`testing`:** Consider risks, test levels, guarantees, exclusions, fixtures, and manual verification needs.
- **`operations`:** Consider preconditions, execution, verification, stopping conditions, rollback, and recovery.
- **`security`:** Consider assets, trust boundaries, threats, controls, assumptions, and residual risks.
- **`glossary`:** Consider project-specific terms, meanings, and useful relationships without creating an implementation inventory.
- **`reference`:** Consider stable reference information, its scope, and its relationship to more authoritative sources.

## Choose The Smallest Useful Representation

Use prose for rationale, qualifications, uncertainty, and concepts that depend on precise
wording. Use a table for repeated mappings or comparisons across several items.

Use a Mermaid diagram when topology, branching, temporal order, ownership, or state transitions
would be materially harder to understand in prose. Do not add a diagram for decoration or for a
relationship that one short paragraph or list already explains.

Select the diagram type by the question it must answer:

- Use `flowchart` for boundaries, dependencies, branching, and data flow.
- Use `sequenceDiagram` for interactions over time, external calls, retries, and failure paths.
- Use `stateDiagram-v2` for states, allowed transitions, invalid operations, and recovery states.
- Use `erDiagram` for conceptual data relationships only when it will not shadow an owning schema.

## Mermaid Diagrams

- Keep each diagram focused on one question and the smallest useful scope.
- Use project terminology in labels and label important edges, transitions, and failure paths.
- Separate current and proposed structures unless comparison is the document's purpose.
- Explain the conclusion, important invariants, and exceptions in nearby prose.
- Keep essential meaning available without relying on color, layout, or rendering alone.
- Do not mirror exhaustive module, field, endpoint, configuration, or test inventories.
- Verify rendering with repository tooling when available.
- For output-only proposals, report whether diagram rendering or syntax was checked.
- If rendering or syntax verification is unavailable, report that limitation instead of implying
  that the diagram was validated.
- Do not assume Mermaid support; use another representation when the target environment cannot
  render it and Mermaid source is not itself required.

## Content Review

Before completing a substantial content change, check that:

- the title, summary, opening, and body describe the same owned topic;
- current, planned, historical, rejected, and unverified content cannot be confused;
- material claims identify or link to owning sources when practical;
- tables and diagrams clarify rather than duplicate their subject;
- nearby prose and diagrams agree;
- important non-goals, boundaries, failure behavior, and uncertainty remain visible.
