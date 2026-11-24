#!/usr/bin/env python3
"""Build quota/dist/quota.html: index.html with the fonts and PeerJS embedded, so it is one shareable file.

Run from anywhere:  python3 quota/prototypes/memo-relay/build.py
"""
import base64
import pathlib
import re

here = pathlib.Path(__file__).resolve().parent
src = (here / "index.html").read_text(encoding="utf-8")

# Embed fonts: url(fonts/pixelify-400.woff2) -> data URI
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

out = here.parent.parent / "dist" / "quota.html"
out.parent.mkdir(exist_ok=True)
out.write_text(src, encoding="utf-8")
print(f"wrote {out} ({out.stat().st_size} bytes, {n_fonts} fonts embedded)")
