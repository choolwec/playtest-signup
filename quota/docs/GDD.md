# Quota: Game Design Document

**Version:** 0.1 · **Updated:** 24/11/2026 · [Features](#feature-index) · [Decisions](#decisions) · [Change log](#change-log)

## Summary
You and 1 to 5 friends are the night crew of a Ministry sorting hall, talking on Discord while crates race down a belt. Every shift has a quota. Every few seconds the Ministry issues a memo that changes a rule, but only one player can read it, so that player has to shout it across the hall while everyone keeps working. Miss it and the team sorts crates under the wrong rule and takes strikes. A missed quota ends the run. Each shift is faster and more confusing than the last.

| | |
|---|---|
| Genre and camera | Co-op real-time sorting, top-down, one screen |
| Audience | A small friend group (2 to 6, varies), mixed skill, for game nights and voice-chat clips. Friends-only, not sold |
| Platforms and input | Windows PC in a browser, keyboard. No install, join by room code |
| Session | One shift is 75 s. A run is as many shifts as the quota allows. A night is roughly 20 to 40 minutes |
| Engine | [ASSUMPTION] Plain HTML5 canvas in JavaScript for the prototype. Production framework not chosen (see D-001) |
| Scope | Prototype first (one HTML file). Kept only if the playtest says so |
| References | Overcooked (rush and shouting), Keep Talking and Nobody Explodes (information gap), Papers, Please (bureaucratic rule changes) |

## Pillars
1. **Talk or fail.** Anything that matters is private to one player at a time, so the team has to speak. No rule change is ever shown on the floor.
2. **Panic you can read.** Flat, bold shapes and big letters. The chaos comes from people shouting, not from visual clutter.
3. **Always know the goal.** The quota and timer are always on screen and every strike says why. The game is hard, never vague.
4. **Absurd bureaucracy, no horror.** Dry satire of a dystopian ministry. Funny first, tense second.
5. **Scales to the table.** The same shift works with 2 to 6 players, with crates and quotas scaled to the headcount.

## Core loop
```
crates arrive → grab → carry to the right bin → score
        ↑                                           ↓
 harder shift ← quota met ← memo changes a rule ← relay it by voice
```
- **Seconds:** [crate sorting](features/crate-sorting/design.md)
- **Minutes:** [memo relay](features/memo-relay/design.md), one memo every 12 to 22 s
- **Session and between sessions:** [shift progression](features/shift-progression/design.md). Nothing is saved between nights

## Feature index

| Feature | Status | Scope | Summary | Docs |
|---|---|---|---|---|
| Crate sorting | designed | MVP | Grab crates off the belt, carry one at a time to the matching bin | [design](features/crate-sorting/design.md) |
| Memo relay | designed | MVP | One rotating player privately receives a rule change and must relay it by voice | [design](features/memo-relay/design.md) |
| Shift progression | designed | MVP | 75 s shifts with a quota and rising speed. A missed quota ends the run | [design](features/shift-progression/design.md) |
| Online rooms | idea | MVP | Room code, host-run game, friends join from their own PCs | — |
| Memo library | idea | later | Many more memo types and generated variety so they do not repeat | — |
| Story briefings | idea | later | Short satirical Ministry notices between shifts that build a story | — |
| Art and sound pass | idea | later | Bold graphic polish, juice, a sound set | — |

## Milestones
1. **M1, greybox core loop:** crate sorting, memo relay, shift progression, a working room code · done when 3 friends have played 3 shifts on voice chat and the [brief](../prototypes/memo-relay/BRIEF.md) has a RESULT line.
2. **M2, only if M1 is a keep:** rewrite in a real project structure, with a larger memo library and an art pass.

## Decisions

| ID | Date | Decision | Alternatives considered | Why | Affects |
|---|---|---|---|---|---|
| D-001 | 24/11/2026 | Browser game on HTML5 canvas, with friends joining by room code | native Godot Windows build | friends join by link with nothing to install, and WebRTC avoids port forwarding. Fastest route to something playable | all features |
| D-002 | 24/11/2026 | Build Quota, ahead of Fine Print, Mapper, Compromised and Alibi | any of those four | four simulated judges scored Quota 31.5 of 40 against 31.0 for Fine Print (a near tie). Quota was never ranked below 2nd, and it works with 2 to 3 players. These are simulations, not playtest data | [memo relay](features/memo-relay/design.md) |
| D-003 | 24/11/2026 | Skip the market verdict (concept-judge) and use playtest kill numbers instead | run the judge first | the game is not sold, so competitor prices and review counts do not apply | [brief](../prototypes/memo-relay/BRIEF.md) |
| D-004 | 24/11/2026 | Voice chat stays on Discord and is not built | built-in voice | it saves build time and friends already use Discord | [memo relay](features/memo-relay/design.md) |
| D-005 | 24/11/2026 | A rule change is never shown on the floor. The bins and crates keep their old labels | relabel bins when a rule changes | the whole game depends on the information gap | [memo relay](features/memo-relay/design.md) |

## Open questions
- **Assumptions to confirm:** engine and framework for production (D-001 covers the prototype only); the group size you usually play with; whether the memo holder should rotate automatically (assumed yes).
- **Risks:**
  - *Memos run out of variety.* Three memo types may repeat by hour two. Find out: watch whether friends stop reacting to memos by shift 4.
  - *The holder is a single point of failure.* It could feel unfair rather than funny. Find out: ask whether blame lands on the holder or the team.
  - *Panic fades into competence.* Players may optimise the shouting routine. Find out: shifts 4 to 6 should still cause mistakes.
  - *Connection.* WebRTC can fail on strict home networks (no relay server is set up). Find out: try each friend once before game night.

## Change log
**0.1 (24/11/2026):** first draft with three core features; D-001 to D-005 logged.
