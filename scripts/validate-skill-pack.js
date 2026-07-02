#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const coreSkills = [
  "prd",
  "trd",
  "ia",
  "user-flow",
  "api-spec",
  "erd",
  "qa-checklist",
  "doc-audit",
];

const templates = [
  "project-brief.md",
  "prd.md",
  "trd.md",
  "ia.md",
  "user-flow.md",
  "api-spec.md",
  "erd.md",
  "qa-checklist.md",
  "doc-audit-report.md",
  "release-note.md",
  "runbook.md",
];

const exampleDocs = [
  "project-brief.md",
  "prd.md",
  "trd.md",
  "ia.md",
  "user-flow.md",
  "api-spec.md",
  "erd.md",
  "qa-checklist.md",
  "doc-audit-report.md",
];

const requiredTemplateFrontmatter = [
  "doc_id",
  "doc_type",
  "feature_id",
  "status",
  "owner",
  "related_docs",
  "related_code",
  "last_reviewed",
  "version",
];

const allowedPrefixes = new Set([
  "BRD",
  "PRD",
  "REQ",
  "POL",
  "IA",
  "FLOW",
  "SCREEN",
  "TRD",
  "TSD",
  "ARCH",
  "API",
  "ERD",
  "DATA",
  "QA",
  "TC",
  "REL",
  "RUNBOOK",
  "INC",
]);

const allowedStatuses = new Set(["draft", "review", "approved", "deprecated"]);
const allowedOwners = new Set([
  "product",
  "design",
  "engineering",
  "frontend",
  "backend",
  "qa",
  "devops",
  "security",
  "documentation",
  "release",
]);

const failures = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

function field(frontmatterText, name) {
  const match = frontmatterText.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

function requireFile(relativePath) {
  if (!exists(relativePath)) {
    failures.push(`${relativePath} is missing`);
    return false;
  }
  return true;
}

function validateSkill(skillName) {
  const relativePath = `skills/${skillName}/SKILL.md`;
  const pluginPath = `plugins/dreampia-dev-kit/skills/${skillName}/SKILL.md`;

  if (!requireFile(relativePath)) return;
  requireFile(pluginPath);

  const text = readText(relativePath);
  const fm = frontmatter(text);

  if (!fm) {
    failures.push(`${relativePath} is missing YAML frontmatter`);
  } else {
    if (!field(fm, "name")) failures.push(`${relativePath} is missing name`);
    if (!field(fm, "description")) failures.push(`${relativePath} is missing description`);
  }

  for (const section of ["Output Format", "Quality Rules", "Safety Rules"]) {
    if (!text.includes(`## ${section}`)) {
      failures.push(`${relativePath} is missing ${section}`);
    }
  }

  if (!/## Inputs?/.test(text)) {
    failures.push(`${relativePath} is missing an inputs section`);
  }

  if (exists(pluginPath) && readText(pluginPath) !== text) {
    failures.push(`${pluginPath} differs from ${relativePath}`);
  }
}

function validateTemplate(templateName) {
  const relativePath = `templates/${templateName}`;
  if (!requireFile(relativePath)) return;

  validateDocument(relativePath);
}

function validateExampleDoc(exampleDoc) {
  const relativePath = `examples/small-service/${exampleDoc}`;
  if (!requireFile(relativePath)) return;

  validateDocument(relativePath);
}

function validateDocument(relativePath) {
  const text = readText(relativePath);
  const fm = frontmatter(text);

  if (!fm) {
    failures.push(`${relativePath} is missing YAML frontmatter`);
    return;
  }

  for (const key of requiredTemplateFrontmatter) {
    if (!new RegExp(`^${key}:`, "m").test(fm)) {
      failures.push(`${relativePath} is missing ${key}`);
    }
  }

  const prefix = field(fm, "doc_id").split("-")[0];
  if (!allowedPrefixes.has(prefix)) {
    failures.push(`${relativePath} has invalid doc_id prefix: ${prefix}`);
  }

  const status = field(fm, "status");
  if (!allowedStatuses.has(status)) {
    failures.push(`${relativePath} has invalid status: ${status}`);
  }

  const owner = field(fm, "owner");
  if (!allowedOwners.has(owner)) {
    failures.push(`${relativePath} has invalid owner: ${owner}`);
  }

  for (const section of ["Assumptions", "Open Questions"]) {
    if (!text.includes(section)) {
      failures.push(`${relativePath} is missing ${section}`);
    }
  }
}

function validateJson(relativePath) {
  if (!requireFile(relativePath)) return;

  try {
    JSON.parse(readText(relativePath));
  } catch (error) {
    failures.push(`${relativePath} is invalid JSON: ${error.message}`);
  }
}

function validateExecutable(relativePath) {
  if (!requireFile(relativePath)) return;

  const mode = fs.statSync(path.join(root, relativePath)).mode;
  if ((mode & 0o111) === 0) {
    failures.push(`${relativePath} is not executable`);
  }
}

for (const skill of coreSkills) validateSkill(skill);
for (const template of templates) validateTemplate(template);
for (const exampleDoc of exampleDocs) validateExampleDoc(exampleDoc);

for (const manifest of [
  ".agents/plugins/marketplace.json",
  ".claude-plugin/marketplace.json",
  "plugins/dreampia-dev-kit/.codex-plugin/plugin.json",
  "plugins/dreampia-dev-kit/.claude-plugin/plugin.json",
]) {
  validateJson(manifest);
}

for (const script of [
  "scripts/install-codex.sh",
  "scripts/install-claude-code.sh",
  "scripts/sync-plugin-skills.sh",
]) {
  validateExecutable(script);
}

if (failures.length > 0) {
  console.error("Skill pack validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Skill pack validation passed.");
console.log(`- ${coreSkills.length} core skills`);
console.log(`- ${templates.length} templates`);
console.log(`- ${exampleDocs.length} small-service example documents`);
console.log("- Codex and Claude Code plugin manifests");
