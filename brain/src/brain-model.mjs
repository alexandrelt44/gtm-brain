// GTM Brain model: the interpretation layer between the brand markdown and the
// front end. It reads the files as a database (entity = heading or table row,
// field = labeled bullet or sub-heading) and emits typed records grouped in
// categories, with completeness ("N de M preenchidos") and links between
// records. The viewer shows records, never files; the file only appears as
// provenance ("Origem").
import fs from 'node:fs'
import path from 'node:path'
import { parseTree, parseFields, parseTables, descendants, fullLines, renderMd, esc } from './md.mjs'
import {
  RE_PROOF_ID, issueRe, RE_SOURCE_TAG, RE_SEAL, RE_PATH_REF, RE_PLACEHOLDER, RE_PENDING, RE_TENSION, RE_INSTRUCTION,
  expandProofRanges, slugify, stripMd,
} from './extract-brand.mjs'

// ---------------------------------------------------------------- schema
// Every title, label and path below is matched in English (the original
// template headings) and in Portuguese (the GTM Brain template), so the same
// brain reads either kind of brand folder.

// Expected fields: [label shown, regex over the label found in the file].
const PERSONA_FIELDS = [
  ['Firmografia', /firmographic|firmografia/i],
  ['Demografia', /demographic|demografia|cargos/i],
  ['Psicografia', /psychographic|psicografia/i],
  ['Jobs to be done', /jobs to be done|^jtbd/i],
  ['Gatilhos e sinais', /trigger|gatilho|^sinais/i],
  ['Dores', /pain|^dores|dor\b|família de dor/i],
  ['Objeções', /objection|objeç/i],
  ['Comitê de compra', /buying committee|comitê/i],
  ['Desqualificadores', /disqualif|desqualif|anti-?fit/i],
  ['Orçamento', /budget|orçamento/i],
  ['Critérios de decisão', /decision criteria|critérios/i],
  ['Consumo de conteúdo', /content consumption|consumo/i],
  ['Onde encontrar', /where they hang out|onde (estão|encontrar)/i],
]
const OFFER_FIELDS = [
  ['Para quem', /who it is for|para quem/i],
  ['O que inclui', /what is included|o que inclui/i],
  ['Prazo', /timeline|prazo/i],
  ['Preço', /pricing|preço/i],
  ['Resultados esperados', /expected outcomes|resultados/i],
  ['Prova', /^proof|^prova/i],
  ['Por que existe', /why we built|por que (existe|criamos)/i],
  ['Como é vendida', /how this offer is sold|como (é )?vend/i],
  ['Como é entregue', /how this offer is delivered|como (é )?entreg/i],
]
// "Alternativa:" sections written as labeled bullets
const ALTERNATIVE_FIELDS = [
  ['O que é', /^o que é/i],
  ['Pontos fortes', /pontos fortes|por que é forte|strengths/i],
  ['Pontos fracos', /pontos fracos|weaknesses/i],
  ['Como ganhamos', /como ganhamos|how we win/i],
  ['Como perdemos', /como perdemos|how we lose/i],
  ['Sinal', /^sina(l|is)/i],
]
// "Concorrente:" / "Competitor:" sections written with sub-headings (the template)
const COMPETITOR_FIELDS = [
  ['Oferta', /^(oferta|offer)$/i],
  ['Preço', /^(preço|pricing)$/i],
  ['Pontos fortes', /pontos fortes|strengths/i],
  ['Pontos fracos', /pontos fracos|weaknesses/i],
  ['Mensagens públicas', /mensagens públicas|public messaging/i],
  ['Cliente típico', /cliente típico|typical customer/i],
  ['Como ganhamos', /como ganhamos|how we win/i],
  ['Como perdemos', /como perdemos|how we lose/i],
]
// "Canal:", "Teste:" and "Canal principal:" sections of 11-plano/CANAIS.md
const CHANNEL_FIELDS = [
  ['Entra como', /^(entra como|enters as)/i],
  ['Ideia', /^(ideia|idea)$/i],
  ['Custo por cliente', /custo por cliente|cost per customer|\bcac\b/i],
  ['Volume', /^volume/i],
  ['Qualidade', /^(qualidade|quality)/i],
  ['Tempo até fechar', /tempo até fechar|time to close|ciclo/i],
  ['Dono', /^(dono|owner)/i],
  ['Como medimos', /como medimos|how we measure/i],
]
const MAIN_CHANNEL_FIELDS = [
  ...CHANNEL_FIELDS.filter(([l]) => l !== 'Ideia'),
  ['Por que é o principal', /por que é o principal|why it is the main/i],
  ['Sinais de saturação', /saturação|saturation/i],
  ['Quando rever', /quando rever|when to revisit/i],
]
const TEST_FIELDS = [
  ['Hipótese', /^(hipótese|hypothesis)/i],
  ['Orçamento', /^(orçamento|budget)/i],
  ['Prazo', /^(prazo|timeline|time-?box)/i],
  ['Critério de sucesso', /critério|success criteri/i],
  ['Resultado', /^(resultado|result)/i],
  ['Decisão', /^(decisão|decision)/i],
]

