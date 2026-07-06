import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { expect, test } from "vite-plus/test";

const command = process.execPath;
const scriptPath = fileURLToPath(new URL("../hooks/mergeability-context.js", import.meta.url));
const instructionPath = new URL("../hooks/mergeability-first-engineering.md", import.meta.url);

function runHook(input) {
  return spawnSync(command, [scriptPath], {
    encoding: "utf8",
    input,
  });
}

test("emits mergeability context for empty stdin", () => {
  const result = runHook("");
  const expectedContext = readFileSync(instructionPath, "utf8").trim();

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
  expect(result.stdout.endsWith("\n")).toBe(true);
  expect(JSON.parse(result.stdout)).toEqual({
    continue: true,
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: expectedContext,
    },
  });
});

test("reports unsupported hook events", () => {
  const result = runHook('{"hook_event_name":"Stop"}');

  expect(result.status).toBe(1);
  expect(result.stdout).toBe("");
  expect(result.stderr).toContain(
    "Failed to load mergeability instructions: Unsupported hook event: Stop",
  );
});
