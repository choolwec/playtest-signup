# Shift progression

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

A run is a chain of 75-second shifts. Each has a quota the team must reach, and each is harder than the last. Hit the quota and the next shift starts when the host presses Enter. Miss it and the run is over. It supplies the "one more shift" pull and serves the pillar *Always know the goal*.

## Rules
1. A shift lasts the shift length. The timer, score and quota are always visible.
2. The crate spawn interval depends on the player count and the shift number. More players means more crates.
3. The quota is a fixed share of the crates expected to spawn in the shift (rounded down). The share rises each shift up to a cap.
4. When the timer reaches 0 the shift ends. Score at or above the quota is a pass and shows a memo report. Anything lower ends the run.
5. After a pass the host starts the next shift. After a failure the host can start a new run, which resets to shift 1. Nothing is saved.
6. Each new shift is faster (belt speed, spawn rate) and issues memos more often.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Shift length | 75 | s | Does a shift feel too long or too short? |
| Spawn interval, shift 1, 2 players | 1.7 | s | |
| Spawn interval change | −0.12 per shift, minimum 0.55 | s | |
| Spawn interval scaling | × 2 ÷ player count (minimum 2) | × | Check 2, 3, 4 and 6 players |
| Quota share, shift 1 | 50% of expected crates | % | Do friends pass shift 1 at all? |
| Quota share growth | +5 points per shift, cap 85% | points | At which shift does the first failure usually happen? |
| Belt speed growth | +8% per shift | % | |

## Edge cases
- Players who join mid-shift appear immediately, but the quota and spawn rate stay as set at the start of that shift.
- If the host leaves, the room ends. There is no host migration.
- With bots only, the quota assumes the same crate count as with that many humans.

## Open questions
- [ASSUMPTION] All numbers are first guesses. Bot-only simulation (24/11/2026) passed shifts 1 to 4 at 2 to 4 players with a perfect relay, so humans may find shifts 1 to 3 easy. Real players are likely slower than bots.
- [ASSUMPTION] A run ends on the first failure. Two lives per run is a possible retune.

## History
- 24/11/2026: designed. A throwaway version exists in [the prototype](../../../prototypes/memo-relay/index.html).
