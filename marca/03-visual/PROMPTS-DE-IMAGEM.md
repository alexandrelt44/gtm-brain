# Prompts de imagem

## Como usar este arquivo

- **O que entra:** prompts-base para cada ferramenta de geração de imagem que o time usa. Cada ferramenta tem um prompt-modelo e de três a cinco exemplos. Todo prompt carrega as regras de marca de `/03-visual/IDENTIDADE-VISUAL.md` e `/03-visual/IMAGENS.md`.
- **Como os agentes leem:** os agentes carregam este arquivo quando recebem um pedido de imagem. Partem do modelo da ferramenta, preenchem as variáveis e aplicam os modificadores universais.
- **Frequência de atualização:** revise quando uma ferramenta lançar uma atualização grande de modelo. Acrescente um exemplo toda vez que um novo caso de uso passar pela revisão.

## Checklist para agentes de IA

- [ ] Legível por máquina: um prompt por bloco de código, com variáveis claras.
- [ ] Estruturado: um H2 por ferramenta.
- [ ] Fonte única da verdade: nenhuma biblioteca paralela de prompts perdida numa página do Notion.
- [ ] Versionado: cada prompt tem uma marcação de versão.
- [ ] Citável: agentes citam `/03-visual/PROMPTS-DE-IMAGEM.md` na saída da geração de imagem.

Última atualização: [AAAA-MM-DD]

---

## Modificadores universais

Sempre inclua. Cole no fim de todo prompt.

**Sempre incluir**

- `paleta de cores: [Musgo #2F4A3A, Terracota #C4643F, Areia #F1E9DC]` (troque pela sua paleta)
- `composição: regra dos terços, espaço vazio de um lado`
- `luz: luz natural suave da manhã, sem sombras duras`
- `clima: gente que faz, confiante, pé no chão`
- `proporção: [16:9 para o topo do site, 1:1 para redes sociais, 4:5 para o feed, 9:16 para stories e reels]`

**Sempre excluir**

- `--no reflexo de lente, neon, cyberpunk, glitch, frase motivacional, cérebro-robô, clichê de lâmpada, aperto de mãos corporativo, seis dedos, membros extras, artefatos, texto, marca-d'água, logos de outras marcas`

## Midjourney

### Prompt-modelo

```
[TEMA em CENÁRIO] --style raw --ar [PROPORÇÃO] --v 6
paleta de cores: [lista da paleta]
composição: regra dos terços, espaço vazio à [esquerda/direita]
luz: luz natural suave da manhã
clima: [adjetivos de clima]
--no reflexo de lente, neon, cyberpunk, glitch, aperto de mãos corporativo, seis dedos, membros extras, artefatos, texto, marca-d'água
```

### Exemplo 1: foto para o topo do site, dona de estúdio ao lado do reformer

```
Dona de um estúdio de pilates com 120 alunos, em pé ao lado de um reformer, conferindo a agenda do dia no celular, sala de aula vazia ao fundo, luz da manhã entrando pela janela --style raw --ar 16:9 --v 6
paleta de cores: Musgo #2F4A3A, Areia #F1E9DC, Terracota #C4643F
composição: regra dos terços, pessoa à esquerda, espaço vazio à direita para o texto
luz: luz natural suave da manhã, janela lateral
clima: gente que faz, foco tranquilo
--no reflexo de lente, neon, cyberpunk, glitch, aperto de mãos corporativo, seis dedos, membros extras, artefatos, texto, marca-d'água
```

### Exemplo 2: close, mãos ajustando as molas do reformer

```
Close de mãos de uma instrutora ajustando as molas de um reformer de madeira clara, um celular apoiado no reformer com a tela apagada, piso de madeira --style raw --ar 4:5 --v 6
paleta de cores: Musgo #2F4A3A, Areia #F1E9DC, Terracota #C4643F
composição: regra dos terços, profundidade de campo rasa
luz: luz suave de janela vindo do alto à esquerda
clima: cuidado, rotina da primeira turma
--no reflexo de lente, neon, cyberpunk, texto, marca-d'água
```

### Exemplo 3: ilustração em vetor chapado

```
Ilustração em vetor chapado de uma grade semanal de horários de aula, com alguns horários preenchidos e um selo de check-in em destaque, perspectiva isométrica --ar 1:1 --v 6
paleta de cores: Musgo, Areia, Terracota, branco
composição: centralizada, bordas limpas
luz: chapada, sem degradês
clima: organização, clareza
--no renderização 3D, glitch, neon, texto dentro da grade
```

## Adobe Firefly

### Prompt-modelo

```
[TEMA em CENÁRIO], [ESTILO], [LUZ], [COMPOSIÇÃO]
tipo de conteúdo: [foto / ilustração / arte]
cor: use apenas [lista da paleta]
```

Ajuste na barra lateral: proporção, tipo de conteúdo, intensidade visual (sutil) e imagem de referência, se houver.

### Exemplo: foto de produto

```
Celular sobre o balcão da recepção de um estúdio de pilates, tela mostrando a agenda do dia com horários marcados, um vaso de planta e uma garrafa d'água ao lado, luz da manhã, profundidade de campo rasa
tipo de conteúdo: foto
cor: use apenas Musgo, Areia e Terracota
composição: regra dos terços, celular no terço superior direito, espaço vazio no canto inferior esquerdo
```

### Exemplo: ilustração editorial

