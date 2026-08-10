/** Minimal runtime bindings used by this Sites project. */
interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface D1Database {
  prepare(query: string): unknown;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}
