"""Stamp asset URLs in index.html with a content hash (?v=xxxxxxxx).

Browsers and the GitHub Pages CDN cache files by URL, so an updated
styles.css or photo keeps the old copy until the cache expires. With a
content hash in the URL, any changed file gets a new URL and is fetched
fresh, while unchanged files stay cached. Run before every publish:

    python3 tools/bump_versions.py
"""
import hashlib, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
html_path = root / "index.html"
html = html_path.read_text(encoding="utf-8")

def stamp(match):
    attr, path = match.group(1), match.group(2)
    f = root / path
    if not f.is_file():
        return match.group(0)
    h = hashlib.sha1(f.read_bytes()).hexdigest()[:8]
    return f'{attr}="{path}?v={h}"'

# local src/href/content values only (skip http(s) links and #anchors)
pattern = re.compile(r'(src|href)="(?!https?:|#|mailto:|tel:)([^"?#]+\.(?:css|js|webp|jpg|png|svg))(?:\?v=[0-9a-f]+)?"')
new = pattern.sub(stamp, html)
html_path.write_text(new, encoding="utf-8")
print("stamped", len(pattern.findall(html)), "asset URLs")
