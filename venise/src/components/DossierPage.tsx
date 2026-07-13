import type { ReactNode } from 'react'
import { PIED_DE_PAGE } from '../data/content'

// =====================================================================
//  DossierPage — la « page » encadrée, identique au dossier papier :
//  double filet ocre, sur-titre, titre, sujet en italique, séparateur
//  pointillé, pied de page « Opération Cité Flottante ».
//  Chaque étape (enveloppe) est rendue dans cette page.
// =====================================================================
export default function DossierPage({
  numero,
  surTitre,
  titre,
  sujet,
  children,
  centre = false,
}: {
  numero?: number
  surTitre?: string
  titre: string
  sujet?: string
  children: ReactNode
  /** Centre le titre et le sujet (utilisé pour le mot d'intro / dernier mot) */
  centre?: boolean
}) {
  return (
    <div className="min-h-[100dvh] flex items-stretch justify-center px-3 sm:px-6 pt-14 pb-10">
      {/* Cadre extérieur (double filet ocre) */}
      <div className="relative w-full max-w-2xl bg-papier/40 shadow-carte border border-ocre/70">
        {/* Second filet, légèrement en retrait */}
        <div className="pointer-events-none absolute inset-2 border border-ocre/40" aria-hidden="true" />

        <article className="relative px-6 sm:px-10 py-9 sm:py-12 flex flex-col min-h-full">
          {/* En-tête */}
          <header className={centre ? 'text-center' : 'text-left'}>
            {numero !== undefined && (
              <p className="etiquette text-cachet mb-2">Enveloppe n° {numero}</p>
            )}
            {surTitre && (
              <p className="font-body italic text-brun-doux text-sm sm:text-base mb-1">
                {surTitre}
              </p>
            )}
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brun leading-tight">
              {titre}
            </h2>
            {sujet && (
              <p className="font-body italic text-brun-doux mt-1.5 sm:text-lg">{sujet}</p>
            )}
          </header>

          {/* Séparateur pointillé */}
          <Separateur />

          {/* Corps */}
          <div className="flex-1">{children}</div>

          {/* Pied de page */}
          <footer className="mt-8 pt-3">
            <p className="text-center font-body italic text-brun-doux/70 text-xs">
              {PIED_DE_PAGE}
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}

/** Filet pointillé horizontal, comme sur le dossier papier. */
export function Separateur({ className = '' }: { className?: string }) {
  return (
    <div
      className={`my-6 border-t border-dashed border-brun-doux/40 ${className}`}
      aria-hidden="true"
    />
  )
}
