import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ENVELOPPE_3, REPONSES_VALIDES } from '../data/content'
import DossierPage, { Separateur } from '../components/DossierPage'

// Normalise : minuscules + suppression des accents + trim.
function normaliser(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// =====================================================================
//  Étape 4 — Enveloppe 3 : « Qui suis-je ? » (page 9)
//  5 indices + champ « Je suis : ». Réponse Venise (variantes).
//  Message doux si erreur ; révélation possible après 3 essais.
// =====================================================================
export default function Step4Riddle({
  onResolu,
  reduit,
}: {
  onResolu: () => void
  reduit: boolean
}) {
  const [reponse, setReponse] = useState('')
  const [essais, setEssais] = useState(0)
  const [erreur, setErreur] = useState(false)
  const [revele, setRevele] = useState(false)
  const [secousse, setSecousse] = useState(0)

  function valider(e: FormEvent) {
    e.preventDefault()
    if (REPONSES_VALIDES.includes(normaliser(reponse))) {
      onResolu()
      return
    }
    setEssais((n) => n + 1)
    setErreur(true)
    setSecousse((s) => s + 1)
  }

  const peutReveler = essais >= 3

  return (
    <DossierPage numero={ENVELOPPE_3.numero} titre={ENVELOPPE_3.titre} sujet={ENVELOPPE_3.sujet}>
      {/* Indices */}
      <ol className="space-y-4">
        {ENVELOPPE_3.indices.map((indice, i) => (
          <motion.li
            key={i}
            initial={reduit ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex gap-3"
          >
            <span className="font-display font-bold text-cachet">{i + 1}.</span>
            <span>
              <span className="block font-body text-brun">{indice.l1}</span>
              <span className="block font-body italic text-brun-doux">{indice.l2}</span>
            </span>
          </motion.li>
        ))}
      </ol>

      <Separateur />

      {/* Champ « Je suis : » */}
      <form onSubmit={valider}>
        <div className="flex items-center gap-3">
          <label htmlFor="reponse" className="font-display font-bold text-brun shrink-0">
            Je suis :
          </label>
          <motion.input
            id="reponse"
            key={secousse}
            animate={erreur && !reduit ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="text"
            value={reponse}
            onChange={(e) => {
              setReponse(e.target.value)
              setErreur(false)
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="ta réponse…"
            aria-describedby="aide-devinette"
            className="flex-1 min-w-0 bg-transparent border-b-2 border-dashed border-brun-doux/50
                       px-1 py-1 font-body text-brun placeholder:text-brun-doux/40
                       focus:border-canal focus:outline-none"
          />
          <button type="submit" className="btn-dossier shrink-0" disabled={!reponse.trim()}>
            Valider
          </button>
        </div>

        <p className="mt-4 font-body italic text-sm text-brun-doux/80">{ENVELOPPE_3.note}</p>

        {/* Message erreur / révélation */}
        <div id="aide-devinette" aria-live="polite" className="mt-2 min-h-[2rem]">
          <AnimatePresence mode="wait">
            {erreur && !revele && (
              <motion.p
                key="err"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-body text-brun-doux"
              >
                Pas encore… relis les indices. 🤍
              </motion.p>
            )}
            {revele && (
              <motion.p
                key="rev"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-xl text-canal"
              >
                C’était <strong>Venise</strong>. ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          {peutReveler && !revele && (
            <button type="button" onClick={() => setRevele(true)} className="btn-secondaire">
              Donner ma langue au chat
            </button>
          )}
          {revele && (
            <button type="button" onClick={onResolu} className="btn-dossier">
              Ouvrir l’enveloppe n° 4
            </button>
          )}
        </div>
      </form>
    </DossierPage>
  )
}
