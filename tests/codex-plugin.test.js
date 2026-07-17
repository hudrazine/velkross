import { readFileSync } from "node:fs";

import { expect, test } from "vite-plus/test";

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

const codexHookCommand = {
  type: "command",
  command: "node ${PLUGIN_ROOT}/hooks/velkross-context.js --harness codex",
  commandWindows:
    "pwsh -NoProfile -Command \"node (Join-Path $env:PLUGIN_ROOT 'hooks/velkross-context.js') --harness codex\"",
  statusMessage: "Loading Velkross guidance",
};

test("declares Codex plugin entrypoints", () => {
  expect(readJson("../.codex-plugin/plugin.json")).toMatchObject({
    version: "0.3.0",
    skills: "./skills/",
    hooks: "./hooks/codex-hooks.json",
  });
});

test("declares Codex hooks with an explicit harness", () => {
  expect(readJson("../hooks/codex-hooks.json")).toEqual({
    hooks: {
      SessionStart: [
        {
          matcher: "startup|resume|clear|compact",
          hooks: [codexHookCommand],
        },
      ],
      SubagentStart: [
        {
          hooks: [codexHookCommand],
        },
      ],
    },
  });
});