```
Uma dona de estúdio diante de um quadro com a grade de horários da semana, metade rabiscada à mão e cheia de setas, metade organizada em blocos coloridos, postura confiante
tipo de conteúdo: arte
cor: use apenas a paleta da marca
composição: figura em três quartos, quadro à direita, espaço vazio à esquerda
```

## Nano Banana (geração de imagem do Google Gemini)

### Prompt-modelo

```
Um(a) [TEMA] em [CENÁRIO]. Estilo: [foto | ilustração]. Clima: [clima]. Luz: [luz]. Composição: [composição]. Paleta de cores: [lista de hex]. Proporção: [proporção]. Evitar: [estilos proibidos].
```

### Exemplo: banner do topo do site

```
Três instrutoras revisando juntas a grade de horários da semana impressa e presa na parede de um estúdio de yoga claro, uma delas apontando para um horário vago. Estilo: foto. Clima: prático, colaborativo. Luz: janela grande, luz do dia suave e difusa. Composição: regra dos terços, grupo à esquerda, parede à direita. Paleta de cores: #2F4A3A, #F1E9DC, #C4643F, #FFFFFF. Proporção: 16:9. Evitar: reflexo de lente, neon, glitch, seis dedos, aperto de mãos corporativo.
```

## Geração de imagem do ChatGPT

### Prompt-modelo

```
Produza uma imagem de [TEMA].
Estilo: [foto | vetor chapado | ilustração editorial].
Luz: [direção].
Composição: [regra, lado do espaço vazio].
Paleta de cores: use apenas estes valores hex: [lista].
Proporção: [proporção].
Não inclua: reflexo de lente, neon, cyberpunk, texto, marca-d'água, seis dedos, aperto de mãos corporativo.
```

### Exemplo: imagem para o feed

```
Produza uma imagem de uma dona de estúdio de pilates sentada à mesa da recepção, conferindo no notebook o painel de presença da semana, xícara de café na mão, antes da primeira aula do dia.
Estilo: foto.
Luz: luz suave de janela, quente, levemente dourada.
Composição: regra dos terços, pessoa à direita, espaço vazio à esquerda.
Paleta de cores: use apenas #2F4A3A, #F1E9DC, #C4643F, #FFFFFF.
Proporção: 4:5.
Não inclua: reflexo de lente, neon, cyberpunk, texto, marca-d'água, seis dedos, aperto de mãos corporativo.
```

## Canva IA

### Prompt-modelo

O Canva usa um prompt curto mais controles. Use este formato.

```
[TEMA], [ESTILO], [LUZ], [CLIMA], sem [estilos proibidos]
```

Escolha o estilo "foto" ou "ilustração", a proporção de acordo com o token da marca e cite as cores do kit da marca no campo do prompt.

### Exemplo: post único no Instagram

```
Instrutora de yoga desenrolando o tapete numa sala vazia antes da aula, celular no chão ao lado mostrando a lista de presença, luz suave da manhã pela janela, foto quente, sem reflexo de lente, sem aperto de mãos corporativo
```

## Prompts: faça e não faça

**Faça**

- Diga o tema primeiro, o cenário em segundo, o estilo em terceiro.
- Inclua a paleta completa em hex toda vez. Os modelos não lembram do histórico da sessão.
- Acrescente "sem texto" se houver risco de texto aparecer na imagem.
- Use referências nas ferramentas que aceitam. Envie o logo ou uma foto já aprovada.

**Não faça**

- Encadear dez modificadores sem estrutura.
- Pedir texto dentro da imagem. Crie o texto depois, no Figma ou no Canva.
- Pedir uma pessoa real pelo nome sem ter direito de uso da imagem dela.
- Usar "divertido", "moderno" ou "inovador" como única pista de estilo.

## Glossário de variáveis

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `[TEMA]` | Quem ou o que aparece na imagem | "Dona de estúdio de pilates" |
| `[CENÁRIO]` | Onde o tema está | "Na recepção do estúdio" |
| `[ESTILO]` | Foto, ilustração ou arte | "Foto, editorial" |
| `[LUZ]` | Direção e qualidade da luz | "Manhã suave, janela lateral" |
| `[COMPOSIÇÃO]` | Enquadramento e espaço vazio | "Regra dos terços, pessoa à esquerda" |
| `[CLIMA]` | Tom emocional | "Gente que faz, foco tranquilo" |
| `[PROPORÇÃO]` | 16:9, 1:1, 4:5, 9:16 | "16:9" |
| `[PALETA]` | Lista exata de hex | "#2F4A3A, #F1E9DC, #C4643F" |

## Como passar este arquivo para um agente de IA

```text
Carregue /03-visual/PROMPTS-DE-IMAGEM.md, /03-visual/IDENTIDADE-VISUAL.md e /03-visual/IMAGENS.md antes de gerar imagens.

Fluxo:
1. Identifique o caso de uso da imagem (topo do site, rede social, editorial, produto).
2. Escolha a ferramenta.
3. Copie o Prompt-modelo da ferramenta.
4. Preencha as variáveis.
5. Acrescente os modificadores universais de Sempre incluir.
6. Acrescente os modificadores universais de Sempre excluir.
7. Gere três variações. Fique com a que mais se aproxima de /03-visual/IMAGENS.md.
8. Registre o prompt final e a imagem escolhida em /03-visual/assets/registro-de-geracao.md, para a biblioteca crescer a cada uso.
```

Caminhos de referência: `/03-visual/PROMPTS-DE-IMAGEM.md`, `/03-visual/IMAGENS.md`, `/03-visual/IDENTIDADE-VISUAL.md`.
