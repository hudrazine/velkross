#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, posix, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_FIELDS = ["summary", "doc_type", "status", "updated"];
const ALLOWED_FIELDS = new Set([...REQUIRED_FIELDS, "tags", "related", "superseded_by"]);
const DOC_TYPES = new Set([
  "product",
  "spec",
  "architecture",
  "decision",
  "development",
  "testing",
  "operations",
  "security",
  "glossary",
  "reference",
]);
const STATUSES = new Set(["draft", "active", "deprecated", "archived"]);
const SUPERSEDED_SOURCE_STATUSES = new Set(["deprecated", "archived"]);

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function compareText(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function fileIdentity(path) {
  return realpathSync.native(path);
}

function normalizeSummary(summary) {
  return summary.trim().normalize("NFC").toLowerCase();
}

function issue(file, field, code, message) {
  return { file, field, code, message };
}

function collectMarkdownFiles(root) {
  const files = [];
  const errors = [];

  function visit(directory) {
    const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) =>
      compareText(left.name, right.name),
    );

    for (const entry of entries) {
      const path = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) {
        errors.push(
          issue(
            toPosixPath(relative(root, path)),
            "path",
            "unsupported-symbolic-link",
            "symbolic links and junctions are not supported under .dev-docs",
          ),
        );
      } else if (entry.isDirectory()) {
        visit(path);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(path);
      }
    }
  }

  visit(root);
  return { files, errors };
}

function parseFrontmatter(file, root) {
  const fileName = toPosixPath(relative(root, file));
  const errors = [];
  const text = readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);

  if (lines[0] !== "---") {
    errors.push(
      issue(
        fileName,
        "frontmatter",
        "missing-frontmatter",
        "must start with an exact '---' delimiter",
      ),
    );
    return { file, fileName, metadata: undefined, errors };
  }

  const closingDelimiter = lines.indexOf("---", 1);
  if (closingDelimiter === -1) {
    errors.push(
      issue(
        fileName,
        "frontmatter",
        "unclosed-frontmatter",
        "must end with an exact '---' delimiter",
      ),
    );
    return { file, fileName, metadata: undefined, errors };
  }

  const metadata = {};
  const seenFields = new Set();

  for (let index = 1; index < closingDelimiter; index += 1) {
    const line = lines[index];
    if (line.trim() === "") continue;

    const match = /^([a-z][a-z0-9_]*):\s+(.+)$/.exec(line);
    if (!match) {
      errors.push(
        issue(
          fileName,
          `line ${index + 1}`,
          "unsupported-syntax",
          "must use an unindented 'key: JSON-compatible value' entry",
        ),
      );
      continue;
    }

    const [, key, source] = match;
    if (!ALLOWED_FIELDS.has(key)) {
      errors.push(issue(fileName, key, "unknown-field", "is not supported by the metadata schema"));
      continue;
    }

    if (seenFields.has(key)) {
      errors.push(issue(fileName, key, "duplicate-field", "must appear at most once"));
      continue;
    }
    seenFields.add(key);

    try {
      metadata[key] = JSON.parse(source);
    } catch {
      errors.push(
        issue(
          fileName,
          key,
          "invalid-value-syntax",
          "must be a JSON-compatible quoted string or inline array",
        ),
      );
    }
  }

  for (const field of REQUIRED_FIELDS) {
    if (!seenFields.has(field)) {
      errors.push(issue(fileName, field, "missing-field", "is required"));
    }
  }

  validateString(metadata, "summary", fileName, errors);
  if (typeof metadata.summary === "string" && /[\r\n]/.test(metadata.summary)) {
    errors.push(
      issue(fileName, "summary", "multiline-summary", "must remain on one searchable line"),
    );
  }

  validateEnum(metadata, "doc_type", DOC_TYPES, fileName, errors);
  validateEnum(metadata, "status", STATUSES, fileName, errors);

  if (Object.hasOwn(metadata, "updated")) {
    validateDate(metadata.updated, "updated", fileName, errors);
  }

  for (const field of ["tags", "related"]) {
    if (Object.hasOwn(metadata, field)) {
      validateStringArray(metadata[field], field, fileName, errors);
    }
  }

  if (Object.hasOwn(metadata, "superseded_by")) {
    validateString(metadata, "superseded_by", fileName, errors);
  }

  const archivedLocation = fileName.startsWith("archive/");
  if (metadata.status === "archived" && !archivedLocation) {
    errors.push(
      issue(fileName, "status", "archived-location", "requires the document to be under archive/"),
    );
  } else if (archivedLocation && metadata.status !== "archived") {
    errors.push(
      issue(
        fileName,
        "status",
        "archive-status",
        "must be 'archived' for documents under archive/",
      ),
    );
  }

  return { file, fileName, metadata, errors };
}

