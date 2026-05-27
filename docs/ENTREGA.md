# Documento de Entrega — Tech Challenge Fase 3

**Projeto:** PAIF Blog — Plataforma de Atividades Escolares  
**Curso:** FIAP — Pós-graduação Full Stack  
**Fase:** 03 — Interface gráfica (Front-end React)

---

## 1. Arquitetura do sistema

### 1.1 Visão geral

O PAIF Blog é uma aplicação full stack composta por três camadas principais:

```text
┌─────────────────┐     HTTP/REST      ┌─────────────────┐     Mongoose     ┌─────────────┐
│   Front-end     │ ◄────────────────► │   Back-end      │ ◄──────────────► │   MongoDB   │
│   Next.js       │   JSON + JWT       │   Express.js    │                  │   blogdb    │
│   :3001         │                    │   :3000         │                  │   :27017    │
└─────────────────┘                    └─────────────────┘                  └─────────────┘
```

### 1.2 Front-end (React / Next.js)

| Aspecto | Detalhe |
|---------|---------|
| Framework | Next.js 16 com App Router |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS (responsivo) |
| Estado global | Context API (`AuthContext`, `PostsContext`) |
| Autenticação | JWT armazenado em `localStorage` |
| Comunicação | `fetch` nativo via módulo `services/api.ts` |

**Estrutura de pastas:**

```text
tech-challenge-phase-2-web/src/
├── app/              # Rotas (páginas)
│   ├── page.tsx              → Lista de posts + busca
│   ├── posts/[id]/page.tsx   → Leitura de post
│   ├── login/page.tsx        → Login docente
│   └── admin/                → Área protegida
│       ├── page.tsx          → Listagem + editar/excluir
│       ├── new/page.tsx      → Criar post
│       └── edit/[id]/page.tsx → Editar post
├── components/       # PostCard, PostForm, SearchBar, Header
├── contexts/         # AuthContext, PostsContext, Providers
├── services/         # Cliente HTTP (api.ts)
├── lib/              # Utilitários (formatDate)
└── types/            # Tipagens TypeScript
```

### 1.3 Back-end (Node.js / Express)

| Aspecto | Detalhe |
|---------|---------|
| Runtime | Node.js 20 |
| Framework | Express.js |
| Banco | MongoDB com Mongoose |
| Autenticação | JWT + bcryptjs |
| Documentação API | Swagger em `/api-docs` |

