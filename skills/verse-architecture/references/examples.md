# Reference examples — not UEFN-compiled

```verse
score_rules := module:
    score_result<public> := struct:
        Total<public>:int

    AddBonus<public>(Base:int, Bonus:int):score_result =
        score_result{Total := Base + Bonus}
```

This module is local to its enclosing visibility context. Making it accessible from a different package requires checking that context and the target's module-path rules; the example does not supply a universal import path.

Review expectations: required `Total` is supplied, the helper returns the declared struct, and no device API or mutable state is required. Negative case: extracting this helper while leaving callers pointed at the old module path is an incomplete refactor even if the helper itself compiles.
