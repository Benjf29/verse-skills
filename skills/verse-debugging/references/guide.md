# Diagnose from evidence

## Classify before editing

- Parser: inspect indentation, block boundaries and call/indexing forms near the first relevant error. Later errors may be consequences.
- Type: compare declared and inferred types, option presence, return expressions and each branch's result.
- Failure/effect: locate the nearest failure context and read the callee's signature. A `no_rollback` error is not repaired by arbitrary bracket changes or adding `transacts` everywhere.
- Name/access: inspect imports, module visibility, the target digests and exact asset name. Never edit generated digests to invent availability.
- Async/runtime: identify the owner scope, suspension points, termination/cancellation and registered cleanup. A compiler success cannot prove task lifetime is correct.
- Persistence: compare with the published baseline before suggesting field or type changes.

## Minimal reproduction and correction

Read the file rather than relying solely on search-result line numbers. Preserve relevant imports, signatures and effects in the reproduction. Isolate one failing expression; change one semantic cause at a time. Keep the user-requested behavior, including failure branches, instead of deleting the problematic feature to make diagnostics disappear.

After the change, rerun only the relevant checks exposed and authorized for the target. If compilation is unavailable, report a static correction proposal with the remaining unknowns. Never fabricate zero errors/warnings, an installed compiler or a passing test. VM `.versetest` examples and comments in the book are supporting reference evidence; they are not local executions.

## Bounded validation

For an available compiler operation, bind it to the exact project and current source version. Inspect errors and warnings separately. An unavailable endpoint is not permission to install software, launch a different editor or run arbitrary shell commands. A timeout after a mutation is uncertain: inspect permitted status/log evidence, then report the uncertainty instead of automatically resending it.

A useful result records the original diagnostic, cause, files changed, checks actually performed and limits. Keep compile, LSP, static review and gameplay outcomes distinct. Windows evidence does not qualify macOS.
