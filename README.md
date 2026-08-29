# Malay Driving School — Website

A production-ready marketing + enquiry website for **Malay Driving School**, a local driving
school serving **Dehradun, Uttarakhand (India)**. Clean, safety-first design; no motorsport
or luxury clichés. React + TypeScript + Vite + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, cPanel…). No server code required.

## One-file business config

**`src/config/site.ts`** is the single place for brand facts: name, region, hours, and the contact
channels (phone / WhatsApp / email / address / socials). Anything left empty stays hidden in the UI
— the site never shows invented facts. Fill them in when the school supplies the real values and the
Call / WhatsApp buttons, footer details and sticky mobile bar activate automatically.

Other editable content:

| File | Holds |
| --- | --- |
| `src/data/courses.ts` | Course catalog (typed model: id, vehicleType, transmission, duration, sessions, fee, status, includes, requirements, timeSlots, images, instructorIds) |
| `src/data/content.ts` | Instructors, categories, process steps, service areas, testimonials, FAQs |

Durations/session counts in `courses.ts` are **clearly marked sample structures** — verify with the
school. `fee` is intentionally `null` everywhere ("fees shared on enquiry"); never hard-code a price
until the school confirms one.

## Hero video (recommended)

The hero renders the generated poster (`public/images/hero.jpg`) with a gentle drift by default.
To use a real training video instead:

1. Export two web variants from the master file (keep the master **out** of `public/`):
   - desktop: 1080p H.264 mp4, ≤ ~6 MB
   - mobile: 720p H.264 mp4, ≤ ~3 MB
2. Drop them in `public/media/` and set the paths in `site.media` (`heroVideo`, `heroVideoMobile`).
3. The poster still paints first (`preload="metadata"`), and `prefers-reduced-motion` users always
   get the still image. On any video error the UI falls back to the poster automatically.

## Enquiry form backend

Set `VITE_ENQUIRY_ENDPOINT` (see `.env.example`) to any HTTPS endpoint that accepts a JSON POST —
your own API, Formspree, or a CRM webhook. The form already includes validation, inline errors,
a honeypot anti-spam field, consent checkbox, loading / success / error states. Without an endpoint
it validates and confirms locally without pretending delivery. No secrets belong in the frontend.

## Architecture

```
src/
├─ config/site.ts        # business facts (single source of truth)
├─ data/                 # courses.ts · content.ts (CMS-ready models)
├─ components/           # Header, Footer, ui (Button/Chip/Reveal/SafeImage/PageMeta…),
│                        # CourseFinder, CourseCard, InstructorCard, LeadForm, StickyCTA
├─ sections/home.tsx     # Hero, TrustStrip, Categories, Featured, Why, Area, Process, CTA
└─ pages/                # Home, Courses, CourseDetail, Instructors, About, Contact, Misc
```

**Routing** uses `HashRouter` so deep links work on any static host without server rewrites. If you
later switch to `BrowserRouter`, add a rewrite rule (`vercel.json` / `netlify.toml` / nginx
`try_files`) and extend `public/sitemap.xml` (a note is included in the file).

## Built-in quality

- **Responsive** mobile-first layouts; touch targets ≥ 44 px; no hover-only behaviour; no
  horizontal overflow; sticky mobile "Book a Trial" bar.
- **Accessible** — semantic landmarks, skip link, labelled controls, `aria-invalid`/`role=alert`
  form errors, visible focus, keyboard-safe menus and dialogs, alt text, and full
  `prefers-reduced-motion` support (reveals, hero drift and video all degrade gracefully).
- **SEO** — per-route titles/descriptions, canonical, Open Graph/Twitter tags, `DrivingSchool`
  JSON-LD (verified facts only), semantic heading hierarchy, `robots.txt`, `sitemap.xml`.
- **Performance** — lazy images, decodable async, poster-first media, no heavy libraries
  (routing + icons only), CSS/IO-based animations, zero third-party trackers.
- **Honesty** — no invented phone numbers, prices, addresses, ratings or licence claims; a visible
  note explains that licences are issued only by the RTO.

## Known limitations

- Contact channels (phone/WhatsApp/email) are pending real values from the school — the UI hides
  them until `src/config/site.ts` is updated.
- Without `VITE_ENQUIRY_ENDPOINT`, enquiries are confirmed locally only (clearly stated in the UI).
- Hash-based URLs (`/#/courses`) are a static-hosting trade-off; see Routing above.
- The service-area map is an intentional schematic illustration, kept until the school shares an
  exact address to pin on a real map.
