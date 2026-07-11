import { existsSync, readFileSync } from "node:fs";

import { expect, test } from "vite-plus/test";

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

function readText(path) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

function fileExists(path) {
  return existsSync(new URL(path, import.meta.url));
}

test("declares Cursor plugin entrypoints", () => {
  expect(readJson("../.cursor-plugin/plugin.json")).toMatchObject({
    version: "0.1.0",
    skills: "./skills/",
    rules: "./rules/",
  });
});

test("uses the Cursor single-plugin repository layout", () => {
  expect(fileExists("../.cursor-plugin/marketplace.json")).toBe(false);
});

test("does not declare Cursor hooks", () => {
  expect(fileExists("../hooks/hooks.json")).toBe(false);
});

test("declares an always-applied Cursor rule for mergeability guidance", () => {
  const rule = readText("../rules/mergeability-first-engineering.mdc");
  const instruction = readText("../hooks/mergeability-first-engineering.md");
  const ruleBody = rule.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "");

  expect(rule).toContain(
    'description: "Mergeability-first Engineering guidance for coding agents"',
  );
  expect(rule).toContain("alwaysApply: true");
  expect(ruleBody.trim()).toBe(instruction.trim());
});
