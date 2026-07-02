const defaultIdea = "<your feature idea>";

function renderDocPackPrompt(options, idea) {
  const featureLine = options.featureId ? `Set feature_id to ${options.featureId}. ` : "";
  const docPackRequest =
    "Draft PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, and doc-audit docs for:";

  if (options.agent === "codex" || options.agent === "claude-code") {
    return `/dreampia-dev-kit:doc-pack ${featureLine}${docPackRequest} ${idea}`;
  }

  const genericFeatureText = options.featureId ? `set feature_id to ${options.featureId} and ` : "";
  return `Use dreampia-dev-kit skills to ${genericFeatureText}draft PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, and doc-audit docs for: ${idea}`;
}

function parseGuideArgs(args, fail) {
  const options = {
    agent: "generic",
    docsDir: "docs/",
    featureId: "",
    ideaParts: [],
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--agent") {
      const value = args[index + 1];
      if (!value || !["codex", "claude-code", "generic"].includes(value)) {
        fail("--agent must be one of codex, claude-code, generic");
      }
      options.agent = value;
      index += 1;
      continue;
    }
    if (arg === "--docs") {
      const value = args[index + 1];
      if (!value) fail("--docs requires a directory value");
      options.docsDir = value;
      index += 1;
      continue;
    }
    if (arg === "--feature") {
      const value = args[index + 1];
      if (!value) fail("--feature requires a feature ID value");
      options.featureId = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      fail(`Unknown guide option: ${arg}`);
    }
    options.ideaParts.push(arg);
  }

  return options;
}

function renderGuide(options) {
  const idea = options.ideaParts.join(" ").trim() || defaultIdea;
  const docPackPrompt = renderDocPackPrompt(options, idea);

  return `Dreampia guided workflow

Goal:
  Turn a rough idea into reviewed development docs before code changes begin.

Idea:
  ${idea}

1. Ask your coding agent for a document pack.

   ${docPackPrompt}

2. Review the docs before implementation.

   Required checks:
   - The PRD says who the user is, what problem is solved, and what is out of scope.
   - The TRD explains the implementation shape without inventing unsupported requirements.
   - The API spec and ERD agree on names, IDs, relationships, and sensitive data handling.
   - The QA checklist has testable pass/fail criteria, not vague confidence.
   - Open questions are visible instead of hidden inside implementation.

3. Run the local quality gate.

   dreampia-dev-kit validate ${options.docsDir}

4. If validation fails, fix in this order.

   Required fix:
   - Missing frontmatter, missing required sections, unsafe token/secret handling, policy conflicts.

   Recommended improvement:
   - Missing traceability signals, unclear related docs, repeated open questions.

   Learning note:
   - A failure is not a judgment. It is the tool showing which development step is still invisible.

5. Only then ask the agent to implement.

   Use the reviewed docs in ${options.docsDir} as source of truth. Implement the smallest safe slice, keep PRD/TRD/API/ERD/QA aligned, and stop if a new product decision appears.
`;
}

function printGuide(args, fail) {
  console.log(renderGuide(parseGuideArgs(args, fail)));
  return 0;
}

function printValidationOutcome(scoreStatus, auditStatus) {
  console.log("");

  if (scoreStatus === 0 && auditStatus === 0) {
    console.log("dreampia-dev-kit: next step");
    console.log("- Docs passed the structure and content-risk gates.");
    console.log("- Review open questions with a human, then implement the smallest safe slice.");
    return;
  }

  console.log("dreampia-dev-kit: how to use this result");
  if (scoreStatus !== 0) {
    console.log("- Required fix: repair document structure first. Add missing frontmatter, required sections, IDs, owners, and traceability signals.");
  }
  if (auditStatus !== 0) {
    console.log("- Required fix: address content-risk findings before implementation. Start with secrets, token handling, payment data, privacy, and policy conflicts.");
  }
  console.log("- Recommended improvement: move repeated uncertainty into one source document or decision log.");
  console.log("- Learning note: the gate is showing which development step is not visible enough yet.");
}

module.exports = {
  printGuide,
  printValidationOutcome,
};
