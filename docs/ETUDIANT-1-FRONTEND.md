# PharmaCare — Guide Frontend (Étudiant 1)

## Votre mission

Développer l'interface utilisateur React responsive de l'application PharmaCare.

---

## Dossiers et fichiers sous votre responsabilité

```
frontend/
└── src/
    ├── components/     # Composants réutilisables (Layout déjà fait)
    ├── pages/          # Toutes les pages à implémenter
    ├── services/       # Appels API (api.js déjà configuré)
    ├── context/        # AuthContext à compléter
    ├── hooks/          # Hooks personnalisés à créer
    └── router/         # AppRouter (routes déjà définies)
```

---

## Pages à développer

| Page | Route | Fonctionnalités |
|------|-------|-----------------|
| **Login** | `/login` | Connexion, lien reset password |
| **Dashboard** | `/dashboard` | Statistiques, graphiques, alertes stock |
| **Médicaments** | `/medicaments` | CRUD médicaments (liste, ajout, edit, détail) |
| **Stock** | `/stock` | Mouvements, historique, alertes |
| **Ventes** | `/ventes` | Création facture, vente rapide, recherche |
| **Fournisseurs** | `/fournisseurs` | CRUD fournisseurs |
| **Clients** | `/clients` | CRUD clients, historique achats |

---

## 1. Authentification (priorité 1)

### Fichier : `src/context/AuthContext.jsx`

Compléter les fonctions :
- `login(email, password)` → POST `/api/auth/login`
- `logout()` → déjà implémenté
- Stocker le token JWT dans `localStorage`

### Fichier : `src/pages/Login.jsx`

- Formulaire email + mot de passe
- Gestion des erreurs
- Redirection vers `/dashboard` après connexion
- Route protégée : rediriger vers `/login` si non connecté

### Hook à créer : `src/hooks/useProtectedRoute.js`

Protéger les routes qui nécessitent une connexion.

---

## 2. Service API

Le fichier `src/services/api.js` est prêt. Utilisez-le ainsi :

```javascript
import api from '../services/api';

// GET
const medicaments = await api.get('/medicaments');

// POST
await api.post('/medicaments', { nom: 'Paracétamol', prixVente: 5.99, ... });

// PUT
await api.put('/medicaments/1', { nom: 'Paracétamol 500mg' });

// DELETE
await api.delete('/medicaments/1');
```

Créer des services dédiés dans `src/services/` :
- `authService.js`
- `medicamentService.js`
- `stockService.js`
- `venteService.js`
- etc.

---

## 3. Dashboard

Afficher :
- Nombre de médicaments
- Nombre de ventes du jour/mois
- Chiffre d'affaires
- Produits les plus vendus
- Alertes de stock (stock faible, rupture, expiration)

Endpoints backend attendus (Étudiant 2) :
- `GET /api/dashboard/stats`
- `GET /api/dashboard/alertes`

Graphiques recommandés : Chart.js ou Recharts.

---

## 4. Gestion des rôles

Afficher/masquer des éléments selon le rôle :

| Rôle | Accès |
|------|-------|
| ADMIN | Tout + gestion utilisateurs |
| PHARMACIEN | Médicaments, Stock |
| CAISSIER | Ventes, consultation stock |

Le rôle est dans le JWT décodé ou renvoyé par `/api/auth/me`.

---

## 5. Design responsive

- Le layout sidebar est déjà responsive (`Layout.css`)
- Utiliser CSS Grid/Flexbox
- Tester sur mobile (375px) et tablette (768px)

---

## Démarrage local

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend accessible sur http://localhost:3000

---

## Variables d'environnement

```
VITE_API_URL=http://localhost:5000/api
VITE_SENTRY_DSN=
```

---

## Coordination

| Besoin | Contact |
|--------|---------|
| Endpoints API | Étudiant 2 (Backend) |
| Structure des données | Étudiant 3 (BDD) — voir `backend/src/prisma/schema.prisma` |
| URL API production | Étudiant 4 (DevOps) |

---

## Checklist livrables

- [ ] Page Login fonctionnelle
- [ ] Routes protégées par authentification
- [ ] Dashboard avec statistiques
- [ ] CRUD Médicaments
- [ ] Page Stock (mouvements + alertes)
- [ ] Page Ventes (facturation)
- [ ] CRUD Fournisseurs
- [ ] CRUD Clients
- [ ] Interface responsive
- [ ] Gestion des rôles (affichage conditionnel)
