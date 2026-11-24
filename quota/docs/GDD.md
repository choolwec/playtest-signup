# Quota: Game Design Document

**Version:** 0.5 · **Updated:** 24/11/2026 · [Features](#feature-index) · [Decisions](#decisions) · [Change log](#change-log)

## Summary
You and 1 to 5 friends are the night crew of a Ministry sorting hall, talking on Discord while case files, drawn as playing cards, race down a belt. Every correct delivery builds a shared multiplier, and every mistake breaks it. Every shift has a quota. From the second shift nobody can see the whole picture: each player privately knows where some colours go, and every few seconds the Ministry issues a memo that changes a rule, which only one player can read. The team has to keep shouting what they know while they work. From the third shift a stamp desk adds a bottleneck. After each pass the team votes on a directive that changes the rules for the rest of the run. A missed quota costs a life, and the run ends when both lives are gone. Each shift is faster and more confusing than the last. Clear shift 10 and the Ministry's twist arrives: you have been promoted to the department that writes the memos. Then the run continues as endless overtime.

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
1. **Talk or fail.** The rules of the game are split between players, so the team has to speak constantly. No rule or rule change is ever shown on the floor.
2. **Panic you can read.** Bold shapes, big letters and a distinct symbol for every colour. The chaos comes from people shouting, not from visual clutter.
3. **Always know the goal.** The quota and timer are always on screen and every strike says why. The game is hard, never vague.
4. **Absurd bureaucracy, no horror.** Dry satire of a dystopian ministry. Funny first, tense second.
5. **Scales to the table.** The same shift works with 2 to 6 players, with files and quotas scaled to the headcount.
6. **Feels good to touch.** Every action gets a sound, a pop or a shake, and the music reacts to how the shift is going.

## Core loop
```
files arrive → ask who knows → grab → (stamp) → right tray → score x streak
       ↑                                                         ↓
  new directive ← quota met ← memo changes a rule ← relay it by voice
```
- **Seconds:** [file sorting](features/crate-sorting/design.md) and the [streak multiplier](features/streak-multiplier/design.md)
- **Minutes:** [need to know](features/need-to-know/design.md), [memo relay](features/memo-relay/design.md) (one memo every 12 to 22 s) and the [stamp desk](features/stamp-desk/design.md)
- **Session and between sessions:** [shift progression](features/shift-progression/design.md) and [directives](features/directives/design.md). Nothing is saved between nights

## Feature index

| Feature | Status | Scope | Summary | Docs |
|---|---|---|---|---|
| File sorting | designed | MVP | Grab case files off the belt, carry one at a time to the matching tray | [design](features/crate-sorting/design.md) |
| Streak multiplier | designed | MVP | Correct deliveries in a row raise a shared multiplier up to x5. A mistake resets it | [design](features/streak-multiplier/design.md) |
| Need to know | designed | MVP | From shift 2 the routing is shuffled and each player privately sees only some colours | [design](features/need-to-know/design.md) |
| Memo relay | designed | MVP | The player who knows a colour privately receives its rule change (six kinds) and must relay it by voice | [design](features/memo-relay/design.md) |
| Stamp desk | designed | MVP | From shift 3, a one-at-a-time desk. Memos can require files of a colour to be stamped | [design](features/stamp-desk/design.md) |
| Story and ending | designed | MVP | Ministry notices each shift and a twist promotion at shift 10, then endless overtime | [design](features/story-and-ending/design.md) |
| Controls and options | designed | MVP | How-to-play screen, keyboard and controller, accessibility options, pause, room lock | [design](features/controls-and-options/design.md) |
| Directives | designed | MVP | After each pass the team votes on one of three of twelve rule cards that last for the run | [design](features/directives/design.md) |
| Shift progression | designed | MVP | 75 s shifts with a quota and rising speed. A missed quota ends the run | [design](features/shift-progression/design.md) |
| Online rooms | idea | MVP | Room code, host-run game, friends join from their own PCs | — |
| Memo library | idea | later | Many more memo types and generated variety so they do not repeat | — |
| Story briefings | idea | later | Short satirical Ministry notices between shifts that build a story | — |
| Art and sound | designed | MVP | Painted swirl background, CRT effect, pixel font, card files, juice, and generated lo-fi jazz music with effects | [design](features/art-and-sound/design.md) |

## Milestones
1. **M1, playable core loop:** file sorting, streak multiplier, need to know, memo relay, stamp desk, directives, shift progression, art and sound, a working room code · done when 3 friends have played 3 shifts on voice chat and the [brief](../prototypes/memo-relay/BRIEF.md) has a RESULT line.
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
| D-009 | 24/11/2026 | Introduce rules one shift at a time: shift 1 plain, shift 2 need to know, shift 3 stamp desk | all at once from shift 1 | the user dislikes games that give no direction, so each new rule is announced on its own shift | [shift progression](features/shift-progression/design.md) |
| D-010 | 24/11/2026 | The routing is split between players (need to know) instead of being public | keep the routing public and rely on memos only | feedback that carrying files to trays was not interesting enough. Constant questions on voice are the point of the game | [need to know](features/need-to-know/design.md) |
| D-011 | 24/11/2026 | Add a one-at-a-time stamp desk and a vote on directives between shifts | a second carry slot; contracts and orders | the desk adds a time bottleneck that forces role-sharing out loud, and directives give a build layer like Balatro's jokers | [stamp desk](features/stamp-desk/design.md), [directives](features/directives/design.md) |
| D-012 | 24/11/2026 | A satirical story with a twist at shift 10, and endless overtime after it | no story; a fixed ending that stops the run | the user loves stories with a twist, and a finished game needs an ending. The twist (you write the memos) comes from the game's own mechanic | [story and ending](features/story-and-ending/design.md) |
| D-013 | 24/11/2026 | Difficulty curve eased so a competent group can reach the ending | keep the steeper curve | the ending should be reachable. Bots with a good relay now usually clear shift 10, and humans are slower | [shift progression](features/shift-progression/design.md) |
| D-014 | 24/11/2026 | Use Jersey 10 as the pixel font, and a plain sans font for the smallest text | keep Pixelify Sans | QA found Pixelify Sans turns C into O and 5 into S once the screen effect softens it, which broke quotas and headings | [art and sound](features/art-and-sound/design.md) |
| D-015 | 24/11/2026 | Treat every network message as untrusted: validate on both sides, null-prototype player map, rate limits, room code of 6 letters, room lock, strict player id format | trust friends | the host and clients accept messages from other computers, and a malformed one broke a client's screen and the host's player list | [controls and options](features/controls-and-options/design.md) |
| D-016 | 24/11/2026 | Two lives per run, and a 3.2 second get-ready countdown before every shift | one life; instant start | bot runs showed one life makes a run swing from trivial to brutal on small differences in mistakes, and an instant start is unfair to players who are not ready | [shift progression](features/shift-progression/design.md) |

## Open questions
- **Assumptions to confirm:** engine and framework for production (D-001 covers the prototype only); the group size you usually play with; whether the memo holder should rotate automatically (assumed yes).
- **Risks:**
  - *Memos run out of variety.* Three memo types may repeat by hour two. Find out: watch whether friends stop reacting to memos by shift 4.
  - *The holder is a single point of failure.* It could feel unfair rather than funny. Find out: ask whether blame lands on the holder or the team.
  - *Panic fades into competence.* Players may optimise the shouting routine. Find out: shifts 4 to 6 should still cause mistakes.
  - *Connection.* WebRTC can fail on strict home networks (no relay server is set up). Find out: try each friend once before game night.
  - *Too many ideas at once.* Three new rules and a draft may overwhelm a first-time group. Find out: watch whether friends understand each new rule from its banner alone.
  - *Constant talk fades.* Once the team memorises the routing, need to know goes quiet until the next shuffle. Find out: listen for chatter in the middle minutes of shifts 2 and 3.
  - *Looks and music are unheard.* The visuals were checked in screenshots and the music only measured, never listened to. Find out: ask the first playtester what they thought of the music and screen effect.

## Change log
**0.1 (24/11/2026):** first draft with three core features; D-001 to D-005 logged.
**0.5 (24/11/2026):** QA and hardening pass (also two lives, a get-ready countdown, action prompts, directive rebalancing and a guaranteed stamp memo): soft-lock when the directive pool runs out, a client dropped when its window stopped drawing, zoomed screen in small windows, unreadable glyphs (font swapped), keyboard layouts, stale memos, memo and shuffle rules matched to the docs, refused-player screen, registrar reassignment; D-014 to D-016 logged.
**0.4 (24/11/2026):** finishing pass: [story and ending](features/story-and-ending/design.md) and [controls and options](features/controls-and-options/design.md) designed; rush and audit memos, four more directives, gold files, second music progression, easier difficulty curve; D-012 and D-013 logged.
**0.3 (24/11/2026):** gameplay pass after feedback that the core mechanic was not interesting enough: [need to know](features/need-to-know/design.md), [stamp desk](features/stamp-desk/design.md) and [directives](features/directives/design.md) designed; D-009 to D-011 logged.
**0.2 (24/11/2026):** presentation pass: [art and sound](features/art-and-sound/design.md) designed, [streak multiplier](features/streak-multiplier/design.md) added, crates renamed files and bins renamed trays; D-006 to D-008 logged.
