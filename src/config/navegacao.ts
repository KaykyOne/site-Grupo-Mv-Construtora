// Fonte única da navegação do site.
//
// Antes existiam três listas separadas (menu desktop, menu mobile e rodapé) e
// elas já haviam divergido: o rodapé tinha um link vazio e o menu desktop não
// tinha FAQ. Agora tudo sai daqui.
//
// As âncoras (#) funcionam na home. Em páginas internas elas precisam do
// prefixo "/", por isso a helper `hrefAbsoluto`.

import { E_PREVIEW } from "@/config/empresa";

export type ItemMenu = { rotulo: string; href: string };

/** Caminho público deste projeto no GitHub Pages. */
export const SITE_BASE_PATH = "/site-Grupo-Mv-Construtora/";

/** Menu completo — usado no menu mobile (que rola) e no rodapé. */
export const MENU_COMPLETO: ItemMenu[] = [
  { rotulo: "Blog", href: "/blog" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Frota", href: "#frota" },
  { rotulo: "Quem somos", href: "#quem-somos" },
  { rotulo: "Diferenciais", href: "#diferenciais" },
  { rotulo: "Área de atuação", href: "#area-de-atuacao" },
  { rotulo: "FAQ", href: "#faq" },
  { rotulo: "Localização", href: "#localizacao" },
  { rotulo: "Contato", href: "#contato" },
];

/** Recorte do header desktop, que tem espaço limitado. */
export const MENU_PRINCIPAL: ItemMenu[] = MENU_COMPLETO.filter((item) =>
  ["/blog", "#servicos", "#frota", "#quem-somos", "#area-de-atuacao", "#contato"].includes(
    item.href,
  ),
);

/**
 * Numa página interna, a âncora "#contato" não existe — ela vive na home.
 * Esta helper converte para "/#contato" quando não estamos na home.
 */
export function hrefAbsoluto(href: string, naHome: boolean): string {
  if (!E_PREVIEW) {
    if (href.startsWith("#")) return `${SITE_BASE_PATH}${href}`;
    return `${SITE_BASE_PATH}${href.replace(/^\//, "")}`;
  }
  if (naHome) return href;
  return href.startsWith("#") ? `${SITE_BASE_PATH}${href}` : href;
}
