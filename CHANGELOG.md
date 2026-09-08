# Changelog

All notable changes made during the redesign of Paula's Hair & Beauty Salon website.

## Redesign

- Replaced the original design with a new visual identity: warm ink-black background, mauve/gold accent palette pulled from the existing logo, Fraunces (display) + Inter (body) typography, and a crown motif (from the logo) reused as a recurring section divider
- Rebuilt all pages from scratch: Home, About, Services, Wig Gallery, FAQ, Terms, Contact, Booking
- Replaced the placeholder Wigs page with a real photo gallery built from the salon's own wig images
- Rebuilt Services as a categorised price menu (Weaves & Wigs, Braids & Twists, Everyday Hair, Bridal & Glam)
- Converted all images to WebP and resized them, cutting total image weight from ~9MB to ~1MB
- Replaced the old Firebase-based booking form with a Formspree-powered booking and contact flow: AJAX submission, inline success/error states, spam honeypot, no backend required
- Corrected the salon's opening hours sitewide (was showing "open every day"; salon is actually Tuesday–Saturday) and added a date picker rule that blocks booking Sundays/Mondays with inline feedback
- Added WhatsApp contact options: footer icon on every page, a dedicated row on the Contact page, and a fallback link on the Booking page

## Bug fixes

- Fixed a browser flexbox sizing bug that caused the homepage hero photo and About page team photos to render with a large empty gap instead of filling their frames; rebuilt using `object-fit: cover` with absolute positioning
- Fixed a follow-on bug from that same fix, where the hero image briefly collapsed to near-zero size on mobile because it had no in-flow content left to size its container
- Fixed `wigs.html` returning a 404 (the file hadn't made it into an earlier upload)
- Fixed the favicon 404 (the favicon files existed under `assets/favicon/` but not at the site root, which is where browsers check by convention) by adding a root-level `favicon.ico`
- Replaced the favicon itself: the original was generated from the full text logo, which turned illegible at 16–32px; rebuilt it from just the crown symbol, bold enough to read clearly at actual favicon size
- Fixed `site.webmanifest` referencing icon paths at the wrong location, and filled in blank name fields and theme colours
- Fixed one WCAG contrast failure: a caption/hint text colour measured 4.48:1 against card backgrounds (just under the 4.5:1 AA minimum); adjusted it to 4.95:1

## Privacy, forms & compliance

- Added a plain-English Privacy Policy page (what's collected, how it's used, where it goes, how long it's kept, how to request deletion), linked in the footer of every page
- Added a required consent checkbox to both the booking and contact forms, linking to the privacy policy
- Added a "Cookies" section to the privacy policy stating plainly that the site sets none, so no cookie consent banner is needed
- Added `maxlength` limits and `autocomplete` hints to every form field
- Briefly added, then removed at request, a draft cancellation/deposit clause on the Terms page

## SEO & discoverability

- Added unique `<title>` and meta description to every page
- Added Open Graph and Twitter Card meta tags to every page, with a custom social preview image built in the site's own visual style
- Added canonical tags to every page
- Added `robots.txt`, `sitemap.xml`, and `llms.txt`
- Added `HairSalon` structured data (JSON-LD) to every page — name, address, hours, phone, and social links, for local search
- Built a custom 404 page matching the site design (GitHub Pages serves this automatically for broken links)

## Documentation & housekeeping

- Wrote `README.md` covering the project overview, features, tech stack, file structure, and deployment notes
- Wrote this changelog
- Cleaned up two stale HTML comments left over from before the Formspree endpoint was connected
- Ran a full site audit: verified every internal link and anchor resolves, nav/footer are consistent across all pages, no case-sensitivity mismatches (a real risk on GitHub Pages), no duplicate page titles or IDs, every page has exactly one `<h1>`, every image loads successfully, and the FAQ accordion, mobile nav, and forms are all keyboard-accessible
