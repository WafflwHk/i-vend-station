# I Vend Station

Website releases follow the permanent rules in [VERSIONING.md](VERSIONING.md). Release history is recorded in [CHANGELOG.md](CHANGELOG.md).

The IVEND vending-machine website, built with React, TypeScript, Vinext, Vite,
and the OpenAI Sites/Cloudflare Worker runtime.

## Requirements

- Node.js 22.13.0 or newer
- npm

Check the installed tools before setup:

```bash
node --version
npm --version
```

## Install and run

From the project folder:

```bash
npm install
npm run dev
```

The development command prints the local URL to open in a browser.

## Validation commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` already performs a production build before running the rendered-page
tests, so a separate build is optional when running the complete test suite.

## Moving the project to another computer

The project is self-contained. The safest transfer method is to push the Git
repository and clone it on the other computer. A normal folder copy also works.

Copy the source files and folders, including hidden project files such as
`.openai/hosting.json`, `.gitignore`, and `.env.example`.

Do not copy generated or computer-specific folders:

- `node_modules/`
- `dist/`
- `.next/`
- `.vinext/`
- `.wrangler/`
- `tmp/`
- `tsconfig.tsbuildinfo`
- local `.env` files

After cloning or copying, run:

```bash
npm install
npm run dev
```

For a strictly lockfile-based installation, use `npm ci` instead of
`npm install`.

## Project layout

- `app/` - routes, components, data, and styles
- `public/` - logos and product images served from root-relative URLs
- `worker/` - Cloudflare Worker entry point
- `build/` - Sites/Vite build integration
- `db/` and `drizzle/` - optional database scaffolding and migrations
- `tests/` - rendered-site regression tests
- `.openai/hosting.json` - Sites project metadata and logical bindings

## Environment variables

The current website does not require local environment variables. If a future
feature adds them, document the variable names without secret values in
`.env.example`, and keep real values in an ignored `.env.local` file.

Never commit passwords, API keys, private keys, or access tokens.

## Assets and imports

All website assets are stored in `public/` and loaded with root-relative URLs
such as `/i-vend-station-logo.png`. Source imports are relative to the project
or use installed package names; no computer-specific filesystem path is needed.

Future GLB or GLTF models should be stored under
`public/models/vending-machines/` and referenced with root-relative web paths.

## Deployment notes

The Sites deployment configuration is kept in `.openai/hosting.json`. D1 and
R2 are currently disabled, so a local database, storage bucket, or secret file
is not required to run the present website.

For the Vercel project `ivend-official`, `vercel.json` selects
`npm run build:vercel` and disables framework auto-detection. This runs
`vite build --mode vercel`, enabling the Nitro Vercel preset in `vite.config.ts`.
The pinned Nitro version generates Vercel Build Output API files directly in
`.vercel/output`, including server functions, static assets, and `config.json`.
Leave the Vercel Output Directory override unset; do not select `dist` or
`.output`, or add an SPA rewrite that would bypass server rendering.

`npm run build` and `npm test` retain the Sites/Cloudflare build path. To check
both deployment targets locally, run `npm test` and `npm run build:vercel`.
