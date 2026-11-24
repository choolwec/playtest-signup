# Prototype brief: memo relay

```text
QUESTION:   Does one player privately holding a rule change, and having to shout it to
            the others mid-rush, make a group talk, panic and ask for another shift?
CORE VERB:  Grab crates off a belt and carry them to the right bin, while relaying memos.
THROWAWAY:  yes. One HTML file, hard-coded values, no architecture. A "keep" means a
            rewrite in the real project, not a copy-paste of this code.
TIMEBOX:    60 min of build. Stop at the timebox even if unfinished.
KEEP IF:    in 3 shifts with 2 to 4 friends on Discord voice:
            - the memo holder is relaying within the first shift without being told to, AND
            - the group asks for another shift unprompted after shift 3.
KILL IF:    - nobody mentions the memo (they ignore it or never talk), OR
            - the memo only matters once explained, OR
            - fixing it needs systems far beyond this prototype (art, levels, cosmetics).
RETUNE IF:  one number is clearly off (quota too easy or too hard, memo lead too short).
            Tuning constants are named at the top of index.html.
RESULT:     (pending: needs a playtest with friends)
```

## How to run

The easiest way is the single file `quota/dist/quota.html` (generated from `index.html` with `peerjs.min.js` embedded). Save it anywhere and open it in Chrome or Edge, and send the same file to friends. If you use the folder version instead, `index.html` and `peerjs.min.js` must stay together. Online rooms use the free PeerJS signalling server and need an internet connection. Each friend does the same on their own PC.

- **Solo practice:** press "Solo practice". You and two bots play. Press `F` to shout a memo to the bots.
- **Same computer, two tabs:** open the page in two tabs of the same browser. Host in one (same-computer button), join in the other with the same code.
- **Friends online:** one person hosts and shares the 5-letter code. Friends open the same page and join. Voice stays on Discord.
- **Controls:** `WASD` or arrow keys to move, `E` or `Space` to pick up or drop at a bin, `F` to shout (bots only), `Enter` to start the next shift (host).

## What to watch (debug measures)

The results screen lists every memo and whether it was relayed in time. A "lost in relay" verdict means the team delivered crates under the old rule after the new one took effect.
