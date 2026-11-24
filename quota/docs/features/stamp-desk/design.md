# Stamp desk

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

From shift 3 a stamp desk opens in the middle of the hall. Stamping a file takes a moment, locks the player in place, and only one player can use the desk at a time. A new memo type can make stamping mandatory for one colour for a while, so the desk becomes a bottleneck and the team has to divide the work out loud ("I'm on stamps, you two bring them"). Serves the pillars *Talk or fail* and *Panic you can read*.

## Rules
1. The desk exists from shift 3.
2. A player carrying an unstamped file who presses the action key while standing at the desk starts stamping. They cannot move until it finishes. Pressing the action key again cancels it.
3. If another player is already stamping, the action key does nothing.
4. When the time is up the carried file is marked stamped (a red OK mark on the card). Picking up a new file clears the mark.
5. A **stamp memo** requires one colour to be stamped for a while once it takes effect. Delivering an unstamped file of that colour is a strike and the file is lost. Stamped files of any colour can always be delivered normally.
6. A stamped file is no harder to deliver otherwise. Stamping a file that did not need it only wastes time.
7. Stamp memos go to that colour's registrar (see [need to know](../need-to-know/design.md)) and appear in the memo report as STAMPED or UNSTAMPED.
8. Bots stamp only after a human shouts the stamp memo (F in solo).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Stamping time | 1.4 (0.7 with the Rubber Stamp [directive](../directives/design.md)) | s | Long enough to cause a queue, short enough not to feel like waiting? |
| Stamp requirement duration | 22 | s | |
| Desk position | centre (480, 330), reach ±70 × ±42 | px | Do players keep bumping into it? |
| Stamp memos from shift 3 | the second memo of every shift is a stamp memo, plus the usual random share (1 in 7) | | Too rare to matter or too frequent? |

## Edge cases
- A player who disconnects while stamping frees the desk when they are removed.
- The stamp requirement ending while a player stands at the desk does not cancel the stamp.

## Open questions
- [ASSUMPTION] One desk is the right bottleneck. A second desk would reduce the need to coordinate.
- [ASSUMPTION] 1.4 seconds is enough to cause a queue with 3 or 4 players. Tune after a playtest. The guaranteed stamp memo exists because bot runs showed that without it the desk and its cards rarely mattered.

## History
- 24/11/2026: designed.
