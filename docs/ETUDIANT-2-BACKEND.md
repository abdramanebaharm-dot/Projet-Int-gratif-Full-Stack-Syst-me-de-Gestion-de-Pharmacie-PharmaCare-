# PharmaCare — Guide Backend (Étudiant 2)

## Votre mission

Développer l'API REST Express.js sécurisée avec authentification JWT.

---

## Dossiers et fichiers sous votre responsabilité

```
backend/src/
├── routes/           # Définir les endpoints (stubs déjà créés)
├── controllers/      # Logique des requêtes (à créer)
├── services/         # Logique métier (à créer)
├── middlewares/      # auth.middleware.js et errorHandler.js déjà faits
├── prisma/           # Schéma géré par l'Étudiant 3
└── server.js         # Point d'entrée (déjà configuré)
```

---

## Routes à implémenter

### `/api/auth`

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/register` | Inscription (ADMIN only en prod) |
| POST | `/login` | Connexion → retourne JWT |
| POST | `/logout` | Déconnexion (côté client surtout) |
| POST | `/reset-password` | Réinitialisation mot de passe |
| GET | `/me` | Utilisateur connecté |

### `/api/users` (ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Liste des utilisateurs |
| GET | `/:id` | Détail utilisateur |
| POST | `/` | Créer un utilisateur |
| PUT | `/:id` | Modifier |
| DELETE | `/:id` | Supprimer |

### `/api/medicaments` (PHARMACIEN, ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Liste (filtres: categorie, search) |
| GET | `/:id` | Détail |
| POST | `/` | Ajouter |
| PUT | `/:id` | Modifier |
| DELETE | `/:id` | Supprimer |

### `/api/stocks` (PHARMACIEN, ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Historique des mouvements |
| POST | `/entree` | Entrée de stock |
| POST | `/sortie` | Sortie de stock |
| POST | `/ajustement` | Ajustement manuel |
| GET | `/alertes` | Stock faible, rupture, expiration |

### `/api/ventes` (CAISSIER, ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Liste des ventes |
| GET | `/:id` | Détail facture |
| POST | `/` | Créer une vente/facture |
| GET | `/search?q=` | Recherche produit pour vente rapide |

### `/api/fournisseurs` (PHARMACIEN, ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Liste |
| GET | `/:id` | Détail + historique commandes |
| POST | `/` | Ajouter |
| PUT | `/:id` | Modifier |
| DELETE | `/:id` | Supprimer |

### `/api/clients` (CAISSIER, ADMIN)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/` | Liste |
| GET | `/:id` | Détail + historique achats |
| POST | `/` | Créer |
| PUT | `/:id` | Modifier |
| DELETE | `/:id` | Supprimer |

---

## Architecture recommandée

Pour chaque module, créer :

```
routes/medicaments.routes.js    → définit les routes + middlewares
controllers/medicaments.controller.js  → req/res handling
services/medicaments.service.js        → logique Prisma
```

### Exemple : controller

```javascript
// controllers/medicaments.controller.js
const medicamentService = require('../services/medicaments.service');

async function getAll(req, res, next) {
  try {
    const medicaments = await medicamentService.findAll(req.query);
    res.json({ success: true, data: medicaments });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, ... };
```

### Exemple : route protégée

```javascript
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const controller = require('../controllers/medicaments.controller');

router.get('/', authMiddleware, controller.getAll);
router.post('/', authMiddleware, roleMiddleware('PHARMACIEN', 'ADMIN'), controller.create);
```

---

## Authentification JWT

Middleware déjà disponible dans `middlewares/auth.middleware.js`.

### Login — exemple de service

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { status: 401, message: 'Identifiants invalides' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return { token, user: { id: user.id, nom: user.nom, email: user.email, role: user.role } };
}
```

---

## Format de réponse standard

```javascript
// Succès
{ success: true, data: { ... } }

// Erreur (via errorHandler)
{ success: false, message: "Description de l'erreur" }

// Liste paginée (optionnel)
{ success: true, data: [...], pagination: { page: 1, total: 50 } }
```

---

## Alertes stock — logique métier

Dans `services/stocks.service.js` :

- **Stock faible** : `quantite < 10`
- **Rupture** : `quantite === 0`
- **Expiré** : `dateExpiration < now()`
- **Proche expiration** : `dateExpiration < now() + 30 jours`

---

## Démarrage local

```bash
# Terminal 1 — Base de données
docker compose -f docker-compose.dev.yml up -d

# Terminal 2 — Backend
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

API sur http://localhost:5000/api/health

---

## Variables d'environnement

```
PORT=5000
DATABASE_URL=postgresql://admin:admin@localhost:5432/pharmacie
JWT_SECRET=votre_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
SENTRY_DSN=
```

---

## Coordination

| Besoin | Contact |
|--------|---------|
| Schéma Prisma / migrations | Étudiant 3 |
| Consommation API | Étudiant 1 |
| Déploiement | Étudiant 4 |

---

## Checklist livrables

- [ ] Auth complète (login, register, JWT)
- [ ] CRUD Users (ADMIN)
- [ ] CRUD Médicaments
- [ ] Gestion Stock (entrées, sorties, ajustements, alertes)
- [ ] CRUD Ventes + facturation
- [ ] CRUD Fournisseurs
- [ ] CRUD Clients
- [ ] Middleware rôles sur toutes les routes
- [ ] Gestion d'erreurs centralisée
- [ ] Endpoint dashboard stats (bonus pour frontend)
