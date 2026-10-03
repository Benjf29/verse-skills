# Types, containers and mutation

## Pick the representation by meaning

Use `?T` when absence is meaningful, `[]T` for ordered collections, `[K]V` for keyed lookup and tuples for a fixed heterogeneous result. An option with no value is `false`; `option{Expression}` constructs an option and captures failure as absence. Querying an option with `?` is failable. Do not replace `option{0}` with absence because zero is falsy in another language.

Array and map lookup are failable even when application logic suggests the index or key should exist. Bind the lookup in a failure context and keep the missing branch meaningful. Iteration over a map gives key/value pairs; choose a normal map if enumeration is required. A `weak_map` is not a general iterable map: it does not expose the same enumeration/length operations. Its persistence meaning depends on key type and runtime context.

Use `logic` for an explicit true/false value; query it for a success/failure condition. Integer division may involve `rational` and failure: inspect the actual overload and target compiler before assigning its result to `int`. Do not transplant numeric conversion rules from Luau or TypeScript.

## Mutability and subtyping

`var` permits reassignment of the binding; `set` expresses the update. Immutable definitions do not become mutable through a type annotation. Some container updates themselves require a failure context. Inspect the containing function's effects when adding a write; an effect annotation is part of the contract, not a suppression flag.

When a cast fails, retain the original declared type and the destination type in the explanation. Do not invent an unchecked cast. Subtype compatibility, runtime cast availability, value equality and identity are different questions. The project's digests can confirm exposed types; the language/compiler determines which conversions and comparisons are legal.

## Boundary checks

Cover an absent option, a present zero, an empty array, an out-of-range index, an absent map key and a rejected mutation. Avoid silently replacing an absent value with a default when doing so would overwrite user or player state.
