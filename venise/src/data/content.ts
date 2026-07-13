// =====================================================================
//  Contenu du dossier — tous les TEXTES EXACTS et données sont ici.
//  (Un seul endroit à modifier si tu veux ajuster un mot.)
// =====================================================================

import type { Moment, Vol, Journee } from '../types'

// ---------- Étape 1 — Le mot du 30 juillet ----------
// Affiché ligne par ligne (effet machine à écrire).
export const MOT_TRENTE_JUILLET: string[] = [
  'Aujourd’hui ça fait un an…',
  'du rire, de l’amour sincère,',
  'du partage et du voyage.',
  'J’ai préparé quelque chose.',
]

// ---------- Étape 2 — Notre histoire (timeline) ----------
export const MOMENTS: Moment[] = [
  {
    photo: 'capdagde.jpg',
    alt: 'Une plage au Cap d’Agde, l’été dernier',
    legende: 'L’été dernier — une plage au Cap d’Agde. Jogging noir, on s’est remarqués.',
    date: 'Été',
    inclinaison: -4,
  },
  {
    photo: 'amnesia.jpg',
    alt: 'Ambiance de nuit à l’Amnésia',
    legende: 'Quelques nuits plus tard — premier baiser, à l’Amnésia.',
    date: 'Nuit',
    inclinaison: 3,
  },
  {
    photo: 'annecy.jpg',
    alt: 'Un week-end au lac d’Annecy',
    legende: 'Nos week-ends à Annecy.',
    date: 'Escapades',
    inclinaison: -3,
  },
  {
    photo: 'noel.jpg',
    alt: 'Notre premier Noël ensemble',
    legende: 'Notre premier Noël.',
    date: 'Décembre',
    inclinaison: 4,
  },
  {
    photo: 'dixhuit.jpg',
    alt: 'Nos 18 ans',
    legende: 'Nos permis presque en même temps, nos 18 ans, la rencontre des familles.',
    date: 'Nos 18 ans',
    inclinaison: -2,
  },
  {
    photo: 'concert.jpg',
    alt: 'Le concert de SDM',
    legende: 'La panne de la veille d’Annecy (la voiture du grand-père) — puis le concert de SDM.',
    date: 'Live',
    inclinaison: 3,
  },
]

// ---------- Étape 3 — La devinette ----------
export const INDICES: string[] = [
  'Je n’ai pas de bruit de moteurs, seulement le clapot de l’eau.',
  'On me traverse debout, porté par une seule rame.',
  'Une fois par an, mille visages me recouvrent.',
  'Mon cœur porte le nom d’un évangéliste ailé.',
  'Née de la mer, jamais je ne sombre.',
]

/** Réponses acceptées (comparaison insensible à la casse et aux accents). */
export const REPONSES_VALIDES: string[] = ['venise', 'venice', 'venezia']

// ---------- Étape 4 — La révélation ----------
export const VOLS: Vol[] = [
  {
    type: 'Aller',
    date: '18 SEP 2026',
    heure: '20:00',
    depart: 'LYS',
    arrivee: 'VCE',
    heureArrivee: '21:20',
    villeDepart: 'Lyon',
    villeArrivee: 'Venise',
  },
  {
    type: 'Retour',
    date: '21 SEP 2026',
    heure: '22:00',
    depart: 'VCE',
    arrivee: 'LYS',
    heureArrivee: '23:25',
    villeDepart: 'Venise',
    villeArrivee: 'Lyon',
  },
]

/** Décollage aller : 18 septembre 2026, 20:00, heure de Paris (CEST = UTC+2). */
export const DATE_DECOLLAGE = new Date('2026-09-18T20:00:00+02:00')

// ---------- Étape 5 — Le programme ----------
export const PROGRAMME: Journee[] = [
  {
    id: 'vendredi',
    titre: 'Vendredi soir',
    sousTitre: 'On pose les valises',
    activites: [
      'Arrivée à Venise',
      'Balade dans Cannaregio de nuit',
      'Premier gelato',
    ],
  },
  {
    id: 'samedi',
    titre: 'Samedi',
    sousTitre: 'Le grand jour',
    activites: [
      'Rialto au lever du jour',
      'Place & Basilique Saint-Marc',
      'Palais des Doges + Pont des Soupirs',
      'Cicchetti le soir',
    ],
  },
  {
    id: 'dimanche',
    titre: 'Dimanche',
    sousTitre: 'Les couleurs, puis le retour',
    activites: [
      'Burano, les îles colorées',
      'Campo Santa Margherita',
      'Dernière glace',
      'Vol retour à 22h',
    ],
  },
]

// ---------- Étape 6 — Le dernier mot ----------
export const DERNIER_MOT = {
  paragraphe:
    'Ce dossier se referme ici. Le suivant est déjà ouvert : il durera toute la vie, si tu veux bien.',
  signature: 'Joyeux premier anniversaire, mon amour.',
}
