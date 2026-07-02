---
doc_id: RUNBOOK-RELEASE-001
doc_type: runbook
feature_id: RELEASE-001
status: draft
owner: release
related_docs:
  - CHANGELOG.md
  - docs/INSTALLATION.md
  - docs/MARKETPLACE_VERIFICATION.md
related_code:
  - .github/workflows/validate.yml
  - scripts/validate-skill-pack.js
  - install.sh
last_reviewed: 2026-07-02
version: 0.1.0
---

# Release Process

Use this runbook when preparing a public `dreampia-dev-kit` release.

## Scope

This process covers Markdown skill pack releases, plugin scaffold releases, validation CLI gates, and installer updates.

It does not cover npm package publishing. GitHub `npx` usage is supported through the repository package metadata; npm registry publishing should get a separate release runbook.

## Preconditions

- `main` is clean and up to date with `origin/main`.
- The intended version is documented in `CHANGELOG.md`.
- README badges and status links point to the intended release tag.
- Plugin manifest versions match the release version.

## Local Validation

Run these commands before tagging:

```bash
node bin/dreampia-dev-kit.js validate-skill-pack
node bin/dreampia-dev-kit.js validate examples/small-service
node bin/dreampia-dev-kit.js validate examples/ecommerce
npm exec -- dreampia-dev-kit version
npm pack --dry-run
bash -n install.sh scripts/install-codex.sh scripts/install-claude-code.sh scripts/sync-plugin-skills.sh
```

If Claude Code CLI is installed, run:

```bash
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```

Smoke test local installs in temp directories:

```bash
tmpdir="$(mktemp -d)"
DREAMPIA_DEV_KIT_SOURCE_DIR="$PWD" \
  CODEX_HOME="$tmpdir/codex" \
  CLAUDE_SKILLS_DIR="$tmpdir/claude-skills" \
  CLAUDE_COMMANDS_DIR="$tmpdir/claude-commands" \
  bash install.sh --agent both

test -f "$tmpdir/codex/skills/prd/SKILL.md"
test -f "$tmpdir/codex/prompts/dreampia-prd.md"
test -f "$tmpdir/claude-skills/prd/SKILL.md"
test -f "$tmpdir/claude-commands/dreampia-prd.md"
rm -rf "$tmpdir"
```

## CI Validation

The GitHub Actions workflow in `.github/workflows/validate.yml` runs on:

- push to `main`;
- pull requests;
- manual `workflow_dispatch`.

The workflow validates skill-pack structure through the public CLI, helper script syntax, curated example document gates, shell syntax, installer smoke tests, and optional Claude plugin validation when the CLI is available.

Before release, confirm the latest `main` workflow run passed. For local generated-doc gates, run:

```bash
node bin/dreampia-dev-kit.js validate examples/small-service
node bin/dreampia-dev-kit.js validate examples/ecommerce
```

## Tag and Release

Create an annotated tag:

```bash
git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin main --tags
```

Create a GitHub Release:

```bash
gh release create vX.Y.Z \
  --repo eonofpixel/dreampia-dev-kit \
  --title "vX.Y.Z" \
  --notes-file /tmp/dreampia-release-notes.md
```

Release notes should include:

- user-facing additions;
- changed installation or invocation behavior;
- validation commands that passed;
- known limitations.

## Post-release Checks

- Open the GitHub release page and confirm the tag exists.
- Confirm README release links resolve.
- Confirm GitHub `npx` resolves the release tag:

```bash
npx --yes github:eonofpixel/dreampia-dev-kit#vX.Y.Z version
npx --yes github:eonofpixel/dreampia-dev-kit#vX.Y.Z validate examples/ecommerce
```

- Run the remote installer from the released tag:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/vX.Y.Z/install.sh \
  | DREAMPIA_DEV_KIT_REF=vX.Y.Z bash -s -- --agent codex
```

- Follow `docs/MARKETPLACE_VERIFICATION.md` for plugin install checks.

## Assumptions

- GitHub CLI is authenticated as a maintainer.
- GitHub-hosted runners provide Bash and Node.js through `actions/setup-node`.
- Claude Code CLI may not be available inside GitHub Actions, so Claude plugin validation remains a local release check.

## Open Questions

- Should future releases be created by a dedicated release workflow?
- Should npm publishing be part of the same release once the CLI exists?
