/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Palette exacte du dossier papier
      colors: {
        creme: '#F3ECE0',       // Fond crème
        papier: '#EADFC9',      // Papier secondaire
        ocre: '#B5824A',        // Ocre
        brun: '#4A2E12',        // Brun texte
        'brun-doux': '#8F5A2A', // Brun doux
        terracotta: '#C77B4A',  // Terracotta
        sunset: '#E8823F',      // Coucher de soleil
        peche: '#F0C9A0',       // Pêche
        canal: '#2E5F80',       // Bleu canal (accents Venise)
        cachet: '#8B3A3A',      // Rouge cachet
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
