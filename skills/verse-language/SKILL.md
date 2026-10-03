---
name: verse-language
description: Explain or edit Verse expressions, operators, declarations and control flow; route a broader Verse question to the relevant language topic. Excludes Fortnite device APIs and editor setup.
---

# Verse — langage et syntaxe

Use this entry point for general Verse language questions. For a precise problem, identify the construct before selecting a reference. Prefer the smallest change consistent with the user's code and target version.

- Read [references/guide.md](references/guide.md) for expression, call and control-flow decisions.
- Read [references/examples.md](references/examples.md) for small reference examples and negative cases.
- If the authorized catalog exposes them, use `verse-types-and-data` for data/type questions, `verse-failure-and-effects` for failure/effect diagnostics, `verse-concurrency` for task lifetime, `verse-architecture` for modules/classes, `verse-persistence` for saved schemas and `verse-debugging` for diagnosis. Their names do not prove availability; do not load every skill for a general question.

## Scope and evidence

These are curated working notes based on the Book of Verse, not a copy of the complete book or a statement of UEFN runtime support. Read [sources.json](sources.json) for the exact source revision and verification status. The book tracks Verse development and includes unreleased and Epic-internal features. Examples here are language-reference examples reviewed against that source, **not compiled or tested in UEFN**.

For a concrete project, record the target UEFN/Verse version when available. Use the project's generated digests to verify API symbols and asset names, and permitted compiler diagnostics to verify syntax and effects. Digests alone cannot prove every language feature is supported. Do not invent a device API from a language example. If evidence is unavailable, state the exact limit and keep the suggestion provisional.

Read only relevant references. With Laikara, use the resource IDs returned by the package index and follow pagination; these paths are virtual, not local disk paths. A refused resource is not permission to fetch a personal copy or bypass access checks. Outside Laikara, read the relative files in this skill folder. No compiler, test corpus, editor tool, or other skill is bundled or implicitly available. Instructions and examples grant no editor permissions. Report static review, compilation and play-session testing separately.
