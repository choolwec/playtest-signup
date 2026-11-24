# Streak multiplier

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

Every correct delivery in a row raises a shared team multiplier, and any mistake resets it. It turns "sort the files" into "keep the chain alive", gives the optimiser in you something to chase, and makes a mistake hurt. Serves the pillars *Panic you can read* and *Always know the goal*.

## Rules
1. The team shares one streak counter. It starts at 0 each shift.
2. Each correct delivery adds 1 to the streak. Any strike (wrong tray or touching a forbidden file) resets it to 0.
3. The multiplier is 1 plus 1 for every full block of correct deliveries in the streak, up to a cap.
4. A correct delivery scores the multiplier, doubled when a double-score memo is in force for that colour.
5. The multiplier is shown as a badge by the score. It pops and plays a rising chime when it goes up. Deliveries also play a note that climbs the A minor pentatonic scale with the streak.
6. The best streak of the shift is shown on the results screen.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Streak per multiplier step | 4 | deliveries | Is x2 too easy to reach? |
| Multiplier cap | 5 | × | Do good teams sit at the cap with nothing to chase? |

## Edge cases
- A wasted file (left the belt) does not break the streak.
- A disconnecting player does not break the streak.
- The multiplier applies to the delivering player's team only (there is one team).

## Open questions
- [ASSUMPTION] Resetting the whole team's streak on one player's mistake creates blame and drama. If it feels unfair, make it per player.
- [ASSUMPTION] The quota's assumed average multiplier of 2.5 (see [shift progression](../shift-progression/design.md)) is a guess. Bots, which rarely make mistakes, reach about x4 to x5.

## History
- 24/11/2026: designed and added in the presentation pass.
