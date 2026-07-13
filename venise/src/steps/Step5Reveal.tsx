import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ENVELOPPE_4, VOLS, DATE_DECOLLAGE } from '../data/content'
import type { Vol } from '../types'
import DossierPage, { Separateur } from '../components/DossierPage'
import Stamp from '../components/Stamp'
import VeniceScene from '../components/VeniceScene'

function tempsRestant(cible: Date) {
  const diff = cible.getTime() - Date.now()
  const total = Math.max(diff, 0)
  return {
    jours: Math.floor(total / 86400000),
    heures: Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    secondes: Math.floor((total % 60000) / 1000),
    fini: diff <= 0,
  }
}

// =====================================================================
//  Étape 5 — Enveloppe 4 : « La destination — révélée » (page 11)
//  Venise + cartes d'embarquement Volotea + compte à rebours en direct.
// =====================================================================
export default function Step5Reveal({
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
    <DossierPage numero={ENVELOPPE_4.numero} titre={ENVELOPPE_4.titre} sujet={ENVELOPPE_4.sujet}>
      <p className="font-body text-brun">{ENVELOPPE_4.accroche}</p>

      <motion.p
        initial={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mt-2 font-display font-bold text-2xl sm:text-3xl text-brun"
      >
        {ENVELOPPE_4.grandMot}
      </motion.p>

      {/* Cartes d'embarquement */}
      <div className="mt-6 space-y-4">
        {VOLS.map((vol, i) => (
          <BoardingPass key={vol.entete} vol={vol} delai={0.3 + i * 0.2} reduit={reduit} />
        ))}
      </div>

      <Separateur />

      {/* Compte à rebours */}
      <p className="font-display font-bold text-lg text-brun">
        Compte à rebours :{' '}
        {compte.fini ? 'on y est !' : `${compte.jours} jours.`}
      </p>
      {!compte.fini && (
        <p className="font-mono text-sm text-brun-doux tabular-nums" aria-live="off">
          {String(compte.heures).padStart(2, '0')}h{' '}
          {String(compte.minutes).padStart(2, '0')}min{' '}
          {String(compte.secondes).padStart(2, '0')}s avant le décollage
        </p>
      )}

      <p className="mt-3 font-body text-brun">{ENVELOPPE_4.campBase}</p>
      <p className="font-body text-brun">{ENVELOPPE_4.cloture}</p>

      {/* Tampon + illustration */}
      <div className="mt-6 flex items-center justify-center">
        <Stamp rotate={-5}>{ENVELOPPE_4.tampon}</Stamp>
      </div>

      <div className="mt-6 -mx-6 sm:-mx-10 overflow-hidden">
        <VeniceScene className="w-full h-28 sm:h-36 opacity-90" />
      </div>

      <div className="mt-8 flex justify-center">
        <button type="button" onClick={onContinuer} className="btn-dossier">
          Ouvrir l’enveloppe n° 5
        </button>
      </div>
    </DossierPage>
  )
}

// Carte d'embarquement, fidèle au dossier papier.
function BoardingPass({ vol, delai, reduit }: { vol: Vol; delai: number; reduit: boolean }) {
  return (
    <motion.div
      initial={reduit ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delai, duration: 0.5 }}
      className="border border-brun-doux/40 rounded-2xl px-4 sm:px-6 py-4 bg-creme/60"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-brun-doux">
          {vol.entete}
        </span>
        <span className="font-mono text-[11px] sm:text-xs text-brun-doux shrink-0">{vol.date}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div>
          <p className="font-display font-bold text-2xl sm:text-3xl text-brun leading-none">
            {vol.heure}
          </p>
          <p className="font-mono text-xs text-brun-doux mt-1">
            {vol.depart}&nbsp;{vol.villeDepart}
          </p>
        </div>
        <div className="flex-1 px-3 text-canal min-w-0" aria-hidden="true">
          <div className="relative h-px bg-brun-doux/40">
            <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-canal" />
            <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-canal" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-canal">✈</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-2xl sm:text-3xl text-brun leading-none">
            {vol.heureArrivee}
          </p>
          <p className="font-mono text-xs text-brun-doux mt-1">
            {vol.arrivee}&nbsp;{vol.villeArrivee}
          </p>
        </div>
      </div>
      {/* Détail du vol, sur toute la largeur pour ne jamais être tronqué */}
      <p className="mt-2 text-center font-mono text-[11px] text-brun-doux">{vol.detail}</p>
    </motion.div>
  )
}
