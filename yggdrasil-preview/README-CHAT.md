# YGGDRASIL — Chat com IA (integração inicial)

Esta pasta contém uma interface de chat e um endpoint server-side para chamar a API da OpenAI sem expor a chave no navegador.

## Publicar na Vercel

1. Importe o repositório `yansitesemarcas/yan-serra-sites` na Vercel.
2. Nas configurações do projeto, defina **Root Directory** como `yggdrasil-preview`.
3. Em **Settings → Environment Variables**, adicione:
   - `OPENAI_API_KEY`: sua chave secreta da API.
   - `OPENAI_MODEL` (opcional): modelo disponível na sua conta; o padrão do código é `gpt-4o-mini`.
4. Aplique as variáveis a **Production** e **Preview** conforme necessário e faça um novo deploy.
5. Abra `/chat.html` no domínio gerado pela Vercel.

## Segurança e limites

- **Nunca** coloque `OPENAI_API_KEY` no HTML, em arquivos públicos ou no GitHub.
- A API pode gerar custos e exige uma conta de API com faturamento/limite configurado. Uma assinatura do ChatGPT não equivale automaticamente a crédito de API.
- O endpoint limita o tamanho da mensagem e não registra a chave. Erros detalhados do provedor não são enviados ao navegador.
- Esta primeira versão mantém o histórico somente na memória da página. Não há autenticação de usuários, banco de dados, streaming ou proteção contra abuso por múltiplos visitantes. Antes de tornar o endereço público, adicione autenticação e limites de uso.
- O preview via HTMLPreview/GitHub Pages não executa funções de servidor. O chat só responde quando a página e `/api/chat` estiverem implantados juntos numa hospedagem compatível, como a Vercel.

## Arquivos

- `chat.html`: interface responsiva de conversa.
- `api/chat.js`: endpoint server-side que mantém a chave fora do frontend.
- `index.html`: prévia anterior de tarefas e memória local.
