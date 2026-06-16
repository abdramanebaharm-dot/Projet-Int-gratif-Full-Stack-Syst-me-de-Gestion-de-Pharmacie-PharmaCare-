# PharmaCare — Guide DevOps (Étudiant 4)

> **Statut : TERMINÉ** — Cette partie est déjà implémentée. Votre rôle est de la maintenir, déployer et monitorer.

## Votre mission

Mettre en place et maintenir l'infrastructure du projet :
- Conteneurisation Docker
- Pipeline CI/CD GitHub Actions
- Monitoring Sentry
- Déploiement cloud

---

## Fichiers sous votre responsabilité

```
├── docker-compose.yml          # Stack complète (frontend + backend + db)
├── docker-compose.dev.yml      # PostgreSQL seul pour dev local
├── .github/workflows/ci.yml    # Pipeline CI/CD
├── backend/Dockerfile
├── frontend/Dockerfile
├── frontend/nginx.conf
├── .env.example
└── docs/DEPLOIEMENT.md         # Guide de déploiement cloud
```

---

## 1. Docker Compose

### Lancer toute l'application

```bash
docker compose up --build
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000      |
| Backend  | http://localhost:5000/api  |
| PostgreSQL | localhost:5432           |

### Dev local (BDD seule)

```bash
docker compose -f docker-compose.dev.yml up -d
cd backend && npm run dev
cd frontend && npm run dev
```

---

## 2. GitHub Actions (CI/CD)

Le pipeline `.github/workflows/ci.yml` exécute automatiquement :

1. **Backend** : install, Prisma generate, migrations, health check
2. **Frontend** : install, build Vite
3. **Docker** : build des images (branche `main` uniquement)

### Déclencheurs

- Push sur `main` ou `develop`
- Pull requests vers `main`

---

## 3. Sentry (Monitoring)

### Configuration backend

Dans `backend/.env` :
```
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

Déjà intégré dans `backend/src/server.js`.

### Configuration frontend

Dans `frontend/.env` :
```
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

Déjà intégré dans `frontend/src/main.jsx`.

### Créer un compte Sentry

1. Aller sur https://sentry.io
2. Créer un projet Node.js (backend) et un projet React (frontend)
3. Copier les DSN dans les fichiers `.env`

---

## 4. Déploiement cloud

Voir le guide complet : [DEPLOIEMENT.md](./DEPLOIEMENT.md)

| Composant | Plateforme recommandée |
|-----------|----------------------|
| Frontend  | Vercel ou Netlify    |
| Backend   | Railway ou Render    |
| PostgreSQL | Railway ou Supabase |

---

## 5. Variables d'environnement production

| Variable | Où | Description |
|----------|----|-------------|
| `DATABASE_URL` | Backend | URL PostgreSQL cloud |
| `JWT_SECRET` | Backend | Clé secrète forte (32+ chars) |
| `FRONTEND_URL` | Backend | URL du frontend déployé |
| `SENTRY_DSN` | Backend + Frontend | Monitoring |
| `VITE_API_URL` | Frontend | URL de l'API déployée |

---

## 6. Checklist livrables

- [x] Docker Compose fonctionnel
- [x] Dockerfiles frontend et backend
- [x] Pipeline GitHub Actions
- [x] Intégration Sentry (backend + frontend)
- [ ] Déploiement frontend (Vercel/Netlify)
- [ ] Déploiement backend (Railway/Render)
- [ ] Base PostgreSQL en ligne
- [ ] Variables d'environnement configurées en production
- [ ] README mis à jour avec URLs de déploiement

---

## Coordination avec l'équipe

| Étudiant | Ce dont vous avez besoin |
|----------|-------------------------|
| Étudiant 1 (Frontend) | `VITE_API_URL` en production |
| Étudiant 2 (Backend) | `DATABASE_URL`, `JWT_SECRET` |
| Étudiant 3 (BDD) | Migrations Prisma prêtes avant déploiement |

**Important** : Attendez que l'Étudiant 3 ait validé les migrations avant le premier déploiement.
