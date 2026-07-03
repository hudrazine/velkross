# docs/README.md Router

Use this reference when creating or updating `docs/README.md`.

## Purpose

Use `docs/README.md` as the entry point for active documentation under `docs/`.

It should help readers and AI agents quickly decide which detailed document to open. It should not duplicate those detailed documents.

`docs/README.md` is exempt from the standard frontmatter schema because it is a router, not a detailed document.

## Core Rules

- Keep it short and navigational.
- Link only to documents that exist.
- Use relative links.
- Prefer task-based navigation over a raw directory dump.
- Add short descriptions only when filenames are not self-explanatory.
- Remove stale, moved, deleted, or archived documents from primary navigation.
- Mention `archive/` only as historical storage unless the user asks for detailed archive navigation.
- Include a short source-of-truth policy when the project has multiple docs categories or AI agents rely on docs.

Update `docs/README.md` whenever active documents under `docs/` are added, moved, renamed, merged, split, archived, or deleted.

## Useful Sections

Use only sections that fit the actual project.

- `Start here`: the few documents a new reader should open first.
- `Source of truth`: where readers should trust code, tests, docs, decisions, or archive.
- `By task`: reading paths such as understand the product, understand the system, implement a feature, release the project.
- `By area`: short descriptions of active docs categories.
- `Archived documents`: brief note that `archive/` is historical only.
- `Maintenance notes`: short rules that prevent router drift.

## Source-Of-Truth Policy

When useful, include a compact policy such as:

```md
## Source of truth

- Code and types are canonical for implementation details.
- Tests are canonical for implemented behavior and regression expectations.
- Product docs are canonical for product intent, scope, and non-goals.
- Specs are canonical for planned feature requirements; implemented behavior should be verified against tests.
- Architecture docs are canonical for current high-level structure.
- Decision records are canonical for rationale and rejected alternatives.
- Archived documents are historical only.
```

Keep this policy short. Link to detailed documents instead of explaining every category in the router.

## Good Router Behavior

A good `docs/README.md` answers:

- Where should a new reader start?
- Which document should be opened for a task?
- Which area owns which kind of knowledge?
- Which documents are canonical?
- Which documents are historical only?
- Which knowledge should be verified in code, tests, scripts, or CI instead of prose?

## Avoid

Avoid:

- Long explanations copied from detailed documents.
- Links to files that do not exist.
- Archived documents mixed into primary navigation.
- A flat list with no reading path.
- Deep summaries that must be kept in sync manually.
- Large tables that become harder to maintain than the documents themselves.
- Repeating commands, implementation details, or test cases that should be read from canonical sources.

## Update Checklist

When updating `docs/README.md`, check:

- All links resolve.
- All listed documents still belong in their described category.
- New active documents have been added to the correct navigation section.
- Deleted, archived, or merged documents are no longer linked from primary navigation.
- Moved or renamed documents have updated links.
- Deprecated documents are marked or removed from primary navigation when appropriate.
- `archive/` is mentioned only as historical storage unless detailed archive navigation is needed.
- The source-of-truth policy is present when it would reduce contributor or AI-agent confusion.
