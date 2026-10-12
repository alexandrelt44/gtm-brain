# Referências: design systems prontos para IA

Uma lista selecionada de design systems e materiais que seguem o padrão pronto para IA descrito em `DESIGN.md`. Copie a estrutura, não o visual: seus tokens e sua voz continuam seus. O que torna esses sistemas legíveis para a IA é o esqueleto que eles usam.

Se uma pequena ou média empresa só puder estudar quatro design systems antes de montar o seu, que sejam estes quatro.

---

## Os quatro exemplos para estudar

### Atlassian Design System

- Site: [atlassian.design](https://atlassian.design/)
- Por que importa: é o sistema que Hardik Pandya destrinchou em [Expose your design system to LLMs](https://hvpandya.com/llm-design-systems). Todo o padrão de tokens em três camadas usado aqui se inspira na arquitetura do Atlaskit.
- O que copiar: a hierarquia de níveis dos arquivos de spec, a disciplina do script de auditoria, o prompt de partida.

### IBM Carbon Design System

- Site: [carbondesignsystem.com](https://carbondesignsystem.com/)
- Por que importa: arquitetura de tokens em três níveis, madura e muito adotada por grandes empresas. A documentação de cada componente é profunda, estruturada e consistente.
- O que copiar: a consistência da documentação ao longo de centenas de componentes. A documentação do Carbon tem a mesma cara seja no `Button` ou no `Accordion`. É para esse formato que a sua pasta `specs/` deve convergir.

### CMS Design System

- Site: [design.cms.gov](https://design.cms.gov/)
- Por que importa: um exemplo raro do setor público. O Centers for Medicare & Medicaid Services, órgão de saúde do governo dos Estados Unidos, atende usuários de todos os perfis e níveis de letramento, então a documentação de acessibilidade do sistema é especialmente rigorosa. No Brasil, o [Padrão Digital de Governo](https://www.gov.br/ds/) cumpre papel parecido e tem documentação em português.
- O que copiar: as specs de acessibilidade, a documentação de estados, os exemplos em linguagem simples. Útil se os seus usuários não são técnicos.

### Nordhealth Design System

- Site: [nordhealth.design](https://nordhealth.design/)
- Por que importa: compacto e bem estruturado, dá para ler de ponta a ponta numa tarde. Boa referência para pequenas e médias empresas que acham o Atlassian e o Carbon grandes demais para caber na cabeça.
- O que copiar: o tamanho da cobertura. O Nordhealth prova que você não precisa de 400 componentes para ter um design system de verdade.

---

## Fontes principais

### Hardik Pandya, "Expose your design system to LLMs"

- Endereço: [hvpandya.com/llm-design-systems](https://hvpandya.com/llm-design-systems)
- O tratamento público mais profundo do que "design system pronto para IA" quer dizer na prática, em código. Cobre o padrão de tokens em três camadas, a hierarquia de níveis dos arquivos de spec, o fluxo do script de auditoria, o prompt de partida e a detecção de desvios em design systems de terceiros. Toda a profundidade de design system desta camada se apoia nesse texto.

### Google Labs, especificação aberta do `DESIGN.md`

- Anúncio: [Stitch design tool introduces DESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)
- O padrão aberto que está surgindo para contexto de design legível por máquina. O `DESIGN.md` desta camada é compatível no espírito. Adote as seções mais rígidas da spec do Stitch conforme ela se estabilizar, para ganhar portabilidade entre plataformas.

### FigmaLint, de TJ Pitre

- Plugin: busque "FigmaLint" em [figma.com/community](https://www.figma.com/community). (Endereço oficial a confirmar antes de divulgar.)
- Plugin gratuito do Figma que audita um arquivo em busca de valores fixos, instâncias desvinculadas, estados interativos faltando e tokens não aplicados. É o equivalente, no Figma, do script de auditoria de tokens em `scripts/auditar-tokens.sh`.

### Style Dictionary

- Site: [amzn.github.io/style-dictionary](https://amzn.github.io/style-dictionary/)
- Sistema de build que transforma `tokens.json` em saídas específicas para cada plataforma (CSS, iOS, Android, Flutter). Útil se você publica em mais de uma plataforma a partir de uma única fonte de tokens.

---

## Leituras relacionadas

- [Infrastructure as Code (Wikipedia)](https://en.wikipedia.org/wiki/Infrastructure_as_code): o padrão original que esta estrutura leva para os ativos de marketing. Útil para quem nunca viu o padrão no seu território de origem.
- [Design Tokens Community Group (W3C)](https://www.designtokens.org/): o grupo de padronização que trabalha num formato de token comum entre ferramentas. Acompanhe se quiser que seus tokens funcionem além de uma única ferramenta de design.
- [Storybook](https://storybook.js.org/): ambiente de desenvolvimento de componentes. Opcional, mas ajuda se você mantém mais do que um punhado de componentes.

---

Última atualização: [AAAA-MM-DD]
