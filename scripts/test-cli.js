#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const bin = path.join(root, "bin/dreampia-dev-kit.js");

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: options.cwd || root,
    encoding: "utf8",
    env: {
      ...process.env,
      ...(options.env || {}),
    },
  });
}

function assertSuccess(result, command) {
  assert.equal(result.status, 0, `${command} failed:\n${result.stderr}\n${result.stdout}`);
}

function testGuideShowsBeginnerWorkflow() {
  const result = runCli(["guide", "--agent", "codex", "--feature", "INVITE-001", "workspace invitations"]);

  assertSuccess(result, "guide");
  assert.match(result.stdout, /Dreampia guided workflow/);
  assert.match(result.stdout, /\/dreampia-dev-kit:doc-pack/);
  assert.match(result.stdout, /Set feature_id to INVITE-001/);
  assert.match(result.stdout, /Learning note/);
}

function testValidateShowsNextActionWhenClean() {
  const result = runCli(["validate", "examples/ecommerce"]);

  assertSuccess(result, "validate examples/ecommerce");
  assert.match(result.stdout, /Content risk audit: critical=0 major=0 minor=0/);
  assert.match(result.stdout, /dreampia-dev-kit: next step/);
  assert.match(result.stdout, /implement the smallest safe slice/);
}

function testExplainShowsCleanSummary() {
  const result = runCli(["explain", "examples/ecommerce"]);

  assertSuccess(result, "explain examples/ecommerce");
  assert.match(result.stdout, /# Dreampia Explain Report/);
  assert.match(result.stdout, /Lowest structure score: 100/);
  assert.match(result.stdout, /No required fixes found/);
}

function testOrchestrateShowsOperationQueueForCleanDocs() {
  const result = runCli(["orchestrate", "examples/ecommerce"]);

  assertSuccess(result, "orchestrate examples/ecommerce");
  assert.match(result.stdout, /# Dreampia Documentation Operations/);
  assert.match(result.stdout, /Operation Queue/);
  assert.match(result.stdout, /Implementation readiness: ready/);
  assert.match(result.stdout, /Proceed to the smallest safe implementation slice/);
  assert.match(result.stdout, /Codex:/);
}

function writeBadApiDoc(directory) {
  fs.writeFileSync(
    path.join(directory, "api-spec.md"),
    `---
doc_id: API-TEST-001
doc_type: api-spec
feature_id: TEST-001
status: draft
owner: backend
related_docs: []
related_code: []
last_reviewed: 2026-07-03
version: 0.1.0
---

# API Spec

## Overview

This API draft is intentionally incomplete.

## Examples

\`\`\`json
{ "token": "invt_visible_token_value" }
\`\`\`
`,
  );
}

function testExplainShowsRequiredFixesForRiskyDocs() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dreampia-cli-test-"));
  try {
    writeBadApiDoc(directory);

    const result = runCli(["explain", directory]);

    assertSuccess(result, "explain risky docs");
    assert.match(result.stdout, /Required Fixes/);
    assert.match(result.stdout, /missing section/);
    assert.match(result.stdout, /Invitation token appears/);
    assert.match(result.stdout, /Learning Notes/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function testDocOpsShowsRiskyDocsAsRequiredOperations() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dreampia-cli-test-"));
  try {
    writeBadApiDoc(directory);

    const result = runCli(["doc-ops", "--mode", "expert", directory]);

    assertSuccess(result, "doc-ops risky docs");
    assert.match(result.stdout, /Implementation readiness: not ready/);
    assert.match(result.stdout, /Fix critical and major content-risk findings/);
    assert.match(result.stdout, /Evidence Snapshot/);
    assert.match(result.stdout, /Invitation token appears/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function testInitCreatesValidatedStarterDocs() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dreampia-init-test-"));
  const docsDirectory = path.join(directory, "docs");
  try {
    const result = runCli([
      "init",
      docsDirectory,
      "--feature",
      "INVITE-001",
      "--name",
      "Workspace invitations",
    ]);

    assertSuccess(result, "init starter docs");
    assert.match(result.stdout, /Created Dreampia starter docs/);
    assert.match(fs.readFileSync(path.join(docsDirectory, "prd.md"), "utf8"), /PRD-INVITE-001/);
    assert.match(fs.readFileSync(path.join(docsDirectory, "prd.md"), "utf8"), /Workspace invitations/);

    const validateResult = runCli(["validate", docsDirectory]);
    assertSuccess(validateResult, "validate initialized docs");
    assert.match(validateResult.stdout, /Content risk audit: critical=0 major=0 minor=0/);

    const overwriteResult = runCli(["init", docsDirectory]);
    assert.equal(overwriteResult.status, 2);
    assert.match(overwriteResult.stderr, /Refusing to overwrite/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function testDoctorShowsInstallAndDocsStatus() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dreampia-doctor-test-"));
  const docsDirectory = path.join(directory, "docs");
  try {
    assertSuccess(runCli(["init", docsDirectory]), "init docs for doctor");

    const result = runCli(["doctor", "--docs", docsDirectory], {
      env: {
        CODEX_HOME: path.join(directory, "codex-home"),
        CLAUDE_SKILLS_DIR: path.join(directory, "claude-skills"),
        CLAUDE_COMMANDS_DIR: path.join(directory, "claude-commands"),
      },
    });

    assertSuccess(result, "doctor");
    assert.match(result.stdout, /Dreampia doctor/);
    assert.match(result.stdout, /Codex skills: missing/);
    assert.match(result.stdout, /Claude Code skills: missing/);
    assert.match(result.stdout, /Generated docs: found 8/);
    assert.match(result.stdout, /Validation: passed/);
    assert.match(result.stdout, /dreampia-dev-kit validate/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

testGuideShowsBeginnerWorkflow();
testValidateShowsNextActionWhenClean();
testExplainShowsCleanSummary();
testOrchestrateShowsOperationQueueForCleanDocs();
testExplainShowsRequiredFixesForRiskyDocs();
testDocOpsShowsRiskyDocsAsRequiredOperations();
testInitCreatesValidatedStarterDocs();
testDoctorShowsInstallAndDocsStatus();

console.log("CLI tests passed.");
