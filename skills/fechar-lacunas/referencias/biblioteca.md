# Biblioteca de conteúdo

`08-conteudo/BIBLIOTECA.md` é o inventário do que a marca já publicou. Não é plano: o que ainda não saiu fica em `/08-conteudo/CALENDARIO.md` (skill `montar-plano`). Um agente consulta a biblioteca para não escrever de novo o que já existe e para apontar links que existem de verdade.

## Fontes

| Tipo | Onde levantar |
| --- | --- |
| Posts de blog e guias | `/sitemap.xml` (as URLs de `/blog/`, `/guias/`, `/materiais/`), o índice do blog, o feed RSS (`/feed`, `/rss.xml`) |
| Vídeos | Canal do YouTube (a aba de vídeos lista título e data), Reels e vídeos do Instagram e do TikTok que a pessoa considera peça, não post do dia |
| Podcasts | Página do programa no Spotify ou no Apple Podcasts |
| Webinars | Página de eventos do site, YouTube, plataforma de inscrição |
| Iscas digitais e modelos | Páginas com formulário de cadastro, `/materiais` |
| Cases | `/cases`, `/clientes`, e os IDs `CS-` de `/08-conteudo/PROVAS.md` |
| PDFs e apresentações | Pergunte à pessoa onde ficam (Drive, pasta de vendas) |

Desempenho (tráfego, visualizações, downloads) só entra com fonte: GA4, Search Console, YouTube Studio, a plataforma de e-mail. Sem acesso, a coluna fica com `—` e uma linha no topo do arquivo diz de onde virá o número.

## Como preencher

1. Liste tudo das fontes acima numa planilha de trabalho: título, URL, tipo, data de publicação.
2. Para cada peça, preencha as colunas que saem de outros arquivos:
   - **Persona:** pela persona de `/01-icp/ICP.md` a quem o texto fala. Na dúvida, `[PROPOSTA]`.
   - **Cluster** e **Palavra-chave principal:** de `/06-seo/CLUSTERS.md` e `/06-seo/PALAVRAS-CHAVE.md`. Peça sem cluster fica com `—` e vira item em `## Lacunas de conteúdo` ou candidata a sair do ar.
   - **Etapa:** Descoberta (ensina), Consideração (compara, mostra método), Decisão (preço, case, demonstração).
3. Pergunte só o que nenhuma fonte diz: responsável por peça, o que está desatualizado, quais PDFs internos existem.
4. Uma tabela por tipo, com as colunas do template. Apague as seções de tipos que a marca não tem (ex.: Podcasts) em vez de deixar a linha de exemplo.
5. **Mapa de reaproveitamento:** só para as três a cinco peças principais (pilares e cases). Status real de cada variação: link se existe, "não feito" se não.
6. **Fila de atualização:** peças com dado velho, link quebrado ou ano no título que já passou. Confira os links quebrados abrindo as URLs, não por suposição.
7. Apague `## Exemplo`.

Marca com muito conteúdo (mais de 50 peças): registre todas as de blog e cases, e só as 20 mais recentes dos outros tipos, dizendo no topo do arquivo o critério e a data do corte.

## Conferir

- Toda URL da tabela abre (status 200 ou redirecionamento para a página certa).
- Os clusters citados existem em `CLUSTERS.md`.
- Os cases citados têm ID em `PROVAS.md`. Case publicado sem prova registrada vai para `registrar-provas`.
