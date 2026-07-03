# Placement Rules

Use this reference when deciding where project knowledge belongs.

## Principle

Place knowledge where it is least likely to rot.

`docs/` is for intent, rationale, navigation, current high-level structure, human-readable requirements, and project practices. It should not duplicate every detail that can be enforced, tested, generated, or read elsewhere.

## Source Of Truth

| Knowledge                                | Canonical home                                 | Docs role                                                            |
| ---------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| Implementation details                   | Code, types, names, module boundaries          | Summarize only at boundary level; link when useful.                  |
| Data shape and constraints               | Types, schemas, validators                     | Explain meaning or rationale, not every field mechanically.          |
| Implemented behavior                     | Tests                                          | Link to tests or mention coverage; avoid duplicating every case.     |
| Planned behavior or acceptance criteria  | `docs/specs/`                                  | Canonical until implemented; once implemented, verify against tests. |
| Product intent, scope, users, non-goals  | `docs/product/`                                | Canonical.                                                           |
| Current high-level architecture          | `docs/architecture/`                           | Canonical at boundary level.                                         |
| Why a choice was made                    | `docs/decisions/`                              | Canonical.                                                           |
| Why alternatives were rejected           | `docs/decisions/`                              | Canonical.                                                           |
| Contributor practices                    | `docs/development/`                            | Canonical when not obvious from scripts, config, or tooling.         |
| Test strategy                            | `docs/testing/`                                | Canonical for strategy; individual behavior should still be tested.  |
| Exact commands                           | `package.json`, task runner config, CI         | Docs may link or summarize stable command groups.                    |
| Release, deployment, packaging, recovery | `docs/operations/` plus CI/release config      | Docs explain process; config remains canonical for automation.       |
| Security, privacy, permissions, risk     | `docs/security/` plus code/config enforcement  | Docs explain intent and risk; enforcement belongs in code/config.    |
| Reading paths and document index         | `docs/README.md`                               | Canonical router for active docs.                                    |
| Historical context                       | `docs/archive/` or superseded decision records | Historical only, not current requirements.                           |

## Placement Order

Apply these rules in order:

1. If an existing active document clearly owns the topic, update that document instead of creating a new one.
2. If the knowledge can be read from code or types, prefer improving names, types, or code structure. In docs, keep only a high-level summary or link.
3. If the knowledge is behavior that must not regress, prefer tests. In docs, link to tests or record acceptance criteria only when useful.
4. If the knowledge explains a decision, tradeoff, or rejected alternative, use a decision record.
5. If the knowledge describes product direction, user value, scope, or non-goals, use product docs.
6. If the knowledge describes planned feature behavior, use specs and include verification notes.
7. If the knowledge describes current high-level technical structure, use architecture docs.
8. If the knowledge describes how contributors work, verify, release, operate, or secure the project, use the matching category.
9. If the knowledge is stale but historically useful, archive it.
10. If the knowledge is wrong, duplicated, empty, or misleading with no historical value, delete or replace it rather than archive it.

## Common Docs Groups

Use only groups that have real content now. Do not create taxonomy directories because they might be useful later.

- `product/`: product intent, users, scope, non-goals, goals, roadmap.
- `specs/`: planned feature behavior, requirements, acceptance criteria, verification notes.
- `architecture/`: current high-level system structure, boundaries, data flow, persistence, integrations.
- `decisions/`: rationale, tradeoffs, rejected alternatives, consequences.
- `development/`: local setup, contributor workflow, conventions that are not obvious from tooling.
- `testing/`: verification strategy, test levels, manual checklists, fixture conventions.
- `operations/`: release, deployment, packaging, rollback, maintenance.
- `security/`: data handling, permissions, privacy, trust boundaries, risks.
- `archive/`: historical documents that must not drive current work.
- `glossary.md`: repeated project-specific terms with short definitions.

## Shadow-Code Smells

Flag a document for update or a non-docs recommendation when it:

- Restates code structure in detail instead of explaining system boundaries.
- Lists every type field without explaining domain meaning.
- Describes implemented behavior with no matching tests or verification reference.
- Duplicates exact commands that should be read from scripts or CI.
- Contains old behavior that no longer matches code or tests.
- Compensates for vague code names such as `utils`, `helpers`, `misc`, or `types`.

When this happens, keep docs changes small and report the non-docs source-of-truth issue separately unless the user asked to edit non-docs files.
