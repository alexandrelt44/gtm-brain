# Receita de campanha: reengajamento

Uma sequência de 3 toques para acordar leads e contatos parados, que não interagem há 90 dias ou mais. O objetivo é mostrar valor de novo, confirmar se eles ainda querem ouvir você e limpar a lista tirando quem não quer.

---

## Quando usar esta receita

- O contato não abre nem clica há 90 dias ou mais.
- O contato ainda está no seu CRM ou na sua lista de e-mail.
- O contato já interagiu antes (não rode isto em contatos frios que nunca deram consentimento, o que também esbarra na LGPD).

## Insumos necessários

| Arquivo | O que você puxa |
|---|---|
| `/01-icp/ICP.md` | Lembrar por que essa persona veio até nós no começo. |
| `/02-voz/VOZ.md` | Regras de voz. Reengajamento costuma ser mais direto e mais humano. |
| `/05-oferta/OFERTA.md` | A oferta atual, que pode ser diferente daquela pela qual a pessoa se cadastrou. |
| `/08-conteudo/BIBLIOTECA.md` | Os principais conteúdos de destaque que a pessoa pode ter perdido. |
| `/09-dados/MEDICAO.md` | Regras de segmentação entre "parado" e "ativo". |

## Estrutura da sequência

| # | Dia | Padrão de assunto | Função do corpo | CTA principal |
|---|---|---|---|---|
| 1 | Dia 0 | "Ainda quer receber nossos e-mails?" | Reconhecimento honesto + oferta de valor em uma linha | Clicar em "sim, quero continuar" |
| 2 | Dia 4 | "O último e-mail que vou mandar" | O melhor conteúdo recente, específico | Ler o conteúdo |
| 3 | Dia 10 | "Vou tirar você da lista em 5 dias" | Aviso claro de saída | Clicar para continuar |

## Regras de voz para esta sequência

- Honesto em vez de esperto. Nada de "sentimos sua falta" melado.
- Curto. Todo e-mail com menos de 120 palavras.
- Comece respeitando a caixa de entrada da pessoa. Nada de culpa.
- O e-mail "vou tirar você da lista em 5 dias" é educado e firme. Não é passivo-agressivo.

## Variáveis para trocar a cada envio

- `{{PRIMEIRO_NOME}}`
- `{{DIAS_SEM_INTERACAO}}` (calculado, geralmente 90 ou mais)
- `{{URL_DO_MELHOR_CONTEUDO_RECENTE}}` (peça de destaque de BIBLIOTECA.md)
- `{{NOME_DA_OFERTA}}` (a atual, não a antiga)

## Pontos de decisão

- Depois do e-mail 1: se clicar em "quero continuar", zere o contador de interação e volte o contato para a lista ativa.
- Depois do e-mail 2: se abrir mas não clicar, mande o e-mail 3.
- Depois do e-mail 3: se continuar sem interação em 5 dias, tire o contato da lista ativa. Opcional: mova para uma lista "muito fria" com contato uma vez por ano.

## Instruções para o agente

Quando um agente redigir e-mails de reengajamento:

1. Ler `01-icp/ICP.md`. Confirmar que a persona ainda se encaixa. Se a persona mudou (ex.: hoje atendemos outro tipo de empresa), ajustar o texto do reengajamento.
2. Ler `02-voz/VOZ.md`. O reengajamento fica um pouco fora do tom padrão: um pouco mais direto, um pouco mais autoconsciente.
3. Puxar de `08-conteudo/BIBLIOTECA.md` a melhor peça de destaque publicada nos últimos 90 dias.
4. Redigir os 3 e-mails de uma vez, para a sequência ficar coerente.
5. Sinalizar toda afirmação que precisa de verificação humana.
6. Parar. Pedir revisão humana antes de ativar a sequência.

## Critérios de sucesso

- De 15% a 20% da lista parada volta a interagir (abre e clica no e-mail 1 ou 2).
- De 5% a 8% clica no CTA da oferta nos e-mails 2 ou 3.
- A higiene da lista melhora: a entregabilidade sobe de 10% a 20% depois de tirar os contatos realmente parados.

Se o reengajamento ficar abaixo de 10%, o problema provavelmente está antes: ou a lista original era de baixa qualidade, ou o conteúdo que a pessoa recebe quando está ativa não é forte o bastante.
