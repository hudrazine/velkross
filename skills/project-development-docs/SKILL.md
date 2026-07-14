---
name: project-development-docs
description: "Search, read, create, update, organize, audit, archive, or remove repository-local development documentation under `.dev-docs/`. Use when project architecture, decisions, specifications, product intent, development workflows, testing strategy, operations, security, or other maintainer-facing knowledge may already be documented or must be maintained. Do not use for user-facing documentation, generated API references, transient task notes, agent memory, or facts better owned by code, tests, types, schemas, scripts, configuration, or CI."
---

# Project Development Docs

Use `.dev-docs/` as the repository-local knowledge space for development documentation that maintainers and coding agents need.

## Development Docs Root

- Use `<repository root>/.dev-docs/` as the only development-docs root.
- If `.dev-docs/` does not exist, treat the knowledge space as empty.
- Create `.dev-docs/` only when an authorized task requires saving a development document.
- Do not search for or adopt an alternative documentation root.
- Do not treat `docs/` or other documentation directories as part of this knowledge space.
- Do not change whether `.dev-docs/` is tracked or ignored unless the user explicitly requests it.

## Find And Read Development Docs

Use a summary-first search. Treat `summary` frontmatter as the decision point for which documents to read in full.

When `rg` is available, include `--no-ignore --hidden` because `.dev-docs/` may be gitignored. Keep every search bounded to `.dev-docs/`.

```bash
rg --no-ignore --hidden --glob "*.md" "^summary:" .dev-docs/
rg --no-ignore --hidden --glob "*.md" -i "^summary:.*keyword" .dev-docs/
rg --no-ignore --hidden --glob "*.md" -i "^tags:.*keyword" .dev-docs/
rg --no-ignore --hidden --glob "*.md" -i "keyword" .dev-docs/
```

Search in this order:

1. Match `summary` against the task or question.
2. Use `tags` when summaries do not contain the expected term.
3. Search filenames, headings, and body text when metadata search is insufficient or may be stale.
4. Read only the documents likely to affect the task.

Prefer `status: "active"` documents. Follow `superseded_by` from deprecated or archived documents when present. Read archived documents only when historical context is relevant or requested.

Do not infer that documentation is absent from a failed summary search alone. Use the bounded full-text fallback before concluding that no relevant document exists.

When a material current-state claim affects the answer or planned work, verify it against the owning code, tests, types, schemas, scripts, configuration, or CI when practical. Keep unverified documentation claims distinguishable from verified project behavior.

## Maintain Development Docs

Search existing summaries before creating a document. Update or consolidate an existing canonical document when it already owns the topic.

For requests limited to reading, reviewing, explaining, searching, or proposing, inspect and report without editing. When the user also requests documentation changes, apply only the authorized changes.

Create or change development documents only when the user requests documentation work or when an authorized project change would otherwise leave an existing development document materially incorrect. Do not create new documents merely because they might be useful.

Read only the references required for the requested operation:

| Operation                                                             | References                                                                                                                                |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Narrowly edit a document                                              | [frontmatter.md](references/frontmatter.md)                                                                                               |
| Create a document or decide whether knowledge belongs in `.dev-docs/` | [placement-rules.md](references/placement-rules.md), [frontmatter.md](references/frontmatter.md)                                          |
| Substantially update a document                                       | [frontmatter.md](references/frontmatter.md), and [placement-rules.md](references/placement-rules.md) if ownership may change              |
| Split, merge, move, rename, deprecate, archive, or delete             | [placement-rules.md](references/placement-rules.md), [lifecycle.md](references/lifecycle.md), [frontmatter.md](references/frontmatter.md) |
| Audit development documentation                                       | [frontmatter.md](references/frontmatter.md), then [audit-checklist.md](references/audit-checklist.md)                                     |

For a narrow edit, read the target document and avoid restructuring neighboring documents unless the change would otherwise create duplication, false ownership, or a misleading current-state claim.

## Knowledge Boundaries

Keep intent, rationale, requirements, current high-level structure, and development practices in `.dev-docs/`. Keep exact implementation behavior and enforceable constraints in their owning sources. Use `.memories/` for agent-specific restart context and transient operational knowledge. Leave user-facing and generated documentation to the project systems that own them.

Preserve one canonical owner for each development-docs topic. Do not turn prose into a shadow copy of code, tests, types, schemas, commands, or configuration.

## Completion

- Relevant documents were found through metadata search with a bounded fallback when needed.
- Each changed or proposed document has one clear purpose and canonical owner.
- Changed document content and searchable metadata agree.
- Archived and deprecated material is distinguishable from active guidance.
- Material claims were verified proportionately, and remaining uncertainty is explicit.
- `updated` records the last intentional change to each edited document.

For search or reading, answer the request and identify material documentation gaps or unverified claims. For edits, summarize the ownership or lifecycle choice and any verification that was not possible.
