# PAIF Blog — Tech Challenge Fase 3 (Full Stack)

Monorepo do **Tech Challenge FIAP — Fase 3**: interface gráfica em React (Next.js) integrada à API REST de blogging desenvolvida na Fase 2.

## Estrutura do repositório

```text
.
├── tech-challenge-phase-2/       # Back-end (Node.js + Express + MongoDB)
├── tech-challenge-phase-2-web/   # Front-end (Next.js + React + TypeScript)
├── docker-compose.fullstack.yml  # Orquestração full stack (Mongo + API + Web)
└── docs/
    └── ENTREGA.md                # Documento de entrega (arquitetura, uso, relato)
```

## Tecnologias

| Camada    | Stack |
|-----------|-------|
| Front-end | Next.js 16, React 19, TypeScript, Tailwind CSS, Context API |
| Back-end  | Node.js, Express, MongoDB, Mongoose, JWT |
| DevOps    | Docker, Docker Compose, GitHub Actions |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [Docker](https://www.docker.com/) e Docker Compose (recomendado)
- MongoDB (via Docker ou instalação local)

## Execução rápida (Docker Compose — recomendado)

Na raiz do repositório:

```bash
docker compose -f docker-compose.fullstack.yml up --build
```

| Serviço   | URL |
|-----------|-----|
| Front-end | http://localhost:3001 |
| API       | http://localhost:3000/api |
| Swagger   | http://localhost:3000/api-docs |
| MongoDB   | localhost:27017 |

### Credenciais padrão (docente)

| Campo  | Valor |
|--------|-------|
| E-mail | professor@paif.com |
| Senha  | professor123 |

## Execução local (sem Docker)

### 1. Back-end

```bash
cd tech-challenge-phase-2
cp .env.example .env
npm install
docker compose up -d mongo   # ou MongoDB local
npm run dev
```

### 2. Front-end

```bash
cd tech-challenge-phase-2-web
cp .env.local.example .env.local
npm install
npm run dev
```

Acesse http://localhost:3001 (front) e http://localhost:3000/api (API).

## Funcionalidades implementadas

- Listagem de posts com busca por palavra-chave
- Leitura de post individual
- Login de docentes (JWT)
- Criação, edição e exclusão de posts (área administrativa protegida)
- Layout responsivo (mobile e desktop)
- Acessibilidade básica (labels, `lang="pt-BR"`, foco visível, mensagens com `role="alert"`)

## CI/CD

Workflows na raiz em `.github/workflows/`:

- **Front-end:** lint + build (`tech-challenge-phase-2-web`)
- **Back-end:** testes com MongoDB em serviço (`tech-challenge-phase-2`)

Disparam em push e pull request para `main` ou `master`.

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [docs/ENTREGA.md](docs/ENTREGA.md) | Arquitetura, guia de uso e relato da equipe |
| [tech-challenge-phase-2-web/README.md](tech-challenge-phase-2-web/README.md) | Setup e detalhes do front-end |
| [tech-challenge-phase-2/README.md](tech-challenge-phase-2/README.md) | Endpoints, setup e testes do back-end |

## Entrega FIAP

| Item | Status |
|------|--------|
| Código-fonte (GitHub) + Docker + CI/CD | ✅ Este repositório |
| Documentação (arquitetura, uso, relato) | ✅ [docs/ENTREGA.md](docs/ENTREGA.md) |
| Apresentação gravada em vídeo | ⬜ A ser enviada separadamente |

## Licença

Consulte o arquivo [LICENSE](LICENSE).
