# Reference examples — not UEFN-compiled

```verse
FirstOrDefault(Values:[]int, Default:int):int =
    if (First := Values[0]):
        First
    else:
        Default

ReadOptional(Value:?int, Default:int):int =
    if (Present := Value?):
        Present
    else:
        Default
```

Review expectations: an empty array chooses `Default`; `option{0}` returns zero; an absent option chooses `Default`. Run these against the actual target before claiming compilation.

Negative case: `First:int = Values[0]` in an ordinary non-failure context leaves possible indexing failure unhandled. Making the array immutable does not prove index zero exists.
