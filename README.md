# WaterMirror website

Product website for [WaterMirror](https://github.com/KageRyo/WaterMirror) (Android app) and
[WQSurrogateModels](https://github.com/KageRyo/WQSurrogateModels) (FastAPI service and research),
published at <https://kageryo.coderyo.com/watermirror/>.

It is a static Next.js site in four languages: English (`/`), Traditional Chinese (`/zh-tw/`),
Simplified Chinese (`/zh-cn/`) and Japanese (`/ja/`).

The home page follows the browser's language: a visitor whose browser prefers Chinese or Japanese
is sent to that page before it paints, unless they have picked a language from the menu. Direct
links to a language page are never redirected.

## Develop

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev        # http://localhost:3000/
npm run lint
npm test           # unit tests (Node's built-in runner)
npm run typecheck  # run after a build or dev start, which generate next-env.d.ts
```

## Build

```bash
PAGES_BASE_PATH=/watermirror SITE_URL=https://kageryo.coderyo.com/watermirror npm run build
```

The static site is written to `out/`. `PAGES_BASE_PATH` is the path the site is served under, and
`SITE_URL` is its public address, used for canonical and language links.

## Deploy

[KageRyo/kageryo-website](https://github.com/KageRyo/kageryo-website) owns
`kageryo.coderyo.com`. Its deployment checks out this repository's `main` branch, builds it with the
settings above and serves `out/` as `/watermirror/`.

`.github/workflows/ci.yml` builds every pull request and push. After a push to `main`, it starts the
kageryo-website deployment so the change goes live. That step needs a repository secret named
`KAGERYO_WEBSITE_DEPLOY_TOKEN`: a fine-grained token limited to `KageRyo/kageryo-website` with
**Actions: Read and write**. Without it, the job leaves a warning and the change goes live at the
next kageryo-website deployment.

## Content

- `src/content/facts.ts` holds every number, version and link shown on the site, each with the
  document it was copied from. Update it after a new release or benchmark.
- `src/content/locales/` holds the text for each language. All locales share one `Copy` type, so a
  missing string fails the build. Each locale is written in local usage rather than converted: for
  example, Simplified Chinese uses 数据, 保存 and 电导率 where Traditional Chinese uses 資料, 儲存 and
  導電度.
- `src/assets/screenshots/<locale>/` holds app screenshots in each language, captured from the
  WaterMirror web build against a live WQSurrogateModels API for the sample reading in `facts.ts`.
- `src/app/sitemap.ts` lists the four language pages; kageryo-website's `robots.txt` points to it.

## License

The Apache License 2.0 applies to the source code and documentation included in this repository,
unless otherwise stated. See [LICENSE](LICENSE).

It does not grant any rights to research datasets, trained model artifacts, or other materials that
are not distributed with this repository. Figures shown on the site are aggregate results published
in [WQSurrogateModels](https://github.com/KageRyo/WQSurrogateModels). Obtain monitoring data from
the official information network and comply with the applicable source terms.
