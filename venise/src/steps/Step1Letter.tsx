import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MOT_INTRO } from '../data/content'
import DossierPage from '../components/DossierPage'
import Polaroid from '../components/Polaroid'

// =====================================================================
//  Étape 1 — Le mot du 30 juillet (page 2 du dossier papier)
//  Les paragraphes s'affichent progressivement, puis la signature.
// =====================================================================
export default function Step1Letter({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  const total = MOT_INTRO.paragraphes.length
  const [visibles, setVisibles] = useState(reduit ? total : 0)

  useEffect(() => {
    if (reduit) return
    const timers: number[] = []
    MOT_INTRO.paragraphes.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibles(i + 1), 700 + i * 1400))
    })
    return () => timers.forEach(clearTimeout)
  }, [reduit, total])

  const termine = visibles >= total

  return (
    <DossierPage surTitre={MOT_INTRO.surTitre} titre={MOT_INTRO.titre} centre>
      <div className="mt-2 space-y-5 text-center min-h-[9rem]">
        {MOT_INTRO.paragraphes.map((lignes, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={i < visibles ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.7 }}
            className="font-body text-lg sm:text-xl leading-relaxed text-brun"
          >
            {lignes.map((l, j) => (
              <span key={j}>
                {l}
                {j < lignes.length - 1 && <br />}
              </span>
            ))}
          </motion.p>
        ))}
      </div>

      {/* Signature + polaroïd */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: termine ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex flex-col items-center gap-6"
      >
        <div className="text-center">
          <p className="font-display text-2xl sm:text-3xl text-cachet">
            {MOT_INTRO.signature}
          </p>
          <p className="font-body italic text-brun-doux mt-1">{MOT_INTRO.sousSignature}</p>
        </div>
        <div className="rotate-2">
          <Polaroid
            moment={{
              photo: MOT_INTRO.photo,
              alt: MOT_INTRO.photoAlt,
              legende: MOT_INTRO.photoLegende,
              inclinaison: 2,
            }}
            reduit={reduit}
            taille="sm"
          />
        </div>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <button type="button" onClick={onContinuer} className="btn-dossier" disabled={!termine}>
          Ouvrir l’enveloppe n° 1
        </button>
      </div>
    </DossierPage>
  )
}
