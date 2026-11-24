# File sorting

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

The player walks a one-screen hall, grabs one case file at a time from the moving belt and carries it to a tray. It is the hands-busy part of the game: it keeps everyone moving so that the [memo relay](../memo-relay/design.md) has to happen mid-rush. Files are drawn as playing cards. Serves the pillars *Panic you can read* and *Always know the goal*. (The folder name `crate-sorting` is kept so links do not break; the game now calls them files and trays.)

## Rules
1. Files spawn off-screen at the left end of the belt and travel right. A file that leaves the right end is wasted (counted, no penalty).
2. Each file is red (diamond), blue (circle) or yellow (triangle), and also carries the letters R, B or Y.
3. A player carries at most one file. Pressing the action key within the pick-up radius of a file, while standing in the pick-up zone, picks it up. If no file is in range, nothing happens.
4. Pressing the action key while carrying and standing in the tray zone, within a tray's half-width, delivers the file to that tray.
5. In shift 1 the correct tray for a colour is the tray with the same colour. From shift 2 the trays are numbered and the routing is shuffled and partly hidden (see [need to know](../need-to-know/design.md)). [Memo relay](../memo-relay/design.md) can change it mid-shift.
6. A correct delivery scores the current multiplier (see [streak multiplier](../streak-multiplier/design.md)). From shift 3 some files must be [stamped](../stamp-desk/design.md) first. A wrong delivery scores −1 (the score never goes below 0), adds 1 strike, resets the streak and shows "WRONG TRAY".
7. Players cannot drop a file anywhere else and cannot pass files between each other.
8. The local player sees a pulsing outline on the file they would grab, and a glow on the tray they would drop into.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Walk speed | 230 | px/s | Does movement feel slippery or sluggish? |
| Belt speed | 80 (+8% per shift) | px/s | Do files arrive too fast to read by shift 3? |
| Belt position | centre at y = 170 | px | |
| Pick-up radius | 58 | px | Do players grab the wrong file or miss? |
| Pick-up zone | player y ≤ 250 | px | Is the zone obvious with the outline? |
| Walkable height | y from 215 to 505 | px | |
| Tray zone | player y ≥ 395, within 95 of a tray centre | px | Do players fumble the drop? |
| Tray centres | x = 190, 480, 770 | px | |
| Spawn interval, 2 players, shift 1 | 1.7 | s | Scales with headcount and shift, see [shift progression](../shift-progression/design.md) |
| Wrong delivery | −1 score, +1 strike, streak to 0 | | Is it frustrating or funny? |

## Edge cases
- Two players reaching for the same file: the first action processed gets it.
- A player standing in both zones is not possible (zones do not overlap).
- A player who disconnects while carrying loses the file.
- Holding a movement key and pressing action in the same frame works.

## Open questions
- [ASSUMPTION] One file at a time keeps the hall busy. Two at a time may make it too easy.
- [ASSUMPTION] Wrong-tray files are lost rather than returned to the belt.

## History
- 24/11/2026: designed. A throwaway version exists in [the prototype](../../../prototypes/memo-relay/index.html).
- 24/11/2026: trays become numbered and shuffled from shift 2.
- 24/11/2026: renamed crates to files and bins to trays; belt moved down to make room for the memo strips.