**Endpoints principais:**

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/posts` | — | Lista todos os posts |
| GET | `/api/posts/:id` | — | Post por ID |
| GET | `/api/posts/search?q=` | — | Busca por palavra-chave |
| POST | `/api/posts` | Docente | Criar post |
| PUT | `/api/posts/:id` | Docente | Atualizar post |
| DELETE | `/api/posts/:id` | Docente | Excluir post |
| POST | `/api/auth/login` | — | Login (retorna JWT) |

### 1.4 Fluxo de autenticação

```text
1. Docente acessa /login e envia e-mail + senha
2. Front-end chama POST /api/auth/login
3. Back-end valida credenciais e retorna JWT + dados do usuário
4. Front-end armazena token em localStorage
5. Requisições protegidas enviam header: Authorization: Bearer <token>
6. Rotas /admin/* verificam token e role "teacher" antes de renderizar
```

### 1.5 Infraestrutura e CI/CD

- **Docker:** cada camada possui `Dockerfile`; o `docker-compose.fullstack.yml` na raiz sobe MongoDB, API e front-end juntos.
- **GitHub Actions:** workflows na raiz do repositório executam lint + build (front) e testes automatizados (back) a cada push/PR.

---

## 2. Guia de uso da aplicação

### 2.1 Para estudantes (leitura)

1. Acesse http://localhost:3001
2. Na página inicial, visualize a lista de publicações (título, autor e resumo)
3. Use o campo **Buscar** para filtrar posts por palavra-chave no título ou conteúdo
4. Clique em um post para ler o conteúdo completo
5. Não é necessário login para leitura

### 2.2 Para docentes (gestão de posts)

1. Clique em **Entrar** no cabeçalho ou acesse `/login`
2. Faça login com as credenciais de docente:
   - E-mail: `professor@paif.com`
   - Senha: `professor123`
3. Após login, acesse **Administração** no menu
4. Na área admin:
   - **Nova publicação:** crie um post com título, autor e conteúdo
   - **Editar:** altere um post existente (dados carregados automaticamente)
   - **Excluir:** remova um post (confirmação solicitada)
5. Clique em **Sair** para encerrar a sessão

### 2.3 Execução para demonstração

**Opção A — Docker Compose (recomendada):**

```bash
docker compose -f docker-compose.fullstack.yml up --build
```

**Opção B — Desenvolvimento local:**

```bash
# Terminal 1 — Back-end
cd tech-challenge-phase-2 && npm run dev

# Terminal 2 — Front-end
cd tech-challenge-phase-2-web && npm run dev
```

### 2.4 Acessibilidade

Medidas implementadas no front-end:

- Idioma da página definido como `pt-BR`
- Labels associados a todos os campos de formulário
- Texto alternativo para busca com classe `sr-only`
- Estados de erro com `role="alert"`
- Indicadores de carregamento com `aria-live="polite"`
- Foco visível em inputs e botões (ring de foco)
- Layout responsivo com breakpoints (`sm:`, `flex-col` / `flex-row`)

---

## 3. Relato de experiências e desafios da equipe

> **Nota:** Atualize os nomes dos integrantes e personalize os relatos conforme a experiência real da equipe antes da entrega final.

### 3.1 Integrantes

| Nome | RM | Papel principal |
|------|----|-----------------|
| [Integrante 1] | [RM] | Front-end / UI |
| [Integrante 2] | [RM] | Back-end / API |
| [Integrante 3] | [RM] | DevOps / Integração |

### 3.2 Desafios enfrentados

#### Integração front-end ↔ back-end

A comunicação entre o Next.js e a API Express exigiu atenção especial à configuração de CORS no back-end e à variável `NEXT_PUBLIC_API_URL` no front-end. Em ambiente Docker, a URL da API precisa ser acessível pelo navegador do usuário (`localhost:3000`), não pelo hostname interno do container.

#### Autenticação e proteção de rotas

Implementamos autenticação via JWT com Context API. O desafio foi garantir que rotas administrativas (`/admin/*`) redirecionassem usuários não autenticados para `/login`, considerando que o Next.js App Router renderiza componentes no cliente (`'use client'`). A solução foi um layout dedicado em `admin/layout.tsx` que verifica token e role antes de exibir o conteúdo.

#### Docker multi-serviço

Orquestrar MongoDB, API e front-end em um único `docker-compose.fullstack.yml` demandou configurar dependências entre serviços, variáveis de ambiente e o build standalone do Next.js (`output: "standalone"` no `next.config.ts`).

#### Gerenciamento de estado

Optamos pela Context API em vez de Redux por ser suficiente para o escopo do projeto (autenticação + listagem/busca de posts). Isso reduziu a complexidade sem sacrificar organização.

### 3.3 Aprendizados

- Uso prático de React Hooks e componentes funcionais em um projeto real
- Integração com API REST autenticada (JWT)
- Configuração de CI/CD com GitHub Actions em monorepo
- Containerização com Docker e Docker Compose para ambientes reproduzíveis
- Boas práticas de acessibilidade e responsividade em interfaces web

### 3.4 Melhorias futuras

- Implementação de comentários nos posts (requisito opcional)
- Testes automatizados no front-end (React Testing Library)
- Refresh token para sessões mais longas
- Modo escuro e temas personalizáveis
- Deploy em cloud (Vercel + Render/Railway)

---

## 4. Referências

- [README raiz](../README.md) — Setup geral do monorepo
- [README front-end](../tech-challenge-phase-2-web/README.md) — Detalhes técnicos do front
- [README back-end](../tech-challenge-phase-2/README.md) — Endpoints e testes da API
- Swagger (local): http://localhost:3000/api-docs
