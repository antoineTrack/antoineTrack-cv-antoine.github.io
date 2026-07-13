import { motion } from 'framer-motion'
import { MOMENTS } from '../data/content'
import Polaroid from '../components/Polaroid'

// =====================================================================
//  Étape 2 — Notre histoire (timeline interactive)
//  Frise chronologique scrollable : chaque moment apparaît au scroll,
//  en polaroïd légèrement incliné, avec effet hover.
// =====================================================================
export default function Step2Timeline({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  return (
    <div className="min-h-[100dvh] px-6 py-24">
      <header className="text-center max-w-md mx-auto mb-14">
        <p className="etiquette mb-3">Pièces au dossier</p>
        <h2 className="font-display text-4xl sm:text-5xl text-brun">Notre histoire</h2>
        <p className="mt-3 font-body text-brun-doux">
          Fais défiler. Une année, quelques images.
        </p>
      </header>

      {/* Frise : ligne verticale + polaroïds alternés */}
      <div className="relative mx-auto max-w-3xl">
        {/* Ligne centrale (cachée en mobile) */}
        <div
          className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2
                     bg-brun-doux/25"
          aria-hidden="true"
        />

        <ol className="flex flex-col items-center gap-16 sm:gap-24">
          {MOMENTS.map((moment, i) => {
            const gauche = i % 2 === 0
            return (
              <li
                key={moment.photo}
                className={`w-full flex justify-center ${gauche ? 'sm:justify-start' : 'sm:justify-end'}`}
              >
                <div
                  className={`sm:w-1/2 flex justify-center ${
                    gauche ? 'sm:justify-end sm:pr-10' : 'sm:justify-start sm:pl-10'
                  }`}
                >
                  <Polaroid moment={moment} reduit={reduit} />
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Continuer */}
      <motion.div
        className="mt-20 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button type="button" onClick={onContinuer} className="btn-dossier">
          Et ensuite&nbsp;?
        </button>
      </motion.div>
    </div>
  )
}
