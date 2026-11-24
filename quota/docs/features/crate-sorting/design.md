# Crate sorting

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

The player walks a one-screen hall, grabs one crate at a time from the moving belt and carries it to a bin. It is the hands-busy part of the game: it keeps everyone moving so that the memo relay has to happen mid-rush. Serves the pillars *Panic you can read* and *Always know the goal*.

## Rules
1. Crates spawn off-screen at the left end of the belt and travel right. A crate that leaves the right end is wasted (counted, no penalty).
2. Each crate is red, blue or yellow, and is also marked with the letters R, B or Y.
3. A player carries at most one crate. Pressing the action key within the pick-up radius of a crate, while standing in the pick-up zone, picks it up. If no crate is in range, nothing happens.
4. Pressing the action key while carrying and standing in the bin zone, within a bin's half-width, delivers the crate to that bin.
5. The correct bin for a colour starts as the bin with the same letter. [Memo relay](../memo-relay/design.md) can change it mid-shift.
6. A correct delivery scores 1 point. A wrong delivery scores −1 (the score never goes below 0) and adds 1 strike, and the screen says "WRONG BIN".
7. Players cannot drop a crate anywhere else and cannot pass crates between each other.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Walk speed | 230 | px/s | Does movement feel slippery or sluggish? |
| Belt speed | 80 (+8% per shift) | px/s | Do crates arrive too fast to read by shift 3? |
| Pick-up radius | 58 | px | Do players grab the wrong crate or miss? |
| Pick-up zone | player y ≤ 215 | px | Is the zone obvious without a marker? |
| Bin zone | player y ≥ 395, within 95 of a bin centre | px | Do players fumble the drop? |
| Bin centres | x = 190, 480, 770 | px | |
| Spawn interval, 2 players, shift 1 | 1.7 | s | Scales with headcount and shift, see [shift progression](../shift-progression/design.md) |
| Correct delivery | +1 (+2 under a double-score memo) | points | |
| Wrong delivery | −1 score, +1 strike | points | Is it frustrating or funny? |

## Edge cases
- Two players reaching for the same crate: the first action processed gets it.
- A player standing in both zones is not possible (zones do not overlap).
- A player who disconnects while carrying loses the crate.
- Holding a movement key and pressing action in the same frame works.

## Open questions
- [ASSUMPTION] One crate at a time keeps the hall busy. Two at a time may make it too easy.
- [ASSUMPTION] Wrong-bin crates are lost rather than returned to the belt.

## History
- 24/11/2026: designed. A throwaway version exists in [the prototype](../../../prototypes/memo-relay/index.html).
