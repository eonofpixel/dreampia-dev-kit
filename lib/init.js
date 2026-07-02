const fs = require("node:fs");
const path = require("node:path");
const { packageRoot } = require("./paths");

const starterFiles = [
  ["project-brief.md", "project-brief", "BRD"],
  ["prd.md", "prd", "PRD"],
  ["trd.md", "trd", "TRD"],
  ["ia.md", "ia", "IA"],
  ["user-flow.md", "user-flow", "FLOW"],
  ["api-spec.md", "api-spec", "API"],
  ["erd.md", "erd", "ERD"],
  ["qa-checklist.md", "qa-checklist", "QA"],
  ["doc-audit-report.md", "doc-audit-report", "QA-DOCS"],
];

const ownerByDocType = {
  "api-spec": "backend",
  "doc-audit-report": "documentation",
  erd: "backend",
  ia: "design",
  prd: "product",
  "project-brief": "product",
  "qa-checklist": "qa",
  trd: "engineering",
  "user-flow": "design",
};

function usage() {
  return `Usage: dreampia-dev-kit init [docs/] [--feature FEATURE-001] [--name "Feature name"] [--force]`;
}

function parseInitArgs(args, fail) {
  const options = {
    outputDirectory: "docs",
    featureId: "FEATURE-001",
    featureName: "New Feature",
    force: false,
  };
  const positionals = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--feature") {
      options.featureId = requiredValue(args, index, "--feature", fail);
      index += 1;
      continue;
    }
    if (arg === "--name") {
      options.featureName = requiredValue(args, index, "--name", fail);
      index += 1;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") fail(usage(), 0);
    if (arg.startsWith("-")) fail(`Unknown init option: ${arg}`);
    positionals.push(arg);
  }

  if (positionals.length > 1) fail(`Too many init paths.\n${usage()}`);
  if (positionals[0]) options.outputDirectory = positionals[0];
  return buildInitContext(options, fail);
}

function requiredValue(args, index, name, fail) {
  const value = args[index + 1];
  if (!value) fail(`${name} requires a value`);
  return value;
}

function normalizeFeatureId(value, fail) {
  const normalized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!normalized) fail("--feature must include at least one letter or number");
  return /-\d{3}$/.test(normalized) ? normalized : `${normalized}-001`;
}

function buildInitContext(options, fail) {
  const featureId = normalizeFeatureId(options.featureId, fail);
  const docSlug = featureId.replace(/-\d{3}$/, "");
  const docIds = Object.fromEntries(
    starterFiles.map(([, docType, prefix]) => [docType, `${prefix}-${docSlug}-001`]),
  );

  return {
    docIds,
    docSlug,
    featureId,
    featureName: options.featureName.trim() || "New Feature",
    force: options.force,
    outputDirectory: path.resolve(process.cwd(), options.outputDirectory),
    reviewedAt: new Date().toISOString().slice(0, 10),
  };
}

function renderFrontmatter(context, docType) {
  const relatedDocs = Object.entries(context.docIds)
    .filter(([relatedType]) => relatedType !== docType)
    .map(([, docId]) => `  - ${docId}`)
    .join("\n");

  return `---
doc_id: ${context.docIds[docType]}
doc_type: ${docType}
feature_id: ${context.featureId}
status: draft
owner: ${ownerByDocType[docType]}
related_docs:
${relatedDocs}
related_code: []
last_reviewed: ${context.reviewedAt}
version: 0.1.0
---`;
}

function applyStarterSignals(text, context, docType) {
  const namedText = text.replace(/^(# .+)$/m, `$1: ${context.featureName}`);
  if (docType === "trd") {
    return namedText.replace(
      "## 2. Related Product Requirements",
      `## 2. Related Product Requirements\n\n- ${context.docIds.prd} defines REQ-001 for ${context.featureName}.`,
    );
  }
  if (docType === "user-flow") {
    return namedText.replace("## 9. Related Screens", "## 9. Related Screens\n\n- PAGE-001");
  }
  if (docType === "erd") {
    return namedText.replace(
      "| TBD | 1:N | TBD | TBD |",
      "| feature_records | foreign key references | users | Replace with the real relationship. |",
    );
  }
  if (docType === "doc-audit-report") {
    return namedText.replace("CRIT-001 | TBD | TBD | TBD", `CRIT-001 | TBD | ${context.docIds.prd} | Recommended fix TBD`);
  }
  return namedText;
}

function renderStarterFile(context, docType) {
  const templatePath = path.join(packageRoot, "templates", `${docType}.md`);
  const template = fs.readFileSync(templatePath, "utf8");
  const body = template.replace(/^---\n[\s\S]*?\n---/, renderFrontmatter(context, docType));
  return applyStarterSignals(body, context, docType);
}

function writeStarterDocs(context, fail) {
  fs.mkdirSync(context.outputDirectory, { recursive: true });
  const written = [];

  for (const [fileName, docType] of starterFiles) {
    const targetPath = path.join(context.outputDirectory, fileName);
    if (fs.existsSync(targetPath) && !context.force) {
      fail(`Refusing to overwrite ${targetPath}. Re-run init with --force to replace starter docs.`);
    }
    fs.writeFileSync(targetPath, `${renderStarterFile(context, docType).trim()}\n`);
    written.push(targetPath);
  }

  return written;
}

function displayPath(targetPath) {
  const relativePath = path.relative(process.cwd(), targetPath);
  if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`)) return targetPath;
  return relativePath;
}

function initDocs(args, fail) {
  const context = parseInitArgs(args, fail);
  const written = writeStarterDocs(context, fail);
  const outputPath = displayPath(context.outputDirectory);

  console.log("Created Dreampia starter docs");
  console.log(`- Directory: ${outputPath}`);
  console.log(`- Feature: ${context.featureId} ${context.featureName}`);
  console.log(`- Files: ${written.length}`);
  console.log("");
  console.log("Next steps:");
  console.log(`- dreampia-dev-kit validate ${outputPath}`);
  console.log(`- dreampia-dev-kit explain ${outputPath}`);
  return 0;
}

module.exports = {
  initDocs,
};
