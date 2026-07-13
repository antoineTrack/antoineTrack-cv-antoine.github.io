import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Moment } from '../types'

// Un polaroïd : photo + légende manuscrite, légèrement incliné, effet hover.
// Si la photo n'existe pas encore (placeholder), on affiche un joli fond dégradé
// vénitien à la place — le site reste beau avant même que tu aies mis tes photos.
export default function Polaroid({
  moment,
  reduit,
}: {
  moment: Moment
  reduit: boolean
}) {
  const [erreur, setErreur] = useState(false)
  const src = `${import.meta.env.BASE_URL}photos/${moment.photo}`

  return (
    <motion.figure
      // Apparition au scroll (reveal)
      initial={reduit ? false : { opacity: 0, y: 40, rotate: moment.inclinaison }}
      whileInView={{ opacity: 1, y: 0, rotate: moment.inclinaison }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={reduit ? undefined : { rotate: 0, scale: 1.04, y: -6 }}
      className="w-[260px] sm:w-[300px] bg-white p-3 pb-5 shadow-polaroid rounded-sm"
      style={{ rotate: `${moment.inclinaison}deg` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-papier">
        {!erreur ? (
          <img
            src={src}
            alt={moment.alt}
            loading="lazy"
            onError={() => setErreur(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // Fallback décoratif : dégradé coucher de soleil + étiquette
          <div
            className="absolute inset-0 flex items-center justify-center text-center p-4"
            style={{
              background:
                'linear-gradient(160deg, #F0C9A0 0%, #E8823F 55%, #C77B4A 100%)',
            }}
            role="img"
            aria-label={moment.alt}
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-brun/70">
              photo à venir<br />
              {moment.photo}
            </span>
          </div>
        )}
        {moment.date && (
          <span className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-widest
                           bg-creme/85 text-brun px-1.5 py-0.5 rounded">
            {moment.date}
          </span>
        )}
      </div>
      <figcaption className="mt-3 font-body text-sm leading-snug text-brun">
        {moment.legende}
      </figcaption>
    </motion.figure>
  )
}
