# Répartition du travail — PharmaCare

## Équipe de 4 étudiants

| Étudiant | Rôle | Guide |
|----------|------|-------|
| **1** | Frontend React | [ETUDIANT-1-FRONTEND.md](./ETUDIANT-1-FRONTEND.md) |
| **2** | Backend Express API | [ETUDIANT-2-BACKEND.md](./ETUDIANT-2-BACKEND.md) |
| **3** | Base de données Prisma | [ETUDIANT-3-DATABASE.md](./ETUDIANT-3-DATABASE.md) |
| **4** | DevOps Docker/CI/CD | [ETUDIANT-4-DEVOPS.md](./ETUDIANT-4-DEVOPS.md) |

---

## Ordre de travail recommandé

```
Semaine 1
├── Étudiant 3 : Valider schéma + migration initiale
├── Étudiant 2 : Auth JWT + routes de base
└── Étudiant 1 : Page Login + layout

Semaine 2
├── Étudiant 2 : CRUD médicaments, stock, ventes
├── Étudiant 1 : Pages médicaments, stock, ventes
└── Étudiant 3 : Seed + optimisations

Semaine 3
├── Étudiant 2 : Fournisseurs, clients, dashboard API
├── Étudiant 1 : Pages restantes + dashboard
└── Étudiant 4 : Déploiement cloud

Semaine 4
├── Tous : Tests d'intégration
├── Étudiant 4 : CI/CD + Sentry en production
└── Tous : Documentation finale
```

---

## Interfaces entre les parties

### Étudiant 3 → Étudiant 2

- Schéma Prisma dans `backend/src/prisma/schema.prisma`
- Migrations dans `backend/src/prisma/migrations/`
- Commande après chaque changement : `npm run db:generate`

### Étudiant 2 → Étudiant 1

- API REST documentée (voir ETUDIANT-2-BACKEND.md)
- Format de réponse : `{ success: true, data: ... }`
- Auth : header `Authorization: Bearer <token>`

### Étudiant 4 → Tous

- URL API production → Étudiant 1 (`VITE_API_URL`)
- URL frontend production → Étudiant 2 (`FRONTEND_URL`)
- DATABASE_URL → Étudiant 2 et 3

---

## Git — Workflow recommandé

```bash
main          # Production (déployée)
└── develop   # Intégration
    ├── feature/frontend-login      # Étudiant 1
    ├── feature/backend-auth        # Étudiant 2
    ├── feature/db-migrations       # Étudiant 3
    └── feature/devops-deploy       # Étudiant 4
```

Chaque étudiant travaille sur sa branche, puis ouvre une Pull Request vers `develop`.

---

## Ce qui est déjà fait (ne pas refaire)

- [x] Structure du projet
- [x] Schéma Prisma de base
- [x] Serveur Express avec routes stubs
- [x] Frontend React avec routing et layout
- [x] Docker Compose
- [x] GitHub Actions CI/CD
- [x] Intégration Sentry
- [x] Middleware JWT (backend)
- [x] Service API (frontend)
- [x] Seed utilisateurs de test

---

## Contact et questions

En cas de blocage sur une interface entre deux parties, consulter le guide de l'autre étudiant ou le fichier `schema.prisma` comme source de vérité pour les données.
