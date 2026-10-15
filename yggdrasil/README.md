# Yggdrasil — assistente pessoal

Protótipo web responsivo para Android, com reconhecimento de fala em português brasileiro e resposta falada pelo navegador. A conversa com IA usa uma função serverless segura.

## Arquivos
- `index.html`, `style.css`, `app.js`: interface e captura/reprodução de voz.
- `api/chat.js`: endpoint de conversa com IA. A chave fica no servidor, não no navegador.

## Publicar a IA com Vercel
O GitHub Pages só publica arquivos estáticos e não executa `api/chat.js`. Para a conversa funcionar:
1. Entre em Vercel e importe o repositório `yansitesemarcas/yan-serra-sites`.
2. Nas configurações do projeto, defina **Root Directory** como `yggdrasil`.
3. Em **Settings → Environment Variables**, crie `OPENAI_API_KEY` com uma chave válida obtida na plataforma da OpenAI. Não publique nem envie essa chave em mensagens ou arquivos.
4. Opcionalmente, defina `OPENAI_MODEL` para um modelo disponível na sua conta. O padrão do endpoint é `gpt-4o-mini`.
5. Faça o deploy e abra o domínio gerado pela Vercel. O endpoint precisa estar no mesmo domínio da interface para que `/api/chat` funcione.

O uso da API pode gerar custos conforme a conta e o consumo; hospedagem e acesso ao modelo não são garantidos como gratuitos.

## Limitações
- O reconhecimento de fala depende do suporte do navegador e da permissão do microfone.
- A voz atual é a síntese de voz do navegador em pt-BR; ElevenLabs ainda não está integrado.
- Este protótipo ainda não tem memória persistente nem automações externas.
- Nunca coloque chaves secretas em arquivos JavaScript enviados ao navegador.
