"""Regenerate the browser-safe resume preview after replacing public/resume.pdf.

Requires Poppler (pdftoppm and pdftotext). Run: python3 scripts/render-resume.py
"""
import hashlib
import json
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]
pdf = root / "public/resume.pdf"
output = root / "public/resume-preview"
output.mkdir(exist_ok=True)
subprocess.run(["pdftoppm", "-scale-to", "1800", "-png", str(pdf), str(output / "page")], check=True)
text = subprocess.check_output(["pdftotext", "-layout", str(pdf), "-"], text=True)
pages = text.rstrip("\n\f").split("\f")
manifest = {
    "sourceSha256": hashlib.sha256(pdf.read_bytes()).hexdigest(),
    "pages": [
        {"image": f"/resume-preview/page-{str(i).zfill(len(str(len(pages))))}.png", "text": page.strip()}
        for i, page in enumerate(pages, 1)
    ],
}
(root / "src/data/resumePreview.json").write_text(json.dumps(manifest, indent=2) + "\n")
