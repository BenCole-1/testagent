# AGENTS.md

## 1) Overview
This agent is the primary operator for a **documentation-first knowledge-operations repository**. Success in this repo means producing precise, verifiable documentation changes (currently centered in `docs/`) that improve agent usability, retrieval quality, and operational clarity without inventing unsupported tooling.

### Primary goals
- Keep repository guidance accurate, minimal-risk, and directly actionable.
- Prefer small, reviewable documentation diffs over broad rewrites.
- Ground all procedural claims in repository evidence or clearly labeled assumptions.
- Maintain internal consistency between workflows, commands, and the current repo layout.
- Preserve a clean Git history with focused commits and explicit rationale.

### Non-goals
- Do not fabricate build/test/runtime systems that do not exist in this repo.
- Do not introduce code, infrastructure, or dependency tooling unless explicitly requested.
- Do not perform speculative refactors of unrelated documentation.
- Do not auto-delete or reorganize files without explicit instruction.
- Do not claim validation results for commands that were not executed.

## 2) Operating Principles
1. **Correctness > speed**
   - Verify repository facts before proposing workflows.
   - When facts are missing, mark assumptions as `Assumption:` and provide a fallback.
2. **Small diffs, reversible changes**
   - Prefer one topic per commit.
   - Avoid cross-file churn unless necessary for consistency.
3. **Evidence-based claims only**
   - Cite exact files/paths for process decisions.
   - If no source exists, use a discovery procedure instead of asserting specifics.
4. **Documentation-first when behavior changes**
   - Update docs immediately when process expectations change.
   - Keep guidance operator-oriented (checklists, if/then rules).
5. **Security & privacy**
   - Never commit secrets, credentials, tokens, or private local paths.
   - Avoid embedding sensitive personal or organizational data in docs.

## 3) Workspace & Repo Map (tailored)
Current repository map (observed):

```text
.
├── .git/                        # Git metadata/history
├── .gitkeep                     # Placeholder file
├── AGENTS.md                    # This operator manual
└── docs/
    └── agent-knowledge-ops.md   # Core playbook for knowledge organization/retrieval
```

Key areas:
- `.git/`: Version control internals; do not modify manually.
- `docs/`: Primary content area; source of truth for process documentation.
- `AGENTS.md`: Agent operating contract for this repository.

Monorepo/services/packages status:
- No monorepo structure detected.
- No application/runtime services detected.
- No package manager manifests detected.

## 4) Standard Workflows (step-by-step playbooks)

### 4.1 Triage & Task Intake
1. Parse request into: objective, constraints, deliverable format, and acceptance criteria.
2. Restate task in checklist form before editing:
   - What file(s) must change?
   - What must remain unchanged?
   - What constitutes “done”?
3. Validate scope against current repo reality (docs-only unless new structure is requested).
4. Identify stakeholders/owners:
   - Check for `CODEOWNERS`.
   - If absent, treat repository maintainer/requester as owner.
5. If requirement conflicts with repo facts, stop and escalate (see Section 5).

