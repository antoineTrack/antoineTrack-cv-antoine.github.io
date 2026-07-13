// Types partagés du projet « Opération Cité Flottante »

/** Une photo en polaroïd */
export interface Moment {
  photo: string // nom du fichier dans /public/photos
  alt: string // texte alternatif accessible
  legende: string // légende manuscrite sous le polaroïd
  inclinaison: number // inclinaison en degrés
}

/** Un élément du bilan (enveloppe 2) */
export interface BilanItem {
  titre: string
  note: string
  photo?: string // vignette ronde optionnelle
}

/** Un indice de la devinette (enveloppe 3) */
export interface Indice {
  l1: string
  l2: string
}

/** Un vol / carte d'embarquement (enveloppe 4) */
export interface Vol {
  entete: string
  date: string
  heure: string
  heureArrivee: string
  depart: string
  villeDepart: string
  arrivee: string
  villeArrivee: string
  detail: string
}

/** Un défi à cocher à Venise (enveloppe 5) */
export interface DefiItem {
  titre: string
  note: string
}
