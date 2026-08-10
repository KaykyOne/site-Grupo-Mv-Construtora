import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  HardHat,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Quote,
  ShieldCheck,
  Truck,
  X,
  ZoomIn,
  TrafficCone,
  Construction,
} from "lucide-react";
import patrol from "@/assets/patrol.png";
import caminhao from "@/assets/caminhao.png";
import caminhaotraseira from "@/assets/caminhaotraseira.png";
import pacarregadeira from "@/assets/pacarregadeira.png";
import escavadeira1 from "@/assets/escavadeira1.png";
import escavadeira2 from "@/assets/escavadeira2.png";
import escavadeira3 from "@/assets/escavadeira3.png";
import tresescavadeiras1 from "@/assets/tresescavadeiras1.png";
import diferenciais from "@/assets/diferenciais.png";
import caminhaopipa from "@/assets/caminhaopipa.png";
import logomv from "@/assets/logomv.png";
import logomvbanner from "@/assets/logomvbanner.png";
import rolocompactador from "@/assets/rolocompactador.png";
import fotodaobra from "@/assets/fotodaobra.png";
import operadoreseterceiros from "@/assets/operadoreseterceiros.png";
import fotodasplacas from "@/assets/fotodasplacas.png";
import fotodaplacaalan from "@/assets/fotodaplacaalan.png";
import fotoalanetalita from "@/assets/fotoalanetalita.png";
import eventoinauguracao from "@/assets/eventoinauguracao.png";
import fotodaplacatigd from "@/assets/fotodaplacatigd.png";
import andamentodaobra from "@/assets/andamentodaobra.png";
import colaboradores from "@/assets/colaboradores.png";
import alanemaquinas from "@/assets/alaneasmaquinas.png";
import alaneasmaquinas1 from "@/assets/alaneasmaquinas1.png";
import caminhaopipa1 from "@/assets/caminhaopipa1.png";
import caminhaoprancha from "@/assets/caminhaoprancha.png";
import colaboradores1 from "@/assets/colaboradores1.png";
import fotodapatrol from "@/assets/fotodapatrol.png";
import fotodas3escavadeiras from "@/assets/fotodas3escavadeiras.png";
import fotodosmaquinarios from "@/assets/fotodosmaquinarios.png";
import placapedrafundamental from "@/assets/placapedrafundamental.png";

