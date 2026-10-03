# Reference examples — not UEFN-compiled

```verse
ClampNonNegative(Value:int):int =
    if (Value < 0):
        0
    else:
        Value

DoubleValues(Values:[]int):[]int =
    for (Value : Values):
        Value * 2
```

Expected checks: negative/zero/positive inputs for `ClampNonNegative`; empty and nonempty arrays for `DoubleValues`. These are review expectations, not recorded execution results.

Negative case: replacing the test with `if (Value)` does not express integer truthiness. Another common mistake is converting `Lookup[Key]` to `Lookup(Key)` to silence a failure diagnostic without inspecting the declaration. Fix the context or the declaration according to its actual contract.
