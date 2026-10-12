# Provas

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PAINEL]` dados de uso do produto (painel interno da Cadência)
- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio e gestoras de rede, janeiro a março de 2026
- `[SUPORTE]` tickets e conversas de suporte no WhatsApp, 2025 e 2026

## Como usar este arquivo

- **O que entra:** o banco completo de prova social. Depoimentos, cases, avaliações, capturas de tela, conteúdo gerado por clientes (UGC), certificações, logos e dados.
- **Como os agentes leem:** os agentes buscam provas aqui quando escrevem copy. Toda afirmação importante sai acompanhada de uma prova citada.
- **Frequência de atualização:** registre cada novo depoimento, avaliação ou case em até 48 horas após a captura. Faça uma auditoria por trimestre.

## Checklist para agentes de IA

- [x] Legível por máquina: um item de prova por linha de lista ou de tabela.
- [x] Estruturado: depoimentos, cases, avaliações, logos, UGC e dados em seções separadas.
- [x] Fonte única da verdade: nenhum documento paralelo de provas na pasta do time comercial.
- [x] Versionado: data da última atualização.
- [x] Citável: os agentes citam `/08-conteudo/PROVAS.md` em toda peça de conteúdo que faz uma afirmação.

Última atualização: 2026-10-01

---

## Controle de permissões

Todo depoimento e toda foto precisam de autorização por escrito antes de serem publicados fora da empresa. Pela LGPD, guarde o termo assinado (uso de nome, imagem e depoimento), com a finalidade e o prazo de uso.

| ID do item | Origem | Autorização registrada | Validade | Local do termo assinado |
| --- | --- | --- | --- | --- |
| T-001 | Renata Vieira, Estúdio Lírio Pilates | 2026-03-20 | 2028-03-20 | Drive da Cadência, pasta Termos de uso de imagem, arquivo `2026-03-lirio-pilates.pdf` |
| T-002 | Joana Prates, Casa Ahimsa Yoga | 2026-06-02 | 2028-06-02 | Drive da Cadência, pasta Termos de uso de imagem, arquivo `2026-06-casa-ahimsa.pdf` |
| CS-001 | Estúdio Lírio Pilates | 2026-03-20 | 2028-03-20 | Mesmo termo de T-001, com cláusula de números e logo |
| CS-002 | Casa Ahimsa Yoga | 2026-06-02 | 2028-06-02 | Mesmo termo de T-002, com cláusula de números e logo |
| CS-003 | Rede Núcleo Funcional | Termo enviado em 2026-09-18, sem assinatura | (pendente) | Aguardando retorno de Eduardo Lacerda |

## Depoimentos

Um registro por depoimento. Mantenha a citação literal (`[LITERAL]`).

### Depoimento T-001

- **Citação:** "Eu passava a segunda-feira inteira mandando mensagem no WhatsApp cobrando aluna. Hoje a cobrança sai sozinha e eu volto a dar aula." `[LITERAL]`
- **Nome:** Renata Vieira
- **Cargo:** Dona e instrutora
- **Empresa:** Estúdio Lírio Pilates (Joinville, SC)
- **Segmento:** Estúdio de pilates, 1 unidade
- **Casos de uso:** Cobrança recorrente por Pix automático, agenda das turmas e controle de presença.
- **Origem:** Entrevista de case por vídeo com Lívia Moraes (sucesso do cliente) `[ENTREVISTAS §3]`
- **Data da captura:** 2026-03-12
- **Autorização:** Sim, termo registrado no controle de permissões (T-001).
- **Usos aprovados:** Site, case, anúncios, e-mail, redes sociais.

### Depoimento T-002

- **Citação:** "A aluna remarca sozinha pelo celular e a turma não fica com buraco." `[LITERAL]`
- **Nome:** Joana Prates
- **Cargo:** Sócia
- **Empresa:** Casa Ahimsa Yoga (Recife, PE)
- **Segmento:** Estúdio de yoga, 1 unidade
- **Casos de uso:** Reposição de faltas pelo app do aluno e agenda das turmas.
- **Origem:** Conversa de acompanhamento no WhatsApp, depois confirmada por escrito `[SUPORTE]`
- **Data da captura:** 2026-05-20
- **Autorização:** Sim, termo registrado no controle de permissões (T-002).
- **Usos aprovados:** Site, case, e-mail, redes sociais. Anúncios não aprovados.

## Índice de cases

Aponte para os cases completos. O texto completo de cada case fica na página do case no site (coluna URL, ver `/07-site/MAPA-DO-SITE.md`). O resumo de cada case, com antes, mudança, resultado e permissão, vem logo depois da tabela.

| ID | Cliente | Segmento | Serviço | Métrica principal | URL | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CS-001 | Estúdio Lírio Pilates | Pilates, 1 unidade | Plano Estúdio com Pix automático | Inadimplência de 18% para 6% em 8 semanas | `/cases/estudio-lirio-pilates` | No ar |
| CS-002 | Casa Ahimsa Yoga | Yoga, 1 unidade | Plano Estúdio com app do aluno | Faltas repostas de 35% para 80% em um trimestre | `/cases/casa-ahimsa-yoga` | No ar |
| CS-003 | Rede Núcleo Funcional | Treino funcional, 4 unidades | Plano Rede com painel consolidado | Sem número publicado ainda | `/cases/rede-nucleo-funcional` | Em produção |

### CS-001 · Estúdio Lírio Pilates, Joinville (SC)

- **Cliente:** Estúdio Lírio Pilates, de Renata Vieira. Uma unidade, cerca de 160 alunos.
- **Antes:** a cobrança era feita por mensagem no WhatsApp, aluna por aluna, toda segunda-feira. A inadimplência estava em 18% das mensalidades do mês. `[COMPROVADO]` `[PAINEL]`
- **O que mudou:** o estúdio passou a cobrar por Pix automático, com conciliação feita pela própria Cadência (CAP-001). A Renata parou de mandar cobrança manual.
- **Resultado:** inadimplência de 18% para 6% em 8 semanas depois da ativação do Pix automático. `[COMPROVADO]` `[PAINEL]`
- **Permissão:** termo assinado em 2026-03-20, com uso de nome, números e logo (ver controle de permissões).
- **Depoimento ligado:** T-001.

### CS-002 · Casa Ahimsa Yoga, Recife (PE)

- **Cliente:** Casa Ahimsa Yoga, de Joana Prates e sócia. Uma unidade, turmas de manhã e à noite.
- **Antes:** a reposição de faltas era combinada por mensagem com a recepção. Só 35% das faltas viravam aula reposta, e muitas turmas rodavam com vagas vazias. `[COMPROVADO]` `[PAINEL]`
- **O que mudou:** a reposição passou para o app do aluno. A aluna escolhe a vaga livre sozinha, dentro das regras do estúdio.
- **Resultado:** faltas repostas passaram de 35% para 80% em um trimestre. `[COMPROVADO]` `[PAINEL]`
- **Permissão:** termo assinado em 2026-06-02, com uso de nome, números e logo. Anúncios ficam de fora.
- **Depoimento ligado:** T-002.

### CS-003 · Rede Núcleo Funcional, Goiânia (GO)

- **Cliente:** Rede Núcleo Funcional, 4 unidades. Champion: Carla Mendes. Decisor: Eduardo Lacerda.
- **Antes:** cada unidade fechava o mês numa planilha própria, e a sede consolidava tudo à mão. `[OBSERVADO]` `[ENTREVISTAS §9]`
- **O que mudou:** as 4 unidades entraram no plano Rede, com painel consolidado.
- **Resultado:** (pendente) case em produção, sem número publicado ainda. A aposta é que o fechamento do mês caia pela metade. `[HIPÓTESE]`
- **Permissão:** termo enviado em 2026-09-18 e ainda sem assinatura. Nada deste case sai em peça publicada.
- **Depoimento ligado:** nenhum por enquanto.

## Avaliações

Avaliações em plataformas de terceiros, com a fonte citada.

| Plataforma | Nota | Citação | Autor | Data | URL |
| --- | --- | --- | --- | --- | --- |
| Google Meu Negócio | 4,8 de 5 (63 avaliações) | "A cobrança no Pix automático foi o que me fez trocar de sistema." | Avaliadora verificada | 2026-08-14 | Perfil da Cadência no Google Meu Negócio |
| Google Meu Negócio | 5 estrelas | "O suporte responde no WhatsApp no mesmo dia, e a implantação foi tranquila." | Avaliadora verificada | 2026-09-03 | Perfil da Cadência no Google Meu Negócio |

## Capturas de tela

Capturas do produto, de painéis ou de resultados, prontas para usar em páginas e materiais.

| Caminho do arquivo | Descrição | Usos aprovados |
| --- | --- | --- |
| `/08-conteudo/capturas/agenda-recepcao.png` | Agenda do dia no celular da recepção, com turmas cheias e vagas livres | Site, redes sociais, vendas |
| `/08-conteudo/capturas/cobranca-pix-automatico.png` | Tela de cobranças do mês com Pix automático conciliado (dados de demonstração) | Site, vendas |
| `/08-conteudo/capturas/app-reposicao.png` | App do aluno mostrando a escolha de uma vaga de reposição | Site, redes sociais, vendas |

## Registro de UGC

Conteúdo gerado por clientes e aprovado para uso.

| Origem | URL | Autor | Data da autorização | Usos aprovados |
| --- | --- | --- | --- | --- |
| Instagram (stories) | Arquivo salvo no Drive, pasta UGC | Estúdio Lírio Pilates, perfil do estúdio | 2026-03-20 | Redes sociais, site |
| Instagram (reel) | Arquivo salvo no Drive, pasta UGC | Casa Ahimsa Yoga, perfil do estúdio | 2026-06-02 | Redes sociais |

## Prova de capacidade

O que a Cadência já construiu e opera, ligado à prova que mostra que funciona.

| ID | O quê | Prova | Uso |
| --- | --- | --- | --- |
| CAP-001 | Pix automático com conciliação integrada: a mensalidade é cobrada todo mês e a baixa entra sozinha na ficha do aluno | CS-001, D-001, T-001 | Página `/cobranca`, demonstrações, `/05-oferta/OFERTA.md` |

## Dados e benchmarks

Números que publicamos, cada um com fonte nomeada e data. Dado sem fonte não entra.

| ID | Afirmação | Valor | Fonte | Data | Uso |
| --- | --- | --- | --- | --- | --- |
| D-001 | Estúdios que ativam o Pix automático reduzem a inadimplência | Queda média de 9 pontos percentuais em 90 dias, 112 estúdios `[COMPROVADO]` | `[PAINEL]` comparação interna antes e depois da ativação | 2026-09-15 | Página `/cobranca`, pilar do cluster 1, anúncios |
| D-002 | Churn mensal da base | 2,1% (média dos últimos 6 meses) `[COMPROVADO]` | `[PAINEL]` sistema de cobrança da Cadência | 2026-09-30 | Uso interno: plano, revisão mensal. Não publicar |
| D-003 | Prazo médio de implantação com a implantação assistida | 5 dias úteis `[COMPROVADO]` | `[PAINEL]` registro de implantações | 2026-09-30 | Página `/precos`, demonstrações. O site promete 5 dias úteis, mas a implantação da Casa Ahimsa Yoga levou 7 (registro em `/05-oferta/GANHOS-E-PERDAS.md`) |

## Logos

Logos de clientes aprovados para uso no site e em materiais de venda.

| Cliente | Caminho do arquivo | Usos aprovados | Cláusula de uso de logo registrada |
| --- | --- | --- | --- |
| Estúdio Lírio Pilates | `/03-visual/assets/logos/estudio-lirio-pilates.svg` | Site, apresentação | Sim, termo de 2026-03-20 |
| Casa Ahimsa Yoga | `/03-visual/assets/logos/casa-ahimsa-yoga.svg` | Site, apresentação | Sim, termo de 2026-06-02 |
| Rede Núcleo Funcional | Ainda não recebido | Nenhum | Não. Aguarda o termo de CS-003 |

## Certificações e selos

| Selo | Emissor | Válido até | Caminho do arquivo |
| --- | --- | --- | --- |
| Nenhum selo registrado | n/a | n/a | n/a |

A Cadência ainda não tem certificação de terceiros. Não use selo, prêmio ou "certificado" em nenhuma peça. `[COMPROVADO]`

## Mapa afirmação → prova

O bloco mais poderoso deste arquivo. Ligue cada afirmação pública à prova que você vai citar.

| Afirmação pública | Tipo de prova | ID da prova | Onde é usada |
| --- | --- | --- | --- |
| A cobrança sai sozinha e a dona do estúdio volta a dar aula. | Depoimento + capacidade | T-001, CAP-001 | Topo da página `/cobranca`, anúncios do cluster 1 |
| Estúdios que passam para o Pix automático reduzem a inadimplência já no primeiro trimestre. | Case + dado | CS-001, D-001 | Topo da home, pilar "como diminuir inadimplência em academia" |
| A aluna remarca sozinha e a turma não fica com buraco. | Depoimento + case | T-002, CS-002 | Página `/agenda`, página `/yoga`, carrosséis do cluster 2 |
| O estúdio começa a usar a Cadência em cerca de uma semana. | Dado | D-003 | Página `/precos`, demonstração. Revisar depois de decidir o prazo publicado (D-003) |
| A Cadência atende estúdios de pilates, yoga e funcional. | Case | CS-001, CS-002 | Home, página `/sobre` |

## Lacunas de prova

Afirmações que a marca quer fazer, mas que ainda não têm prova registrada neste arquivo. Enquanto estiverem aqui, não aparecem em peça publicada. Cada linha diz o que falta e quem vai buscar.

| Afirmação desejada | Prova que falta | Como conseguir | Responsável | Prazo |
| --- | --- | --- | --- | --- |
| Redes com 4 ou mais unidades fecham o mês em metade do tempo. `[HIPÓTESE]` | Case CS-003 com número medido e depoimento de gestora de rede | Terminar o case da Rede Núcleo Funcional e medir o tempo de fechamento antes e depois | Lívia Moraes | 2026-11-30 |
| Estúdios de treino funcional reduzem faltas com a Cadência. `[HIPÓTESE]` | Case ou dado de um estúdio de funcional | Puxar do painel a taxa de reposição dos estúdios de funcional `[PAINEL]` | Bruna Alves | 2026-12-15 |
| Instrutores que abrem o próprio estúdio já começam organizados. `[HIPÓTESE]` | Depoimento de quem abriu o estúdio já usando a Cadência | Entrevistar 3 clientes do plano Essencial com menos de 1 ano de estúdio | Bruna Alves | 2027-01-31 |

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
