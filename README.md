# WeDev Platform

> Plateforme SaaS de solutions digitales pour PME marocaines — portfolio développeur + marketplace + système de démos live.

[![CI](https://github.com/reda7171/monportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/reda7171/monportfolio/actions)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript 5 strict |
| Styling | Tailwind CSS + CSS Variables (HSL) |
| UI | Shadcn/ui + Framer Motion |
| Auth | Better Auth (email/password + Google OAuth optionnel) |
| ORM | Prisma v7 |
| Database | PostgreSQL 16 (Docker) |
| i18n | next-intl (FR, AR, EN) |
| Uploads | API route locale (`/api/upload`) |
| CI/CD | GitHub Actions |

---

## Démarrage rapide

### 1. Prérequis

- Node.js 20+
- Docker Desktop
- Git

### 2. Installation

```bash
git clone https://github.com/reda7171/monportfolio.git
cd monportfolio/wedev
npm install
```

### 3. Variables d'environnement

```bash
cp .env.example .env.local
```

### 4. Base de données

```bash
docker-compose up -d
npx prisma migrate dev
npx prisma db seed
```

### 5. Lancer le serveur

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Architecture

```
wedev/
├── app/
│   ├── [locale]/              # Routes i18n (fr, ar, en)
│   │   ├── page.tsx           # Landing page
│   │   ├── marketplace/       # Marketplace + pages produits
│   │   ├── blog/              # Blog SEO + articles
│   │   ├── auth/              # Login + Register
│   │   ├── dashboard/         # Dashboard client
│   │   ├── admin/             # Dashboard admin
│   │   │   ├── products/      # CRUD produits
│   │   │   ├── orders/        # Pipeline commandes
│   │   │   ├── contacts/      # Pipeline contacts
│   │   │   └── blog/          # Gestion articles
│   │   ├── demo/[slug]/       # Session demo chrono
│   │   ├── not-found.tsx      # 404 animée
│   │   └── loading.tsx        # Skeleton loader
│   ├── api/
│   │   ├── auth/              # Better Auth handler
│   │   ├── contact/           # Formulaire contact
│   │   └── upload/            # Upload local
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── marketing/             # Sections landing page
│   └── ui/                    # Design system
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── db.ts
├── messages/                  # fr.json, ar.json, en.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml
└── .github/workflows/ci.yml
```

---

## Pages

| URL | Description |
|---|---|
| `/fr` | Landing page complète |
| `/fr/marketplace` | Marketplace (filtres, tri, vues) |
| `/fr/marketplace/[slug]` | Page produit avec démo |
| `/fr/blog` | Liste articles SEO |
| `/fr/blog/[slug]` | Article avec metadata OG |
| `/fr/auth/login` | Connexion |
| `/fr/auth/register` | Inscription |
| `/fr/dashboard` | Dashboard client |
| `/fr/admin` | Dashboard admin KPI |
| `/fr/admin/products` | CRUD produits |
| `/fr/admin/orders` | Pipeline commandes |
| `/fr/admin/contacts` | Pipeline contacts |
| `/fr/admin/blog` | Gestion articles |
| `/sitemap.xml` | Sitemap SEO dynamique |
| `/robots.txt` | Règles robots |

---

## Commandes DB utiles

```bash
npx prisma studio          # UI graphique
npx prisma migrate reset   # Reset complet
npx prisma generate        # Régénérer client
npx prisma db push         # Push schema (dev)
```

---

## Déploiement

```bash
docker-compose up -d
npx prisma migrate deploy
npx prisma db seed
npm run build
npm start
```

---

## Licence

Propriété de WeDev. Tous droits réservés.
