import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INDICES, REPONSES_VALIDES } from '../data/content'

// Normalise une chaîne : minuscules + suppression des accents + trim.
function normaliser(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // enlève les diacritiques (accents)
}

// =====================================================================
//  Étape 3 — La devinette
//  5 indices poétiques + champ de saisie. Réponse « Venise » (variantes
//  acceptées). Message doux si erreur. Révélation possible après 3 essais.
// =====================================================================
export default function Step3Riddle({
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
    const propre = normaliser(reponse)
    if (REPONSES_VALIDES.includes(propre)) {
      onResolu()
      return
    }
    // Mauvaise réponse
    setEssais((n) => n + 1)
    setErreur(true)
    setSecousse((s) => s + 1) // déclenche la petite secousse du champ
  }

  const peutReveler = essais >= 3

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24">
      <p className="etiquette mb-3">Énigme · niveau confidentiel</p>
      <h2 className="font-display text-4xl sm:text-5xl text-brun text-center mb-2">
        Où t'emmène-je&nbsp;?
      </h2>
      <p className="font-body text-brun-doux text-center max-w-sm mb-8">
        Cinq indices. Un seul mot à trouver.
      </p>

      {/* Indices */}
      <ol className="w-full max-w-md space-y-3 mb-8">
        {INDICES.map((indice, i) => (
          <motion.li
            key={i}
            initial={reduit ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i }}
            className="flex gap-3 items-start bg-papier/60 border border-brun-doux/15
                       rounded-md px-4 py-3"
          >
            <span className="font-mono text-cachet text-sm mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-body italic text-brun">« {indice} »</span>
          </motion.li>
        ))}
      </ol>

      {/* Champ de saisie */}
      <form onSubmit={valider} className="w-full max-w-md">
        <label htmlFor="reponse" className="etiquette block mb-2">
          Ta réponse
        </label>
        <motion.div
          key={secousse}
          animate={erreur && !reduit ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-2"
        >
          <input
            id="reponse"
            type="text"
            value={reponse}
            onChange={(e) => {
              setReponse(e.target.value)
              setErreur(false)
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Écris ici…"
            aria-describedby="aide-devinette"
            className="flex-1 bg-white/80 border border-brun-doux/40 rounded-full px-5 py-3
                       font-body text-brun placeholder:text-brun-doux/50
                       focus:border-canal"
          />
          <button type="submit" className="btn-dossier" disabled={!reponse.trim()}>
            Valider
          </button>
        </motion.div>

        {/* Zone de message (erreur / révélation) */}
        <div id="aide-devinette" aria-live="polite" className="mt-4 min-h-[2.5rem] text-center">
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
                className="font-display text-2xl text-canal"
              >
                C'était <strong>Venise</strong>. ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Donner sa langue au chat (après 3 essais) */}
        <div className="mt-2 flex flex-col items-center gap-3">
          {peutReveler && !revele && (
            <button
              type="button"
              onClick={() => setRevele(true)}
              className="btn-secondaire"
            >
              Donner ma langue au chat
            </button>
          )}
          {revele && (
            <button type="button" onClick={onResolu} className="btn-dossier">
              Découvrir
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
