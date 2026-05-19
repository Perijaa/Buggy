import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const landings = [
  'rafting-omis.html',
  'buggy-tours-omis.html',
  'quad-atv-rental-omis.html',
  'sup-paddleboarding-omis.html',
  'boat-tours-cetina-omis.html',
  'kayaking-cetina-river.html',
]

const blogs = ['blog/index.html', 'blog/best-things-to-do-omis.html', 'blog/cetina-adventure-planning.html', 'blog/family-week-omis-guide.html']

const input = {
  main: resolve(__dirname, 'index.html'),
  ...Object.fromEntries(landings.map((f) => [f.replace(/[^a-z0-9]/gi, '_'), resolve(__dirname, f)])),
  ...Object.fromEntries(blogs.map((f) => [f.replace(/[^a-z0-9]/gi, '_'), resolve(__dirname, f)])),
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: { input },
  },
})
