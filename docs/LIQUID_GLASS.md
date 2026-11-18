# IVEND Liquid Glass controls

## Implementation

- `glisse` is installed from npm at exactly **0.6.0**, with the lockfile retained. Its React/React DOM peer requirement is `>=18`; IVEND uses **19.2.6**. No additional animation library is needed for these controls.
- `app/components/IVENDButton.tsx` is the small client boundary. `IVENDButton` uses the actual Glisse `Button`; `IVENDIconButton` adds consistent icon sizing and requires an accessible label. Existing pages remain server components.
- `IVENDLinkButton` renders a real anchor with its original destination, target and accessibility attributes. Glisse `Glass` paints the inner surface. Because Glisse 0.6.0 has no polymorphic Button API, only its original `press.ts` and `spring.ts` were copied from the supplied ZIP into `app/lib/glisse/`, with the MIT notice in `app/lib/glisse/LICENSE`. The entire library was not vendored.
- `app/layout.tsx` imports `glisse/styles.css` for server-rendered styling before hydration. Glisse also inserts its stylesheet once on the client; the local theme mapping wins without replacing IVEND's theme logic.

## Styling and interaction

- `app/liquid-glass.css` maps Glisse tokens to IVEND's resolved system/light/dark theme and existing dark sections. Filled primary actions use **#1d65e8** with white text; secondary actions use translucent glass. Sizing and pill radii are shared.
- Refraction, the lit rim and spring interactions are Glisse behavior, not a CSS imitation. Existing CSS press transforms are neutralized on shared controls; do not add GSAP scale/translate animations to the same elements. Animate a surrounding wrapper instead.
- Reduced-motion CSS suppresses control scale/translate and transitions, rather than merely shortening the spring. Loading indicators remain visibly identifiable without rotation.
- Normal navigation and content links are not turned into buttons. Full-screen menu backdrops remain unstyled dismiss targets. There are currently no product-filter controls to migrate.

## Performance and browser fallback

- Glisse fits effects during idle time, caches generated maps and refits on resize/theme changes. No `data-glisse-backdrop` content is introduced here, avoiding its continuously followed marked-content/canvas path.
- For unmarked page content, Glisse applies live SVG backdrop refraction in Chromium. Safari and other browsers retain the frost and lit rim instead. The local `@supports` fallback supplies a readable surface where backdrop filters are unsupported.
- Browser-global work stays inside client-side effects; server output still contains usable native buttons and links. Keep the SSR stylesheet import when changing the layout.

## Verification and release

- Typecheck and lint passed. `npm test` passed its Vinext production build and all **30 tests**, including SSR states/anchor semantics and spring/reduced-motion checks. `npm run build:vercel` passed and generated the local Vercel output; it was not deployed. Vinext route-classification and Nitro optional-tracing/chunk warnings remain non-fatal.
- Chromium smoke checks passed on the homepage, catalogue, store, Fuji detail and T05 pages. Viewports checked: 320, 360, 390, 430, 768, 900, 1024, 1280 and 1440px. No page-level horizontal overflow was observed. Search/filtering/Escape/focus return, mobile menu, theme changes, Ask IVS text replies and T05 mouse/keyboard view controls worked without captured browser errors. Voice permissions were not activated.
- The shared Vercel client control chunk measures approximately **61.9 kB / 20.7 kB gzip**, including Glisse optics and its embedded stylesheet. The extra server-loaded CSS deliberately ensures a styled first render; the package also embeds that CSS. No additional carousel, animation or smooth-scroll dependency was added.
- This Windows environment can smoke-test Chromium and responsive viewport layouts. Native iPhone touch behavior and Safari have **not** been verified; test both before approving a public release.
- The dependency audit reported **42 findings**, including an existing critical finding in `react-server-dom-webpack`; it did not identify a Glisse finding. No automatic dependency fix or unrelated upgrade was performed. Review and address the existing critical issue in a separate compatibility-tested upgrade before public release.
- Central public-version increment: **v1.8.2 → v1.9.0 (MINOR)** for the shared interactive control system. Publication alone needs no additional version increment.
- The owner approved merging the tested feature branch into `main` and publishing through `WafflwHk/i-vend-station` to the existing Vercel project `ivend-official`. Release confirmation must identify the deployed commit, Vercel Ready state and the production catalogue checks.

## Changed-file manifest

Paths below are relative to the repository so this handoff stays portable.

New:

- `app/components/IVENDButton.tsx`
- `app/lib/glisse/press.ts`
- `app/lib/glisse/spring.ts`
- `app/lib/glisse/LICENSE`
- `docs/LIQUID_GLASS.md`

Modified:

- `package.json`, `package-lock.json`
- `CHANGELOG.md`, `app/config/site.ts`
- `app/layout.tsx`, `app/liquid-glass.css`
- `app/page.tsx`, `app/store/page.tsx`, `app/account/page.tsx`, `app/privacy/page.tsx`
- `app/machines/[slug]/page.tsx`
- `app/products/t05-cashless-device/page.tsx`, `app/products/t05-cashless-device/product.module.css`
- `app/components/CookieConsent.tsx`
- `app/components/MachineCard.tsx`
- `app/components/MachineViewer.tsx`
- `app/components/ProductAssistant.tsx`
- `app/components/ProductShowcase.tsx`
- `app/components/RequestQuoteLink.tsx`
- `app/components/SiteHeader.tsx`
- `app/components/SiteSearch.tsx`
- `app/components/T05PhotoViewer.tsx`
- `tests/rendered-html.test.mjs`

No files were deleted. No product content, asset, deployment configuration or GSAP catalogue timeline was changed.