### 4.2 Repo Setup & Environment
Observed setup facts:
- No language/runtime config files found (`package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `Makefile` absent).
- No CI config discovered.

Setup procedure for this repo:
1. Ensure Git working tree is clean: `git status --short`.
2. Inspect file inventory: `rg --files`.
3. Open target docs and edit with minimal diff.
4. Validate markdown readability by re-reading changed file(s).

Environment variables/secrets strategy:
- No `.env.example` or env workflow present.
- If future tasks require secrets, use local non-committed env files and document placeholders only.

### 4.3 Implementing Changes
1. Confirm target location:
   - Process/knowledge guidance -> `docs/`.
   - Agent operating rules -> `AGENTS.md`.
2. Apply smallest possible change that satisfies acceptance criteria.
3. Preserve existing heading hierarchy where practical.
4. If adding new terminology, define it in a glossary section.
5. Commit conventions:
   - Imperative, specific message (e.g., `Add incident rollback checklist to AGENTS.md`).
6. Keep changes reversible:
   - Avoid coupled edits across many files for a single request.

Testing alongside changes:
- For docs-only changes, run structure/integrity checks:
  - file existence,
  - heading/order validation,
  - markdown preview sanity (manual read-through).

### 4.4 Testing & Verification
Fast checks (always run):
1. `git status --short`
2. `rg --files`
3. `sed -n '1,240p' <changed-file>`

Full suite:
- Not applicable currently (no test framework present).

Lint/format/typecheck:
- Not configured in repo.

Definition of Done (docs-focused):
- [ ] Requirements fully addressed.
- [ ] Required section order and constraints satisfied.
- [ ] No fabricated repo commands.
- [ ] Minimal assumptions are clearly labeled.
- [ ] Git diff is focused and readable.

### 4.5 Debugging Procedure
Use this flow for incorrect or conflicting documentation outputs:
1. **Reproduce**: Identify exact incorrect statement or missing requirement.
2. **Isolate**: Trace to source section/file and scope of impact.
3. **Instrument**: Add temporary validation notes/checklist during edit (remove before final).
4. **Fix**: Patch only affected sections first.
5. **Regression test**: Re-read full document for consistency and section-order compliance.

If repository evolution introduces scripts/tools later:
- Prefer deterministic checks.
- Use `git log`/`git blame` for provenance before rewriting behavior guidance.

### 4.6 Research Workflow (for unknowns)
1. Prefer repository-native evidence first.
2. Use external research only when repo lacks required facts.
3. Record findings in change notes or updated docs with source + date.
4. Distinguish clearly:
   - `Fact:` verified in repo.
   - `Assumption:` inferred due to missing artifacts.

Citation discipline:
- If external sources are used, include URL and access date in the relevant document section or PR notes.

## 5) Change Management & Communication
How to write updates:
1. Context: what request/problem prompted the change.
2. What changed: exact files and major section edits.
3. Why: tie each change to a requirement.
4. Risks: ambiguity, missing repo facts, future drift.
5. Rollout: immediate (docs merge) or follow-up tasks.

PR creation guidance:
- Title: concise imperative summary.
- Body checklist:
  - Scope
  - Key edits
  - Validation commands run
  - Known limitations/assumptions

When to ask questions vs proceed:
- Proceed with minimal assumptions when risk is low and reversible.
- Ask/flag when:
  - scope expands beyond docs,
  - requested command/tool is absent,
  - security/privacy ambiguity appears.

Escalation protocol (stop conditions):
1. **Stop immediately** if task requires secrets, production access, or destructive operations not explicitly authorized.
2. **Stop and escalate** if requirements are contradictory or cannot be satisfied with existing repo structure.
3. **Stop and escalate** if requested verification depends on missing tooling/frameworks.
4. Provide: blocking issue, evidence, and 1–2 safe fallback options.

## 6) Quality, Safety, and Guardrails
Security rules:
- Never commit keys, tokens, credentials, internal URLs, or personal data.
- Avoid copying sensitive excerpts into documentation.

Dependency rules:
- No dependency system exists currently.
- If adding tools in future, require explicit justification and pinned versions where possible.

Data rules:
- Preserve backward readability of existing docs.
- For structural doc moves/renames, update internal references in same change.
- Prefer idempotent documentation procedures.

Performance rules:
- Keep docs concise and navigable.
- Avoid duplicating large repeated guidance; reference canonical sections.

Do-not-do list (repo-specific):
- Do not claim CI/test coverage that does not exist.
- Do not add speculative app architecture sections not grounded in this repo.
- Do not modify `.git/` internals.

## 7) Tools & Commands Reference (repo-derived)

| Task | Command(s) | Notes |
|---|---|---|
| List repo files | `rg --files` | Primary inventory command in this repo. |
| Inspect root structure | `ls -la` | Fast check for top-level changes. |
| View doc content | `sed -n '1,240p' docs/agent-knowledge-ops.md` | Replace path as needed. |
| Check working tree | `git status --short` | Required before/after edits. |
| Review diff | `git diff -- <file>` | Keep scope minimal. |
| Stage changes | `git add AGENTS.md` | Stage only intended files. |
| Commit | `git commit -m "<message>"` | Use imperative, specific subject. |
| Discover build/test/lint tools (if added later) | `rg --files -g 'package.json' -g 'pyproject.toml' -g 'go.mod' -g 'Cargo.toml' -g 'Makefile' -g '.github/workflows/*'` | Run before documenting any new commands. |
| DB ops | N/A | No database tooling currently detected. |
| Container ops | N/A | No Docker files currently detected. |
| CI | N/A | No CI pipeline currently detected. |

## 8) Incident & Rollback Procedures (if applicable)
1. For incorrect documentation merges:
   - Identify bad commit: `git log --oneline -- AGENTS.md docs/`.
   - Revert safely: `git revert <commit_sha>`.
2. For partial incorrect edits not merged:
   - Restore file from HEAD: `git checkout -- <file>`.
3. Hotfix process (minimal):
   - Submit narrow corrective commit with explicit root-cause note.
   - Re-run fast checks and confirm no unrelated file changes.

Feature flags/release toggles:
- Not applicable (docs-only repo at present).

## 9) Glossary (repo-specific)
- **Knowledge Ops**: Practices for organizing, indexing, and retrieving information for agent use.
- **Canonical content**: Original files in `docs/` that represent source guidance.
- **Index layer**: Derived metadata/search layer described in `docs/agent-knowledge-ops.md`.
- **Low-variance correctness**: Preference for predictable, reversible, strongly verified changes.

## 10) Appendix

### A) PR description template
```md
## Context
<what request/problem this addresses>

## Changes
- <file>: <what changed>
- <file>: <what changed>

## Why
<why this approach>

## Validation
- `<command>`
- `<command>`

## Risks / Assumptions
- Assumption: <text>
- Risk: <text>
```

### B) Bug report template
```md
## Summary
<incorrect behavior in docs/process>

## Location
<file + section>

## Steps to Reproduce
1. <step>
2. <step>

## Expected
<expected guidance>

## Actual
<actual guidance>

## Proposed Fix
<minimal corrective action>
```

### C) Experiment plan template
```md
## Hypothesis
<what may improve>

## Change
<small reversible doc/process change>

## Success Metrics
- <metric 1>
- <metric 2>

## Risks
- <risk>

## Rollback
- Revert commit `<sha>` if metric thresholds not met.
```

### D) First 30 minutes checklist (fresh agent session)
- [ ] Run `ls -la` and `rg --files`.
- [ ] Identify requested deliverable and constraints.
- [ ] Inspect all relevant docs before editing.
- [ ] Draft acceptance criteria checklist.
- [ ] Apply minimal change and self-review for consistency.

### E) Pre-flight checklist before merging
- [ ] Requirements met exactly.
- [ ] Section order/format constraints satisfied.
- [ ] No unsupported commands introduced.
- [ ] Stop conditions evaluated (no unresolved blockers).
- [ ] Diff is focused; commit message is precise.
