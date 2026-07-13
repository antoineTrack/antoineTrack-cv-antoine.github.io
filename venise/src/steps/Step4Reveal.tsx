import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { VOLS, DATE_DECOLLAGE } from '../data/content'
import type { Vol } from '../types'
import VeniceScene from '../components/VeniceScene'
import Stamp from '../components/Stamp'

// Calcule le temps restant jusqu'à une date cible.
function tempsRestant(cible: Date) {
  const diff = cible.getTime() - Date.now()
  const total = Math.max(diff, 0)
  const jours = Math.floor(total / 86400000)
  const heures = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const secondes = Math.floor((total % 60000) / 1000)
  return { jours, heures, minutes, secondes, fini: diff <= 0 }
}

// =====================================================================
//  Étape 4 — La révélation
//  VENISE apparaît en grand, puis les deux vols (cartes d'embarquement)
//  et un compte à rebours en temps réel jusqu'au décollage.
// =====================================================================
export default function Step4Reveal({
  onContinuer,
  reduit,
}: {
  onContinuer: () => void
  reduit: boolean
}) {
  const [compte, setCompte] = useState(() => tempsRestant(DATE_DECOLLAGE))

  useEffect(() => {
    const id = window.setInterval(() => setCompte(tempsRestant(DATE_DECOLLAGE)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Fond illustré Venise */}
      <VeniceScene className="absolute inset-x-0 bottom-0 w-full h-64 sm:h-80 opacity-90" />

      {/* Le mot qui apparaît en grand */}
      <motion.h2
        initial={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.6, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, scale: 1, letterSpacing: '0.02em' }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-10 font-display text-6xl sm:text-8xl text-brun text-center"
      >
        Venise
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 etiquette mt-3"
      >
        18 → 21 septembre 2026
      </motion.p>

      {/* Cartes d'embarquement */}
      <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 w-full max-w-2xl">
        {VOLS.map((vol, i) => (
          <BoardingPass key={vol.type} vol={vol} delai={1.1 + i * 0.25} reduit={reduit} />
        ))}
      </div>

      {/* Compte à rebours */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 mt-10 text-center"
      >
        <p className="etiquette mb-3">
          {compte.fini ? 'On y est.' : 'Décollage dans'}
        </p>
        {!compte.fini ? (
          <div className="flex items-end justify-center gap-3 sm:gap-5 font-mono text-brun">
            <Unite valeur={compte.jours} label="jours" />
            <Sep />
            <Unite valeur={compte.heures} label="h" />
            <Sep />
            <Unite valeur={compte.minutes} label="min" />
            <Sep />
            <Unite valeur={compte.secondes} label="s" />
          </div>
        ) : (
          <p className="font-display text-3xl text-canal">Bon voyage, mon amour ✈</p>
        )}
      </motion.div>

      <motion.button
        type="button"
        onClick={onContinuer}
        className="btn-dossier relative z-10 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Voir le programme
      </motion.button>
    </div>
  )
}

// Une carte d'embarquement stylisée
function BoardingPass({ vol, delai, reduit }: { vol: Vol; delai: number; reduit: boolean }) {
  return (
    <motion.div
      initial={reduit ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: delai, duration: 0.6 }}
      className="relative bg-creme border border-brun-doux/30 rounded-lg shadow-carte
                 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="etiquette">Carte d'embarquement</span>
        <Stamp rotate={6} color="#2E5F80" className="scale-75 origin-right">
          {vol.type}
        </Stamp>
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-center">
          <p className="font-display text-3xl text-brun leading-none">{vol.depart}</p>
          <p className="etiquette mt-1">{vol.villeDepart}</p>
          <p className="font-mono text-sm text-brun-doux mt-1">{vol.heure}</p>
        </div>
        <div className="flex-1 px-3 text-canal" aria-hidden="true">
          <div className="relative h-px bg-brun-doux/40">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2">✈</span>
          </div>
        </div>
        <div className="text-center">
          <p className="font-display text-3xl text-brun leading-none">{vol.arrivee}</p>
          <p className="etiquette mt-1">{vol.villeArrivee}</p>
          <p className="font-mono text-sm text-brun-doux mt-1">{vol.heureArrivee}</p>
        </div>
      </div>
      {/* Bande perforée */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-dashed border-brun-doux/40 bg-papier/50">
        <span className="font-mono text-xs text-brun-doux">{vol.date}</span>
        <span className="font-mono text-xs text-brun-doux">
          {vol.depart}–{vol.arrivee}
        </span>
      </div>
    </motion.div>
  )
}

function Unite({ valeur, label }: { valeur: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-bold tabular-nums">
        {String(valeur).padStart(2, '0')}
      </span>
      <span className="etiquette mt-1">{label}</span>
    </div>
  )
}

function Sep() {
  return <span className="text-2xl sm:text-3xl text-brun-doux/50 pb-5">:</span>
}
