const path = require("node:path");
const { captureScript } = require("./script-runner");

const coreDocTypes = [
  "prd",
  "trd",
  "ia",
  "user-flow",
  "api-spec",
  "erd",
  "qa-checklist",
  "doc-audit-report",
];

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
  return parseJsonOutput(captureScript("scripts/score-generated-docs.js", ["--json", ...files]), "score", fail);
}

function auditDocs(files, fail) {
  return parseJsonOutput(
    captureScript("scripts/audit-generated-doc-content.js", ["--json", "--fail-on", "none", ...files]),
    "audit",
    fail,
  );
}

function uniqueDocTypes(scores) {
  const found = [...new Set(scores.map((result) => result.doc_type).filter(Boolean))];
  return found.sort((left, right) => {
    const leftIndex = coreDocTypes.indexOf(left);
    const rightIndex = coreDocTypes.indexOf(right);
    if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
    if (leftIndex === -1) return 1;
    if (rightIndex === -1) return -1;
    return leftIndex - rightIndex;
  });
}

function missingCoreDocTypes(scores) {
  const found = new Set(scores.map((result) => result.doc_type));
  return coreDocTypes.filter((docType) => !found.has(docType));
}

function quoteCommandArg(value) {
  if (/^[A-Za-z0-9_./:@=-]+$/.test(value)) return value;
  return `'${value.replace(/'/g, "'\\''")}'`;
}

function commandTarget(targets) {
  if (!targets || targets.length === 0) return "<docs>";
  return targets.map(quoteCommandArg).join(" ");
}

function structureIssueCount(scores) {
  return scores.reduce((total, result) => total + result.issues.length, 0);
}

function lowestScore(scores) {
  return Math.min(...scores.map((result) => result.score));
}

function topStructureIssues(scores) {
  return scores
    .filter((result) => result.issues.length > 0)
    .flatMap((result) =>
      result.issues.map((issue) => ({
        file: relativeFile(result.file),
        message: issue,
      })),
    )
    .slice(0, 8);
}

function topAuditFindings(auditResult) {
  return auditResult.findings
    .map((finding) => ({
      file: `${relativeFile(finding.file)}:${finding.line}`,
      severity: finding.severity,
      message: finding.message,
      recommendation: finding.recommendation,
    }))
    .slice(0, 8);
}

function renderIssueList(items, emptyText, formatItem) {
  if (items.length === 0) return `- ${emptyText}`;
  return items.map(formatItem).join("\n");
}

function operation(priority, title, command, reason) {
  return { priority, title, command, reason };
}

function buildOperationQueue(scores, auditResult, targets) {
  const missingDocs = missingCoreDocTypes(scores);
  const structureIssues = structureIssueCount(scores);
  const contentIssues = auditResult.summary.critical + auditResult.summary.major;
  const command = commandTarget(targets);
  const queue = [];

  if (contentIssues > 0) {
    queue.push(
      operation(
        "required",
        "Fix critical and major content-risk findings",
        `dreampia-dev-kit explain ${command}`,
        "Critical or major content risks should be resolved before docs drive implementation.",
      ),
    );
  }

  if (structureIssues > 0 || lowestScore(scores) < 90) {
    queue.push(
      operation(
        "required",
        "Repair missing document structure and traceability signals",
        `dreampia-dev-kit explain ${command}`,
        "The implementation agent needs visible sections, IDs, and related-doc links to follow the docs safely.",
      ),
    );
  }

  if (missingDocs.length > 0) {
    queue.push(
      operation(
        "recommended",
        `Create or connect missing core docs: ${missingDocs.join(", ")}`,
        "/dreampia-dev-kit:doc-pack",
        "A complete doc pack gives beginners and agents the same map before coding starts.",
      ),
    );
  }

  if (auditResult.summary.minor > 0) {
    queue.push(
      operation(
        "recommended",
        "Clean minor traceability, assumption, or maintenance risks",
        `dreampia-dev-kit explain ${command}`,
        "Minor findings usually become confusion later if they are left unresolved.",
      ),
    );
  }

  queue.push(
    operation(
      "verify",
      "Run the validation gate after every documentation change",
      `dreampia-dev-kit validate ${command}`,
      "Validation is the handoff check before implementation or review.",
    ),
  );

  if (contentIssues === 0 && structureIssues === 0 && missingDocs.length === 0) {
    queue.push(
      operation(
        "next",
        "Proceed to the smallest safe implementation slice",
        "Use the Codex or Claude Code prompt below",
        "The current docs are ready to ground code work, but they still remain the source of truth.",
      ),
    );
  }

  return queue;
}

