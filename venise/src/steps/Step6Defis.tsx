import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ENVELOPPE_5 } from '../data/content'
import DossierPage from '../components/DossierPage'
import Stamp from '../components/Stamp'

const CLE_DEFIS = 'venise-defis-coches'

// =====================================================================
//  Étape 6 — Enveloppe 5 : « Nos défis à Venise » (page 13)
//  Cases réellement cochables (« À cocher sur place »), état persisté.
// =====================================================================
export default function Step6Defis({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  // Ensemble des indices de défis cochés
  const [coches, setCoches] = useState<Set<number>>(() => {
    try {
      const brut = localStorage.getItem(CLE_DEFIS)
      if (brut) return new Set(JSON.parse(brut) as number[])
    } catch {
      /* stockage indisponible */
    }
    return new Set()
  })

  useEffect(() => {
    try {
      localStorage.setItem(CLE_DEFIS, JSON.stringify([...coches]))
    } catch {
      /* on ignore */
    }
  }, [coches])

  function basculer(i: number) {
    setCoches((prev) => {
      const suivant = new Set(prev)
      suivant.has(i) ? suivant.delete(i) : suivant.add(i)
      return suivant
    })
  }

  return (
    <DossierPage numero={ENVELOPPE_5.numero} titre={ENVELOPPE_5.titre} sujet={ENVELOPPE_5.sujet}>
      <ul className="space-y-4">
        {ENVELOPPE_5.defis.map((defi, i) => {
          const coche = coches.has(i)
          return (
            <motion.li
              key={i}
              initial={reduit ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <button
                type="button"
                onClick={() => basculer(i)}
                aria-pressed={coche}
                className="w-full flex items-start gap-3 text-left group"
              >
                <span
                  className={`shrink-0 mt-0.5 h-5 w-5 border-2 rounded-[3px] flex items-center
                    justify-center text-sm font-bold transition-colors
                    ${coche ? 'border-cachet text-cachet bg-cachet/10' : 'border-brun-doux/70 text-transparent group-hover:border-cachet'}`}
                >
                  ✓
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-display font-semibold text-brun transition-opacity
                      ${coche ? 'opacity-60 line-through decoration-brun-doux/50' : ''}`}
                  >
                    {defi.titre}
                  </span>
                  <span className="block font-body italic text-sm text-brun-doux">{defi.note}</span>
                </span>
              </button>
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-8 flex items-center justify-center">
        <Stamp rotate={-5}>{ENVELOPPE_5.tampon}</Stamp>
      </div>

      <div className="mt-8 flex justify-center">
        <button type="button" onClick={onContinuer} className="btn-dossier">
          Ouvrir l’enveloppe n° 6
        </button>
      </div>
    </DossierPage>
  )
}
