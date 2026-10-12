# Sua marca

As 11 camadas que descrevem a sua marca para pessoas e agentes de IA. Preencha os arquivos no lugar dos colchetes (`[Nome da empresa]`, `[AAAA-MM-DD]`…) e apague o que não se aplica.

## Por onde começar

1. `01-icp/ICP.md`: quem compra e por quê
2. `02-voz/VOZ.md`: como a marca soa
3. `05-oferta/OFERTA.md`: o que a marca vende
4. `08-conteudo/PROVAS.md`: cases, depoimentos e dados, cada um com ID
5. `10-cerebro/CEREBRO.md`: o system prompt que junta tudo; atualize a tabela "Status das camadas" conforme preencher

Com as três primeiras, um agente já escreve melhor do que com um briefing solto. O resto entra conforme a marca precisa.

## Conferir

```sh
bash scripts/validar.sh        # arquivos que faltam e placeholders que sobraram
bash scripts/auditar-tokens.sh # cores e espaçamentos fora dos tokens do design system
```

Para ver a marca como fichas, ligações e grafo, use o GTM Brain na pasta `brain/` da raiz do projeto. As convenções que ele entende estão em `docs/convencoes.md`.
