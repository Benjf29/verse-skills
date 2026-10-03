# Modules and type boundaries

Keep pure calculations apart from runtime/device interactions so their types and effects remain visible. Use a function for behavior, a struct for a value aggregate and a class/interface when instance behavior or a substitutable contract is required. Do not add inheritance merely to share constants.

## Visibility and paths

A module path is a namespace identity, not a filesystem path to be invented. Inspect `using` declarations and the surrounding module before adding an import. Check access both to the module and to the member: a public member in an inaccessible module does not automatically become accessible.

Distinguish symbol ambiguity from missing exports and from an unavailable API version. Resolve the source of the symbol first; changing all declarations to public is not a sound default. For assets exposed to Verse, use the actual project `Assets.digest.verse` when available. Generated digests are evidence; do not edit them as the fix.

## Classes, structs and functions

Check required fields and defaults at every construction site. A constructor's semantics are not interchangeable with an ordinary helper returning a value. Preserve override contracts, visibility, parameter types and effects while extracting methods. Use `<concrete>`, `<abstract>`, `<final>` and `<unique>` for their actual meaning, not as universal boilerplate. In particular, `<unique>` controls identity semantics; it is not required for every class.

A refactor can break consumers even when the edited file looks valid. Locate calls and construction sites, check public paths and compare the old/new signature. For published persistable data, use the persistence workflow before renaming, removing or changing a field.

## Checks

Review inaccessible members, ambiguous imports, a missing required field, an invalid override and an API that exists only in a different digest version. Confirm that a pure helper does not accidentally acquire runtime or state-changing effects during extraction.
