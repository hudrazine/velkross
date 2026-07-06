import { readFileSync } from "node:fs";

import { expect, test } from "vite-plus/test";

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

const claudeCodeHookCommand = {
  type: "command",
  command: "node",
  args: ["${CLAUDE_PLUGIN_ROOT}/hooks/mergeability-context.js", "--harness", "claude-code"],
  statusMessage: "Loading mergeability context",
};

test("declares a Claude Code plugin manifest", () => {
  expect(readJson("../.claude-plugin/plugin.json")).toMatchObject({
    name: "velkross",
    description: "Mergeability-first engineering guidance and skills for Claude Code.",
    skills: "./skills/",
    hooks: "./hooks/claude-hooks.json",
  });
});

test("declares Claude Code hooks for mergeability context", () => {
  expect(readJson("../hooks/claude-hooks.json")).toEqual({
    hooks: {
      SessionStart: [
        {
          matcher: "startup|resume|clear|compact",
          hooks: [claudeCodeHookCommand],
        },
      ],
      SubagentStart: [
        {
          hooks: [claudeCodeHookCommand],
        },
      ],
    },
  });
});
