import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from './components/Confetti'
import VeniceScene from './components/VeniceScene'
import Stamp from './components/Stamp'
import { useReducedMotion } from './hooks/useReducedMotion'

// =====================================================================
//  LE JEU — « Devine la destination »
//  Un jeu complet dont la réponse est VENISE :
//   • indices progressifs de plusieurs types (énigme, rébus, anagramme, fait)
//   • une carte mystère qui se dé-floute à chaque indice révélé
//   • score + chrono + nombre d'essais
//   • feedback « chaud / froid » selon la réponse
//   • historique des tentatives, meilleur score persisté
//   • écran de victoire + rejouer
// =====================================================================

// --- Réponses acceptées (insensible casse/accents, tolérante) ---
const BONNES = ['venise', 'venice', 'venezia']

// --- Indices, du plus cryptique au plus évident ---
type Indice =
  | { type: 'énigme'; texte: string }
  | { type: 'rébus'; emojis: string; aide: string }
  | { type: 'anagramme'; lettres: string; aide: string }
  | { type: 'fait'; texte: string }

const INDICES: Indice[] = [
  { type: 'énigme', texte: 'Je n’ai pas de bruit de moteurs, seulement le clapot de l’eau.' },
  { type: 'énigme', texte: 'On me traverse debout, porté par une seule rame.' },
  { type: 'énigme', texte: 'Une fois par an, mille visages me recouvrent.' },
  { type: 'énigme', texte: 'Mon cœur porte le nom d’un évangéliste ailé.' },
  { type: 'énigme', texte: 'Née de la mer, jamais je ne sombre.' },
  { type: 'rébus', emojis: '🎭 🚤 🌉 🌊', aide: 'un masque · une barque · un pont · l’eau' },
  { type: 'anagramme', lettres: 'S · E · N · I · V · E', aide: 'six lettres, tout est là' },
  {
    type: 'fait',
    texte: 'Une ville italienne bâtie sur 118 îlots, reliée par près de 400 ponts — et pas une seule voiture.',
  },
]

// --- Dictionnaires « chaud / froid » (réponses proches) ---
const PROCHE_PAYS = [
  'rome', 'roma', 'milan', 'milano', 'florence', 'firenze', 'naples', 'napoli',
  'turin', 'torino', 'verone', 'verona', 'padoue', 'padova', 'bologne', 'bologna',
  'pise', 'pisa', 'genes', 'genova', 'italie', 'italia',
]
const PROCHE_EAU = [
  'amsterdam', 'bruges', 'brugge', 'saint petersbourg', 'st petersbourg',
  'petersbourg', 'bangkok', 'stockholm', 'hambourg', 'copenhague',
]
const PROCHE_THEME = [
  'gondole', 'gondola', 'carnaval', 'masque', 'lagune', 'canal', 'canaux',
  'pont', 'rialto', 'saint marc', 'st marc', 'doge', 'spritz',
]

const POINTS_DEPART = 1000
const COUT_INDICE = 80
const COUT_ERREUR = 40
const CLE_MEILLEUR = 'venise-jeu-meilleur-score'

function normaliser(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
}

