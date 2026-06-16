# PharmaCare — Système de Gestion de Pharmacie

Application web full-stack pour la gestion complète d'une pharmacie : médicaments, stocks, ventes, fournisseurs, clients et utilisateurs.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19, Vite, React Router |
| Backend | Express.js, JWT |
| Base de données | PostgreSQL 16, Prisma ORM |
| DevOps | Docker Compose, GitHub Actions, Sentry |

## Architecture

```
Frontend (React)  →  Backend (Express API)  →  Prisma ORM  →  PostgreSQL
     :3000                    :5000                              :5432
```

## Installation locale

### Prérequis

- Node.js 20+
- Docker et Docker Compose
- Git

### Option 1 — Docker (recommandé)

```bash
git clone <url-du-repo>
cd tp-3-fullstack
cp .env.example .env
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Health check | http://localhost:5000/api/health |

### Option 2 — Développement local

```bash
# 1. Base de données
docker compose -f docker-compose.dev.yml up -d

# 2. Backend
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev

# 3. Frontend (autre terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Variables d'environnement

### Backend (`backend/.env`)

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://admin:admin@localhost:5432/pharmacie
JWT_SECRET=changez_moi_en_production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
SENTRY_DSN=
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000/api
VITE_SENTRY_DSN=
```

## Comptes de test

| Email | Rôle | Mot de passe |
|-------|------|-------------|
| admin@pharmacare.com | Administrateur | admin123 |
| pharmacien@pharmacare.com | Pharmacien | admin123 |
| caissier@pharmacare.com | Caissier | admin123 |

## Commandes Docker

```bash
docker compose up --build        # Lancer toute l'application
docker compose down              # Arrêter
docker compose down -v           # Arrêter + supprimer les volumes
docker compose logs -f backend   # Logs backend
```

## Répartition du travail

| Étudiant | Rôle | Documentation |
|----------|------|---------------|
| 1 | Frontend React | [docs/ETUDIANT-1-FRONTEND.md](docs/ETUDIANT-1-FRONTEND.md) |
| 2 | Backend Express | [docs/ETUDIANT-2-BACKEND.md](docs/ETUDIANT-2-BACKEND.md) |
| 3 | Base de données | [docs/ETUDIANT-3-DATABASE.md](docs/ETUDIANT-3-DATABASE.md) |
| 4 | DevOps | [docs/ETUDIANT-4-DEVOPS.md](docs/ETUDIANT-4-DEVOPS.md) |

Voir [docs/REPARTITION-EQUIPE.md](docs/REPARTITION-EQUIPE.md) pour le plan complet.

## CI/CD

Le pipeline GitHub Actions (`.github/workflows/ci.yml`) exécute :
- Tests backend + migrations Prisma
- Build frontend
- Build images Docker (branche `main`)

## Déploiement cloud

| Composant | Plateforme |
|-----------|-----------|
| Frontend | Vercel ou Netlify |
| Backend | Railway ou Render |
| PostgreSQL | Railway ou Supabase |

Guide détaillé : [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)

## Structure du projet

```
├── frontend/               # Application React
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       └── router/
├── backend/                # API Express
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── middlewares/
│       └── prisma/
├── docs/                   # Guides par étudiant
├── docker-compose.yml
└── .github/workflows/
```

## Monitoring

Sentry est intégré côté backend et frontend. Configurer les DSN dans les fichiers `.env` respectifs.

## Licence

Projet académique — Module Dev Web L2
