const path = require("node:path");
const { captureScript } = require("./script-runner");

function relativeFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`)) return filePath;
  return relativePath;
}

function parseJsonOutput(result, label, fail) {
  if (result.error) fail(result.error.message);
  if (result.status === 2) fail(`${label} could not read the docs:\n${result.stderr || result.stdout}`);

  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    fail(`${label} returned invalid JSON: ${error.message}`);
  }
}

function scoreDocs(files, fail) {
  return parseJsonOutput(
    captureScript("scripts/score-generated-docs.js", ["--json", ...files]),
    "score",
    fail,
  );
}

function auditDocs(files, fail) {
  return parseJsonOutput(
    captureScript("scripts/audit-generated-doc-content.js", [
      "--json",
      "--fail-on",
      "none",
      ...files,
    ]),
    "audit",
    fail,
  );
}

function scoreRequiredFixes(scores) {
  return scores.flatMap((result) =>
    result.issues.map((issue) => ({
      file: relativeFile(result.file),
      message: issue,
    })),
  );
}

function auditRequiredFixes(auditResult) {
  return auditResult.findings
    .filter((finding) => finding.severity === "critical" || finding.severity === "major")
    .map((finding) => ({
      file: `${relativeFile(finding.file)}:${finding.line}`,
      message: `${finding.message} Fix: ${finding.recommendation}`,
    }));
}

function auditRecommendedImprovements(auditResult) {
  return auditResult.findings
    .filter((finding) => finding.severity === "minor")
    .map((finding) => ({
      file: `${relativeFile(finding.file)}:${finding.line}`,
      message: `${finding.message} Suggestion: ${finding.recommendation}`,
    }));
}

function renderIssueList(issues, emptyText) {
  if (issues.length === 0) return `- ${emptyText}`;

  return issues
    .slice(0, 12)
    .map((issue) => `- ${issue.file}: ${issue.message}`)
    .join("\n");
}

function renderExplainReport(files, scores, auditResult) {
  const scoreFixes = scoreRequiredFixes(scores);
  const auditFixes = auditRequiredFixes(auditResult);
  const recommended = auditRecommendedImprovements(auditResult);
  const lowestScore = Math.min(...scores.map((result) => result.score));
  const requiredFixes = [...auditFixes, ...scoreFixes];

  return `# Dreampia Explain Report

## Summary

- Documents inspected: ${files.length}
- Lowest structure score: ${lowestScore}
- Content risks: critical=${auditResult.summary.critical} major=${auditResult.summary.major} minor=${auditResult.summary.minor}

## Required Fixes

${renderIssueList(requiredFixes, "No required fixes found. Keep open questions visible before implementation.")}

## Recommended Improvements

${renderIssueList(recommended, "No recommended improvements found by the current audit rules.")}

## Learning Notes

- Structure issues mean the development step is not visible enough yet.
- Critical or major content risks should be fixed before code generation or implementation.
- Minor findings are usually cleanup, traceability, or decision-log improvements.
- After fixing the docs, run \`dreampia-dev-kit validate <docs>\` again.
`;
}

function explainDocs(files, fail) {
  const scores = scoreDocs(files, fail);
  const auditResult = auditDocs(files, fail);
  console.log(renderExplainReport(files, scores, auditResult));
  return 0;
}

module.exports = {
  explainDocs,
  renderExplainReport,
};
