# Testing the Biouh Portfolio Site

This is a single-file portfolio site (`index.html`) with GSAP animations, Three.js particles, custom cursor, cinematic intro, orbit navigation, music player, and a mixed-media work gallery.

## Production URL

- **Production**: https://uh-dev.netlify.app
- **Preview deploys**: https://deploy-preview-{PR_NUMBER}--uh-dev.netlify.app

## Devin Secrets Needed

None — this is a static site with no authentication.

## Key Architecture

- Everything lives in a single `index.html` file (inline CSS + JS)
- External libraries: GSAP 3.12.5, Three.js r128, Font Awesome 6.4.0 (loaded via CDN)
- Assets in `assets/` directory (videos, images, music)
- Deployed via Netlify (auto-deploys on push to main)
- **Case-sensitive file paths**: Linux-based hosts (Netlify, GitHub Pages) are case-sensitive. Always verify asset filenames match exactly (e.g., `Jinx.mp4` not `jinx.mp4`).

## Testing the Intro Animation

1. Hard-refresh the page (Ctrl+Shift+R) to trigger the intro from scratch
2. The intro plays automatically on `window.load` — no click needed to start
3. **What to verify**: "UH…" studio logo text visible, falling pink petals animating, dust ray beams, "ENTER" button appears within ~2 seconds
4. **Known past bug**: The `#irisWipe` element (z-index 18, dark background) can block the intro if its `opacity` is not set to 0. Check that `#irisWipe` has `opacity: 0` in CSS.
5. Click "ENTER" to trigger the iris wipe transition to main interface
6. After transition: orbit buttons, profile picture, music player, and ambient FX should all be visible

## Testing the Custom Cursor

1. After the intro completes, move the mouse slowly across the dark background
2. **What to verify**: No default arrow cursor visible; a pink/neon ring cursor (#cursor) follows the mouse; a small dot (#cursor-dot) is at the exact mouse position
3. Hover over interactive elements (orbit buttons, music player) — the cursor ring should enlarge
4. The custom cursor is only active on desktop (`@media (pointer: fine)`). On touch devices, the default cursor behavior should be preserved.
5. **Tip**: Zoom into a dark area of the page to clearly see the custom cursor ring against the background

## Testing the Work Gallery

1. The WORK orbit button rotates around the center — it might be off-screen at any given moment
2. **Workaround**: Click the WORK button programmatically if it's off-screen: find it in DOM via `.orbit-btn` with text "WORK" and call `.click()`
3. The Work card opens with a featured media area, thumbnail strip, counter, and navigation arrows
4. **Gallery items** are defined in `WORK_ITEMS` array in JS — currently 2 items: Jinx video + Settings UI image
5. **Video test**: Click the featured area to play/pause. Verify progress bar updates during playback (`#wgProgFill` width changes). Verify `ended` event auto-advances to next item.
6. **Image test**: When viewing an image item, there should be no play icon overlay and no progress bar
7. **Switching**: Click thumbnails or use < > arrows to switch between items. Counter should update ("01 / 02" ↔ "02 / 02")
8. **Note**: The Jinx video is very short (~17 seconds) — it may auto-advance before you finish checking the progress bar. Use console to verify: `document.getElementById('wgMedia').currentTime` and `.duration`

## Testing the Orbit Navigation

- Orbit buttons slowly rotate around the center profile picture
- Available sections: HOME, SKILLS, WORK, CONTACT
- WORK is the "featured" (larger) button
- Buttons may be off-screen at any time due to rotation — use JS `.click()` as a workaround or wait for them to rotate into view
- Each button opens a card overlay with section content and an X close button

## Console Checks

- Open browser console before testing to catch any errors
- Key things to look for:
  - 404 errors on asset paths (case-sensitivity issues)
  - Event listener errors (gallery progress bar stacking)
  - GSAP/Three.js initialization errors
- A clean console (zero errors) is expected for all normal interactions

## Common Issues

- **Asset 404s**: File paths are case-sensitive on Linux hosts. Always verify actual filenames on disk match the paths in code.
- **Orbit buttons off-screen**: The orbit rotates continuously. If you can't find a button, use JS to locate and click it.
- **Short video auto-advance**: The Jinx video is ~17s long. If testing progress bar, be quick or use console to check values before it ends.
- **Intro overlay blocking**: If intro appears as a black screen, check `#irisWipe` opacity in CSS — it should be `0` initially.
