# Document Lifecycle

Use this reference when splitting, merging, moving, renaming, deprecating, archiving, or deleting development documents.

## Principle

Organize documents by purpose, source of truth, update frequency, and reading need. Do not mirror code modules or create structural churn without a retrieval or ownership benefit.

## Split

Split a document when it mixes independently maintained topics, current state with historical rationale, product intent with implementation detail, or planned requirements with implemented behavior. Split when the title or summary no longer describes most of the content or a reader cannot link to one canonical topic.

Do not split when the resulting documents would be tiny, always read together, or harder to discover than the original.

## Merge

Merge documents when they repeat the same context, compete as canonical owners, are always maintained together, or have fragmented a single reading task into low-value pieces.

After merging, preserve unique rationale and update metadata and references to identify the surviving owner.

## Move Or Rename

Move a document when another category better represents its purpose. Rename it when the filename is vague, disagrees with the content, or encourages unrelated additions.

Prefer specific names such as:

```text
architecture/data-flow.md
decisions/plugin-discovery.md
testing/manual-release-checks.md
operations/release.md
```

Avoid names such as `notes.md`, `misc.md`, `ideas.md`, `stuff.md`, or `old.md`.

## Deprecate

Use `status: "deprecated"` when a document must remain discoverable but should no longer guide new work. Add `superseded_by` when an active replacement exists.

## Archive

Move historical-only material under `.dev-docs/archive/` when it preserves useful reasoning, exploration, abandoned plans, or past architecture that must not drive current work.

Preserve the original category when useful:

```text
.dev-docs/archive/architecture/old-data-flow.md
.dev-docs/archive/specs/abandoned-sync-spec.md
```

Set `status: "archived"`, keep the original `doc_type`, and add `superseded_by` when a replacement exists. Make the summary clearly historical.

Do not archive content that is simply wrong, empty, duplicated without a useful difference, or better represented in code, tests, types, scripts, configuration, or CI.

## Delete

Delete or replace a document when it is empty, misleading with no historical value, duplicated without useful context, or a stale catch-all with no clear owner. Archive instead when deletion would lose useful reasoning or history.

After any lifecycle change, update affected metadata and links, then search `.dev-docs/` for references to moved, renamed, archived, merged, or deleted paths.
