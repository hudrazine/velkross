const supportedEvents = new Set(["SessionStart", "SubagentStart"]);

export function resolveHookEventName(inputText) {
  const input = inputText.trim();
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

export function createCodexHookOutput({ hookEventName, additionalContext }) {
  return {
    continue: true,
    hookSpecificOutput: {
      hookEventName,
      additionalContext,
    },
  };
}

export function createClaudeCodeHookOutput({ hookEventName, additionalContext }) {
  return {
    hookSpecificOutput: {
      hookEventName,
      additionalContext,
    },
  };
}
