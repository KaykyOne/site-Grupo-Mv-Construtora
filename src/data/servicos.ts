// Fonte única das categorias de serviço da MV Construtora.
// Usada pela home, pelo JSON-LD (src/lib/schema.ts) e, futuramente, pelas
// páginas individuais de serviço. Alterar aqui reflete em todos os lugares.
//
// Conteúdo fornecido pelo cliente em 02/09/2026.

import {
  ArrowUpFromLine,
  Building2,
  Droplets,
  Factory,
  HardHat,
  Layers,
  Mountain,
  Sprout,
  Trees,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Servico = {
  slug: string;
  nome: string;
  /** Título da futura página dedicada (task 08). */
  h1: string;
  /** Texto curto usado no card da home. */
  resumo: string;
  /** Descrição completa, usada no JSON-LD e na abertura da página. */
  descricao: string;
  itens: string[];
  icon: LucideIcon;
  /**
   * Abertura da página do serviço. São as 2-3 primeiras frases — o trecho que
   * os sistemas de IA mais citam. Precisa ser específico deste serviço:
   * texto igual entre páginas gera canibalização e nenhuma ranqueia bem.
   */
  intro: string;
  /** Perguntas específicas deste serviço. Alimentam o FAQPage da página. */
  faqs: [string, string][];
};

export const SERVICOS: Servico[] = [
  {
    slug: "terraplanagem",
    nome: "Terraplenagem",
    h1: "Terraplenagem no Maranhão",
    resumo:
      "Escavação, corte e aterro, nivelamento, compactação de solo e pavimentação com precisão técnica.",
    descricao:
      "Escavação, corte e aterro, nivelamento, compactação de solo, regularização de terrenos, movimentação de terra, conformação de plataformas, pavimentação e preparação de áreas para construção.",
    itens: [
      "Escavação",
      "Corte e aterro",
      "Nivelamento",
      "Compactação de solo",
      "Regularização de terrenos",
      "Movimentação de terra",
      "Conformação de plataformas",
      "Pavimentação",
      "Preparação de áreas para construção",
    ],
    intro:
      "Terraplenagem é o conjunto de serviços que transforma um terreno bruto em uma base pronta para construir: escavação, corte e aterro, nivelamento e compactação do solo. A MV Construtora executa esse trabalho no Maranhão desde 2011, com frota própria de escavadeiras, motoniveladoras e rolos compactadores. Atendemos desde o preparo de lotes urbanos até plataformas industriais e grandes movimentações de terra.",
    faqs: [
      [
        "Quanto custa a terraplenagem por hora no Maranhão?",
        "O valor não é fechado por tabela: depende do tipo de solo, do volume de terra em metros cúbicos, da distância de mobilização das máquinas, do prazo e da época do ano. Solo rochoso e período chuvoso encarecem a operação. Fazemos a visita técnica e enviamos o orçamento com o escopo detalhado.",
      ],
      [
        "Qual a diferença entre corte e aterro?",
        "Corte é a retirada de material das partes altas do terreno; aterro é o preenchimento das partes baixas com esse mesmo material ou com material importado. O ideal é equilibrar os dois no mesmo terreno para reduzir transporte e custo — é o que chamamos de compensação de volumes.",
      ],
      [
        "Preciso de licença ambiental para fazer terraplenagem?",
        "Depende do porte e do local da obra. Movimentações de terra maiores, supressão de vegetação ou intervenção em área de preservação costumam exigir licenciamento junto ao órgão ambiental do município ou do estado. Orientamos sobre a documentação necessária antes de mobilizar as máquinas.",
      ],
    ],
    icon: Mountain,
  },
  {
    slug: "infraestrutura-viaria",
    nome: "Infraestrutura viária",
    h1: "Estradas Vicinais e Infraestrutura Viária no Maranhão",
    resumo:
      "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento e compactação.",
    descricao:
      "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento, compactação, abertura de acessos e preparação de subleito, base e sub-base.",
    itens: [
      "Abertura de estradas vicinais",
      "Recuperação de estradas vicinais",
      "Patrolamento",
      "Cascalhamento",
      "Compactação",
      "Abertura de acessos",
      "Preparação de subleito",
      "Base e sub-base",
    ],
    intro:
      "Infraestrutura viária é a abertura, a recuperação e a manutenção de estradas — no Maranhão, principalmente estradas vicinais que ligam povoados, áreas produtivas e rodovias estaduais. O trabalho envolve patrolamento, cascalhamento, compactação e preparo de subleito, base e sub-base. A MV Construtora atende prefeituras, produtores rurais e empreendimentos privados em todo o estado.",
    faqs: [
      [
        "O que é patrolamento?",
        "Patrolamento é a regularização da superfície da estrada com motoniveladora (patrol). A máquina corta as irregularidades, remove buracos e atoleiros e dá caimento à pista para a água escoar. É o serviço mais comum na manutenção de estradas vicinais.",
      ],
      [
        "O que é cascalhamento e quando ele é necessário?",
        "Cascalhamento é a aplicação de uma camada de cascalho ou material granular sobre a pista, seguida de compactação. É necessário quando o solo natural não suporta o tráfego — típico de trechos que viram atoleiro no período chuvoso do Maranhão.",
      ],
      [
        "Quanto tempo leva para recuperar 1 km de estrada vicinal?",
        "Varia com o estado da via, a largura da pista, a necessidade de cascalho e a distância da jazida. Um trecho que precise apenas de patrolamento avança rápido; um que exija cascalhamento e compactação leva mais tempo. A visita técnica define o cronograma.",
      ],
    ],
    icon: Layers,
  },
  {
    slug: "obras-civis",
    nome: "Obras civis",
    h1: "Obras Civis: Construção e Reforma no Maranhão",
    resumo:
      "Construção e reforma de edificações, galpões, fundações, pisos, pavimentações e muros.",
    descricao:
      "Construção e reforma de edificações, galpões, estruturas comerciais e industriais, fundações, pisos e pavimentações, muros, calçadas e serviços complementares.",
    itens: [
      "Construção e reforma de edificações",
      "Galpões",
      "Estruturas comerciais e industriais",
      "Fundações",
      "Pisos e pavimentações",
      "Muros e calçadas",
      "Serviços complementares",
    ],
    intro:
      "Obras civis reúnem a construção e a reforma de edificações, galpões e estruturas comerciais e industriais, incluindo fundações, pisos, pavimentações, muros e calçadas. A MV Construtora começou justamente na construção civil, em 2011, antes de se especializar em terraplenagem e infraestrutura. Essa origem permite entregar a obra do movimento de terra à estrutura acabada, com um único responsável.",
    faqs: [
      [
        "A MV Construtora faz a obra do início ao fim?",
        "Sim. Como executamos terraplenagem, drenagem e obras civis, conseguimos assumir desde a preparação do terreno até a entrega da edificação, sem repassar etapas a terceiros — o que reduz o risco de atraso na transição entre fases.",
      ],
      [
        "Vocês constroem galpões industriais?",
        "Sim. Executamos galpões e estruturas comerciais e industriais, incluindo a fundação, o piso industrial e as pavimentações de pátio e acesso.",
      ],
      [
        "A empresa também faz reformas?",
        "Sim. Além de obras novas, executamos reformas de edificações, incluindo serviços complementares como muros, calçadas e recuperação de pisos.",
      ],
    ],
    icon: Building2,
  },
  {
    slug: "drenagem",
    nome: "Drenagem e infraestrutura",
    h1: "Drenagem Pluvial e Infraestrutura no Maranhão",
    resumo:
      "Valas, drenagem pluvial, tubos e bueiros, canais e preparação para redes de água e esgoto.",
    descricao:
      "Execução de valas, drenagem pluvial, instalação de tubos e bueiros, canais, caixas de drenagem e preparação para redes de água e esgoto.",
    itens: [
      "Execução de valas",
      "Drenagem pluvial",
      "Instalação de tubos e bueiros",
      "Canais",
      "Caixas de drenagem",
      "Preparação para redes de água e esgoto",
    ],
    intro:
      "Drenagem é o que garante que a obra sobreviva ao período chuvoso. O serviço envolve a execução de valas, a instalação de tubos e bueiros, a construção de canais e caixas de drenagem e o preparo para redes de água e esgoto. No Maranhão, onde a estação chuvosa é intensa e concentrada, drenagem malfeita é a causa mais comum de estrada perdida e de terreno erodido.",
    faqs: [
      [
        "Por que a drenagem é tão importante em obras no Maranhão?",
        "Porque a estação chuvosa é intensa e concentrada. Sem drenagem adequada, a água satura o solo, desfaz a compactação, provoca erosão e destrói em uma temporada o que a terraplenagem levou meses para construir.",
      ],
      [
        "Qual a diferença entre bueiro e caixa de drenagem?",
        "O bueiro é a tubulação que atravessa a pista para levar a água de um lado ao outro. A caixa de drenagem é a estrutura que capta, acumula e direciona a água até a tubulação. Os dois normalmente trabalham juntos no mesmo sistema.",
      ],
      [
        "Vocês fazem a preparação para redes de água e esgoto?",
        "Sim. Executamos as valas e o berço para assentamento das redes, além do reaterro e da compactação após a instalação.",
      ],
    ],
    icon: Droplets,
  },
  {
    slug: "limpeza-de-areas",
    nome: "Preparação e limpeza de áreas",
    h1: "Limpeza e Preparação de Terrenos no Maranhão",
    resumo:
      "Limpeza mecanizada, destocamento, demolições e remoção de material com carga e transporte.",
    descricao:
      "Limpeza mecanizada de terrenos, destocamento, remoção de material, demolições, carga e transporte de resíduos e preparação de áreas para implantação de empreendimentos.",
    itens: [
      "Limpeza mecanizada de terrenos",
      "Destocamento",
      "Remoção de material",
      "Demolições",
      "Carga e transporte de resíduos",
      "Preparação de áreas para empreendimentos",
    ],
    intro:
      "Preparação e limpeza de áreas é a primeira etapa de qualquer empreendimento: retirar vegetação, tocos, entulho e construções existentes para liberar o terreno. Inclui limpeza mecanizada, destocamento, demolições e a carga e o transporte dos resíduos. A MV Construtora executa esse serviço com escavadeiras, pás carregadeiras e caminhões basculantes próprios.",
    faqs: [
      [
        "O que é destocamento?",
        "Destocamento é a remoção das raízes e dos tocos que ficam no solo após o corte da vegetação. É indispensável antes da terraplenagem: raiz enterrada apodrece, gera vazio no aterro e provoca recalque na estrutura construída acima.",
      ],
      [
        "Vocês fazem a retirada do material removido?",
        "Sim. Fazemos a carga e o transporte dos resíduos com caminhões basculantes até o destino definido, incluindo entulho de demolição e material vegetal.",
      ],
      [
        "A empresa executa demolições?",
        "Sim. Executamos demolições de estruturas com escavadeira, além da remoção e do transporte do entulho gerado.",
      ],
    ],
    icon: Trees,
  },
  {
    slug: "locacao-de-maquinas",
    nome: "Locação de máquinas e equipamentos",
    h1: "Locação de Máquinas Pesadas no Maranhão",
    resumo:
      "Escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhões, com ou sem operador.",
    descricao:
      "Escavadeiras hidráulicas, motoniveladoras (patrol), pás carregadeiras, rolos compactadores, caminhões-pipa, caminhões basculantes e demais equipamentos pesados, com ou sem operador, conforme a contratação.",
    itens: [
      "Escavadeiras hidráulicas",
      "Motoniveladoras (patrol)",
      "Pás carregadeiras",
      "Rolos compactadores",
      "Caminhões-pipa",
      "Caminhões basculantes e caçambas",
      "Com ou sem operador",
    ],
    intro:
      "A MV Construtora aluga máquinas pesadas com frota própria e revisada: escavadeiras hidráulicas, motoniveladoras (patrol), pás carregadeiras, rolos compactadores, caminhões-pipa e caminhões basculantes. A locação pode ser com ou sem operador, conforme a contratação. Como a frota é própria, a mobilização é mais rápida e a manutenção não depende de terceiros.",
    faqs: [
      [
        "A locação inclui operador?",
        "Pode incluir ou não — os dois formatos existem. Disponibilizamos operadores experientes e treinados, e também avaliamos locações sem operador, conforme o equipamento e as condições do contrato.",
      ],
      [
        "Locação com ou sem operador: o que compensa?",
        "Com operador costuma compensar para quem não tem equipe própria qualificada: o rendimento por hora é maior e o risco de dano ao equipamento e de acidente é menor. Sem operador faz sentido para construtoras que já mantêm operadores no quadro.",
      ],
      [
        "Qual o prazo mínimo de locação?",
        "Trabalhamos com diárias, semanas e contratos mensais, conforme a necessidade da obra. O prazo influencia diretamente o valor da hora e o custo de mobilização.",
      ],
    ],
    icon: HardHat,
  },
  {
    slug: "transporte-de-maquinas",
    nome: "Transporte de máquinas e equipamentos",
    h1: "Transporte de Máquinas Pesadas com Caminhão Prancha",
    resumo: "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas.",
    descricao:
      "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas e apoio logístico para obras.",
    itens: [
      "Transporte com caminhão prancha",
      "Mobilização de máquinas",
      "Desmobilização de máquinas",
      "Apoio logístico",
    ],
    intro:
      "Máquina pesada não se desloca sozinha até a obra: precisa de caminhão prancha, planejamento de rota e equipe para carga e descarga. A MV Construtora executa a mobilização e a desmobilização de equipamentos pesados no Maranhão, com prancha própria. O serviço atende tanto as nossas obras quanto empresas que precisam movimentar máquinas entre canteiros.",
    faqs: [
      [
        "Vocês transportam máquinas de terceiros?",
        "Sim. O transporte com caminhão prancha é oferecido também para empresas e produtores que precisam deslocar equipamentos próprios entre obras ou propriedades.",
      ],
      [
        "O que é mobilização e desmobilização?",
        "Mobilização é levar as máquinas, os equipamentos e a equipe até o canteiro no início da obra. Desmobilização é o retorno ao fim do serviço. Os dois entram no orçamento e variam com a distância.",
      ],
      [
        "A distância influencia muito no custo?",
        "Sim. O transporte de máquina pesada é um dos itens que mais pesa em obras distantes da base. Por isso a localização em Pindaré-Mirim é vantajosa para obras no Vale do Pindaré e na região central do estado.",
      ],
    ],
    icon: Truck,
  },
  {
    slug: "caminhao-munck",
    nome: "Serviços com caminhão Munck",
    h1: "Caminhão Munck no Maranhão: Içamento e Movimentação",
    resumo: "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais.",
    descricao:
      "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais com caminhão Munck.",
    itens: [
      "Içamento",
      "Movimentação de cargas",
      "Carga e descarga",
      "Transporte de equipamentos e materiais",
    ],
    intro:
      "O caminhão Munck é o equipamento certo quando a carga é pesada demais para movimentação manual e a obra não comporta um guindaste. Executamos içamento, movimentação, carga, descarga e transporte de equipamentos e materiais. É um serviço muito usado em montagem industrial, instalação de estruturas metálicas, postes, caixas de água e peças pré-moldadas.",
    faqs: [
      [
        "O que o caminhão Munck consegue içar?",
        "Estruturas metálicas, peças pré-moldadas, postes, caixas de água, equipamentos industriais e materiais de construção em geral. A capacidade exata depende do peso da carga e da distância do ponto de içamento — a lança perde capacidade conforme se estende.",
      ],
      [
        "Qual a diferença entre Munck e guindaste?",
        "O Munck é uma grua montada sobre o chassi de um caminhão: transporta e iça a própria carga, é mais ágil e cabe em espaços menores. O guindaste tem capacidade muito maior, mas exige mais espaço, montagem e custo.",
      ],
      [
        "O serviço inclui o transporte da carga?",
        "Sim. O Munck iça, transporta e descarrega no destino, o que evita contratar separadamente um caminhão e um equipamento de içamento.",
      ],
    ],
    icon: ArrowUpFromLine,
  },
  {
    slug: "apoio-a-grandes-obras",
    nome: "Apoio e gestão de grandes obras",
    h1: "Apoio e Gestão de Grandes Obras no Maranhão",
    resumo:
      "Máquinas, equipes e gestão de obra para empreendimentos industriais, rodovias e loteamentos.",
    descricao:
      "Fornecimento de máquinas, equipamentos e mão de obra operacional para obras industriais, loteamentos, terminais, rodovias e empreendimentos públicos e privados, incluindo planejamento e administração da obra com controle de custos, qualidade e cronograma.",
    itens: [
      "Obras industriais",
      "Loteamentos",
      "Terminais",
      "Rodovias",
      "Empreendimentos públicos e privados",
      "Mão de obra operacional",
      "Gestão e administração de obras",
      "Planejamento e controle de cronograma",
    ],
    intro:
      "Grandes obras — terminais, rodovias, loteamentos e plantas industriais — precisam de frota, equipe e gestão que acompanhem o ritmo do cronograma. A MV Construtora fornece máquinas, equipamentos e mão de obra operacional para empreendimentos públicos e privados, e também assume o planejamento e a administração da obra, com controle de custos, qualidade e prazo.",
    faqs: [
      [
        "A MV Construtora faz a gestão completa da obra?",
        "Sim. Assumimos planejamento, equipes, equipamentos, acompanhamento técnico e controle de custos, qualidade e cronograma, conforme a necessidade do projeto.",
      ],
      [
        "Vocês atendem obras públicas?",
        "Sim. Atendemos empreendimentos públicos e privados, incluindo obras de infraestrutura contratadas por prefeituras e órgãos estaduais.",
      ],
      [
        "É possível contratar só a mão de obra operacional?",
        "Sim. O fornecimento pode ser de máquinas, de equipes operacionais ou dos dois em conjunto, conforme o que a obra já tem disponível.",
      ],
    ],
    icon: Factory,
  },
  {
    slug: "servicos-rurais",
    nome: "Serviços para propriedades rurais",
    h1: "Serviços de Terraplenagem para Propriedades Rurais no Maranhão",
    resumo:
      "Estradas internas, açudes e reservatórios, limpeza, nivelamento e preparo de terrenos.",
    descricao:
      "Abertura e recuperação de estradas internas, construção de açudes e reservatórios, limpeza e nivelamento de áreas, abertura de valas e preparação de terrenos para produção.",
    itens: [
      "Estradas internas",
      "Construção de açudes",
      "Reservatórios",
      "Limpeza e nivelamento de áreas",
      "Abertura de valas",
      "Preparação de terrenos para plantio",
    ],
    intro:
      "A produção rural depende de infraestrutura: estrada interna que não atola, açude que segura água na estiagem e terreno nivelado para o plantio. A MV Construtora atende propriedades rurais no Maranhão com abertura e recuperação de estradas internas, construção de açudes e reservatórios, limpeza e nivelamento de áreas e abertura de valas. É um serviço executado com a mesma frota das obras de infraestrutura.",
    faqs: [
      [
        "Quanto custa construir um açude?",
        "Depende do volume de água a armazenar, do tipo de solo, da topografia e da distância da propriedade. O custo é calculado principalmente pelo volume de terra movimentado. A visita técnica define o dimensionamento e o orçamento.",
      ],
      [
        "Vocês preparam o solo para plantio?",
        "Sim. Executamos limpeza, destocamento, nivelamento e regularização de áreas para plantio e para implantação de empreendimentos agrícolas.",
      ],
      [
        "É possível recuperar estradas internas da fazenda?",
        "Sim. Fazemos abertura e recuperação de estradas internas, com patrolamento, cascalhamento e drenagem — o que mantém o acesso da propriedade utilizável também no período chuvoso.",
      ],
    ],
    icon: Sprout,
  },
];

// Faixa de destaque exibida logo abaixo do hero.
// Texto denso em palavra-chave, aparece cedo no HTML.
//
// "Pavimentação" aparece aqui como palavra-chave de busca, mas não é categoria
// autônoma: o cliente confirmou (02/09/2026) que faz parte da terraplanagem.
// "Gestão de obras" também não é categoria própria — foi absorvida por
// "Apoio e gestão de grandes obras", conforme confirmação do cliente.
export const DESTAQUES = [
  "Terraplenagem",
  "Obras Civis",
  "Infraestrutura",
  "Pavimentação",
  "Drenagem",
  "Locação de Máquinas Pesadas",
  "Transporte de Equipamentos",
  "Serviços com Munck",
  "Estradas Vicinais",
  "Movimentação de Terra",
];

// ATENÇÃO: lista pendente de confirmação com o cliente.
// Só devem constar cidades onde a empresa realmente mobiliza equipe e máquinas.
// Listar cidade não atendida gera lead ruim e prejudica a reputação local.
export const CIDADES_ATENDIDAS = [
  "Pindaré-Mirim",
  "Santa Inês",
  "Bacabal",
  "Zé Doca",
  "Santa Luzia",
  "Monção",
  "Tufilândia",
  "Alto Alegre do Pindaré",
  "Bom Jardim",
  "Açailândia",
  "Imperatriz",
  "São Luís",
];
