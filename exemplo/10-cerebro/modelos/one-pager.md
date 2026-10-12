# Modelo de one-pager

Um modelo de preencher lacunas para um one-pager de vendas, de parceiros ou de campanha. O objetivo é que qualquer pessoa ou qualquer agente produza um one-pager útil em menos de 30 minutos.

## Como os agentes usam este modelo

1. Carregue `/05-oferta/OFERTA.md` para a oferta.
2. Carregue `/08-conteudo/PROVAS.md` para as provas.
3. Carregue `/03-visual/IDENTIDADE-VISUAL.md` e `/04-design-system/theme.json` para o visual.
4. Carregue `/02-voz/VOZ.md` para a voz.

## Variáveis

| Variável | Fonte |
| --- | --- |
| `{{TITULO}}` | Nome da oferta + resultado |
| `{{CHAMADA}}` | Promessa principal |
| `{{PARA_QUEM}}` | Persona de `/01-icp/ICP.md` |
| `{{O_QUE}}` | Descrição da oferta |
| `{{COMO}}` | Passos |
| `{{POR_QUE_E_DIFERENTE}}` | Diferenciais |
| `{{PROVAS}}` | As 3 provas mais fortes |
| `{{PRECO}}` | Faixa de preço |
| `{{TEXTO_DO_CTA}}` e `{{URL_DO_CTA}}` | Caminho de conversão |

---

## Estrutura (PDF de uma página ou impresso)

### Faixa superior

- Logo no canto superior esquerdo.
- Título no canto superior direito: `{{TITULO}}`.
- Linha horizontal usando `color.neutral.200`.

### Bloco da chamada

- `{{CHAMADA}}` em `fs.h1`, peso 700.
- Subtítulo de uma frase em `fs.body.lg`.

### Para quem

- Cabeçalho: "Para quem é"
- Três linhas descrevendo o público, tiradas de `/01-icp/ICP.md`.

### O quê

- Cabeçalho: "O que você recebe"
- De quatro a seis itens tirados das entregas em `/05-oferta/OFERTA.md`.

### Como

- Cabeçalho: "Como funciona"
- De três a cinco passos numerados.

### Por que é diferente

- Cabeçalho: "Por que fazemos melhor"
- Três itens tirados dos diferenciais em `/05-oferta/OFERTA.md`.

### Prova

- Cabeçalho: "Provas"
- Um depoimento com nome, cargo e empresa.
- Um dado com fonte.
- Uma faixa de logos.

### Preço

- Cabeçalho: "Investimento"
- Uma linha com o preço ou a faixa "a partir de".
- Uma linha sobre o que muda o preço.

### CTA

- Cabeçalho: "Próximo passo"
- Botão `{{TEXTO_DO_CTA}}` levando a `{{URL_DO_CTA}}`.
- QR code para a versão impressa.

### Faixa do rodapé

- Razão social e CNPJ.
- Email de contato.
- Telefone ou WhatsApp, se fizer sentido.
- URL do site.
- Versão do arquivo e data.

## Regras de layout

- Uma página só. Formato A4.
- Margens de 12 a 15 mm.
- Cores tiradas de `/04-design-system/theme.json`.
- Tipografia tirada da escala tipográfica. Não invente tamanhos.
- Tudo em maiúsculas só nos cabeçalhos, e com moderação.

## Casos de uso

### One-pager de vendas

- Material para deixar depois da primeira conversa.
- Encurta o tempo entre o interesse e o retorno.

### One-pager de parceiros

- Para parceiros de indicação e de ecossistema.
- Explica como reconhecer uma indicação que tem fit.

### One-pager de campanha

- Apoia uma campanha específica de `/10-cerebro/campanhas/`.
- Inclui CTAs e UTMs próprios da campanha.

## Checklist antes de publicar

- [ ] Cabe em uma página.
- [ ] Regras de voz e terminologia seguidas.
- [ ] Preço correto e datado.
- [ ] Provas citadas.
- [ ] Cores e tipografia da marca aplicadas.
- [ ] CTA com UTMs.
- [ ] PDF exportado com texto acessível (não rasterizado).
- [ ] Versão do arquivo e data no rodapé.

## Exemplo: one-pager de vendas do plano Rede da Cadência

- Título: Cadência Rede.
- Chamada: Todas as unidades da sua rede num painel só, com a cobrança no automático.
- Para quem: gestoras de redes de pilates, yoga e funcional com 3 a 8 unidades; sócias que hoje fecham o mês juntando planilhas de cada unidade; redes que querem padronizar agenda e cobrança antes de abrir a próxima unidade.
- O que você recebe: painel consolidado de todas as unidades, agenda e reposição de aulas por unidade, cobrança recorrente com Pix automático e cartão, app do aluno, relatórios de presença e inadimplência por unidade, implantação assistida.
- Como funciona: chamada de início, importação dos dados de cada unidade, ativação da cobrança, treinamento das recepções, revisão dos números no fim do primeiro mês.
- Por que fazemos melhor: feito para estúdio, não para academia grande; criado por uma ex-dona de estúdio; cobrança e presença no mesmo lugar, então falta e reposição entram na conta.
- Provas: depoimento de Paula Siqueira, sócia-diretora da Rede Núcleo Funcional (4 unidades, Goiânia) (`T-003`); fechamento do mês caiu de 3 dias para meio dia (`CS-003`); faixa com os logos de três redes clientes.
- Preço: R$ 449/mês por unidade, a partir de 3 unidades. Implantação assistida de R$ 990.
- CTA: Agende uma demonstração com os números da sua rede.

A Cadência, a Rede Núcleo Funcional, a Paula, os IDs e os números são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/modelos/one-pager.md.

Preencha toda {{VARIÁVEL}}. Use os arquivos listados como fonte dos dados. Não invente.

Escreva em português do Brasil. Produza o one-pager como um bloco em Markdown mais uma nota de layout para o designer, ou como uma exportação já formatada. Rode o checklist antes de publicar. Entregue o material pronto para passar ao design.
```

Caminhos de referência: `/10-cerebro/modelos/one-pager.md`, `/05-oferta/OFERTA.md`, `/08-conteudo/PROVAS.md`, `/03-visual/IDENTIDADE-VISUAL.md`, `/04-design-system/theme.json`.
