const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    base: 'https://naimhariz.github.io/kasatriatechnologiesassignment/dist/',
    rollupOptions: {
      input: {
        main: './index.html',
        table: './table.html',
        sheetpreview: './sheetpreview.html',
      }
    }
  }
})