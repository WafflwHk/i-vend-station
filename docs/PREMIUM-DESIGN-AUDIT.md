# IVEND premium design review

Date: 18 November 2026

Baseline: public v1.7.1, source commit 1e21207

Review branch: feature/premium-catalogue-experience

Release status: local review only. Do not merge, push to the Sites source branch, or publish without owner approval.

Proposed version: v1.8.0 (MINOR), from v1.7.1. This adds a new customer-facing catalogue interaction and significant visual improvements while retaining the existing routes, product data, and application architecture. The public version remains v1.7.1 until approved.

## Prioritized findings

1. **Hero composition, not animation, is the primary issue.** The 1440px desktop review found a roughly 104px headline squeezed into a 528px column, measuring 387px tall. Two intended lines wrap into four accidental lines. The product page repeats this oversize-title treatment and does not show the actual Fuji product photo near its title.
2. **Product presentation lacks a common visual language.** Actual Fuji and TCN cutouts are mixed with CSS-drawn machines and repeated radial glow plates. The transparent interior wireframe has hazy edges and is illustrative rather than a verified mechanism diagram. Available photos need consistent framing, honest captions, and quieter backgrounds.
3. **The catalogue is a grid, not a product experience.** Its mobile heading/intro consumes approximately 600px before the machine range. Homepage category pills resemble functional filters but are static spans. There is no visual progression from machine to details to enquiry.
4. **There is no coherent spatial/type rhythm.** Existing widths range from 1050px to 1360px, while important labels/controls vary from 8px to 16px. Extremely tight tracking and sub-1 line heights make long titles brittle at smaller widths.
5. **Effects flatten the hierarchy.** Repeated glow/orbit treatments, glass surfaces and long reveals compete with the product story. The live homepage also had page-level horizontal overflow (about 29px in the desktop audit), with overflowing translated/decorative content.

Live desktop and mobile screenshots were captured in the audit conversation. No stock or fabricated before/after images are used as evidence.

## Visual direction and implementation

- Editorial, technology-focused, quiet: Geist, deliberate two-line homepage statement, restrained blue accents, no hero cutouts.
- One 1240px maximum width, responsive gutters, a shared section rhythm, 24px cards and consistent text hierarchy.
- Transparent buttons remain, with distinct accent rims, visible focus, and appropriate dark-surface ink.
- Uniform product cards across homepage, Product Catalog and Store; illustrative previews are labelled.
- The actual machine photograph leads each product page. Existing specifications, product information, viewer controls and enquiry links remain.
- New /machines product study uses the supplied front photograph, an illustrative interior study, and specification stages before the product/enquiry finish.
- Native mobile scrolling, search, account navigation and Ask IVS remain intact.

## Motion choices

- GSAP 3.15.1 / ScrollTrigger are already installed. A small client controller progressively enhances a server-rendered product study.
- Pin only on screens at least 1100px wide and 720px tall with no reduced-motion preference. The native scroll timeline scrubs forward and backward; no wheel interception, scroll locking or custom gestures.
- A visible skip link bypasses the pinned sequence. Product/enquiry links sit after it, never inside invisible panels.
- Mobile, tablet, short windows, reduced motion, loading errors and no JavaScript use the stacked narrative.
- Scene changes use transforms/opacity; no frame-by-frame React state.
- Existing locally adapted React Bits AnimatedContent remains selectively on the updates heading.
- Lenis remains installed, but its old homepage runtime is removed with the machine hero. Native scrolling is sufficient here and avoids a second scroll controller.
- Ordinary reveals are shortened and reduced in distance; repeated decorative orbits are removed from the redesigned surfaces.

## Honest prototype, not simulated physical accuracy

The project has no open-door machine photography, approved mechanism close-ups, GLB/GLTF, video or door-opening frame sequence.

Available assets:

