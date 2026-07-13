import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Pluie discrète de cœurs/confettis pour l'écran final.
// Respecte prefers-reduced-motion : si réduit, on n'affiche rien.
const COULEURS = ['#7B2E3A', '#C56B72', '#E1928C', '#C99A6A', '#8C3A54']

export default function Confetti({ reduit }: { reduit: boolean }) {
  // Positions/délais figés une seule fois
  const morceaux = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        gauche: Math.random() * 100,
        delai: Math.random() * 3,
        duree: 5 + Math.random() * 4,
        taille: 10 + Math.random() * 12,
        couleur: COULEURS[i % COULEURS.length],
        coeur: i % 3 === 0,
      })),
    [],
  )

  if (reduit) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {morceaux.map((m) => (
        <motion.span
          key={m.id}
          initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0.6], rotate: 360 }}
          transition={{
            duration: m.duree,
            delay: m.delai,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0"
          style={{ left: `${m.gauche}%`, fontSize: m.taille, color: m.couleur }}
        >
          {m.coeur ? (
            '♥'
          ) : (
            <span
              className="inline-block rounded-sm"
              style={{ width: m.taille, height: m.taille, background: m.couleur }}
            />
          )}
        </motion.span>
      ))}
    </div>
  )
}
