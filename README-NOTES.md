# Zipho & Zizi — Wedding Website: build notes

This folder used to hold the FuelAxis business site — that's now been replaced with
your wedding website. Here's what's in here and what's left to finish.

## What I filled in already
- Names: **Zipho & Zizi**
- Date: **Thursday, 25 March 2027** — read off your "Save the Date" graphic
  (`assets/img/save-the-date.jpg`). Double-check this is right — if the date on
  that card reads differently than I assumed, update `WEDDING_DATE` at the top
  of the countdown section in `assets/js/main.js` (search for `WEDDING_DATE`),
  plus the date text in each page's header/footer.
- Palette: white / champagne / beige with a warm gold accent, matching your
  engagement photos.
- Photos: pulled from `assets/img` (your desert Dubai and studio shoot photos),
  resized and compressed for fast loading. Full-resolution originals are
  untouched — nothing was deleted, see below.

## What still needs your input (marked in the pages themselves)
- **Our Story** (`our-story.html`) — three placeholder chapters and a timeline.
  Replace the italicized bracketed text with your actual story.
- **Wedding Party** (`wedding-party.html`) — placeholder cards for bridesmaids
  and groomsmen. Add real names, roles, a short line each, and swap the
  circle-icon placeholder for a photo by replacing the `.party-photo.placeholder`
  div with an `<img>` tag (same pattern as other pages).
- **Details** (`details.html`) — ceremony/reception times, venue name and
  address, and travel/accommodation info are all placeholders ("TBC"/"to
  follow"). There's also a boxed area ready for a Google Maps embed once you
  have a venue.
- **Registry & FAQ** (`registry.html`) — add your real registry link(s) and
  answer the FAQ questions (dress code is pre-filled based on your palette
  decision; the rest need your answers).
- **RSVP** (`rsvp.html`) — **before this goes live**, sign up free at
  [formspree.io](https://formspree.io), create a form, and replace
  `https://formspree.io/f/your-form-id` in the `<form action="...">` line with
  your real endpoint. Until you do that, submissions won't go anywhere.

## Structure
- `index.html`, `our-story.html`, `details.html`, `wedding-party.html`,
  `gallery.html`, `registry.html`, `rsvp.html` — the seven pages, all sharing
  the same header/footer.
- `assets/css/main.css` — the whole design system (colors, type, layout) in
  one file. Colors are CSS variables at the top if you want to adjust the
  palette later.
- `assets/js/main.js` — countdown timer, mobile nav, scroll animations,
  gallery lightbox, FAQ accordion, and the RSVP form's submit handling.
- `assets/vendor/` — the animation/lightbox libraries (AOS, GLightbox,
  Bootstrap Icons) carried over from the original template; untouched.

## About the old FuelAxis files
Nothing was deleted (this environment can't delete files on your machine).
The old business-site pages, unused vendor libraries, and unused product
photos were moved into a `_to_delete` folder inside `C:\WeddingSite` — open it,
confirm there's nothing you still need, and delete it yourself whenever you're
ready. Your original full-resolution photos are also preserved there
untouched, in case you want them for print materials later.

## Suggested next step: hosting
This is a plain static site, so it can go live for free on Netlify, GitHub
Pages, or Vercel — drag-and-drop the folder onto Netlify's dashboard is the
fastest option. Once you have a domain (or a free subdomain from your host),
update the sitemap.xml URLs and the canonical links from `example.com` to your
real domain.
