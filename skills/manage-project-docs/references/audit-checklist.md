# Audit Checklist

Use this checklist when auditing project documentation under `docs/`.

Do not turn every checklist item into a finding. Report concrete issues that affect trust, navigation, maintainability, source-of-truth clarity, or AI usability.

## Structure

Check:

- Does `docs/README.md` work as a useful router?
- Are documents grouped by reading purpose?
- Are there unnecessary empty directories?
- Are there catch-all documents that should be split, merged, archived, or removed?
- Are filenames specific and predictable?
- Is there one canonical document for each docs-owned topic?

## Source Of Truth

Check:

- Does each document make sense as the canonical source for its topic?
- Does the document duplicate behavior that should be expressed by tests?
- Does the document explain implementation details that are directly derivable from code?
- Does the document describe type constraints that should be encoded in types, schemas, or validators?
- Does the document duplicate exact commands instead of linking to scripts, task runners, or CI?
- When docs mention implemented behavior, do they link to executable tests or relevant source files instead of restating everything?
- Are rejected alternatives captured in decision records instead of scattered through current-state docs?

## Frontmatter

Check:

- Does every new or substantially edited detailed Markdown document under `docs/` have standard frontmatter?
- Is `docs/README.md` exempt from detailed-document frontmatter?
- Is `doc_type` valid?
- Is `status` accurate?
- Is `purpose` specific and one sentence?
- Is `last_reviewed` formatted as `YYYY-MM-DD`?
- Does `last_reviewed` appear earned by actual review rather than cosmetic freshness?
- Do archived documents keep their original `doc_type` instead of using `archive`?

## Freshness

Check:

- Are stale documents marked, updated, archived, or removed?
- Are outdated assumptions clearly identified?
- Are moved, renamed, archived, or deleted files still linked somewhere incorrectly?
- Do documents distinguish current state, historical rationale, and future intent clearly?
- Are deprecated documents kept out of primary navigation when appropriate?
- Are archived documents excluded from active documentation routes?
- Do specs identify whether behavior is planned, implemented, or unverified?

## Placement

Check:

- Product intent belongs in `product/`.
- Planned feature behavior belongs in `specs/`.
- Implemented behavior should be verified by tests.
- Current technical structure belongs in `architecture/`.
- Historical rationale and rejected alternatives belong in `decisions/`.
- Contributor practices belong in `development/`.
- Verification practices belong in `testing/`.
- Release and operational practices belong in `operations/`.
- Data handling, permissions, privacy, and risks belong in `security/`.
- Historical-only documents belong in `archive/`, preserving their original category.

## Duplication

Check:

- Is the same explanation repeated in multiple docs files?
- Are commands duplicated instead of linked to a canonical command source?
- Are decisions mixed into current-state architecture documents?
- Are product goals repeated in feature specs without a clear reason?
- Are setup or release steps duplicated in multiple places?
- Are test cases, type definitions, or implementation details manually mirrored in prose?

## Extractability

Check:

- Could domain terminology be partially derived from type names, value objects, modules, or file paths?
- Could architecture boundaries be inferred from directory structure and public APIs?
- Are important domain concepts hidden in generic files such as `utils`, `helpers`, `misc`, or `types`?
- Are docs compensating for unclear code structure?
- If documentation must explain basic module ownership in detail, should code structure be renamed or reorganized instead?

## AI Usability

Check:

- Can an AI agent identify which document to read for a task?
- Are document names specific enough for retrieval?
- Are constraints and non-goals explicit?
- Are acceptance criteria easy to find?
- Are verification notes easy to find in specs?
- Are canonical documents linked from `docs/README.md`?
- Are large documents split where it improves targeted reading?
- Are tiny documents merged where fragmentation hurts retrieval?
- Can archived documents be distinguished from current documentation quickly?
- Can an AI agent tell when code, tests, scripts, or CI should be trusted over prose?

## Recommended Audit Output

Use this structure and omit empty sections:

```md
## Summary

Briefly describe the health of `docs/`.

## Keep

Documents or structures that are working well.

## Add

Missing documents that would reduce confusion.

## Update

Existing documents that need content, link, frontmatter, freshness, or source-of-truth changes.

## Split

Documents that mix different reading purposes.

## Merge

Fragments that should become one canonical document.

## Move or rename

Documents whose location or name obscures their purpose.

## Archive

Outdated but useful documents that should move to `docs/archive/`.

## Delete

Stale, empty, misleading, or duplicate documents with no historical value.

## Non-docs source-of-truth recommendations

Knowledge that should be moved, encoded, or verified in code, tests, types, scripts, or CI.

## Suggested next steps

A short ordered list of practical changes.
```

Prefer concrete file paths and concise reasons over broad commentary.
