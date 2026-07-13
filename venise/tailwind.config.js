/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Direction artistique « Romantique — rose poudré & bordeaux »
      // (mêmes noms de tokens : tout le site bascule d'un coup)
      colors: {
        creme: '#F7EDE8',       // Fond crème rosé
        papier: '#F0DCD4',      // Blush papier (secondaire)
        ocre: '#C99A6A',        // Or rose (cadres, filets)
        brun: '#3E2230',        // Brun-prune (texte principal)
        'brun-doux': '#855560', // Mauve rosé (texte secondaire, italiques)
        terracotta: '#C56B72',  // Rose profond (accents)
        sunset: '#E1928C',      // Rose corail (dégradés)
        peche: '#F2CDC4',       // Pêche rosée (dégradés)
        canal: '#8C3A54',       // Bordeaux-rose (focus, petits accents)
        cachet: '#7B2E3A',      // Bordeaux profond (tampons)
      },
      fontFamily: {
        // Titres / display
        display: ['Fraunces', 'Georgia', 'serif'],
        // Corps de texte
        body: ['Literata', 'Georgia', 'serif'],
        // Détails « dossier / mono »
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        polaroid: '0 8px 24px -8px rgba(74, 46, 18, 0.35)',
        carte: '0 12px 40px -12px rgba(74, 46, 18, 0.45)',
      },
      keyframes: {
        'seal-break': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '40%': { transform: 'scale(1.12) rotate(-4deg)' },
          '100%': { transform: 'scale(0) rotate(20deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
