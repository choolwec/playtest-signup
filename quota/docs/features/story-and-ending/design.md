# Story and ending

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

A dry, satirical thread runs through the run, told in Ministry notices that appear on each shift's opening banner and, as a teaser, on the directive screen. It builds to a twist in shift 10: the memos the crew has been shouting all run were written by someone, and the promotion the Ministry has been dangling is to the Department of Memos. From now on the crew writes them. Then the run carries on as endless overtime. Serves the pillar *Absurd bureaucracy, no horror*.

## Rules
1. Each shift from 1 to 10 has one notice, shown on the opening banner as "NOTICE: ..." and, once the next shift is known, as "NEXT NOTICE: ..." on the directive screen.
2. The notices tell a short story: the work is vital but unexplained, a rumour that the files are about people, anonymous notes inside the memos, the Ministry admitting there is no Ministry, a promotion pending, a thank-you in advance.
3. Clearing shift 10 for the first time in a run shows the results screen, then (on Enter) the **promotion screen**. It says the memos the crew shouted were written by someone and that from today it is them, lists up to three of the memos from the run as "memos you wrote", and shows run totals (files sorted, best streak, mistakes, gold files).
4. Pressing Enter on the promotion screen opens the directive draft and the run continues as **endless overtime**. Shifts from 11 use a generic overtime notice. The promotion screen does not appear again in the same run.
5. A personal best is saved on each player's own computer: the highest shift cleared, and whether they were ever promoted. It is shown on the menu and, for a new best, on the results screen.
6. When a run is lost, the results screen shows the run's totals (files, best streak, mistakes, gold files).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Promotion shift | 10 | shift | Is it reachable for a typical group within a night? |
| Notices | 10, then a generic overtime line | | Do players read the banner text at all? |

## Edge cases
- If the run is lost before shift 10 the promotion never appears, and a new run starts from shift 1.
- Players who join after the promotion see the promotion screen only if they are present when it opens.
- Personal bests are per browser. Clearing site data resets them.

## Open questions
- [ASSUMPTION] A twist that lands on the 10th shift will be seen by few groups. If playtests show most runs end before shift 6, move the promotion earlier.
- [ASSUMPTION] Reading a notice mid-rush is hard. They are short and also shown when the player is calmer (the draft screen).

## History
- 24/11/2026: designed. Added in the finishing pass.