function validateString(metadata, field, fileName, errors) {
  if (!Object.hasOwn(metadata, field)) return;

  if (typeof metadata[field] !== "string" || metadata[field].trim() === "") {
    errors.push(issue(fileName, field, "invalid-string", "must be a non-empty quoted string"));
  }
}

function validateEnum(metadata, field, allowed, fileName, errors) {
  if (!Object.hasOwn(metadata, field)) return;

  if (typeof metadata[field] !== "string" || !allowed.has(metadata[field])) {
    errors.push(
      issue(fileName, field, "invalid-enum", `must be one of: ${[...allowed].join(", ")}`),
    );
  }
}

function validateDate(value, field, fileName, errors) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    errors.push(issue(fileName, field, "invalid-date", "must be a quoted YYYY-MM-DD date"));
    return;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    errors.push(issue(fileName, field, "invalid-date", "must be a real calendar date"));
  }
}

function validateStringArray(value, field, fileName, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(
      issue(fileName, field, "invalid-array", "must be a non-empty inline array of strings"),
    );
    return;
  }

  const seen = new Set();
  for (const entry of value) {
    if (typeof entry !== "string" || entry.trim() === "") {
      errors.push(
        issue(fileName, field, "invalid-array-entry", "must contain only non-empty strings"),
      );
      continue;
    }

    if (seen.has(entry)) {
      errors.push(issue(fileName, field, "duplicate-array-entry", `contains duplicate '${entry}'`));
    }
    seen.add(entry);
  }
}

function isOutsideRoot(root, target) {
  const relativeTarget = relative(root, target);
  return (
    relativeTarget === ".." || relativeTarget.startsWith(`..${sep}`) || isAbsolute(relativeTarget)
  );
}

function validateReferencePath(root, rootIdentity, document, field, value, errors) {
  if (typeof value !== "string" || value.trim() === "") return undefined;

  const segments = value.split("/");
  if (
    value.includes("\\") ||
    posix.isAbsolute(value) ||
    /^[A-Za-z]:/.test(value) ||
    segments.some((segment) => segment === "" || segment === "." || segment === "..") ||
    !value.toLowerCase().endsWith(".md")
  ) {
    errors.push(
      issue(
        document.fileName,
        field,
        "invalid-reference-path",
        "must be a forward-slash Markdown path relative to .dev-docs/ without '.' or '..' segments",
      ),
    );
    return undefined;
  }

  const target = resolve(root, ...segments);
  if (isOutsideRoot(root, target)) {
    errors.push(
      issue(document.fileName, field, "reference-outside-root", "must remain inside .dev-docs/"),
    );
    return undefined;
  }

  if (!existsSync(target) || !statSync(target).isFile()) {
    errors.push(
      issue(document.fileName, field, "missing-reference", `target '${value}' does not exist`),
    );
    return undefined;
  }

  const targetIdentity = fileIdentity(target);
  if (isOutsideRoot(rootIdentity, targetIdentity)) {
    errors.push(
      issue(document.fileName, field, "reference-outside-root", "must resolve inside .dev-docs/"),
    );
    return undefined;
  }

  if (fileIdentity(document.file) === targetIdentity) {
    errors.push(issue(document.fileName, field, "self-reference", "must not reference itself"));
    return undefined;
  }

  return targetIdentity;
}

