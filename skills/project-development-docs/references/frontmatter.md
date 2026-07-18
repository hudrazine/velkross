# Frontmatter

Use this reference when creating or reviewing searchable metadata for Markdown documents under `.dev-docs/`.

## Required Fields

Every development document must include YAML frontmatter with `summary`, `doc_type`, `status`, and `updated`.

Use the supported YAML subset: one unindented top-level `key: JSON-compatible value` entry per line. Write strings with double quotes and arrays inline. Do not use block arrays, nested mappings, comments, YAML aliases, or fields not defined in this reference. This restricted form keeps metadata searchable and allows dependency-free validation.

```yaml
---
summary: "Explains plugin discovery, shared guidance boundaries, and how each harness adapter applies them."
doc_type: "architecture"
status: "active"
updated: "2026-07-14"
---
```

### `summary`

Write one or two concise sentences that let a reader decide whether to open the document. Include the specific topic, scope, decision, or problem the document owns and why it matters when that is not obvious.

Prefer searchable domain terms. Avoid summaries that only restate a generic purpose, such as "Describes the architecture" or "Contains development notes."

Update `summary` whenever a content change makes the existing search description incomplete or misleading.

### `doc_type`

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

Archived documents keep their original `doc_type`.

### `status`

Use one of:

- `draft`: Incomplete or not yet accepted.
- `active`: Current and usable.
- `deprecated`: Still present but should be avoided or replaced.
- `archived`: Historical only and not current project guidance.

### `updated`

Record the date when the document's content or metadata was last intentionally modified. Use `YYYY-MM-DD`. Set it when creating a document and update it whenever the document is edited. A move without an edit does not change it. This field indicates modification recency only; it does not imply that the document was verified or remains authoritative.

## Optional Fields

Use optional metadata only when it improves retrieval or lifecycle clarity.

```yaml
tags: ["plugins", "adapters"]
related: ["architecture/plugin-loading.md"]
superseded_by: "architecture/current-plugin-loading.md"
```

- `tags`: Add terms that materially improve retrieval and are not already clear from the summary.
- `related`: Use for stable, useful relationships rather than exhaustive cross-linking.
- `superseded_by`: Identify the active replacement for deprecated or archived material. Use this field only when the current document has `status: "deprecated"` or `status: "archived"`. The target must have valid metadata and `status: "active"`.

Use forward-slash Markdown paths relative to `.dev-docs/` for `related` and `superseded_by`. Do not use absolute paths, backslashes, `.` segments, or `..` segments. Referenced documents must exist, resolve inside `.dev-docs/`, and must not refer to the document itself.

Avoid metadata that adds another source of truth without improving retrieval or lifecycle clarity, including authors, versions, and priorities.

## Verification

When reviewing or changing document content, verify as much as the task reasonably requires:

- referenced files and links still resolve;
- the document still owns its topic;
- current-state claims match the relevant code, tests, types, schemas, scripts, configuration, or CI;
- specifications distinguish planned, implemented, and unverified behavior;
- deprecated and archived documents cannot be mistaken for active guidance.

Report what was not checked when verification is incomplete. Do not treat `updated` as evidence that verification occurred.

## Structural Validation

After creating or editing a development document, or after a lifecycle operation changes document paths or metadata, run the bundled validator from the repository root:

```bash
node <skill-folder>/scripts/validate-dev-docs.mjs .dev-docs
```

The validator requires no installed packages and does not modify files. Exit code `0` means no structural errors were found, although non-blocking warnings may still be reported. Exit code `1` means document errors were found, and `2` means the validator could not run correctly. If Node.js is unavailable or the validator cannot run, report the validation gap instead of treating the documents as valid.

Keep symbolic links and junctions out of `.dev-docs/`. The validator does not follow them and reports each entry as a structural error so linked content cannot be silently omitted from validation.

Warnings do not block completion, but review and report them because they may identify retrieval, ownership, or maintenance problems.

The validator checks the supported syntax, required fields, value types, controlled values, dates, reference paths, supersession states, duplicate array entries, duplicate summaries, and consistency between `status: "archived"` and the `archive/` directory.

Structural validation does not establish that a summary is useful, a document owns the correct topic, or its claims are current. Review those properties separately.

A document edit or lifecycle change is complete only after the validator passes or the validation gap is reported.
