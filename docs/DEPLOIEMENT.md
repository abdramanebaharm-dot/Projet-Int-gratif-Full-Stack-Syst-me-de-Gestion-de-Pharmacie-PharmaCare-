# Guide de déploiement cloud — PharmaCare

## Architecture de déploiement

```
[Vercel/Netlify]          [Railway/Render]         [Railway/Supabase]
   Frontend    ──API──▶      Backend      ──▶      PostgreSQL
  React/Vite              Express/Node
```

---

## 1. Base de données PostgreSQL

### Option A — Railway

1. Créer un compte sur https://railway.app
2. New Project → Provision PostgreSQL
3. Copier la `DATABASE_URL` (onglet Connect)

### Option B — Supabase

1. Créer un projet sur https://supabase.com
2. Settings → Database → Connection string (URI)
3. Remplacer `[YOUR-PASSWORD]` par le mot de passe du projet

---

## 2. Backend (Railway ou Render)

### Railway

1. New Service → Deploy from GitHub repo
2. Root directory : `backend`
3. Variables d'environnement :

```
PORT=5000
NODE_ENV=production
DATABASE_URL=<url_postgresql>
JWT_SECRET=<generer_une_cle_forte>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://votre-frontend.vercel.app
SENTRY_DSN=<votre_dsn_sentry>
```

4. Start command :
```
npx prisma migrate deploy --schema=src/prisma/schema.prisma && node src/server.js
```

### Render

1. New Web Service → Connect GitHub
2. Root directory : `backend`
3. Build command : `npm install && npx prisma generate --schema=src/prisma/schema.prisma`
4. Start command : identique à Railway
5. Ajouter les mêmes variables d'environnement

---

## 3. Frontend (Vercel ou Netlify)

### Vercel

1. Import GitHub repo sur https://vercel.com
2. Root directory : `frontend`
3. Framework preset : Vite
4. Variables d'environnement :

```
VITE_API_URL=https://votre-backend.railway.app/api
VITE_SENTRY_DSN=<votre_dsn_sentry_frontend>
```

### Netlify

1. Import repo → Base directory : `frontend`
2. Build command : `npm run build`
3. Publish directory : `dist`
4. Mêmes variables d'environnement que Vercel

---

## 4. Migrations en production

Après chaque modification du schéma Prisma par l'Étudiant 3 :

```bash
# En local, pointer vers la BDD de production (avec précaution)
DATABASE_URL="postgresql://..." npx prisma migrate deploy --schema=backend/src/prisma/schema.prisma
```

Ou laisser Railway/Render exécuter les migrations au démarrage (déjà configuré).

---

## 5. Seed des comptes de test

```bash
cd backend
DATABASE_URL="postgresql://..." npm run db:seed
```

Comptes créés :
| Email | Rôle | Mot de passe |
|-------|------|-------------|
| admin@pharmacare.com | ADMIN | admin123 |
| pharmacien@pharmacare.com | PHARMACIEN | admin123 |
| caissier@pharmacare.com | CAISSIER | admin123 |

---

## 6. Vérification post-déploiement

```bash
# Health check backend
curl https://votre-backend.railway.app/api/health

# Réponse attendue
{"status":"ok","service":"PharmaCare API","timestamp":"..."}
```

---

## 7. Sentry

1. Créer 2 projets sur sentry.io : `pharmacare-backend` et `pharmacare-frontend`
2. Copier les DSN dans les variables d'environnement respectives
3. Tester en provoquant une erreur volontaire en dev