function validateSupersession(root, rootIdentity, document, documentsByPath, errors) {
  const value = document.metadata.superseded_by;
  const sourceStatus = document.metadata.status;

  if (STATUSES.has(sourceStatus) && !SUPERSEDED_SOURCE_STATUSES.has(sourceStatus)) {
    errors.push(
      issue(
        document.fileName,
        "superseded_by",
        "invalid-superseded-source-status",
        "is allowed only when status is 'deprecated' or 'archived'",
      ),
    );
  }

  const targetIdentity = validateReferencePath(
    root,
    rootIdentity,
    document,
    "superseded_by",
    value,
    errors,
  );
  if (!targetIdentity) return;

  const target = documentsByPath.get(targetIdentity);
  if (!target?.metadata || target.errors.length > 0) {
    errors.push(
      issue(
        document.fileName,
        "superseded_by",
        "invalid-superseded-target-metadata",
        `target '${value}' must have valid metadata`,
      ),
    );
    return;
  }

  if (target.metadata.status !== "active") {
    errors.push(
      issue(
        document.fileName,
        "superseded_by",
        "invalid-superseded-target-status",
        `target '${value}' must have status 'active'`,
      ),
    );
  }
}

function validateDocumentReferences(root, rootIdentity, document, documentsByPath, errors) {
  if (!document.metadata) return;

  if (Array.isArray(document.metadata.related)) {
    for (const path of document.metadata.related) {
      validateReferencePath(root, rootIdentity, document, "related", path, errors);
    }
  }

  if (Object.hasOwn(document.metadata, "superseded_by")) {
    validateSupersession(root, rootIdentity, document, documentsByPath, errors);
  }
}

export function validateDevDocs(rootPath) {
  const root = resolve(rootPath);
  if (!existsSync(root)) {
    return { root, documentCount: 0, errors: [], warnings: [] };
  }

  if (!statSync(root).isDirectory()) {
    throw new Error(`Development-docs root is not a directory: ${root}`);
  }

  const rootIdentity = fileIdentity(root);
  const collection = collectMarkdownFiles(root);
  const documents = collection.files.map((file) => parseFrontmatter(file, root));
  const documentsByPath = new Map(
    documents.map((document) => [fileIdentity(document.file), document]),
  );
  const errors = [...collection.errors, ...documents.flatMap((document) => document.errors)];
  const warnings = [];

  for (const document of documents) {
    validateDocumentReferences(root, rootIdentity, document, documentsByPath, errors);
  }

  const summaries = new Map();
  for (const document of documents) {
    const hasSummaryError = document.errors.some(({ field }) => field === "summary");
    if (hasSummaryError || typeof document.metadata?.summary !== "string") continue;

    const normalized = normalizeSummary(document.metadata.summary);
    const previous = summaries.get(normalized);
    if (previous) {
      warnings.push(
        issue(
          document.fileName,
          "summary",
          "duplicate-summary",
          `duplicates the summary in '${previous}'`,
        ),
      );
    } else {
      summaries.set(normalized, document.fileName);
    }
  }

  return { root, documentCount: documents.length, errors, warnings };
}

function formatIssue(level, item) {
  return `${level}: ${item.file}: ${item.field}: ${item.message} [${item.code}]`;
}

export function runCli(args = process.argv.slice(2)) {
  if (args.length > 1) {
    console.error("Usage: validate-dev-docs.mjs [path-to-.dev-docs]");
    return 2;
  }

  const root = resolve(args[0] ?? ".dev-docs");

  try {
    const result = validateDevDocs(root);

    for (const warning of result.warnings) {
      console.error(formatIssue("warning", warning));
    }
    for (const error of result.errors) {
      console.error(formatIssue("error", error));
    }

    if (result.errors.length > 0) {
      console.error(
        `FAILED: ${result.errors.length} error(s), ${result.warnings.length} warning(s), ${result.documentCount} document(s) checked.`,
      );
      return 1;
    }

    console.log(
      `OK: ${result.documentCount} document(s) checked with ${result.warnings.length} warning(s).`,
    );
    return 0;
  } catch (error) {
    console.error(`Validator error: ${error instanceof Error ? error.message : String(error)}`);
    return 2;
  }
}

const invokedUrl = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : undefined;
if (invokedUrl === import.meta.url) {
  process.exitCode = runCli();
}
