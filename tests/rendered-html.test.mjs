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
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
  assert.doesNotMatch(html, /&amp;nearr;/i);
});

test("server-renders every public product route", async () => {
  const routes = [
    ["/store", /Shop the range\./],
    ["/machines", /Choose a model\./],
    ["/machines/hot-cold-coffee-machine", /Hot &amp; Cold Coffee Machine/],
    ["/products/t05-cashless-device", /Cashless,/],
  ];

  for (const [pathname, expectedContent] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render successfully`);
    const html = await response.text();
    assert.match(html, expectedContent);
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
  }
});

test("contains the finished site assets and no starter scaffolding", async () => {
  const [layout, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /I Vend Station/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
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
