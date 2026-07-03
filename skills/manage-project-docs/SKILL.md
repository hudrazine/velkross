---
name: manage-project-docs
description: Maintain repository docs/ by creating, organizing, auditing, splitting, merging, archiving, or updating project documents. Use when deciding where project knowledge belongs, maintaining docs/README.md as the project-doc router, adding or reviewing frontmatter, or reducing stale or duplicated docs. Do not use merely to read project context. For context discovery, start from docs/README.md directly.
---

# Manage Project Docs

Manage `docs/` as a small, searchable, trustworthy project knowledge space.

The goal is not to put every useful fact into documentation. The goal is to keep each piece of project knowledge where it is least likely to rot.

## Operating Rules

- Prefer the smallest documentation change that preserves source-of-truth clarity.
- Do not perform a full documentation audit for a narrow edit request.
- Edit files under `docs/` by default.
- Read code, tests, package scripts, or CI when needed to verify documentation claims or identify the canonical source of truth.
- Do not edit files outside `docs/` unless the user explicitly asks for that broader scope.
- Treat `docs/README.md` as the router for active documentation under `docs/`.
- Keep archived documents out of active documentation routes.

## Task Modes

Choose one mode before reading references. Read only the references named for that mode unless the task proves broader than expected.

### Narrow Edit

Use for small requested changes to an existing docs file.

Read:

- The target file.
- [frontmatter.md](references/frontmatter.md) only if creating frontmatter, changing frontmatter, or updating `last_reviewed`.
- [docs-readme-router.md](references/docs-readme-router.md) only if navigation changes.

Do not run a full audit. Do not restructure neighboring documents unless the requested change would otherwise create duplication or an unclear source of truth.

### Create Document

Use when adding a new active document under `docs/`.

Read:

- [placement-rules.md](references/placement-rules.md)
- [frontmatter.md](references/frontmatter.md)
- [docs-readme-router.md](references/docs-readme-router.md)

Create a new document only when no existing active document clearly owns the knowledge.

### Router Update

Use when creating or updating `docs/README.md`.

Read:

- [docs-readme-router.md](references/docs-readme-router.md)

Link only to documents that exist. Prefer task-based navigation over a raw directory dump.

### Reorganization

Use when moving, renaming, splitting, merging, archiving, deprecating, or deleting docs.

Read:

- [placement-rules.md](references/placement-rules.md)
- [lifecycle.md](references/lifecycle.md)
- [docs-readme-router.md](references/docs-readme-router.md)

Keep one canonical location for each docs-owned topic. Update `docs/README.md` whenever active docs are added, moved, renamed, merged, split, archived, or deleted.

### Audit

Use when the user asks to review or audit docs quality, freshness, duplication, source-of-truth placement, or AI usability.

Read:

- [audit-checklist.md](references/audit-checklist.md)

Then read only the other references needed to support concrete findings. Verify material claims against canonical project sources when practical.

## Done Criteria

- The changed or proposed docs have one clear owner and purpose.
- `docs/README.md` is updated when active docs are added, moved, renamed, merged, split, archived, or deleted.
- New or substantially edited detailed Markdown documents under `docs/` use standard frontmatter unless they are `docs/README.md`.
- Claims derived from code, tests, scripts, or CI are linked or summarized without becoming a shadow copy of those sources.
- Recommended non-docs source-of-truth changes are reported separately from docs edits.
- If correctness cannot be verified, state what was not checked instead of updating `last_reviewed`.

## Output

For audits or reorganization proposals, group recommendations in this order and omit empty sections:

1. Keep
2. Add
3. Update
4. Split
5. Merge
6. Move or rename
7. Archive
8. Delete
9. Non-docs source-of-truth recommendations

For edits, summarize the structural choice briefly and mention any verification that was not possible.