// Template headings and labels in English → how the brain names them.
const LABELS = {
  'definition': 'Definição', 'do': 'Faça', 'do not': 'Não faça', 'proibido': 'Proibido',
  'quote': 'Citação', 'name': 'Nome', 'role': 'Papel', 'company': 'Empresa', 'source': 'Origem da citação',
  'date captured': 'Data', 'permission': 'Permissão', 'approved uses': 'Usos aprovados', 'contexto': 'Contexto',
  'buyer': 'Comprador', 'economic buyer': 'Decisor econômico', 'champion': 'Champion', 'end user': 'Usuário final',
  'technical evaluator': 'Avaliador técnico', 'skeptic': 'Cético', 'finance and procurement': 'Financeiro e compras',
  'legal and compliance': 'Jurídico e compliance', 'influencer': 'Influenciador',
  'positioning statement': 'Posicionamento', 'promise statements': 'Promessas', 'differentiation': 'Diferenciação',
  'proof points to include in every sales conversation': 'Provas para toda conversa de venda',
  'packaging tiers': 'Pacotes', 'pricing principles': 'Princípios de preço',
  'point-of-view statement': 'Ponto de vista', 'brand archetype': 'Arquétipo',
  'voice-of-customer snippets': 'Trechos da voz do cliente',
  'tone modulation by channel': 'Tom por canal', 'reading level target': 'Nível de leitura',
  'sentence-length rules': 'Tamanho de frase', 'punctuation rules': 'Pontuação', 'formatting rules': 'Formatação',
  'cta rules': 'CTAs', 'emoji, slang, and jargon': 'Emoji, gíria e jargão', 'banned sentence shapes': 'Formatos de frase proibidos',
  'worked example': 'Exemplo', 'banned terms': 'Termos proibidos', 'product and service naming': 'Nomes de produtos e serviços',
  'audience naming': 'Como chamar o público', 'company naming': 'Como chamar a empresa',
  'claims you can make': 'Afirmações permitidas', 'claims you cannot make': 'Afirmações proibidas',
  'required disclaimers': 'Avisos obrigatórios', 'ai-disclosure policy': 'Uso de IA declarado', 'data, privacy, and consent': 'Dados, privacidade e consentimento',
  'primary keywords': 'Palavras-chave primárias', 'secondary keywords': 'Palavras-chave secundárias', 'keyword tiers': 'Níveis de palavra-chave',
  'branded vs. non-branded': 'Marca × genérico', 'search intent mapping': 'Intenção de busca', 'serp features': 'Recursos da SERP',
  'seasonal terms': 'Termos sazonais', 'logo system': 'Logo', 'color system': 'Cores', 'typography': 'Tipografia',
  'spacing': 'Espaçamento', 'radius': 'Raios', 'shadow': 'Sombras', 'motion': 'Movimento', 'breakpoints': 'Breakpoints',
  'accessibility': 'Acessibilidade', 'dark mode': 'Modo escuro', 'cadence, by channel': 'Cadência por canal',
  'rolling 90-day plan': 'Plano de 90 dias', 'channel-by-channel detail': 'Detalhe por canal',
  'assignment and review flow': 'Fluxo de revisão', 'the plan': 'O plano', 'aggregated patterns': 'Padrões agregados',
  'deal role matrix': 'Papéis por negócio', 'why the committee matters': 'Por que o comitê importa', 'competitor map': 'Mapa competitivo',
  'claim-to-proof map': 'Afirmação → prova', 'permission tracker': 'Permissões', 'core page inventory': 'Páginas',
  'information architecture tree': 'Arquitetura de informação', 'conversion paths': 'Caminhos de conversão',
  'tracking stack': 'Stack de tracking', 'kpi tree': 'Árvore de KPIs', 'kpi definitions': 'Definições de KPI',
  'reporting cadence': 'Cadência de relatório', 'data ownership': 'Donos dos dados', 'data quality checks': 'Qualidade dos dados',
  'privacy and consent': 'Privacidade e consentimento', 'dashboards': 'Dashboards',
  'what geo and aeo are, in plain language': 'O que é GEO e AEO', 'why it matters for us': 'Por que importa',
  'entity clarity': 'Clareza de entidade', 'definition blocks': 'Blocos de definição', 'question and answer pairs': 'Perguntas e respostas',
  'citations and sources': 'Citações e fontes', 'authorship and expertise': 'Autoria', 'freshness signals': 'Sinais de atualização',
  'structured data checklist per page type': 'Dados estruturados por página', 'do and do not': 'Faça e não faça',
  'url structure rules': 'Regras de URL', 'navigation logic': 'Navegação', 'internal linking rules': 'Links internos',
  'page templates': 'Templates de página', 'link architecture rules': 'Regras de links', 'content gap analysis': 'Lacunas de conteúdo',
  'content refresh cadence': 'Cadência de atualização', 'the hub-and-spoke model': 'Modelo hub-and-spoke', 'cluster inventory': 'Inventário de clusters',
  'pillar page': 'Página pilar', 'pilar': 'Pilar', 'spokes': 'Satélites', 'dific.': 'Dificuldade', 'palavra': 'Palavra', 'keyword': 'Palavra-chave', 'uso': 'Usado em',
  'o que os dados mostram': 'O que os dados mostram',
}
// Sections every template file carries that say nothing about the brand.
const BOILERPLATE = /^(how to use this file|ai-agent-ready checklist|feeding this asset|change ?log|current as of|research log|redirects|xml sitemap|robots\.txt|ai overview|chatgpt search|gemini and google|como usar este arquivo|checklist para agentes|como passar este arquivo|histórico|registro de pesquisa|última atualização)/i
const label = (s) => LABELS[s.toLowerCase().trim()] || s.trim()

// Each file: English template path first, GTM Brain template path second.
const F = {
  icp: ['01-icp/ICP.md'], committee: ['01-icp/BUYER-COMMITTEE.md', '01-icp/COMITE-DE-COMPRA.md'], voc: ['01-icp/VOICE-OF-CUSTOMER.md', '01-icp/VOZ-DO-CLIENTE.md'],
  voice: ['02-voice/VOICE.md', '02-voz/VOZ.md'], terms: ['02-voice/TERMINOLOGY.md', '02-voz/TERMINOLOGIA.md'], compliance: ['02-voice/COMPLIANCE.md', '02-voz/COMPLIANCE.md'],
  visual: ['03-visual/VISUAL-BRAND.md', '03-visual/IDENTIDADE-VISUAL.md'], imagery: ['03-visual/IMAGERY.md', '03-visual/IMAGENS.md'],
  offer: ['05-offer/OFFER.md', '05-oferta/OFERTA.md'], competitors: ['05-offer/COMPETITORS.md', '05-oferta/CONCORRENCIA.md'], winloss: ['05-offer/WIN-LOSS.md', '05-oferta/GANHOS-E-PERDAS.md'],
  keywords: ['06-seo/KEYWORDS.md', '06-seo/PALAVRAS-CHAVE.md'], clusters: ['06-seo/TOPIC-CLUSTERS.md', '06-seo/CLUSTERS.md'], geo: ['06-seo/GEO-AEO.md'],
  sitemap: ['07-website/SITE-MAP.md', '07-site/MAPA-DO-SITE.md'],
  proof: ['08-content/PROOF-CORPUS.md', '08-conteudo/PROVAS.md'], calendar: ['08-content/EDITORIAL-CALENDAR.md', '08-conteudo/CALENDARIO.md'], library: ['08-content/CONTENT-LIBRARY.md', '08-conteudo/BIBLIOTECA.md'],
  analytics: ['09-data/ANALYTICS.md', '09-dados/MEDICAO.md'], plan: ['11-marketing-plan/ONE-PAGE-MARKETING-PLAN.md', '11-plano/PLANO-DE-UMA-PAGINA.md'],
  channels: ['11-marketing-plan/CHANNELS.md', '11-plano/CANAIS.md'],
  research: ['06-seo/research', '06-seo/pesquisa'],
}

const INTENT = { info: 'Informacional', informational: 'Informacional', comm: 'Comercial', commercial: 'Comercial', nav: 'Navegacional', navigational: 'Navegacional', trans: 'Transacional', transactional: 'Transacional' }
const ptNumber = (v) => (/^\d+$/.test(v) ? Number(v).toLocaleString('pt-BR') : v)
// Columns of a keyword research CSV (DataForSEO-style export) → brain fields.
const KW_CSV = {
  volume: ['Volume', ptNumber],
  kd: ['Dificuldade', (v) => v],
  intent: ['Intenção', (v) => INTENT[v] || v],
  // U+2212, not "-": a value starting with "-" would read as a list item
  yoy: ['Tendência', (v) => (v === '' ? '' : `${Number(v) > 0 ? '+' : Number(v) < 0 ? '−' : ''}${Math.abs(Number(v))}% ano`)],
  cluster: ['Cluster', (v) => (v ? `Cluster ${v}` : '')],
  demand: ['Demanda', (v) => v],
  competition: ['Competição', (v) => v],
  fit: ['Fit', (v) => v],
  opportunity: ['Oportunidade', (v) => v],
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const stripCode = (s) => s.replace(/^(\w{1,2}|\d+)[.)]\s+/, '')

