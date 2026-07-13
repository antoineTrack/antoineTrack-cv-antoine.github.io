# 🎯 Devine la destination — le jeu « Venise »

Un petit jeu web complet : une ville se cache derrière des indices, et il faut la
deviner… c'est **Venise**. Pensé mobile-first, romantique et ludique.

## 🕹️ Le jeu

- **8 indices progressifs** de plusieurs types : énigmes poétiques, un **rébus** en
  emojis, une **anagramme**, et un **fait** presque explicite.
- Une **carte postale mystère** qui se **dé-floute** à chaque indice révélé (nette à la
  victoire).
- Une **note sur 10** (10/10 au départ, −1 par indice révélé, −0,5 par erreur),
  un **chrono** et le **nombre d'essais**.
- Un **feedback « chaud / froid »** : selon ta réponse, le jeu te dit si tu approches
  (bon pays 🔥, ville d'eau 💧, symbole de la ville 🎭, ou froid ❄️), avec l'historique
  de tes tentatives.
- Réponse **tolérante** : accepte `venise`, `venice`, `venezia`, insensible à la casse et
  aux accents.
- Écran de **victoire** avec récap + **meilleur score** conservé (localStorage).
- Bouton **rejouer**, animations douces, `prefers-reduced-motion` respecté.

## 🎨 Style

Palette romantique (rose poudré & bordeaux), typographies Google Fonts
(**Fraunces**, **Literata**, **Space Mono**), léger grain papier, illustration de
Venise en SVG.

## 🚀 Lancer en local

```bash
cd venise
npm install
npm run dev      # http://localhost:5173
```

Build de production :

```bash
npm run build    # génère dist/
npm run preview
```

## 🌐 Déployer sur Netlify

Déjà en place. À l'import du dépôt : **Base directory** = `venise`,
**Build command** = `npm run build`, **Publish directory** = `dist`
(le fichier `netlify.toml` est fourni).

## 🗂️ Où changer les choses

Tout le jeu tient dans un seul fichier : **`src/Jeu.tsx`**
(les indices, le barème de score, les messages « chaud / froid », les réponses acceptées).

```
venise/
├── index.html
└── src/
    ├── App.tsx           ← monte le jeu
    ├── Jeu.tsx           ← TOUT le jeu (indices, score, feedback…)
    ├── components/       ← Confetti, VeniceScene (SVG), Stamp, NoiseOverlay
    └── hooks/            ← useReducedMotion
```
