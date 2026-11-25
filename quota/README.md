# Quota

A co-op game for a small group of friends on voice chat. You are Ministry clerks sorting case files off a belt. Only some of you can see where each colour goes, memos change the rules mid-shift, and you have to shout them to each other. It runs in a browser from one HTML file. Not for sale.

- **Play:** save `dist/quota.html`, open it in Chrome or Edge, and send the same file to your friends. Press H in the game for the rules.
- **Design:** `docs/GDD.md` and the notes in `docs/features/`.
- **Build:** `python3 prototypes/memo-relay/build.py` writes `dist/quota.html` (release) and `dist/quota-test.html` (keeps the test hooks used by `tests/`).
- **Tests:** see `tests/README.md`.
- **Credits and licences:** `CREDITS.md`.
- **Security review:** `SECURITY.md` lists what was tested, fixed and left open.

## Privacy and security notes

- Online play connects players directly (WebRTC). To set up the connection the game uses the free PeerJS signalling server (`0.peerjs.com`), which sees the room code and the players' IP addresses, plus Google's public STUN server and PeerJS's public TURN relay. The other players in the room can see your IP address too. The game asks you to confirm before it goes online from a link.
- The release file has no same-computer (two tabs) mode. Only `quota-test.html` has it, for development, so share only `quota.html`.
- Room codes are 8 random letters, and the room locks when the first shift starts (host key `L` unlocks it). Anyone who has the code can join until then, so share it privately.
- The game stores only your nickname, your best shift and your option choices in the browser's local storage. Nothing is sent anywhere else, and the game contains no analytics.
- The release build allows scripts and styles only by hash (Content Security Policy) and only connects to `0.peerjs.com`.
- A file opened from disk shares browser storage and same-computer channels with other local files opened in the same browser profile.
