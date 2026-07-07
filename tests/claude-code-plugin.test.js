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

test("declares Claude Code plugin entrypoints", () => {
  expect(readJson("../.claude-plugin/plugin.json")).toMatchObject({
    skills: "./skills/",
    hooks: "./hooks/claude-hooks.json",
  });
});

test("declares Claude Code marketplace entrypoint", () => {
  expect(readJson("../.claude-plugin/marketplace.json")).toMatchObject({
    name: "velkross",
    owner: {
      name: "Hudrazine",
    },
    plugins: [
      {
        name: "velkross",
        source: "./",
        category: "productivity",
      },
    ],
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
