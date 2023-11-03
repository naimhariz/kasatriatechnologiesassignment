const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    base: '/kasatriatechnologiesassignment/',
    rollupOptions: {
      input: {
        main: './index.html',
        table: './table.html'
      }
    }
  }
})