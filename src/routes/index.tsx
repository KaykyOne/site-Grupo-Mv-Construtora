import { useCallback, useEffect, useMemo, useState } from "react";
import { sendEmail } from "@/lib/send-email";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SERVICOS, DESTAQUES, CIDADES_ATENDIDAS } from "@/data/servicos";
import { VIDEOS } from "@/data/videos";
import { CATEGORIAS_FROTA, FROTA } from "@/data/frota";
import {
  organizacaoSchema,
  websiteSchema,
  faqSchema,
  videosSchema,
  SITE_URL,
} from "@/lib/schema";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { reveal } from "@/components/site/animacoes";
import { EMPRESA, MAPS_EMBED_URL, MAPS_OPEN_URL, telLink, waLink } from "@/config/empresa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import patrol from "@/assets/otimizadas/patrol.webp";
import caminhao from "@/assets/otimizadas/caminhao.webp";
import caminhaotraseira from "@/assets/otimizadas/caminhaotraseira.webp";
import pacarregadeira from "@/assets/otimizadas/pacarregadeira.webp";
import escavadeira1 from "@/assets/otimizadas/escavadeira1.webp";
import escavadeira2 from "@/assets/otimizadas/escavadeira2.webp";
import escavadeira3 from "@/assets/otimizadas/escavadeira3.webp";
import tresescavadeiras1 from "@/assets/otimizadas/tresescavadeiras1.webp";
import diferenciais from "@/assets/otimizadas/diferenciais.webp";
import caminhaopipa from "@/assets/otimizadas/caminhaopipa.webp";
import logomv from "@/assets/otimizadas/logomv.webp";
import logomvbanner from "@/assets/otimizadas/logomvbanner.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import operadoreseterceiros from "@/assets/otimizadas/operadoreseterceiros.webp";
import fotodaplacaalan from "@/assets/otimizadas/fotodaplacaalan.webp";
import fotoalanetalita from "@/assets/otimizadas/fotoalanetalita.webp";
import eventoinauguracao from "@/assets/otimizadas/eventoinauguracao.webp";
import fotodaplacatigd from "@/assets/otimizadas/fotodaplacatigd.webp";
import andamentodaobra from "@/assets/otimizadas/andamentodaobra.webp";
import colaboradores from "@/assets/otimizadas/colaboradores.webp";
import alaneasmaquinas1 from "@/assets/otimizadas/alaneasmaquinas1.webp";
import caminhaopipa1 from "@/assets/otimizadas/caminhaopipa1.webp";
import caminhaoprancha from "@/assets/otimizadas/caminhaoprancha.webp";
import colaboradores1 from "@/assets/otimizadas/colaboradores1.webp";
import fotodapatrol from "@/assets/otimizadas/fotodapatrol.webp";
import fotodas3escavadeiras from "@/assets/otimizadas/fotodas3escavadeiras.webp";
import fotodosmaquinarios from "@/assets/otimizadas/fotodosmaquinarios.webp";
import placapedrafundamental from "@/assets/otimizadas/placapedrafundamental.webp";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "MV Construtora Pindaré-Mirim MA | Terraplenagem e Locação de Máquinas",
      },
      {
        name: "description",
        content:
          "Terraplenagem, obras civis, drenagem e locação de máquinas pesadas no Maranhão. Sede em Pindaré-Mirim, atendendo Santa Inês, Bacabal, Zé Doca e todo o Vale do Pindaré desde 2011.",
      },
      {
        property: "og:title",
        content: "MV Construtora | Terraplenagem e Locação de Máquinas no Maranhão",
      },
      {
        property: "og:description",
        content:
          "Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas pesadas em todo o Maranhão. Desde 2011 em Pindaré-Mirim.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "MV Construtora" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "geo.region", content: "BR-MA" },
      { name: "geo.placename", content: "Pindaré-Mirim" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "MV Construtora — terraplenagem e locação de máquinas no Maranhão",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});


