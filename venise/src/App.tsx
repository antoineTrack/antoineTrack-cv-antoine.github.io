import { AnimatePresence, motion } from 'framer-motion'
import { useProgress } from './hooks/useProgress'
import { useReducedMotion } from './hooks/useReducedMotion'

import NoiseOverlay from './components/NoiseOverlay'
import ProgressBar from './components/ProgressBar'

import Step0Envelope from './steps/Step0Envelope'
import Step1Letter from './steps/Step1Letter'
import Step2Origin from './steps/Step2Origin'
import Step3Bilan from './steps/Step3Bilan'
import Step4Riddle from './steps/Step4Riddle'
import Step5Reveal from './steps/Step5Reveal'
import Step6Defis from './steps/Step6Defis'
import Step7Final from './steps/Step7Final'

// =====================================================================
//  App — chef d'orchestre.
//  Machine à états « maison » (useProgress) : on affiche UNE étape à la
//  fois, avec une transition douce entre chaque (AnimatePresence).
// =====================================================================
export default function App() {
  const { courante, maxDebloquee, avancer, allerA, reinitialiser } = useProgress()
  const reduit = useReducedMotion()

  // Rend l'étape courante. `avancer` débloque et passe à la suivante.
  function renduEtape() {
    switch (courante) {
      case 0:
        return <Step0Envelope onOuvrir={avancer} reduit={reduit} />
      case 1:
        return <Step1Letter onContinuer={avancer} reduit={reduit} />
      case 2:
        return <Step2Origin onContinuer={avancer} reduit={reduit} />
      case 3:
        return <Step3Bilan onContinuer={avancer} reduit={reduit} />
      case 4:
        return <Step4Riddle onResolu={avancer} reduit={reduit} />
      case 5:
        return <Step5Reveal onContinuer={avancer} reduit={reduit} />
      case 6:
        return <Step6Defis onContinuer={avancer} reduit={reduit} />
      case 7:
        return <Step7Final onRejouer={() => allerA(0)} reduit={reduit} />
      default:
        return null
    }
  }

  // Transitions entre étapes (fondu + léger glissement)
  const variants = reduit
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -24 },
      }

  return (
    <div className="relative min-h-[100dvh]">
      <NoiseOverlay />
      <ProgressBar courante={courante} maxDebloquee={maxDebloquee} onAller={allerA} />

      <AnimatePresence mode="wait">
        <motion.main
          key={courante}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {renduEtape()}
        </motion.main>
      </AnimatePresence>

      {/* Bouton de réinitialisation TRÈS discret, en bas — pratique pour toi
          quand tu testes (efface la progression sauvegardée). */}
      <button
        type="button"
        onClick={reinitialiser}
        aria-label="Réinitialiser la progression"
        title="Réinitialiser (pour tes tests)"
        className="fixed bottom-2 right-2 z-40 font-mono text-[10px] text-brun-doux/30
                   hover:text-brun-doux transition-colors px-2 py-1"
      >
        ↺
      </button>
    </div>
  )
}
