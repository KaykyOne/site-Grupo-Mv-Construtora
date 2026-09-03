// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// ---------------------------------------------------------------------------
// Dois alvos de build
//
//   npm run build        -> PRODUÇÃO na Vercel, com SSR, em www.grupomvconstrutora.com.br
//   npm run build:pages  -> PREVIEW estático no GitHub Pages, sob /site-Grupo-Mv-Construtora/
//
// A diferença é só de variável de ambiente: BUILD_TARGET=static e BASE_PATH.
//
// O preview sai com noindex (ver src/routes/__root.tsx). Isso é proposital: se o
// Google indexar a cópia do GitHub Pages, ela vira conteúdo duplicado e disputa
// posição com a produção — o oposto do que queremos.
// ---------------------------------------------------------------------------
const estatico = process.env.BUILD_TARGET === "static";
const basePath = estatico ? (process.env.BASE_PATH ?? "/site-Grupo-Mv-Construtora/") : "/";
const routerBasepath = basePath === "/" ? "" : basePath.replace(/\/$/, "");

export default defineConfig({
  // Na Vercel queremos o nitro (SSR). No GitHub Pages não existe servidor,
  // então o build vira prerender estático.
  ...(estatico ? { nitro: false } : {}),
  vite: {
    base: basePath,
    define: {
      "import.meta.env.VITE_BUILD_TARGET": JSON.stringify(estatico ? "static" : "server"),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      basepath: routerBasepath,
    },
    ...(estatico
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
          },
        }
      : {}),
  },
});
