# Reference examples — not UEFN-compiled

```verse
RequirePositive(Value:int)<decides><transacts>:void =
    Value > 0

PositiveOrZero(Value:int):int =
    if (RequirePositive[Value]):
        Value
    else:
        0
```

Expected checks: a positive value passes; zero and negative values choose the fallback. The helper has no suspension and the failable call is in a failure context.

For gameplay, first obtain and validate the target in an `if` condition, then call its non-rollback action in the success body using the actual digest signature. Do not invent a specific device method for this pattern.

Negative cases: calling `RequirePositive(Value)` uses the wrong call form; calling `RequirePositive[Value]` in an ordinary function body leaves failure unhandled. Annotating that helper `<decides><suspends>` is not the repair.
