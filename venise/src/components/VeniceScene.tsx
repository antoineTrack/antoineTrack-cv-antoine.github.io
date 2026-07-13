// Illustration stylisée de Venise en SVG (coucher de soleil, palais, gondole).
// Utilisée en fond de section — pas de photo de stock.
// Décorative : aria-hidden.
export default function VeniceScene({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ciel coucher de soleil rosé */}
        <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2CDC4" />
          <stop offset="45%" stopColor="#E1928C" />
          <stop offset="100%" stopColor="#C56B72" />
        </linearGradient>
        {/* Eau du canal (mauve du soir) */}
        <linearGradient id="eau" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8C3A54" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7B2E3A" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="800" height="400" fill="url(#ciel)" />

      {/* Soleil bas sur l'horizon */}
      <circle cx="400" cy="215" r="70" fill="#F7EDE8" opacity="0.75" />

      {/* Silhouette des palais (ligne de toits + campanile) */}
      <g fill="#9E5A66" opacity="0.9">
        <rect x="40" y="180" width="120" height="90" />
        <rect x="170" y="150" width="90" height="120" />
        {/* Campanile de Saint-Marc */}
        <rect x="290" y="70" width="40" height="200" />
        <polygon points="290,70 310,35 330,70" />
        {/* Basilique — coupoles */}
        <rect x="360" y="170" width="150" height="100" />
        <circle cx="395" cy="170" r="26" />
        <circle cx="435" cy="165" r="30" />
        <circle cx="480" cy="170" r="26" />
        {/* Palais des Doges — arcades stylisées */}
        <rect x="530" y="185" width="230" height="85" />
      </g>
      {/* Arcades du palais */}
      <g fill="#F7EDE8" opacity="0.25">
        <circle cx="560" cy="205" r="10" />
        <circle cx="595" cy="205" r="10" />
        <circle cx="630" cy="205" r="10" />
        <circle cx="665" cy="205" r="10" />
        <circle cx="700" cy="205" r="10" />
        <circle cx="735" cy="205" r="10" />
      </g>

      {/* Eau */}
      <rect x="0" y="270" width="800" height="130" fill="url(#eau)" />

      {/* Reflets scintillants */}
      <g stroke="#F7EDE8" strokeOpacity="0.4" strokeWidth="2">
        <line x1="380" y1="300" x2="420" y2="300" />
        <line x1="360" y1="330" x2="440" y2="330" />
        <line x1="390" y1="360" x2="410" y2="360" />
      </g>

      {/* Gondole avec sa rame */}
      <g fill="#3E2230">
        <path d="M120 340 q90 40 210 0 q-30 22 -105 22 q-75 0 -105 -22 z" />
        {/* Ferro (proue) */}
        <path d="M120 340 q-16 -6 -18 -28 l8 2 q2 16 14 22 z" />
        {/* Gondolier stylisé */}
        <rect x="205" y="292" width="7" height="42" rx="3" />
        <circle cx="208" cy="286" r="7" />
        {/* Rame */}
        <line x1="212" y1="300" x2="290" y2="330" stroke="#3E2230" strokeWidth="4" />
      </g>
    </svg>
  )
}
