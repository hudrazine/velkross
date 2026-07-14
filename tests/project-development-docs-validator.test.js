import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { expect, test } from "vite-plus/test";

import {
  runCli,
  validateDevDocs,
} from "../skills/project-development-docs/scripts/validate-dev-docs.mjs";

function withTemporaryDirectory(run) {
  const directory = mkdtempSync(join(tmpdir(), "velkross-dev-docs-"));
  try {
    return run(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

function writeDocument(root, path, frontmatter, body = "# Document\n") {
  const file = join(root, ...path.split("/"));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `---\n${frontmatter}\n---\n\n${body}`, "utf8");
}

function validFrontmatter({
  summary,
  docType = "architecture",
  status = "active",
  updated = "2026-07-14",
  extra = [],
}) {
  return [
    `summary: ${JSON.stringify(summary)}`,
    `doc_type: ${JSON.stringify(docType)}`,
    `status: ${JSON.stringify(status)}`,
    `updated: ${JSON.stringify(updated)}`,
    ...extra,
  ].join("\n");
}

test("treats a missing development-docs root as valid and empty", () => {
  withTemporaryDirectory((directory) => {
    const result = validateDevDocs(join(directory, ".dev-docs"));

    expect(result).toMatchObject({ documentCount: 0, errors: [], warnings: [] });
  });
});

test("accepts the supported metadata schema and valid document references", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "architecture/current.md",
      [
        'summary: "Explains the current plugin loading boundary."',
        'doc_type: "architecture"',
        'status: "active"',
        'updated: "2026-07-13"',
        'tags: ["plugins", "loading"]',
      ].join("\n"),
    );
    writeDocument(
      root,
      "decisions/old-loader.md",
      [
        'summary: "Preserves the rejected loader design and its tradeoffs."',
        'doc_type: "decision"',
        'status: "deprecated"',
        'updated: "2026-07-13"',
        'related: ["architecture/current.md"]',
        'superseded_by: "architecture/current.md"',
      ].join("\n"),
    );

    expect(validateDevDocs(root)).toMatchObject({
      documentCount: 2,
      errors: [],
      warnings: [],
    });
  });
});

test("reports malformed, missing, unknown, and invalid metadata fields", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "invalid.md",
      [
        "summary: unquoted summary",
        'doc_type: "unknown"',
        'status: "active"',
        'updated: "2026-02-30"',
        'tags: ["duplicate", "duplicate"]',
        'owner: "agent"',
      ].join("\n"),
    );

    const codes = validateDevDocs(root).errors.map(({ code }) => code);

    expect(codes).toEqual(
      expect.arrayContaining([
        "invalid-value-syntax",
        "missing-field",
        "invalid-enum",
        "invalid-date",
        "duplicate-array-entry",
        "unknown-field",
      ]),
    );
  });
});

test("requires updated metadata", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "missing-updated.md",
      [
        'summary: "Omits the required modification date."',
        'doc_type: "architecture"',
        'status: "active"',
      ].join("\n"),
    );

    expect(validateDevDocs(root).errors).toContainEqual(
      expect.objectContaining({
        code: "missing-field",
        field: "updated",
        file: "missing-updated.md",
      }),
    );
  });
});

test("enforces archive state and safe resolvable metadata paths", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "archive/old.md",
      validFrontmatter({
        summary: "Preserves an earlier architecture.",
        extra: ['related: ["../outside.md", "missing.md"]', 'superseded_by: "archive/old.md"'],
      }),
    );
    writeDocument(
      root,
      "current.md",
      validFrontmatter({
        summary: "Incorrectly marks current guidance as archived.",
        status: "archived",
      }),
    );

    const codes = validateDevDocs(root).errors.map(({ code }) => code);

    expect(codes).toEqual(
      expect.arrayContaining([
        "archive-status",
        "archived-location",
        "invalid-reference-path",
        "missing-reference",
        "self-reference",
      ]),
    );
  });
});

test("rejects self references through filesystem-equivalent paths", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "current.md",
      validFrontmatter({
        summary: "Explains current guidance.",
        extra: ['related: ["CURRENT.md"]'],
      }),
    );

    const codes = validateDevDocs(root).errors.map(({ code }) => code);
    const expectedCode = existsSync(join(root, "CURRENT.md"))
      ? "self-reference"
      : "missing-reference";

    expect(codes).toContain(expectedCode);
  });
});

test("rejects references that resolve outside the development-docs root", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    const outsideRoot = join(directory, "outside");
    writeDocument(
      outsideRoot,
      "external.md",
      validFrontmatter({ summary: "Lives outside the development-docs root." }),
    );
    writeDocument(
      root,
      "current.md",
      validFrontmatter({
        summary: "References development documentation.",
        extra: ['related: ["linked/external.md"]'],
      }),
    );
    symlinkSync(
      outsideRoot,
      join(root, "linked"),
      process.platform === "win32" ? "junction" : "dir",
    );

    expect(validateDevDocs(root).errors).toContainEqual(
      expect.objectContaining({
        code: "reference-outside-root",
        field: "related",
        file: "current.md",
      }),
    );
  });
});

