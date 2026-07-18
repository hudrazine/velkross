# Audit Checklist

Use this reference to audit `.dev-docs/` for trust, retrieval, ownership, freshness, and maintainability. An audit is read-only unless the user also asks for fixes.

Report concrete issues rather than turning every checklist item into a finding.

Run the bundled structural validator as specified in [frontmatter.md](frontmatter.md#structural-validation) before performing semantic checks. Include errors and warnings as findings, distinguishing blocking structural errors from non-blocking warnings. Then use this checklist for semantic and maintenance issues that cannot be determined mechanically.

## Retrieval

- Can summaries distinguish documents without reading every body?
- Do summaries use the domain terms likely to appear in related tasks?
- Are misleading or stale summaries detectable from the document body?
- Are filenames and optional category folders specific enough for fallback retrieval?
- Do tags add useful search terms instead of repeating summaries?
- Can active, deprecated, and archived material be distinguished before relying on it?

## Ownership And Scope

- Does each topic have one canonical development document?
- Are user-facing or generated documents incorrectly stored in `.dev-docs/`?
- Does transient or agent-specific context belong in `.memories/` instead?
- Does prose duplicate behavior or constraints owned by code, tests, types, schemas, scripts, configuration, or CI?
- Are rationale and rejected alternatives preserved separately from current-state guidance when useful?

## Metadata

- Does every Markdown document have valid `summary`, `doc_type`, and `status` fields?
- Does metadata agree with the body and current lifecycle state?
- Do deprecated or archived documents identify an active replacement when one exists?
- Do related paths resolve and remain useful?

## Freshness And Verification

- Do current-state claims match the relevant canonical project sources?
- Do specifications distinguish planned, implemented, and unverified behavior?
- Are stale documents updated, deprecated, archived, or deleted according to their remaining value?
- Are unsupported claims and unverified areas visible rather than presented as current fact?

## Content Clarity And Representation

- Does the document make its owned question and current conclusion easy to find?
- Are current, planned, historical, rejected, and unverified claims distinguishable?
- Are important boundaries, invariants, non-goals, failure behavior, and uncertainty explicit?
- Would a table or diagram materially clarify a relationship that is difficult to follow in prose?
- Does each existing diagram answer one useful question at an appropriate scope?
- Do diagrams agree with nearby prose and canonical project sources?
- Is essential meaning available without relying on color, layout, or rendering alone?
- Do tables or diagrams mechanically duplicate code, schemas, configuration, or generated inventories?
- Was rendering or syntax verification performed when practical, and are gaps visible?

## Structure And Lifecycle

- Are independent topics trapped in a catch-all document?
- Are small fragments competing with one another or always read together?
- Do document locations and filenames match their actual purpose?
- Are historical documents stored under `.dev-docs/archive/` and marked `status: "archived"`?
- Do moved, renamed, archived, merged, or deleted documents leave broken references?

## Recommended Output

Use this order and omit empty sections:

1. Summary
2. Keep
3. Add
4. Update
5. Split
6. Merge
7. Move or rename
8. Archive
9. Delete
10. Non-docs source-of-truth recommendations
11. Suggested next steps

Prefer concrete paths, observed evidence, and concise reasons. Separate verified findings from hypotheses or checks that were not possible.
