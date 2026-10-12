# Provas

## Como usar este arquivo

- **O que entra:** o banco completo de prova social. Depoimentos, cases, avaliações, capturas de tela, conteúdo gerado por clientes (UGC), certificações, logos e dados.
- **Como os agentes leem:** os agentes buscam provas aqui quando escrevem copy. Toda afirmação importante sai acompanhada de uma prova citada.
- **Frequência de atualização:** registre cada novo depoimento, avaliação ou case em até 48 horas após a captura. Faça uma auditoria por trimestre.

## Checklist para agentes de IA

- [ ] Legível por máquina: um item de prova por linha de lista ou de tabela.
- [ ] Estruturado: depoimentos, cases, avaliações, logos, UGC e dados em seções separadas.
- [ ] Fonte única da verdade: nenhum documento paralelo de provas na pasta do time comercial.
- [ ] Versionado: data da última atualização.
- [ ] Citável: os agentes citam `/08-conteudo/PROVAS.md` em toda peça de conteúdo que faz uma afirmação.

Última atualização: [AAAA-MM-DD]

---

## Controle de permissões

Todo depoimento e toda foto precisam de autorização por escrito antes de serem publicados fora da empresa. Pela LGPD, guarde o termo assinado (uso de nome, imagem e depoimento), com a finalidade e o prazo de uso.

| ID do item | Origem | Autorização registrada | Validade | Local do termo assinado |
| --- | --- | --- | --- | --- |
| [ID] | [Nome do cliente] | [AAAA-MM-DD] | [AAAA-MM-DD ou sem prazo] | [Caminho do termo assinado] |

## Depoimentos

Um registro por depoimento. Mantenha a citação literal (`[LITERAL]`).

### Depoimento T-001

- **Citação:** "[Citação exata]"
- **Nome:** [Nome completo]
- **Cargo:** [Cargo]
- **Empresa:** [Empresa]
- **Segmento:** [Setor]
- **Casos de uso:** [Para que usa nosso produto ou serviço]
- **Origem:** [Call de vendas, avaliação, e-mail, rede social, WhatsApp]
- **Data da captura:** [AAAA-MM-DD]
- **Autorização:** [Sim, com referência ao controle de permissões]
- **Usos aprovados:** [Site, case, anúncios, e-mail, redes sociais]

### Depoimento T-002

Repita o formato.

## Índice de cases

Aponte para os cases completos. O texto completo de cada case fica na página do case no site (coluna URL, ver `/07-site/MAPA-DO-SITE.md`). O resumo de cada case, com antes, mudança, resultado e permissão, vem logo depois da tabela, num registro por case.

| ID | Cliente | Segmento | Serviço | Métrica principal | URL | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CS-001 | [Cliente] | [Segmento] | [Serviço] | [Métrica] | [/cases/slug] | [No ar] |
| CS-002 | [Cliente] | [Segmento] | [Serviço] | [Métrica] | [/cases/slug] | [No ar] |

### CS-001 · [Cliente, cidade (UF)]

- **Cliente:** [Nome do cliente, quem fala por ele, porte]
- **Antes:** [Como era o problema antes, com número se houver e a fonte]
- **O que mudou:** [O que o cliente passou a fazer com o produto ou serviço. Cite a capacidade (CAP-) quando houver]
- **Resultado:** [Métrica de antes para depois, em quanto tempo, com a fonte. Sem número medido, escreva (pendente)]
- **Permissão:** [Data do termo assinado e o que ele autoriza: nome, números, logo]
- **Depoimento ligado:** [T-001, ou "nenhum por enquanto"]

### CS-002 · [Cliente, cidade (UF)]

Repita o formato.

## Avaliações

Avaliações em plataformas de terceiros, com a fonte citada.

| Plataforma | Nota | Citação | Autor | Data | URL |
| --- | --- | --- | --- | --- | --- |
| [Google] | [5 estrelas] | "[Citação]" | [Nome de quem avaliou ou "Avaliador verificado"] | [Data] | [URL] |
| [Capterra] | [5 estrelas] | "[Citação]" | [Nome de quem avaliou] | [Data] | [URL] |

## Capturas de tela

Capturas do produto, de painéis ou de resultados, prontas para usar em páginas e materiais.

| Caminho do arquivo | Descrição | Usos aprovados |
| --- | --- | --- |
| [/08-conteudo/capturas/arquivo.png] | [O que mostra] | [Site, redes sociais, vendas] |

## Registro de UGC

Conteúdo gerado por clientes e aprovado para uso.

| Origem | URL | Autor | Data da autorização | Usos aprovados |
| --- | --- | --- | --- | --- |
| [Instagram] | [URL] | [Nome, @perfil] | [Data] | [Usos] |

