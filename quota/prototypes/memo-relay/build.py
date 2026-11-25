#!/usr/bin/env python3
"""Build the shareable single-file game.

  python3 quota/prototypes/memo-relay/build.py

Writes two files to quota/dist/:
  quota.html       the release build: fonts and PeerJS embedded, a strict Content Security Policy
                   (script and style allowed only by SHA-256 hash), the test hooks removed, and the
                   same-computer (BroadcastChannel) mode disabled because it has no authentication.
  quota-test.html  the same, but with the window.Q test hooks kept, for the browser tests.
"""
import base64
import hashlib
import pathlib
import re

here = pathlib.Path(__file__).resolve().parent
src = (here / "index.html").read_text(encoding="utf-8")

# Embed fonts: url(fonts/jersey-10-400.woff2) -> data URI
def font_uri(match):
    data = (here / "fonts" / match.group(1)).read_bytes()
    return "url(data:font/woff2;base64," + base64.b64encode(data).decode("ascii") + ")"

src, n_fonts = re.subn(r"url\(fonts/([\w.-]+\.woff2)\)", font_uri, src)

# Embed PeerJS in place of the external script tag
tag = '<script src="peerjs.min.js" onerror="window.NO_PEERJS=true"></script>'
assert tag in src, "PeerJS script tag not found"
lib = (here / "peerjs.min.js").read_text(encoding="utf-8")
assert "</script" not in lib.lower(), "library contains a closing script tag"
src = src.replace(tag, "<script>" + lib + "</script>")

def sha(text):
    return "'sha256-" + base64.b64encode(hashlib.sha256(text.encode("utf-8")).digest()).decode("ascii") + "'"

def with_csp(html):
    """Replace the development CSP with one that allows exactly the inline blocks present."""
    styles = re.findall(r"<style>(.*?)</style>", html, re.S)
    scripts = re.findall(r"<script>(.*?)</script>", html, re.S)
    assert styles and scripts, "inline blocks not found"
    assert not re.search(r"<[^>]+\sstyle=", html), "inline style attributes are not allowed by the CSP"
    assert not re.search(r"<[^>]+\son\w+=", html), "inline event handler attributes are not allowed by the CSP"
    csp = ("default-src 'none'; script-src " + " ".join(sha(x) for x in scripts) +
           "; style-src " + " ".join(sha(x) for x in styles) +
           "; font-src data:; img-src data: blob:; connect-src wss://0.peerjs.com https://0.peerjs.com;"
           " worker-src blob:; media-src blob:; base-uri 'none'; form-action 'none'")
    new, n = re.subn(r'(<meta http-equiv="Content-Security-Policy" content=")[^"]*(")', lambda m: m.group(1) + csp + m.group(2), html)
    assert n == 1, "CSP meta tag not found"
    return new

test_build = with_csp(src)
# Release: drop the headless test hooks (window.Q, simulate, audioStats)
release, n_hooks = re.subn(r"/\* =+ HEADLESS TEST HOOKS =+ \*/.*?(?=/\* =+ BOOT)", "", src, flags=re.S)
assert n_hooks == 1, "test hooks section not found"
release = release.replace("const LOCAL_ENABLED=true;", "const LOCAL_ENABLED=false;", 1)
assert "const LOCAL_ENABLED=false;" in release
release, n_row = re.subn(r'<div class="row"><span class="small">Same computer, two tabs:</span>.*?</div>\n?', "", release, count=1, flags=re.S)
assert n_row == 1, "same-computer row not found"
release = with_csp(release)
assert "window.Q" not in release

out_dir = here.parent.parent / "dist"
out_dir.mkdir(exist_ok=True)
(out_dir / "quota.html").write_text(release, encoding="utf-8")
(out_dir / "quota-test.html").write_text(test_build, encoding="utf-8")
print(f"wrote quota.html ({len(release)} bytes) and quota-test.html ({len(test_build)} bytes), {n_fonts} font embedded")
