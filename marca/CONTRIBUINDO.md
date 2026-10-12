# Contribuindo

As 11 camadas da marca são um ponto de partida, não um padrão fechado. O fluxo pensado é:

1. **Copie** o repositório para a sua conta ou organização (fork ou clone).
2. **Adapte** cada modelo ao seu negócio. Troque os exemplos da Cadência, a startup fictícia, pelas suas respostas reais.
3. **Versione** o trabalho com commits frequentes. Escreva mensagens de commit que digam por que algo mudou, não só o que mudou.
4. **Carregue** as camadas preenchidas nos seus agentes de IA: o GTM Brain, projetos do Claude ou do ChatGPT, Gems do Gemini ou qualquer agente próprio.

## Se quiser contribuir de volta

Se você melhorou um modelo de um jeito que ajudaria outros negócios (uma estrutura mais clara, um prompt melhor, uma seção nova útil), pull requests no repositório público do GTM Brain são bem-vindos.

Issues e PRs são em português do Brasil.

Orientações:

- **Mantenha genérico.** A contribuição deve servir para qualquer pequeno negócio, não só para o seu. Tire os detalhes da sua marca antes de abrir o PR.
- **Sem dependência de ferramenta.** Só Markdown e JSON. Nada de formato proprietário.
- **Não renomeie os títulos que o GTM Brain lê.** Alguns títulos e nomes de arquivo são lidos pela ferramenta (veja o `CEREBRO.md` e os modelos de cada camada). Mudar um deles quebra a leitura. Se acha que um precisa mudar, abra uma issue antes.
- **Siga a voz do projeto.** De quem faz, em linguagem simples, direta. Frases curtas. Termos de mercado só quando o mercado já usa (ICP, SEO, CTA, churn). Estatística começa pelo número e diz a fonte. Valores em R$, datas em AAAA-MM-DD.
- **PRs pequenos e focados.** Uma melhoria por PR. Descreva em poucas linhas o problema e a solução.
- **Inclua um exemplo.** Se acrescentar um modelo novo, inclua uma versão preenchida com a Cadência ao lado da versão em branco, para quem adotar ver como é uma boa resposta. Nada de empresas ou pessoas reais nos exemplos.
- **Rode o validador.** `bash scripts/validar.sh` antes de abrir o PR. Se acrescentar um arquivo canônico, inclua o caminho na lista do script.

## O que não vai ser aceito

- Conteúdo gerado por IA sem revisão humana.
- Conteúdo promocional de ferramentas ou fornecedores específicos. Recomendações de ferramenta que já estão num modelo são aceitas quando equilibradas e com opções gratuitas e pagas.
- Mudanças estruturais amplas nas 11 camadas. A estrutura é opinativa de propósito.
- Estatísticas sem fonte, ou números de outro país apresentados como se fossem do Brasil.

## Dúvidas

Se não tem certeza de que algo cabe aqui, abra uma issue antes de escrever o PR.

## Como reportar problemas

Achou um erro, um erro de digitação ou uma seção confusa? Abra uma issue. Diga com clareza o arquivo e o problema.

---

Obrigado por deixar o projeto melhor.
