# Placement Rules

Use this reference to decide whether knowledge belongs in `.dev-docs/` and which document should own it.

## Principle

Place durable development knowledge where it is least likely to rot. Use `.dev-docs/` for human-readable intent, rationale, requirements, current high-level structure, and development practices. Do not use it to duplicate details that can be enforced, tested, generated, or read from a more authoritative source.

## Ownership Boundaries

| Knowledge                                                         | Canonical owner                                                           | Development-docs role                                                       |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Product intent, scope, users, and non-goals                       | `.dev-docs/`                                                              | Canonical development context.                                              |
| Planned behavior and acceptance criteria                          | `.dev-docs/`                                                              | Canonical until implemented; record verification state.                     |
| Current high-level architecture and boundaries                    | `.dev-docs/`                                                              | Canonical at the system-boundary level.                                     |
| Decisions, tradeoffs, and rejected alternatives                   | `.dev-docs/`                                                              | Canonical rationale.                                                        |
| Contributor, testing, release, operations, and security practices | `.dev-docs/`                                                              | Canonical when not fully expressed by executable tooling or enforcement.    |
| Implementation details                                            | Code, types, names, and module boundaries                                 | Summarize only when boundary context is useful.                             |
| Data shape and enforceable constraints                            | Types, schemas, and validators                                            | Explain meaning or rationale; do not mirror fields mechanically.            |
| Implemented behavior and regression expectations                  | Tests                                                                     | Link or summarize when useful; do not restate every case.                   |
| Exact commands and automation                                     | Project manifests, task-runner configuration, build configuration, and CI | Explain stable workflows or rationale without shadowing executable sources. |
| Agent-specific restart context and working knowledge              | `.memories/`                                                              | Do not promote transient context into development docs.                     |
| User-facing or generated documentation                            | The project system that owns it                                           | Outside this skill's scope.                                                 |
| Historical development context                                    | `.dev-docs/archive/`                                                      | Historical only, not current guidance.                                      |

## Placement Order

Apply these rules in order:

1. Update an existing active document when it clearly owns the topic.
2. Prefer code, types, schemas, tests, scripts, configuration, or CI when the knowledge should be executable or mechanically enforced.
3. Use a decision document for rationale, tradeoffs, consequences, or rejected alternatives.
4. Use a specification for planned behavior, requirements, acceptance criteria, and verification state.
5. Use architecture documentation for current high-level structure, boundaries, data flow, persistence, or integrations.
6. Use the matching product, development, testing, operations, or security area for durable practices and intent.
7. Archive stale but historically useful development knowledge.
8. Delete or replace wrong, empty, misleading, or duplicate material with no historical value.

## Optional Groups

Create category directories only when current content benefits from them. Do not create an empty taxonomy in advance.

- `product/`: intent, users, scope, goals, non-goals, roadmap.
- `specs/`: planned behavior, requirements, acceptance criteria, verification state.
- `architecture/`: current high-level structure, boundaries, data flow, persistence, integrations.
- `decisions/`: rationale, tradeoffs, alternatives, consequences.
- `development/`: contributor workflows and conventions not obvious from tooling.
- `testing/`: verification strategy, test levels, manual checks, fixture conventions.
- `operations/`: release, deployment, packaging, rollback, recovery, maintenance.
- `security/`: data handling, permissions, privacy, trust boundaries, risks.
- `archive/`: historical documents that must not drive current work.
- `glossary.md`: repeated project-specific terms with short definitions.

Keep filenames specific and searchable. Avoid catch-all names such as `notes.md`, `misc.md`, `ideas.md`, or `old.md`.
