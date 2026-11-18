Dental homepage refresh patch

Files included:
- src/metadata.json
- src/site/home.tsx
- src/site/components.tsx
- src/site/content.ts
- src/site/public-page.tsx
- src/styles/site.css

Changes:
- Rebuilds the homepage with a prominent hero, practical quick links, image-led sections and a consultation CTA.
- Adds a treatment card grid that appears only for published treatment content.
- Adds team and review sections only when approved content exists.
- Removes unconfigured phone/address/contact placeholders from the shared header, footer and contact links.
- Updates navigation and footer to a simpler dental-practice structure.
- Gives the shared header/footer and homepage a clean white, navy and teal visual direction.
- Adds an honest empty state to the treatment index instead of displaying the unpublished [TREATMENT NAME] placeholder.
- Keeps the consultation form, server action, Resend delivery, validation and rate limiting unchanged.
- Does not add fictional treatments, staff, ratings, reviews, awards, clinic address or opening hours.

The changed TypeScript/TSX files passed a syntax transpilation check. Run `npm run build` in the project after applying the patch to perform the full project build.
