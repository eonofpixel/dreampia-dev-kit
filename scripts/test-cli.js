#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const bin = path.join(root, "bin/dreampia-dev-kit.js");

function runCli(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: root,
    encoding: "utf8",
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

testGuideShowsBeginnerWorkflow();
testValidateShowsNextActionWhenClean();
testExplainShowsCleanSummary();
testExplainShowsRequiredFixesForRiskyDocs();

console.log("CLI tests passed.");