/**
 * Categories in the order the sidebar shows them. Each group lists where its
 * records come from (file = list of candidate paths, first that exists wins):
 *   heading: { file, level, match?, under? }      one record per heading
 *   rows:    { file, under?, match?, title, id? } one record per table row
 *   csv:     { dir, key, columns, id }            one record per row of the newest CSV with column `key`
 *   docs:    [{ id, title, sections | all }]      one record made of whole sections
 *   docsIn:  { dir }                              one record per markdown file in a folder
 *   sources: true                                 the source tags found by the extractor
 * A category may set `parent` (sub-category) or `hub: true` (only sub-categories).
 */
export const SCHEMA = [
  { id: 'overview', label: 'Visão geral', icon: 'target', color: '#6D28D9', desc: 'Quem a marca é, o que promete e como o plano fecha a conta.', groups: [
    { docs: [
      { id: 'posicionamento', title: 'Posicionamento e promessa', sections: [[F.offer, /^(Positioning statement|Posicionamento)/i], [F.offer, /^(Promise|Promessas)/i], [F.offer, /^(Differentiation|Diferenciação)/i], [F.voice, /^Inimigo/i], [F.offer, /^A escada/i], [F.offer, /^(Proof points|Provas para toda)/i]] },
      { id: 'ponto-de-vista', title: 'Ponto de vista e arquétipo', sections: [[F.voice, /^(Point-of-View|Ponto de vista)/i], [F.voice, /^(Brand Archetype|Arquétipo)/i]] },
      { id: 'icp-comum', title: 'O que todo cliente ideal tem em comum', sections: [[F.icp, /^O que é comum/i], [F.icp, /^(Voice-of-Customer Snippets|Trechos da voz do cliente)/i]] },
      { id: 'plano', title: 'Plano de marketing', file: F.plan, all: true },
      { id: 'metricas', title: 'Métricas e linha de base', file: F.analytics, all: true },
    ] },
  ] },
  { id: 'personas', label: 'Personas', icon: 'users', color: '#DB2777', desc: 'Quem a gente ganha. Um documento por persona.', groups: [
    { heading: { file: F.icp, level: 2, match: /Persona:|^Persona (primária|secundária|hipótese)/i }, expected: PERSONA_FIELDS, kind: 'persona' },
  ] },
  { id: 'committee', label: 'Comitê de compra', icon: 'network', color: '#BE185D', desc: 'Quem participa da decisão, o que cada um precisa ver e o que trava.', groups: [
    { heading: { file: F.committee, level: 3, under: /^(Committee roles|Papéis no comitê)/i } },
    { docs: [{ id: 'papeis-por-negocio', title: 'Papéis por negócio', sections: [[F.committee, /^(Deal role matrix|Papéis por negócio)/i], [F.committee, /^(Why the committee|Por que o comitê)/i]] }] },
  ] },
  { id: 'offers', label: 'Ofertas', icon: 'package', color: '#2563EB', desc: 'O que a gente vende, para quem, em quanto tempo e com que prova.', groups: [
    { heading: { file: F.offer, level: 2, match: /^(Offer|Oferta) \d+:/i }, expected: OFFER_FIELDS, kind: 'offer' },
    { docs: [{ id: 'precos', title: 'Pacotes e princípios de preço', sections: [[F.offer, /^(Packaging|Pacotes)/i], [F.offer, /^(Pricing principles|Princípios de preço)/i]] }] },
  ] },
  { id: 'proofs', label: 'Provas', icon: 'shield', color: '#0D9488', desc: 'Cases, depoimentos, capacidade e dados, cada um com ID e permissão de uso.', groups: [
    { label: 'Cases', heading: { file: F.proof, level: 3, match: /^CS-\d{3}\b/ }, kind: 'case' },
    // a case that only exists as a row of the index table
    { label: 'Cases', rows: { file: F.proof, under: /^(Case studies index|Índice de cases)/i, match: /^CS-\d{3}$/, title: ['Cliente', 'Customer'], skipExisting: true }, kind: 'case' },
    { label: 'Depoimentos', heading: { file: F.proof, level: 3, match: /^((Testimonial|Depoimento) )?T-\d{3}\b/ }, kind: 'testimonial' },
    { label: 'Capacidade', rows: { file: F.proof, match: /^CAP-\d{3}$/, title: ['O quê'] }, kind: 'capability' },
    { label: 'Dados', rows: { file: F.proof, match: /^D-\d{3}$/, title: ['Afirmação', 'Dado', 'Claim'] }, kind: 'data' },
    { docs: [{ id: 'mapa-de-prova', title: 'Afirmação → prova e lacunas', sections: [[F.proof, /^(Claim-to-proof|Mapa afirmação)/i], [F.proof, /^Lacunas/i], [F.proof, /^(Permission tracker|Controle de permissões)/i]] }] },
  ] },
  { id: 'competition', label: 'Concorrência', icon: 'crosshair', color: '#EA580C', desc: 'O que o cliente faria no lugar da gente, e como ganhamos de cada alternativa.', groups: [
    { label: 'Alternativas', heading: { file: F.competitors, level: 2, match: /^Alternativa:/i }, expected: ALTERNATIVE_FIELDS, kind: 'alternative' },
    { label: 'Concorrentes', heading: { file: F.competitors, level: 2, match: /^(Concorrente|Competitor):/i }, expected: COMPETITOR_FIELDS, kind: 'alternative' },
    { label: 'Battle cards', heading: { file: F.competitors, level: 3, match: /^Battle card:/i }, kind: 'battlecard' },
    { docs: [{ id: 'mapa-competitivo', title: 'Mapa competitivo', sections: [[F.competitors, /^(Competitor map|Mapa competitivo)/i]] }] },
  ] },
  { id: 'deals', label: 'Ganhos e perdas', icon: 'trend', color: '#7C3AED', desc: 'Negócios ganhos e perdidos, o que decidiu cada um e a lição.', groups: [
    { heading: { file: F.winloss, level: 2, match: /^(Deal|Negócio):/i }, kind: 'deal' },
    { docs: [{ id: 'padroes-win-loss', title: 'Padrões de ganhos e perdas', sections: [[F.winloss, /^(Aggregated patterns|Padrões agregados)/i]] }] },
  ] },
  { id: 'channels', label: 'Canais', icon: 'compass', color: '#0F766E', desc: 'Onde a marca procura clientes: os canais em teste, o canal principal e os sinais de saturação.', groups: [
    { label: 'Canal principal', heading: { file: F.channels, level: 2, match: /^(Canal principal|Main channel):/i }, expected: MAIN_CHANNEL_FIELDS, kind: 'channel' },
    { label: 'Círculo central', heading: { file: F.channels, level: 2, match: /^(Canal|Channel):/i }, expected: CHANNEL_FIELDS, kind: 'channel' },
    { label: 'Testes', heading: { file: F.channels, level: 2, match: /^(Teste|Test):/i }, expected: TEST_FIELDS, kind: 'channel-test' },
    { docs: [
      { id: 'fase-e-gargalo', title: 'Fase e gargalo', sections: [[F.channels, /^(Fase e gargalo|Stage and bottleneck)/i]] },
      { id: 'brainstorm-de-canais', title: 'Uma ideia por canal e as três colunas', sections: [[F.channels, /^Brainstorm/i], [F.channels, /^(Classificação|Ranking)/i]] },
    ] },
  ] },
  { id: 'voc', label: 'Voz do cliente', icon: 'quote', color: '#E11D48', desc: 'O que o cliente diz, nas palavras dele, por família de dor, por tema e por origem.', groups: [
    { label: 'Famílias de dor', heading: { file: F.voc, level: 3, under: /^Por família de dor/i }, kind: 'voc' },
    { label: 'Temas', heading: { file: F.voc, level: 3, under: /^(Theme index|Índice de temas)/i }, kind: 'voc' },
    { label: 'Por origem', heading: { file: F.voc, level: 3, under: /^(Source categories|Categorias de fonte)/i }, kind: 'voc' },
    { docs: [{ id: 'padroes-de-linguagem', title: 'Padrões de linguagem para espelhar', sections: [[F.voc, /^Padrões de linguagem/i]] }] },
  ] },
  { id: 'voice', label: 'Voz', icon: 'mic', color: '#0891B2', desc: 'Como a marca soa: atributos, regras de escrita, termos e limites.', groups: [
    { label: 'Atributos', heading: { file: F.voice, level: 3, under: /^(Voice Attributes|Atributos de voz)/i }, kind: 'attribute' },
    { docs: [
      { id: 'regras-de-escrita', title: 'Regras de escrita', sections: [[F.voice, /^(Tone Modulation|Tom por canal)/i], [F.voice, /^(Reading Level|Nível de leitura)/i], [F.voice, /^(Sentence-Length|Tamanho de frase)/i], [F.voice, /^(Punctuation|Pontuação)/i], [F.voice, /^(Formatting|Formatação)/i], [F.voice, /^CTA/i], [F.voice, /^Emoji/i], [F.voice, /^(Banned sentence|Formatos de frase proibidos|Frases proibidas)/i], [F.voice, /^(Worked example|Exemplo)/i]] },
      { id: 'terminologia', title: 'Terminologia', file: F.terms, all: true },
      { id: 'compliance', title: 'Compliance e limites de afirmação', file: F.compliance, all: true },
    ] },
  ] },
  // Hub with sub-categories only: keywords, clusters, GEO/AEO, editorial and site sit at the same level.
  { id: 'seo', hub: true, label: 'SEO e conteúdo', icon: 'search', color: '#65A30D', desc: 'Como a marca é achada e do que ela fala: palavras-chave, clusters, GEO/AEO, calendário e site.', groups: [] },
  { id: 'keywords', parent: 'seo', label: 'Palavras-chave', icon: 'key', color: '#4D7C0F', desc: 'O que o comprador busca: volume, dificuldade, intenção e a página que deve responder.', groups: [
    { label: 'Primárias', rows: { file: F.keywords, under: /^(Primary keywords|Palavras-chave primárias)/i, title: ['Palavra', 'Palavra-chave', 'Keyword'], id: 'kw' }, kind: 'keyword' },
    { label: 'Secundárias', rows: { file: F.keywords, under: /^(Secondary keywords|Palavras-chave secundárias)/i, title: ['Palavra', 'Palavra-chave', 'Keyword'], id: 'kw' }, kind: 'keyword' },
    // A research CSV adds its scores to the terms above and brings the validated long tail.
    { label: 'Cauda longa validada', csv: { dir: F.research, key: 'keyword', columns: KW_CSV, id: 'kw' }, kind: 'keyword' },
    { docs: [
      { id: 'estrategia-de-palavras-chave', title: 'Estratégia e leitura dos dados', sections: [[F.keywords, /^Decisões/i], [F.keywords, /^O que os dados mostram/i], [F.keywords, /^(Keyword tiers|Níveis de palavra-chave)/i], [F.keywords, /^(Long-tail|Clusters de cauda longa)/i], [F.keywords, /^(Branded|Marca × genérico)/i], [F.keywords, /^(Search intent|Intenção de busca)/i], [F.keywords, /^(SERP|Recursos da SERP)/i], [F.keywords, /^(Seasonal|Termos sazonais)/i]] },
    ] },
    { docsIn: { dir: F.research } },
  ] },
  { id: 'clusters', parent: 'seo', label: 'Clusters de conteúdo', icon: 'network', color: '#65A30D', desc: 'Os temas em que a marca quer autoridade: um pilar e seus satélites por cluster.', groups: [
    { label: 'Clusters', heading: { file: F.clusters, level: 2, match: /^Cluster \d+:/i }, kind: 'cluster' },
    { docs: [{ id: 'arquitetura-de-conteudo', title: 'Arquitetura de conteúdo', sections: [[F.clusters, /^(The hub-and-spoke|Modelo hub-and-spoke)/i], [F.clusters, /^(Cluster inventory|Inventário de clusters)/i], [F.clusters, /^(Link architecture|Regras de links)/i], [F.clusters, /^(Content gap|Lacunas de conteúdo)/i], [F.clusters, /^(Content refresh|Cadência de atualização)/i]] }] },
  ] },
  { id: 'geo', parent: 'seo', label: 'GEO e AEO', icon: 'quote', color: '#3F6212', desc: 'Como ser citado por ChatGPT, Perplexity, Gemini e pelos resumos de IA do Google.', groups: [
    { docs: [{ id: 'geo-aeo', title: 'GEO e AEO', file: F.geo, all: true }] },
  ] },
  { id: 'editorial', parent: 'seo', label: 'Calendário e biblioteca', icon: 'trend', color: '#84CC16', desc: 'O que está publicado, em produção e programado, por canal.', groups: [
    { docs: [
      { id: 'calendario', title: 'Calendário editorial', file: F.calendar, all: true },
      { id: 'biblioteca', title: 'Biblioteca de conteúdo', file: F.library, all: true },
    ] },
  ] },
  { id: 'site', parent: 'seo', label: 'Site', icon: 'doc', color: '#4D7C0F', desc: 'Páginas, arquitetura de informação e caminhos de conversão do site.', groups: [
    { docs: [{ id: 'mapa-do-site', title: 'Mapa do site', file: F.sitemap, all: true }] },
  ] },
  { id: 'visual', label: 'Visual', icon: 'palette', color: '#D97706', desc: 'Cores, tipografia, logo e direção de imagem.', groups: [
    { docs: [
      { id: 'identidade-visual', title: 'Identidade visual', file: F.visual, all: true },
      { id: 'imagens', title: 'Direção de imagem', file: F.imagery, all: true },
    ] },
  ] },
  { id: 'sources', label: 'Fontes', icon: 'book', color: '#A16207', desc: 'De onde vem cada afirmação. Cada fonte aponta para a nota original.', groups: [
    { sources: true, kind: 'source' },
  ] },
]

