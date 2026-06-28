---
name: agent-memory
description: "Use this skill to read, write, update, search, or organize repo-local Markdown memory notes so project-specific context can be resumed across conversations. Use when the user asks to remember, save, recall, or clean up notes, and also proactively when durable project knowledge, restart points, decisions, gotchas, solved problems, or in-progress context should be preserved or checked before related work."
---

# Agent Memory

A persistent memory space for storing knowledge that survives across conversations.

## Memory Root

Store memories in `<repository root>/.memories/`.

- If `.memories/` does not exist, treat it as empty.
- Create `.memories/` only when saving a memory.
- Memory files are project-local and intentionally gitignored.

## Workflow

1. Check relevant memories before related work, especially when investigating a familiar area or resuming interrupted work.
2. Save durable project context after useful discoveries, non-obvious fixes, architectural decisions, gotchas, or handoff-worthy in-progress work.
3. Maintain existing memories when facts change, work completes, or scattered notes should be consolidated.

## Find Memories

Use a summary-first approach. The `summary` frontmatter is the decision point for whether to read the full memory.

If `rg` is available, include `--no-ignore --hidden` when searching `.memories/`, because memory files are normally gitignored.

```bash
rg --no-ignore --hidden "^summary:" .memories/
rg --no-ignore --hidden -i "^summary:.*keyword" .memories/
rg --no-ignore --hidden -i "^tags:.*keyword" .memories/
rg --no-ignore --hidden -i "keyword" .memories/
```

Read the relevant files after the summary or tag search identifies likely matches.

## Write Memories

Before saving a new memory, search existing summaries to avoid duplicates. Update or consolidate an existing memory when it already covers the same topic.

Use category folders when they help retrieval. Use kebab-case for folder and file names.

```text
.memories/
|-- file-processing/
|   |-- large-file-memory-issue.md
|   `-- supported-encoding-decisions.md
|-- dependencies/
|   `-- iconv-esm-problem.md
`-- project-context/
    `-- deployment-constraints.md
```

All memories must include frontmatter with a `summary` field. The summary should be concise enough to determine whether to read the full content.

Write summaries with enough context to identify the topic, the key problem or decision, and why it matters.

**Required:**

```yaml
---
summary: "1-2 line description of what this memory contains"
created: 2026-06-13
---
```

Use the current date in `YYYY-MM-DD` format for `created` and `updated`.

**Optional:**

```yaml
---
summary: "Worker thread memory leak during large file processing - cause and solution"
created: 2026-06-13
updated: 2026-06-18
status: in-progress # in-progress | resolved | blocked | abandoned
tags: [performance, worker, memory-leak]
related: [src/core/file/fileProcessor.ts]
---
```

Use any available file-editing method to create or update Markdown files. Check whether the target file already exists before writing to avoid accidental overwrites.

Write each memory so another agent can resume without the original conversation. Capture the key context, decisions, rationale, current state, and next steps.

Useful sections include:

- **Context**: Goal, background, constraints
- **State**: What's done, in progress, or blocked
- **Details**: Key files, commands, code snippets
- **Next steps**: What to do next, open questions

Not all memories need all sections. Save what is useful, not everything.

## Maintain Memories

- **Update**: When information changes, update the content and add or refresh the `updated` field.
- **Status**: Use `status` for work state when helpful: `in-progress`, `resolved`, `blocked`, or `abandoned`.
- **Consolidate**: Merge related memories when multiple notes cover the same topic.
- **Reorganize**: Move memories to better-fitting categories as the knowledge base evolves.
- **Delete**: Remove memories that are no longer relevant, using the available file operation for the environment.
