import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite minimale : React + TypeScript.
// base './' pour que le build fonctionne aussi bien sur Netlify que dans un sous-dossier.
export default defineConfig({
  plugins: [react()],
  base: './',
})
