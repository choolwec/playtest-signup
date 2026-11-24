# Quota tests

Browser tests for the prototype, run with Playwright (Chromium) against a local server.

```bash
cd quota/prototypes/memo-relay && python3 -m http.server 8300 --bind 127.0.0.1 &
cd quota/tests
NODE_PATH=$(npm root -g) node regress.js        # fixes found in QA (small window, keyboard layouts, drafts, rejoin...)
NODE_PATH=$(npm root -g) node levels.js         # two players through shifts 1 to 3 (privacy of routing, stamp desk)
NODE_PATH=$(npm root -g) node ending.js         # promotion ending, pause, gamepad, records
NODE_PATH=$(npm root -g) node lives.js          # two lives per run
NODE_PATH=$(npm root -g) node long-sim.js       # bot-only runs to shift 12 for 2, 3, 4 and 6 players
NODE_PATH=$(npm root -g) node audio.js          # offline render of the music (levels, peak, NaN)
NODE_PATH=$(npm root -g) node attack-host.js    # hostile client messages against a host
NODE_PATH=$(npm root -g) node attack-client.js  # hostile host messages against a client
```

Set `BASE=file:///.../quota/dist/quota.html` to test the built single file. Set `OUT=/some/dir` to choose where screenshots are written. These scripts were written during development and use test hooks on `window.Q`. Some set `G.readyT=0` to skip the get-ready countdown.
