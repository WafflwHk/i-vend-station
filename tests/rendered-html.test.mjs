import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