// ---------------------------------------------------------------- build
export function buildBrain(root, graph, opts = {}) {
  const cache = new Map()
  const read = (rel) => {
    if (!cache.has(rel)) {
      const abs = path.join(root, rel)
      const text = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null
      cache.set(rel, text === null ? null : { text, tree: parseTree(text), lines: text.split('\n') })
    }
    return cache.get(rel)
  }
  // First candidate path that exists (English template name or GTM Brain name).
  const pick = (spec) => (Array.isArray(spec) ? spec : [spec]).find((p) => p && fs.existsSync(path.join(root, p))) || null
  const filesIn = (dirSpec, ext) => {
    const dir = pick(dirSpec)
    if (!dir) return []
    return fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(ext) && !/^readme/i.test(f)).sort().reverse().map((f) => `${dir}/${f}`)
  }
  const fileStatus = new Map(graph.nodes.filter((n) => n.type === 'file').map((n) => [n.path, n.status]))
  const sourceNodes = graph.nodes.filter((n) => n.type === 'source' && n.id.startsWith('src:'))
  const knownTags = new Set(sourceNodes.map((n) => n.id.slice(4)))

  const items = []
  const categories = []
  const used = new Set()
  const uniq = (id) => {
    let out = id
    for (let i = 2; used.has(out); i++) out = `${id}-${i}`
    used.add(out)
    return out
  }

  for (const cat of SCHEMA) {
    const groups = []
    for (const g of cat.groups) {
      const recs = []
      if (g.heading) {
        const file = pick(g.heading.file)
        recs.push(...fromHeadings(file && read(file), { ...g.heading, file }, g, cat))
      }
      if (g.rows) {
        const file = pick(g.rows.file)
        recs.push(...fromRows(file && read(file), { ...g.rows, file }, g, cat))
      }
      // earlier groups of this category are already in `items`, so CSV rows can enrich them
      if (g.csv) {
        // newest CSV in the research folder that has the key column
        const file = filesIn(g.csv.dir, '.csv').find((f) => (parseCsv(read(f).text)[0] || []).includes(g.csv.key))
        if (file) recs.push(...fromCsv(read(file), { ...g.csv, file }, g, items))
      }
      if (g.docs) for (const d of g.docs) {
        const r = fromDoc(d, read, cat)
        if (r) recs.push(r)
      }
      // research reports and other notes dropped in a folder: one document each, titled by the H1
      if (g.docsIn) for (const f of filesIn(g.docsIn.dir, '.md')) {
        const h1 = read(f).tree.children.find((n) => n.level === 1)
        const r = fromDoc({ id: slugify(path.basename(f, '.md')), title: h1 ? splitTitle(h1.title) : path.basename(f, '.md'), file: f, all: true }, read, cat)
        if (r) recs.push(r)
      }
      if (g.sources) recs.push(...fromSources(sourceNodes, cat))
      if (!recs.length) continue
      for (const r of recs) {
        r.id = uniq(r.id)
        r.cat = cat.id
        r.status = r.origin ? fileStatus.get(r.origin.file) : undefined
        applyExpected(r, g.expected)
        items.push(r)
      }
      if (!g.expected && recs.length >= 3 && !g.docs && !g.docsIn && !g.sources && !g.csv) inferExpected(recs)
      if (g.csv) recs.sort((a, b) => (num(b, 'Oportunidade') - num(a, 'Oportunidade')) || (num(b, 'Volume') - num(a, 'Volume')))
      if (g.kind === 'channel') for (const r of recs) {
        // "Entra como: leads" → a pill, so the list shows which channels skip the site
        const enters = r.fields.find((f) => f.label === 'Entra como')
        const m = enters && /\b(visitas|leads|visits)\b/i.exec(stripMd(enters.lines.join(' ')))
        if (m) r.pills.push({ t: m[1].toLowerCase() === 'visits' ? 'visitas' : m[1].toLowerCase(), cls: '' })
      }
      if (g.kind === 'channel-test') for (const r of recs) {
        const result = r.fields.find((f) => f.label === 'Resultado')
        if (result && /^\s*(em andamento|in progress)/i.test(stripMd(result.lines.join(' ')))) r.pills.push({ t: 'em andamento', cls: 'warn' })
      }
      if (g.kind === 'testimonial') for (const r of recs) {
        // "T-001" says nothing; name the testimonial by who said it.
        const who = r.fields.find((f) => /^(Nome|Empresa)$/.test(f.label))
        if (who) r.title = stripMd(who.lines.join(' ')).split(/[,(]/)[0].trim() || r.title
      }
      // two sources can feed the same group (e.g. cases from headings and from the index table)
      const kind = g.docs || g.docsIn ? 'docs' : g.kind || null
      const same = groups.find((x) => x.label === (g.label || null) && x.kind === kind && (g.label || kind === 'docs'))
      if (same) same.items.push(...recs.map((r) => r.id))
      else groups.push({ label: g.label || null, kind, items: recs.map((r) => r.id) })
    }
    // keyword summaries once all sources (tables and research CSV) are merged
    for (const r of items) if (r.cat === cat.id && r.kind === 'keyword') keywordSummary(r)
    if (groups.length || cat.hub) categories.push({ id: cat.id, hub: !!cat.hub, parent: cat.parent || null, label: cat.label, icon: cat.icon, color: cat.color, desc: cat.desc, groups })
  }

  // Lookup tables for links and inline references.
  const byId = new Map(items.map((r) => [r.id, r]))
  // A file is named by what it feeds: a category of records first, then a
  // whole-file document, then the category of a document built from it.
  const catOfFile = new Map()
  const claim = (pred, target) => {
    for (const r of items) if (r.origin && r.kind !== 'source' && pred(r) && !catOfFile.has(r.origin.file)) catOfFile.set(r.origin.file, target(r))
  }
  claim((r) => r.kind !== 'doc', (r) => `cat:${r.cat}`)
  claim((r) => r.kind === 'doc' && r.origin.whole, (r) => r.id)
  claim((r) => r.kind === 'doc', (r) => `cat:${r.cat}`)
  const catLabel = new Map(categories.map((c) => [`cat:${c.id}`, c.label]))
  const fileTarget = (rel) => {
    const go = catOfFile.get(rel)
    if (!go) return null
    return { go, label: go.startsWith('cat:') ? catLabel.get(go) : byId.get(go).title }
  }
  const allFiles = [...fileStatus.keys()]
  const resolveBare = (name) => allFiles.filter((f) => f.endsWith('/' + name))
  const aliases = buildAliases(items)

  const ctx = { byId, knownTags, fileTarget, resolveBare, linear: opts.linearWorkspace, issueRe: issueRe(opts.issues) }
  const inline = (s) => inlineMd(s, ctx)
  for (const r of items) {
    const raw = [...r.introLines, ...r.fields.flatMap((f) => [f.label, ...f.lines])].join('\n')
    r.refs = findRefs(r, raw, ctx, aliases)
    r.flags = {
      pending: r.fields.filter((f) => f.status === 'pending').length,
      hypothesis: (raw.match(/\[(HIPÓTESE|PROPOSTA)\]/g) || []).length,
      proven: (raw.match(/\[(COMPROVADO|LITERAL)\]/g) || []).length,
      tension: raw.split('\n').filter((l) => RE_TENSION.test(l) && !RE_PENDING.test(l)).length,
      quotes: (raw.match(/^\s*[-*]\s+\[LITERAL\]/gm) || []).length,
    }
    r.lead = r.introLines.length ? renderMd(r.introLines, inline) : ''
    for (const f of r.fields) {
      f.html = renderMd(f.lines, inline)
      delete f.lines
    }
    r.text = stripMd(raw).slice(0, 5000)
    delete r.introLines
  }

  const brand = graph.meta.brand
  return {
    meta: { brand, root, generatedAt: graph.meta.generatedAt, linearWorkspace: opts.linearWorkspace || null },
    categories,
    items,
  }

  // ------------------------------------------------------------ record builders
  function fromHeadings(file, sel, g, cat) {
    if (!file) return []
    let nodes = descendants(file.tree).filter((n) => n.level === sel.level)
    if (sel.under) nodes = nodes.filter((n) => n.parent && sel.under.test(n.parent.title))
    if (sel.match) nodes = nodes.filter((n) => sel.match.test(n.title))
    return nodes.map((n) => {
      const { intro, fields } = parseFields(n)
      const t = cleanTitle(n.title, g.kind)
      return {
        id: t.id || `${cat.id}:${slugify(t.title)}`,
        kind: g.kind || 'record',
        group: g.label || null,
        title: t.title,
        code: t.code || null,
        pills: t.pills.filter((p, i, a) => a.findIndex((x) => x.t === p.t) === i),
        introLines: intro,
        fields: fields.map(toField),
        origin: { file: sel.file, line: n.line, end: n.end },
      }
    })
  }

  function fromRows(file, sel, g, cat) {
    if (!file) return []
    const out = []
    // Tables of the whole file, or only those under the headings that match `under`.
    const scopes = sel.under
      ? descendants(file.tree).filter((n) => sel.under.test(n.title)).map((n) => fullLines(n))
      : [file.text.split('\n').map((text, i) => ({ text, line: i + 1 }))]
    for (const lines of scopes) {
      for (const t of parseTables(lines)) {
        const titles = [].concat(sel.title).map((x) => x.toLowerCase())
        const titleCol = t.header.findIndex((h) => titles.includes(stripMd(h).toLowerCase()))
        for (const row of t.rows) {
          const first = stripMd(row.cells[0] || '')
          if (sel.match && !sel.match.test(first)) continue
          const title = stripMd(row.cells[titleCol >= 0 ? titleCol : 1] || first)
          if (!title) continue
          const fields = t.header.map((h, i) => ({ label: label(h), lines: [row.cells[i] || ''], line: row.line }))
            .filter((f, i) => i !== titleCol && (sel.match ? i !== 0 : true))
          const prefix = sel.id || 'proof'
          const id = prefix === 'proof' ? `proof:${first}` : `${prefix}:${slugify(title)}`
          if (sel.skipExisting && used.has(id)) continue
          out.push({
            id,
            kind: g.kind, group: g.label || null, title: sel.match ? title : title, code: sel.match ? first : null, pills: [],
            introLines: [], fields: fields.map(toField), origin: { file: sel.file, line: row.line, end: row.line },
          })
        }
      }
    }
    return out
  }

  /**
   * One record per CSV row. A row whose key matches a record already built
   * (same id) enriches it with the missing columns instead of duplicating it.
   */
  function fromCsv(file, sel, g, existing) {
    if (!file) return []
    const rows = parseCsv(file.text)
    const header = rows.shift() || []
    const keyCol = header.indexOf(sel.key)
    const byId = new Map(existing.map((r) => [r.id, r]))
    const out = []
    rows.forEach((cells, i) => {
      const title = (cells[keyCol] || '').trim()
      if (!title) return
      const fields = []
      header.forEach((h, c) => {
        const spec = sel.columns[h]
        if (!spec) return
        const value = spec[1]((cells[c] || '').trim())
        if (value !== '') fields.push({ label: spec[0], lines: [String(value)], line: i + 2 })
      })
      const id = `${sel.id}:${slugify(title)}`
      const known = byId.get(id)
      if (known) {
        const have = new Set(known.fields.map((f) => f.label))
        for (const f of fields) if (!have.has(f.label)) known.fields.push(toField(f))
        return
      }
      out.push({ id, kind: g.kind, group: g.label || null, title, code: null, pills: [], introLines: [], fields: fields.map(toField), origin: { file: sel.file, line: i + 2, end: i + 2 } })
    })
    return out
  }

  function fromDoc(d, readFile, cat) {
    const fields = []
    let origin = null
    const take = (rel, node) => {
      const t = splitTitle(node.title)
      const lines = fullLines(node).map((x) => x.text)
      fields.push(toField({ label: label(t), lines, line: node.line, end: node.end, file: rel }))
      if (!origin) origin = { file: rel, line: node.line, end: node.end }
    }
    if (d.all) {
      const rel = pick(d.file)
      const file = rel && readFile(rel)
      if (!file) return null
      for (const n of file.tree.children.flatMap((h1) => (h1.level === 1 ? h1.children : [h1]))) {
        if (n.level === 2 && !BOILERPLATE.test(n.title)) take(rel, n)
      }
      origin = { file: rel, line: 1, end: file.lines.length, whole: true }
    } else {
      for (const [spec, re] of d.sections) {
        const rel = pick(spec)
        const file = rel && readFile(rel)
        if (!file) continue
        const n = descendants(file.tree).find((x) => x.level === 2 && re.test(x.title))
        if (n) take(rel, n)
      }
    }
    if (!fields.length) return null
    return {
      id: `doc:${d.id}`, kind: 'doc', group: null, title: d.title, code: null, pills: [],
      introLines: [], fields, origin, expected: fields.length,
    }
  }

  function fromSources(nodes, cat) {
    return nodes.map((n) => {
      const tag = n.id.slice(4)
      const note = n.obsidian ? n.obsidian.replace(/\.md$/, '').split('/').pop() : null
      const fields = [
        { label: 'O que é', lines: [n.title && n.title !== n.label ? n.title : '—'] },
        { label: 'Nota no Obsidian', lines: [note ? `\`${note}\`` : 'Sem nota resolvível. A fonte não aponta para um arquivo consultável.'] },
      ]
      if (n.desc) fields.push({ label: 'Detalhes', lines: [n.desc.replace(/^[\s,·]+/, '')] })
      return {
        id: `source:${tag}`, kind: 'source', group: null, title: note || (n.title && n.title.length > 8 ? cap(stripMd(n.title)) : cap(tag.toLowerCase())), code: tag, pills: [],
        introLines: [], fields: fields.map(toField), origin: n.path ? { file: n.path, line: n.line || 1, end: n.line || 1 } : null,
        obsidian: n.obsidian || null,
      }
    })
  }
}

