---
name: agent-memory
description: "Use this skill to read, write, update, search, or organize repo-local Markdown memory notes so project-specific context can be resumed across conversations. Use when the user asks to remember, save, recall, or clean up notes, and also proactively when durable project knowledge, restart points, decisions, gotchas, solved problems, or in-progress context should be preserved or checked before related work."
---

# Agent Memory

A persistent memory space for storing knowledge that survives across conversations.

**Location:** `.agents/skills/agent-memory/memories/`

## Proactive Usage

Save memories when you discover something worth preserving:

- Research findings that took effort to uncover
- Non-obvious patterns or gotchas in the codebase
- Solutions to tricky problems
- Architectural decisions and their rationale
- In-progress work that may be resumed later

Check memories when starting related work:

- Before investigating a problem area
- When working on a feature you've touched before
- When resuming work after a conversation break

Organize memories when needed:

- Consolidate scattered memories on the same topic
- Remove outdated or superseded information
- Update status field when work completes, gets blocked, or is abandoned

## Folder Structure

When possible, organize memories into category folders. No predefined structure - create categories that make sense for the content.

Guidelines:

- Use kebab-case for folder and file names.
- Consolidate or reorganize as the knowledge base evolves.

Example:

```text
memories/
├─ file-processing/
│  ├─ large-file-memory-issue.md
│  └─ supported-encoding-decisions.md
├─ dependencies/
│  └─ iconv-esm-problem.md
└─ project-context/
    └─ deployment-constraints.md
```

This is just an example. Structure freely based on actual content.

## Frontmatter

All memories must include frontmatter with a `summary` field. The summary should be concise enough to determine whether to read the full content.

**Summary is the decision point**: Agents scan summaries via `rg "^summary:"` to decide which memories to read in full. Write summaries that contain enough context to make this decision - what the memory is about, the key problem or topic, and why it matters.

**Required:**

```yaml
---
summary: "1-2 line description of what this memory contains"
created: 2025-01-15 # YYYY-MM-DD format
---
```

**Optional:**

```yaml
---
summary: "Worker thread memory leak during large file processing - cause and solution"
created: 2025-01-15
updated: 2025-01-20
status: in-progress # in-progress | resolved | blocked | abandoned
tags: [performance, worker, memory-leak]
related: [src/core/file/fileProcessor.ts]
---
```

## Search Workflow

Use a summary-first approach to efficiently find relevant memories.

Memory files are intentionally gitignored. Use shell commands in this workflow, such as `rg` and `ls`, and always include `--no-ignore --hidden` immediately after `rg` when searching or listing memories with ripgrep.

```bash
# 1. List categories
ls .agents/skills/agent-memory/memories/

# 2. List memory files with ripgrep
rg --no-ignore --hidden --files .agents/skills/agent-memory/memories/

# 3. View all summaries
rg --no-ignore --hidden "^summary:" .agents/skills/agent-memory/memories/

# 4. Search summaries for keyword
rg --no-ignore --hidden -i "^summary:.*keyword" .agents/skills/agent-memory/memories/

# 5. Search by tag
rg --no-ignore --hidden -i "^tags:.*keyword" .agents/skills/agent-memory/memories/

# 6. Full-text search when summary/tag search is not enough
rg --no-ignore --hidden -i "keyword" .agents/skills/agent-memory/memories/

# 7. Read specific memory file if relevant
```

## Operations

### Save

1. Determine appropriate category for the content.
2. Check if existing category fits, or create new one.
3. Write file with required frontmatter (use `date +%Y-%m-%d` for current date).

```bash
mkdir -p .agents/skills/agent-memory/memories/category-name/
# Note: Check if file exists before writing to avoid accidental overwrites
cat > .agents/skills/agent-memory/memories/category-name/filename.md << 'EOF'
---
summary: "Brief description of this memory"
created: 2025-01-15
---

# Title

Content here...
EOF
```

### Maintain

- **Update**: When information changes, update the content and add `updated` field to frontmatter.
- **Delete**: Remove memories that are no longer relevant.
  ```bash
  trash .agents/skills/agent-memory/memories/category-name/filename.md
  # Remove empty category folders
  rmdir .agents/skills/agent-memory/memories/category-name/ 2>/dev/null || true
  ```
- **Consolidate**: Merge related memories when they grow.
- **Reorganize**: Move memories to better-fitting categories as the knowledge base evolves.

## Guidelines

1. **Write for handoff**: Memories exist so another agent can resume the work later. Capture all key points needed to continue without access to the original conversation - decisions made, reasons why, current state, and next steps.
2. **Write self-contained notes**: Assume the receiving agent has no prior context. Include enough information to understand and act on the content.
3. **Keep summaries decisive**: The summary should help a receiving agent decide whether the full memory is relevant before reading it.
4. **Stay current**: Update or delete outdated information.
5. **Be practical**: Save what's actually useful, not everything.

## Content Reference

When writing detailed memories, consider including:

- **Context**: Goal, background, constraints
- **State**: What's done, in progress, or blocked
- **Details**: Key files, commands, code snippets
- **Next steps**: What to do next, open questions

Not all memories need all sections - use what's relevant.