// --- Slide de fotos (logo após o Hero) ---
// Este array não tem limite de quantidade: para adicionar uma nova foto, basta
// 1) colocar o arquivo .png/.jpg em src/assets/
// 2) rodar `node scripts/otimizar-imagens.mjs` (gera o .webp em src/assets/otimizadas/)
// 3) importar lá em cima (import minhaFoto from "@/assets/otimizadas/minhafoto.webp")
// 4) adicionar uma nova linha aqui embaixo no formato { src: minhaFoto, alt: "Descrição da foto" }
// O alt deve descrever a foto de verdade e, quando fizer sentido, citar a cidade.
const slideshowImages: { src: string; alt: string }[] = [
  { src: colaboradores, alt: "Equipe da MV Construtora em obra de terraplenagem no Maranhão" },
  {
    src: operadoreseterceiros,
    alt: "Gestores, operadores e equipes terceirizadas da MV Construtora em canteiro de obra",
  },
  {
    src: placapedrafundamental,
    alt: "Placa de pedra fundamental de obra executada pela MV Construtora",
  },
  { src: colaboradores1, alt: "Colaboradores da MV Construtora em Pindaré-Mirim, Maranhão" },
  {
    src: fotodaplacatigd,
    alt: "Placa da obra do Terminal Intermodal Gonçalves Dias, no Maranhão",
  },
  {
    src: eventoinauguracao,
    alt: "Evento de inauguração de obra entregue pela MV Construtora",
  },
  { src: andamentodaobra, alt: "Andamento de obra de movimentação de terra no Maranhão" },
  { src: fotodaobra, alt: "Obra de terraplenagem em execução pela MV Construtora" },
  {
    src: fotodosmaquinarios,
    alt: "Maquinário pesado da frota própria da MV Construtora",
  },
  {
    src: fotodas3escavadeiras,
    alt: "Três escavadeiras hidráulicas da frota da MV Construtora em obra",
  },
];

// --- Imagens da seção "Por que escolher a MV" (também em slide, sem limite) ---
// Mesma lógica do array acima: importe a foto no topo do arquivo e adicione
// uma nova linha aqui para ela entrar no slide.
const diferenciaisImages: { src: string; alt: string }[] = [
  { src: diferenciais, alt: "Equipe da MV Construtora em obra no Vale do Pindaré, Maranhão" },
  { src: fotodaplacaalan, alt: "Placa de identificação de obra da MV Construtora" },
  {
    src: fotoalanetalita,
    alt: "Fundadores da MV Construtora em frente à placa de obra",
  },
  { src: colaboradores1, alt: "Equipe operacional da MV Construtora em campo" },
  { src: colaboradores, alt: "Equipe da MV Construtora ao lado das máquinas em obra" },
];

const faqs: [string, string][] = [
  [
    "Quais cidades do Maranhão a MV Construtora atende?",
    "A MV Construtora tem sede em Pindaré-Mirim (MA) e atende todo o Maranhão, com presença frequente em Santa Inês, Bacabal, Zé Doca, Santa Luzia, Monção, Alto Alegre do Pindaré, Açailândia, Imperatriz e São Luís. Executamos obras urbanas, rurais, industriais e comerciais.",
  ],
  [
    "Quais serviços a MV Construtora executa?",
    "Terraplenagem (incluindo pavimentação), infraestrutura viária (estradas vicinais, patrolamento e cascalhamento), obras civis, drenagem pluvial, preparação e limpeza de áreas, locação de máquinas pesadas, transporte de equipamentos com caminhão prancha, serviços com caminhão Munck, apoio e gestão de grandes obras e serviços para propriedades rurais.",
  ],
  [
    "Os equipamentos são locados com operador?",
    "Sim. Disponibilizamos operadores experientes e treinados. Também avaliamos locações sem operador conforme o equipamento e o contrato.",
  ],
  [
    "Como funciona o orçamento?",
    "Entendemos o escopo, local, prazo e condições do terreno. Com essas informações, enviamos uma proposta transparente e personalizada.",
  ],
  [
    "A MV Construtora faz a gestão completa da obra?",
    "Sim. Dentro do serviço de apoio e gestão de grandes obras, assumimos planejamento, equipes, equipamentos, acompanhamento técnico e controle de custos, qualidade e cronograma, conforme a necessidade do projeto.",
  ],
];

