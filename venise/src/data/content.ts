// =====================================================================
//  Contenu du dossier « Opération Cité Flottante »
//  Reproduction FIDÈLE du dossier papier (textes exacts).
//  C'est le seul fichier à modifier pour ajuster un mot.
// =====================================================================

import type { BilanItem, DefiItem, Indice, Moment, Vol } from '../types'

// Nom de code + pied de page présents sur chaque « page » du dossier
export const OPERATION = 'Opération Cité Flottante'
export const PIED_DE_PAGE = 'Opération Cité Flottante · dossier confidentiel'

// ---------- Le mot d'introduction — 30 juillet ----------
export const MOT_INTRO = {
  surTitre: 'Un mot avant de commencer — à lire en premier',
  titre: '30 juillet',
  // Paragraphes révélés progressivement
  paragraphes: [
    ['Aujourd’hui, ça fait un an.'],
    ['Un an de rire, d’amour sincère,', 'de partage et de voyage.'],
    [
      'Je voulais marquer le coup. Alors j’ai préparé',
      'quelque chose : des enveloppes, à ouvrir dans l’ordre.',
    ],
    [
      'La troisième te posera une devinette —',
      'trouve la réponse avant d’ouvrir la suivante.',
    ],
  ],
  signature: 'Joyeux anniversaire, mon amour.',
  sousSignature: 'I love you baby',
  photo: 'rose.jpg',
  photoLegende: 'I love you baby',
  photoAlt: 'Une rose, le 30 juillet',
}

// ---------- Enveloppe 1 — Là où tout a commencé ----------
export const ENVELOPPE_1 = {
  numero: 1,
  titre: 'Là où tout a commencé',
  sujet: 'Été, Cap d’Agde. Pièce fondatrice du dossier.',
  paragraphes: [
    'Les faits remontent à un après-midi de plage, au Cap d’Agde.',
    'Sur la plage, on décide de rejoindre un groupe repéré sur le sable. Idée audacieuse. Résultat inespéré.',
    'Dans le groupe : un garçon tout en noir — jogging noir, t-shirt noir, en pleine plage. Un choix vestimentaire discutable. Et pourtant, tu l’as remarqué. Et tu ne l’as jamais oublié.',
    'Quelques nuits plus tard, à l’Amnésia : au milieu de la foule et de la musique, un premier baiser. À cet instant précis, deux histoires n’en sont devenues qu’une.',
  ],
  conclusion:
    'Conclusion du dossier : coup de foudre confirmé. Aucune amnésie constatée depuis.',
  tampon: 'Authentifié',
  photos: [
    { photo: 'capdagde.jpg', alt: 'Le Cap d’Agde, l’été où tout a commencé', legende: 'l’été où tout a commencé', inclinaison: -3 },
    { photo: 'amnesia.jpg', alt: 'Nos soirées', legende: 'nos soirées', inclinaison: 3 },
  ] as Moment[],
}

// ---------- Enveloppe 2 — Une année à deux (le bilan) ----------
export const ENVELOPPE_2 = {
  numero: 2,
  titre: 'Une année à deux — le bilan',
  sujet: 'Tout est vrai. Tout est vérifié. Tout est validé avec mention.',
  items: [
    { titre: 'Les week-ends à Annecy', note: 'notre échappée entre lac et montagnes — jamais lassante', photo: 'annecy.jpg' },
    { titre: 'Notre premier Noël ensemble', note: 'le premier d’une longue série', photo: 'noel.jpg' },
    { titre: 'Nos permis, décrochés presque ensemble', note: 'et deux voitures quasi jumelles — coïncidence ? Non : destin.' },
    { titre: 'Nos 18 ans, célébrés côte à côte', note: 'le passage à l’âge adulte, main dans la main', photo: 'dixhuit.jpg' },
    { titre: 'La rencontre de nos familles', note: 'présentations officielles réussies — approuvés à l’unanimité' },
    { titre: 'La panne de la veille d’Annecy', note: 'voiture du grand-père réquisitionnée : rien ne nous arrête' },
    { titre: 'L’épisode de l’aire d’autoroute', note: 'dossier scellé. Nous nierons tout, toujours.' },
    { titre: 'Le concert de SDM et Jok’Air', note: 'à hurler les paroles ensemble, au milieu de la foule', photo: 'concert.jpg' },
  ] as BilanItem[],
  bilan: [
    'Bilan officiel de l’année :',
    'nous deux, c’est du rire, de l’amour sincère,',
    'du partage et du voyage.',
  ],
  piecesTagline: '— et ce n’est que le début de la collection —',
}

