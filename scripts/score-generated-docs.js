#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const requiredFrontmatter = [
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

const documentRules = {
  prd: {
    prefix: "PRD",
    owner: "product",
    sections: [
      "Overview",
      "Background",
      "Goals",
      "Non-goals",
      "Target Users",
      "User Stories",
      "Functional Requirements",
      "Policies and Rules",
      "Edge Cases",
      "Acceptance Criteria",
      "Analytics and Success Metrics",
      "Dependencies",
      "Risks",
      "Assumptions",
      "Open Questions",
      "Related Documents",
    ],
    patterns: {
      "US IDs": /US-\d{3}/,
      "REQ IDs": /REQ-\d{3}/,
      "AC IDs": /AC-\d{3}/,
    },
  },
  trd: {
    prefix: "TRD",
    owner: "engineering",
    sections: [
      "Overview",
      "Related Product Requirements",
      "Technical Goals",
      "Non-goals",
      "System Context",
      "Architecture Overview",
      "Components",
      "API Requirements",
      "Data Requirements",
      "Security Requirements",
      "Performance Requirements",
      "Observability Requirements",
      "Infrastructure Requirements",
      "Migration Requirements",
      "Risks and Trade-offs",
      "Assumptions",
      "Open Questions",
      "Related Documents",
    ],
    patterns: {
      "REQ references": /REQ-\d{3}/,
      "API references": /API-[A-Z0-9-]+-\d{3}|API requirements/i,
      "ERD references": /ERD-[A-Z0-9-]+-\d{3}|data requirements/i,
    },
  },
  "api-spec": {
    prefix: "API",
    owner: "backend",
    sections: [
      "Overview",
      "Authentication",
      "Common Headers",
      "Endpoint List",
      "Endpoint Details",
      "Pagination",
      "Filtering and Sorting",
      "Idempotency",
      "Rate Limits",
      "Examples",
      "Assumptions",
      "Open Questions",
      "Related Documents",
    ],
    patterns: {
      "HTTP methods": /\b(GET|POST|PUT|PATCH|DELETE)\s+\/[^\s`|]+/,
      "status codes": /\b[1-5]\d{2}\b/,
      "REQ references": /REQ-\d{3}/,
    },
  },
  erd: {
    prefix: "ERD",
    owner: "backend",
    sections: [
      "Overview",
      "Entities",
      "Tables",
      "Relationships",
      "Indexes",
      "Constraints",
      "Soft Delete Policy",
      "Audit Fields",
      "Migration Notes",
      "Data Risks",
      "Assumptions",
      "Open Questions",
      "Related Documents",
    ],
    patterns: {
      "primary keys": /\b(primary key|pk)\b/i,
      "foreign keys": /\b(foreign key|fk|references)\b/i,
      indexes: /\b(index|idx_)\b/i,
    },
  },
  "qa-checklist": {
    prefix: "QA",
    owner: "qa",
    sections: [
      "Scope",
      "Preconditions",
      "Test Environment",
      "Functional Checklist",
      "Permission Checklist",
      "Edge Cases",
      "Error Cases",
      "Regression Checklist",
      "Pass/Fail Criteria",
      "Related Requirements",
      "Assumptions",
      "Open Questions",
      "Related Documents",
    ],
    patterns: {
      "QA IDs": /QA-\d{3}/,
      "REQ references": /REQ-\d{3}/,
      statuses: /\b(Pass|Fail|Blocked|Not Run)\b/,
    },
  },
};

function usage() {
  console.error("Usage: node scripts/score-generated-docs.js [--json] <file...>");
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function field(frontmatterText, name) {
  const match = frontmatterText.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

function headingPattern(section) {
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^##\\s+(?:\\d+\\.\\s*)?${escaped}\\s*$`, "im");
}

function scoreFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const fm = frontmatter(text);
  const docType = field(fm, "doc_type");
  const rules = documentRules[docType];

  const frontmatterHits = requiredFrontmatter.filter((key) =>
    new RegExp(`^${key}:`, "m").test(fm),
  );

  const issues = [];
  if (!fm) issues.push("missing YAML frontmatter");
  for (const key of requiredFrontmatter) {
    if (!frontmatterHits.includes(key)) issues.push(`missing frontmatter: ${key}`);
  }

  if (!rules) {
    issues.push(`unsupported doc_type: ${docType || "(empty)"}`);
    return {
      file: filePath,
      doc_type: docType || null,
      score: 0,
      frontmatter: `${frontmatterHits.length}/${requiredFrontmatter.length}`,
      sections: "0/0",
      patterns: "0/0",
      issues,
    };
  }

  const docId = field(fm, "doc_id");
  const owner = field(fm, "owner");
  const status = field(fm, "status");
  const version = field(fm, "version");

  if (!docId.startsWith(`${rules.prefix}-`)) issues.push(`doc_id must start with ${rules.prefix}-`);
  if (owner !== rules.owner) issues.push(`owner must be ${rules.owner}`);
  if (status !== "draft") issues.push("status must be draft for generated drafts");
  if (version !== "0.1.0") issues.push("version must be 0.1.0");

  const sectionHits = rules.sections.filter((section) => headingPattern(section).test(text));
  const patternNames = Object.keys(rules.patterns);
  const patternHits = patternNames.filter((name) => rules.patterns[name].test(text));

  for (const section of rules.sections) {
    if (!sectionHits.includes(section)) issues.push(`missing section: ${section}`);
  }
  for (const name of patternNames) {
    if (!patternHits.includes(name)) issues.push(`missing signal: ${name}`);
  }

  const totalChecks = requiredFrontmatter.length + rules.sections.length + patternNames.length + 4;
  const passedChecks =
    frontmatterHits.length +
    sectionHits.length +
    patternHits.length +
    Number(docId.startsWith(`${rules.prefix}-`)) +
    Number(owner === rules.owner) +
    Number(status === "draft") +
    Number(version === "0.1.0");

  return {
    file: filePath,
    doc_type: docType,
    score: Math.round((passedChecks / totalChecks) * 100),
    frontmatter: `${frontmatterHits.length}/${requiredFrontmatter.length}`,
    sections: `${sectionHits.length}/${rules.sections.length}`,
    patterns: `${patternHits.length}/${patternNames.length}`,
    issues,
  };
}

const args = process.argv.slice(2);
const json = args.includes("--json");
const files = args.filter((arg) => arg !== "--json");

if (files.length === 0) {
  usage();
  process.exit(2);
}

let results;
try {
  results = files.map((file) => scoreFile(path.resolve(file)));
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

if (json) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const result of results) {
    console.log(
      `${result.file}: score=${result.score} doc_type=${result.doc_type || "-"} frontmatter=${result.frontmatter} sections=${result.sections} signals=${result.patterns}`,
    );
    for (const issue of result.issues) {
      console.log(`  - ${issue}`);
    }
  }
}

if (results.some((result) => result.score < 90 || result.issues.length > 0)) {
  process.exit(1);
}
