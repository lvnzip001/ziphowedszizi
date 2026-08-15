# Wedding Website — Research & Build Plan

*Prepared for Zipho, Liquital Co project "Wedding Site" — 15 August 2026*

## What makes a wedding website great (research findings)

Looking at how top wedding platforms (The Knot, Zola, With Joy) and award-recognized personal wedding sites (Awwwards) approach this, the ones that feel elegant and warm — rather than generic — tend to share a consistent pattern:

**Structure.** Almost every well-loved wedding site follows the same skeleton: a hero moment with the couple's names and the date, an "Our Story" narrative, event logistics (ceremony/reception times, venue, dress code), an RSVP flow, travel and accommodation info for out-of-town guests, a photo gallery, a registry section, an FAQ, and a wedding party page introducing the bridal party and groomsmen. Sites that skip logistics or FAQ tend to generate the most guest emails and phone calls, so those two sections punch above their visual weight.

**Design language.** The sites that read as "elegant and warm" rather than "corporate template" consistently pair a serif display typeface for names/headings (something like Playfair Display, Cormorant, or Marcellus) with a clean, readable sans-serif for body text (Lato, Montserrat, Inter). Palettes lean toward soft, muted, natural tones — ivory/cream, sage or eucalyptus green, terracotta or dusty rose, warm taupe — with a single accent (often a muted gold or deep burgundy) used sparingly for emphasis. Generous white space, large full-bleed photography, and subtle animation (gentle fades on scroll, a soft parallax on the hero image) do more for the "elegant" feeling than heavy ornamentation.

**Interaction touches guests notice.** A countdown timer to the big day, a sticky/minimal navigation that stays out of the way on mobile, an RSVP form that looks up a guest by name rather than asking them to type everything from scratch, and a photo gallery that's easy to add to after the wedding are the features that get the most compliments. Password-protection or a simple "unlisted URL" approach is common for couples who don't want the site indexed by search engines.

**Technical baseline.** Because most guests will open the link on their phone from a text message, mobile-first responsive layout isn't optional — it's the primary experience. Fast load times (compressed, appropriately-sized images) and accessible markup (proper labels on the RSVP form, good color contrast, alt text on photos) matter more here than on most personal sites, since guests span a wide range of ages and devices.

## How this translates to your site (simple HTML/CSS/JS)

Given the brief — elegant, warm, simple stack, no heavy framework — the plan is a static multi-page (or single-page with anchored sections) site: plain HTML, a well-structured CSS file (custom properties for your palette/type scale), and vanilla JS for the handful of interactive bits (countdown timer, mobile nav toggle, gallery lightbox, scroll animations, RSVP form handling). No build tools or frameworks required, which keeps it easy to host anywhere (Netlify, GitHub Pages, Vercel, or your own hosting) and easy to hand off or edit later.

Since a static site has no server by default, RSVPs need a lightweight solution — the two realistic options are a form service (Formspree, Getform, or a simple Google Form embedded/linked) that emails responses straight to you, or a small serverless function/Google Sheet if you want responses collected in one place automatically. We'll decide this together once we get into that section.

## Proposed build plan

**Phase 1 — Foundations (this stage).** Nail down the content and creative direction before writing code: your names and wedding date, color palette and mood (a couple of reference images help), which sections you actually want (see checklist below), photos you already have vs. need to source, and how you want RSVPs handled.

**Phase 2 — Design system.** Define the type scale, color palette as CSS variables, spacing/grid rhythm, and button/link styles in one shared stylesheet, plus a couple of quick static mockups (hero + one inner section) for you to sign off on before we build everything else on top of it.

**Phase 3 — Page build.** Build section by section: hero/landing, our story, event details, travel & accommodation, wedding party, gallery, registry, FAQ, RSVP — each mobile-first, then checked at tablet/desktop widths.

**Phase 4 — Interactivity.** Add the JS layer: countdown timer, mobile nav, gallery lightbox, scroll-in animations, RSVP form validation and submission wiring.

**Phase 5 — Content pass & polish.** Drop in real photos and copy, proofread, check color contrast and load speed, test the RSVP flow end-to-end, and test across a few real phone sizes.

**Phase 6 — Launch.** Pick hosting, connect a domain if you have one (or a free subdomain if not), decide on search-engine visibility (indexed vs. unlisted), and go live — with a short list of what to update after the wedding (thank-you note, post-wedding photos).

## Section checklist to decide on together

Our Story, Event Details (ceremony/reception, times, venue, dress code), Travel & Accommodation, Wedding Party, Photo Gallery, Registry, FAQ, RSVP, Countdown — plus optional extras some couples add: a livestream link, a guestbook, a "things to do in town" guide for out-of-towners, or a multi-language toggle for destination weddings.

## Open questions for you

To move from this plan into actual design and code, I still need: both your names and the wedding date, a sense of your color palette/theme (even just 2–3 words or a Pinterest board), which sections from the checklist you want (and which to skip), how you'd like RSVPs collected, and whether you already have engagement/couple photos to use or need placeholders for now.