// ---------- Enveloppe 3 — La devinette ----------
export const ENVELOPPE_3 = {
  numero: 3,
  titre: 'Qui suis-je ?',
  sujet: 'Résous l’énigme avant d’ouvrir la suite. Pas de triche !',
  indices: [
    { l1: 'Je n’ai pas de bruit de moteurs,', l2: 'seulement le clapot de l’eau.' },
    { l1: 'On me traverse debout,', l2: 'porté par une seule rame.' },
    { l1: 'Une fois par an,', l2: 'mille visages me recouvrent.' },
    { l1: 'Mon cœur porte le nom', l2: 'd’un évangéliste ailé.' },
    { l1: 'Née de la mer,', l2: 'jamais je ne sombre.' },
  ] as Indice[],
  note: '(Bonne réponse ou pas, l’enveloppe suivante te le dira.)',
}

/** Réponses acceptées (insensible à la casse et aux accents). */
export const REPONSES_VALIDES: string[] = ['venise', 'venice', 'venezia']

// ---------- Enveloppe 4 — La destination révélée ----------
export const ENVELOPPE_4 = {
  numero: 4,
  titre: 'La destination — révélée',
  sujet: 'Aujourd’hui tu ouvres cette enveloppe. En septembre, on décolle.',
  accroche: 'Alors, trouvé ? Bravo (ou pas, on t’aime pareil).',
  grandMot: 'C’est Venise. Toi et moi. Trois jours.',
  campBase: 'Notre camp de base : Marghera, au bord de la lagune.',
  cloture: 'Les billets sont réservés. Il ne te reste qu’à dire oui.',
  tampon: 'Réservé & confirmé',
}

export const VOLS: Vol[] = [
  {
    entete: 'Aller — le grand départ',
    date: 'Vendredi 18 sept. 2026',
    heure: '20:00',
    heureArrivee: '21:20',
    depart: 'LYS',
    villeDepart: 'Lyon',
    arrivee: 'VCE',
    villeArrivee: 'Venise',
    detail: 'Volotea — direct — 1h20',
  },
  {
    entete: 'Retour — des souvenirs plein les valises',
    date: 'Lundi 21 sept. 2026',
    heure: '22:00',
    heureArrivee: '23:25',
    depart: 'VCE',
    villeDepart: 'Venise',
    arrivee: 'LYS',
    villeArrivee: 'Lyon',
    detail: 'Volotea — direct — 1h20',
  },
]

/** Décollage aller : 18 septembre 2026, 20:00, heure de Paris (CEST = UTC+2). */
export const DATE_DECOLLAGE = new Date('2026-09-18T20:00:00+02:00')

// ---------- Enveloppe 5 — Nos défis à Venise ----------
export const ENVELOPPE_5 = {
  numero: 5,
  titre: 'Nos défis à Venise',
  sujet: 'À cocher sur place. À deux, tout compte double.',
  defis: [
    { titre: 'Traverser la lagune en train', note: 'et voir la ville apparaître au milieu de l’eau' },
    { titre: 'Remonter le Grand Canal en vaporetto', note: 'le « bus-bateau » des Vénitiens, au coucher du soleil' },
    { titre: 'Se perdre volontairement dans les ruelles', note: 'sans téléphone, jusqu’à trouver une place déserte' },
    { titre: 'La place Saint-Marc au réveil', note: 'avant la foule, quand elle n’appartient qu’aux amoureux' },
    { titre: 'Un spritz au bord d’un canal', note: 'pour trinquer à l’année écoulée — et à toutes les autres' },
    { titre: 'Sceller un secret sur un pont', note: 'celui que nous choisirons sera le nôtre pour toujours' },
    { titre: 'Le défi bonus, gardé secret', note: 'révélé sur place, le moment venu…' },
  ] as DefiItem[],
  tampon: 'Priorité : amour',
}

// ---------- Enveloppe 6 — Le dernier mot ----------
export const ENVELOPPE_6 = {
  numero: 6,
  titre: 'Le dernier mot',
  paragraphes: [
    [
      'Tout a commencé sur une plage du Cap d’Agde,',
      'un jour un peu audacieux,',
      'avec un garçon tout en noir qui ne savait pas encore',
      'qu’il vivait le plus beau jour de sa vie.',
    ],
    [
      'Un an plus tard, nous voilà sur un pont de Venise.',
      'Entre les deux : Annecy, un Noël, deux permis,',
      'deux familles, une panne mémorable — et ce rire',
      'qui ne nous a jamais quittés.',
    ],
    [
      'Ce dossier se referme ici. Le suivant est déjà ouvert :',
      'il durera toute la vie, si tu veux bien.',
    ],
  ],
  signature: 'Joyeux premier anniversaire, mon amour.',
  sousSignature: 'Celui qui t’aime — depuis un an, et pour longtemps.',
  tampon: 'S’autodétruit dans un câlin',
  photo: 'dernier.jpg',
  photoAlt: 'Nous deux, à Venise',
}
