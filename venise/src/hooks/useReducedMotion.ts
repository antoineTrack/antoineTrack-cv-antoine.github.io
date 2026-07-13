import { useEffect, useState } from 'react'

// Détecte prefers-reduced-motion et réagit si l'utilisatrice change son réglage.
// On l'utilise pour couper/atténuer les animations Framer Motion.
export function useReducedMotion(): boolean {
  const [reduit, setReduit] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduit(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduit(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduit
}
