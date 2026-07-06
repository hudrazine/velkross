import { expect, test } from "vite-plus/test";

import { createHookOutput, resolveHookEventName } from "../hooks/hook-runtime.js";

test("uses SessionStart when hook input is empty", () => {
  expect(resolveHookEventName("")).toBe("SessionStart");
});

test("accepts supported hook event names", () => {
  expect(resolveHookEventName('{"hook_event_name":"SessionStart"}')).toBe("SessionStart");
  expect(resolveHookEventName('{"hook_event_name":"SubagentStart"}')).toBe("SubagentStart");
});

test("rejects unsupported hook event names", () => {
  expect(() => resolveHookEventName('{"hook_event_name":"Stop"}')).toThrow(
    "Unsupported hook event: Stop",
  );
});

test("rejects hook input without an event name", () => {
  expect(() => resolveHookEventName("{}")).toThrow("Unsupported hook event: undefined");
});

test("throws for invalid JSON hook input", () => {
  expect(() => resolveHookEventName("{")).toThrow();
});

test("creates Codex hook output with mergeability context", () => {
  expect(
    createHookOutput({
      hookEventName: "SubagentStart",
      additionalContext: "Mergeability-first Engineering",
    }),
  ).toEqual({
    continue: true,
    hookSpecificOutput: {
      hookEventName: "SubagentStart",
      additionalContext: "Mergeability-first Engineering",
    },
  });
});
