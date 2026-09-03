import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { POSTS_BLOG } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog de Terraplenagem e Obras no Maranhão | MV Construtora" },
      { name: "description", content: "Conteúdos práticos sobre terraplenagem, máquinas pesadas, estradas e planejamento de obras no Maranhão." },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blog,
});

function Blog() {
  return <main id="conteudo" className="pt-[76px]"><section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20"><Breadcrumbs itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Blog" }]} /><div className="mt-8"><SectionTitle as="h1" eyebrow="Central de conhecimento" title="Obra bem planejada começa com informação clara." /></div><p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">Guias diretos sobre terraplenagem, infraestrutura e locação de máquinas para quem precisa decidir melhor antes de mobilizar uma obra no Maranhão.</p><div className="mt-14 grid gap-6 md:grid-cols-2">{POSTS_BLOG.map((post) => <article key={post.slug} className="border-t-2 border-zinc-950 pt-6"><p className="text-sm font-semibold text-red-600">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(`${post.publicadoEm}T12:00:00`))}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight"><Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-red-700">{post.titulo}</Link></h2><p className="mt-4 leading-7 text-zinc-700">{post.descricao}</p><Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">Ler artigo <ArrowRight size={16} /></Link></article>)}</div></section></main>;
}