function renderOperationQueue(queue) {
  return queue
    .map(
      (item, index) =>
        `${index + 1}. [${item.priority}] ${item.title}\n   command: ${item.command}\n   why: ${item.reason}`,
    )
    .join("\n");
}

function renderAgentPrompts(targets, blocked) {
  const command = commandTarget(targets);
  const codexAction = blocked
    ? "Fix the required documentation operations first, then run the validation gate"
    : "Implement the smallest safe slice backed by PRD acceptance criteria and the QA checklist";
  const claudeAction = blocked
    ? "Resolve the required documentation operations first, then run the validation gate"
    : "Build the smallest safe implementation slice grounded in the reviewed docs";

  return `## Next Agent Prompts

Codex:

\`\`\`text
Read the Dreampia docs at ${command}. Use them as the source of truth. ${codexAction}. Keep PRD, TRD, IA, API, ERD, QA, and doc-audit aligned before claiming completion.
\`\`\`

Claude Code:

\`\`\`text
Use the Dreampia document pack at ${command}. ${claudeAction}. Do not introduce implementation behavior that is not traceable to the docs.
\`\`\``;
}

function renderExpertEvidence(scores, auditResult) {
  const structureIssues = topStructureIssues(scores);
  const findings = topAuditFindings(auditResult);

  return `## Evidence Snapshot

### Structure Issues

${renderIssueList(structureIssues, "No structure issues found.", (issue) => `- ${issue.file}: ${issue.message}`)}

### Content-Risk Findings

${renderIssueList(
  findings,
  "No content-risk findings found.",
  (finding) => `- ${finding.severity} ${finding.file}: ${finding.message} Fix: ${finding.recommendation}`,
)}`;
}

function renderLearningNotes(blocked) {
  const implementationNote = blocked
    ? "Implementation should wait until required operations are resolved."
    : "Implementation can start with the smallest safe slice, then docs should be revalidated.";

  return `## Learning Notes

- Required operations are blockers for safe implementation.
- Recommended operations reduce confusion and future drift.
- Verification operations should run after every documentation change.
- ${implementationNote}`;
}

function renderOrchestrationReport(files, scores, auditResult, options = {}) {
  const targets = options.targets || [];
  const mode = options.mode || "beginner";
  const docTypes = uniqueDocTypes(scores);
  const missingDocs = missingCoreDocTypes(scores);
  const requiredIssueCount = structureIssueCount(scores) + auditResult.summary.critical + auditResult.summary.major;
  const blocked = requiredIssueCount > 0 || missingDocs.length > 0;
  const queue = buildOperationQueue(scores, auditResult, targets);
  const readiness = blocked
    ? "not ready - resolve required documentation operations first"
    : "ready - use docs for the smallest safe implementation slice";

  return `# Dreampia Documentation Operations

## Summary

- Documents inspected: ${files.length}
- Document types found: ${docTypes.length > 0 ? docTypes.join(", ") : "none"}
- Missing core docs: ${missingDocs.length > 0 ? missingDocs.join(", ") : "none"}
- Lowest structure score: ${lowestScore(scores)}
- Structure issues: ${structureIssueCount(scores)}
- Content risks: critical=${auditResult.summary.critical} major=${auditResult.summary.major} minor=${auditResult.summary.minor}
- Implementation readiness: ${readiness}

## Operation Queue

${renderOperationQueue(queue)}

${mode === "expert" ? renderExpertEvidence(scores, auditResult) : renderLearningNotes(blocked)}

${renderAgentPrompts(targets, blocked)}
`;
}

function orchestrateDocs(files, options, fail) {
  const scores = scoreDocs(files, fail);
  const auditResult = auditDocs(files, fail);
  console.log(renderOrchestrationReport(files, scores, auditResult, options));
  return 0;
}

module.exports = {
  orchestrateDocs,
  renderOrchestrationReport,
};
