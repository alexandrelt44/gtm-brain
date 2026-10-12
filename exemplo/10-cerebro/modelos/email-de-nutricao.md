# Modelo de email de nutrição

Um modelo de preencher lacunas para um único email dentro de uma sequência de nutrição. Copie, preencha toda `{{VARIÁVEL}}` e passe por um editor humano antes de agendar.

## Como os agentes usam este modelo

1. Carregue `/01-icp/ICP.md` para identificar `{{NOME_DA_PERSONA}}` e as dores de que você vai falar.
2. Carregue `/02-voz/VOZ.md` para as regras de frase.
3. Carregue `/05-oferta/OFERTA.md` para `{{NOME_DA_OFERTA}}` e a promessa principal.
4. Carregue `/08-conteudo/PROVAS.md` para escolher `{{PROVA}}`.
5. Carregue `/10-cerebro/playbooks/email.md` para as regras do canal, inclusive as de LGPD e consentimento.

## Variáveis

| Variável | Fonte | Exemplo |
| --- | --- | --- |
| `{{NOME_DA_PERSONA}}` | `/01-icp/ICP.md`, persona primária | "Andreia" |
| `{{PAPEL_DA_PERSONA}}` | `/01-icp/ICP.md`, papel da persona | "dona de estúdio" |
| `{{DOR}}` | `/01-icp/ICP.md`, dor principal | "passar a manhã cobrando aluna no WhatsApp" |
| `{{NOME_DA_OFERTA}}` | `/05-oferta/OFERTA.md` | "plano Estúdio da Cadência" |
| `{{PROMESSA}}` | `/05-oferta/OFERTA.md` | "a cobrança sai da mão da recepção no primeiro mês" |
| `{{PROVA}}` | `/08-conteudo/PROVAS.md` | "O Estúdio Lírio Pilates foi de 14 mensalidades atrasadas para 2 em dois meses (CS-001)." |
| `{{TEXTO_DO_CTA}}` | `/07-site/MAPA-DO-SITE.md`, caminho de conversão | "Agende uma demonstração de 30 minutos" |
| `{{URL_DO_CTA}}` | `/07-site/MAPA-DO-SITE.md` | "https://cadencia.example/demonstracao?utm_source=email&utm_medium=nutricao&utm_campaign=[campanha]" |
| `{{NOME_DO_REMETENTE}}` | Pessoa que envia o email | "Marina" |
| `{{CARGO_DO_REMETENTE}}` | Cargo de quem envia | "CEO e cofundadora, Cadência" |

---

## Opções de assunto

Gere três. Cada uma com menos de 45 caracteres. Sem emoji. Sem tudo em maiúsculas.

1. `{{ASSUNTO_A}}`
2. `{{ASSUNTO_B}}`
3. `{{ASSUNTO_C}}`

## Pré-cabeçalho

Menos de 85 caracteres. Desenvolve o assunto sem repetir.

`{{PRE_CABECALHO}}`

## Corpo

Oi, `{{NOME_DA_PERSONA}}`,

Vou ser breve.

Quase toda `{{PAPEL_DA_PERSONA}}` com quem eu converso me diz a mesma coisa: `{{DOR}}`. Raramente falta ferramenta. Quase sempre o problema é que o trabalho continua dependendo de alguém lembrar de fazer.

Foi para isso que criamos o `{{NOME_DA_OFERTA}}`: `{{PROMESSA}}`.

Um exemplo. `{{PROVA}}`

Se isso fez sentido, `{{TEXTO_DO_CTA}}` em `{{URL_DO_CTA}}`. São 30 minutos. Eu te mostro, com os seus números, o que mudaria no seu caso.

Sem pressão, de um jeito ou de outro.

`{{NOME_DO_REMETENTE}}`
`{{CARGO_DO_REMETENTE}}`

---

## Bloco de compliance

Inclua no rodapé. Atualize quando a orientação jurídica mudar. É a forma prática de cumprir a LGPD no email: dizer por que a pessoa recebe, permitir sair em um clique e identificar quem envia.

```
Você recebe este email porque se cadastrou em [evento ou página] e autorizou o envio.
Não quer mais receber? Descadastre-se: [link de descadastro]
[Razão social], CNPJ [00.000.000/0000-00], [endereço]
```

## Checklist antes do envio

- [ ] Assunto com menos de 45 caracteres.
- [ ] Pré-cabeçalho com menos de 85 caracteres.
- [ ] Corpo com menos de 150 palavras.
- [ ] Nível de leitura: quem tem ensino médio completo entende na primeira leitura.
- [ ] Sem travessão, sem "alavancar", sem "sem atrito".
- [ ] Um CTA. Um link.
- [ ] Prova citada.
- [ ] UTMs na URL do CTA.
- [ ] Remetente é uma pessoa real, com nome.
- [ ] Toda a audiência deu consentimento; bloco de compliance com link de descadastro funcionando.
- [ ] Revisado por um editor humano.

## Exemplo

```
Assunto: a cobrança não é trabalho da recepção
Pré-cabeçalho: O que mudou no Lírio Pilates em dois meses, sem trocar ninguém.

Oi, Andreia,

Vou ser breve.

Quase toda dona de estúdio com quem eu converso me diz a mesma coisa: passa a manhã cobrando aluna no WhatsApp. Raramente falta ferramenta. Quase sempre o problema é que o trabalho continua dependendo de alguém lembrar de fazer.

Foi para isso que criamos o plano Estúdio da Cadência: a cobrança sai da mão da recepção no primeiro mês.

Um exemplo. O Estúdio Lírio Pilates, em Joinville, foi de 14 mensalidades atrasadas para 2 em dois meses.

Se isso fez sentido, agende uma demonstração de 30 minutos em cadencia.example/demonstracao. Eu te mostro, com os seus números, o que mudaria no seu caso.

Sem pressão, de um jeito ou de outro.

Marina
CEO e cofundadora, Cadência
```

A Cadência, o Estúdio Lírio Pilates, as pessoas e os números são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/modelos/email-de-nutricao.md.

Preencha toda {{VARIÁVEL}} com valores tirados dos arquivos indicados na tabela de variáveis. Não invente conteúdo. Se uma variável não existir nos arquivos de origem, sinalize.

Escreva o corpo em português do Brasil, com menos de 150 palavras. Rode o checklist antes do envio. Entregue o email pronto para agendar.
```

Caminhos de referência: `/10-cerebro/modelos/email-de-nutricao.md`, `/10-cerebro/playbooks/email.md`, `/01-icp/ICP.md`, `/05-oferta/OFERTA.md`, `/08-conteudo/PROVAS.md`.
