// Types partagés du projet

/** Un moment de notre histoire (étape 2 — timeline) */
export interface Moment {
  /** Nom du fichier photo dans /public/photos (sans le chemin) */
  photo: string
  /** Texte alternatif accessible pour l'image */
  alt: string
  /** Légende affichée sous le polaroïd */
  legende: string
  /** Petite date/étiquette façon dossier (optionnelle) */
  date?: string
  /** Inclinaison en degrés pour l'effet « posé à la main » */
  inclinaison: number
}

/** Un vol (étape 4 — carte d'embarquement) */
export interface Vol {
  type: 'Aller' | 'Retour'
  date: string
  heure: string
  depart: string
  arrivee: string
  heureArrivee: string
  villeDepart: string
  villeArrivee: string
}

/** Une journée du programme (étape 5) */
export interface Journee {
  id: string
  titre: string
  sousTitre: string
  activites: string[]
}
