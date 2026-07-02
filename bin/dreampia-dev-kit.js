#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const packageRoot = path.resolve(__dirname, "..");
const packageJson = require(path.join(packageRoot, "package.json"));

const generatedDocTypes = new Set([
  "prd",
  "trd",
  "ia",
  "user-flow",
  "api-spec",
  "erd",
  "qa-checklist",
  "doc-audit-report",
]);

const skipDirectories = new Set([
  ".git",
  ".github",
  ".agents",
  ".claude",
  ".claude-plugin",
  ".codegraph",
  ".codex",
  ".omc",
  "node_modules",
]);

function usage() {
  console.log(`dreampia-dev-kit ${packageJson.version}

Usage:
  dreampia-dev-kit score [--json] <file-or-dir...>
  dreampia-dev-kit audit [--json] [--fail-on critical|major|minor|none] <file-or-dir...>
  dreampia-dev-kit validate [--fail-on critical|major|minor|none] <file-or-dir...>
  dreampia-dev-kit validate-skill-pack
  dreampia-dev-kit version

Commands:
  score                Score generated PRD/TRD/IA/API/ERD/QA/audit Markdown structure.
  audit                Audit generated Markdown docs for security, privacy, and policy risks.
  validate             Run score and audit as one CI-friendly gate.
  validate-skill-pack  Validate the repository skill pack, templates, plugins, and shortcuts.

Directory inputs are scanned recursively. Markdown files with unsupported doc_type values are
ignored when discovered through a directory input, and explicit file inputs are always checked.`);
}

function fail(message, code = 2) {
  console.error(message);
  process.exit(code);
}

function docType(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/^doc_type:\s*([^\n#]+)\s*$/m);
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function isGeneratedDoc(filePath) {
  try {
    return generatedDocTypes.has(docType(filePath));
  } catch {
    return false;
  }
}

function collectMarkdownFiles(inputPath) {
  const resolved = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(resolved)) {
    fail(`Input path does not exist: ${inputPath}`);
  }

  const stats = fs.statSync(resolved);
  if (stats.isFile()) return [resolved];
  if (!stats.isDirectory()) return [];

  const files = [];
  const entries = fs.readdirSync(resolved, { withFileTypes: true }).sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skipDirectories.has(entry.name)) continue;
      files.push(...collectMarkdownFiles(path.join(resolved, entry.name)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const filePath = path.join(resolved, entry.name);
      if (isGeneratedDoc(filePath)) files.push(filePath);
    }
  }

  return files;
}

function expandInputs(inputs) {
  const files = [];
  for (const input of inputs) {
    const resolved = path.resolve(process.cwd(), input);
    if (!fs.existsSync(resolved)) {
      fail(`Input path does not exist: ${input}`);
    }

    const stats = fs.statSync(resolved);
    if (stats.isFile()) {
      files.push(resolved);
      continue;
    }
    files.push(...collectMarkdownFiles(resolved));
  }

  return [...new Set(files)].sort((left, right) => left.localeCompare(right));
}

function runScript(relativeScriptPath, args) {
  const result = spawnSync(process.execPath, [path.join(packageRoot, relativeScriptPath), ...args], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error.message);
    return 1;
  }

  return typeof result.status === "number" ? result.status : 1;
}

function parseScoreArgs(args) {
  const scriptArgs = [];
  const inputs = [];

  for (const arg of args) {
    if (arg === "--json") {
      scriptArgs.push(arg);
      continue;
    }
    if (arg.startsWith("-")) {
      fail(`Unknown score option: ${arg}`);
    }
    inputs.push(arg);
  }

  return { scriptArgs, files: expandInputs(inputs) };
}

function parseAuditArgs(args) {
  const scriptArgs = [];
  const inputs = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--json") {
      scriptArgs.push(arg);
      continue;
    }
    if (arg === "--fail-on") {
      const value = args[index + 1];
      if (!value) fail("--fail-on requires a value");
      scriptArgs.push(arg, value);
      index += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      fail(`Unknown audit option: ${arg}`);
    }
    inputs.push(arg);
  }

  return { scriptArgs, files: expandInputs(inputs) };
}

function parseValidateArgs(args) {
  const auditArgs = [];
  const inputs = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--fail-on") {
      const value = args[index + 1];
      if (!value) fail("--fail-on requires a value");
      auditArgs.push(arg, value);
      index += 1;
      continue;
    }
    if (arg === "--json") {
      fail("validate does not support --json; run score --json or audit --json separately");
    }
    if (arg.startsWith("-")) {
      fail(`Unknown validate option: ${arg}`);
    }
    inputs.push(arg);
  }

  return { auditArgs, files: expandInputs(inputs) };
}

function ensureFiles(files) {
  if (files.length === 0) {
    fail("No generated Markdown docs found. Pass files directly, or pass a directory containing supported doc_type values.");
  }
}

function runScore(args) {
  const { scriptArgs, files } = parseScoreArgs(args);
  ensureFiles(files);
  return runScript("scripts/score-generated-docs.js", [...scriptArgs, ...files]);
}

function runAudit(args) {
  const { scriptArgs, files } = parseAuditArgs(args);
  ensureFiles(files);
  return runScript("scripts/audit-generated-doc-content.js", [...scriptArgs, ...files]);
}

function runValidate(args) {
  const { auditArgs, files } = parseValidateArgs(args);
  ensureFiles(files);

  console.log("dreampia-dev-kit: scoring generated docs");
  const scoreStatus = runScript("scripts/score-generated-docs.js", files);
  console.log("");
  console.log("dreampia-dev-kit: auditing generated docs");
  const auditStatus = runScript("scripts/audit-generated-doc-content.js", [...auditArgs, ...files]);

  return scoreStatus === 0 ? auditStatus : scoreStatus;
}

function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    process.exit(0);
  }

  if (command === "version" || command === "--version" || command === "-v") {
    console.log(packageJson.version);
    process.exit(0);
  }

  if (command === "score") process.exit(runScore(args));
  if (command === "audit") process.exit(runAudit(args));
  if (command === "validate" || command === "check") process.exit(runValidate(args));
  if (command === "validate-skill-pack" || command === "validate-pack") {
    process.exit(runScript("scripts/validate-skill-pack.js", args));
  }

  fail(`Unknown command: ${command}`);
}

main();
