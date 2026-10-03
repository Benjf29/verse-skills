# Verse skills

Seven independent skills for working with Verse, based on the [Book of Verse](https://verselang.github.io/book/). Version **0.1.0**.

| Skill | Use |
| --- | --- |
| `verse-language` | Expressions, syntax and routing |
| `verse-types-and-data` | Types, options and collections |
| `verse-failure-and-effects` | Failure contexts and effects |
| `verse-concurrency` | Tasks, cancellation and events |
| `verse-architecture` | Modules, visibility and data/behavior boundaries |
| `verse-persistence` | Saved schemas and compatibility |
| `verse-debugging` | Evidence-based diagnosis |

Each directory in `skills/` is self-contained: `SKILL.md`, focused references, examples, licenses and `sources.json`. Copy only the desired directories into a skill directory supported by your agent. No global runtime, compiler, editor tool or external companion skill is installed. Laikara imports the same directories as immutable server packages; the desktop reads only requested resources through its existing access checks.

The notes are deliberately curated rather than a mirror of the full manual. The book tracks the Verse development branch and can document unreleased or internal functionality. All examples currently have **language-reference-only** status: they have not been compiled in UEFN or validated in a gameplay session. Confirm target APIs through project digests and syntax/behavior through the actual toolchain. These skills cannot grant editor permissions.

## Provenance and licenses

`sources.lock.json` pins the book revision and SHA-256 of every source chapter used. Individual `sources.json` files select the relevant chapters. `catalog.json` pins all distributed skill-file hashes. Original instructions are MIT (`LICENSE`); the upstream book is CC0-1.0 (`BOOK-LICENSE.txt`). Both notices are retained inside each skill. No personal-machine configuration or source from private UEFN tools is included.

## Validation and updates

Requires Node.js 22 or newer. There are no npm dependencies or install step.

```sh
node scripts/validate.mjs
node --test scripts/validate.test.mjs
node scripts/check-upstream.mjs
```

The first two commands are local checks, not Verse compilation. The last command reads GitHub once and reports a comparison URL if the book changed. It never rewrites files, publishes content or schedules monitoring. A network or rate-limit error is not an unchanged result.

For a new release, review the upstream diff, update only affected guidance and examples, refresh the source hashes/revision, bump `catalog.json`'s version and recompute the listed file hashes from their exact UTF-8 contents. Run validation, review the content, commit and create an immutable version tag. Existing versions must not be rewritten. UEFN compatibility must remain unverified until real target evidence exists.

Laikara imports a reviewed **full commit SHA**, never `main` or a moving tag at runtime. Importing a candidate does not by itself replace an administrator's enabled skills or provider choices. Activation is handled separately by the server catalog; there is no GitHub download at application startup.
