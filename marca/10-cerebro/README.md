# 10, Cérebro da marca (o sistema operacional dos agentes)

A camada de inteligência se fecha aqui. As nove pastas anteriores reuniram a matéria-prima. Esta pasta comprime tudo em um sistema que qualquer agente de IA consegue carregar, reaproveitar e ampliar.

## O que esta camada faz

É aqui que a base da marca encontra o agente. A pasta guarda o prompt mestre, os modelos reutilizáveis, os playbooks por canal, as receitas de campanha com vários toques e a biblioteca de prompts especializados. Um agente que carrega esta pasta para de pedir contexto a cada tarefa. Ele simplesmente trabalha.

## Arquivos desta pasta

- `CEREBRO.md`, o índice mestre e o system prompt mestre. É o arquivo que você cola na janela de contexto do assistente de IA.
- `modelos/`, modelos de conteúdo para preencher (`email-de-nutricao.md`, `landing-page.md`, `post-social.md`, `post-de-blog.md`, `one-pager.md`).
- `playbooks/`, playbooks por canal (`linkedin.md`, `email.md`, `blog.md`, `x.md`, `instagram.md`).
- `campanhas/`, receitas de campanha com vários toques (`lancamento.md`, `nutricao.md`, `reengajamento.md`, `sprint-de-seo.md`).
- `prompts/`, prompts de produção (`sistema-base.md`, `blog.md`, `email.md`, `social.md`, `anuncios.md`).
- `contexto-criativo/`, três arquivos curtos que toda empresa que usa IA para escrever deveria ter, para que o texto pare de soar igual ao de todo mundo (`criador.md`, `audiencia.md`, `gosto.md`), mais os prompts para montá-los. A ideia vem do texto [The Creative Context OS](https://www.kieranflanagan.io/p/the-creative-context-os-how-to-stop), de Kieran Flanagan.

## Ordem de construção nesta camada

1. Escreva `CEREBRO.md` só depois que as pastas 01 a 09 estiverem preenchidas. O prompt mestre consolida o que está nelas.
2. Preencha `prompts/sistema-base.md`. É o prompt âncora que todo prompt especializado herda.
3. Monte `contexto-criativo/` em seguida. Leva umas três horas, e todo prompt de escrita depois dele melhora.
4. Monte `modelos/` depois. Modelos padronizam o formato. Playbooks padronizam a cadência.
5. Monte `playbooks/` e `campanhas/` por último.

## Como esta pasta é carregada em um agente

- **Projetos do Claude:** anexe a pasta `marca/` inteira a um Projeto. Cole `CEREBRO.md` como instruções do Projeto.
- **ChatGPT (Projetos, GPTs personalizados):** envie a pasta. Cole `CEREBRO.md` nas instruções.
- **Gems do Gemini:** cole `CEREBRO.md` como instruções do Gem. Envie o resto como conhecimento.
- **Zapier, Make ou n8n:** carregue os arquivos relevantes para cada tarefa. Carregue `CEREBRO.md` em toda execução.
- **Stack de agentes própria:** leia o conteúdo do repositório em tempo de execução. Passe para o prompt os arquivos que a tarefa atual pede.
