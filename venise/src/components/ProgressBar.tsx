import { DERNIERE_ETAPE } from '../hooks/useProgress'

// Barre de progression discrète en haut.
// - N'apparaît qu'à partir de l'étape 1 (l'enveloppe est l'intro).
// - Points cliquables uniquement pour les étapes déjà débloquées.
export default function ProgressBar({
  courante,
  maxDebloquee,
  onAller,
}: {
  courante: number
  maxDebloquee: number
  onAller: (n: number) => void
}) {
  if (courante < 1) return null

  // Étapes comptées : 1 → 6
  const etapes = Array.from({ length: DERNIERE_ETAPE }, (_, i) => i + 1)

  return (
    <nav
      aria-label="Progression du dossier"
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-center gap-3
                 px-4 py-2 bg-creme/80 backdrop-blur-sm border-b border-brun-doux/15"
    >
      <span className="etiquette shrink-0" aria-live="polite">
        étape {Math.min(courante, DERNIERE_ETAPE)} / {DERNIERE_ETAPE}
      </span>
      <ol className="flex items-center gap-2" role="list">
        {etapes.map((n) => {
          const debloquee = n <= maxDebloquee
          const active = n === courante
          return (
            <li key={n}>
              <button
                type="button"
                disabled={!debloquee}
                onClick={() => onAller(n)}
                aria-label={`Aller à l'étape ${n}${debloquee ? '' : ' (verrouillée)'}`}
                aria-current={active ? 'step' : undefined}
                className={[
                  'block h-2.5 rounded-full transition-all duration-300',
                  active ? 'w-7 bg-cachet' : 'w-2.5',
                  !active && debloquee ? 'bg-brun-doux/60 hover:bg-brun-doux' : '',
                  !debloquee ? 'bg-brun-doux/20 cursor-not-allowed' : '',
                ].join(' ')}
              />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
