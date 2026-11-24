# Directives

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

After every shift the team passes, the Ministry offers three directives and the team votes for one. Each is a boon, a risk, or both, and they stack for the rest of the run. It is the run-level building layer (the part that makes you want one more shift), and the vote is a chance for the team to argue on voice. Serves the pillars *Always know the goal* and *Talk or fail*.

## Rules
1. After a passed shift, the host presses Enter on the results screen to open the draft.
2. Three directives are shown, drawn at random from those not yet adopted. Fewer are shown when fewer than three remain.
3. Each human player votes with the keys 1, 2 or 3 and can change their vote. A vote is shown as a coloured dot on the card.
4. The draft ends when every human has voted, when the timer runs out, or when the host presses Enter. The most-voted card wins. A tie, or no votes at all, is settled at random among the leaders.
5. The adopted directive is shown for a moment, then the next shift starts automatically.
6. Directives last until the run ends (a missed quota). A new run starts with none.
7. Adopted directives are listed in the bottom-left corner during play, marked "+" for boons and "!" for risks.

## The directives
| Name | Type | Effect |
|---|---|---|
| Overtime | Risk | The belt runs 20% faster, and the multiplier rises every 3 files instead of 4 |
| Tailwind | Boon | Everyone walks 20% faster |
| Second Wind | Boon | The first mistake of each shift does not break the streak |
| Rubber Stamp | Boon | Stamping takes half as long |
| Early Warning | Boon | Memos take effect 4 seconds later |
| Performance Bonus | Boon | Every stamped file scores 2 extra points |
| Austerity | Risk | The quota is 15% lower, but the multiplier is capped at x3 |
| Red Tape | Risk | Memos arrive 25% more often, and every correct delivery scores +1 |
| Insurance | Boon | Mistakes cost no points. They still break the streak |
| Second Desk | Boon | Two players can use the stamp desk at the same time |
| Gold Rush | Boon | About 1 file in 12 is golden and scores 5 extra points when filed correctly |
| Short Fuse | Risk | Timed memo rules (forbid, stamp, double, rush, audit) last half as long |

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Draft time limit | 20 | s | Enough to argue, short enough to keep the pace? |
| Options per draft | 3 | cards | |
| Display time of the adopted card | 2.4 | s | |

## Edge cases
- Solo practice: the one human votes alone and the draft ends at once.
- A player joining during a draft can vote as soon as they appear.
- Directives that only help when a feature is present (Rubber Stamp, Performance Bonus) can be adopted before the stamp desk opens in shift 3. This is intended, as a long-term bet.

## Open questions
- [ASSUMPTION] Twelve directives are enough for a first playtest. A run that passes 12 shifts uses them all, and from then on no draft is offered.
- [ASSUMPTION] Several directives are not balanced against each other (for example Second Wind, which is strong). Tune after seeing which cards teams fight over.
- [ASSUMPTION] Majority voting is the right choice. A single "chair" could decide instead.

## History
- 24/11/2026: designed.
