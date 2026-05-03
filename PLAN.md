# Rent Royz — Landing Page v1 Plan

## Context

The client (Rent Royz, Saudi-Arabia-based property management — they take unfurnished apartments from owners, fully furnish them, list on Airbnb/Booking.com, and manage end-to-end) missed his Friday launch because the landing page handed over by a previous designer was "typical and not acceptable." The current site at https://dev.rentroyz.com/ doesn't reflect the brand or the company's positioning as a premium, end-to-end property manager.

**Outcome we're after:** a same-evening mockup of a new landing page that
1. communicates the company's services and reputation,
2. visually demonstrates the *unfurnished → fully-furnished luxury* transformation that is the heart of the offering, and
3. feels **cinematic and modern** while staying inside the brand's "calm, refined, never exaggerated" voice (per the brand guideline PDF).

The repo is greenfield (only the brand PDF and `logos/` exist). We're starting from scratch.

Decisions already locked in with the client (this conversation):
- **Stack:** Next.js (App Router) + Tailwind + Framer Motion
- **Hero animation:** AI-generated short video of an apartment transforming. Client will generate it himself by feeding two AI-generated **start-frame + end-frame** images into an image-to-video tool (Runway / Luma / Kling). We supply the image prompts.
- **Scroll behavior:** scroll **down** -> video plays **forward**; scroll **up** -> video plays **in reverse**. This is achieved by scrubbing `video.currentTime` directly from `scrollYProgress` — both directions follow the scroll naturally.
- **Mobile responsive:** hard requirement, not optional. Hero video must work on iOS Safari (which requires `playsInline muted` and limits programmatic seeking — see implementation notes below).
- **Aesthetic:** cinematic-but-calm — slow parallax, soft easing, subtle petal-motif texture; *not* neon/glitch
- **Language for v1:** English only, but i18n-ready structure so Arabic + RTL is a flip later
- **Hosting:** Vercel (client already has a subscription)

## Brand tokens (from `Rent Royz brand guideline 2.pdf`)

Wire these as Tailwind theme + CSS variables so we never inline hex.

| Role              | Hex        | Notes                                   |
|-------------------|------------|-----------------------------------------|
| `bg.primary`      | `#163035`  | Dark Green Teal — main bg               |
| `bg.deep`         | `#0F1F24`  | Deep Teal — section contrast            |
| `bg.muted`        | `#243E40`  | Muted Teal — cards/dividers             |
| `surface.sand`    | `#D3CDC3`  | Warm Sand — light surfaces/text on dark |
| `accent.burgundy` | `#480F07`  | Deep Burgundy — premium accent          |
| `accent.orange`   | `#C46237`  | Burnt Orange — CTA highlight            |

