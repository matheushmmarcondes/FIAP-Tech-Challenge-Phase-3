# PAIF Blog — Front-end (Tech Challenge Fase 3)

Interface web do blog educacional PAIF, desenvolvida com React (Next.js + TypeScript), integrada à API REST da Fase 2.

> Documentação completa de entrega (arquitetura full stack, guia de uso e relato da equipe): [docs/ENTREGA.md](../docs/ENTREGA.md)

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Context API (autenticação e posts)
- JWT (armazenado em `localStorage`)
- Docker (imagem standalone)
- GitHub Actions (lint e build)

## Funcionalidades

- Página principal com listagem de posts e busca por palavra-chave
- Página de leitura de post
- Login para docentes
- Página administrativa com ações de editar e excluir
- Página de criação de post
- Página de edição de post (carregando dados atuais)
- Proteção de rotas administrativas para usuários docentes

## Arquitetura (resumo)

```text
src/
├── app/           # Rotas e páginas (App Router)
├── components/    # Componentes de interface reutilizáveis
├── contexts/      # AuthContext e PostsContext
├── services/      # Cliente HTTP da API (fetch)
├── lib/           # Utilitários
└── types/         # Tipagens TypeScript
```

## Pré-requisitos

- Node.js 20+
- API backend rodando em `http://localhost:3000`
- MongoDB em execução

## Variáveis de ambiente

Crie `.env.local` a partir do exemplo:

```bash
cp .env.local.example .env.local
```

Conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Execução local

```bash
npm install
npm run dev
```

- Front-end: http://localhost:3001
- API: http://localhost:3000/api

## Guia de uso

### Estudantes (leitura)

1. Acesse a página inicial — todos os posts são listados com título, autor e resumo
2. Use a barra de busca para filtrar por palavra-chave
3. Clique em um post para ler o conteúdo completo

### Docentes (gestão)

1. Clique em **Entrar** e faça login (credenciais abaixo)
2. Acesse **Administração** para ver todos os posts
3. Use **Nova publicação** para criar, ou **Editar** / **Excluir** em posts existentes
4. Clique em **Sair** ao terminar

## Credenciais padrão (seed do backend)

| Campo | Valor |
|-------|-------|
| E-mail | professor@paif.com |
| Senha | professor123 |

## Acessibilidade

- Idioma `pt-BR` no HTML
- Labels em todos os formulários
- Busca com texto alternativo (`sr-only`)
- Mensagens de erro com `role="alert"`
- Foco visível em campos interativos
- Layout responsivo (mobile e desktop)

## CI/CD

Workflow na raiz do repositório (`.github/workflows/ci.yml`):

- `npm ci`
- `npm run lint`
- `npm run build`

## Docker

Build da imagem:

```bash
docker build -t paif-frontend .
```

Run local:

```bash
docker run --rm -p 3001:3001 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000/api \
  paif-frontend
```

## Full stack com Docker Compose

Na raiz do workspace:

```bash
docker compose -f docker-compose.fullstack.yml up --build
```

Serviços:

- Front-end: http://localhost:3001
- Back-end: http://localhost:3000
- Swagger: http://localhost:3000/api-docs
