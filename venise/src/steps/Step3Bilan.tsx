import { useState } from 'react'
import { motion } from 'framer-motion'
import { ENVELOPPE_2 } from '../data/content'
import DossierPage, { Separateur } from '../components/DossierPage'

// Vignette photo ronde (comme les pastilles du dossier papier), avec fallback.
function Vignette({ photo, alt }: { photo: string; alt: string }) {
  const [erreur, setErreur] = useState(false)
  const src = `${import.meta.env.BASE_URL}photos/${photo}`
  return (
    <span
      className="shrink-0 h-11 w-11 rounded-full overflow-hidden border border-dashed border-ocre/70
                 ring-2 ring-papier"
      aria-hidden="true"
    >
      {!erreur ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErreur(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="block h-full w-full"
          style={{ background: 'linear-gradient(160deg,#F0C9A0,#E8823F)' }}
        />
      )}
    </span>
  )
}

// =====================================================================
//  Étape 3 — Enveloppe 2 : « Une année à deux — le bilan » (pages 6-7)
//  Liste cochée des grands moments + bilan officiel.
// =====================================================================
export default function Step3Bilan({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  return (
    <DossierPage numero={ENVELOPPE_2.numero} titre={ENVELOPPE_2.titre} sujet={ENVELOPPE_2.sujet}>
      <ul className="space-y-4">
        {ENVELOPPE_2.items.map((item, i) => (
          <motion.li
            key={i}
            initial={reduit ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="flex items-start gap-3"
          >
            {/* Case cochée */}
            <span
              className="shrink-0 mt-0.5 h-5 w-5 border-2 border-brun-doux/70 rounded-[3px]
                         flex items-center justify-center text-cachet text-sm font-bold"
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="flex-1">
              <span className="block font-display font-semibold text-brun">{item.titre}</span>
              <span className="block font-body italic text-sm text-brun-doux">{item.note}</span>
            </span>
            {item.photo && <Vignette photo={item.photo} alt={item.titre} />}
          </motion.li>
        ))}
      </ul>

      <Separateur />

      {/* Bilan officiel */}
      <div className="text-center">
        <p className="font-display font-semibold text-lg text-brun">{ENVELOPPE_2.bilan[0]}</p>
        {ENVELOPPE_2.bilan.slice(1).map((l, i) => (
          <p key={i} className="font-body italic text-brun-doux">
            {l}
          </p>
        ))}
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brun-doux/70">
          {ENVELOPPE_2.piecesTagline}
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <button type="button" onClick={onContinuer} className="btn-dossier">
          Ouvrir l’enveloppe n° 3
        </button>
      </div>
    </DossierPage>
  )
}
