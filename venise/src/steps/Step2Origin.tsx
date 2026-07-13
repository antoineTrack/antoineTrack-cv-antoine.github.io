import { motion } from 'framer-motion'
import { ENVELOPPE_1 } from '../data/content'
import DossierPage, { Separateur } from '../components/DossierPage'
import Polaroid from '../components/Polaroid'
import Stamp from '../components/Stamp'

// =====================================================================
//  Étape 2 — Enveloppe 1 : « Là où tout a commencé » (page 4)
//  Récit du Cap d'Agde + Amnésia, conclusion + tampon AUTHENTIFIÉ,
//  deux polaroïds.
// =====================================================================
export default function Step2Origin({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  return (
    <DossierPage numero={ENVELOPPE_1.numero} titre={ENVELOPPE_1.titre} sujet={ENVELOPPE_1.sujet}>
      {/* Récit */}
      <div className="space-y-4">
        {ENVELOPPE_1.paragraphes.map((p, i) => (
          <motion.p
            key={i}
            initial={reduit ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="font-body text-brun leading-relaxed"
          >
            {p}
          </motion.p>
        ))}
      </div>

      <Separateur />

      {/* Conclusion + tampon */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="font-body italic text-brun-doux max-w-sm">{ENVELOPPE_1.conclusion}</p>
        <div className="shrink-0 self-center">
          <Stamp rotate={-6}>{ENVELOPPE_1.tampon}</Stamp>
        </div>
      </div>

      {/* Polaroïds */}
      <div className="mt-8 flex flex-wrap justify-center gap-5">
        {ENVELOPPE_1.photos.map((m) => (
          <Polaroid key={m.photo} moment={m} reduit={reduit} taille="sm" />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button type="button" onClick={onContinuer} className="btn-dossier">
          Ouvrir l’enveloppe n° 2
        </button>
      </div>
    </DossierPage>
  )
}
