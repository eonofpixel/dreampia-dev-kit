const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { expandInputs } = require("./doc-inputs");
const { packageJson, packageRoot } = require("./paths");
const { captureScript } = require("./script-runner");

const coreSkills = ["prd", "trd", "ia", "user-flow", "api-spec", "erd", "qa-checklist", "doc-audit"];

function parseDoctorArgs(args, fail) {
  const options = { docsPath: "docs" };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--docs") {
      const value = args[index + 1];
      if (!value) fail("--docs requires a value");
      options.docsPath = value;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") fail("Usage: dreampia-dev-kit doctor [--docs docs/]", 0);
    fail(`Unknown doctor option: ${arg}`);
  }
  return options;
}

function existingCount(paths) {
  return paths.filter((targetPath) => fs.existsSync(targetPath)).length;
}

function statusText(count, total) {
  if (count === total) return `installed (${count}/${total})`;
  if (count === 0) return `missing (${count}/${total})`;
  return `partial (${count}/${total})`;
}

function shortcutNames(relativeDirectory) {
  return fs
    .readdirSync(path.join(packageRoot, relativeDirectory))
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right));
}

function inspectInstallSurfaces() {
  const codexRoot = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  const codexSkillDir = path.join(codexRoot, "skills");
  const codexPromptDir = path.join(codexRoot, "prompts");
  const claudeSkillDir = process.env.CLAUDE_SKILLS_DIR || path.join(os.homedir(), ".claude", "skills");
  const claudeCommandDir = process.env.CLAUDE_COMMANDS_DIR || path.join(os.homedir(), ".claude", "commands");

  return [
    ["Codex skills", codexSkillDir, coreSkills.map((skill) => path.join(codexSkillDir, skill, "SKILL.md"))],
    ["Codex shortcuts", codexPromptDir, shortcutNames("shortcuts/codex").map((fileName) => path.join(codexPromptDir, fileName))],
    ["Claude Code skills", claudeSkillDir, coreSkills.map((skill) => path.join(claudeSkillDir, skill, "SKILL.md"))],
    [
      "Claude Code commands",
      claudeCommandDir,
      shortcutNames("shortcuts/claude-code").map((fileName) => path.join(claudeCommandDir, fileName)),
    ],
  ].map(([label, directory, expectedPaths]) => ({
    directory,
    label,
    status: statusText(existingCount(expectedPaths), expectedPaths.length),
  }));
}

function manifestVersion(relativePath) {
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), "utf8"));
  if (manifest.version) return manifest.version;
  return manifest.plugins && manifest.plugins[0] ? manifest.plugins[0].version : null;
}

function pluginStatus() {
  const versions = [
    manifestVersion("plugins/dreampia-dev-kit/.codex-plugin/plugin.json"),
    manifestVersion("plugins/dreampia-dev-kit/.claude-plugin/plugin.json"),
    manifestVersion(".claude-plugin/marketplace.json"),
  ];
  return versions.every((version) => version === packageJson.version) ? "aligned" : `mismatch (${versions.join(", ")})`;
}

function inspectDocs(docsPath) {
  const resolved = path.resolve(process.cwd(), docsPath);
  if (!fs.existsSync(resolved)) {
    return { count: 0, label: "not found", path: docsPath, validation: "not run" };
  }

  let files;
  try {
    files = expandInputs([resolved], (message) => {
      throw new Error(message);
    });
  } catch (error) {
    return { count: 0, label: `error: ${error.message}`, path: docsPath, validation: "not run" };
  }

  if (files.length === 0) return { count: 0, label: "found 0 supported docs", path: docsPath, validation: "not run" };

  const score = captureScript("scripts/score-generated-docs.js", files);
  const audit = captureScript("scripts/audit-generated-doc-content.js", files);
  const validation = score.status === 0 && audit.status === 0 ? "passed" : "failed";
  return { count: files.length, label: `found ${files.length}`, path: docsPath, validation };
}

function printDoctor(args, fail) {
  const options = parseDoctorArgs(args, fail);
  const installs = inspectInstallSurfaces();
  const docs = inspectDocs(options.docsPath);

  console.log("Dreampia doctor");
  console.log("");
  console.log("Install surfaces:");
  for (const item of installs) {
    console.log(`- ${item.label}: ${item.status}`);
    console.log(`  path: ${item.directory}`);
  }
  console.log(`- Plugin manifests: ${pluginStatus()}`);
  console.log("");
  console.log("Current docs:");
  console.log(`- Path: ${docs.path}`);
  console.log(`- Generated docs: ${docs.label}`);
  console.log(`- Validation: ${docs.validation}`);
  console.log("");
  console.log("Try next:");
  console.log("- dreampia-dev-kit guide \"workspace invitations\"");
  console.log(`- dreampia-dev-kit validate ${docs.path}`);
  console.log(`- dreampia-dev-kit explain ${docs.path}`);
  return 0;
}

module.exports = {
  printDoctor,
};
