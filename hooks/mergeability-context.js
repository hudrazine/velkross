import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hookDir = dirname(fileURLToPath(import.meta.url));
const instructionPath = join(hookDir, "mergeability-first-engineering.md");
const supportedEvents = new Set(["SessionStart", "SubagentStart"]);

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function resolveHookEventName() {
  const input = readStdin().trim();
  if (!input) {
    return "SessionStart";
  }

  const parsed = JSON.parse(input);
  const hookEventName = parsed?.hook_event_name;

  if (!supportedEvents.has(hookEventName)) {
    throw new Error(`Unsupported hook event: ${String(hookEventName)}`);
  }

  return hookEventName;
}

try {
  const hookEventName = resolveHookEventName();
  const additionalContext = readFileSync(instructionPath, "utf8").trim();

  process.stdout.write(
    `${JSON.stringify({
      continue: true,
      hookSpecificOutput: {
        hookEventName,
        additionalContext,
      },
    })}\n`,
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to load mergeability instructions: ${message}\n`);
  process.exitCode = 1;
}
