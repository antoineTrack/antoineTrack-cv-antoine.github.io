import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROGRAMME } from '../data/content'

// =====================================================================
//  Étape 5 — Le programme du week-end
//  Les 3 jours en accordéon cliquable (un jour ouvert à la fois).
// =====================================================================
export default function Step5Program({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  // Le premier jour est ouvert par défaut
  const [ouvert, setOuvert] = useState<string>(PROGRAMME[0].id)

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24">
      <p className="etiquette mb-3">Feuille de route</p>
      <h2 className="font-display text-4xl sm:text-5xl text-brun text-center mb-10">
        Trois jours à Venise
      </h2>

      <div className="w-full max-w-lg space-y-3">
        {PROGRAMME.map((jour) => {
          const actif = ouvert === jour.id
          const idBouton = `jour-btn-${jour.id}`
          const idPanneau = `jour-panneau-${jour.id}`
          return (
            <div
              key={jour.id}
              className="bg-papier/60 border border-brun-doux/20 rounded-lg overflow-hidden"
            >
              <h3>
                <button
                  id={idBouton}
                  type="button"
                  aria-expanded={actif}
                  aria-controls={idPanneau}
                  onClick={() => setOuvert(actif ? '' : jour.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span>
                    <span className="block font-display text-xl text-brun">{jour.titre}</span>
                    <span className="block font-body text-sm text-brun-doux">
                      {jour.sousTitre}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: actif ? 45 : 0 }}
                    transition={{ duration: reduit ? 0 : 0.2 }}
                    className="font-mono text-2xl text-terracotta shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {actif && (
                  <motion.div
                    id={idPanneau}
                    role="region"
                    aria-labelledby={idBouton}
                    initial={reduit ? { height: 'auto' } : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduit ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="px-5 pb-5 space-y-2">
                      {jour.activites.map((act, i) => (
                        <li key={i} className="flex items-start gap-3 font-body text-brun">
                          <span className="text-terracotta mt-1" aria-hidden="true">
                            ✶
                          </span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <button type="button" onClick={onContinuer} className="btn-dossier mt-12">
        Un dernier mot…
      </button>
    </div>
  )
}
