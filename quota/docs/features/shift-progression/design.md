# Shift progression

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

A run is a chain of 75-second shifts. Each has a quota the team must reach, and each is harder than the last. Hit the quota and the next shift starts when the host presses Enter. Miss it and the run is over. It supplies the "one more shift" pull and serves the pillar *Always know the goal*.

## Rules
1. A shift lasts the shift length. The timer, score and quota are always visible.
2. The file spawn interval depends on the player count and the shift number. More players means more files.
3. The quota is a share of the files expected to spawn in the shift, multiplied by an assumed average multiplier (rounded down). The share rises each shift up to a cap.
4. When the timer reaches 0 the shift ends. Score at or above the quota is a pass and shows a memo report. A miss costs a life. A run starts with 2 lives: the first miss lets the team retry the same shift (same directives), and the second ends the run.
9. Each shift opens with a 3.2 second get-ready countdown. Players can walk but the belt, clock and memos wait.
5. After a pass the host opens the directive draft, and the next shift then starts by itself. After a lost life the host replays the shift. After the second miss the host can start a new run, which resets to shift 1, restores both lives and clears the directives. Nothing is saved.
6. Each new shift is faster (belt speed, spawn rate) and issues memos more often.
7. Clearing shift 10 triggers the [promotion ending](../story-and-ending/design.md). The run then continues as endless overtime with the same rules.
8. New rules are introduced one shift at a time, each announced on the shift's opening banner: shift 1 sorts by colour with everything visible, shift 2 adds [need to know](../need-to-know/design.md), shift 3 opens the [stamp desk](../stamp-desk/design.md). After every pass the team adopts a [directive](../directives/design.md) before the next shift.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Shift length | 75 | s | Does a shift feel too long or too short? |
| Spawn interval, shift 1, 2 players | 1.7 | s | |
| Spawn interval change | −0.08 per shift, minimum 0.7 | s | |
| Spawn interval scaling | the interval for the shift (with its floor) × 2 ÷ player count (minimum 2), never below 0.35 | × | Check 2, 3, 4 and 6 players. More players means more files |
| Quota share, shift 1 | 50% of expected files | % | Do friends pass shift 1 at all? |
| Quota share growth | +3.5 points per shift, cap 95% | points | At which shift does the first failure usually happen? |
| Assumed average multiplier | 2.2 | × | Do real teams average below this (quota too hard) or above it (too easy)? See [streak multiplier](../streak-multiplier/design.md) |
| Belt speed growth | +8% per shift up to shift 6, then +4% per shift | % | |
| Promotion shift | 10 | shift | See [story and ending](../story-and-ending/design.md) |

## Edge cases
- Players who join mid-shift appear immediately, but the quota and spawn rate stay as set at the start of that shift.
- If the host leaves, the room ends. There is no host migration.
- With bots only, the quota assumes the same file count as with that many humans.

## Open questions
- [ASSUMPTION] All numbers are first guesses. In bot-only simulations (24/11/2026, 6 runs per setting) bots passed every shift to 6 at 2 to 4 players with a relay. They keep long streaks, averaging about x4 to x5. Real players are slower and break streaks more, so the quota may prove too hard. Retune the assumed average multiplier first.
- Evidence (24/11/2026, bot runs injecting random wrong-tray mistakes, 3 players): a team with no mistakes clears shift 10 almost always, 5% mistakes about a third of the time, 10% mistakes about one run in twenty. With one life, 22% of runs failed shift 1 at a 10% mistake rate. This is why a run now has two lives and the assumed multiplier is lower.

## History
- 24/11/2026: designed. A throwaway version exists in [the prototype](../../../prototypes/memo-relay/index.html).
- 24/11/2026: difficulty curve eased so that a bot team with a good relay usually reaches the promotion shift (spawn step 0.08, floor 0.7, quota share +4 per shift capped at 80%, belt growth slows after shift 6).
- 24/11/2026: quota now counts multiplier points (share +6 per shift, cap 100%, assumed average multiplier 2.5).
