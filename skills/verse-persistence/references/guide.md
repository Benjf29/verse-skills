# Persistent schema decisions

Persistence depends on runtime context and the key/value types of module-scoped `weak_map` storage. A normal map is not automatically durable storage. In UEFN player-data scenarios check the actual `player` key and permitted value types. The book's `persistent_key` is a VM testing convenience, not proof that this type exists in the project's UEFN APIs.

## Data shapes

The referenced book requires persistable classes to be final, non-unique, non-parametric, without superclass/interfaces or `var` members, and to contain persistable fields. Use literal/default values accepted by the target. Do not put device, entity, agent, widget or arbitrary runtime references into saved data simply because their IDs look printable.

A persistable struct is a fixed schema after publication. A persistable class may support adding a field with a default; verify the target's compatibility checks before calling that change safe. A schema version field helps application logic recognize an old shape but does not bypass compiler/publication rules. Preserve previously published fields and types rather than replacing them in place.

## Update procedure

Record the published baseline, propose the new shape and explain how existing player data is retained. Consider new players, existing players, absent values and repeat execution. Prefer a change that leaves the old representation valid. Do not reset data as an automatic fallback for load or compatibility errors.

Check current UEFN constraints for storage size, eligible players, allowed weak maps and persistence testing modes. The Book of Verse is not the authoritative source of current island quotas. JSON support described by the book is not evidence that arbitrary JSON/filesystem/cloud persistence APIs are enabled in UEFN.

Keep ordinary access failure distinct from a confirmed missing record. Do not turn every failure into a write of default values. A read or write's legality, effect requirements and player lifetime constraints need verification in the current project.

## Evidence to report

State the proposed schema change, compatibility evidence, whether a real compiler accepted it and whether existing/new player data was exercised in the correct UEFN test mode. None of those checks authorizes publication or destructive data reset.