// --- Validação do formulário ---
const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(100),

  email: z.string().trim().email("Informe um e-mail válido"),

  telefone: z
    .string()
    .trim()
    .min(10, "Telefone com DDD (mín. 10 dígitos)")
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]+$/, "Use apenas números e ( ) + -"),

  mensagem: z.string().trim().min(10, "Descreva sua necessidade").max(1000, "Mensagem muito longa"),
});
type ContactForm = z.infer<typeof contactSchema>;
function VideoSlideshow() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % VIDEOS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + VIDEOS.length) % VIDEOS.length), []);

  return (
    <section id="galeria-videos" className="bg-[#f5f4f0] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Nossos Trabalhos" title="Equipamentos em ação." />
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="relative h-[260px] w-full overflow-hidden rounded-sm bg-zinc-900 sm:h-[420px] lg:h-[460px]">
          <VideoPlayer key={index} video={VIDEOS[index]} ativo />

          <button
            onClick={prev}
            aria-label="Vídeo anterior"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:left-5"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            aria-label="Próximo vídeo"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:right-5"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicadores. A área de toque tem 44px mesmo com o ponto pequeno. */}
        <div className="mt-6 flex items-center justify-center gap-1">
          {VIDEOS.map((video, i) => (
            <button
              key={video.src}
              onClick={() => setIndex(i)}
              aria-label={`Ir para o vídeo ${i + 1}: ${video.titulo}`}
              aria-current={i === index}
              className="grid h-11 w-11 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-red-600" : "w-2 bg-zinc-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={index}
          src={slideshowImages[index].src}
          alt={slideshowImages[index].alt}
          width={1600}
          height={1067}
          // A primeira foto é o elemento LCP da página: precisa ser eager e
          // prioritária. As seguintes só entram depois de 5s, então podem ser lazy.
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "low"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

function DiferenciaisSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % diferenciaisImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative h-[520px] w-full overflow-hidden lg:h-[600px]">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={diferenciaisImages[index].src}
            alt={diferenciaisImages[index].alt}
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover grayscale-[10%]"
          />
        </AnimatePresence>
      </div>

      {diferenciaisImages.length > 1 && (
        <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-4">
          {diferenciaisImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 right-0 w-[90%] bg-red-600 p-6 text-white">
        <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-2xl">
          Seu cronograma é o nosso compromisso.
        </p>
      </div>
    </motion.div>
  );
}

function Index() {
  const [openFaq, setOpenFaq] = useState(0);
  const [ativa, setAtiva] = useState<(typeof CATEGORIAS_FROTA)[number]>("Todos");
  const [sent, setSent] = useState(false);

  const frotaFiltrada = useMemo(
    () => (ativa === "Todos" ? FROTA : FROTA.filter((m) => m.categoria === ativa)),
    [ativa],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const onSubmit = async (data: ContactForm) => {
    try {
      await sendEmail({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          mensagem: data.mensagem,
        },
      });

      setSent(true);
      reset();

      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem.");
    }
  };
  return (
    <>
      {/* Dados estruturados (schema.org). JSON-LD no <body> é igualmente válido
          para o Google — a documentação aceita head ou body. Como o site é SSR,
          o script chega no HTML inicial, que é o que importa para os crawlers de IA. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacaoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videosSchema(VIDEOS)) }}
      />

      <main id="conteudo">
        {/* HERO */}
        <section
          id="inicio"
          className="relative flex min-h-[620px] items-end overflow-hidden bg-zinc-950 sm:min-h-[700px] lg:min-h-[780px]"
        >
          {/* A imagem ocupa 100% da largura e passa por baixo do header translúcido. */}
          <HeroBackgroundSlideshow />

          {/*
            Escurecimento direcional. A foto tem céu claro e pessoas de roupa clara —
            sem isso o texto branco some. Mas véu uniforme forte apaga a foto inteira,
            então o degradê acompanha onde o texto está:
            - no mobile o texto ocupa a largura toda -> degradê de baixo para cima
            - no desktop o texto fica à esquerda -> degradê da esquerda para a direita,
              deixando o lado direito da foto visível
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/25 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/15 lg:block"
          />
          {/* Fecha a emenda com a faixa escura da seção seguinte. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-zinc-950 to-transparent lg:block"
          />

          <motion.div
            aria-hidden="true"
            className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full bg-red-600/20 blur-3xl"
            animate={{ y: [0, -25, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-[150px] sm:px-8 sm:pb-16 lg:pb-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.16 } } }}
              className="max-w-4xl"
            >
              <motion.div
                variants={reveal}
                className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-red-400"
              >
                <span className="h-px w-10 bg-red-500" /> Pindaré-Mirim · Maranhão · Desde 2011
              </motion.div>
              <motion.h1
                variants={reveal}
                className="max-w-3xl text-4xl font-semibold leading-[112%] tracking-[-0.055em] text-white [text-shadow:0_2px_18px_rgb(0_0_0_/_0.65)] sm:text-5xl lg:text-[70px]"
              >
                Terraplenagem e Locação de Máquinas Pesadas no{" "}
                <span className="text-white/80">Maranhão</span>
              </motion.h1>
              <motion.p
                variants={reveal}
                className="mt-4 text-lg font-medium text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.7)] sm:text-xl"
              >
                Força para executar. Precisão para entregar.
              </motion.p>
              <motion.p
                variants={reveal}
                className="mt-5 max-w-xl text-base leading-7 text-white/90 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.7)] sm:text-lg"
              >
                Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas
                pesadas em todo o Maranhão, com segurança, produtividade e compromisso do primeiro
                movimento de terra até a entrega.
              </motion.p>
              <motion.div variants={reveal} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="#contato">Solicitar orçamento</CTAButton>
                <CTAButton href="#servicos">Conhecer soluções</CTAButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAIXA DE DESTAQUES — resume as frentes de atuação logo abaixo do hero */}
        <section aria-label="Frentes de atuação" className="border-y border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm font-semibold text-white/75 sm:text-base">
              {DESTAQUES.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  <span>{item}</span>
                  {i < DESTAQUES.length - 1 && (
                    <span aria-hidden="true" className="text-red-500">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SLIDE DE VÍDEOS — logo após o Hero */}
        <VideoSlideshow />

        {/* GALERIA DE FROTA COM FILTROS + LIGHTBOX */}
        <section id="frota" className="bg-zinc-950 py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Nossa frota"
                title="A máquina certa, no lugar certo, no tempo certo."
                light
              />
              <div className="max-w-md">
                <p className="leading-7 text-white/65">
                  Frota própria e revisada, com operador treinado. Cada equipamento tem uma página
                  com as aplicações dele e os serviços em que entra.
                </p>
                <Link
                  to="/frota"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300"
                >
                  Ver a frota completa <MoveUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Filtros por categoria */}
            <div className="mt-10 flex flex-wrap gap-2">
              {CATEGORIAS_FROTA.map((cat) => {
                const active = ativa === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setAtiva(cat)}
                    aria-pressed={active}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                      active
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-white/30 bg-white/10 text-white/90 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Cada card leva à página do equipamento */}
            <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {frotaFiltrada.map((item) => (
                  <motion.div
                    layout
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Link
                      to="/frota/$slug"
                      params={{ slug: item.slug }}
                      className="group relative block overflow-hidden rounded-sm bg-zinc-900 text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.imgs[0]}
                          alt={`${item.nome} da frota da MV Construtora em operação`}
                          width={1600}
                          height={1200}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {item.imgs.length > 1 && (
                          <span className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                            {item.imgs.length} fotos
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-400">
                          {item.categoria}
                        </span>
                        <h3 className="mt-1 text-lg font-semibold">{item.nome}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/65">{item.resumo}</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-400">
                          Ver equipamento <MoveUpRight size={16} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="O que fazemos"
              title="Estrutura completa para obras que não podem parar."
            />
            <div className="max-w-md">
              <p className="leading-7 text-zinc-600">
                Dez frentes de atuação e um único parceiro para mobilizar máquinas, equipes e gestão
                em obras públicas e privadas no Maranhão.
              </p>
              <Link
                to="/servicos"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700"
              >
                Ver todos os serviços em detalhe <MoveUpRight size={16} />
              </Link>
            </div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.13 } } }}
            className="mt-16 grid border-t border-zinc-300 lg:grid-cols-3"
          >
            {SERVICOS.map((service, i) => (
              <motion.article
                variants={reveal}
                key={service.slug}
                className="group border-b border-zinc-300 py-9 lg:border-r lg:px-8 lg:first:pl-0"
              >
                <div className="mb-12 flex items-center justify-between">
                  <service.icon
                    className="text-red-500 transition-transform duration-300 group-hover:-translate-y-1"
                    size={31}
                    strokeWidth={1.6}
                  />
                  <span className="font-mono text-xs text-zinc-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{service.nome}</h3>
                <p className="mt-4 max-w-sm leading-7 text-zinc-600">{service.resumo}</p>
                <Link
                  to="/servicos/$slug"
                  params={{ slug: service.slug }}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-red-600"
                >
                  Ver detalhes <MoveUpRight size={16} />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* SOBRE */}
        <section id="quem-somos" className="bg-zinc-950 py-24 text-white lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Quem somos"
                title="Construção que nasce da experiência de campo."
                light
              />
              <p className="mt-7 max-w-lg leading-7 text-white/70">
                Nossa História A MV Construtora nasceu do sonho, da determinação e da visão
                empreendedora de Alan Robson Leite Pereira, fundador da empresa em 14 de setembro de
                2011.
                <br />
                Filho de Maria Aparecida e de José de Anchieta (in memoriam), Alan sempre acreditou
                que o trabalho realizado com honestidade, dedicação e compromisso é capaz de
                transformar vidas e construir um legado. Corretor de imóveis por formação,
                empreendedor por vocação, é casado com Talita Mendes e pai de Miguel Ângelo e Alan
                Vinícius.
                <br />
                <br /> Foi justamente do maior patrimônio de sua vida — sua família — que surgiu o
                nome da empresa. A união das iniciais de seus filhos, Miguel e Vinícius, deu origem
                à MV Construtora, simbolizando que cada obra executada carrega os mesmos valores
                cultivados dentro de casa: responsabilidade, confiança, respeito e compromisso com o
                futuro.
                <br /> <br /> Ao longo de sua trajetória, a empresa atuou na construção de edifícios
                e residências, adquirindo sólida experiência no setor da construção civil. Com o
                passar dos anos, acompanhando as necessidades do mercado e investindo continuamente
                em pessoas, equipamentos e tecnologia, a MV Construtora expandiu sua atuação e
                especializou-se em obras de terraplenagem e infraestrutura.
                <br /> <br />
                Hoje, a empresa é referência na execução de serviços como: <br />* Terraplenagem; *
                Construção e recuperação de estradas vicinais; <br />* Escavação, corte e aterro; *
                Regularização e nivelamento de terrenos; <br />* Preparação de solo para plantio e
                empreendimentos agrícolas; <br />* Limpeza e conformação de áreas; * Movimentação de
                terra para obras públicas e privadas.
                <br /> <br /> Cada projeto é conduzido com planejamento, segurança, qualidade
                técnica e respeito aos prazos estabelecidos, buscando sempre superar as expectativas
                de clientes e parceiros.
                <br />
                {/* Mais do que executar obras, a MV Construtora constrói relacionamentos
                duradouros, gera desenvolvimento para as comunidades onde atua e contribui para o
                crescimento da infraestrutura do Brasil.*/}
                <br />
                <br /> MV Construtora — Movendo a terra, construindo o futuro e deixando um legado
                de confiança, excelência e compromisso em cada projeto.
              </p>

              {/* Edite os números abaixo pelos dados reais da empresa */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/20 pt-7">
                {[
                  ["+11", "anos de atuação"],
                  //["+50", "obras entregues"],
                  ["100%", "compromisso com prazos"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-3xl font-semibold tracking-tight text-red-500 sm:text-6xl">
                      {value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={alaneasmaquinas1}
                alt="Fundador da MV Construtora ao lado das máquinas da frota, em Pindaré-Mirim, Maranhão"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="h-[420px] w-full object-cover grayscale-[1%] lg:h-[700px]"
              />
            </motion.div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section
          id="diferenciais"
          className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-32"
        >
          <DiferenciaisSlideshow />
          <div className="lg:pl-12">
            <SectionTitle
              eyebrow="Por que escolher a MV"
              title="Execução confiável, sem improviso."
            />
            <p className="mt-7 max-w-lg leading-7 text-zinc-600">
              Combinamos experiência de campo, manutenção preventiva e gestão próxima para reduzir
              riscos e entregar previsibilidade.
            </p>
            <div className="mt-10 space-y-7">
              {[
                [
                  ShieldCheck,
                  "Segurança em primeiro lugar",
                  "Procedimentos, equipe treinada e operação responsável.",
                ],
                [
                  Clock3,
                  "Agilidade de mobilização",
                  "Resposta rápida para sua obra manter o ritmo planejado.",
                ],
                [
                  BadgeCheck,
                  "Transparência do início ao fim",
                  "Escopo claro, comunicação direta e acompanhamento próximo.",
                ],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof ShieldCheck;
                return (
                  <div key={title as string} className="flex gap-5 border-t border-zinc-300 pt-7">
                    <FeatureIcon className="mt-1 shrink-0 text-red-500" />
                    <div>
                      <h3 className="font-semibold">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{text as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DEPOIMENTO */}
        <section className="bg-red-600 py-24 text-white lg:py-28">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <Quote className="mx-auto mb-8" size={40} strokeWidth={1.4} />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl"
            >
              “A MV entende a urgência, mobiliza a equipe rapidamente e mantem a obra avançando sem
              surpresas.”
            </motion.blockquote>
            <p className="mt-8 text-sm font-bold uppercase tracking-[.16em]">
              ALAN ROBSON <br />
              CEO
            </p>
          </div>
        </section>

        {/* FAQ */}
        {/* ÁREA DE ATUAÇÃO */}
        <section id="area-de-atuacao" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionTitle
            eyebrow="Área de atuação"
            title="Terraplenagem e locação de máquinas em todo o Maranhão."
          />
          <p className="mt-7 max-w-2xl leading-7 text-zinc-600">
            Com base em Pindaré-Mirim, na região do Vale do Pindaré, a MV Construtora mobiliza
            máquinas, equipamentos e equipes para obras urbanas, rurais, industriais e comerciais em
            todo o estado do Maranhão — para clientes públicos e privados.
          </p>
          <ul className="mt-9 flex flex-wrap gap-2">
            {CIDADES_ATENDIDAS.map((cidade) => (
              <li
                key={cidade}
                className="rounded-full border border-zinc-300 bg-white/60 px-4 py-2 text-sm text-zinc-700"
              >
                Terraplenagem em {cidade} - MA
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm text-zinc-500">
            Não encontrou sua cidade? Atendemos todo o Maranhão —{" "}
            <a
              href="#contato"
              className="font-semibold text-zinc-950 underline decoration-red-600 underline-offset-4"
            >
              consulte a mobilização para a sua obra
            </a>
            .
          </p>
        </section>

        <section id="faq" className="border-y border-zinc-300 bg-white/20 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionTitle
                eyebrow="Dúvidas frequentes"
                title="Informação clara antes de começar."
              />
              <p className="mt-7 text-zinc-600">
                Ainda tem dúvidas?{" "}
                <a
                  href="#contato"
                  className="font-semibold text-zinc-950 underline decoration-red-600 underline-offset-4"
                >
                  Fale com nosso time e tire suas dúvidas.
                </a>
              </p>
            </div>
            <div className="border-t border-zinc-300">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-zinc-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold"
                    aria-expanded={openFaq === i}
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-red-500" : ""}`}
                      size={20}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pr-10 leading-7 text-zinc-600">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAPA & ENDEREÇO */}
        <section id="localizacao" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionTitle eyebrow="Onde estamos" title="Visite nossa base ou fale conosco." />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative overflow-hidden rounded-sm border border-zinc-300 shadow-sm">
              <iframe
                title="Mapa da MV Construtora"
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full lg:h-[520px]"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 bg-zinc-950 p-8 text-white sm:p-10">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-red-400">
                  Endereço
                </p>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-red-500" size={22} />
                  <p className="text-lg leading-7">{EMPRESA.endereco}</p>
                </div>
                <div className="mt-8 space-y-4 border-t border-white/10 pt-8 text-sm text-white/70">
                  <a
                    href={telLink}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone size={16} className="text-red-400" /> {EMPRESA.whatsappExibicao}
                  </a>
                  <p className="flex items-center gap-3">
                    <Clock3 size={16} className="text-red-400" /> {EMPRESA.horario}
                  </p>
                </div>
              </div>
              <CTAButton href={MAPS_OPEN_URL} target="_blank" rel="noreferrer" className="w-full">
                Abrir no Google Maps
              </CTAButton>
            </div>
          </div>
        </section>

        {/* CONTATO — formulário validado */}
        <section
          id="contato"
          className="relative overflow-hidden bg-zinc-950 py-24 text-white lg:py-32"
        >
          <motion.div
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-600/15 blur-[90px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[.24em] text-red-400">
                Vamos tirar seu projeto do papel
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">
                Sua obra precisa avançar rápido? Solicite um orçamento conosco.
              </h2>
              <p className="mt-6 max-w-md text-white/60">
                Preencha o formulário e nossa equipe entrará em contato com você o mais rápido
                possível. Ou se preferir, clique no botão abaixo para falar diretamente conosco pelo
                WhatsApp.
              </p>
              <div className="mt-8 inline-block">
                <CTAButton
                  href={waLink(
                    "Olá! Gostaria de solicitar um orçamento à MV Construtora e saber mais sobre os serviços.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Prefiro chamar no WhatsApp
                </CTAButton>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5 bg-white p-6 text-zinc-950 sm:p-8"
            >
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-zinc-600"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  {...register("nome")}
                  aria-invalid={!!errors.nome}
                  className={`w-full border-b-2 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-zinc-400 ${errors.nome ? "border-red-500" : "border-zinc-300 focus:border-red-500"}`}
                  placeholder="Seu nome completo"
                />
                {errors.nome && (
                  <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                    {errors.nome.message}
                  </p>
                )}
              </div>
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-zinc-600"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  className={`w-full border-b-2 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-zinc-400 ${
                    errors.email ? "border-red-500" : "border-zinc-300 focus:border-red-500"
                  }`}
                  placeholder="seuemail@exemplo.com"
                />

                {errors.email && (
                  <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* TELEFONE */}
              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-zinc-600"
                >
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  {...register("telefone")}
                  aria-invalid={!!errors.telefone}
                  className={`w-full border-b-2 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-zinc-400 ${errors.telefone ? "border-red-500" : "border-zinc-300 focus:border-red-500"}`}
                  placeholder="(11) 99999-8888"
                />
                {errors.telefone && (
                  <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                    {errors.telefone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-xs font-bold uppercase tracking-[.18em] text-zinc-600"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  {...register("mensagem")}
                  aria-invalid={!!errors.mensagem}
                  className={`w-full resize-none border-2 bg-transparent p-3 text-base outline-none transition-colors placeholder:text-zinc-400 ${errors.mensagem ? "border-red-500" : "border-zinc-200 focus:border-red-500"}`}
                  placeholder="Conte sobre sua obra: local, prazos, máquinas ou serviços necessários."
                />
                {errors.mensagem && (
                  <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                    {errors.mensagem.message}
                  </p>
                )}
              </div>
              <CTAButton type="submit" disabled={isSubmitting} className="w-full">
                Enviar solicitação
              </CTAButton>
              {sent && (
                <p className="text-center text-sm font-semibold text-green-600">
                  Seu orçamento foi enviado com sucesso!! Entraremos em contato em breve por
                  WhatsApp ou e-mail, aguarde!
                </p>
              )}
              <p className="text-center text-[11px] text-zinc-500">
                Ao enviar, pedimos que aguarde nosso retorno. <br /> Não compartilhamos seus dados
                com terceiros e respeitamos sua privacidade.
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
