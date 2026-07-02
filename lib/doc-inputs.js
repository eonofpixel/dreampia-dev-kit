const fs = require("node:fs");
const path = require("node:path");

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

function readDocType(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/^doc_type:\s*([^\n#]+)\s*$/m);
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function isGeneratedDoc(filePath) {
  try {
    return generatedDocTypes.has(readDocType(filePath));
  } catch {
    return false;
  }
}

function collectMarkdownFiles(inputPath, fail) {
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
      files.push(...collectMarkdownFiles(path.join(resolved, entry.name), fail));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const filePath = path.join(resolved, entry.name);
      if (isGeneratedDoc(filePath)) files.push(filePath);
    }
  }

  return files;
}

function expandInputs(inputs, fail) {
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
    files.push(...collectMarkdownFiles(resolved, fail));
  }

  return [...new Set(files)].sort((left, right) => left.localeCompare(right));
}

module.exports = {
  expandInputs,
};
