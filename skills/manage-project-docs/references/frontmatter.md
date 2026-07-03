# Frontmatter

Use this reference when creating or reviewing frontmatter for detailed Markdown documents under `docs/`.

## Rule

New or substantially edited detailed Markdown documents under `docs/` should use standard YAML frontmatter.

`docs/README.md` is exempt because it is a router, not a detailed document.

For a narrow edit, do not add frontmatter to unrelated files. For an audit, report missing frontmatter instead of rewriting every file unless the user asks for fixes.

## Required Fields

```yaml
---
title: "Document Title"
doc_type: "architecture"
status: "active"
purpose: "Explain what this document is for."
last_reviewed: "YYYY-MM-DD"
---
```

- `title`: Human-readable document title.
- `doc_type`: Controlled document category.
- `status`: Document lifecycle status.
- `purpose`: One-sentence explanation of why this document exists.
- `last_reviewed`: Date when the document was checked against relevant canonical sources.

Use ISO-style dates for `last_reviewed`: `YYYY-MM-DD`.

## `last_reviewed`

Update `last_reviewed` only when the document has actually been checked for correctness.

Before updating it, verify as much as the task reasonably requires:

- Links still resolve.
- The document still belongs in its current category.
- Current-state claims still match code, tests, scripts, or CI when those sources are relevant.
- Specs distinguish planned, implemented, and unverified behavior.
- Archived or deprecated documents are clearly not current.

If verification is incomplete, do not update `last_reviewed` just to make frontmatter look fresh. Mention what was not checked in the final response or in an audit finding.

## `doc_type` Values

Use one of:

- `product`
- `spec`
- `architecture`
- `decision`
- `development`
- `testing`
- `operations`
- `security`
- `glossary`
- `reference`

Do not use `archive` as a `doc_type`. Archived documents keep their original content type and use `status: "archived"`.

## `status` Values

Use one of:

- `draft`: Not yet stable or accepted.
- `active`: Current and usable.
- `deprecated`: Still visible, but should be replaced or avoided.
- `archived`: Historical only; not current project documentation.

## Optional Fields

Use optional fields sparingly.

```yaml
tags: ["sync", "sqlite"]
related:
  - "architecture/data-flow.md"
superseded_by: "architecture/current-data-flow.md"
```

Prefer body sections over metadata when information needs explanation.

Avoid metadata that is already available from Git or likely to become stale:

- `created`
- `updated`
- `author`
- `version`
- `priority`
- broad `canonical_for` metadata that will not be maintained

Add these only if the project has tooling or a strong workflow that keeps them accurate.

## Examples

```yaml
---
title: "Architecture Overview"
doc_type: "architecture"
status: "active"
purpose: "Explain the current high-level architecture and major system boundaries."
last_reviewed: "2026-05-31"
---
```

```yaml
---
title: "Feature Spec: Settings"
doc_type: "spec"
status: "draft"
purpose: "Define the expected behavior and acceptance criteria for the settings feature."
last_reviewed: "2026-05-31"
tags: ["settings", "preferences"]
---
```

```yaml
---
title: "Old Data Flow Design"
doc_type: "architecture"
status: "archived"
purpose: "Preserve the previous data flow design for historical reference."
last_reviewed: "2026-05-31"
superseded_by: "architecture/data-flow.md"
---
```
