# 🚀 Setup do Agente IA com Gemini

## Configuração obrigatória

Para que o agente de IA funcione, você precisa adicionar sua chave da API do Gemini:

### 1. Obtenha sua chave do Gemini
- Acesse: https://aistudio.google.com/apikey
- Copie sua chave de API

### 2. Adicione ao arquivo `.env.local`
Edite o arquivo `.c:\Users\Gabriel\Downloads\ghz-studio\.env.local` e substitua:

```
GEMINI_API_KEY=sua_chave_aqui
```

Por sua chave real (mantendo sem aspas):

```
GEMINI_API_KEY=AIzaSyD...sua_chave_completa...
```

### 3. Rode o servidor
Execute o comando:
```bash
npm run dev:full
```

Isso rodará:
- Servidor Backend (porta 3001) com a rota `/api/chat`
- Vite Frontend (porta 3000)

### 4. Acesse
http://localhost:3000/

O chat agora será alimentado pela IA Gemini!

## Verificação de Proxy
- Todas as requisições para `/api/*` são automaticamente proxy para `http://localhost:3001`
- A chave de API está segura no backend (nunca é enviada ao frontend)

## Produção (Vercel/Railway)
Adicione a variável de ambiente `GEMINI_API_KEY` no painel da sua plataforma de deploy.