function splitTitle(t) {
  return t.replace(/`?\[[A-ZÁÉÍÓÚÂÊÔÃÕÇ -]+\]`?/g, '').trim()
}

function toField(f) {
  const text = f.lines.join('\n')
  const plain = stripMd(text).replace(/[—–-]/g, '').trim()
  // A field that is only bracketed instructions ("[1 a 9 / 10 a 49 funcionários]") is still template.
  // Instructions have lowercase letters; seals and source tags ([COMPROVADO], [ENTREVISTAS]) do not.
  const residue = stripMd(text.replace(/\*\*[^*]+\*\*:?/g, ' ').replace(/`[^`]*`/g, ' ').replace(RE_INSTRUCTION, ' ')).replace(/[^\p{L}\p{N}]+/gu, '')
  const templateOnly = (text.match(RE_INSTRUCTION) || []).length > 0 && residue.length < 12
  const status = !plain ? 'empty' : templateOnly || RE_PLACEHOLDER.test(text) || RE_PENDING.test(text) ? 'pending' : 'ok'
  RE_PLACEHOLDER.lastIndex = 0
  const seals = [...(f.label + ' ' + text.split('\n')[0]).matchAll(RE_SEAL)].map((m) => m[1])
  return { label: label(splitTitle(f.label)), key: slugify(f.label), lines: f.lines, line: f.line, status, seals: [...new Set(seals)] }
}

/** Title cleanup per kind: drops template prefixes and turns seals and codes into pills. */
function cleanTitle(raw, kind) {
  const pills = []
  let code = null
  let id = null
  for (const m of raw.matchAll(RE_SEAL)) pills.push({ t: m[1].toLowerCase(), cls: /COMPROVADO|LITERAL/.test(m[1]) ? 'ok' : /HIPÓTESE|PROPOSTA/.test(m[1]) ? 'warn' : '' })
  let t = splitTitle(raw)
  if (kind === 'persona') {
    const tier = /^(Primary|Secondary|Hypothesis) Persona:\s*/i.exec(t) || /^Persona (primária|secundária|hipótese):\s*/i.exec(t)
    if (tier) {
      const k = tier[1].toLowerCase()
      pills.unshift({ t: { primary: 'primária', secondary: 'secundária', hypothesis: 'hipótese' }[k] || k, cls: '' })
      t = t.slice(tier[0].length)
    }
    const p = /\s*\((Perfil \d+)\)\s*/.exec(t)
    if (p) {
      code = p[1]
      t = t.replace(p[0], ' ').trim()
    }
  } else if (kind === 'offer') {
    const m = /^(?:Offer|Oferta) (\d+):\s*/i.exec(t)
    if (m) {
      code = `Oferta ${m[1]}`
      t = t.slice(m[0].length)
    }
    const d = /\s*\((dormente|pausada|em definição)\)\s*$/i.exec(t)
    if (d) {
      pills.push({ t: d[1].toLowerCase(), cls: 'warn' })
      t = t.slice(0, d.index)
    }
  } else if (kind === 'case' || kind === 'testimonial') {
    const m = /^(?:(?:Testimonial|Depoimento)\s+)?((?:CS|T)-\d{3})\s*[·:-]?\s*(.*)$/.exec(t)
    if (m) {
      code = m[1]
      id = `proof:${m[1]}`
      t = m[2] || m[1]
    }
  } else if (kind === 'alternative') {
    t = t.replace(/^(Alternativa|Concorrente|Competitor):\s*/i, '')
  } else if (kind === 'battlecard') {
    t = t.replace(/^Battle card:\s*/i, '').replace(/^["“](.*)["”]$/, '$1')
  } else if (kind === 'channel') {
    const main = /^(Canal principal|Main channel):\s*/i.exec(t)
    if (main) pills.unshift({ t: 'principal', cls: 'ok' })
    t = t.replace(/^(Canal principal|Main channel|Canal|Channel):\s*/i, '')
  } else if (kind === 'channel-test') {
    t = t.replace(/^(Teste|Test):\s*/i, '')
  } else if (kind === 'deal') {
    t = t.replace(/^(Deal|Negócio):\s*/i, '')
    const m = /,\s*([^,]+)$/.exec(t)
    if (m) {
      const o = m[1].trim()
      const won = /^(won|ganho)$/i.test(o), lost = /^(lost|perdido)$/i.test(o)
      pills.push({ t: won ? 'ganho' : lost ? 'perdido' : o, cls: won ? 'ok' : lost ? 'bad' : 'warn' })
      t = t.slice(0, m.index)
    }
  } else if (kind === 'cluster') {
    const m = /^Cluster (\d+):\s*/i.exec(t)
    if (m) {
      code = `Cluster ${m[1]}`
      t = t.slice(m[0].length)
    }
  } else if (kind === 'attribute' || kind === 'voc') {
    t = t.replace(/^(Theme|Tema):\s*/i, '')
    const named = /^(?:Attribute|Atributo) (\d+):\s*/i.exec(t)
    if (named) {
      code = named[1]
      t = t.slice(named[0].length)
    }
    const m = /^(\w{1,2})[.)]\s+/.exec(t)
    if (m) {
      code = m[1]
      t = t.slice(m[0].length)
    }
  }
  t = label(stripCode(t))
  return { title: cap(t.trim()), code, pills, id }
}

const num = (r, name) => {
  const f = r.fields.find((x) => x.label === name)
  return f ? Number(stripMd(f.lines ? f.lines.join(' ') : '').replace(/\./g, '').replace(',', '.')) || 0 : 0
}

/** Minimal RFC 4180 CSV: quoted fields, doubled quotes, commas and newlines inside quotes. */
export function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let q = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++ } else if (ch === '"') q = false
      else cell += ch
    } else if (ch === '"') q = true
    else if (ch === ',') { row.push(cell); cell = '' } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell); rows.push(row); row = []; cell = ''
    } else cell += ch
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows.filter((r) => r.some((c) => c.trim()))
}

/** A keyword reads as numbers: "33.100/mês · dif. 22 · +83% ano", plus priority and intent as pills. */
function keywordSummary(r) {
  const v = (name) => {
    const f = r.fields.find((x) => x.label === name)
    // light cleanup only: stripMd would eat a leading "-" (as in "-34% ano")
    const t = f ? f.lines.join(' ').replace(/\*\*|`/g, '').trim().replace(/^-(?=\d)/, '−') : ''
    return t && t !== '—' ? t : ''
  }
  const bits = []
  if (v('Volume')) bits.push(`${v('Volume')}/mês`)
  if (v('Dificuldade')) bits.push(`dif. ${v('Dificuldade')}`)
  if (v('Tendência')) bits.push(v('Tendência'))
  if (v('Oportunidade')) bits.push(`oportunidade ${v('Oportunidade')}/10`)
  r.sub = bits.join(' · ')
  const prio = v('Prioridade')
  if (prio) r.pills.push({ t: prio.toLowerCase(), cls: /alta/i.test(prio) ? 'ok' : '' })
  if (v('Intenção')) r.pills.push({ t: v('Intenção').toLowerCase(), cls: '' })
}

