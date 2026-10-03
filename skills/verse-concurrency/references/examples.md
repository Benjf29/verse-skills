# Reference examples — not UEFN-compiled

This illustrates `race` using `Sleep`; `/Verse.org/Simulation` and its signature must be confirmed in the target digests.

```verse
using { /Verse.org/Simulation }

ChooseDelay()<suspends>:int =
    race:
        block:
            Sleep(1.0)
            1
        block:
            Sleep(2.0)
            2
```

Review expectation: absent parent cancellation, the first branch finishes earlier and the second is cancelled. This is not evidence of exact wall-clock seconds. Swap delays to exercise the other branch and test equal delays against the documented ordering.

Negative case: replacing `race` with `rush` while claiming the losing side effect was cancelled changes the contract. Another failure is launching an unbounded `spawn` from every event without any owner or shutdown behavior.
