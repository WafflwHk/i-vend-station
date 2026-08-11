import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Find your machine\./);
  assert.match(html, /Cashless Device/);
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
    ["/machines/hot-cold-coffee-machine", /Hot &amp; Cold Coffee Machine/],
    ["/products/t05-cashless-device", /Cashless,/],
    ["/cart", /Your quote cart\./],
  ];

  for (const [pathname, expectedContent] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render successfully`);
    const html = await response.text();
    assert.match(html, expectedContent);
    assert.match(html, /data-loading-screen/);
    assert.doesNotMatch(html, /&amp;nearr;/i);
  }
});

test("renders the accessible finish and size configurator on every machine page", async () => {
  const machineRoutes = [
    "/machines/hot-cold-coffee-machine",
    "/machines/tcn-d720-6g",
    "/machines/tcn-d720-10g",
    "/machines/tcn-d720-10c-v22",
    "/machines/tcn-d720-10c-v22-10r",
    "/machines/tcn-fel-9c-v22",
    "/machines/tcn-cfm-4c-h32",
  ];

  for (const pathname of machineRoutes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render successfully`);
    const html = await response.text();
    assert.match(html, /aria-label="Illustrative machine configuration preview"/);
    assert.match(html, /Alternative finishes are illustrative and do not confirm product availability\./);
    assert.match(html, /S and L change only the viewer scale, not confirmed machine dimensions\./);
    assert.match(html, /type="radio"/);
    assert.match(html, /aria-label="Add [^"]+ to cart"/);
  }
});

test("renders the device-local quote cart without pretending to be checkout", async () => {
  const response = await render("/cart");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Quote Cart \| I Vend Station<\/title>/i);
  assert.match(html, /Loading your quote cart/);
  assert.match(html, /Continue shopping/);
  assert.match(html, /aria-label="Shopping cart, 0 items"/);
  assert.doesNotMatch(html, /Checkout|Subtotal|Buy now|RM\s*[\d,.]+|mailto:/i);

  const t05Response = await render("/products/t05-cashless-device");
  const t05Html = await t05Response.text();
  assert.match(t05Html, /aria-label="Add T05 Cashless Device to cart"/);

  const cartStore = await readFile(new URL("../app/components/cart-store.ts", import.meta.url), "utf8");
  assert.match(cartStore, /ivend-quote-cart:v1/);
  assert.match(cartStore, /ivend-cart-changed/);
  assert.match(cartStore, /Math\.min\(99/);
  assert.match(cartStore, /localStorage/);
});

test("contains the finished site assets and no starter scaffolding", async () => {
  const [layout, packageJson, loadingScreen, loadingStyles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LoadingScreen.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/loading-screen.module.css", import.meta.url), "utf8"),
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
  await Promise.all([
    access(new URL("../public/i-vend-station-logo.png", import.meta.url)),
    access(new URL("../public/i-vend-station-icon.png", import.meta.url)),
    access(new URL("../public/t05-terminal-correct.png", import.meta.url)),
    access(new URL("../public/hot-cold-coffee-machine.jpg", import.meta.url)),
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

  const unknownMachine = await render("/machines/not-a-real-machine");
  assert.equal(unknownMachine.status, 404);
});
