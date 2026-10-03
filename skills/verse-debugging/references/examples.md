# Worked diagnostic cases — review only

## Fallible access outside a failure context

```verse
# Problematic in an ordinary non-failure function body:
# First:int = Values[0]

FirstOrDefault(Values:[]int):int =
    if (First := Values[0]):
        First
    else:
        0
```

Cause: index zero may not exist. This repair is appropriate only when returning zero for an empty collection matches the requested behavior. Otherwise return an option or propagate failure with the proper signature and call form. Compile both paths in the target before reporting success.

## Device method with no rollback support

Evidence needed: exact callee signature from the target digest and its call site. Keep fallible target lookup in the condition; invoke the non-rollback method after the condition succeeds. Do not invent the method name or add a transaction annotation to pretend an external effect is reversible.

## Book-only reactive construct

If the compiler rejects `live`/`upon`, first establish target support. Do not replace imports repeatedly or claim the runtime is broken merely because the development-branch book documents the construct. Propose an alternative using only APIs actually available to that project.
