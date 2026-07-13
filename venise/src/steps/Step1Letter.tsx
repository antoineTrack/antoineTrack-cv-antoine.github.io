import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MOT_TRENTE_JUILLET } from '../data/content'

// =====================================================================
//  Étape 1 — Le mot du 30 juillet
//  Le texte s'affiche progressivement, ligne par ligne (fade-in).
//  Un bouton « continuer » débloque la suite (visible une fois le mot lu).
// =====================================================================
export default function Step1Letter({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  // Nombre de lignes actuellement révélées
  const [visibles, setVisibles] = useState(reduit ? MOT_TRENTE_JUILLET.length : 0)

  useEffect(() => {
    if (reduit) return
    // Révèle une ligne toutes les ~1.1s
    const timers: number[] = []
    MOT_TRENTE_JUILLET.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibles(i + 1), 900 + i * 1100))
    })
    return () => timers.forEach(clearTimeout)
  }, [reduit])

  const termine = visibles >= MOT_TRENTE_JUILLET.length

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24">
      <p className="etiquette mb-6">30 juillet</p>

      {/* Carte « papier à lettres » */}
      <div
        className="w-full max-w-md bg-papier/70 rounded-md px-7 py-10 shadow-carte
                   border border-brun-doux/15"
      >
        <div className="space-y-3 min-h-[8rem]">
          {MOT_TRENTE_JUILLET.map((ligne, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={i < visibles ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7 }}
              className={`font-display text-2xl sm:text-[1.7rem] leading-snug text-brun
                ${i === visibles - 1 && !termine ? 'caret' : ''}`}
            >
              {ligne}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Bouton continuer — apparaît une fois le mot terminé */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={termine ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10"
      >
        <button
          type="button"
          onClick={onContinuer}
          className="btn-dossier"
          // Désactivé tant que le mot n'est pas terminé (mais focusable ensuite)
          disabled={!termine}
        >
          Continuer
        </button>
      </motion.div>
    </div>
  )
}
