# WaterMirror website

Product website for [WaterMirror](https://github.com/KageRyo/WaterMirror) (Android app) and
[WQSurrogateModels](https://github.com/KageRyo/WQSurrogateModels) (FastAPI service and research).
It is a static Next.js site in English (`/`) and Traditional Chinese (`/zh-tw/`), deployed to
GitHub Pages.

## Develop

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev        # http://localhost:3000/
npm run lint
npm run typecheck  # run after a build or dev start, which generate next-env.d.ts
```

## Build and preview the Pages output

```bash
PAGES_BASE_PATH=/watermirror-website npm run build
```

The static site is written to `out/`. To preview it under the same path GitHub Pages uses, serve a
directory that contains `out/` as `watermirror-website/`.

## Deploy

`.github/workflows/pages.yml` builds every pull request and deploys every push to `main`. The
workflow reads the base path and public URL from `actions/configure-pages`, so moving to a custom
domain only needs a Pages setting change.

## Content

- `src/content/facts.ts` holds every number, version and link shown on the site, each with the
  document it was copied from. Update it after a new release or benchmark.
- `src/content/copy.ts` holds the English and Traditional Chinese text. Both locales share one
  `Copy` type, so a missing translation fails the build.
- `src/assets/screenshots/` holds app screenshots copied from `WaterMirror/docs/screenshots/`.
