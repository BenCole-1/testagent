# Agent Knowledge Operations Playbook

## Goal
Design a local knowledge system that remains easy for both humans and agents to search, reason over, and keep current as data grows.

## Core Principle
Treat your file tree as the **source of truth** and maintain an **index layer** derived from files automatically.

- Files/folders store canonical content.
- The index stores metadata, extracted text, embeddings, and relationships.
- Agents query the index first, then open source files for grounded answers.

## Recommended Architecture

1. **Canonical content layer (filesystem)**
   - Keep topic-oriented folders (e.g., `projects/`, `ops/`, `research/`, `reference/`).
   - Prefer stable file formats (`.md`, `.txt`, `.json`, `.csv`, `.pdf` with OCR where needed).

2. **Machine-readable metadata layer**
   - Include frontmatter in text documents where possible.
   - Suggested keys: `title`, `summary`, `tags`, `owner`, `updated_at`, `confidence`, `source`.

3. **Index + retrieval layer**
   - Maintain:
     - keyword index (BM25/full-text),
     - vector index (embeddings),
     - graph links (optional: references between files/entities).

4. **Agent retrieval orchestration**
   - Query expansion (synonyms + acronym normalization).
   - Hybrid retrieval (keyword + vector).
   - Re-ranking and citation checks.

## Answers to Your 3 Questions

### 1) Do you need metadata management / data dictionaries?
Yes, but keep it lightweight.

- You **do not** need a heavy manual catalog for every file.
- You **do** need a minimal schema so an agent can rank results correctly.
- Use a combination of:
  - automatic metadata (path, modified time, file type, size),
  - extracted metadata (entities/topics),
  - optional authored metadata (frontmatter tags, owner, quality notes).

A short data dictionary helps ensure consistency for fields like `domain`, `status`, `sensitivity`, and `source_of_truth`.

### 2) How to auto-update indexing as knowledge grows?
Use event-driven + scheduled indexing.

- Event triggers (file created/changed/deleted) enqueue re-index jobs.
- A periodic full scan (e.g., nightly) repairs drift and catches missed events.
- Index pipeline per changed file:
  1. parse,
  2. chunk,
  3. metadata extraction,
  4. embedding generation,
  5. upsert into keyword/vector stores,
  6. invalidate stale chunks.

Keep idempotent jobs keyed by file hash so unchanged files are skipped.

### 3) How can file structure auto-update if your hypothesis is right?
Prefer **suggested restructuring** over automatic moving by default.

- Let the system propose merges/splits/renames based on usage and similarity.
- Require confirmation for physical moves to avoid broken links and trust issues.
- Safe automation options:
  - auto-generate virtual collections (saved searches, tags, views),
  - auto-create aliases/symlinks,
  - auto-append backlinks and related-doc sections.

If you do enable auto-moves, enforce:
- stable IDs per document,
- redirect map from old path -> new path,
- link-rewrite pass,
- rollback log.

## Practical Implementation Blueprint

### A. File conventions
- Use descriptive, stable filenames.
- Add frontmatter to long-lived notes/docs.
- Keep one concept per file where possible.

### B. Ingestion pipeline
- Watcher: filesystem events.
- Parser: type-specific extraction.
- Chunker: semantic chunks with overlap.
- Enricher: entities, topics, sensitivity labels.
- Indexers: full-text + vector.

### C. Retrieval quality controls
- Hybrid search first.
- Re-rank top-k results.
- Require source citations in agent outputs.
- Add freshness weighting for time-sensitive domains.

### D. Governance
- Access controls by path/tag.
- PII/sensitive-content policy tags.
- Audit logs for retrieval and transformation.

## Minimal Metadata Schema (starter)

```yaml
id: "uuid"
title: "string"
summary: "1-2 sentence abstract"
tags: ["topic-a", "topic-b"]
owner: "team-or-person"
source_of_truth: true
sensitivity: "public|internal|restricted"
updated_at: "ISO-8601"
```

## Maturity Path

1. **Level 1**: clean folders + full-text indexing.
2. **Level 2**: add frontmatter schema + incremental indexing.
3. **Level 3**: hybrid retrieval + citations + quality evals.
4. **Level 4**: knowledge graph + restructure recommendations + policy automation.

## Key Recommendation
Start with a simple, automated indexing backbone and evolve governance/metadata only where retrieval quality is poor. In most environments, this beats over-designing a complex taxonomy early.