**Type:** Neue Machina (display, headlines), Inter (body). Load via `next/font` (Inter from Google Fonts; Neue Machina is a paid foundry font — if we don't have a license file we fall back to a close free analog like Space Grotesk for the mockup and flag it).

**Iconography:** the petal/leaf monogram and the 4-petal flower are in [logos/](logos/) (`Artboard *.png`). Use the SVG/PNG variants directly — don't redraw.

**Voice rules to enforce in copy:** second person, short sentences, no slang, no emojis, no exaggeration. Slogan: *We Manage. You Earn.* Sub-line in hero: *Manage properties. Minus the headaches.*

## Page structure (v1 — keep tight)

The client said "1–2 sections + Contact + footer for now." Build exactly this:

1. **Nav** — wordmark left; `Services / About / Contact` center; `Sign in` (links to existing app) + `Register` (links to existing app) right. Sticky, becomes solid-bg on scroll.
2. **Hero** — full-viewport. Headline *We Manage. You Earn.* / sub *Manage properties. Minus the headaches.* / two CTAs (`Get a Revenue Estimate`, `List Your Property`). Background: scroll-scrubbed transformation video. On-load: subtle petal pattern fades in behind text.
3. **The Transformation** — pinned scroll section that drives the video timeline. Three callouts reveal as the video progresses: *We furnish it. We list it. We manage it.* This is the section the client described in the call ("transition between unfurnished and furnished").
4. **What Rent Royz does** — three-column "Three Pillars" block straight from the brand guideline (Simplicity, Trust, Care) with the petal icons.
5. **Contact / CTA footer** — Warm-Sand band with the slogan *We Manage. You Earn.*, a contact form (name, email, phone, message -> POST to a placeholder route handler that just logs), and links: Instagram, WhatsApp, email, address. Logos and bilingual hint ("العربية" toggle, disabled for now with a tooltip).

**Explicitly out of scope for v1:** revenue calculator (the client said the existing one is broken; he'll send a working API later), full services breakdown, blog, owner dashboard, registration flow.

## Motion system (Framer Motion + a tiny scroll handler for the video scrub)

- **Global:** `prefers-reduced-motion` disables scrubs and parallax, falls back to fade-in only. Non-negotiable.
- **Scroll cadence:** Lenis for smooth scroll. Easing curve `[0.22, 1, 0.36, 1]` (slow-out) used everywhere — this is what gives "calm-cinematic."
- **Hero video scrub (forward + reverse):** a `<video muted playsInline preload="auto">` element. We **never call `.play()`** — instead we drive `video.currentTime = scrollYProgress * video.duration` on every scroll tick. Because we only ever set `currentTime` directly, scrolling down advances frames and scrolling up rewinds, with no codec-specific reverse-playback issues. Use `requestVideoFrameCallback` where supported and a `requestAnimationFrame` fallback. The pinned section that owns the scroll range should be ~150–200vh tall so the scrub feels deliberate, not twitchy.
- **iOS / mobile gotchas:** Safari throttles `currentTime` updates and won't seek smoothly on long/high-bitrate MP4s. To handle this cleanly: encode the source as **H.264 baseline profile, ≤1080p, ≤6s, ≤4MB, frame-aligned keyframes (every frame an I-frame: `-x264-params keyint=1`)**. This makes seeking near-instant and is the standard trick for scroll-scrubbed video. On phones < 768px wide, fall back to a simple cross-fade between the two still frames if the connection is `effectiveType === '2g'/'slow-2g'`.
- **Reveal pattern:** every text block uses a single shared `revealUp` variant (y: 24 -> 0, opacity 0 -> 1, 700ms, custom easing, staggerChildren 0.08).
- **Background texture:** the petal pattern (page 42 of the PDF) at ~6% opacity over the hero/CTA sections. Already provided as artwork.

## Files to create

```
app/
  layout.tsx              # fonts, metadata, body bg
  page.tsx                # composes the sections
  globals.css             # Tailwind base + CSS vars for brand tokens
  api/contact/route.ts    # placeholder POST handler
components/
  Nav.tsx
  Hero.tsx                # contains scroll-scrubbed video + headline
  Transformation.tsx      # pinned section with timeline callouts
  Pillars.tsx             # 3-column Simplicity / Trust / Care
  ContactCta.tsx
  Footer.tsx
  ui/RevealUp.tsx         # shared motion wrapper
  ui/PetalPattern.tsx     # SVG background, opacity-controlled
lib/
  motion.ts               # shared variants + easings
  brand.ts                # exported color tokens (also fed to tailwind.config)
public/
  brand/                  # copied/curated subset of /logos
  video/transform.mp4     # the AI-generated hero video (placeholder file initially)
tailwind.config.ts        # brand colors, font families, custom easing
next.config.mjs
package.json
```

## Hero video — what you (the client) need to generate

Both frames must be **the same room, same camera position, same lens, same time of day** — only the contents of the room change. This is what lets the image-to-video tool generate a smooth in-between.

### Start frame prompt (unfurnished)

> A photoreal interior shot of an empty modern Saudi apartment living room. Wide-angle 24mm lens, eye-level camera, centered composition. Bare polished concrete or pale travertine floor, smooth warm-sand colored walls (#D3CDC3), one large arched window on the right wall letting in soft late-afternoon golden-hour light, faint dust particles visible in the light shafts. No furniture at all. No rugs, no curtains, no decor. Visible architectural details: a subtle decorative arch above the window, a recessed ceiling light cove, exposed wiring outlet on the back wall. Color palette dominated by warm sand, off-white, and muted teal (#243E40) on the back wall. Clean, calm, slightly austere. Cinematic, ultra-detailed, 8K, architectural photography style, shallow depth of field with the back wall in sharp focus.

### End frame prompt (fully furnished, luxury-hotel style)

> The exact same Saudi apartment living room from the same wide-angle 24mm camera position and same eye-level height, same arched window on the right with the same golden-hour light — but now fully furnished in a refined contemporary hospitality style. A low-profile boucle sofa in warm sand upholstery (#D3CDC3) facing the camera, a sculptural travertine coffee table in front of it with a single ceramic vase holding pampas grass, a deep-burgundy (#480F07) accent armchair on the left, a soft hand-knotted neutral rug under the seating, sheer linen curtains framing the arched window, a tall floor lamp with a brushed-brass stem, a dark green teal (#163035) feature wall behind the sofa with a single large abstract artwork in burnt-orange (#C46237) tones, a small console with a stack of art books, subtle indoor plants in terracotta pots. Warm ambient lighting from the floor lamp complements the natural golden-hour light. Same camera, same lens, same window light direction as the start frame — only the contents have changed. Cinematic, ultra-detailed, 8K, architectural photography, premium hospitality interior, calm and refined, no clutter.

### Tips for generating

- Generate the **end frame first**, then in the same session use it as a reference and prompt the AI for "the same room, same camera, but completely empty and unfurnished." This gives much better camera/composition consistency than generating both independently.
- Target **6–8 seconds** for the video — short enough to encode tight, long enough for the scrub to feel deliberate.
- Once you have the MP4, drop it at `public/video/transform.mp4` and re-encode it for scroll-scrubbing:
  ```bash
  ffmpeg -i input.mp4 -vcodec libx264 -profile:v baseline \
    -x264-params keyint=1 -crf 23 -movflags +faststart \
    -an public/video/transform.mp4
  ```
  The `keyint=1` flag is the critical one — it makes every frame seekable, which is what makes the scroll-scrub feel smooth on iOS Safari.

## Mobile responsiveness (hard requirement)

The whole site must look and feel right on phones — most Saudi traffic is mobile.

- **Breakpoints:** Tailwind defaults — `sm:640 md:768 lg:1024 xl:1280`. Design mobile-first; desktop is the elaboration.
- **Hero on mobile:** the pinned scroll-scrub keeps working but the section is shorter (120vh instead of 200vh) so users get to the next section faster. Headline drops from `text-7xl` to `text-4xl`. CTAs stack vertically. Video stays full-bleed but is letterboxed/cropped via `object-cover` so the focal point of the room stays centered.
- **Slow-network fallback:** if `navigator.connection.effectiveType` is `2g`/`slow-2g` *or* `saveData` is true, we don't load the MP4 at all — we cross-fade between the two still frames driven by scroll progress. Same animation, fraction of the bytes.
- **Touch:** all CTAs are ≥44×44pt hit area. No hover-only interactions — every hover state has a tap-equivalent.
- **Nav on mobile:** wordmark left, hamburger right, slide-down full-screen menu with the petal motif background.
- **Three Pillars:** 3-col on `lg`, 1-col stack on mobile with each pillar full-width.
- **Contact form:** single column on mobile, two columns (name/email row, phone full, message full) on `md+`.
- **Verification:** test in DevTools on iPhone SE (375), iPhone 14 Pro (393), iPad Mini (744), and a real device if possible. Lighthouse mobile Performance ≥ 80.

## Verification (how we'll know it works)

Local:
```bash
pnpm install
pnpm dev   # http://localhost:3000
```

Manual checks before sending the mockup link:
- Hero video scrub is smooth at 60fps on a M-class Mac and doesn't jank on iPhone Safari.
- `prefers-reduced-motion: reduce` (DevTools -> Rendering) collapses all scroll animations to fades.
- All brand colors render as the exact hex in the table above (sample with the eyedropper).
- Lighthouse: Performance ≥ 85 mobile, A11y ≥ 95, SEO ≥ 90.
- Tab-order is logical; CTA buttons are reachable by keyboard; focus rings visible against teal bg.
- Text contrast: Warm Sand on Dark Green Teal passes WCAG AA at body size.
- Nav `Sign in` / `Register` links open the existing app (placeholder URL until client provides the prod link).
- Contact form POST returns 200 and logs payload server-side (no real email yet).

Deploy:
```bash
vercel --prod   # client has a subscription
```

## Open items to confirm with the client *before* we ship the mockup

- The deep-link URL for `Sign in` / `Register` (his existing app).
- Whether he has a Neue Machina license he can share, or if Space Grotesk is acceptable for the mockup.
- The contact email / WhatsApp number to put in the footer.
- Whether he wants the AI hero video generated for him, or if he'll provide footage from an actual furnished property.
