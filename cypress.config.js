const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kavolley.uber.space/tournaments',
   //specPattern: 'cypress/e2e/**/*.cy.ts',
    specPattern: 'cypress/e2e/search.cy.ts',
    supportFile: false,
  },
});
