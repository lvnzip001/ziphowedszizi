# Zipho & Zizi — Wedding Website: build notes

This folder used to hold the FuelAxis business site — that's now been replaced with
your wedding website. Here's what's in here and what's left to finish.

## What I filled in already
- Names: **Zipho & Zizi**
- Date: **Thursday, 25 March 2027**
- Palette: white / champagne / beige with a warm gold accent, matching your
  engagement photos.
- Photos: pulled from `assets/img` (your desert Dubai and studio shoot photos),
  resized and compressed for fast loading, and spread across the inner pages
  (see Structure below). Full-resolution originals are untouched in
  `assets/img/originals/`.
- FAQ, Registry, and Dress Code copy: filled with typical/plausible defaults —
  adjust anything that doesn't match your real plans.

## What still needs your input (marked in the pages themselves)
- **Wedding Schedule** (`schedule.html`) — venue is confirmed (Brahman Hills,
  Old Curry's Post Road, Mount West, Nottingham Road, 3280), with a live
  Google Maps embed. Ceremony/cocktail/reception times and the full
  "Order of the day" timeline are still placeholder times — update once
  your programme is confirmed with the venue.
- **Travel & Accommodation** (`travel.html`) — nearest airport, hotel
  recommendations or a block-booking code, and parking/shuttle notes are all
  placeholders ("TBC"/"to follow").
- **Registry** (`registry.html`) — the two modals ("View registry" /
  "Contribute") are full of placeholder items, prices and `href="#"` links —
  swap in your real registry and honeymoon-fund links.
- **FAQs** (`faq.html`) — the "who do I contact" and RSVP-deadline answers are
  reasonable defaults; update with your real contact person and date.
- **RSVP** (`rsvp.html`) — **before this goes live**, sign up free at
  [formspree.io](https://formspree.io), create a form, and replace
  `https://formspree.io/f/your-form-id` in the `<form action="...">` line with
  your real endpoint. Until you do that, submissions won't go anywhere.

## Structure
- `index.html` — home page (hero, countdown, wedding-schedule teaser, quick
  details, RSVP call-to-action). No gallery photos here by design.
- `schedule.html` — ceremony/cocktail/reception schedule + venue & map.
- `dress-code.html` — attire guidance + colour palette swatches.
- `travel.html` — getting there, where to stay, getting around.
- `registry.html` — registry & honeymoon fund, each opening a modal of
  placeholder items.
- `faq.html` — frequently asked questions accordion.
- `rsvp.html` — the RSVP form.
- All seven pages share the same header/footer and navigation.
- `assets/css/main.css` — the whole design system (colors, type, layout,
  modal, page-banner-photo, palette-swatches) in one file.
- `assets/js/main.js` — countdown timer, mobile nav, scroll animations, modal
  open/close, FAQ accordion, and the RSVP form's submit handling.
- `assets/vendor/` — AOS (scroll animation) and Bootstrap Icons, carried over
  from the original template.

## About the old FuelAxis files
Nothing was deleted from your machine that you didn't ask for (this
environment can't touch files outside this folder). The old business-site
pages, unused vendor libraries, and unused product photos were moved into a
`_to_delete` folder inside `C:\WeddingSite` — open it, confirm there's nothing
you still need, and delete it yourself whenever you're ready. Your original
full-resolution photos are also preserved there untouched, in case you want
them for print materials later.

## Suggested next step: hosting
This is a plain static site, so it can go live for free on Netlify, GitHub
Pages, or Vercel — drag-and-drop the folder onto Netlify's dashboard is the
fastest option. Once you have a domain (or a free subdomain from your host),
update the sitemap.xml URLs and the canonical links from `example.com` to your
real domain.
