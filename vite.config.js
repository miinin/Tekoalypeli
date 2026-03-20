import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // TÄMÄ ON RATKAISEVA RIVI:
  // Se kertoo Vitelle, että peli sijaitsee osoitteessa allia.fi/tekoalypeli/
  // ilman tätä selain etsii tiedostoja väärästä paikasta (juuresta).
  base: '/tekoalypeli/',
})