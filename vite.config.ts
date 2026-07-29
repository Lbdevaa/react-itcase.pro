import {fileURLToPath, URL} from 'node:url'

import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared', 'services']

// Алиасы зеркалят baseUrl из tsconfig.app.json: импорты вида `entities/product`
// должны одинаково резолвиться и компилятором, и сборщиком.
const layerAliases = Object.fromEntries(
  LAYERS.map((layer) => [layer, fileURLToPath(new URL(`./src/${layer}`, import.meta.url))]),
)

export default defineConfig({
  plugins: [react()],
  resolve: {alias: layerAliases},
})
