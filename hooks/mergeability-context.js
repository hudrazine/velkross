import { readFileSync, readSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createHookOutput, resolveHookEventName } from "./hook-runtime.js";
import { readStdinText } from "./hook-stdio.js";

const hookDir = dirname(fileURLToPath(import.meta.url));
const instructionPath = join(hookDir, "mergeability-first-engineering.md");

try {
  const hookEventName = resolveHookEventName(readStdinText(readSync));
  const additionalContext = readFileSync(instructionPath, "utf8").trim();
  const output = createHookOutput({ hookEventName, additionalContext });

  process.stdout.write(`${JSON.stringify(output)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to load mergeability instructions: ${message}\n`);
  process.exitCode = 1;
}
