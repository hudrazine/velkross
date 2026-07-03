# Lifecycle

Use this reference when deciding whether to split, merge, move, rename, deprecate, archive, or delete documents under `docs/`.

## Principle

Change document structure by reading purpose, update frequency, change reason, and source of truth. Do not reorganize docs only to mirror code modules.

## Split

Split a document when:

- Sections change at different frequencies.
- The document mixes current state and historical decisions.
- The document mixes product intent and implementation details.
- The document mixes planned requirements and implemented behavior without verification links.
- A feature spec becomes large enough to hide requirements or acceptance criteria.
- The document is hard to link to as the canonical source for a topic.
- The document contains independent topics that are not usually read together.
- The title no longer describes most of the content.

Do not split when:

- The new file would contain only a few useful lines.
- The split would create navigation overhead without improving clarity.
- The content is always read together.
- The split only mirrors code modules without a documentation reason.
- The result would be many tiny files with little standalone value.

## Merge

Merge documents when:

- Multiple files repeat the same context.
- Readers cannot tell which document is canonical.
- Several tiny files are always edited together.
- A directory has many low-value fragments.
- Stale documents survive only because no one knows whether they are safe to remove.

## Move Or Rename

Move a document when its purpose is clearer in another category.

Examples:

- Move product intent from `specs/` to `product/`.
- Move feature behavior from `architecture/` to `specs/`.
- Move current system structure from `decisions/` to `architecture/`.
- Move rejected alternatives from `architecture/` or `specs/` to `decisions/`.
- Move release steps from `development/` to `operations/`.
- Move permission rationale from `architecture/` to `security/` when risk and privacy are the main concern.

Rename a document when:

- The filename is vague.
- The title and filename disagree.
- The file has become the canonical source for a more specific topic.
- The name encourages unrelated future additions.

Prefer names such as:

```txt
architecture/data-flow.md
architecture/persistence.md
product/non-goals.md
testing/manual-checklist.md
operations/release.md
```

Avoid names such as:

```txt
misc.md
notes.md
ideas.md
old.md
stuff.md
```

## Deprecate

Use `status: "deprecated"` when a document must stay in the active docs area for now but should be replaced or avoided.

Deprecated documents should:

- Say what should be used instead when possible.
- Stay out of primary `docs/README.md` routes unless readers still need to find them.
- Not be treated as current requirements, architecture, or workflow.

## Archive

Use `docs/archive/` for documents that should be kept for historical reference but should not be treated as current project documentation.

Archive when:

- The document is no longer current.
- It may still contain useful historical context.
- Deleting it would lose useful reasoning, exploration, or abandoned design work.
- Keeping it among active docs could confuse readers or AI agents.
- It has been replaced by a newer canonical document.
- It captures a past plan, architecture, roadmap, or spec that should not drive current implementation.

Do not archive when:

- The document is simply wrong and has no historical value.
- The content is duplicated elsewhere with no useful difference.
- The document is empty or only a placeholder.
- The better action is to update the document in place.
- The better action is to convert the knowledge into tests, code, types, scripts, or CI.
- The user explicitly wants old documents deleted.

Prefer preserving the original category under `archive/`:

```txt
docs/archive/architecture/old-data-flow.md
docs/archive/specs/abandoned-sync-spec.md
docs/archive/product/old-roadmap.md
```

After archiving:

- Set `status: "archived"` in frontmatter.
- Keep the original `doc_type`.
- Add `superseded_by` when there is a replacement document.
- Add a short archived note near the top of the body when useful.
- Remove the document from primary `docs/README.md` navigation.

Suggested note:

```md
> Archived: This document describes an earlier data-flow design and is kept for historical context. The current design is documented in [Data Flow](../../architecture/data-flow.md).
```

## Delete

Delete or replace, rather than archive, when a document is:

- Empty or only a placeholder.
- Misleading with no historical value.
- Duplicated elsewhere with no useful difference.
- A stale catch-all that has no clear owner.

If deletion could remove useful reasoning, archive instead.
