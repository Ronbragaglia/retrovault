<div align="center">

# 🎮 RetroVault

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-red?style=flat-square)](LICENSE)

**Catálogo interativo de games retro com reviews, coleção pessoal e favoritos**

</div>

---

## 📖 Sobre

RetroVault é uma plataforma web completa para entusiastas de games retro. Navegue por um catálogo de jogos clássicos, escreva reviews, monte sua coleção pessoal e salve seus favoritos.

## 🏗️ Arquitetura

```mermaid
graph TB
    subgraph Frontend
        R[React 18 + Vite]
        T[TailwindCSS]
        Z[Zustand]
    end
    subgraph Backend
        E[Express.js]
        JWT[JWT Auth]
    end
    subgraph Database
        M[(MongoDB 7)]
    end
    R --> E
    E --> M
    E --> JWT
```

## 🛠️ Tech Stack

| Camada | Tecnologias |
|--------|------------|
| **Frontend** | React 18, Vite, TailwindCSS, Zustand, Axios, Heroicons |
| **Backend** | Node.js 20, Express, Mongoose, JWT, bcrypt |
| **Database** | MongoDB 7, Mongo Express (admin) |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

## 📡 API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/register` | Criar conta | - |
| POST | `/api/auth/login` | Login | - |
| GET | `/api/auth/me` | Perfil do usuário | ✅ |
| PUT | `/api/auth/favorite/:gameId` | Toggle favorito | ✅ |
| PUT | `/api/auth/collection/:gameId` | Toggle coleção | ✅ |
| GET | `/api/games` | Listar games (filtros, paginação) | - |
| GET | `/api/games/platforms` | Listar plataformas | - |
| GET | `/api/games/:id` | Detalhes do game | - |
| POST | `/api/games` | Criar game | ✅ Admin |
| PUT | `/api/games/:id` | Editar game | ✅ Admin |
| DELETE | `/api/games/:id` | Deletar game | ✅ Admin |
| POST | `/api/games/:gameId/reviews` | Criar review | ✅ |
| GET | `/api/games/:gameId/reviews` | Listar reviews | - |
| DELETE | `/api/reviews/:id` | Deletar review | ✅ |

## 🚀 Rodando com Docker

```bash
docker compose up -d
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Mongo Express: http://localhost:8081

## 📄 Licença

[CC BY-NC 4.0](LICENSE) | Rone Bragaglia | Uso comercial proibido sem autorizacao