// --- Company constants (edite aqui para atualizar contato/endereço) ---
const WHATSAPP_NUMBER = "5598992368928"; // DDI+DDD+numero, sem símbolos
const CNPJ_NUMBER = "14.299.029/0001-20";
const WHATSAPP_DISPLAY = "(98) 99236-8928";
const COMPANY_ADDRESS = "Próximo ao Condomínio OASIS - Pitombeira, Pindaré-Mirim/MA-320, 65370-000";
const COMPANY_EMAIL = "grupomvconstrutora@gmail.com.br";
const MAPS_QUERY = encodeURIComponent("MV Construtora " + COMPANY_ADDRESS);
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`;
const MAPS_OPEN_URL = "https://maps.app.goo.gl/6hsdYDJWft6A9H6G6";
const waLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "MV Construtora | Terraplanagem, locação de máquinas e gestão de obras",
      },
      {
        name: "description",
        content:
          "MV Construtora: terraplanagem, locação de máquinas pesadas e gestão de obras com segurança, pontualidade e resultado no canteiro.",
      },
      {
        property: "og:title",
        content: "MV Construtora | Força para executar. Precisão para entregar.",
      },
      {
        property: "og:description",
        content:
          "Terraplanagem, locação de máquinas pesadas e gestão de obras com segurança e pontualidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    number: "01",
    icon: Truck,
    title: "Terraplanagem",
    text: "Preparação completa do terreno, cortes, aterros e nivelamento com precisão técnica.",
  },
  {
    number: "02",
    icon: Truck,
    title: "Transportes",
    text: "Logística de cargas pesadas com veículos revisados e disponibilidade ágil para sua obra.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Locação de máquinas",
    text: "Máquinas pesadas revisadas, com operador qualificado e disponibilidade ágil para sua obra.",
  },
  {
    number: "04",
    icon: TrafficCone,
    title: "Estradas Vicinais",
    text: "Abertura e manutenção de estradas vicinais, com máquinas revisadas e equipe experiente.",
  },
  {
    number: "05",
    icon: Construction,
    title: "Gestão de obras",
    text: "Planejamento e administração para manter custos, qualidade e cronograma sob controle.",
  },
];

// --- Frota (galeria com categorias) ---
type FrotaCategoria = "Escavação" | "Carregamento" | "Transporte" | "Nivelamento" | "Compactação";
type FrotaItem = { nome: string; categoria: FrotaCategoria; imgs: string[]; desc: string };

const frotaItens: FrotaItem[] = [
  {
    nome: "Escavadeira",
    categoria: "Escavação",
    imgs: [escavadeira1, escavadeira2, escavadeira3, fotodas3escavadeiras, tresescavadeiras1],
    desc: "Versátil para valas, remoção de terra e serviços urbanos.",
  },
  {
    nome: "Pá-carregadeira",
    categoria: "Carregamento",
    imgs: [pacarregadeira],
    desc: "Carregamento ágil de agregados e movimentação de grandes volumes.",
  },
  {
    nome: "Caminhão Prancha",
    categoria: "Transporte",
    imgs: [caminhao, caminhaotraseira, caminhaoprancha],
    desc: "Transporte seguro de máquinas pesadas e equipamentos de grande porte para obras.",
  },
  {
    nome: "Caminhão Pipa",
    categoria: "Transporte",
    imgs: [caminhaopipa, caminhaopipa1],
    desc: "Transporte eficiente de materiais e equipamentos para obras em áreas de difícil acesso.",
  },
  {
    nome: "Motoniveladora",
    categoria: "Nivelamento",
    imgs: [patrol, fotodapatrol],
    desc: "Nivelamento preciso de terrenos, vias e plataformas.",
  },
  {
    nome: "Rolo compactador",
    categoria: "Compactação",
    imgs: [rolocompactador],
    desc: "Compactação uniforme para bases, pavimentação e aterros técnicos.",
  },
];
const categorias: ("Todos" | FrotaCategoria)[] = [
  "Todos",
  "Escavação",
  "Carregamento",
  "Transporte",
  "Nivelamento",
  "Compactação",
];

// --- Slide de fotos (logo após o Hero) ---
// Este array não tem limite de quantidade: para adicionar uma nova foto, basta
// 1) importar a imagem lá em cima (import minhaFoto from "@/assets/minhafoto.png")
// 2) adicionar uma nova linha aqui embaixo no formato { src: minhaFoto, alt: "Descrição da foto" }
const slideshowImages: { src: string; alt: string }[] = [
  { src: colaboradores, alt: "Equipe da MV Construtora em obra" },
  { src: operadoreseterceiros, alt: "Gestores, Operadores e Terceiros" },
  { src: placapedrafundamental, alt: "Placa Pedra Fundamental" },
  { src: colaboradores1, alt: "Colaboradores da MV" },
  { src: fotodaplacatigd, alt: "Placa Terminal Intermodal Gonçalves Dias" },
  { src: eventoinauguracao, alt: "Evento de Inauguração" },
  { src: andamentodaobra, alt: "Andamento da obra" },
  { src: fotodaobra, alt: "Foto da obra em execução" },
  { src: fotodosmaquinarios, alt: "Maquinários da MV Construtora" },
  { src: fotodas3escavadeiras, alt: "Escavadeiras da frota MV" },
];

// --- Imagens da seção "Por que escolher a MV" (também em slide, sem limite) ---
// Mesma lógica do array acima: importe a foto no topo do arquivo e adicione
// uma nova linha aqui para ela entrar no slide.
const diferenciaisImages: { src: string; alt: string }[] = [
  { src: diferenciais, alt: "Equipe da MV Construtora em obra" },
  { src: fotodaplacaalan, alt: "Placa da MV Construtora" },
  { src: fotoalanetalita, alt: "Placas de identificação da obra" },
  { src: colaboradores1, alt: "Motoniveladora em operação" },
  { src: colaboradores, alt: "Caminhão pipa em operação" },
];

const faqs: [string, string][] = [
  [
    "Quais regiões a MV Construtora atende?",
    "Atendemos obras urbanas, rurais, industriais e comerciais. Fale com nossa equipe para confirmar a mobilização até a sua região.",
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
    "A empresa faz a gestão completa da obra?",
    "Sim. Assumimos planejamento, equipes, equipamentos, acompanhamento técnico e controle de execução conforme a necessidade do projeto.",
  ],
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: "easeOut" as const } },
};

// --- Validação do formulário ---
const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(100, "Nome muito longo"),
  telefone: z
    .string()
    .trim()
    .min(10, "Telefone com DDD (mín. 10 dígitos)")
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]+$/, "Use apenas números e ( ) + -"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Descreva sua necessidade (mín. 10 caracteres)")
    .max(1000, "Mensagem muito longa"),
});
type ContactForm = z.infer<typeof contactSchema>;

function SectionTitle({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-3xl"
    >
      <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-red-600">
        <span className="h-px w-8 bg-red-600" /> {eyebrow}
      </p>
      <h2
        className={`text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-zinc-950"}`}
      >
        {title}
      </h2>
    </motion.div>
  );
}

type CTAButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  className?: string;
};

function CTAButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  className = "",
}: CTAButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[0.4em] border-[3px] border-black bg-red-600 px-[1.3em] py-[0.6em] font-black text-white shadow-[0.1em_0.1em_0px_#000] transition-all duration-150 hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] hover:shadow-[0.15em_0.15em_0px_#000] active:translate-x-[0.05em] active:translate-y-[0.05em] active:shadow-[0.05em_0.05em_0px_#000] disabled:cursor-not-allowed disabled:opacity-60 ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={waLink("Olá! Gostaria de solicitar um orçamento à MV Construtora.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Entrar em contato com a MV Construtora no WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-4 pr-5 font-bold text-white shadow-2xl shadow-black/30 ring-4 ring-[#25D366]/25 transition-all hover:scale-[1.03] hover:bg-[#20BA5A]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <MessageCircle size={20} strokeWidth={2.2} />
      </span>
      <span className="hidden text-sm sm:inline">Fale conosco pelo WhatsApp</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-lg -z-10" />
    </a>
  );
}

// --- Vídeos da seção logo abaixo do Hero ---
// Coloque seus arquivos .mp4 dentro de public/videos/ com esses nomes,
// ou troque os caminhos abaixo pelos nomes dos seus arquivos.
const slideshowVideos: { src: string; poster: string; alt: string }[] = [
  {
    src: "/videos/videodasmaquinas.mp4",
    poster: escavadeira1,
    alt: "Vídeo: Video apresentando as maquinas",
  },

  {
    src: "/videos/videodosmaquinarios.mp4",
    poster: escavadeira1,
    alt: "Vídeo: Video apresentando as maquinas",
  },

  {
    src: "/videos/videodasmaquinas1.mp4",
    poster: escavadeira1,
    alt: "Vídeo: Video apresentando as maquinas",
  },

  {
    src: "/videos/rolocompactadorepipa.mp4",
    poster: rolocompactador,
    alt: "Vídeo: Caminhão pipa e rolo compactador",
  },

  {
    src: "/videos/videodas3maquinas.mp4",
    poster: escavadeira1,
    alt: "Vídeo: Video apresentando as maquinas",
  },
];

function VideoSlideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % slideshowVideos.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + slideshowVideos.length) % slideshowVideos.length);
  }, []);

  // Sempre que troca de vídeo, dá play automaticamente (respeitando o estado de play/pause)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (playing) {
      videoEl.play().catch(() => {});
    }
  }, [index, playing]);

  const togglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (playing) {
      videoEl.pause();
    } else {
      videoEl.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <section id="galeria-videos" className="bg-[#f5f4f0] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Nossos Trabalhos" title="Equipamentos em ação." />
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="relative h-[260px] w-full overflow-hidden rounded-sm bg-zinc-900 sm:h-[420px] lg:h-[460px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.video
              key={index}
              ref={videoRef}
              src={slideshowVideos[index].src}
              poster={slideshowVideos[index].poster}
              aria-label={slideshowVideos[index].alt}
              autoPlay
              loop
              muted={muted}
              playsInline
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir >= 0 ? -100 : 100, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Seta esquerda */}
          <button
            onClick={prev}
            aria-label="Vídeo anterior"
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 sm:left-5 sm:h-11 sm:w-11"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Seta direita */}
          <button
            onClick={next}
            aria-label="Próximo vídeo"
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 sm:right-5 sm:h-11 sm:w-11"
          >
            <ChevronRight size={20} />
          </button>

          {/* Controles: play/pause e mudo/som */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 sm:bottom-5 sm:left-5">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              {playing ? (
                <span className="block h-3 w-3 border-l-2 border-r-2 border-white" />
              ) : (
                <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
              )}
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Ativar som" : "Silenciar vídeo"}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>

        {/* Indicadores (dots) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slideshowVideos.map((video, i) => (
            <button
              key={video.src}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Ir para vídeo ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-red-600" : "w-2 bg-zinc-400 hover:bg-zinc-500"
              }`}
            />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [ativa, setAtiva] = useState<(typeof categorias)[number]>("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const frotaFiltrada = useMemo(
    () => (ativa === "Todos" ? frotaItens : frotaItens.filter((m) => m.categoria === ativa)),
    [ativa],
  );

  const lightbox = lightboxIndex !== null ? frotaFiltrada[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Sempre que abrir um item novo no lightbox, volta pra primeira foto dele
  useEffect(() => {
    setFotoIndex(0);
  }, [lightboxIndex]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => (i === null ? null : (i + 1) % frotaFiltrada.length));
  }, [frotaFiltrada.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + frotaFiltrada.length) % frotaFiltrada.length,
    );
  }, [frotaFiltrada.length]);

  // Navegação por teclado (← → e ESC) + trava o scroll da página enquanto o lightbox está aberto
  useEffect(() => {
    if (lightboxIndex === null) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goToNext, goToPrev]);

  // Preload das imagens vizinhas (anterior e próxima) para transições instantâneas
  useEffect(() => {
    if (lightboxIndex === null || frotaFiltrada.length < 2) return;
    const nextIndex = (lightboxIndex + 1) % frotaFiltrada.length;
    const prevIndex = (lightboxIndex - 1 + frotaFiltrada.length) % frotaFiltrada.length;
    [frotaFiltrada[nextIndex].imgs[0], frotaFiltrada[prevIndex].imgs[0]].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [lightboxIndex, frotaFiltrada]);

  const onSubmit = (data: ContactForm) => {
    const msg = `Olá, sou ${data.nome}. Telefone: ${data.telefone}.\n\n${data.mensagem}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f4f0] text-zinc-950">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-0.5 origin-left bg-red-500"
        style={{ scaleX }}
      />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" aria-label="MV Construtora - início" className="flex items-center">
            <img src={logomv} alt="MV Construtora" className="h-11 w-auto sm:h-12" />
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {["Frota", "Serviços", "Sobre", "Diferenciais", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <CTAButton href="#contato">Solicitar orçamento</CTAButton>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center text-white lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-zinc-950 px-5 py-6 lg:hidden"
          >
            {["Frota", "Serviços", "Sobre", "Diferenciais", "FAQ", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-4 text-lg font-semibold text-white"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-zinc-950 pb-16 pt-19 sm:pb-20 lg:pb-4"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-1">
            <div className="relative flex min-h-[560px] items-end overflow-hidden rounded-sm bg-zinc-900 sm:min-h-[600px] lg:min-h-[680px] xl:min-h-[700px]">
              <HeroBackgroundSlideshow />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(51, 51, 255, 0.95)_0%,rgba(9,9,11,.8)_44%,rgba(9,9,11,.55)_75%),linear-gradient(0deg,rgba(9,9,11,.85)_0%,transparent_55%)]" />
              <motion.div
                className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full bg-red-600/20 blur-3xl"
                animate={{ y: [0, -25, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <div className="relative z-10 w-full px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-16">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.16 } } }}
                  className="max-w-4xl"
                >
                  <motion.div
                    variants={reveal}
                    className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-red-600"
                  >
                    <span className="h-px w-10 bg-red-600" /> Construção que move o futuro
                  </motion.div>
                  <motion.h1
                    variants={reveal}
                    className="max-w-3xl text-4xl font-semibold leading-[112%] tracking-[-0.055em] text-white sm:text-5xl lg:text-[70px]"
                  >
                    Força para executar.{" "}
                    <span className="text-white/60">Precisão para entregar.</span>
                  </motion.h1>
                  <motion.p
                    variants={reveal}
                    className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg"
                  >
                    Terraplanagem, locação de máquinas pesadas e gestão de obras com segurança,
                    produtividade, qualidade compromisso desde o primeiro movimento até à entrega.
                  </motion.p>
                  <motion.div variants={reveal} className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <CTAButton href="#contato">Solicitar orçamento</CTAButton>
                    <CTAButton href="#serviços">Conhecer soluções</CTAButton>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE DE VÍDEOS — logo após o Hero */}
        <VideoSlideshow />

        {/* GALERIA DE FROTA COM FILTROS + LIGHTBOX */}
        <section id="frota" className="bg-zinc-950 py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Galeria da frota"
                title="A máquina certa, no lugar certo, no tempo certo."
                light
              />
              <p className="max-w-md text-white/60">
                Filtre por categoria e clique em qualquer imagem para ampliar.
              </p>
            </div>

            {/* Filtros */}
            <div className="mt-10 flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const active = ativa === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setAtiva(cat)}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                      active
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-white/20 bg-white/5 text-white/75 hover:border-white/40 hover:text-white"
                    }`}
                    aria-pressed={active}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Grade */}
            <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {frotaFiltrada.map((item, index) => (
                  <motion.button
                    layout
                    key={item.nome}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => {
                      setDirection(0);
                      setLightboxIndex(index);
                    }}
                    className="group relative overflow-hidden rounded-sm bg-zinc-900 text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.imgs[0]}
                        alt={item.nome}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.imgs.length > 1 && (
                        <span className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                          +{item.imgs.length - 1} fotos
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-400">
                          {item.categoria}
                        </span>
                        <h3 className="mt-1 text-lg font-semibold">{item.nome}</h3>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition-all group-hover:bg-red-600 group-hover:border-red-600">
                        <ZoomIn size={16} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Lightbox com carrossel */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label={lightbox.nome}
              >
                {/* Botão fechar */}
                <button
                  onClick={closeLightbox}
                  aria-label="Fechar"
                  className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={20} />
                </button>

                {/* Seta esquerda */}
                {frotaFiltrada.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Imagem anterior"
                    className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Seta direita */}
                {frotaFiltrada.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Próxima imagem"
                    className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex w-full max-w-5xl flex-col items-center"
                >
                  <div className="relative flex h-[65vh] w-full items-center justify-center overflow-hidden sm:h-[70vh]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.img
                        key={`${lightboxIndex}-${fotoIndex}`}
                        src={lightbox.imgs[fotoIndex]}
                        alt={lightbox.nome}
                        custom={direction}
                        drag={frotaFiltrada.length > 1 ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={(_, info) => {
                          const swipe = info.offset.x;
                          if (swipe < -80) goToNext();
                          else if (swipe > 80) goToPrev();
                        }}
                        variants={{
                          enter: (dir: number) => ({
                            x: dir === 0 ? 0 : dir > 0 ? 80 : -80,
                            opacity: 0,
                          }),
                          center: { x: 0, opacity: 1 },
                          exit: (dir: number) => ({
                            x: dir >= 0 ? -80 : 80,
                            opacity: 0,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="max-h-full max-w-full cursor-grab touch-pan-y rounded-sm object-contain active:cursor-grabbing"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Miniaturas: trocar de foto dentro do MESMO item, sem mudar de equipamento */}
                  {lightbox.imgs.length > 1 && (
                    <div className="mt-4 flex items-center gap-2">
                      {lightbox.imgs.map((foto, i) => (
                        <button
                          key={foto}
                          onClick={() => setFotoIndex(i)}
                          aria-label={`Ver foto ${i + 1} de ${lightbox.nome}`}
                          aria-current={i === fotoIndex}
                          className={`h-14 w-14 shrink-0 overflow-hidden rounded-sm border-2 transition-all sm:h-16 sm:w-16 ${
                            i === fotoIndex
                              ? "border-red-500 opacity-100"
                              : "border-white/20 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={foto} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Indicadores de posição (dots) */}
                  {frotaFiltrada.length > 1 && (
                    <div className="mt-4 flex items-center gap-2">
                      {frotaFiltrada.map((item, i) => (
                        <button
                          key={item.nome}
                          onClick={() => {
                            setDirection(i > (lightboxIndex ?? 0) ? 1 : -1);
                            setLightboxIndex(i);
                          }}
                          aria-label={`Ir para imagem ${i + 1}: ${item.nome}`}
                          aria-current={i === lightboxIndex}
                          className={`h-2 rounded-full transition-all ${
                            i === lightboxIndex
                              ? "w-6 bg-red-500"
                              : "w-2 bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="mt-4 w-full rounded-sm bg-zinc-900 p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-400">
                      {lightbox.categoria}
                    </span>
                    <h3 className="mt-1 text-2xl font-semibold">{lightbox.nome}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">{lightbox.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SERVIÇOS */}
        <section id="serviços" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="O que fazemos"
              title="Estrutura completa para obras que não podem parar."
            />
            <p className="max-w-md leading-7 text-zinc-600">
              Um único parceiro para mobilizar máquinas, pessoas e gestão.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.13 } } }}
            className="mt-16 grid border-t border-zinc-300 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.article
                variants={reveal}
                key={service.title}
                className="group border-b border-zinc-300 py-9 lg:border-r lg:px-8 lg:first:pl-0"
              >
                <div className="mb-12 flex items-center justify-between">
                  <service.icon
                    className="text-red-500 transition-transform duration-300 group-hover:-translate-y-1"
                    size={31}
                    strokeWidth={1.6}
                  />
                  <span className="font-mono text-xs text-zinc-400">{service.number}</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-4 max-w-sm leading-7 text-zinc-600">{service.text}</p>
                <a
                  href="#contato"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-red-600"
                >
                  Ver solução <MoveUpRight size={16} />
                </a>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-zinc-950 py-24 text-white lg:py-32">
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
                alt="Obra em andamento conduzida pela MV Construtora"
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
                  <p className="text-lg leading-7">{COMPANY_ADDRESS}</p>
                </div>
                <div className="mt-8 space-y-4 border-t border-white/10 pt-8 text-sm text-white/70">
                  <p className="flex items-center gap-3">
                    <Phone size={16} className="text-red-400" /> {WHATSAPP_DISPLAY}
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock3 size={16} className="text-red-400" /> Seg a Sex · 07h às 18h
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
                Preencha e enviamos sua solicitação direto para nossa equipe pelo WhatsApp — retorno
                em até 24h.
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
                  Redirecionando para o WhatsApp… fale conosco por lá!
                </p>
              )}
              <p className="text-center text-[11px] text-zinc-500">
                Ao enviar, você abrirá uma conversa no WhatsApp com nossa equipe comercial.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-white/55">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-5 py-14 sm:px-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logomvbanner} alt="MV Construtora" className="h-25 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-6">
              Terraplanagem, locação de máquinas pesadas e administração de obras com produtividade
              e confiança.
            </p>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white">Navegação</p>
            {["Frota", "Serviços", "Sobre", "Diferenciais", "Localizacao"].map((x) => (
              <a
                key={x}
                href={`#${x.toLowerCase()}`}
                className="mb-3 block text-sm hover:text-red-400"
              >
                {x}
              </a>
            ))}
          </div>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white">Contato</p>
            <a href={`mailto:${COMPANY_EMAIL}`} className="mb-3 block text-sm hover:text-red-400">
              {COMPANY_EMAIL}
            </a>
            <a
              href={waLink("Olá! Vim pelo site.")}
              target="_blank"
              rel="noreferrer"
              className="mb-3 block text-sm hover:text-red-400"
            >
              WhatsApp: {WHATSAPP_DISPLAY}
            </a>
            <p className="mb-3 text-sm">CNPJ: {CNPJ_NUMBER}</p>
            <p className="text-sm">Seg a Sex · 08h às 18h</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} MV Construtora. Todos os direitos reservados.</p>
          <a href="#" className="hover:text-white">
            Política de privacidade
          </a>
        </div>
      </footer>

      <WhatsAppFloating />
    </div>
  );
}
