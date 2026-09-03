export type PostBlog = {
  slug: string;
  titulo: string;
  descricao: string;
  publicadoEm: string;
  atualizadoEm: string;
  autor: string;
  servicos: string[];
  conteudo: string;
};

type Frontmatter = Omit<PostBlog, "slug" | "conteudo" | "servicos"> & { servicos: string };

const arquivos = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function lerPost(caminho: string, arquivo: string): PostBlog {
  const encontrado = arquivo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!encontrado) throw new Error(`Post sem frontmatter válido: ${caminho}`);

  const campos = Object.fromEntries(
    encontrado[1]
      .split(/\r?\n/)
      .filter(Boolean)
      .map((linha) => {
        const indice = linha.indexOf(":");
        return [linha.slice(0, indice).trim(), linha.slice(indice + 1).trim().replace(/^"|"$/g, "")];
      }),
  ) as Frontmatter;

  const obrigatorios: (keyof Frontmatter)[] = [
    "titulo",
    "descricao",
    "publicadoEm",
    "atualizadoEm",
    "autor",
    "servicos",
  ];
  if (obrigatorios.some((campo) => !campos[campo])) {
    throw new Error(`Frontmatter incompleto: ${caminho}`);
  }

  const slug = caminho.split("/").pop()!.replace(/\.md$/, "");
  return {
    slug,
    titulo: campos.titulo,
    descricao: campos.descricao,
    publicadoEm: campos.publicadoEm,
    atualizadoEm: campos.atualizadoEm,
    autor: campos.autor,
    servicos: campos.servicos.split(",").map((servico) => servico.trim()),
    conteudo: encontrado[2].trim(),
  };
}

export const POSTS_BLOG = Object.entries(arquivos)
  .map(([caminho, arquivo]) => lerPost(caminho, arquivo))
  .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

export const postPorSlug = (slug: string) => POSTS_BLOG.find((post) => post.slug === slug);
