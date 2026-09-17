# Make the hero video and poster portable

The hero currently loads its video and poster picture through Lovable's internal delivery path. That path only works on Lovable hosting, so the hero looks empty when the site is deployed elsewhere (Vercel, Netlify, your own server).

## What changes

Download the three hero media files from the current delivery path and store them directly in the project's `public/` folder so they ship with the code:

- `public/hero-robot.mp4`
- `public/hero-robot.webm`
- `public/hero-robot.png` (poster / still fallback)

Then point the hero at plain paths (`/hero-robot.mp4`, etc.) and delete the three pointer files that referenced the internal path.

Nothing about the hero's look changes: same rounded frame, same size, same autoplay/muted/loop behaviour, same layout and copy.

## Technical notes

- Fetch each file from its `url` in `src/assets/hero-robot.{mp4,webm,png}.asset.json` and write the binary into `public/`.
- Edit `src/components/charter/Hero.tsx`: remove the three `.asset.json` imports, set `poster="/hero-robot.png"` and the two `<source src>` values to `/hero-robot.mp4` and `/hero-robot.webm`.
- Remove the three `.asset.json` files from `src/assets/`.
- Combined size is roughly 0.8 MB, which is fine to commit.
- No other component references the internal asset path, so nothing else needs touching.

## Verification

- Run the build and confirm it passes.
- Load the page in a browser check and confirm the hero video requests `/hero-robot.mp4` and plays, with no failed requests.
