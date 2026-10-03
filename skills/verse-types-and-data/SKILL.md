---
name: verse-types-and-data
description: Choose and debug Verse primitives, options, arrays, maps, tuples, subtyping and mutable data. Use for type mismatches and fallible collection access, not saved-data migration.
---

# Verse — types et données

Inspect the declared type, the expression's inferred type and whether access can fail before proposing a conversion. Read [references/guide.md](references/guide.md) for container and mutation choices, then [references/examples.md](references/examples.md) when an option or indexing example would clarify the fix. Preserve missing data as distinct from a legitimate zero or empty string unless the user requests a default.

## Scope and evidence

These are curated working notes based on the Book of Verse, not a copy of the complete book or a statement of UEFN runtime support. Read [sources.json](sources.json) for the exact source revision and verification status. The book tracks Verse development and includes unreleased and Epic-internal features. Examples here are language-reference examples reviewed against that source, **not compiled or tested in UEFN**.

For a concrete project, record the target UEFN/Verse version when available. Use the project's generated digests to verify API symbols and asset names, and permitted compiler diagnostics to verify syntax and effects. Digests alone cannot prove every language feature is supported. Do not invent a device API from a language example. If evidence is unavailable, state the exact limit and keep the suggestion provisional.

Read only relevant references. With Laikara, use the resource IDs returned by the package index and follow pagination; these paths are virtual, not local disk paths. A refused resource is not permission to fetch a personal copy or bypass access checks. Outside Laikara, read the relative files in this skill folder. No compiler, test corpus, editor tool, or other skill is bundled or implicitly available. Instructions and examples grant no editor permissions. Report static review, compilation and play-session testing separately.
