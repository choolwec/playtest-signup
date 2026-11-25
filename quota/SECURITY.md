# Security review: Quota

Reviewed on 24/11/2026 to 25/11/2026 by three kinds of tester: an automated static and browser-security review, a hostile-client penetration test against the host, and my own fuzz and attack scripts (`tests/attack-host.js`, `tests/attack-client.js`). A third penetration test (hostile host against clients, and information leaks) was cut short by a usage limit and **did not report**. Its ground is covered only in part: the static review fuzzed the client's message handlers with 20,000 malformed messages (no exceptions, no pollution), my own `attack-client.js` ran 22 hostile-host cases (no errors), and the multiplayer QA run checked that each player's memos and tray routing reached only that player. Nobody has tried to attack real players over the public internet with a hostile host in a long session. Treat this as a friends-only game, not hardened software.

## Fixed

| Finding | Severity | Fix |
|---|---|---|
| A crafted link (`?mode=join-online&code=...`) joined or hosted an online room silently | Medium | Online actions from a link now ask for confirmation, naming the room and warning that the IP address is shared. Unknown or malformed `mode` values are ignored |
| Player id `__proto__` replaced the host's player list prototype | High | Players, known ids and votes are null-prototype maps. Ids must match `[A-Za-z0-9_-]{1,40}` and `__proto__` is refused |
| A malformed snapshot or event from a host made a client's screen throw on every frame | High | Every message a client receives is validated and clamped (`cleanSnap` and per-type checks). The drawing code is wrapped so one error cannot stop the loop |
| Join messages were not rate limited | High | At most about 30 joins a second in total, names are cut to 64 characters before processing, and PeerNet closes a connection after 30 joins in 10 seconds |
| Host kept every connection, even ones that never joined, and sent them all snapshots | Low | At most 12 connections, connections not admitted within 10 seconds are closed, snapshots go only to admitted players |
| Room codes were 6 letters from `Math.random` | Low | 8 letters from `crypto.getRandomValues` (about 36 bits). The room also locks when shift 1 starts |
| Content Security Policy allowed all inline scripts and `'self'` | Low | The release file allows only its own two script blocks and one style block, by SHA-256 hash, and connections only to `0.peerjs.com` |
| Test hooks (`window.Q`, `simulate`) shipped in the file | Info | Removed from the release build. `quota-test.html` keeps them for the tests |
| Wrong font licence notice | Info | Replaced with the licence from the Jersey 10 project |
| Names could imitate the host or a bot | Info | Reserved names get an underscore appended |
| A page without BroadcastChannel threw an unhandled error | Low | The game shows a message instead |
| **Same-computer mode: any page of the same origin could forge host messages, impersonate players, and flood the host** | **Critical to high, same browser only** | The release build removes the same-computer mode entirely, because BroadcastChannel has no authentication. The test build keeps it for development |

## Accepted or open

- **Same-computer mode in the test build** is unauthenticated by design. Do not share `quota-test.html`.
- **Join flood over the same-computer channel** still slows the host in the test build (the browser handles the messages before the game can drop them). Not reachable in the release build.
- **IP addresses are visible to the other players**, and, along with the room code, to the PeerJS signalling server, Google's public STUN server and PeerJS's public TURN relay. This is inherent to peer-to-peer play. The README says so.
- **The host is trusted.** A hostile host can show clients up to 160 characters of memo text and 24 of effect text, and can lie about the game state. This is inherent to a host-authoritative game among friends.
- **A player briefly disconnected for under 8 seconds keeps their seat**, so a stranger who already knew that player's peer id could try to take it. Practical risk is very low.
- **Files opened from disk share browser storage and channels** with other local files opened in the same browser profile. The storage holds only a nickname, a best shift and option choices.
- **Navigation and `window.open` are not controlled by a meta CSP**, and WebRTC is not controlled by CSP at all. There is no code path that could use them with untrusted input (no `innerHTML`, `eval`, or string timers anywhere).
- **Names are the only text players type** and are limited to 10 letters, digits and a few symbols. There is no profanity filter.

## Verified fine

- The vendored PeerJS is byte-identical to the official `peerjs@1.5.4` npm package (SHA-256 in `CREDITS.md`).
- The built file contains no telemetry and makes no network request until a player starts or joins an online game.
- The release CSP blocks `eval`, remote scripts, images and styles, `fetch` or WebSocket to any other host, iframes and `<base>`, with PeerJS online play still working under it.
- 20,000 random malformed messages through the client handlers, and hostile ids, huge numbers and a 5 MB name against the host: no exceptions and no pollution.
- With WebGL off, Workers missing, no AudioContext, `localStorage` throwing, or `matchMedia` missing, the game still runs.
