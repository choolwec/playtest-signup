# Memo relay

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

Every so often the Ministry issues a memo that changes a rule. Only one player can read it. They have to tell the others by voice while everyone keeps sorting crates. Everyone sees that a memo exists, but nobody except the holder sees what it says, and nothing on the floor changes to show the new rule. This is the game's one twist and it serves the pillar *Talk or fail*.

## Rules
1. The first memo of a shift is issued after the first-memo delay. After that, memos come at the memo interval.
2. Each memo goes to one human player, chosen in turn so that everyone holds one in rotation. Bots never hold memos.
3. A memo has a type: **remap** (a colour's correct bin changes), **forbid** (touching one colour is not allowed for a time) or **double** (one colour scores double for a time).
4. The holder sees the memo text, and a countdown to when it takes effect, in a private strip under the top bar.
5. Everyone sees a banner "MEMO ISSUED - SOMEONE HAS NEW ORDERS - IN FORCE IN n s". The banner never shows the content or the holder.
6. After the lead time the memo is in force for everyone. Bins and crates keep their old labels (decision D-005 in the [GDD](../../GDD.md#decisions)).
7. A remap lasts until the end of the shift unless a later remap replaces it.
8. Touching a forbidden crate destroys it and gives 1 strike. The forbid ends after its duration.
9. In solo practice, pressing F "shouts" the oldest unshouted memo. Bots then follow it once it is in force. Bots that were not told keep following the old rule.
10. When the shift ends, a memo report lists each memo with a verdict. A remap is **lost in relay** when the team made at least 2 deliveries to the old bin and no more good deliveries than bad ones. Otherwise it is **relayed** (or **not tested** if no matching delivery happened).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| First memo | 10 | s into a shift | Is it too early to settle into the rush first? |
| Memo interval | 22, minus 2 per shift, minimum 12 | s | Do memos overlap and confuse? |
| Lead time (issued to in force) | 8 | s | Long enough to shout, short enough to panic? |
| Forbid duration | 12 | s | |
| Double duration | 12 | s | |
| Type mix | remap 50%, forbid 25%, double 25% | % | Which type causes the funniest mistakes? |

## Edge cases
- The holder disconnects after a memo is issued: the memo is lost and the team learns the rule by striking out.
- Two remaps for the same colour: the later one wins.
- A remap that would match the current rule is never issued.
- With only one human player, that player always holds the memo.

## Open questions
- [ASSUMPTION] A public "memo issued" banner makes people ask "who has it?", which creates talk. If it feels like a spoiler, remove it.
- [ASSUMPTION] Rotating the holder is fairer than a random pick.
- Evidence so far: headless runs with bots on 24/11/2026 (6 runs per setting, simulation only, not humans). With a perfect relay, every run passed shift 1 for 2, 3 and 4 players. With no relay, shift 1 pass rate fell to 2 of 6, 3 of 6 and 2 of 6 respectively, with around 10 to 20 strikes. So the memo changes outcomes, but whether people enjoy relaying it is unknown until a playtest.

## History
- 24/11/2026: designed. A throwaway version exists in [the prototype](../../../prototypes/memo-relay/index.html).
