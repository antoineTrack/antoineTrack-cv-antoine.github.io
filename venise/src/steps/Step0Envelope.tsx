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
                  : { scale: [1, 1.06, 1], rotate: [0, -5, 4, -3, 0], y: [0, -4, 0] }
              }
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              exit={
                reduit
                  ? { opacity: 0 }
                  : { scale: [1, 1.25, 0], rotate: 20, opacity: 0, transition: { duration: 0.5 } }
              }
              whileHover={reduit ? undefined : { scale: 1.14, rotate: 0 }}
              whileTap={{ scale: 0.88, rotate: -6 }}
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

// Le cachet de cire — version ludique : cire brillante et rebondie,
// petites coulures, cœur embossé, pastilles autour et étincelles qui scintillent.
function WaxSeal() {
  return (
    <svg width="96" height="104" viewBox="0 0 100 108" aria-hidden="true" className="overflow-visible">
      <defs>
        <radialGradient id="cire" cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#C85555" />
          <stop offset="55%" stopColor="#9B3D3D" />
          <stop offset="100%" stopColor="#6E2A2A" />
        </radialGradient>
      </defs>

      {/* Coulures de cire sous le cachet (petites gouttes) */}
      <circle cx="34" cy="92" r="6" fill="#8B3A3A" />
      <circle cx="52" cy="98" r="8" fill="#7E3232" />
      <circle cx="68" cy="90" r="5" fill="#8B3A3A" />

      {/* Blob de cire, bien rond et rebondi */}
      <path
        d="M50 6c10-1 15 7 23 8s16-2 19 7-3 14 0 22-6 14-4 22-9 10-14 15-11 10-19 9-15-6-24-6-16 6-24 4-9-11-14-16-13-8-15-16 3-14 1-22-6-13-2-22 12-6 20-9 13-6 21-6z"
        fill="url(#cire)"
      />

      {/* Reflet brillant en haut à gauche */}
      <ellipse cx="38" cy="30" rx="16" ry="10" fill="#F3ECE0" opacity="0.22" />

      {/* Anneau embossé + pastilles autour */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#F3ECE0" strokeOpacity="0.3" strokeWidth="2" />
      <g fill="#F3ECE0" fillOpacity="0.35">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return <circle key={i} cx={50 + Math.cos(a) * 30} cy={50 + Math.sin(a) * 30} r="1.6" />
        })}
      </g>

      {/* Cœur embossé au centre */}
      <path
        d="M50 64 C40 55 30 49 30 40 C30 33 36 30 41 31 C45 32 48 35 50 39 C52 35 55 32 59 31 C64 30 70 33 70 40 C70 49 60 55 50 64 Z"
        fill="#F3ECE0"
        fillOpacity="0.88"
      />

      {/* Étincelles qui scintillent */}
      <g fill="#F0C9A0">
        <path d="M12 20 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
        </path>
        <path d="M90 40 l1.3 3.2 3.2 1.3 -3.2 1.3 -1.3 3.2 -1.3 -3.2 -3.2 -1.3 3.2 -1.3z">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.1s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  )
}
