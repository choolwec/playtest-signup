# Need to know

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

From shift 2, the trays are renumbered and the routing is shuffled, and nobody can see the whole picture. Each colour has a registrar, one player who privately sees where that colour goes. Everyone else has to ask. Because memos change a colour's destination mid-shift, the registrar also receives that colour's memos, so the person who knows the rule is the person who must shout it. It turns the memo relay from an occasional event into constant talk. Serves the pillar *Talk or fail*.

## Rules
1. **Shift 1 (tutorial):** the trays are coloured, the routing is public (each colour goes to its own tray) and there are no registrars. Memos go to a rotating holder.
2. **From shift 2:** the trays show the numbers 1 to 3. At the start of each shift the routing is shuffled so no colour goes to its "obvious" tray (one of the two arrangements where every colour moves).
3. Each colour is given a registrar from among the human players, in turn, shifted by one each shift. With fewer players than colours, a player can be registrar for several colours. In solo practice, the player is registrar for all three.
4. A registrar sees a "Your clearance" panel listing only their colours and the tray each goes to. The panel updates the moment a remap memo takes effect.
5. A memo about a colour goes to that colour's registrar.
6. The routing is never sent to players who are not its registrar. A wrong delivery only says "WRONG TRAY".
7. Bots know the routing at the start of a shift. They follow a memo only once a human shouts it (F in solo).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| First shift with need-to-know | 2 | shift | Does shift 1 teach enough? |
| Registrar rotation | shifts by 1 per shift | | Do players dislike having the same colour twice in a row? |
| Colours per registrar | 1 with 3 or more players, 2 with 2 players, 3 solo | | Is a two-player game too busy for the registrar of two colours? |

## Edge cases
- A registrar who disconnects: the Ministry reassigns their colours at once to the present player with the fewest, who receives the current routing for them, and a message says so.
- A player who joins mid-shift is not a registrar until the next shift.
- Two colours can end up routed to the same tray after a remap.

## Open questions
- [ASSUMPTION] After the first minute the team will know all three rows, so the constant talk fades. Remaps and the shuffle at the next shift renew it. If the talk dies, add more frequent small remaps.
- [ASSUMPTION] Trial and error is a valid, costly shortcut (a strike breaks the streak). If teams rely on it, make a wrong delivery cost more.

## History
- 24/11/2026: designed after the feedback that the main mechanic was not interesting enough.
