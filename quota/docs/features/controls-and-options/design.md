# Controls and options

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

Everything a player needs to get in, understand the game and play comfortably: a how-to-play screen, keyboard and controller controls, accessibility options, pause, and room controls for the host. Serves the pillars *Always know the goal* and *Scales to the table*.

## Rules
1. **How to play:** a screen reachable from the menu button and the `H` key at any time. A solo game pauses while it is open. Online games carry on, so close it quickly. It explains the goal, controls, scoring, each shift's new rule and directives.
2. **Keyboard:** movement with `WASD` (by key position, so French and other layouts use the same physical keys) or the arrow keys. Keys pressed with Ctrl, Alt or Cmd are ignored. While the how-to screen is open game keys are ignored and a solo game pauses. `E` or `Space` grabs and drops. `1`, `2`, `3` vote on directives. `Enter` moves on (host only). `F` shouts a memo to the bots (solo only).
3. **Controller:** left stick or the D-pad moves. `A` grabs and drops, and also votes for card 1. `B` votes for card 2. `X` shouts and votes for card 3. `Start` moves on (host).
4. **Options:** `M` mutes music, `N` mutes sound effects, `C` turns off the screen (CRT) effect, `R` reduces motion (no screen shake, no freeze on a strike, steady banners, slower background with no drum pulse). All four are remembered. Reduce motion starts on if the operating system asks for it.
5. **Pause:** `P` pauses solo practice only, and a solo game also pauses by itself when the window loses focus or is hidden. Online games cannot pause.
6. **Leaving:** `Esc` twice within two seconds leaves the game and returns to the menu.
7. **Room controls (host):** `L` locks or unlocks the room. The room locks automatically when shift 1 starts. A locked room refuses new players, as does a full room (6 players). A refused player sees a clear message and not the game. A player who was already in the room can always come back, for example after their window stopped drawing. Online room codes are 6 letters. The host sees who joined as a message and the room status at the bottom of the screen between shifts.
8. Players' names are limited to 10 characters from letters, digits, space and a few symbols.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Room size | 6 | players | |
| Stick dead zone | 0.25 | | Does drift move players? |
| Leave confirmation window | 2 | s | |

## Edge cases
- Keys typed into the name or room code boxes never trigger game actions.
- A controller press is ignored until the first edge, so a held button does not repeat.
- Movement follows the key position, so on a French keyboard the keys are `ZQSD` (arrows always work).
- A client sends a heartbeat from a timer, so a window that stops drawing is not dropped (the host drops players it has not heard from for 8 seconds).

## Open questions
- [ASSUMPTION] Friends use Chrome or Edge on Windows. Other browsers are untested.
- [ASSUMPTION] Online pause would help but is not worth the design cost for a friends game.

## History
- 24/11/2026: designed. Added in the finishing pass.
