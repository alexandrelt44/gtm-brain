# Calendário de 90 dias

Como preencher `08-conteudo/CALENDARIO.md` de forma que ele execute o plano: os canais e os donos do plano, os temas dos clusters e das ofertas, as provas que cada canal pode usar e só as peças que as horas do plano pagam.

## O que ler antes

| Arquivo | O que tirar |
| --- | --- |
| `/11-plano/PLANO-DE-UMA-PAGINA.md` | Canais, donos, visitas por canal; horas por pessoa no custo planejado (passo 6 da conta) |
| `/06-seo/CLUSTERS.md` | Cluster prioritário do trimestre, página pilar, satélites |
| `/06-seo/PALAVRAS-CHAVE.md` | Palavra-chave de cada peça do blog; termos sazonais |
| `/05-oferta/OFERTA.md` | Oferta que o trimestre empurra; CTA de cada peça |
| `/08-conteudo/PROVAS.md` | Provas e os canais aprovados para cada uma |
| `/01-icp/ICP.md` | Nome das personas, como estão escritos; `### Consumo de conteúdo` e `### Onde encontrar` |
| `/08-conteudo/BIBLIOTECA.md` | O que já existe para atualizar ou reaproveitar; a fila de atualização |
| `/02-voz/VOZ.md` | Tom por canal, se a regra do canal depende disso |

## 1. Frequência por canal

1. Uma linha por canal do plano, com o mesmo nome e o mesmo dono. Canal que a marca não vai usar fica numa linha "Não usamos", com o motivo em `## Detalhe por canal` ("a persona primária não está lá", "não cabe nas horas do plano"), e a data em que vale reavaliar.
2. Pergunte quantas horas cada formato leva para quem produz. Não estime sozinho.
3. Some, por pessoa, as horas por mês que a frequência pede. O total tem que caber nas horas dessa pessoa no custo planejado do plano. Se não cabe, baixe a frequência ou volte ao passo 6 da conta com a pessoa; não esconda a diferença.
4. Escreva `### Uma semana típica` dentro de `## Frequência por canal`, no lugar do exemplo da Cadência: um dia por linha, com o canal e o tipo de peça.

## 2. Plano contínuo de 90 dias

Treze semanas, começando na próxima segunda-feira. A coluna **Início** é a segunda-feira de cada semana.

- **Uma linha por peça** ou por série da semana ("Post x3").
- **Tema:** o assunto concreto da peça, com a ligação entre parênteses: `(cluster 2)`, `(oferta: Nome da oferta)` ou o ID da prova que a peça usa. Toda linha tem pelo menos uma ligação.
- **Persona:** o nome da persona como está no ICP.
- **Responsável:** o dono do canal no plano.
- **Status:** use sempre a mesma sequência, `Planejado`, `Briefing`, `Em redação`, `Rascunho`, `Agendado`, `Publicado`. Peça futura começa em `Planejado`, a não ser que a biblioteca mostre que já está em produção.

```md
| 1 | AAAA-MM-DD | Blog | Satélite | Tema concreto da peça (cluster 1) | Persona do ICP | Dono do canal | Planejado |
```

Apague a linha "Repita as linhas para as semanas 5 a 13" depois de escrever as 13 semanas.

## 3. Ordem das peças

- **O pilar puxa o trimestre.** Um pilar do cluster prioritário por trimestre, com os satélites antes e depois dele, conforme `CLUSTERS.md`.
- **Os outros canais distribuem a peça da semana.** A newsletter, as redes e o vídeo da semana são versões próprias do tema do blog, escritas para cada formato.
- **Prova com permissão para o canal.** Anúncio só usa depoimento com "Anúncios" nos usos aprovados de `PROVAS.md`. Prova `uso interno` não entra em nenhuma linha.
- **Datas do setor.** Feriados, meses fortes e fracos do cliente, termos sazonais de `PALAVRAS-CHAVE.md`. Semana de recesso fica com menos peças, não com zero linhas sem explicação.
- **Peça que depende de algo pendente** (um case em produção, uma página nova) diz a condição no tema: "se o CS-003 sair".

## 4. Detalhe por canal e fluxo

- Adapte as regras do template a cada canal do plano: troque "líder de conteúdo" pelo nome, troque o custo por lead alvo pelo da conta da marca, apague regra que não se aplica.
- Em `## Fluxo de produção e revisão`, diga quem edita e quem aprova, com nome, e quem confere peça que cita número.

## 5. Conferência

- Todo canal do calendário está no plano, com o mesmo dono.
- Toda linha tem tema concreto, persona do ICP e uma ligação (cluster, oferta ou prova).
- Nenhuma prova sem permissão para o canal da linha.
- As horas por pessoa cabem nas horas do plano.
- As 13 semanas estão preenchidas e cada **Início** é uma segunda-feira.

Diga à pessoa que o calendário é revisto toda semana: o que foi publicado muda para `Publicado` e entra na `BIBLIOTECA.md`, e uma semana nova entra no fim.
