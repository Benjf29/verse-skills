# Failure and effects

## Failure is a control-flow result

A comparison, collection access or `<decides>` call can fail as an expected outcome. Calls marked `<decides>` use brackets. Find the nearest enclosing failure context, such as an `if` condition, before changing the call site. A runtime error is not the same mechanism; normal failure handling is not a general exception handler.

A failed speculative evaluation rolls back transactional changes in its failure context. Do not infer that arbitrary external activity, logging or editor operations are undoable. Inspect whether the callee permits rollback. A `<no_rollback>` operation cannot simply be moved into a failure context because another call there is transactional.

## Diagnose signatures, not just syntax

Record the caller signature, callee signature and exact diagnostic. Determine whether the error is an unhandled failure, a forbidden effect, an incompatible result type or a missing API. Effects propagate through calls. Adding `<transacts>` to a wrapper does not grant a non-transactional callee rollback support.

The book describes `<transacts>` with heap effects and also discusses newer/internal effects. Use only effect spellings supported by the target toolchain. In the referenced book `<decides>` and `<suspends>` cannot be combined on one function. Keep synchronous fallible validation in a helper, then enter async work after success instead of adding both annotations.

`if` condition success selects its body; failure selects the other branch when supplied. Values bound in the successful condition are usable in its success body. This lets validation be separated from an irreversible action without pretending the action is transactional.

## Review cases

Check successful validation, failure of each predicate, missing collection values and rollback of a tentative transactional write. Also check that non-rollback actions are not executed on the rejected path. These runtime claims need an actual target test; static inspection is only evidence about code structure.
