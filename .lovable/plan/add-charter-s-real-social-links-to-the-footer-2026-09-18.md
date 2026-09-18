# Add Charter's real social links to the footer

Point the footer's social buttons at Charter's actual X and Instagram profiles. Nothing else on the site changes.

## What changes

- "X / Twitter" button links to `https://x.com/trycharterai`
- "Instagram" button links to `https://www.instagram.com/trycharter.ai` (the sharing token from the pasted link is dropped so the link stays clean and permanent)
- Both open in a new tab, with the standard safe-link attributes
- The "Privacy" button stays exactly as it is

Look, colours, order, shadows, and the colourful wordmark below stay untouched.

## Technical notes

Only `src/components/charter/Footer.tsx` is edited: update the `socials` array `href` values and add `target="_blank" rel="noopener noreferrer"` to the anchors. No new components, styles, or dependencies.
