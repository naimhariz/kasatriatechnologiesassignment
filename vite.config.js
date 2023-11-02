const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        table: './table.html',
        sheetpreview: './sheetpreview.html'
      }
    }
  }
})