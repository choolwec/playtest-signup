# Memo relay

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

Every so often the Ministry issues a memo that changes a rule. Only one player can read it. They have to tell the others by voice while everyone keeps sorting files. Everyone sees that a memo exists, but nobody except the holder sees what it says, and nothing on the floor changes to show the new rule. This is the game's one twist and it serves the pillar *Talk or fail*.

## Rules
1. The first memo of a shift is issued after the first-memo delay. After that, memos come at the memo interval. No memo is issued in the last few seconds of a shift (less than its lead time plus 3 seconds left), because it could not take effect.
2. In shift 1 each memo goes to one human player, chosen in turn so that everyone holds one in rotation. From shift 2 a memo goes to the registrar of the colour it is about (see [need to know](../need-to-know/design.md)). Bots never hold memos.
3. A memo has a type: **remap** (a colour's correct tray changes), **forbid** (touching one colour is not allowed for a time), **double** (one colour scores double for a time), from shift 2 **rush** (one colour arrives twice as often for a time) or, from shift 3, **stamp** (one colour must be stamped for a time, see [stamp desk](../stamp-desk/design.md)) and **audit** (every mistake costs 3 points for a time, not tied to a colour, so it goes to a rotating holder).
4. The holder sees the memo text, and a countdown to when it takes effect, in a private strip under the top bar. When two memos are pending, both are shown side by side.
5. Everyone sees a banner "MEMO ISSUED - SOMEONE HAS NEW ORDERS - IN FORCE IN n s". The banner never shows the content or the holder.
6. After the lead time the memo is in force for everyone. Trays and files keep their old labels (decision D-005 in the [GDD](../../GDD.md#decisions)).
7. A remap lasts until the end of the shift unless a later remap replaces it. A timed memo (forbid, stamp, double, rush, audit) is replaced if a newer memo of the same kind takes effect while it is running, and is reported as SUPERSEDED.
8. Touching a forbidden file destroys it and gives 1 strike. The forbid ends after its duration.
9. In solo practice, pressing F "shouts" the oldest unshouted memo that bots can act on (remap, forbid or stamp), or else the oldest of any kind. Bots then follow it once it is in force. Bots that were not told keep following the old rule.
10. When the shift ends, a memo report lists each memo (up to six) with a verdict. A memo that never took effect is reported as EXPIRED. A remap is **lost in relay** when the team made at least 2 deliveries to the old tray and no more good deliveries than bad ones. Otherwise it is **relayed** (or **not tested** if no matching delivery happened).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| First memo | 10 | s into a shift | Is it too early to settle into the rush first? |
| Memo interval | 22, minus 2 per shift, minimum 12 (35% shorter with Red Tape) | s | Do memos overlap and confuse? |
| Lead time (issued to in force) | 8 (12 with Early Warning, 6 with Short Fuse, see [directives](../directives/design.md)) | s | Long enough to shout, short enough to panic? |
| Forbid duration | 12 (6 with Short Fuse) | s | |
| Double duration | 12 (6 with Short Fuse) | s | |
| Rush duration | 12 (6 with Short Fuse) | s | Does the extra supply of one colour change who does what? |
| Audit duration | 15 (8 with Short Fuse) | s | Do players freeze up while it is in force? |
| Type mix, shift 1 | remap 50%, forbid 25%, double 25% | % | Which type causes the funniest mistakes? |
| Type mix, shift 2 | remap 40%, forbid 20%, double 20%, rush 20% | % | |
| Type mix, shift 3 onwards | the second memo of each shift is always a stamp memo. Others: remap 29%, forbid 14%, double 14%, rush 14%, stamp 14%, audit 14% | % | |

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
- 24/11/2026: rush and audit memo types added in the finishing pass.
- 24/11/2026: from shift 2 memos go to the colour's registrar and a stamp memo type was added.
- 24/11/2026: wording changed from crates and bins to files and trays. The holder's memo is now a typed paper strip with an "EYES ONLY" stamp, and the public cue is a hazard-striped banner.
