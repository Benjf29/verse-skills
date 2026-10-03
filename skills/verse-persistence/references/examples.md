# Reference examples — not UEFN-compiled

```verse
player_progress := class<final><persistable>:
    SchemaVersion:int = 1
    BestScore:int = 0
    Unlocked:[]string = array{}
```

This is a schema fragment only: it does not implement player lifecycle, storage writes, migration or publication. Verify those with the project's digests and permitted tools.

Potential later change: adding `CompletedTutorial:logic = false` is a candidate to qualify against the published baseline. The default must be meaningful for old records. Changing `BestScore:int` to `string`, removing it, or adding a `var` field is not a routine safe schema evolution.

Acceptance cases to implement in the target: a new player, an existing profile without the new field, repeated migration and failure without overwriting stored progress. No such test has been run for this reference.
