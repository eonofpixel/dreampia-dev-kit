#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const severityRank = {
  critical: 3,
  major: 2,
  minor: 1,
};

function usage() {
  console.error(
    "Usage: node scripts/audit-generated-doc-content.js [--json] [--fail-on critical|major|minor|none] <file...>",
  );
}

function parseArgs(argv) {
  const options = {
    json: false,
    failOn: "major",
    files: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (arg === "--fail-on") {
      const value = argv[index + 1];
      if (!value || !["critical", "major", "minor", "none"].includes(value)) {
        throw new Error("--fail-on must be one of critical, major, minor, none");
      }
      options.failOn = value;
      index += 1;
      continue;
    }
    options.files.push(path.resolve(arg));
  }

  return options;
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function field(frontmatterText, name) {
  const match = frontmatterText.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

function lineContext(text) {
  const lines = text.split("\n");
  let heading = "";
  return lines.map((line, index) => {
    const headingMatch = line.match(/^#{1,6}\s+(.*)$/);
    if (headingMatch) heading = headingMatch[1].trim();
    return {
      line,
      lineNumber: index + 1,
      heading,
    };
  });
}

function addFinding(findings, finding) {
  findings.push({
    severity: finding.severity,
    category: finding.category,
    file: finding.file,
    line: finding.line,
    message: finding.message,
    evidence: finding.evidence,
    recommendation: finding.recommendation,
  });
}

function uniqueFindings(findings) {
  const seen = new Set();
  return findings.filter((finding) => {
    const key = [
      finding.severity,
      finding.category,
      finding.file,
      finding.line,
      finding.message,
      finding.evidence,
    ].join("\u0000");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function basename(filePath) {
  return path.basename(filePath);
}

function readDocs(files) {
  return files.map((filePath) => {
    const text = fs.readFileSync(filePath, "utf8");
    const fm = frontmatter(text);
    return {
      file: filePath,
      name: basename(filePath),
      text,
      docType: field(fm, "doc_type"),
      lines: lineContext(text),
    };
  });
}

function hasPrdSignal(docs, pattern) {
  return docs.some((doc) => doc.docType === "prd" && pattern.test(doc.text));
}

function isRedactedOrPlaceholder(line) {
  return /(<[^>]+>|\b(redacted|placeholder|example|test_|sandbox|dummy|mock|fake|xxx|tbd)\b)/i.test(
    line,
  );
}

function isNegatedSafetyLine(line) {
  return /\b(do not|don't|never|avoid|without|must not|should not|not store|not expose|omit|redact)\b/i.test(
    line,
  );
}

const liveSecretPatterns = [
  /\bsk_live_[A-Za-z0-9]{12,}\b/,
  /\brk_live_[A-Za-z0-9]{12,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{12,}\b/,
  /\bAIza[0-9A-Za-z_-]{20,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/,
];

function auditTokenExposure(docs, findings) {
  for (const doc of docs) {
    if (!["api-spec", "trd", "qa-checklist"].includes(doc.docType)) continue;

    for (const entry of doc.lines) {
      const exposesJsonToken = /"token"\s*:/.test(entry.line);
      const apiNonAcceptTokenExample =
        doc.docType === "api-spec" && exposesJsonToken && !/accept/i.test(entry.heading);
      const responseContext = /(response|created|example|returns?|checklist|expected)/i.test(
        `${entry.heading} ${entry.line}`,
      );
      const requestBodyContext = /(request|accept)/i.test(entry.heading);

      if ((apiNonAcceptTokenExample || (exposesJsonToken && responseContext)) && !requestBodyContext) {
        addFinding(findings, {
          severity: "major",
          category: "security-token-exposure",
          file: doc.file,
          line: entry.lineNumber,
          message: "Invitation token appears in a client-visible response or expected result.",
          evidence: entry.line.trim(),
          recommendation:
            "Do not return full invitation tokens in API responses. Send tokens only through the delivery channel or document a narrow internal-only exception.",
        });
      }

      if (/returns?.*\btoken\b/i.test(entry.line) && !/hash|truncat|redact|never/i.test(entry.line)) {
        addFinding(findings, {
          severity: "major",
          category: "security-token-exposure",
          file: doc.file,
          line: entry.lineNumber,
          message: "A requirement or test expects token material to be returned.",
          evidence: entry.line.trim(),
          recommendation:
            "Return an invitation ID and status to clients; keep raw token material out of normal client responses and QA assertions.",
        });
      }
    }
  }
}

function auditSecretExposure(docs, findings) {
  for (const doc of docs) {
    if (!["api-spec", "trd", "qa-checklist", "doc-audit-report"].includes(doc.docType)) continue;

    for (const entry of doc.lines) {
      const text = `${entry.heading} ${entry.line}`;
      const exampleContext = /(response|example|returns?|expected|checklist|body|payload|curl|env)/i.test(
        text,
      );
      const sensitiveJsonKey =
        /"(?:apiKey|api_key|secret|clientSecret|client_secret|password|accessToken|access_token|refreshToken|refresh_token|sessionToken|session_token|paymentSecret|payment_secret)"\s*:\s*"[^"]+"/.test(
          entry.line,
        );

      for (const pattern of liveSecretPatterns) {
        if (pattern.test(entry.line) && !isRedactedOrPlaceholder(entry.line)) {
          addFinding(findings, {
            severity: "critical",
            category: "secret-exposure",
            file: doc.file,
            line: entry.lineNumber,
            message: "Document appears to contain a live secret or private key material.",
            evidence: entry.line.trim(),
            recommendation:
              "Remove the value, rotate it if it may be real, and use a redacted placeholder such as <redacted-secret>.",
          });
        }
      }

      if (
        sensitiveJsonKey &&
        exampleContext &&
        !isRedactedOrPlaceholder(entry.line) &&
        !isNegatedSafetyLine(entry.line)
      ) {
        addFinding(findings, {
          severity: "major",
          category: "secret-exposure",
          file: doc.file,
          line: entry.lineNumber,
          message: "Example or expected result includes credential-like material.",
          evidence: entry.line.trim(),
          recommendation:
            "Use stable IDs/status fields in responses and redacted placeholders for unavoidable sensitive request fields.",
        });
      }
    }
  }
}

function auditPlainTokenStorage(docs, findings) {
  for (const doc of docs) {
    if (!["erd", "trd"].includes(doc.docType)) continue;

    for (const entry of doc.lines) {
      if (/\btoken\s+(VARCHAR|TEXT|CHAR|STRING)\b/i.test(entry.line)) {
        addFinding(findings, {
          severity: "major",
          category: "security-token-storage",
          file: doc.file,
          line: entry.lineNumber,
          message: "Schema stores invitation tokens as a plaintext column.",
          evidence: entry.line.trim(),
          recommendation:
            "Store a token hash or verifier instead of raw token material. If raw tokens are unavoidable, mark the reason as an explicit security assumption.",
        });
      }

      if (/index.*\btoken\b/i.test(entry.line) && !/token_hash|hash/i.test(entry.line)) {
        addFinding(findings, {
          severity: "minor",
          category: "security-token-storage",
          file: doc.file,
          line: entry.lineNumber,
          message: "Token lookup/indexing appears to use raw token material.",
          evidence: entry.line.trim(),
          recommendation:
            "Prefer lookup by token hash/verifier and avoid indexing raw token values in application-readable tables.",
        });
      }
    }
  }
}

function auditSensitiveStorage(docs, findings) {
  for (const doc of docs) {
    if (!["erd", "trd"].includes(doc.docType)) continue;

    for (const entry of doc.lines) {
      const storesSensitiveColumn =
        /\b(password|api_?key|secret|client_?secret|access_?token|refresh_?token|session_?token|payment_?secret)\b\s*(VARCHAR|TEXT|CHAR|STRING|text)\b/i.test(
          entry.line,
        ) ||
        /\|\s*`?(password|api_?key|secret|client_?secret|access_?token|refresh_?token|session_?token|payment_?secret)`?\s*\|\s*(varchar|text|string|char)\b/i.test(
          entry.line,
        );

      if (storesSensitiveColumn && !/hash|digest|encrypted|cipher|verifier|reference|redacted/i.test(entry.line)) {
        addFinding(findings, {
          severity: "major",
          category: "secret-storage",
          file: doc.file,
          line: entry.lineNumber,
          message: "Schema appears to store credential-like material as plaintext.",
          evidence: entry.line.trim(),
          recommendation:
            "Store hashes, encrypted values, or provider references instead of plaintext passwords, API keys, tokens, or payment secrets.",
        });
      }
    }
  }
}

function auditPaymentDataExposure(docs, findings) {
  for (const doc of docs) {
    if (!["api-spec", "trd", "qa-checklist", "erd"].includes(doc.docType)) continue;

    for (const entry of doc.lines) {
      const rawCardData =
        /\b(card_number|cardNumber|pan|cvv|cvc|card security code)\b/i.test(entry.line) ||
        /\b(?:\d[ -]*?){13,19}\b/.test(entry.line);

      if (rawCardData && !isNegatedSafetyLine(entry.line) && !isRedactedOrPlaceholder(entry.line)) {
        addFinding(findings, {
          severity: "major",
          category: "payment-data-exposure",
          file: doc.file,
          line: entry.lineNumber,
          message: "Document appears to include raw payment card data or asks systems/testers to handle it.",
          evidence: entry.line.trim(),
          recommendation:
            "Use payment-provider references or sandbox tokens, and keep raw card numbers or CVC values out of generated docs.",
        });
      }
    }
  }
}

function auditPolicyConflicts(docs, findings) {
  const resetLines = [];
  const noResetLines = [];
  const ownerOnlyAdminLines = [];

  for (const doc of docs) {
    if (doc.docType === "doc-audit-report") continue;

    for (const entry of doc.lines) {
      if (/resend|expiration|7-day/i.test(entry.line)) {
        if (/(reset|resets|extend|extends)/i.test(entry.line) && !/does\s+not|not\s+reset/i.test(entry.line)) {
          resetLines.push({ doc, entry });
        }
        if (/(does\s+not\s+reset|not\s+reset|original expiration|maintains original)/i.test(entry.line)) {
          noResetLines.push({ doc, entry });
        }
      }

      if (/admin role.*owner only|owner only.*admin role|admin role.*assigned by owner/i.test(entry.line)) {
        ownerOnlyAdminLines.push({ doc, entry });
      }
    }
  }

  if (resetLines.length > 0 && noResetLines.length > 0) {
    for (const { doc, entry } of [...resetLines, ...noResetLines]) {
      addFinding(findings, {
        severity: "major",
        category: "policy-conflict",
        file: doc.file,
        line: entry.lineNumber,
        message: "Resend expiration policy conflicts across generated documents.",
        evidence: entry.line.trim(),
        recommendation:
          "Choose one policy: resend keeps the original expiration timestamp, or resend issues a new token/window. Update PRD, API, IA, flow, and QA together.",
      });
    }
  }

  const prdAllowsAdmins = hasPrdSignal(
    docs,
    /admin[s]?\s+can\s+invite|owners\s+and\s+admins.*viewer\/editor\/admin/i,
  );
  if (prdAllowsAdmins && ownerOnlyAdminLines.length > 0) {
    for (const { doc, entry } of ownerOnlyAdminLines) {
      addFinding(findings, {
        severity: "major",
        category: "policy-conflict",
        file: doc.file,
        line: entry.lineNumber,
        message: "Role assignment policy conflicts with the PRD's owner/admin invitation model.",
        evidence: entry.line.trim(),
        recommendation:
          "Clarify whether admins may assign the admin role. Then align PRD, IA access rules, API authorization, and QA permission checks.",
      });
    }
  }

  const prdAllowsGuest =
    hasPrdSignal(docs, /guest checkout|account creation is not required|without (?:an )?account/i) ||
    hasPrdSignal(docs, /does not require account|account authentication is not required/i);
  if (prdAllowsGuest) {
    for (const doc of docs) {
      if (doc.docType === "prd" || doc.docType === "doc-audit-report") continue;
      for (const entry of doc.lines) {
        if (
          /\b(requires? (?:a )?(?:user )?account|must be logged in|authenticated user required)\b/i.test(
            entry.line,
          ) &&
          !/not required|does not require|without (?:an )?account/i.test(entry.line)
        ) {
          addFinding(findings, {
            severity: "major",
            category: "policy-conflict",
            file: doc.file,
            line: entry.lineNumber,
            message: "Authentication requirement conflicts with the PRD guest/no-account model.",
            evidence: entry.line.trim(),
            recommendation:
              "Clarify whether the flow is guest-accessible or account-only, then align PRD, IA, API, and QA.",
          });
        }
      }
    }
  }
}

function auditSpeculativeDecisions(docs, findings) {
  const prdMentionsRateLimit = hasPrdSignal(
    docs,
    /rate[- ]limit|throttl|cooldown|per hour|per minute|429/i,
  );
  const prdMentionsAuthScopes = hasPrdSignal(docs, /scope|oauth|permission scope|bearer/i);
  const prdMentionsAvailability = hasPrdSignal(docs, /99%|98%|uptime|delivery reliability/i);
  const reportedAuthScopeDocs = new Set();
  const reportedRateLimitDocs = new Set();
  const reportedAvailabilityDocs = new Set();

  for (const doc of docs) {
    if (doc.docType === "prd" || doc.docType === "doc-audit-report") continue;

    for (const entry of doc.lines) {
      if (
        !prdMentionsAuthScopes &&
        !reportedAuthScopeDocs.has(doc.file) &&
        /workspace:[a-z-]+:[a-z-]+|Authorization Scopes/i.test(entry.line)
      ) {
        reportedAuthScopeDocs.add(doc.file);
        addFinding(findings, {
          severity: "minor",
          category: "speculative-decision",
          file: doc.file,
          line: entry.lineNumber,
          message: "Authorization scope design appears without PRD/source support.",
          evidence: entry.line.trim(),
          recommendation:
            "Move auth scope names to assumptions/open questions, or add the authorization model to the source PRD/TRD.",
        });
      }

      if (
        !prdMentionsRateLimit &&
        !reportedRateLimitDocs.has(doc.file) &&
        /\b(rate[- ]limit|throttl|cooldown|429|per hour|per minute)\b/i.test(entry.line)
      ) {
        reportedRateLimitDocs.add(doc.file);
        addFinding(findings, {
          severity: "minor",
          category: "speculative-decision",
          file: doc.file,
          line: entry.lineNumber,
          message: "Rate-limit policy appears without PRD/source support.",
          evidence: entry.line.trim(),
          recommendation:
            "Mark the rate limit as an assumption/open question, or add the target policy to product requirements.",
        });
      }

      if (
        !prdMentionsAvailability &&
        !reportedAvailabilityDocs.has(doc.file) &&
        /\b(99%|98%|uptime|delivery reliability|SLA)\b/i.test(entry.line)
      ) {
        reportedAvailabilityDocs.add(doc.file);
        addFinding(findings, {
          severity: "minor",
          category: "speculative-decision",
          file: doc.file,
          line: entry.lineNumber,
          message: "Availability or delivery target appears without PRD/source support.",
          evidence: entry.line.trim(),
          recommendation:
            "Mark the target as an assumption, or add an explicit reliability requirement and owner.",
        });
      }
    }
  }
}

function auditPiiRetentionCoverage(docs, findings) {
  const hasPiiCollection = docs.some((doc) =>
    /\b(email|phone|address|full name|shipping address|billing address|PII|personal data)\b/i.test(
      doc.text,
    ),
  );
  const hasLifecycleCoverage = docs.some((doc) =>
    /\b(retention|delete|deletion|purge|soft delete|expire|expires|cleanup|data lifecycle|privacy)\b/i.test(
      doc.text,
    ),
  );

  if (!hasPiiCollection || hasLifecycleCoverage) return;

  const firstPiiLine = docs
    .flatMap((doc) =>
      doc.lines.map((entry) => ({
        doc,
        entry,
      })),
    )
    .find(({ entry }) =>
      /\b(email|phone|address|full name|shipping address|billing address|PII|personal data)\b/i.test(
        entry.line,
      ),
    );

  if (!firstPiiLine) return;

  addFinding(findings, {
    severity: "minor",
    category: "privacy-retention",
    file: firstPiiLine.doc.file,
    line: firstPiiLine.entry.lineNumber,
    message: "Documents collect personal data but do not define retention or deletion behavior.",
    evidence: firstPiiLine.entry.line.trim(),
    recommendation:
      "Add a retention, deletion, or data lifecycle policy, or mark it as an open question before implementation.",
  });
}

function auditExternalReferences(docs, findings) {
  const definedIds = new Set();
  for (const doc of docs) {
    const docIdMatch = doc.text.match(/^doc_id:\s*(.+)$/m);
    if (docIdMatch) definedIds.add(docIdMatch[1].trim());
  }

  for (const doc of docs) {
    if (doc.docType === "doc-audit-report") continue;

    for (const entry of doc.lines) {
      const inReferenceContext = /(Related Documents|Broken References|External|Dependencies)/i.test(
        entry.heading,
      );
      const looksLikeExternalDoc =
        inReferenceContext &&
        /\b(Documentation|Specification|Guide|Architecture|RBAC|Integration)\b/i.test(entry.line) &&
        !/\b(?:external|assumed external|out[- ]of[- ]scope)\b/i.test(entry.line) &&
        !/\bhttps?:\/\//i.test(entry.line) &&
        !/\bdocs\//i.test(entry.line) &&
        !/\b[A-Z]+-[A-Z0-9-]+-\d{3}\b/.test(entry.line);

      if (looksLikeExternalDoc) {
        addFinding(findings, {
          severity: "minor",
          category: "unresolved-reference",
          file: doc.file,
          line: entry.lineNumber,
          message: "Document references an external or missing artifact without a path or ID.",
          evidence: entry.line.trim(),
          recommendation:
            "Use a document ID, repository path, URL, or explicitly label the reference as out-of-scope/external.",
        });
      }

      const shouldCheckDocumentIds =
        inReferenceContext ||
        /^related_docs:/i.test(entry.line) ||
        /^\s*[-*]\s+(?:PRD|TRD|API|ERD|QA|IA|FLOW)-/.test(entry.line);
      if (shouldCheckDocumentIds) {
        const idMatches =
          entry.line.match(/\b(?:PRD|TRD|API|ERD|QA|IA|FLOW)-[A-Z0-9-]+-\d{3}\b/g) || [];
        for (const id of idMatches) {
          if (!definedIds.has(id) && !/REQ-\d{3}|AC-\d{3}|US-\d{3}|QA-\d{3}/.test(id)) {
            addFinding(findings, {
              severity: "minor",
              category: "unresolved-reference",
              file: doc.file,
              line: entry.lineNumber,
              message: "Referenced document ID is not present in the audited file set.",
              evidence: id,
              recommendation:
                "Include the referenced document in the audit input, fix the ID, or mark it as an external dependency.",
            });
          }
        }
      }
    }
  }
}

function extractOpenQuestions(doc) {
  const questions = [];
  let inOpenQuestions = false;

  for (const entry of doc.lines) {
    if (/^##\s+(?:\d+\.\s*)?Open Questions\b/i.test(entry.line)) {
      inOpenQuestions = true;
      continue;
    }
    if (inOpenQuestions && /^##\s+/.test(entry.line)) break;
    if (!inOpenQuestions) continue;

    const questionMatch = entry.line.match(/^\s*(?:[-*]|\d+\.)\s+(.*\?)\s*$/);
    if (!questionMatch) continue;

    const normalized = questionMatch[1]
      .toLowerCase()
      .replace(/`[^`]+`/g, "")
      .replace(/[^a-z0-9? ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (normalized.length > 24) {
      questions.push({
        normalized,
        lineNumber: entry.lineNumber,
        evidence: entry.line.trim(),
      });
    }
  }

  return questions;
}

function auditRepeatedOpenQuestions(docs, findings) {
  const byQuestion = new Map();

  for (const doc of docs) {
    for (const question of extractOpenQuestions(doc)) {
      const existing = byQuestion.get(question.normalized) || [];
      existing.push({ doc, question });
      byQuestion.set(question.normalized, existing);
    }
  }

  for (const occurrences of byQuestion.values()) {
    const uniqueFiles = new Set(occurrences.map(({ doc }) => doc.file));
    if (uniqueFiles.size < 3) continue;

    for (const { doc, question } of occurrences) {
      addFinding(findings, {
        severity: "minor",
        category: "maintenance-risk",
        file: doc.file,
        line: question.lineNumber,
        message: "Same open question is repeated across three or more documents.",
        evidence: question.evidence,
        recommendation:
          "Move repeated open questions to one source document, or reference a shared decision log.",
      });
    }
  }
}

function summarize(findings) {
  return {
    critical: findings.filter((finding) => finding.severity === "critical").length,
    major: findings.filter((finding) => finding.severity === "major").length,
    minor: findings.filter((finding) => finding.severity === "minor").length,
  };
}

function shouldFail(findings, failOn) {
  if (failOn === "none") return false;
  const threshold = severityRank[failOn];
  return findings.some((finding) => severityRank[finding.severity] >= threshold);
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  usage();
  process.exit(2);
}

if (options.files.length === 0) {
  usage();
  process.exit(2);
}

let docs;
try {
  docs = readDocs(options.files);
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const findings = [];
auditTokenExposure(docs, findings);
auditSecretExposure(docs, findings);
auditPlainTokenStorage(docs, findings);
auditSensitiveStorage(docs, findings);
auditPaymentDataExposure(docs, findings);
auditPolicyConflicts(docs, findings);
auditSpeculativeDecisions(docs, findings);
auditPiiRetentionCoverage(docs, findings);
auditExternalReferences(docs, findings);
auditRepeatedOpenQuestions(docs, findings);

const results = {
  summary: summarize(findings),
  findings: uniqueFindings(findings).sort((left, right) => {
    const severityDelta = severityRank[right.severity] - severityRank[left.severity];
    if (severityDelta !== 0) return severityDelta;
    if (left.file !== right.file) return left.file.localeCompare(right.file);
    return left.line - right.line;
  }),
};
results.summary = summarize(results.findings);

if (options.json) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log(
    `Content risk audit: critical=${results.summary.critical} major=${results.summary.major} minor=${results.summary.minor}`,
  );
  for (const finding of results.findings) {
    console.log(
      `${finding.severity.toUpperCase()} ${finding.category} ${finding.file}:${finding.line}`,
    );
    console.log(`  ${finding.message}`);
    console.log(`  evidence: ${finding.evidence}`);
    console.log(`  fix: ${finding.recommendation}`);
  }
}

if (shouldFail(results.findings, options.failOn)) {
  process.exit(1);
}
