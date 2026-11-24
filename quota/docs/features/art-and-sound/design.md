# Art and sound

**Status:** designed · **Updated:** 24/11/2026 · [GDD](../../GDD.md)

The look and sound aim for the tactile, juicy feel of Balatro without copying anything from it: a painted swirling background, a pixel font, chunky outlined panels, playing-card files, and a CRT screen effect, with an original lo-fi jazz soundtrack that gets tense as the shift heats up. Serves the pillars *Panic you can read* and *Absurd bureaucracy, no horror*.

## Rules
1. **Background:** a swirling, banded paint shader. Its palette changes per shift (teal, indigo, wine, crimson) and turns green-gold on a pass and dark red on a failure. It tints red and pulses in the last 10 seconds. It pulses with the kick drum.
2. **Screen effect:** the whole picture goes through a mild CRT pass (barrel curve, scanlines, colour fringing, glow, vignette, grain). The `C` key turns it off. If WebGL is unavailable the game falls back to a flat painted background.
3. **Type and panels:** Pixelify Sans (open licence) embedded in the file. Panels have a dark outline, a drop shadow and a top highlight.
4. **Characters:** small clerks with a tie, ID badge and a name tag. They bob and squash while walking and face the way they move.
5. **Juice:** confetti on delivery, score numbers that pop and drift, screen shake and a short freeze on a strike, rolling score counter, multiplier badge pop, flashing trays.
6. **Music:** generated live in the browser, no audio files. A 8-bar A minor loop (Am9, Dm9, G13, Cmaj9, then a turnaround with E7b9) with swing, electric piano, bass, drums and a sparse lead. Four intensity levels: 0 lobby and results (pad and piano only), 1 shift (bass, drums, lead), 2 memo pending or under 20 s left (hats, arpeggio), 3 under 8 s left (alarm ticks). Tempo rises with the level and the shift.
7. **Effects:** pick-up, delivery (rising with streak), multiplier up, wrong tray, memo issued (phone ring), memo in force (stamp), countdown ticks, shift start, pass and fail jingles.
8. `M` mutes the music and `N` mutes effects. Both choices are remembered.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Tempo by level | 84, 90, 100, 108 (+2 per shift, up to +10) | BPM | Does the speed-up feel exciting or stressful? |
| Music bus level | 0.6 | gain | Can friends still hear each other and the game over Discord? |
| Screen shake on strike | 0.65 | 0 to 1 | Too much on a big screen? |
| Strike freeze | 0.07 | s | |

## Edge cases
- Browsers block sound until the first click or key press, so music starts on the menu's first click.
- The picture is drawn at the window's size (up to twice the base resolution), so it stays sharp on larger screens.
- Players on separate PCs each run their own music from the shared game state, so beats are not in sync across players.

## Open questions
- [ASSUMPTION] The music suits you. I could only verify it numerically (see below), not listen to it, so tempo, key and mood are guesses.
- [ASSUMPTION] Constant CRT scanlines are fine for long sessions. Turn it off with `C` if it tires the eyes.
- Evidence so far (24/11/2026, rendered offline in headless Chrome): all four music levels render without errors or invalid samples. Peak level stays below 0.81 of full scale even with a dozen effects at once, and the average level is about −17 dBFS in play and −24 dBFS in the lobby. Screenshots were reviewed for layout. Nobody has listened to it.

## History
- 24/11/2026: designed and built in the presentation pass after feedback that the greybox looked lacklustre.