test("accepts archived documents superseded by active documents", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "current.md",
      validFrontmatter({ summary: "Explains the current architecture." }),
    );
    writeDocument(
      root,
      "archive/old.md",
      validFrontmatter({
        summary: "Preserves the historical architecture.",
        status: "archived",
        extra: ['superseded_by: "current.md"'],
      }),
    );

    expect(validateDevDocs(root)).toMatchObject({ errors: [], warnings: [] });
  });
});

test("allows superseded_by only on deprecated or archived documents", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "replacement.md",
      validFrontmatter({ summary: "Explains the replacement architecture." }),
    );

    for (const status of ["active", "draft"]) {
      writeDocument(
        root,
        `${status}.md`,
        validFrontmatter({
          summary: `Exercises supersession from ${status} guidance.`,
          status,
          extra: ['superseded_by: "replacement.md"'],
        }),
      );
    }

    const errors = validateDevDocs(root).errors.filter(
      ({ code }) => code === "invalid-superseded-source-status",
    );

    expect(errors).toHaveLength(2);
    expect(errors.map(({ file }) => file)).toEqual(["active.md", "draft.md"]);
  });
});

test("requires superseded targets to have valid active metadata", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "deprecated-target.md",
      validFrontmatter({
        summary: "Preserves deprecated target guidance.",
        status: "deprecated",
      }),
    );
    writeDocument(
      root,
      "archive/archived-target.md",
      validFrontmatter({
        summary: "Preserves archived target guidance.",
        status: "archived",
      }),
    );
    writeDocument(
      root,
      "invalid-target.md",
      [
        'summary: "Has incomplete target metadata."',
        'status: "active"',
        'updated: "2026-07-14"',
      ].join("\n"),
    );

    for (const [name, target] of [
      ["to-deprecated", "deprecated-target.md"],
      ["to-archived", "archive/archived-target.md"],
      ["to-invalid", "invalid-target.md"],
    ]) {
      writeDocument(
        root,
        `${name}.md`,
        validFrontmatter({
          summary: `Preserves source guidance for ${name}.`,
          status: "deprecated",
          extra: [`superseded_by: ${JSON.stringify(target)}`],
        }),
      );
    }

    const codes = validateDevDocs(root).errors.map(({ code }) => code);

    expect(codes.filter((code) => code === "invalid-superseded-target-status")).toHaveLength(2);
    expect(codes.filter((code) => code === "invalid-superseded-target-metadata")).toHaveLength(1);
  });
});

test("reports Unicode-equivalent duplicate summaries as non-blocking warnings", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "composed.md",
      validFrontmatter({ summary: "Explains the Café architecture." }),
    );
    writeDocument(
      root,
      "decomposed.md",
      validFrontmatter({ summary: "Explains the Café architecture." }),
    );

    const result = validateDevDocs(root);

    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([
      expect.objectContaining({ code: "duplicate-summary", file: "decomposed.md" }),
    ]);
    expect(runCli([root])).toBe(0);
  });
});

test("does not report duplicate warnings for structurally invalid summaries", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    for (const file of ["first.md", "second.md"]) {
      writeDocument(
        root,
        file,
        [
          'summary: ""',
          'doc_type: "architecture"',
          'status: "active"',
          'updated: "2026-07-14"',
        ].join("\n"),
      );
    }

    const result = validateDevDocs(root);

    expect(result.errors.filter(({ field }) => field === "summary")).toHaveLength(2);
    expect(result.warnings).toEqual([]);
  });
});

test("orders validation results by deterministic code-unit filename order", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    for (const file of ["ä.md", "z.md"]) {
      writeDocument(
        root,
        file,
        [
          'summary: "Missing document type metadata."',
          'status: "active"',
          'updated: "2026-07-14"',
        ].join("\n"),
      );
    }

    const missingDocTypeFiles = validateDevDocs(root)
      .errors.filter(({ code, field }) => code === "missing-field" && field === "doc_type")
      .map(({ file }) => file);

    expect(missingDocTypeFiles).toEqual(["z.md", "ä.md"]);
  });
});

test("returns stable CLI exit codes", () => {
  withTemporaryDirectory((directory) => {
    const root = join(directory, ".dev-docs");
    writeDocument(
      root,
      "invalid.md",
      ['summary: "Missing required metadata."', 'status: "active"', 'updated: "2026-07-14"'].join(
        "\n",
      ),
    );

    expect(runCli([root])).toBe(1);
    expect(runCli([root, "extra-argument"])).toBe(2);
    expect(runCli([join(directory, "missing")])).toBe(0);
  });
});
