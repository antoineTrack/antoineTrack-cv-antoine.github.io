import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stamp from '../components/Stamp'

// =====================================================================
//  Étape 0 — L'enveloppe scellée
//  Elle clique/touche le cachet de cire → le rabat se soulève,
//  le cachet se brise → on entre dans le site.
// =====================================================================
export default function Step0Envelope({
  onOuvrir,
  reduit,
}: {
  onOuvrir: () => void
  reduit: boolean
}) {
  const [ouverture, setOuverture] = useState(false)

  function demarrer() {
    if (ouverture) return
    setOuverture(true)
    // On laisse l'animation se jouer avant d'entrer dans le site
    const delai = reduit ? 100 : 1400
    window.setTimeout(onOuvrir, delai)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <motion.p
        className="etiquette mb-8 max-w-xs leading-relaxed"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Opération « Cité Flottante »
        <br />
        Courrier confidentiel
      </motion.p>

      {/* Enveloppe */}
      <div className="relative w-[300px] sm:w-[360px] aspect-[7/5] select-none">
        {/* Corps de l'enveloppe */}
        <div className="absolute inset-0 rounded-md bg-papier shadow-carte overflow-hidden">
          {/* Plis latéraux */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, transparent 49.5%, rgba(74,46,18,0.08) 50%), linear-gradient(-135deg, transparent 49.5%, rgba(74,46,18,0.08) 50%)',
            }}
          />
          {/* Destinataire */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="font-display text-xl sm:text-2xl text-brun">Pour toi</p>
            <p className="etiquette mt-1">à ouvrir le 30 juillet, en premier</p>
          </div>
        </div>

        {/* Rabat supérieur qui se soulève */}
        <motion.div
          className="absolute left-0 right-0 top-0 origin-top"
          style={{ height: '58%', transformStyle: 'preserve-3d' }}
          initial={{ rotateX: 0 }}
          animate={ouverture && !reduit ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div
            className="h-full w-full"
            style={{
              background: 'linear-gradient(180deg, #E4D6BC 0%, #D8C6A5 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              boxShadow: '0 2px 6px rgba(74,46,18,0.15)',
            }}
          />
        </motion.div>

        {/* Cachet de cire — bouton cliquable */}
        <AnimatePresence>
          {!ouverture && (
            <motion.button
              type="button"
              onClick={demarrer}
              aria-label="Briser le cachet de cire pour ouvrir l'enveloppe"
              className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-10
                         rounded-full focus-visible:outline-offset-4"
              initial={{ scale: 1 }}
              animate={
                reduit
                  ? {}
                  : { scale: [1, 1.06, 1] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              exit={
                reduit
                  ? { opacity: 0 }
                  : { scale: 0, rotate: 24, opacity: 0, transition: { duration: 0.5 } }
              }
              whileHover={reduit ? undefined : { scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <WaxSeal />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: ouverture ? 0 : 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="font-body text-brun-doux text-sm max-w-xs">
          Touche le cachet de cire pour ouvrir le dossier.
        </p>
        <Stamp rotate={-6}>Confidentiel</Stamp>
      </motion.div>
    </div>
  )
}

// Le cachet de cire rouge (SVG). Le « M » comme mission… ou comme mon amour.
function WaxSeal() {
  return (
    <svg width="86" height="86" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="cire" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#B24A4A" />
          <stop offset="70%" stopColor="#8B3A3A" />
          <stop offset="100%" stopColor="#6E2A2A" />
        </radialGradient>
      </defs>
      {/* bord irrégulier de la cire */}
      <path
        d="M50 4c9 0 12 8 20 9s15-4 20 4 0 13 3 21-7 13-6 21-8 12-9 20-5 14-13 15-13-4-21-3-13 7-21 6-13-6-21-7-14 1-19-6 3-14 2-22-8-12-9-20 6-14 6-22-6-14-3-22 12-4 20-8S41 4 50 4z"
        fill="url(#cire)"
      />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#F3ECE0" strokeOpacity="0.35" strokeWidth="2" />
      <text
        x="50"
        y="63"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="34"
        fontWeight="700"
        fill="#F3ECE0"
        fillOpacity="0.9"
      >
        A
      </text>
    </svg>
  )
}
