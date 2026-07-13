# 🎟️ Dossier Confidentiel — Venise (notre 1 an)

Un site web interactif, façon **mission secrète / carnet de voyage vénitien**, qui révèle
étape par étape un week-end surprise à Venise (18–21 septembre 2026).

Ce n'est pas une page qui défile : c'est une **chasse au trésor en 7 étapes déverrouillables**.

- **Étape 0** — L'enveloppe scellée (on brise le cachet de cire)
- **Étape 1** — Le mot du 30 juillet (effet machine à écrire)
- **Étape 2** — Notre histoire (timeline de polaroïds)
- **Étape 3** — La devinette (5 indices, il faut trouver « Venise »)
- **Étape 4** — La révélation (VENISE + cartes d'embarquement + compte à rebours en direct)
- **Étape 5** — Le programme des 3 jours (accordéon)
- **Étape 6** — Le dernier mot (+ pluie de cœurs)

La progression est **sauvegardée automatiquement** (localStorage) : elle peut fermer et
rouvrir sans repartir de zéro.

---

## 🚀 Lancer en local

Il faut [Node.js](https://nodejs.org) (version 18 ou plus).

```bash
cd venise
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée (par défaut http://localhost:5173).

Pour construire la version de production :

```bash
npm run build      # génère le dossier dist/
npm run preview    # prévisualise le build en local
```

---

## 🖼️ Ajouter tes vraies photos

Les photos vivent dans **`public/photos/`**. Dépose-les avec **exactement** ces noms :

| Fichier         | Moment                                            |
| --------------- | ------------------------------------------------- |
| `capdagde.jpg`  | La plage au Cap d'Agde (l'été dernier)            |
| `amnesia.jpg`   | L'Amnésia (premier baiser)                        |
| `annecy.jpg`    | Un week-end à Annecy                              |
| `noel.jpg`      | Notre premier Noël                                |
| `dixhuit.jpg`   | Nos 18 ans / rencontre des familles               |
| `concert.jpg`   | Le concert de SDM                                 |
| `rose.jpg`      | (bonus, non utilisée par défaut)                  |
| `dernier.jpg`   | (bonus, non utilisée par défaut)                  |

- Tant qu'une photo manque, un joli **fond dégradé « coucher de soleil »** s'affiche à sa
  place : le site reste présentable même sans photos.
- Format conseillé : **JPG portrait ~4:5**, largeur ~1000 px, poids < 500 Ko.
- Pas besoin de toucher au code : il suffit de déposer les fichiers avec les bons noms.

### Modifier les textes

Tout le texte (le mot du 30 juillet, la timeline, les indices, les vols, le programme,
le dernier mot) est regroupé dans un seul fichier :

> **`src/data/content.ts`**

C'est le seul fichier à éditer pour changer un mot, une date ou une légende.

---

## 🌐 Déployer sur Netlify

### Option A — Depuis l'interface Netlify (le plus simple)

1. Va sur [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Connecte ton dépôt GitHub `antoinetrack-cv-antoine.github.io`.
3. Dans les réglages de build, indique :
   - **Base directory** : `venise`
   - **Build command** : `npm run build`
   - **Publish directory** : `venise/dist`
4. Clique sur **Deploy**. Netlify te donne une URL (que tu peux personnaliser).

> Le fichier `netlify.toml` est déjà présent : si tu règles bien le **Base directory** sur
> `venise`, la commande de build et le dossier `dist` sont pris en compte automatiquement.

### Option B — En ligne de commande

```bash
npm install -g netlify-cli
cd venise
npm run build
netlify deploy --prod --dir=dist
```

### Vercel (alternative)

Même principe : **Root Directory** = `venise`, framework détecté = *Vite*.

---

## 🎨 Direction artistique

- **Palette** (identique au dossier papier) : crème `#F3ECE0`, papier `#EADFC9`,
  ocre `#B5824A`, brun texte `#4A2E12`, brun doux `#8F5A2A`, terracotta `#C77B4A`,
  coucher de soleil `#E8823F`, pêche `#F0C9A0`, bleu canal `#2E5F80`, rouge cachet `#8B3A3A`.
- **Typographies** (Google Fonts) : **Fraunces** (titres), **Literata** (corps),
  **Space Mono** (détails « dossier »).
- Grain papier subtil, cachet de cire, tampons, illustration SVG de Venise, animations
  douces. **`prefers-reduced-motion`** est respecté.

## 🧱 Stack technique

React + Vite + TypeScript · Tailwind CSS · Framer Motion · machine à états maison
(persistée dans localStorage). Mobile-first et accessible (focus clavier, contrastes, `alt`).

---

## 🗂️ Structure du projet

```
venise/
├── index.html
├── src/
│   ├── main.tsx · App.tsx (machine à états) · index.css · types.ts
│   ├── data/content.ts          ← TOUS les textes et données
│   ├── hooks/                    ← useProgress (localStorage), useReducedMotion
│   ├── components/               ← ProgressBar, Polaroid, WaxSeal, VeniceScene, Confetti…
│   └── steps/                    ← une étape = un composant (Step0…Step6)
└── public/photos/                ← tes photos
```

> Petit détail : un bouton discret « ↺ » en bas à droite réinitialise la progression
> (pratique pour tester du début). Tu peux le retirer dans `src/App.tsx` avant de lui offrir.

Bon anniversaire à vous deux. ✈️❤️
