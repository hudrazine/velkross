import { readFileSync, readSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createClaudeCodeHookOutput,
  createCodexHookOutput,
  resolveHookEventName,
} from "./hook-runtime.js";
import { readStdinText } from "./hook-stdio.js";

const hookDir = dirname(fileURLToPath(import.meta.url));
const instructionPath = join(hookDir, "mergeability-first-engineering.md");

function resolveHarness(args) {
  const harnessIndex = args.indexOf("--harness");

  if (harnessIndex === -1) {
    return "codex";
  }

  const harness = args[harnessIndex + 1];

  if (harness === "codex" || harness === "claude-code") {
    return harness;
  }

  throw new Error(`Unsupported harness: ${String(harness)}`);
}

try {
  const harness = resolveHarness(process.argv.slice(2));
  const hookEventName = resolveHookEventName(readStdinText(readSync));
  const additionalContext = readFileSync(instructionPath, "utf8").trim();
  const createOutput =
    harness === "claude-code" ? createClaudeCodeHookOutput : createCodexHookOutput;
  const output = createOutput({ hookEventName, additionalContext });

  process.stdout.write(`${JSON.stringify(output)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to load mergeability instructions: ${message}\n`);
  process.exitCode = 1;
}