/** Declared schema: fields are shown in schema order and counted. */
function applyExpected(r, expected) {
  if (r.kind === 'doc') {
    r.total = r.fields.length
    r.filled = r.fields.filter((f) => f.status === 'ok').length
    return
  }
  if (!expected) return
  const ordered = []
  const missing = []
  const rest = [...r.fields]
  for (const [name, re] of expected) {
    const i = rest.findIndex((f) => re.test(f.label))
    if (i >= 0) {
      const [f] = rest.splice(i, 1)
      f.label = name
      ordered.push(f)
    } else missing.push(name)
  }
  r.fields = [...ordered, ...rest]
  r.missing = missing
  r.total = expected.length
  r.filled = ordered.filter((f) => f.status === 'ok').length
}

/** No declared schema: a label used by at least half the records counts as expected. */
function inferExpected(recs) {
  const counts = new Map()
  for (const r of recs) for (const f of new Set(r.fields.filter((x) => !x.unlabeled && x.label !== 'Detalhes').map((x) => x.label))) counts.set(f, (counts.get(f) || 0) + 1)
  const expected = [...counts].filter(([, n]) => n >= Math.ceil(recs.length / 2)).map(([l]) => l)
  if (expected.length < 2) return
  for (const r of recs) {
    const have = new Map(r.fields.map((f) => [f.label, f]))
    r.total = expected.length
    r.filled = expected.filter((l) => have.get(l) && have.get(l).status === 'ok').length
    r.missing = expected.filter((l) => !have.has(l))
  }
}