## Prova de capacidade

O que a empresa já construiu e opera, ligado à prova que mostra que funciona.

| ID | O quê | Prova | Uso |
| --- | --- | --- | --- |
| CAP-001 | [O que a empresa faz ou opera, em uma frase concreta] | [IDs das provas que mostram que funciona: CS-, D-, T-] | [Páginas, demonstrações e arquivos onde a capacidade aparece] |

## Dados e benchmarks

Números que publicamos, cada um com fonte nomeada e data. Dado sem fonte não entra.

| ID | Afirmação | Valor | Fonte | Data | Uso |
| --- | --- | --- | --- | --- | --- |
| D-001 | [Frase da afirmação que o número sustenta] | [Número, com período e base] | [Nome da fonte, com link quando houver] | [AAAA-MM-DD] | [Onde o dado aparece, ou "Uso interno. Não publicar"] |
| D-002 | [Frase da afirmação que o número sustenta] | [Número, com período e base] | [Nome da fonte, com link quando houver] | [AAAA-MM-DD] | [Onde o dado aparece, ou "Uso interno. Não publicar"] |

## Logos

Logos de clientes aprovados para uso no site e em materiais de venda.

| Cliente | Caminho do arquivo | Usos aprovados | Cláusula de uso de logo registrada |
| --- | --- | --- | --- |
| [Cliente] | [/03-visual/assets/logos/cliente.svg] | [Site, apresentação] | [Sim, referência do contrato] |

## Certificações e selos

| Selo | Emissor | Válido até | Caminho do arquivo |
| --- | --- | --- | --- |
| [Selo] | [Emissor] | [Data] | [/03-visual/assets/selos/arquivo.svg] |

## Mapa afirmação → prova

O bloco mais poderoso deste arquivo. Ligue cada afirmação pública à prova que você vai citar.

| Afirmação pública | Tipo de prova | ID da prova | Onde é usada |
| --- | --- | --- | --- |
| [Frase da afirmação] | [Depoimento / Case / Dado] | [T-001 / CS-002 / D-001] | [Topo da home, página de serviço, apresentação de vendas] |
| [Frase da afirmação] | [Depoimento] | [T-003] | [Seção de provas da home] |

## Lacunas de prova

Afirmações que a marca quer fazer, mas que ainda não têm prova registrada neste arquivo. Enquanto estiverem aqui, não aparecem em peça publicada. Cada linha diz o que falta e quem vai buscar.

| Afirmação desejada | Prova que falta | Como conseguir | Responsável | Prazo |
| --- | --- | --- | --- | --- |
| [Frase da afirmação] | [Depoimento, case, dado] | [Entrevista, pesquisa, relatório do produto] | [Nome] | [AAAA-MM-DD] |

## Exemplo

### Afirmação

> "Estúdios que passam a cobrar a mensalidade pela Cadência, com Pix automático, reduzem a inadimplência já no primeiro trimestre."

### Prova citada

- **Depoimento:** T-001, Renata Vieira, dona do Estúdio Lírio Pilates (Joinville). "Eu passava a segunda-feira inteira mandando mensagem no WhatsApp cobrando aluna. Hoje a cobrança sai sozinha e eu volto a dar aula." `[LITERAL]`
- **Case:** CS-001, Estúdio Lírio Pilates.
- **Dado:** D-001, comparação interna da inadimplência antes e depois da ativação do Pix automático nos estúdios clientes, extraída do painel da Cadência. `[COMPROVADO]`

### Lacuna registrada

- **Afirmação desejada:** "Redes com 4 ou mais unidades fecham o mês em metade do tempo."
- **Prova que falta:** dado medido e depoimento de gestora de rede. O case da Rede Núcleo Funcional (Goiânia) está em produção. Até sair, a afirmação fica fora das peças. `[HIPÓTESE]`

Nomes, citações e números deste exemplo são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /08-conteudo/PROVAS.md antes de escrever qualquer conteúdo que faça uma afirmação.

Fluxo:
1. Para cada afirmação do rascunho, escolha um item de prova deste arquivo.
2. Referencie o item pelo ID no rascunho interno (ex.: "[prova: T-001]").
3. Na versão publicada, transforme a referência em atribuição visível (citação + nome + empresa, ou dado com link).
4. Se a afirmação não tem prova, remova a afirmação ou registre-a em "Lacunas de prova" para uma pessoa buscar a prova.

Nunca invente citação, nome de cliente ou número.
```

Caminhos de referência: `/08-conteudo/PROVAS.md`, `/08-conteudo/BIBLIOTECA.md`, `/08-conteudo/modelos/estudo-de-caso.md`.
