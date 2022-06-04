// vite.config.js

module.exports = {
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#big-list-of-options
        external: ['assets/WEB_Boska/css/boska.css','assets/WEB_Satoshi/css/satoshi.css'],
      },
      chunkSizeWarningLimit: 20000,
    },
    server: {
        host: true
      }
  }
