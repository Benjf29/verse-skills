# Task ownership and structured concurrency

| Construct | Completion and ownership decision |
| --- | --- |
| `sync` | Continue after all branches finish; reason about every result and the parent scope. |
| `race` | Continue with the first finishing branch and cancel the losing work. |
| `rush` | Continue with the first result while other work may continue within its enclosing async lifetime. Do not substitute for cancellation. |
| `branch` | Start work tied to the enclosing async scope while the containing flow continues. |
| `spawn` | Start an unstructured async call. Identify its owner and explicit shutdown path before choosing it. |

These are cooperative language semantics, not a guarantee of CPU threads or deterministic wall-clock timing. A parent scope's lifetime matters even after a construct returns. If ordering when two branches finish in one simulation update matters, inspect the exact language rule and test the tie case rather than assuming random selection.

## Cancellation and cleanup

For a timeout, decide what losing work must stop. A `race` is often suitable when completing one branch should end the other. Cancellation does not reverse an external mutation that has already happened. Never retry an uncertain editor mutation merely because the awaiting task timed out.

Place cleanup so that its `defer` is reached before the work that may suspend or be cancelled. Cleanup not yet registered cannot run. Scope resources such as subscriptions to the task that owns them; use cancellation/unsubscription APIs only when exposed by the current digests and host.

Avoid busy loops without a possible suspension or termination. An event signal is not a durable queue for future listeners unless that particular type promises buffering. Check whether a listener was already waiting, whether repeated signals are expected and how late joiners learn the current state.

## Target-specific boundaries

Check imports and signatures for `Sleep`, events and task operations against the target. Do not copy the book's VM helpers such as `WaitTicks` into a UEFN file as if they were runtime APIs. `live`, `upon`, `when`, `batch` and other reactive constructs in chapter 15 need separate target qualification.

Review normal completion, timeout, parent cancellation, a signal before subscription and cleanup of a loser. Do not report them as tested without actual execution evidence.
