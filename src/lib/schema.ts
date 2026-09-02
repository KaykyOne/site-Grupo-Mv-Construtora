// Dados estruturados schema.org (JSON-LD).
//
// É o formato que o Google, o Gemini e os demais sistemas de IA usam para
// extrair fatos confiáveis sobre a empresa. Sem isso, o modelo precisa inferir
// tudo do texto corrido — e, como existem outras empresas chamadas
// "MV Construtora" no Brasil, a inferência erra ou não cita ninguém.

import { SERVICOS, CIDADES_ATENDIDAS } from "@/data/servicos";
import { YOUTUBE_CANAL } from "@/data/videos";

export const SITE_URL = "https://www.grupomvconstrutora.com.br";

export const organizacaoSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#organizacao`,
  name: "MV Construtora",
  legalName: "MV Construtora",
  alternateName: ["Grupo MV Construtora", "Construtora MV", "MV Construtora Maranhão"],
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logomv.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Empresa de terraplenagem, obras civis, infraestrutura viária, drenagem e locação de " +
    "máquinas pesadas sediada em Pindaré-Mirim, Maranhão, com atuação no Vale do Pindaré " +
    "e em todo o estado desde 2011.",
  taxID: "14.299.029/0001-20",
  vatID: "14.299.029/0001-20",
  foundingDate: "2011-09-14",
  founder: {
    "@type": "Person",
    name: "Alan Robson Leite Pereira",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rodovia MA-320, Pitombeira (próximo ao Condomínio OASIS)",
    addressLocality: "Pindaré-Mirim",
    addressRegion: "MA",
    postalCode: "65370-000",
    addressCountry: "BR",
  },
  // TODO: confirmar as coordenadas exatas da base no Google Maps
  // (botão direito sobre o local -> as coordenadas aparecem no topo do menu).
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.6089,
    longitude: -45.3419,
  },
  telephone: "+5598992368928",
  email: "atendimento@grupomvconstrutora.com.br",
  priceRange: "$$",
  currenciesAccepted: "BRL",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  areaServed: CIDADES_ATENDIDAS.map((cidade) => ({
    "@type": "City",
    name: cidade,
    containedInPlace: { "@type": "State", name: "Maranhão" },
  })),
  sameAs: ["https://www.instagram.com/grupoconstrutoramv/", YOUTUBE_CANAL],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços da MV Construtora",
    itemListElement: SERVICOS.map(({ nome, descricao }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: nome,
        description: descricao,
        provider: { "@id": `${SITE_URL}/#organizacao` },
        areaServed: { "@type": "State", name: "Maranhão" },
      },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "MV Construtora",
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organizacao` },
};

export const faqSchema = (faqs: readonly (readonly [string, string])[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([pergunta, resposta]) => ({
    "@type": "Question",
    name: pergunta,
    acceptedAnswer: { "@type": "Answer", text: resposta },
  })),
});

// --- Schemas por página ---

/** Página de um serviço específico (task 08). */
export const servicoSchema = (servico: {
  slug: string;
  nome: string;
  h1: string;
  descricao: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/servicos/${servico.slug}#servico`,
  name: servico.nome,
  alternateName: servico.h1,
  description: servico.descricao,
  serviceType: servico.nome,
  provider: { "@id": `${SITE_URL}/#organizacao` },
  areaServed: CIDADES_ATENDIDAS.map((cidade) => ({
    "@type": "City",
    name: cidade,
    containedInPlace: { "@type": "State", name: "Maranhão" },
  })),
  url: `${SITE_URL}/servicos/${servico.slug}`,
});

/** Trilha de navegação. Cada item é [rótulo, caminho] — o caminho é relativo ao site. */
export const breadcrumbSchema = (itens: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: itens.map(([nome, caminho], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: nome,
    item: `${SITE_URL}${caminho}`,
  })),
});

/**
 * VideoObject para a galeria de vídeos.
 *
 * Deixa os vídeos elegíveis à aba Vídeos do Google e reforça a entidade da
 * empresa. `thumbnailUrl` precisa ser absoluta — os posters vêm do bundle
 * como caminho relativo, por isso o prefixo com SITE_URL.
 */
export const videosSchema = (
  videos: {
    youtubeId: string;
    src: string;
    poster: string;
    titulo: string;
    descricao: string;
    publicadoEm: string;
    duracao: string;
  }[],
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: videos.map((video, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: video.titulo,
      description: video.descricao,
      thumbnailUrl: video.poster.startsWith("http") ? video.poster : `${SITE_URL}${video.poster}`,
      uploadDate: video.publicadoEm,
      duration: video.duracao,
      publisher: { "@id": `${SITE_URL}/#organizacao` },
      ...(video.youtubeId
        ? {
            embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
            url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
          }
        : { contentUrl: `${SITE_URL}${video.src}` }),
    },
  })),
});

/** Página de uma máquina da frota (task 08 / navegação frota <-> serviços). */
export const maquinaSchema = (maquina: {
  slug: string;
  nome: string;
  h1: string;
  intro: string;
  categoria: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/frota/${maquina.slug}#equipamento`,
  name: `Locação de ${maquina.nome.toLowerCase()}`,
  alternateName: maquina.h1,
  description: maquina.intro,
  serviceType: maquina.categoria,
  provider: { "@id": `${SITE_URL}/#organizacao` },
  areaServed: { "@type": "State", name: "Maranhão" },
  url: `${SITE_URL}/frota/${maquina.slug}`,
});
