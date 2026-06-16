# PharmaCare — Guide Base de données (Étudiant 3)

## Votre mission

Concevoir, maintenir et optimiser le modèle de données PostgreSQL avec Prisma ORM.

---

## Fichiers sous votre responsabilité

```
backend/src/prisma/
├── schema.prisma     # Modèle de données (base déjà créée)
├── seed.js           # Données de test (base déjà créée)
└── migrations/       # Migrations Prisma (à générer)
```

---

## Schéma actuel

Le schéma de base est déjà défini dans `backend/src/prisma/schema.prisma` avec :

| Modèle | Description |
|--------|-------------|
| **User** | Utilisateurs (ADMIN, PHARMACIEN, CAISSIER) |
| **Medicament** | Médicaments avec catégorie, prix, stock, expiration |
| **MouvementStock** | Historique entrées/sorties/ajustements |
| **Fournisseur** | Fournisseurs |
| **Commande** | Commandes fournisseurs |
| **Client** | Clients avec fidélisation |
| **Vente** | Factures de vente |
| **LigneVente** | Détail produits par facture |

---

## Tâches à réaliser

### 1. Valider et compléter le schéma

Vérifier que le schéma couvre toutes les exigences du cahier des charges. Ajouter si nécessaire :

- [ ] Index sur les champs fréquemment recherchés (`nom`, `codeBarres`, `categorie`)
- [ ] Contraintes de validation (`@db.VarChar`, checks)
- [ ] Relations manquantes
- [ ] Champs optionnels vs obligatoires

### 2. Créer la migration initiale

```bash
cd backend
npm install
npm run db:generate
npm run db:migrate
# Nom suggéré : init
```

Cela crée le dossier `migrations/` — **à committer dans Git**.

### 3. Enrichir le seed

Compléter `backend/src/prisma/seed.js` avec :
- Médicaments de test (5-10)
- Fournisseurs (2-3)
- Clients (3-5)
- Quelques ventes et mouvements de stock

### 4. Optimisation PostgreSQL

Ajouter des index dans le schéma :

```prisma
model Medicament {
  // ...
  @@index([nom])
  @@index([categorie])
  @@index([dateExpiration])
}
```

---

## Relations du modèle

```
User ──────────< Vente >────────── Client
                    │
                    └──< LigneVente >── Medicament
                                           │
                    Fournisseur ───────────┘
                         │
                         └──< Commande

Medicament ──< MouvementStock
```

---

## Commandes Prisma utiles

```bash
# Générer le client Prisma après modification du schéma
npm run db:generate

# Créer une nouvelle migration
npm run db:migrate

# Appliquer le schéma sans migration (dev rapide)
npm run db:push

# Peupler la BDD
npm run db:seed

# Interface visuelle
npm run db:studio
```

---

## Workflow avec l'équipe

1. **Vous modifiez** `schema.prisma`
2. **Vous créez** une migration (`npm run db:migrate`)
3. **Vous commitez** schema + dossier migrations/
4. **Étudiant 2** utilise le client Prisma généré
5. **Étudiant 4** déploie les migrations en production

> **Règle importante** : Ne jamais modifier une migration déjà commitée. Créer une nouvelle migration à la place.

---

## Démarrage local

```bash
# Lancer PostgreSQL
docker compose -f docker-compose.dev.yml up -d

# Backend
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio   # Interface visuelle sur http://localhost:5555
```

---

## Comptes de test (seed)

| Email | Rôle | Mot de passe |
|-------|------|-------------|
| admin@pharmacare.com | ADMIN | admin123 |
| pharmacien@pharmacare.com | PHARMACIEN | admin123 |
| caissier@pharmacare.com | CAISSIER | admin123 |

---

## Enums définis

```prisma
enum Role {
  ADMIN
  PHARMACIEN
  CAISSIER
}

enum TypeMouvement {
  ENTREE
  SORTIE
  AJUSTEMENT
}
```

---

## Coordination

| Besoin | Contact |
|--------|---------|
| Requêtes métier / champs manquants | Étudiant 2 |
| Affichage des données | Étudiant 1 |
| Déploiement migrations prod | Étudiant 4 |

---

## Checklist livrables

- [ ] Schéma Prisma validé et complet
- [ ] Migration initiale créée et commitée
- [ ] Seed enrichi (médicaments, clients, fournisseurs)
- [ ] Index d'optimisation ajoutés
- [ ] Documentation des relations (ce fichier)
- [ ] Prisma Studio testé localement
