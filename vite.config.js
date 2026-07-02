import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '01-reiki': resolve(__dirname, '01-craniosacral/index.html'),
        '02-sound': resolve(__dirname, '02-daode/index.html'),
        '03-yoga': resolve(__dirname, '03-kabiraji/index.html'),
        '04-meditation': resolve(__dirname, '04-curanderismo/index.html'),
        '05-breathwork': resolve(__dirname, '05-labyrinth/index.html'),
        '06-crystal': resolve(__dirname, '06-johrei/index.html'),
        '07-aroma': resolve(__dirname, '07-enochian/index.html'),
        '08-ayurveda': resolve(__dirname, '08-chronokinesis/index.html'),
        '09-acupuncture': resolve(__dirname, '09-zero-point/index.html'),
        '10-chakra': resolve(__dirname, '10-sufi-dhikr/index.html'),
        '11-herbalism': resolve(__dirname, '11-merkaba/index.html'),
        '12-shamanic': resolve(__dirname, '12-necromantic/index.html'),
        '13-qigong': resolve(__dirname, '13-geomancy/index.html'),
        '14-arttherapy': resolve(__dirname, '14-tulpa/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
