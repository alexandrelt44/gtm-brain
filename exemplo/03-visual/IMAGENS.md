# Direção de imagens

## Como usar este arquivo

- **O que entra:** regras para toda imagem, ilustração, ícone, captura de tela e conteúdo gerado por clientes que leve a marca.
- **Como os agentes leem:** agentes de geração de imagem e de design leem este arquivo para escolher tema, composição, luz, cor e estilo. Quando uma regra conflita com um pedido, o agente segue este arquivo.
- **Frequência de atualização:** revise duas vezes por ano. Atualize sempre que a marca entrar em um novo produto ou região.

## Checklist para agentes de IA

- [ ] Legível por máquina: regras expressas em tabelas e listas com direção, faça, não faça e exemplos.
- [ ] Estruturado: fotografia, ilustração, iconografia, capturas de tela, UGC e estilos proibidos, cada um na sua seção.
- [ ] Fonte única da verdade: nenhuma regra de imagem escondida em uma apresentação de slides.
- [ ] Versionado: data da última atualização.
- [ ] Citável: agentes citam `/03-visual/IMAGENS.md` nos pedidos de geração de imagem.

Última atualização: [AAAA-MM-DD]

---

## Direção de fotografia

### Tema

- **Temas principais:** [pessoas trabalhando, o produto em uso, o ambiente de trabalho, a ferramenta em ação]
- **Temas secundários:** [materiais, texturas, detalhes em close]
- **Nunca fotografar:** [liste o que está fora de cogitação]

### Composição

- Regra dos terços. Nunca centralizado, a menos que a marca seja deliberadamente editorial.
- Plano aberto de ambientação, plano médio de trabalho e close de detalhe. Cubra os três para cada tema.
- Espaço vazio de um lado, para o texto entrar sem caixa de desfoque.
- Horizonte nivelado. Sem ângulo holandês, a menos que haja justificativa editorial.

### Luz

- Luz natural de preferência. Começo da manhã e fim de tarde.
- Dia nublado é aceitável. Sol a pino, não.
- Fotos de estúdio usam uma fonte principal com preenchimento suave. Sem luz principal dura.

### Tratamento de cor

- Siga a paleta definida em `/03-visual/IDENTIDADE-VISUAL.md`.
- Leve tom quente, alinhado à temperatura da marca.
- Reduza a saturação de verdes e azuis em 5% a 10% se a cena já tiver cores muito intensas.
- Não aplique filtros pesados. Mantenha os tons de pele fiéis.

### Pessoas

- Se a marca usa pessoas nas imagens, mostre uma mistura de gêneros, idades, tons de pele e corpos que reflita a base de clientes.
- Mostre as pessoas trabalhando, não posando. Espontâneo vale mais que encenado.
- Nada de "aperto de mãos corporativo" ou "equipe em volta do notebook" com cara de banco de imagem.
- Prefira closes só das mãos quando o rosto não for necessário.

### Objetos de cena

- [Liste os objetos aprovados que sinalizam a categoria]
- [Liste os objetos proibidos que viram clichê]

## Estilo de ilustração

- **Abordagem:** [ex.: vetor chapado com leve granulado, traço com aguada ou isométrico geométrico]
- **Cor:** usa apenas tokens da paleta principal.
- **Espessura de traço:** 1,5 a 2 px em 1x, escalável.
- **Cantos:** arredondados, de acordo com `--radius-md`.
- **Sombreamento:** mínimo. Preenchimentos chapados mais um tom de destaque.
- **Evite:** degradês com três cores ou mais, sombras projetadas, renderizações 3D (a não ser para o produto).

## Iconografia

- **Fonte:** [biblioteca própria ou um pacote específico, como Lucide, Phosphor ou Heroicons]
- **Espessura do traço:** 1,5 a 2 px.
- **Preenchimento:** contorno por padrão. Versão sólida só para estados preenchidos.
- **Tamanhos:** 16, 20, 24 e 32 px.
- **Cor:** herda de `currentColor`. Não fixe a cor no ícone.
- **Evite:** misturar dois pacotes de ícones. Escolha um e fique nele.

