# IVEND Website Versioning

The public website uses Semantic Versioning: `MAJOR.MINOR.PATCH`.

The single source of truth is `app/config/site.ts`. Website components must import `IVEND_VERSION` from that file instead of hardcoding a public version.

Release status is controlled by `IVEND_RELEASE_STATUS` in the same file. Set it to `"Beta"` or `"Stable"`; the header badge appears only for Beta, and both footers display the selected status.

## Release levels

- **PATCH**: bug fixes, copy corrections, image replacements, small CSS/responsive/UI/performance fixes, or small website cleanup.
- **MINOR**: meaningful customer-facing features, new sections or product pages, interactive experiences, quotation features, animations, or significant UI improvements. Reset PATCH to `0`.
- **MAJOR**: a complete redesign, major architecture or navigation change, breaking UX changes, or a new website generation. Reset MINOR and PATCH to `0`.

Prefer PATCH when uncertain unless the update introduces a genuinely new customer-facing capability. Never decrease the version.

## Required release workflow

1. Read the current value from `app/config/site.ts` before changing the website.
2. Complete and validate the related website changes.
3. Choose one PATCH, MINOR, or MAJOR increment for the completed update.
4. Update `IVEND_VERSION` once in the central configuration.
5. Add a concise dated entry to `CHANGELOG.md`.
6. Confirm the shared and product-specific footers render the imported version.
7. Report the previous version, new version, change type, reason, and validation results.

Inspection-only work does not change the version.