| Asset | Use | Limitation |
| --- | --- | --- |
| hot-cold-coffee-machine-cutout.png (~1.42MB) | Real front view | One photograph |
| tcn-d720-product-cutout.png (~1.38MB) | Real TCN front view | One photograph |
| coffee-machine-neon-blueprint.png (~1.61MB) | Interior prototype stage | Illustrative, not a verified unit |
| coffee-machine-wireframe-transparent.png (~1.76MB) | Existing specification illustration | Hazy alpha edges |
| t05-views/*.webp (~20–140KB each) | Existing four-angle T05 viewer | Not machine door frames |

The prototype dissolves between front and illustrative interior views. It does not rotate a fabricated door or imply accurate interior geometry.

## Assets required for the final experience

1. Matching closed-front and open-door photographs of the same unit, with consistent camera, scale and lighting.
2. Verified interior and individual mechanism photographs; approved component names.
3. For continuous door movement, an approved frame sequence or GLB with a separately hinged door and accurate interior geometry.
4. Optimized WebP/AVIF alternatives, including mobile crops; aim for under 200–300KB per static image where quality allows. No heavyweight sequence should be added to the homepage payload.
5. Owner-approved final specifications and configuration information.

## Content questions retained for owner confirmation

- Specifications say **1,538 cups (6.5/7oz, 9oz, 12oz)**, while the High Capacity highlight says **1,583 cups (6.5oz to 16oz)**. Existing source values are preserved. The new story reads its figures from the specifications source; this is not a resolution of the conflict.
- Old hidden product routes remain accessible for compatibility, but Next machine navigation should stay within the visible catalogue.
- Latest from IVEND contains clearly marked samples, not real company announcements.

## Verification / approval checklist

- Typecheck, lint, SSR tests, standard production build and Vercel-mode build.
- Desktop, tablet, 320px and 390px mobile views; dark and light themes.
- Native downward/upward scrolling, specification timing, skip link, leaving the pinned section, resizing and reduced-motion fallback.
- Mobile menu, search, viewer selection, quotation destinations and Ask IVS.
- No cutouts in the homepage hero; no page-level horizontal overflow.
- Verify readable text and stable image bounds while images load.
- Review local implementation before any production approval. This document does not authorize deployment.

## Implemented review candidate

- Homepage hero: two deliberate typographic lines, no three-machine artwork, Product Catalog as the primary destination.
- Shared MachineCard: equal-footprint product stages, readable copy, quiet surfaces, explicitly labelled illustrative preview for the forthcoming model.
- Product Catalog: actual cabinet → illustrative interior → three specification reveals; reversible native-scroll timeline and normal stacked fallback.
- Machine details: actual-unit photo in the introduction, controlled heading scale, preserved full specification/highlight information.
- T05: retained the existing photo-viewer controls while removing decorative rings and excessive lead-in space.
- The logo, Beta badge, search, account destination, mobile menu and Ask IVS remain.
- Reused the installed animation tools. No dependencies or deployment configuration changed.

## Validation results

- Typecheck: passed.
- Lint: passed.
- Standard production build: passed.
- SSR regression tests: 27 passed, 0 failed.
- Vercel production-mode build: passed; Nitro printed optional dependency-tracing and plugin-timing warnings. This was a local build, not a deployment.
- Browser checks: 320px and 390px phones, 768px tablet, 1120px and 1440px desktop; dark/light themes; no page-level horizontal overflow in the checked views.
- Verified desktop pin positioning, forward cabinet/interior/spec transitions, reverse scrolling, and the mobile layout with zero pin spacers.
- Verified mobile menu, Search result for coffee, Ask IVS open/close, T05 selected-view state, and quotation href preservation.
- No browser console errors or warnings were observed in the checked routes.
- Reduced-motion and no-JavaScript behavior are covered by media-query/source review and server-rendered fallback assertions; an OS-level reduced-motion setting was not toggled during the browser run.
- No Lighthouse or throttled-device performance score is claimed. Existing large source PNGs still need optimized delivery assets for the final release.

## Reviewing locally

From the project folder on this feature branch:

    npm run dev

Open the printed local address, then review the homepage, /machines, /store, and /machines/hot-cold-coffee-machine. The Product Catalog's pinned mode requires at least a 1100px-wide, 720px-tall window; smaller windows deliberately show the static narrative.

Do not treat a successful local build as production approval. Merge/publish remains a separate owner decision.
