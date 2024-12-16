const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://web:3000',
   // specPattern: 'cypress/e2e/**/*.cy.ts',
    specPattern: 'cypress/e2e/performance.cy.ts',
    supportFile: false,
  },
});
