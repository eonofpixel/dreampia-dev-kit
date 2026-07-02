const { expandInputs } = require("./doc-inputs");
const { printDoctor } = require("./doctor");
const { explainDocs } = require("./explain");
const { printGuide, printValidationOutcome } = require("./guide");
const { initDocs } = require("./init");
const { packageJson } = require("./paths");
const { runScript } = require("./script-runner");

function usage() {
  console.log(`dreampia-dev-kit ${packageJson.version}

Usage:
  dreampia-dev-kit guide [--agent codex|claude-code|generic] [--docs docs/] [--feature FEATURE-001] <idea...>
  dreampia-dev-kit init [docs/] [--feature FEATURE-001] [--name "Feature name"] [--force]
  dreampia-dev-kit doctor [--docs docs/]
  dreampia-dev-kit explain <file-or-dir...>
  dreampia-dev-kit score [--json] <file-or-dir...>
  dreampia-dev-kit audit [--json] [--fail-on critical|major|minor|none] <file-or-dir...>
  dreampia-dev-kit validate [--fail-on critical|major|minor|none] <file-or-dir...>
  dreampia-dev-kit validate-skill-pack
  dreampia-dev-kit version

Commands:
  guide                Show a beginner-friendly workflow from idea to reviewed docs.
  init                 Create starter PRD/TRD/IA/API/ERD/QA/audit docs.
  doctor               Diagnose install surfaces and generated-doc readiness.
  explain              Explain structure and content-risk findings in plain language.
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

function parseScoreArgs(args) {
  const scriptArgs = [];
  const inputs = [];

  for (const arg of args) {
    if (arg === "--json") {
      scriptArgs.push(arg);
      continue;
    }
    if (arg.startsWith("-")) fail(`Unknown score option: ${arg}`);
    inputs.push(arg);
  }

  return { scriptArgs, files: expandInputs(inputs, fail) };
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
    if (arg.startsWith("-")) fail(`Unknown audit option: ${arg}`);
    inputs.push(arg);
  }

  return { scriptArgs, files: expandInputs(inputs, fail) };
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
    if (arg === "--json") fail("validate does not support --json; run score --json or audit --json separately");
    if (arg.startsWith("-")) fail(`Unknown validate option: ${arg}`);
    inputs.push(arg);
  }

  return { auditArgs, files: expandInputs(inputs, fail) };
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
  printValidationOutcome(scoreStatus, auditStatus);

  return scoreStatus === 0 ? auditStatus : scoreStatus;
}

function runExplain(args) {
  const files = expandInputs(args, fail);
  ensureFiles(files);
  return explainDocs(files, fail);
}

function main(args) {
  const [command, ...rest] = args;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    process.exit(0);
  }

  if (command === "version" || command === "--version" || command === "-v") {
    console.log(packageJson.version);
    process.exit(0);
  }

  if (command === "guide") process.exit(printGuide(rest, fail));
  if (command === "init") process.exit(initDocs(rest, fail));
  if (command === "doctor") process.exit(printDoctor(rest, fail));
  if (command === "explain") process.exit(runExplain(rest));
  if (command === "score") process.exit(runScore(rest));
  if (command === "audit") process.exit(runAudit(rest));
  if (command === "validate" || command === "check") process.exit(runValidate(rest));
  if (command === "validate-skill-pack" || command === "validate-pack") {
    process.exit(runScript("scripts/validate-skill-pack.js", rest));
  }

  fail(`Unknown command: ${command}`);
}

module.exports = {
  main,
};
