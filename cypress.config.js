const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 't1b8ak',
  e2e: {
    baseUrl: 'https://seubarriga.wcaquino.me',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // Configura o plugin do reporter
    },
    video: true, // Habilita vídeos
    videosFolder: 'cypress/videos', // Pasta para vídeos
    reporter: 'cypress-mochawesome-reporter', // Define o reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Pasta onde os relatórios serão salvos
      overwrite: false,
      html: true,
      json: true,
    },
  },
});