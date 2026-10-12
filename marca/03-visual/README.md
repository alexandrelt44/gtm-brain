# 03, Identidade visual

A camada de identidade fecha aqui. Você já sabe para quem trabalha. Já sabe como fala. Agora registra como a marca aparece.

## O que esta camada faz

Esta pasta é a fonte única da verdade visual. Regras de logo, sistema de cores, tipografia, direção de imagens, prompts de imagem para IA e regras de acessibilidade ficam aqui. Quando um designer, um freelancer ou um agente de geração de imagem produz uma peça em nome da marca, é daqui que ele tira as regras.

Esta pasta é a passagem da identidade (camadas 01 a 03) para o sistema (camada 04). Ela é escrita em linguagem simples, para gente ler. A pasta irmã, `04-design-system`, é escrita em tokens, para máquina ler.

## Arquivos desta pasta

- `IDENTIDADE-VISUAL.md`: o guia completo da identidade visual. Sistema de logo, paleta de cores, tipografia, espaçamento, raio, sombra, movimento e regras de acessibilidade.
- `IMAGENS.md`: fotografia, ilustração, iconografia, banco de imagens, conteúdo gerado por clientes (UGC) e estilos visuais proibidos.
- `PROMPTS-DE-IMAGEM.md`: prompts-base testados para Midjourney, Adobe Firefly, Nano Banana, geração de imagem do ChatGPT e Canva IA. Modelo mais exemplos.
- `assets/README.md`: onde ficam os arquivos binários (SVGs e PNGs do logo, fontes principais). É um marcador de lugar, porque o modelo vem sem arquivos proprietários.

## Ordem de preenchimento nesta camada

1. Escreva `IDENTIDADE-VISUAL.md` primeiro. Feche logo, paleta e tipografia.
2. Preencha `IMAGENS.md`. Decida a direção antes de gerar qualquer imagem.
3. Escreva `PROMPTS-DE-IMAGEM.md` por último. Prompt só funciona se as direções acima estiverem claras.

## O que esta pasta alimenta

- `04-design-system` transforma estas regras em tokens.
- `07-site` aplica os tokens no site.
- `08-conteudo` aplica as regras de imagem em fotos e peças gráficas.
- `10-cerebro` carrega o contexto visual nos agentes que geram imagens.

## Próxima camada

Depois de preencher esta pasta, siga para `04-design-system` para codificar as regras visuais em tokens legíveis por máquina.
