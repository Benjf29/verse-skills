---
name: verse-failure-and-effects
description: Diagnose Verse failure contexts, decides/transacts/no_rollback constraints and propagation of function effects. Use when fallible calls or writes fail to compile; excludes editor permissions.
---

# Verse — échecs et effets

Trace the failing expression and the effect signature of every relevant call. Read [references/guide.md](references/guide.md) before moving a call across a failure boundary; use [references/examples.md](references/examples.md) for the validate-then-act pattern. Keep user-visible and external side effects outside speculative code unless their exact semantics permit them.

## Scope and evidence

These are curated working notes based on the Book of Verse, not a copy of the complete book or a statement of UEFN runtime support. Read [sources.json](sources.json) for the exact source revision and verification status. The book tracks Verse development and includes unreleased and Epic-internal features. Examples here are language-reference examples reviewed against that source, **not compiled or tested in UEFN**.

For a concrete project, record the target UEFN/Verse version when available. Use the project's generated digests to verify API symbols and asset names, and permitted compiler diagnostics to verify syntax and effects. Digests alone cannot prove every language feature is supported. Do not invent a device API from a language example. If evidence is unavailable, state the exact limit and keep the suggestion provisional.

Read only relevant references. With Laikara, use the resource IDs returned by the package index and follow pagination; these paths are virtual, not local disk paths. A refused resource is not permission to fetch a personal copy or bypass access checks. Outside Laikara, read the relative files in this skill folder. No compiler, test corpus, editor tool, or other skill is bundled or implicitly available. Instructions and examples grant no editor permissions. Report static review, compilation and play-session testing separately.
