import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { transpileModule, ModuleKind } from "typescript";

test("header account control is an accessible icon link", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="\/account" aria-label="Sign in or open your account" title="Sign in \/ Account"><svg[^>]*aria-hidden="true"/);
  assert.doesNotMatch(html, />Sign in \/ Account<\/span>/);
});

test("machine listings keep view links without quotation buttons", async () => {
  for (const pathname of ["/", "/store", "/machines"]) {
    const html = await (await render(pathname)).text();
    const cards = html.match(/<article class="machine-card[\s\S]*?<\/article>/g) ?? [];
    assert.equal(cards.length, 3);
    for (const card of cards) {
      assert.match(card, /View machine/);
      assert.doesNotMatch(card, /Request quote|wa\.me/);
    }
  }
});

test("renders honest sample highlights with native scrolling and server components", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /Latest from IVEND/);
  assert.match(html, /Preview content\. Official updates will be added here\./);
  assert.equal((html.match(/>Sample · Not an announcement<\/span>/g) ?? []).length, 3);
  assert.match(html, /aria-label="IVEND updates"[^>]*tabindex="0"/i);
  assert.match(html, /Browse current machines/);
  for (const file of ["page.tsx", "components/LatestIvend.tsx", "components/HighlightCard.tsx"]) {
    assert.doesNotMatch(await readFile(new URL(`../app/${file}`, import.meta.url), "utf8"), /["']use client["']/);
  }
  const styles = await readFile(new URL("../app/components/latest-ivend.module.css", import.meta.url), "utf8");
  assert.match(styles, /overflow-x: auto/);
  assert.match(styles, /scroll-snap-type: x proximity/);
  assert.match(styles, /touch-action: pan-x pan-y pinch-zoom/);
  const source = await readFile(new URL("../app/data/highlights.ts", import.meta.url), "utf8");
  const code = transpileModule(source, { compilerOptions: { module: ModuleKind.ESNext } }).outputText;
  const { highlights } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  assert.equal(new Set(highlights.map((item) => item.id)).size, highlights.length);
  for (const item of highlights) {
    assert.equal(item.sample, true);
    assert.equal(item.date, undefined);
    assert.ok(item.imageAlt.length > 0);
    await access(new URL(`../public${item.image}`, import.meta.url));
    assert.equal((await render(item.href.split("#")[0] || "/")).status, 200);
  }
});

test("searches the visible catalogue and existing destinations", async () => {
  const compile = (source) => `data:text/javascript;base64,${Buffer.from(transpileModule(source, { compilerOptions: { module: ModuleKind.ESNext } }).outputText).toString("base64")}`;
  const machines = compile(await readFile(new URL("../app/data/machines.ts", import.meta.url), "utf8"));
  const navigation = compile(await readFile(new URL("../app/data/navigation.ts", import.meta.url), "utf8"));
  const source = (await readFile(new URL("../app/lib/site-search.ts", import.meta.url), "utf8"))
    .replace('"../data/machines"', JSON.stringify(machines))
    .replace('"../data/navigation"', JSON.stringify(navigation));
  const { searchSite, searchIndex } = await import(compile(source));
  assert.equal(searchSite("COFFEE")[0].href, "/machines/hot-cold-coffee-machine");
  assert.equal(searchSite("T05")[0].href, "/products/t05-cashless-device");
  assert.equal(searchSite("repair maintenance")[0].href, "/#contact");
  assert.match(searchSite("TCN-D720-10G")[0].description, /Coming soon/);
  assert.equal(searchSite("notarealmachine").length, 0);
  assert.equal(searchSite("!!!").length, 0);
  assert.ok(searchSite("").length > 0);
  assert.ok(!searchIndex.some((entry) => entry.href.includes("10c-v22")));
  assert.equal(new Set(searchIndex.map((entry) => entry.href)).size, searchIndex.length);
});

test("renders accessible search on home and product headers", async () => {
  for (const path of ["/", "/products/t05-cashless-device"]) {
    const html = await (await render(path)).text();
    assert.match(html, /aria-label="Search IVEND"/);
    assert.match(html, /aria-controls="ivend-site-search"/);
    assert.match(html, /<dialog[^>]*aria-labelledby="ivend-search-title"/);
    assert.match(html, /aria-label="Close search"/);
    assert.match(html, /href="\/account"/);
  }
});

async function render(pathname = "/", requestHeaders = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", ...requestHeaders },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the branded I Vend Station homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>I Vend Station \| Vending Machines &amp; Cashless Payments<\/title>/i);
  assert.match(html, /Machines built/);
  assert.match(html, /Coffee Machines/);
  assert.match(html, /TCN Machines/);
  assert.match(html, /CHINA SERIES/);
  assert.match(html, /China Series/);
  assert.match(html, /TCN-D720 Classic Touchscreen Vending Machine/);
  assert.match(html, /tcn-d720-product-cutout\.png/);
  assert.match(html, /hot-cold-coffee-machine-cutout\.png/);
  assert.match(html, /A standard-capacity snack and beverage vending machine for locations requiring a broader product selection\. It also includes a built-in touchscreen\./);
  assert.doesNotMatch(html, /A compact floor-standing format for locations where space and a clean footprint matter\./);
  assert.doesNotMatch(html, />Compact Vending Machine</);
  assert.match(html, /Ask IVS/);
  assert.match(html, /aria-label="Open Ask IVS product assistant"/);
  assert.match(html, /hero-remade/);
  assert.match(html, /hero-title-line/);
  assert.match(html, /data-vending-track/);
  assert.match(html, /role="img" aria-label="A large Fuji coffee machine in the center, a TCN vending machine on the left, and a supporting machine on the right, sliding together as the page scrolls"/);
  assert.match(html, /hero-product-image hero-fuji-machine[^>]*hot-cold-coffee-machine-cutout\.png/);
  assert.match(html, /hero-product-image hero-tcn-machine[^>]*tcn-d720-product-cutout\.png/);
  assert.doesNotMatch(html, /art-brand-label/);
  assert.match(html, /Find your machine\./);
  assert.match(html, /03[\s\S]*MACHINE TYPES/);
  assert.match(html, /Cashless Device/);
  assert.doesNotMatch(html, /Frozen Food Vending Machine|Hot Food Vending Machine/);
  assert.match(html, /Tell Us What Vending Machine Support You Need/);
  assert.match(html, /Planning to buy, rent, or customize a vending machine\? Already have a machine that needs repair\?/);
  assert.match(html, /Send us your product type, location and requirements\. Our team will help you check the suitable machine, payment system or technical support needed\./);
  assert.match(html, /Contact Our WhatsApp Team/);
  assert.match(html, /href="https:\/\/wa\.me\/601133180812\?text=Hello%20I%20Vend%20Station/);
  assert.match(html, /Support%20needed%20\(buy%2C%20rent%2C%20customize%2C%20or%20repair\)%3A/);
  assert.match(html, /Location%3A/);
  assert.match(html, /Requirements%3A/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /aria-label="Contact our WhatsApp team \(opens in a new tab\)"/);
  assert.doesNotMatch(html, /whatsapp-contact-status|WhatsApp link will be enabled|<button[^>]*disabled[^>]*>Contact Our WhatsApp Team/);
  assert.doesNotMatch(html, /hello@example\.com|Replace this with your phone/);
  assert.match(html, /i-vend-station-logo\.png/);
  assert.match(html, /aria-label="Website appearance"/);
  assert.match(html, />System</);
  assert.match(html, />Light</);
  assert.match(html, />Dark</);
  assert.match(html, /data-loading-screen/);
  assert.match(html, /aria-label="Loading I Vend Station"/);
  assert.match(html, /i-vend-station-icon\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
  assert.doesNotMatch(html, /&amp;nearr;/i);
});

test("server-renders every public product route", async () => {
  const routes = [
    ["/store", /Shop the range\./],
    ["/machines", /Choose a model\./],
    ["/machines/hot-cold-coffee-machine", /Fuji Coffee Machine \(Hot &amp; Cold\)/],
    ["/products/t05-cashless-device", /Cashless,/],
    ["/privacy", /I Vend Station Privacy Policy/],
  ];

  for (const [pathname, expectedContent] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render successfully`);
    const html = await response.text();
    assert.match(html, expectedContent);
    assert.match(html, /data-loading-screen/);
    assert.match(html, /aria-label="Open Ask IVS product assistant"/);
    assert.match(html, /href="\/privacy"[^>]*>Privacy Policy/);
    assert.doesNotMatch(html, /&amp;nearr;/i);
  }
});

test("removes the TCN-D720-10C (V22) machine from catalogue listings", async () => {
  const responses = await Promise.all([render("/"), render("/store"), render("/machines")]);

  for (const response of responses) {
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, />TCN-D720-10C \(V22\)</);
    assert.doesNotMatch(html, />Touchscreen Vending Machine<\/h3>/);
  }
});

test("removes the Double Cabinet Machine from catalogue listings", async () => {
  const responses = await Promise.all([render("/"), render("/store"), render("/machines")]);

  for (const response of responses) {
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, />TCN-D720-10C \(V22\) \+ 10R</);
    assert.doesNotMatch(html, />Double Cabinet Machine<\/h3>/);
  }
});

test("marks the TCN-D720-10G catalogue card as coming soon", async () => {
  const responses = await Promise.all([render("/"), render("/store"), render("/machines")]);

  for (const response of responses) {
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /TCN-D720-10G is coming soon/);
    assert.match(html, /availability-badge[^>]*>Coming Soon<\/span>/);
    assert.doesNotMatch(html, /Product%3A%20TCN-D720-10G/);
  }
});

test("renders the central IVEND website version in every footer", async () => {
  const [homeResponse, t05Response, versionSource] = await Promise.all([
    render("/"),
    render("/products/t05-cashless-device"),
    readFile(new URL("../app/config/site.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(homeResponse.status, 200);
  assert.equal(t05Response.status, 200);
  for (const response of [homeResponse, t05Response]) {
    const html = await response.text();
    assert.match(html, /v1\.3\.4(?:<!-- -->|\s)*Beta/);
    assert.match(html, /lang="ja">アイ・ヴェンド・ステーション<\/span>/);
    assert.match(html, /title="Website under active development"[^>]*>Beta<\/span>/);
  }
  assert.match(versionSource, /export const IVEND_VERSION = "v1\.3\.4"/);
  assert.match(versionSource, /IVEND_RELEASE_STATUS: "Beta" \| "Stable" = "Beta"/);
  const headerSource = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  assert.match(headerSource, /import \{ IVEND_RELEASE_STATUS \} from "\.\.\/config\/site"/);
  assert.match(headerSource, /IVEND_RELEASE_STATUS === "Beta"/);
  assert.match(headerSource, /アイ・ヴェンド・ステーション/);
});

test("publishes a trilingual, site-specific privacy policy", async () => {
  const response = await render("/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Privacy Policy \| I Vend Station<\/title>/i);
  assert.match(html, /<time dateTime="2026-08-22">22 August 2026<\/time>/);
  assert.match(html, /I Vend Station Privacy Policy/);
  assert.match(html, /Notis Privasi I Vend Station/);
  assert.match(html, /I Vend Station 隐私政策/);
  assert.match(html, /href="#simplified-chinese"[^>]*lang="zh-Hans"[^>]*>简体中文/);
  assert.match(html, /本网站不会将这些内容发送至外部 AI API/);
  assert.match(html, /I Vend Station does not receive your ChatGPT password/);
  assert.match(html, /appearance preference uses your browser/);
  assert.match(html, /does not save voice recordings/);
  assert.match(html, /hosting and security services may process request data/);
  assert.match(html, /href="https:\/\/wa\.me\/601133180812"/);
  assert.match(html, /official WhatsApp number/);
  assert.match(html, /may process it outside Malaysia/);
  assert.doesNotMatch(html, /still needs to be configured|official channel becomes available|does not provide an active online privacy-request channel/);
  assert.match(html, /Personal Data Protection Commissioner/);
  assert.doesNotMatch(html, /hello@example\.com/);
});

test("shows the Store T05 four-angle viewer with its camera side down", async () => {
  const storeResponse = await render("/store");
  assert.equal(storeResponse.status, 200);
  const html = await storeResponse.text();
  assert.match(html, /aria-label="T05 four-angle photo viewer"/);
  assert.match(html, /t05-front-camera-down\.webp/);
  assert.match(html, /Four supplied T05 product photos with backgrounds removed/);
  assert.match(html, />Front</);
  assert.match(html, />Right angle</);
  assert.match(html, />Back</);
  assert.match(html, />Left angle</);
  assert.match(html, /Play four views/);
  assert.doesNotMatch(html, /t05-terminal-correct\.png/);
});

test("shows the homepage T05 image with its camera side rotated down", async () => {
  const [homeResponse, correctionStyles] = await Promise.all([
    render("/"),
    readFile(new URL("../app/corrections.css", import.meta.url), "utf8"),
  ]);
  assert.equal(homeResponse.status, 200);
  assert.match(await homeResponse.text(), /camera side facing down/);
  assert.match(correctionStyles, /\.cashless-visual img\s*{[^}]*transform:\s*rotate\(180deg\)/);
});

test("shows the T05 product hero as an accessible four-angle viewer", async () => {
  const productResponse = await render("/products/t05-cashless-device");
  assert.equal(productResponse.status, 200);
  const html = await productResponse.text();
  assert.match(html, /aria-label="T05 four-angle photo viewer"/);
  assert.match(html, /role="slider"/);
  assert.match(html, /aria-valuemin="1"/);
  assert.match(html, /aria-valuemax="4"/);
  assert.match(html, /t05-front-camera-down\.webp/);
  assert.match(html, /fetchPriority="high"/);
  assert.match(html, /aria-pressed="true"[^>]*>\s*<span>01<\/span>\s*Front/);
  assert.match(html, /aria-label="Show previous T05 view"/);
  assert.match(html, /aria-label="Show next T05 view"/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /t05-terminal-correct\.png/);
});

test("implements drag, keyboard, spin, and reduced-motion controls for T05 views", async () => {
  const [viewerSource, photoData, viewerStyles] = await Promise.all([
    readFile(new URL("../app/components/T05PhotoViewer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/t05-photos.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/t05-photo-viewer.module.css", import.meta.url), "utf8"),
  ]);

  for (const filename of [
    "t05-front-camera-down.webp",
    "t05-right-angle-camera-down.webp",
    "t05-back-camera-down.webp",
    "t05-left-angle-camera-down.webp",
  ]) {
    assert.match(photoData, new RegExp(filename.replaceAll(".", "\\.")));
  }
  assert.match(viewerSource, /setPointerCapture/);
  assert.match(viewerSource, /onPointerMove/);
  assert.match(viewerSource, /ArrowLeft/);
  assert.match(viewerSource, /ArrowRight/);
  assert.match(viewerSource, /prefers-reduced-motion: reduce/);
  assert.match(viewerSource, /visibilitychange/);
  assert.match(viewerStyles, /touch-action:\s*pan-y/);
  assert.match(viewerStyles, /min-height:\s*46px/);
  assert.match(viewerStyles, /prefers-reduced-motion:\s*reduce/);
});

test("renders a private, voice-enabled catalogue product assistant", async () => {
  const [assistantSource, knowledgeSource] = await Promise.all([
    readFile(new URL("../app/components/ProductAssistant.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/product-assistant.ts", import.meta.url), "utf8"),
  ]);

  assert.match(assistantSource, /role="dialog"/);
  assert.match(assistantSource, /role="log"/);
  assert.match(assistantSource, /webkitSpeechRecognition/);
  assert.match(assistantSource, /speechSynthesis/);
  assert.match(assistantSource, /I Vend Station does not save recordings/);
  assert.match(assistantSource, /href="\/privacy"/);
  assert.match(knowledgeSource, /A compatibility check is required/);
  assert.match(knowledgeSource, /Viewer choices are illustrative/);
  assert.match(knowledgeSource, /Quotation and availability are confirmed directly/);
  assert.doesNotMatch(knowledgeSource, /fetch\s*\(|WebSocket|dangerouslySetInnerHTML|https?:\/\//);
  assert.ok(
    knowledgeSource.indexOf("high capacity") < knowledgeSource.indexOf('"dimension"'),
    "high-capacity guidance must run before unpublished capacity specifications",
  );
});

test("keeps finish controls and removes viewer-size controls on every machine page", async () => {
  const machineRoutes = [
    "/machines/hot-cold-coffee-machine",
    "/machines/tcn-d720-6g",
    "/machines/tcn-d720-10g",
    "/machines/tcn-d720-10c-v22",
    "/machines/tcn-d720-10c-v22-10r",
  ];

  for (const pathname of machineRoutes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render successfully`);
    const html = await response.text();
    assert.match(html, /aria-label="Illustrative machine configuration preview"/);
    assert.match(html, /Alternative finishes are illustrative and do not confirm product availability\./);
    assert.doesNotMatch(html, /Viewer size|viewer-size-|Smaller viewer scale|S and L change/);
    assert.match(html, /Choose a machine view/);
    assert.match(html, /type="radio"/);
    assert.match(html, /Request a Quote/);
    assert.match(html, /Request a quotation for [^"]+ via WhatsApp \(opens in a new tab\)/);
  }
});

test("renders quotation actions and removes the legacy shopping route", async () => {
  const [homeResponse, storeResponse, t05Response, quoteLinkSource, quoteLinkStyles, whatsappSource] = await Promise.all([
    render("/"),
    render("/store"),
    render("/products/t05-cashless-device"),
    readFile(new URL("../app/components/RequestQuoteLink.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/request-quote-link.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/whatsapp.ts", import.meta.url), "utf8"),
  ]);

  for (const response of [homeResponse, storeResponse, t05Response]) assert.equal(response.status, 200);
  const combinedHtml = `${await homeResponse.text()}${await storeResponse.text()}${await t05Response.text()}`;
  assert.match(combinedHtml, /Request a Quote/);
  assert.match(combinedHtml, /wa\.me\/601133180812/);
  assert.match(combinedHtml, /target="_blank"/);
  assert.match(combinedHtml, /rel="noopener noreferrer"/);
  assert.doesNotMatch(combinedHtml, /hello@example\.com|href="mailto:/i);
  assert.match(quoteLinkSource, /createWhatsAppQuoteHref/);
  assert.match(quoteLinkStyles, /\.button\.compact\s*{[\s\S]*?width:\s*auto;/);
  assert.match(quoteLinkStyles, /\.button\.compact\s*{[\s\S]*?min-width:\s*122px;/);
  assert.match(quoteLinkStyles, /@media \(max-width: 650px\)[\s\S]*?min-height:\s*46px;/);
  assert.match(whatsappSource, /Please confirm price, availability, configuration, and compatibility/);

  const removedCommercePath = `/${"ca"}${"rt"}`;
  assert.equal((await render(removedCommercePath)).status, 404);
});

test("contains the finished site assets and no starter scaffolding", async () => {
  const [layout, packageJson, loadingScreen, loadingStyles, homeRefresh, motionStyles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LoadingScreen.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/loading-screen.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8"),
    readFile(new URL("../app/motion.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /I Vend Station/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /dataset\.splash/);
  assert.match(layout, /splash = "skip"/);
  assert.match(layout, /prefers-reduced-motion/);
  assert.match(loadingScreen, /sessionStorage/);
  assert.match(loadingStyles, /\.loadingScreen\s*{[\s\S]*?display:\s*none;/);
  assert.match(loadingStyles, /data-splash="show"/);
  assert.match(loadingStyles, /loaderFailsafe/);
  assert.match(loadingStyles, /prefers-reduced-motion/);
  assert.match(homeRefresh, /\.hero-remade \.showcase-unit\s*{[\s\S]*?animation:\s*none\s*!important;/);
  assert.match(homeRefresh, /@keyframes heroLineEnter/);
  assert.match(motionStyles, /\.hero \[data-vending-track\]/);
  assert.match(motionStyles, /clamp\(22px, 7vw, 30px\)/);
  assert.doesNotMatch(motionStyles, /\.hero \.unit-(?:one|two|three)\s*{\s*transform:/);
  await Promise.all([
    access(new URL("../public/i-vend-station-logo.png", import.meta.url)),
    access(new URL("../public/i-vend-station-icon.png", import.meta.url)),
    access(new URL("../public/t05-terminal-correct.png", import.meta.url)),
    access(new URL("../public/t05-views/t05-front-camera-down.webp", import.meta.url)),
    access(new URL("../public/t05-views/t05-right-angle-camera-down.webp", import.meta.url)),
    access(new URL("../public/t05-views/t05-back-camera-down.webp", import.meta.url)),
    access(new URL("../public/t05-views/t05-left-angle-camera-down.webp", import.meta.url)),
    access(new URL("../public/hot-cold-coffee-machine-cutout.png", import.meta.url)),
    access(new URL("../public/tcn-d720-product-cutout.png", import.meta.url)),
  ]);
});

test("uses reliable native navigation instead of the broken Vinext Link shim", async () => {
  const appDirectory = new URL("../app/", import.meta.url);
  const appFiles = await readdir(appDirectory, { recursive: true });
  const sourceFiles = appFiles.filter((file) => file.endsWith(".tsx"));

  for (const file of sourceFiles) {
    const source = await readFile(new URL(file.replaceAll("\\", "/"), appDirectory), "utf8");
    assert.doesNotMatch(source, /from\s+["']next\/link["']/);
  }
});

test("protects accounts and rejects unknown machine routes", async () => {
  const anonymousAccount = await render("/account");
  assert.equal(anonymousAccount.status, 307);
  assert.equal(
    anonymousAccount.headers.get("location"),
    "/signin-with-chatgpt?return_to=%2Faccount",
  );

  const signedInAccount = await render("/account", {
    "oai-authenticated-user-id": "test-user",
    "oai-authenticated-user-email": "customer@example.com",
    "oai-authenticated-user-full-name": "I%20Vend%20Customer",
    "oai-authenticated-user-full-name-encoding": "percent-encoded-utf-8",
  });
  assert.equal(signedInAccount.status, 200);
  const signedInHtml = await signedInAccount.text();
  assert.match(signedInHtml, /I Vend Customer/);
  assert.match(signedInHtml, /customer@example\.com/);
  assert.match(signedInHtml, /href="\/privacy"[^>]*>Read the Privacy Policy\./);

  for (const pathname of [
    "/machines/not-a-real-machine",
    "/machines/tcn-fel-9c-v22",
    "/machines/tcn-cfm-4c-h32",
  ]) {
    const unknownMachine = await render(pathname);
    assert.equal(unknownMachine.status, 404, `${pathname} should not be listed`);
  }
});
