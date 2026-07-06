import { readFileSync, readSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hookDir = dirname(fileURLToPath(import.meta.url));
const instructionPath = join(hookDir, "mergeability-first-engineering.md");
const supportedEvents = new Set(["SessionStart", "SubagentStart"]);
const maxStdinBytes = 64 * 1024;
const stdinChunkBytes = 8 * 1024;

class StdinSizeLimitError extends Error {}

function readStdin() {
  const chunks = [];
  const buffer = Buffer.alloc(stdinChunkBytes);
  let totalBytes = 0;

  try {
    while (true) {
      const bytesRead = readSync(0, buffer, 0, buffer.length, null);

      if (bytesRead === 0) {
        break;
      }

      totalBytes += bytesRead;

      if (totalBytes > maxStdinBytes) {
        throw new StdinSizeLimitError(`Hook input exceeds ${maxStdinBytes} bytes`);
      }

      chunks.push(Buffer.from(buffer.subarray(0, bytesRead)));
    }
  } catch (error) {
    if (error instanceof StdinSizeLimitError) {
      throw error;
    }

    return "";
  }

  return Buffer.concat(chunks, totalBytes).toString("utf8");
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
