import type { ReactNode } from 'react'

// Tampon façon dossier (« TOP SECRET », « CONFIRMÉ »…), légèrement incliné et encré.
export default function Stamp({
  children,
  color = '#8B3A3A',
  rotate = -8,
  className = '',
}: {
  children: ReactNode
  color?: string
  rotate?: number
  className?: string
}) {
  return (
    <span
      className={`inline-block font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em]
        border-[3px] rounded px-3 py-1 select-none ${className}`}
      style={{
        color,
        borderColor: color,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        // léger effet « encre » irrégulière
        boxShadow: `inset 0 0 0 1px ${color}22`,
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
