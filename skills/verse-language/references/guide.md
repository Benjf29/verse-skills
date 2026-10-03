# Expressions and control flow

## Read the construct before changing punctuation

Verse expressions produce values and can also have effects or fail. `Name := Expression` introduces a definition; `var Name:Type = Value` introduces mutable state; `set Name = Value` changes that state. Do not substitute assignment for a comparison: `=` is also the equality comparison operator in expression position.

`Function(Arguments)` is the ordinary call form. `Function[Arguments]` is the failable call form and needs a failure context. The choice is semantic, not formatting. Array and map indexing also use brackets and may fail.

A queried `logic` value, such as `Ready?`, succeeds only for true. A comparison such as `Count > 0` succeeds or fails; it is not interchangeable with an arbitrary integer used as a truthy condition. Group expressions explicitly when changing precedence could change success/failure behavior.

## Blocks and iteration

Use indentation consistent with the surrounding file. Preserve expression results when extracting a block into a helper: changing the last expression can change a function's result. For an `if` with branches producing a value, check both branches' result types and the scope of definitions introduced in its condition.

Use `for` for a bounded traversal and its filters. A filter can skip an element through failure; it is not necessarily an error for the whole traversal. Use `loop` when the exit condition is dynamic, and identify the enclosing loop for `break`. A loop that never exits or suspends needs explicit scrutiny before use in a running simulation.

When refactoring `defer`, preserve when the cleanup becomes active and the scope in which it runs. Do not move it past a possible early exit accidentally. Do not assume book-only forms such as `continue` or `case` are accepted by the project's current compiler merely because they appear in a chapter.

## Checks for a focused edit

Check the ordinary result, the false/failure branch, an empty iteration and the last expression's type. If a diagnostic concerns effects or a failing call, switch to that topic instead of repeatedly changing brackets.
