import { motion } from 'framer-motion'
import { DERNIER_MOT } from '../data/content'
import Confetti from '../components/Confetti'
import Stamp from '../components/Stamp'

// =====================================================================
//  Étape 6 — Le dernier mot
//  Écran final + petite pluie de cœurs/confettis discrète.
// =====================================================================
export default function Step6Final({
  onRejouer,
  reduit,
}: {
  onRejouer: () => void
  reduit: boolean
}) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      <Confetti reduit={reduit} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <Stamp rotate={-7} color="#8B3A3A">
            Dossier clos
          </Stamp>
        </div>

        <p className="font-body text-xl sm:text-2xl leading-relaxed text-brun">
          {DERNIER_MOT.paragraphe}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-10 font-display text-3xl sm:text-4xl text-cachet"
        >
          {DERNIER_MOT.signature}
        </motion.p>

        <div className="mt-14 flex flex-col items-center gap-4">
          <span className="text-2xl" aria-hidden="true">♥</span>
          {/* Bouton discret pour tout revoir depuis le début */}
          <button type="button" onClick={onRejouer} className="btn-secondaire">
            Revoir le dossier
          </button>
        </div>
      </motion.div>
    </div>
  )
}
