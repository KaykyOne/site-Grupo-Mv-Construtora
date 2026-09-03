// Build de PREVIEW estático para o GitHub Pages.
//
// Uso: npm run build:pages
//
// Diferenças em relação ao build de produção (`npm run build`, Vercel + SSR):
//   - prerender estático em vez de SSR
//   - tudo sob o subcaminho /site-Grupo-Mv-Construtora/
//   - robots.txt bloqueando tudo, e as páginas saem com <meta name="robots" content="noindex">
//
// O noindex é proposital. Sem ele, o Google indexa a cópia do preview, ela vira
// conteúdo duplicado e passa a disputar posição com a produção.

import { spawnSync } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_PATH = process.env.BASE_PATH ?? "/site-Grupo-Mv-Construtora/";

console.log(`\n[preview] build estático sob ${BASE_PATH}\n`);

const sitemap = spawnSync(process.execPath, ["scripts/gerar-sitemap.mjs"], {
  stdio: "inherit",
  env: process.env,
});

if (sitemap.status !== 0) {
  process.exit(sitemap.status ?? 1);
}

const imagens = spawnSync(process.execPath, ["scripts/gerar-imagens-responsivas.mjs"], {
  stdio: "inherit",
  env: process.env,
});

if (imagens.status !== 0) {
  process.exit(imagens.status ?? 1);
}

const resultado = spawnSync("npx", ["vite", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, BUILD_TARGET: "static", BASE_PATH },
});

if (resultado.status !== 0) {
  process.exit(resultado.status ?? 1);
}

// O diretório de saída do prerender varia conforme a versão do TanStack Start.
// Escrevemos o robots.txt nos candidatos mais prováveis.
const candidatos = [".output/public", "dist", "dist/client"];
const robots = `# Build de PREVIEW. Não deve ser indexado.
# A versão pública e indexável está em https://www.grupomvconstrutora.com.br
User-agent: *
Allow: /

Sitemap: https://www.grupomvconstrutora.com.br/sitemap.xml
`;

for (const dir of candidatos) {
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "robots.txt"), robots, "utf8");
    console.log(`[pages] robots.txt escrito em ${dir}`);
  } catch {
    // diretório inexistente nesta versão do build — segue
  }
}

console.log("\n[preview] pronto.\n");
