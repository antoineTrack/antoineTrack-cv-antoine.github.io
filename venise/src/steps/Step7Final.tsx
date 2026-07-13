import { motion } from 'framer-motion'
import { ENVELOPPE_6 } from '../data/content'
import DossierPage, { Separateur } from '../components/DossierPage'
import Confetti from '../components/Confetti'
import Polaroid from '../components/Polaroid'
import Stamp from '../components/Stamp'

// =====================================================================
//  Étape 7 — Enveloppe 6 : « Le dernier mot » (page 15)
//  Texte final exact + pluie de cœurs + tampon S'AUTODÉTRUIT DANS UN CÂLIN.
// =====================================================================
export default function Step7Final({
  onRejouer,
  reduit,
}: {
  onRejouer: () => void
  reduit: boolean
}) {
  return (
    <div className="relative">
      <Confetti reduit={reduit} />
      <DossierPage numero={ENVELOPPE_6.numero} titre={ENVELOPPE_6.titre} centre>
        {/* Polaroïd du dernier mot */}
        <div className="flex justify-center mb-6">
          <Polaroid
            moment={{
              photo: ENVELOPPE_6.photo,
              alt: ENVELOPPE_6.photoAlt,
              legende: 'nous, sur un pont de Venise',
              inclinaison: 2,
            }}
            reduit={reduit}
            taille="sm"
          />
        </div>

        <div className="space-y-6 text-center">
          {ENVELOPPE_6.paragraphes.map((lignes, i) => (
            <motion.p
              key={i}
              initial={reduit ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="font-body text-brun leading-relaxed"
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

        <Separateur />

        <div className="text-center">
          <p className="font-display text-2xl sm:text-3xl text-cachet">{ENVELOPPE_6.signature}</p>
          <p className="mt-2 font-body italic text-brun-doux">{ENVELOPPE_6.sousSignature}</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          <Stamp rotate={-6}>{ENVELOPPE_6.tampon}</Stamp>
          <button type="button" onClick={onRejouer} className="btn-secondaire">
            Revoir le dossier
          </button>
        </div>
      </DossierPage>
    </div>
  )
}
