const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    base: '/kasatriatechnologiesassignment/',
    rollupOptions: {
      input: {
        main: './index.html',
        table: './table.html',
        app: './src/app.js',
        app: './src/logout.js',
        app: './src/main.js',
        app: './src/sheet.js'
      }
    }
  }
})