/** Names that point at a record without its id: an offer name, a case client, "Perfil 3". */
function buildAliases(items) {
  const out = []
  const add = (name, id, type) => {
    name = name.trim()
    if (name.length < 3) return
    out.push({ id, type, name, re: new RegExp(`(^|[^\\p{L}])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u') })
  }
  for (const r of items) {
    if (r.kind === 'offer') add(r.title, r.id, 'cites')
    if (r.kind === 'persona' && r.code) add(r.code, r.id, 'cites')
    if (r.kind === 'case') for (const n of r.title.split(',')[0].split('/')) add(n, r.id, 'mentions')
    if (r.kind === 'keyword' && r.title.length >= 6) add(r.title, r.id, 'mentions')
  }
  return out
}

function findRefs(r, raw, ctx, aliases) {
  const refs = new Map()
  const add = (to, type) => {
    if (!to || to === r.id) return
    const k = to + '|' + type
    if (!refs.has(k)) refs.set(k, { to, type, n: 0 })
    refs.get(k).n++
  }
  if (r.kind === 'channel-test') {
    // "Teste: Parcerias com escolas, out. a dez." tests the channel whose name starts the same way
    const name = r.title.replace(/,[^,]*$/, '').trim().toLowerCase()
    const hit = name && [...ctx.byId.values()].find((x) => x.kind === 'channel' && (x.title.toLowerCase().startsWith(name) || name.startsWith(x.title.toLowerCase())))
    if (hit) add(hit.id, 'cites')
  }
  if (r.kind === 'keyword') {
    const c = r.fields.find((f) => f.label === 'Cluster')
    const n = c && /Cluster (\d+)/.exec(c.lines ? c.lines.join(' ') : '')
    const hit = n && [...ctx.byId.values()].find((x) => x.kind === 'cluster' && x.code === `Cluster ${n[1]}`)
    if (hit) add(hit.id, 'cites')
  }
  for (const line of raw.split('\n')) {
    const ids = new Set([...line.matchAll(RE_PROOF_ID)].map((m) => m[0]))
    for (const id of expandProofRanges(line)) ids.add(id)
    for (const id of ids) if (ctx.byId.has(`proof:${id}`)) add(`proof:${id}`, 'proves')
    for (const m of line.matchAll(RE_SOURCE_TAG)) if (ctx.knownTags.has(m[1])) add(`source:${m[1]}`, 'derives')
    for (const m of line.matchAll(RE_PATH_REF)) {
      const t = ctx.fileTarget(`${m[1]}/${m[2]}`)
      if (t) add(t.go, 'cites')
    }
    for (const a of aliases) {
      if (a.type === 'mentions' && ids.has(a.id.slice(6))) continue
      if (a.re.test(line)) add(a.id, a.type)
    }
    if (RE_PENDING.test(line)) for (const m of line.matchAll(RE_PATH_REF)) {
      const t = ctx.fileTarget(`${m[1]}/${m[2]}`)
      if (t) add(t.go, 'pending')
    }
  }
  return [...refs.values()]
}

// ---------------------------------------------------------------- inline markdown
const SEAL_CLASS = { COMPROVADO: 'ok', LITERAL: 'ok', OBSERVADO: '', HIPÓTESE: 'warn', PROPOSTA: 'warn', 'ASPAS EM RESUMO': '', PARÁFRASE: '' }

/**
 * Inline markdown → HTML with brain references: proof ids, source tags and
 * file paths become links to records; seals become pills; COL- issues link to
 * Linear when a workspace is known. Files are named by what they hold.
 */
export function inlineMd(s, ctx) {
  const keep = []
  const ph = (html) => `\u0000${keep.push(html) - 1}\u0000`
  const fileRef = (rel, fallback) => {
    const t = ctx.fileTarget(rel)
    return t ? ph(`<a class="ref doc" data-go="${esc(t.go)}">${esc(t.label)}</a>`) : ph(`<span class="ref file">${esc(fallback || rel.split('/').pop().replace(/\.md$/, ''))}</span>`)
  }
  // backticked tags, paths and files are references, not code
  s = s.replace(/`([^`]+)`/g, (m, inner) => {
    if (/^\[[^\]]+\]$/.test(inner) || /^\/?\d{2}-[a-z0-9-]+\//.test(inner) || /^[A-Za-z0-9_-]+\.md$/.test(inner)) return inner
    return ph(`<code>${esc(inner)}</code>`)
  })
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (m, t, url) => ph(`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(t)}</a>`))
  s = s.replace(/\[([^\]]+)\]\(((?!https?:)[A-Za-z0-9_./-]+\.md)\)/g, (m, t, p) => {
    const rel = p.replace(/^\.?\//, '')
    const hit = ctx.fileTarget(rel) ? rel : ctx.resolveBare(rel.split('/').pop())[0]
    return hit ? fileRef(hit, t) : ph(esc(t))
  })
  s = s.replace(RE_SEAL, (m, seal) => ph(`<span class="seal ${SEAL_CLASS[seal] ?? ''}">${esc(seal.toLowerCase())}</span>`))
  s = s.replace(RE_SOURCE_TAG, (m, tag, ptr) => (ctx.knownTags.has(tag) ? ph(`<a class="ref src" data-go="source:${esc(tag)}">${esc(tag)}${ptr ? ` <i>${esc(ptr)}</i>` : ''}</a>`) : m))
  s = s.replace(RE_PATH_REF, (m, layer, file) => fileRef(`${layer}/${file}`))
  s = s.replace(/\b([A-Z][A-Z0-9-]+)\.md\b/g, (m, base) => {
    const hits = ctx.resolveBare(`${base}.md`)
    return hits.length === 1 ? fileRef(hits[0]) : m
  })
  s = s.replace(RE_PROOF_ID, (m) => (ctx.byId.has(`proof:${m}`) ? ph(`<a class="ref proof" data-go="proof:${m}">${m}</a>`) : ph(`<span class="ref proof missing" title="Sem definição">${m}</span>`)))
  if (ctx.issueRe) s = s.replace(ctx.issueRe, (m) => ph(ctx.linear ? `<a class="ref issue" href="https://linear.app/${esc(ctx.linear)}/issue/${m}" target="_blank" rel="noopener">${m}</a>` : `<span class="ref issue">${m}</span>`))
  let h = esc(s)
  h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>').replace(/(^|[\s(])_([^_\s][^_]*)_(?=[\s.,;:)]|$)/g, '$1<i>$2</i>')
  return h.replace(/\u0000(\d+)\u0000/g, (m, i) => keep[+i])
}
