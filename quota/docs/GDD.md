# Quota: Game Design Document

**Version:** 0.2 · **Updated:** 24/11/2026 · [Features](#feature-index) · [Decisions](#decisions) · [Change log](#change-log)

## Summary
You and 1 to 5 friends are the night crew of a Ministry sorting hall, talking on Discord while case files, drawn as playing cards, race down a belt. Every correct delivery builds a shared multiplier, and every mistake breaks it. Every shift has a quota. Every few seconds the Ministry issues a memo that changes a rule, but only one player can read it, so that player has to shout it across the hall while everyone keeps working. Miss it and the team sorts files under the wrong rule and takes strikes. A missed quota ends the run. Each shift is faster and more confusing than the last.

| | |
|---|---|
| Genre and camera | Co-op real-time sorting with a score multiplier, top-down, one screen |
| Audience | A small friend group (2 to 6, varies), mixed skill, for game nights and voice-chat clips. Friends-only, not sold |
| Platforms and input | Windows PC in a browser, keyboard. No install, join by room code |
| Session | One shift is 75 s. A run is as many shifts as the quota allows. A night is roughly 20 to 40 minutes |
| Engine | [ASSUMPTION] Plain HTML5 canvas and WebGL in JavaScript for the prototype. Production framework not chosen (see D-001) |
| Scope | Prototype first (one HTML file with a build script). Kept only if the playtest says so |
| References | Overcooked (rush and shouting), Keep Talking and Nobody Explodes (information gap), Papers, Please (bureaucratic rule changes), Balatro (tactile feel, escalating multiplier, music; nothing copied) |

## Pillars
1. **Talk or fail.** Anything that matters is private to one player at a time, so the team has to speak. No rule change is ever shown on the floor.
2. **Panic you can read.** Bold shapes, big letters and a distinct symbol for every colour. The chaos comes from people shouting, not from visual clutter.
3. **Always know the goal.** The quota and timer are always on screen and every strike says why. The game is hard, never vague.
4. **Absurd bureaucracy, no horror.** Dry satire of a dystopian ministry. Funny first, tense second.
5. **Scales to the table.** The same shift works with 2 to 6 players, with files and quotas scaled to the headcount.
6. **Feels good to touch.** Every action gets a sound, a pop or a shake, and the music reacts to how the shift is going.

## Core loop
```
files arrive → grab → carry to the right tray → score x streak
       ↑                                                ↓
 harder shift ← quota met ← memo changes a rule ← relay it by voice
```
- **Seconds:** [file sorting](features/crate-sorting/design.md) and the [streak multiplier](features/streak-multiplier/design.md)
- **Minutes:** [memo relay](features/memo-relay/design.md), one memo every 12 to 22 s
- **Session and between sessions:** [shift progression](features/shift-progression/design.md). Nothing is saved between nights

## Feature index

| Feature | Status | Scope | Summary | Docs |
|---|---|---|---|---|
| File sorting | designed | MVP | Grab case files off the belt, carry one at a time to the matching tray | [design](features/crate-sorting/design.md) |
| Streak multiplier | designed | MVP | Correct deliveries in a row raise a shared multiplier up to x5. A mistake resets it | [design](features/streak-multiplier/design.md) |
| Memo relay | designed | MVP | One rotating player privately receives a rule change and must relay it by voice | [design](features/memo-relay/design.md) |
| Shift progression | designed | MVP | 75 s shifts with a quota and rising speed. A missed quota ends the run | [design](features/shift-progression/design.md) |
| Online rooms | idea | MVP | Room code, host-run game, friends join from their own PCs | — |
| Memo library | idea | later | Many more memo types and generated variety so they do not repeat | — |
| Story briefings | idea | later | Short satirical Ministry notices between shifts that build a story | — |
| Art and sound | designed | MVP | Painted swirl background, CRT effect, pixel font, card files, juice, and generated lo-fi jazz music with effects | [design](features/art-and-sound/design.md) |

## Milestones
1. **M1, playable core loop:** file sorting, streak multiplier, memo relay, shift progression, art and sound, a working room code · done when 3 friends have played 3 shifts on voice chat and the [brief](../prototypes/memo-relay/BRIEF.md) has a RESULT line.
2. **M2, only if M1 is a keep:** rewrite in a real project structure, with a larger memo library and an art pass.

## Decisions

| ID | Date | Decision | Alternatives considered | Why | Affects |
|---|---|---|---|---|---|
| D-001 | 24/11/2026 | Browser game on HTML5 canvas, with friends joining by room code | native Godot Windows build | friends join by link with nothing to install, and WebRTC avoids port forwarding. Fastest route to something playable | all features |
| D-002 | 24/11/2026 | Build Quota, ahead of Fine Print, Mapper, Compromised and Alibi | any of those four | four simulated judges scored Quota 31.5 of 40 against 31.0 for Fine Print (a near tie). Quota was never ranked below 2nd, and it works with 2 to 3 players. These are simulations, not playtest data | [memo relay](features/memo-relay/design.md) |
| D-003 | 24/11/2026 | Skip the market verdict (concept-judge) and use playtest kill numbers instead | run the judge first | the game is not sold, so competitor prices and review counts do not apply | [brief](../prototypes/memo-relay/BRIEF.md) |
| D-004 | 24/11/2026 | Voice chat stays on Discord and is not built | built-in voice | it saves build time and friends already use Discord | [memo relay](features/memo-relay/design.md) |
| D-005 | 24/11/2026 | A rule change is never shown on the floor. The trays and files keep their old labels | relabel trays when a rule changes | the whole game depends on the information gap | [memo relay](features/memo-relay/design.md) |
| D-006 | 24/11/2026 | The fiction is case files and trays, drawn as playing cards, instead of crates and bins | keep crates | the user asked for Balatro-level look and feel, and cards read as that at a glance | [file sorting](features/crate-sorting/design.md), [art and sound](features/art-and-sound/design.md) |
| D-007 | 24/11/2026 | Add a shared streak multiplier (x1 to x5) | plain 1 point per delivery | escalating scores and rising chimes are what make that style of game addictive, and it gives optimisers something to chase | [streak multiplier](features/streak-multiplier/design.md) |
| D-008 | 24/11/2026 | Music and effects are generated in the browser. No audio files. The only embedded asset is an open-licence font | downloaded tracks | one self-contained file to share, nothing to license or download, and the music can react to the game | [art and sound](features/art-and-sound/design.md) |

## Open questions
- **Assumptions to confirm:** engine and framework for production (D-001 covers the prototype only); the group size you usually play with; whether the memo holder should rotate automatically (assumed yes).
- **Risks:**
  - *Memos run out of variety.* Three memo types may repeat by hour two. Find out: watch whether friends stop reacting to memos by shift 4.
  - *The holder is a single point of failure.* It could feel unfair rather than funny. Find out: ask whether blame lands on the holder or the team.
  - *Panic fades into competence.* Players may optimise the shouting routine. Find out: shifts 4 to 6 should still cause mistakes.
  - *Connection.* WebRTC can fail on strict home networks (no relay server is set up). Find out: try each friend once before game night.
  - *Looks and music are unheard.* The visuals were checked in screenshots and the music only measured, never listened to. Find out: ask the first playtester what they thought of the music and screen effect.

## Change log
**0.1 (24/11/2026):** first draft with three core features; D-001 to D-005 logged.
**0.2 (24/11/2026):** presentation pass: [art and sound](features/art-and-sound/design.md) designed, [streak multiplier](features/streak-multiplier/design.md) added, crates renamed files and bins renamed trays; D-006 to D-008 logged.