function formaterTemps(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

interface Tentative {
  texte: string
  temperature: 'chaud' | 'tiede' | 'theme' | 'froid'
}

export default function Jeu() {
  const reduit = useReducedMotion()

  const [reponse, setReponse] = useState('')
  const [indicesReveles, setIndicesReveles] = useState(1) // le 1er indice est offert
  const [essais, setEssais] = useState(0)
  const [score, setScore] = useState(POINTS_DEPART)
  const [historique, setHistorique] = useState<Tentative[]>([])
  const [message, setMessage] = useState<string>('')
  const [secousse, setSecousse] = useState(0)
  const [gagne, setGagne] = useState(false)
  const [abandon, setAbandon] = useState(false)
  const [secondes, setSecondes] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const [meilleur, setMeilleur] = useState<number | null>(() => {
    try {
      const v = localStorage.getItem(CLE_MEILLEUR)
      return v ? Number(v) : null
    } catch {
      return null
    }
  })

  // Chrono (s'arrête à la victoire / abandon)
  useEffect(() => {
    if (gagne || abandon) return
    const id = window.setInterval(() => setSecondes((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [gagne, abandon])

  const termine = gagne || abandon
  const tousIndices = indicesReveles >= INDICES.length

  // Flou de la carte mystère : diminue à chaque indice, nul à la victoire
  const flou = useMemo(() => {
    if (gagne) return 0
    return Math.max(0, 15 - indicesReveles * 1.7)
  }, [indicesReveles, gagne])

  function revelerIndice() {
    if (tousIndices || termine) return
    setIndicesReveles((n) => n + 1)
    setScore((s) => Math.max(0, s - COUT_INDICE))
    setMessage('Nouvel indice débloqué 🔎')
  }

  function temperature(norm: string): Tentative['temperature'] {
    if (PROCHE_PAYS.some((v) => norm.includes(v))) return 'chaud'
    if (PROCHE_EAU.some((v) => norm.includes(v))) return 'tiede'
    if (PROCHE_THEME.some((v) => norm.includes(v))) return 'theme'
    return 'froid'
  }

  const MESSAGES: Record<Tentative['temperature'], string> = {
    chaud: '🔥 Tu chauffes — le bon pays ! Mais ce n’est pas cette ville-là.',
    tiede: '💧 Les canaux, l’eau… tu approches ! Vise plus au sud, en Italie.',
    theme: '🎭 C’est un symbole de la ville… mais donne-moi son nom !',
    froid: '❄️ Froid. Relis les indices, la réponse s’y cache.',
  }

  function gagner() {
    const finalScore = Math.max(50, score)
    setScore(finalScore)
    setGagne(true)
    if (meilleur === null || finalScore > meilleur) {
      setMeilleur(finalScore)
      try {
        localStorage.setItem(CLE_MEILLEUR, String(finalScore))
      } catch {
        /* stockage indisponible */
      }
    }
  }

  function valider(e: FormEvent) {
    e.preventDefault()
    const norm = normaliser(reponse)
    if (!norm) return

    if (BONNES.some((b) => norm.includes(b))) {
      gagner()
      return
    }

    // Mauvaise réponse : feedback + malus + révèle un indice de plus
    const temp = temperature(norm)
    setEssais((n) => n + 1)
    setScore((s) => Math.max(0, s - COUT_ERREUR))
    setHistorique((h) => [{ texte: reponse.trim(), temperature: temp }, ...h].slice(0, 8))
    setMessage(MESSAGES[temp])
    setSecousse((s) => s + 1)
    setReponse('')
    if (!tousIndices) setIndicesReveles((n) => n + 1)
    inputRef.current?.focus()
  }

  function abandonner() {
    setAbandon(true)
    setIndicesReveles(INDICES.length)
  }

  function rejouer() {
    setReponse('')
    setIndicesReveles(1)
    setEssais(0)
    setScore(POINTS_DEPART)
    setHistorique([])
    setMessage('')
    setGagne(false)
    setAbandon(false)
    setSecondes(0)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-[100dvh] px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Bandeau de stats */}
      <div className="w-full max-w-xl grid grid-cols-4 gap-2 mb-6">
        <Stat label="Score" valeur={score} />
        <Stat label="Essais" valeur={essais} />
        <Stat label="Chrono" valeur={formaterTemps(secondes)} />
        <Stat label="Indices" valeur={`${indicesReveles}/${INDICES.length}`} />
      </div>

      {/* En-tête */}
      <header className="text-center max-w-xl mb-6">
        <div className="flex justify-center mb-3">
          <Stamp rotate={-5}>Mission mystère</Stamp>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-brun">
          Devine la destination
        </h1>
        <p className="mt-2 font-body italic text-brun-doux">
          Une ville se cache derrière ces indices. Sauras-tu la trouver&nbsp;?
        </p>
        {meilleur !== null && (
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brun-doux/70">
            Meilleur score : {meilleur}
          </p>
        )}
      </header>

      {/* Carte mystère qui se dé-floute */}
      <div className="relative w-full max-w-xl rounded-xl overflow-hidden border border-ocre/50 shadow-carte mb-6">
        {/* Le flou est appliqué directement à l'illustration et baisse à chaque indice */}
        <div
          className="transition-[filter] duration-700"
          style={{ filter: `blur(${flou}px)`, transform: 'scale(1.08)' }}
          aria-hidden="true"
        >
          <VeniceScene className="w-full h-40 sm:h-52" />
        </div>
        {!gagne && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-5xl sm:text-6xl text-creme/80 drop-shadow">
              ?
            </span>
          </div>
        )}
        <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-creme/90">
          {gagne ? 'carte postale' : 'carte postale mystère'}
        </span>
      </div>

      {/* Indices révélés */}
      <ol className="w-full max-w-xl space-y-3 mb-6">
        {INDICES.slice(0, indicesReveles).map((indice, i) => (
          <motion.li
            key={i}
            initial={reduit ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-papier/60 border border-brun-doux/15 rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-cachet text-sm">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brun-doux/70">
                {indice.type}
              </span>
            </div>
            <IndiceContenu indice={indice} />
          </motion.li>
        ))}
      </ol>

      {/* Bouton révéler un indice */}
      {!termine && !tousIndices && (
        <button type="button" onClick={revelerIndice} className="btn-secondaire mb-6">
          Révéler un indice (−{COUT_INDICE} pts)
        </button>
      )}

      {/* Champ de réponse */}
      {!termine && (
        <form onSubmit={valider} className="w-full max-w-xl">
          <label htmlFor="rep" className="etiquette block mb-2">
            Ta réponse
          </label>
          <motion.div
            key={secousse}
            animate={secousse && !reduit ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex gap-2"
          >
            <input
              id="rep"
              ref={inputRef}
              type="text"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Nom de la ville…"
              aria-describedby="feedback"
              className="flex-1 min-w-0 bg-white/80 border border-brun-doux/40 rounded-full px-5 py-3
                         font-body text-brun placeholder:text-brun-doux/50 focus:border-canal"
            />
            <button type="submit" className="btn-dossier shrink-0" disabled={!reponse.trim()}>
              Valider
            </button>
          </motion.div>

          {/* Feedback */}
          <div id="feedback" aria-live="polite" className="mt-3 min-h-[1.5rem] text-center">
            <AnimatePresence mode="wait">
              {message && (
                <motion.p
                  key={message + secousse}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-brun-doux"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Historique des tentatives */}
          {historique.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {historique.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-2.5 py-1 rounded-full border"
                  style={pastilleStyle(t.temperature)}
                  title={t.temperature}
                >
                  {t.texte} {emojiTemp(t.temperature)}
                </span>
              ))}
            </div>
          )}

          {/* Abandon (après quelques essais) */}
          {essais >= 3 && (
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={abandonner} className="btn-secondaire">
                Donner ma langue au chat
              </button>
            </div>
          )}
        </form>
      )}

      {/* Écran de victoire / abandon */}
      <AnimatePresence>
        {termine && (
          <Victoire
            gagne={gagne}
            score={score}
            essais={essais}
            secondes={secondes}
            indicesReveles={indicesReveles}
            meilleur={meilleur}
            reduit={reduit}
            onRejouer={rejouer}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Sous-composants ----------

function Stat({ label, valeur }: { label: string; valeur: string | number }) {
  return (
    <div className="bg-papier/60 border border-brun-doux/15 rounded-lg px-2 py-2 text-center">
      <div className="font-display font-bold text-lg text-brun leading-none tabular-nums">
        {valeur}
      </div>
      <div className="etiquette mt-1 text-[10px]">{label}</div>
    </div>
  )
}

function IndiceContenu({ indice }: { indice: Indice }) {
  if (indice.type === 'énigme' || indice.type === 'fait') {
    return <p className="font-body italic text-brun">« {indice.texte} »</p>
  }
  if (indice.type === 'rébus') {
    return (
      <div>
        <p className="text-2xl tracking-widest">{indice.emojis}</p>
        <p className="font-body italic text-sm text-brun-doux mt-1">{indice.aide}</p>
      </div>
    )
  }
  // anagramme
  return (
    <div>
      <p className="font-mono text-xl tracking-[0.3em] text-brun">{indice.lettres}</p>
      <p className="font-body italic text-sm text-brun-doux mt-1">{indice.aide}</p>
    </div>
  )
}

function emojiTemp(t: Tentative['temperature']): string {
  return t === 'chaud' ? '🔥' : t === 'tiede' ? '💧' : t === 'theme' ? '🎭' : '❄️'
}

function pastilleStyle(t: Tentative['temperature']): React.CSSProperties {
  const map = {
    chaud: { color: '#7B2E3A', borderColor: '#7B2E3A66', background: '#7B2E3A11' },
    tiede: { color: '#8C3A54', borderColor: '#8C3A5466', background: '#8C3A5411' },
    theme: { color: '#855560', borderColor: '#85556066', background: '#85556011' },
    froid: { color: '#855560', borderColor: '#85556040', background: 'transparent' },
  }
  return map[t]
}

function Victoire({
  gagne,
  score,
  essais,
  secondes,
  indicesReveles,
  meilleur,
  reduit,
  onRejouer,
}: {
  gagne: boolean
  score: number
  essais: number
  secondes: number
  indicesReveles: number
  meilleur: number | null
  reduit: boolean
  onRejouer: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center px-4 bg-creme/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={gagne ? 'Victoire' : 'Réponse révélée'}
    >
      {gagne && <Confetti reduit={reduit} />}
      <motion.div
        initial={reduit ? { opacity: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-md bg-papier border border-ocre/60 rounded-2xl
                   shadow-carte px-7 py-9 text-center"
      >
        <p className="etiquette text-cachet mb-2">{gagne ? 'Destination trouvée' : 'La réponse était'}</p>
        <motion.h2
          initial={reduit ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 14 }}
          className="font-display font-bold text-5xl sm:text-6xl text-brun"
        >
          Venise
        </motion.h2>
        <p className="mt-2 font-body italic text-brun-doux">
          {gagne ? 'Bravo, exactement ! 🎉' : 'Ce sera pour la prochaine fois 🤍'}
        </p>

        {/* Récap */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <Recap label="Score" valeur={gagne ? score : 0} />
          <Recap label="Essais" valeur={essais} />
          <Recap label="Temps" valeur={formaterTemps(secondes)} />
          <Recap label="Indices utilisés" valeur={`${indicesReveles}/${INDICES.length}`} />
        </div>
        {meilleur !== null && (
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brun-doux/70">
            {gagne && score >= meilleur ? '🏆 Nouveau meilleur score !' : `Meilleur score : ${meilleur}`}
          </p>
        )}

        <button type="button" onClick={onRejouer} className="btn-dossier mt-7">
          Rejouer
        </button>
      </motion.div>
    </motion.div>
  )
}

function Recap({ label, valeur }: { label: string; valeur: string | number }) {
  return (
    <div className="bg-creme/70 rounded-lg px-3 py-2">
      <div className="font-display font-bold text-xl text-brun tabular-nums">{valeur}</div>
      <div className="etiquette text-[10px]">{label}</div>
    </div>
  )
}
