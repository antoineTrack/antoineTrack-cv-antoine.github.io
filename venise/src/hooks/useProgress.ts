import { useCallback, useEffect, useState } from 'react'

// =====================================================================
//  Machine à états « maison » de la progression.
//  - 7 étapes : 0 (enveloppe) … 6 (dernier mot)
//  - On mémorise l'étape courante ET l'étape max débloquée
//  - Tout est persisté dans localStorage : elle peut fermer / rouvrir
//    sans repartir de zéro.
// =====================================================================

export const NB_ETAPES = 7 // étapes 0 → 6
/** Étapes « comptées » dans la barre de progression (1 → 6, l'enveloppe est l'intro). */
export const PREMIERE_ETAPE_COMPTEE = 1
export const DERNIERE_ETAPE = 6

const CLE_STORAGE = 'venise-progress-v1'

interface EtatProgress {
  /** Étape actuellement affichée */
  courante: number
  /** Étape la plus avancée jamais atteinte (déverrouillage) */
  maxDebloquee: number
}

function lireStorage(): EtatProgress {
  try {
    const brut = localStorage.getItem(CLE_STORAGE)
    if (brut) {
      const parse = JSON.parse(brut) as Partial<EtatProgress>
      const courante = clamp(parse.courante ?? 0)
      const maxDebloquee = clamp(parse.maxDebloquee ?? 0)
      return { courante, maxDebloquee: Math.max(courante, maxDebloquee) }
    }
  } catch {
    /* stockage indisponible (mode privé, quota) : on repart proprement */
  }
  return { courante: 0, maxDebloquee: 0 }
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0
  return Math.min(Math.max(n, 0), DERNIERE_ETAPE)
}

export function useProgress() {
  const [etat, setEtat] = useState<EtatProgress>(() => lireStorage())

  // Persistance à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(CLE_STORAGE, JSON.stringify(etat))
    } catch {
      /* on ignore : l'expérience reste jouable sans persistance */
    }
  }, [etat])

  /** Débloque l'étape suivante et s'y rend (appelé quand une étape est « réussie »). */
  const avancer = useCallback(() => {
    setEtat((e) => {
      const suivante = clamp(e.courante + 1)
      return { courante: suivante, maxDebloquee: Math.max(e.maxDebloquee, suivante) }
    })
  }, [])

  /** Va à une étape précise (utilisé par la barre de progression, uniquement si débloquée). */
  const allerA = useCallback((cible: number) => {
    setEtat((e) => {
      const c = clamp(cible)
      if (c > e.maxDebloquee) return e // interdit de sauter une étape verrouillée
      return { ...e, courante: c }
    })
  }, [])

  /** Revenir à l'étape précédente. */
  const reculer = useCallback(() => {
    setEtat((e) => ({ ...e, courante: clamp(e.courante - 1) }))
  }, [])

  /** Réinitialise tout (bouton discret pour toi, en dev). */
  const reinitialiser = useCallback(() => {
    setEtat({ courante: 0, maxDebloquee: 0 })
  }, [])

  return {
    courante: etat.courante,
    maxDebloquee: etat.maxDebloquee,
    avancer,
    allerA,
    reculer,
    reinitialiser,
  }
}