## Capturas de tela

- Capture em 2x, na moldura exata do dispositivo de destino.
- Use a moldura de dispositivo aprovada em `/03-visual/assets/molduras-de-dispositivo/`.
- Recorte para mostrar a funcionalidade específica, nunca a tela inteira borrada.
- Remova dados pessoais de toda captura, em linha com a LGPD. Use dados de demonstração.
- Coloque uma legenda de uma frase embaixo de cada captura dizendo o que o leitor deve enxergar.

## Regras para banco de imagens

- Evite imagens genéricas ("executivos apertando as mãos", "notebook na mesa com uma planta").
- Prefira bibliotecas por assinatura com trabalho autoral (Stocksy, Unsplash+) aos grandes bancos genéricos.
- Toda imagem de banco precisa passar no teste de 10 segundos: "isso parece outros 50 anúncios?". Se parece, corte.
- Sempre com licença comercial. Nunca faça captura de tela e recorte.

## Conteúdo gerado por clientes (UGC)

- Peça autorização por escrito antes de usar foto de cliente, print de avaliação ou post de rede social em mídia paga ou em peças fixas de marketing. A autorização de uso de imagem também cobre o tratamento de dados pessoais previsto na LGPD.
- Dê crédito ao autor pelo nome e pelo @ toda vez.
- Não retoque pesado. Deixe o granulado. Deixe a imperfeição.
- Arquive o termo de autorização em `/03-visual/assets/autorizacoes-ugc/`.

## Estilos visuais proibidos

- Mistura de degradê neon estilo cyberpunk.
- Personagens 3D em forma de bolha, desenhados à mão e sem pés.
- Fotos geradas por IA com seis dedos.
- Aperto de mãos corporativo de banco de imagem.
- "Hacker de moletom com capuz" de banco de imagem.
- Clichês de cérebro-robô com lâmpada para conteúdo sobre IA.
- Horizonte de cidade à noite para falar de "crescimento".
- Paisagens supersaturadas que não combinam com a paleta.
- Reflexo de lente (lens flare).
- Frase motivacional sobre pôr do sol.

## Exemplo

### Imagens da Cadência

- As fotos principais são feitas entre 6h e 7h, quando a primeira turma chega e a luz da manhã entra pelas janelas do estúdio.
- Closes de mãos ajustando as molas do reformer, de um tapete de yoga sendo desenrolado e do celular da recepção mostrando a grade de horários do dia.
- Nada de modelo posando com roupa fitness. Só instrutoras e alunas em aula, com autorização de uso de imagem assinada, e mãos em movimento.
- As ilustrações usam vetor chapado em Musgo, Terracota e Areia.
- Os ícones são Phosphor contorno, traço de 1,5 px.
- As capturas de tela mostram a agenda e o painel de presença com alunos fictícios, cada uma recortada em um único fluxo (marcar reposição, confirmar Pix, ver faltas da semana).

## Como passar este arquivo para um agente de IA

```text
Carregue /03-visual/IMAGENS.md e /03-visual/IDENTIDADE-VISUAL.md antes de gerar ou selecionar qualquer imagem.

Antes de finalizar uma imagem:
1. O tema está na lista de Temas principais?
2. A composição segue a regra dos terços e a regra do espaço vazio?
3. A luz segue a direção (natural, suave, manhã ou fim de tarde)?
4. As cores correspondem aos tokens de /03-visual/IDENTIDADE-VISUAL.md?
5. O estilo evita tudo da lista de Estilos visuais proibidos?

Se o pedido conflitar com qualquer item acima, pare e sinalize para revisão de uma pessoa.
```

Caminhos de referência: `/03-visual/IMAGENS.md`, `/03-visual/IDENTIDADE-VISUAL.md`, `/03-visual/PROMPTS-DE-IMAGEM.md`.
