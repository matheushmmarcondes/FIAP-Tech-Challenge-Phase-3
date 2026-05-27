# PAIF Backend + API — Tech Challenge Fase 2/3

API REST de blogging educacional (**Node.js**, **Express**, **MongoDB**) e integração com o front-end Next.js da Fase 3.

## Tecnologias

- Node.js, Express.js
- MongoDB, Mongoose
- JWT + bcryptjs (autenticação)
- CORS
- Swagger, Docker, Jest, GitHub Actions

## Endpoints

### Posts (público para leitura)

| Método | Endpoint | Auth | Descrição |
|--------|----------|------|-----------|
| GET | `/api/posts` | — | Lista posts |
| GET | `/api/posts/:id` | — | Post por ID |
| GET | `/api/posts/search?q=` | — | Busca |
| POST | `/api/posts` | Docente | Criar |
| PUT | `/api/posts/:id` | Docente | Atualizar |
| DELETE | `/api/posts/:id` | Docente | Excluir |

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cadastro |
| POST | `/api/auth/login` | Login (retorna JWT) |
| GET | `/api/auth/me` | Usuário autenticado |

## Variáveis de ambiente

Copie `.env.example` para `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/PAIFdb
JWT_SECRET=sua_chave_secreta_jwt
FRONTEND_URL=http://localhost:3001
SEED_TEACHER_EMAIL=professor@paif.com
SEED_TEACHER_PASSWORD=professor123
```

## Execução local

```bash
npm install
docker compose up -d mongo   # ou MongoDB local
npm run dev
```

Swagger: http://localhost:3000/api-docs

## Front-end

O front-end está em `../tech-challenge-phase-2-web`. Veja o README da pasta web para instruções.

## Testes

```bash
npm test
```

Requer MongoDB acessível em `MONGO_URI`.

## Docker

```bash
docker compose up --build
```

## Docker Full Stack (API + Front + Mongo)

Na raiz do workspace:

```bash
docker compose -f ../docker-compose.fullstack.yml up --build
```
