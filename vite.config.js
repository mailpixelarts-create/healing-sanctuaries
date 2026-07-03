import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '01-craniosacral': resolve(__dirname, '01-craniosacral/index.html'),
        '02-daode': resolve(__dirname, '02-daode/index.html'),
        '03-kabiraji': resolve(__dirname, '03-kabiraji/index.html'),
        '04-curanderismo': resolve(__dirname, '04-curanderismo/index.html'),
        '05-labyrinth': resolve(__dirname, '05-labyrinth/index.html'),
        '06-johrei': resolve(__dirname, '06-johrei/index.html'),
        '07-enochian': resolve(__dirname, '07-enochian/index.html'),
        '08-chronokinesis': resolve(__dirname, '08-chronokinesis/index.html'),
        '09-zero-point': resolve(__dirname, '09-zero-point/index.html'),
        '10-sufi-dhikr': resolve(__dirname, '10-sufi-dhikr/index.html'),
        '11-merkaba': resolve(__dirname, '11-merkaba/index.html'),
        '12-necromantic': resolve(__dirname, '12-necromantic/index.html'),
        '13-geomancy': resolve(__dirname, '13-geomancy/index.html'),
        '14-tulpa': resolve(__dirname, '14-tulpa/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
