// Fonte única dos dados de contato e identidade da MV Construtora.
//
// Estes valores aparecem no header, no rodapé, na seção de localização, no
// e-mail do formulário e no JSON-LD. Antes estavam espalhados e já haviam
// divergido (o horário aparecia como 07h num lugar e 08h em outro).
//
// IMPORTANTE: nome, endereço e telefone precisam ser idênticos aos do Google
// Meu Negócio. Divergência de NAP derruba a confiança no ranking local.

export const SITE_URL = "https://www.grupomvconstrutora.com.br";

export const EMPRESA = {
  nome: "MV Construtora",
  cnpj: "14.299.029/0001-20",
  whatsapp: "5598992368928",
  whatsappExibicao: "(98) 99236-8928",
  email: "atendimento@grupomvconstrutora.com.br",
  endereco:
    "Rodovia MA-320, Pitombeira (próximo ao Condomínio OASIS) — Pindaré-Mirim - MA, CEP 65370-000",
  horario: "Seg a Sex · 07h às 18h",
  cidade: "Pindaré-Mirim",
  estado: "MA",
  fundacao: "2011-09-14",
  instagramUrl: "https://www.instagram.com/grupoconstrutoramv/",
  instagramHandle: "@grupoconstrutoramv",
} as const;

const MAPS_QUERY = encodeURIComponent(`${EMPRESA.nome} ${EMPRESA.endereco}`);
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`;
export const MAPS_OPEN_URL = "https://maps.app.goo.gl/6hsdYDJWft6A9H6G6";

export const waLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${EMPRESA.whatsapp}&text=${encodeURIComponent(text)}`;

export const telLink = `tel:+${EMPRESA.whatsapp}`;
